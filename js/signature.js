function initSignature() {
  var paths = document.querySelectorAll('#intro svg path');
  var delay = 0;
  paths.forEach(function(path) {
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    var dur = Math.max(0.25, len / 150);
    path.style.transition = 'stroke-dashoffset ' + dur + 's cubic-bezier(0.4, 0, 0.2, 1) ' + delay + 's';
    delay += dur * 0.55;
    requestAnimationFrame(function() { path.style.strokeDashoffset = '0'; });
  });
  var taglineDelay = delay * 1000 + 400;
  setTimeout(function() { document.getElementById('sigTagline').classList.add('visible'); }, taglineDelay);
  setTimeout(finishIntro, taglineDelay + 1500);
}
