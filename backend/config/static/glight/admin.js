/* G-LIGHT admin: count-up numbers, button ripple, time-based greeting. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target) || reduce || target === 0) { return; }
      var start = null, dur = 1100;
      el.textContent = '0';
      function step(ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) { requestAnimationFrame(step); } else { el.textContent = target; }
      }
      requestAnimationFrame(step);
    });
  }

  function greeting() {
    var h = document.querySelector('.gl-greeting');
    if (!h) { return; }
    var name = h.getAttribute('data-name') || '';
    var hr = new Date().getHours();
    var word = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
    h.textContent = word + ', ' + name;
  }

  function ripple() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.button, input[type=submit], input[type=button], a.button');
      if (!b || reduce) { return; }
      var r = b.getBoundingClientRect();
      var s = document.createElement('span');
      var size = Math.max(r.width, r.height);
      s.className = 'gl-ripple';
      s.style.width = s.style.height = size + 'px';
      s.style.left = (e.clientX - r.left - size / 2) + 'px';
      s.style.top = (e.clientY - r.top - size / 2) + 'px';
      if (getComputedStyle(b).position === 'static') { b.style.position = 'relative'; }
      b.appendChild(s);
      setTimeout(function () { s.remove(); }, 650);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    countUp(); greeting(); ripple();
  });
})();
