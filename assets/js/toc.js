/* Sticky table of contents with scrollspy. Used by plan.html, terms.html, privacy.html.
   Markup: nav[data-toc] containing a[href="#id"] links. */
(function () {
  var nav = document.querySelector('[data-toc]');
  if (!nav) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var list = nav.querySelector('ul');
  var map = {};
  var sections = links.map(function (a) {
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if (el) map[el.id] = a;
    return el;
  }).filter(Boolean);
  if (!sections.length) return;

  var current = null;
  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var on = a === map[id];
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    // keep the active chip visible in the horizontal (mobile) list without moving the page
    var a = map[id];
    if (a && list && list.scrollWidth > list.clientWidth + 2) {
      var target = a.offsetLeft - (list.clientWidth - a.offsetWidth) / 2;
      try { list.scrollTo({ left: target, behavior: 'smooth' }); } catch (e) { list.scrollLeft = target; }
    }
  }

  function onScroll() {
    var line = window.innerHeight * 0.3;
    var id = sections[0].id;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) id = sections[i].id;
    }
    // at the very bottom, highlight the last section
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      id = sections[sections.length - 1].id;
    }
    setActive(id);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; onScroll(); });
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
