function updateTooltip(node) {
  var tip = document.getElementById('tooltip');
  if (node && node.type !== 'center') {
    tip.textContent = node.type === 'category' ? 'explore ' + node.label.toLowerCase() :
                      node.type === 'leaf' ? 'view details' :
                      node.type === 'subcenter' ? 'back' : '';
    tip.style.left = (mouse.x + 14) + 'px';
    tip.style.top = (mouse.y - 10) + 'px';
    tip.classList.add('visible');
  } else { tip.classList.remove('visible'); }
}
