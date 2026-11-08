var state = 'main';
var currentCategory = null;
var nodes = [];
var edges = [];
var hoveredNode = null;
var mouse = { x: -100, y: -100 };
var canvas, ctx, W, H;

function finishIntro() {
  if (state !== 'intro') return;
  state = 'main';
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('centerLabel').classList.add('visible');
  document.getElementById('socials').classList.add('visible');
  buildMainGraph();
}

function getNodeAt(x, y) {
  for (var i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].type === 'center' || nodes[i].type === 'subcenter') continue;
    var dx = x - nodes[i].x, dy = y - nodes[i].y;
    if (Math.sqrt(dx * dx + dy * dy) < nodes[i].r + 14) return nodes[i];
  }
  return null;
}

function handleClick(e) {
  var node = getNodeAt(e.clientX, e.clientY);
  if (!node) { if (state === 'detail') closeDetail(); return; }
  if (node.type === 'category') {
    var cat = PORTFOLIO[node.id];
    if (cat.children.length === 1 && cat.children[0].detail && !cat.children[0].route) {
      showDetail(cat.children[0].detail);
      return;
    }
    state = 'zoomed'; currentCategory = node.id;
    var label = document.getElementById('centerLabel');
    label.querySelector('.name').textContent = PORTFOLIO[node.id].label;
    label.querySelector('.tagline').style.display = 'none';
    document.getElementById('nav').classList.add('visible');
    document.getElementById('crumbText').innerHTML = '<span class="crumb-current">' + PORTFOLIO[node.id].label + '</span>';
    buildSubGraph(node.id);
  } else if (node.type === 'leaf' && node.route) {
    window.location.hash = node.route;
  } else if (node.type === 'leaf' && node.detail) {
    showDetail(node.detail);
  }
}

function showDetail(d) {
  state = 'detail';
  document.getElementById('detailLabel').textContent = d.label;
  document.getElementById('detailTitle').textContent = d.title;
  document.getElementById('detailAccentBar').style.background = d.color;
  document.getElementById('detailBody').innerHTML = d.body;
  document.getElementById('detailTags').innerHTML = d.tags.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('');
  document.getElementById('detail').classList.add('open');
}

function closeDetail() {
  document.getElementById('detail').classList.remove('open');
  state = currentCategory ? 'zoomed' : 'main';
}

function goBack() {
  closeDetail(); state = 'main'; currentCategory = null;
  document.getElementById('nav').classList.remove('visible');
  var label = document.getElementById('centerLabel');
  label.querySelector('.name').textContent = 'Manav Jain';
  label.querySelector('.tagline').style.display = '';
  buildMainGraph();
}

function showWriteup() {
  document.getElementById('writeup').classList.add('open');
  document.body.classList.add('writeup-active');
}

function hideWriteup() {
  document.getElementById('writeup').classList.remove('open');
  document.body.classList.remove('writeup-active');
}

function handleHashChange() {
  if (window.location.hash === '#/projects/skinsure') {
    showWriteup();
  } else {
    hideWriteup();
  }
}

function tick() { simulate(); draw(); requestAnimationFrame(tick); }

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  if (state === 'main') buildMainGraph();
  else if (state === 'zoomed' && currentCategory) buildSubGraph(currentCategory);
}

function init() {
  canvas = document.getElementById('graphCanvas');
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    var c = document.getElementById('neuronCursor');
    c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
    var node = getNodeAt(e.clientX, e.clientY);
    if (node !== hoveredNode) {
      hoveredNode = node;
      c.classList.toggle('hover', !!node);
      updateTooltip(node);
    } else if (node) updateTooltip(node);
  });

  document.addEventListener('touchstart', function(e) {
    var t = e.touches[0];
    mouse.x = t.clientX; mouse.y = t.clientY;
    var node = getNodeAt(t.clientX, t.clientY);
    if (node) { hoveredNode = node; handleClick({ clientX: t.clientX, clientY: t.clientY }); }
    else if (state === 'detail') closeDetail();
  }, { passive: true });

  canvas.addEventListener('click', handleClick);
  document.getElementById('backBtn').addEventListener('click', goBack);
  document.getElementById('detailClose').addEventListener('click', closeDetail);
  document.getElementById('skipBtn').addEventListener('click', finishIntro);
  document.getElementById('writeupBack').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.hash = '';
    goBack();
  });
  window.addEventListener('hashchange', handleHashChange);

  document.getElementById('intro').classList.add('hidden');
  document.getElementById('centerLabel').classList.add('visible');
  document.getElementById('socials').classList.add('visible');
  buildMainGraph();
  tick();
  handleHashChange();
}

if ('ontouchstart' in window) {
  document.body.style.cursor = 'auto';
  document.getElementById('neuronCursor').style.display = 'none';
  document.getElementById('cursorLines').style.display = 'none';
}
init();
