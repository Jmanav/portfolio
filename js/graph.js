function distToSegment(px, py, x1, y1, x2, y2) {
  var dx = x2 - x1, dy = y2 - y1;
  var lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
  var t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
  var projX = x1 + t * dx, projY = y1 + t * dy;
  return Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
}

function buildMainGraph() {
  nodes = []; edges = [];
  var cats = Object.keys(PORTFOLIO);
  var cx = W * 0.5, cy = H * 0.5;
  nodes.push({ id: 'center', label: '', x: cx, y: cy, vx: 0, vy: 0, r: 4, color: RED, type: 'center', fixed: true });

  var placements = [
    { angle: -1.45, dist: 0.30 },
    { angle: -0.15, dist: 0.40 },
    { angle: 0.95,  dist: 0.27 },
    { angle: 2.49,  dist: 0.36 },
    { angle: -2.92, dist: 0.44 }
  ];

  cats.forEach(function(key, i) {
    var p = placements[i] || { angle: (Math.PI * 2 / cats.length) * i, dist: 0.3 };
    var r = Math.min(W, H) * p.dist;
    var tx = cx + Math.cos(p.angle) * r;
    var ty = cy + Math.sin(p.angle) * r;
    nodes.push({
      id: key, label: PORTFOLIO[key].label,
      x: tx + (Math.random() - 0.5) * 15,
      y: ty + (Math.random() - 0.5) * 15,
      vx: 0, vy: 0, r: 22,
      color: RED, type: 'category',
      targetX: tx, targetY: ty
    });
    edges.push({ from: 'center', to: key });
  });
  edges.push({ from: cats[0], to: cats[1], faint: true });
  edges.push({ from: cats[2], to: cats[3], faint: true });
}

function buildSubGraph(catKey) {
  nodes = []; edges = [];
  var cat = PORTFOLIO[catKey];
  var children = cat.children;
  var cx = W * 0.5, cy = H * 0.5;
  nodes.push({ id: catKey + '_center', label: '', x: cx, y: cy, vx: 0, vy: 0, r: 4, color: RED, type: 'subcenter', fixed: true });

  var subPlacements = [
    { angle: -1.45, dist: 0.24 },
    { angle: 0.75,  dist: 0.30 },
    { angle: 2.75,  dist: 0.22 },
    { angle: -0.15, dist: 0.32 },
    { angle: 1.95,  dist: 0.27 }
  ];

  children.forEach(function(child, i) {
    var p = subPlacements[i] || { angle: (Math.PI * 2 / children.length) * i - Math.PI / 2, dist: 0.26 };
    var dist = Math.min(W, H) * p.dist;
    var tx = cx + Math.cos(p.angle) * dist;
    var ty = cy + Math.sin(p.angle) * dist;
    nodes.push({
      id: child.id, label: child.label,
      x: tx + (Math.random() - 0.5) * 15,
      y: ty + (Math.random() - 0.5) * 15,
      vx: 0, vy: 0, r: 15,
      color: RED, type: 'leaf', detail: child.detail, route: child.route,
      targetX: tx, targetY: ty
    });
    edges.push({ from: catKey + '_center', to: child.id });
  });
  for (var i = 0; i < children.length; i++) {
    if (i < children.length - 1 && Math.random() > 0.4)
      edges.push({ from: children[i].id, to: children[i + 1].id, faint: true });
  }
}

function simulate() {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].fixed) continue;
    var fx = 0, fy = 0;
    for (var j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      var dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      var d = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      var f = 2000 / (d * d);
      fx += (dx / d) * f; fy += (dy / d) * f;
    }
    if (nodes[i].targetX !== undefined) {
      fx += (nodes[i].targetX - nodes[i].x) * 0.03;
      fy += (nodes[i].targetY - nodes[i].y) * 0.03;
    }
    nodes[i].vx = (nodes[i].vx + fx) * 0.82;
    nodes[i].vy = (nodes[i].vy + fy) * 0.82;
    nodes[i].x += nodes[i].vx;
    nodes[i].y += nodes[i].vy;
    nodes[i].x = Math.max(60, Math.min(W - 60, nodes[i].x));
    nodes[i].y = Math.max(60, Math.min(H - 60, nodes[i].y));
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(220,38,38,0.025)';
  for (var x = 0; x < W; x += 48) {
    for (var y = 0; y < H; y += 48) {
      ctx.beginPath(); ctx.arc(x, y, 0.6, 0, Math.PI * 2); ctx.fill();
    }
  }

  var PROX_R = 280;
  edges.forEach(function(e) {
    var a = null, b = null;
    for (var k = 0; k < nodes.length; k++) {
      if (nodes[k].id === e.from) a = nodes[k];
      if (nodes[k].id === e.to) b = nodes[k];
    }
    if (!a || !b) return;

    var dM = distToSegment(mouse.x, mouse.y, a.x, a.y, b.x, b.y);
    var pf = Math.max(0, 1 - dM / PROX_R);
    pf = pf * pf;

    var baseOp = e.faint ? 0.05 : 0.10;
    var hoverOp = e.faint ? 0.35 : 0.55;
    var op = baseOp + (hoverOp - baseOp) * pf;

    var baseW = e.faint ? 0.3 : 0.5;
    var hoverW = e.faint ? 0.8 : 1.2;
    var lw = baseW + (hoverW - baseW) * pf;

    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = 'rgba(220,38,38,' + op + ')';
    ctx.lineWidth = lw;
    ctx.stroke();

    var t = (Date.now() % 5000) / 5000;
    var pOp = 0.15 + pf * 0.35;
    ctx.beginPath();
    ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, 1 + pf * 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(220,38,38,' + pOp + ')';
    ctx.fill();
  });

  nodes.forEach(function(node) {
    if (node.type === 'center' || node.type === 'subcenter') return;
    var isH = hoveredNode === node;
    var r = node.r;

    if (isH) {
      var g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 3);
      g.addColorStop(0, 'rgba(220,38,38,0.12)');
      g.addColorStop(0.5, 'rgba(220,38,38,0.04)');
      g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    }

    ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.strokeStyle = isH ? 'rgba(220,38,38,0.9)' : 'rgba(220,38,38,0.35)';
    ctx.lineWidth = isH ? 1.6 : 0.7;
    ctx.stroke();

    ctx.beginPath(); ctx.arc(node.x, node.y, isH ? 2.5 : 1.8, 0, Math.PI * 2);
    ctx.fillStyle = isH ? 'rgba(220,38,38,1)' : 'rgba(220,38,38,0.5)';
    ctx.fill();

    var fontSize = node.type === 'subcenter' ? 22 : node.type === 'category' ? 20 : 17;
    ctx.font = (isH ? '500' : '400') + ' ' + fontSize + 'px "JetBrains Mono", monospace';
    ctx.fillStyle = isH ? '#eee' : '#888';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var label = node.label;
    if (label) ctx.fillText(label, node.x, node.y + r + 18);
  });

  var svg = document.getElementById('cursorLines');
  var lines = '';
  nodes.forEach(function(node) {
    var dx = mouse.x - node.x, dy = mouse.y - node.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    if (d < 200 && d > 15) {
      var o = (1 - d / 200) * 0.18;
      lines += '<line x1="' + mouse.x + '" y1="' + mouse.y + '" x2="' + node.x + '" y2="' + node.y + '" stroke="rgba(220,38,38,' + o + ')" stroke-width="0.4"/>';
    }
  });
  svg.innerHTML = lines;
}
