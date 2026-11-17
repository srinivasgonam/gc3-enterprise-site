(function () {
  // mobile menu
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelector('span').textContent = open ? 'close' : 'menu';
    });
  }

  // scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // credit pool planner (products page)
  var planner = document.getElementById('planner');
  if (planner) {
    var boxes = planner.querySelectorAll('input[type=checkbox]');
    var total = document.getElementById('plan-total');
    var left = document.getElementById('plan-left');
    var fill = document.getElementById('plan-fill');
    var pool = parseInt(planner.getAttribute('data-pool'), 10) || 2000;
    var update = function () {
      var sum = 0;
      boxes.forEach(function (b) { if (b.checked) sum += parseInt(b.value, 10); });
      total.textContent = sum.toLocaleString();
      left.textContent = Math.max(pool - sum, 0).toLocaleString();
      fill.style.width = Math.min(sum / pool * 100, 100) + '%';
      fill.style.background = sum > pool ? '#ffb4ab' : '';
    };
    boxes.forEach(function (b) { b.addEventListener('change', update); });
    update();
  }

  // forms (static site: no backend wired)
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = f.querySelector('.notice');
      if (n) { n.classList.add('show'); n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    });
  });
})();
