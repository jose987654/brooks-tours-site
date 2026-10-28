/* FAQ live search + category filter (faq.html) */
(function () {
  'use strict';
  var input = document.getElementById('faq-q');
  if (!input) return;
  var groups = Array.prototype.slice.call(document.querySelectorAll('.faq-group'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.faq-group .acc-item'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('.faq-chips [data-cat]'));
  var countEl = document.querySelector('[data-count]');
  var emptyEl = document.querySelector('[data-empty]');
  var clearBtn = document.querySelector('[data-clear]');
  var cat = 'all';

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' '); }
  items.forEach(function (it) { it._text = norm(it.textContent); });

  function apply() {
    var q = norm(input.value.trim());
    var terms = q ? q.split(' ').filter(Boolean) : [];
    var shown = 0;
    groups.forEach(function (g) {
      var inCat = cat === 'all' || g.getAttribute('data-cat') === cat;
      var visible = 0;
      g.querySelectorAll('.acc-item').forEach(function (it) {
        var match = inCat && terms.every(function (t) { return it._text.indexOf(t) > -1; });
        it.hidden = !match;
        if (match) visible++;
      });
      g.hidden = visible === 0;
      shown += visible;
    });
    // Auto-open answers when a search narrows things down
    var matches = items.filter(function (it) { return !it.hidden; });
    items.forEach(function (it) {
      if (it.hasAttribute('data-auto-open')) { it.open = false; it.removeAttribute('data-auto-open'); }
    });
    if (terms.length && q.length >= 3 && matches.length <= 3) {
      matches.forEach(function (it) { if (!it.open) { it.open = true; it.setAttribute('data-auto-open', ''); } });
    }
    emptyEl.hidden = shown > 0;
    clearBtn.hidden = !input.value;
    var total = items.length;
    countEl.textContent = (shown === total) ? total + ' questions' :
      'Showing ' + shown + ' of ' + total + ' questions' + (q ? ' for "' + input.value.trim() + '"' : '');
  }

  function setCat(c) {
    cat = c;
    chips.forEach(function (ch) {
      var on = ch.getAttribute('data-cat') === c;
      ch.classList.toggle('is-active', on);
      ch.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    apply();
  }

  var t;
  input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(apply, 80); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { input.value = ''; apply(); } });
  clearBtn.addEventListener('click', function () { input.value = ''; apply(); input.focus(); });
  chips.forEach(function (ch) { ch.addEventListener('click', function () { setCat(ch.getAttribute('data-cat')); }); });
  document.querySelector('[data-reset]').addEventListener('click', function () { input.value = ''; setCat('all'); input.focus(); });

  // Deep links: faq.html?q=visa or faq.html?cat=permits or #g-visas
  var params = new URLSearchParams(location.search);
  if (params.get('q')) input.value = params.get('q');
  var startCat = params.get('cat');
  if (startCat && chips.some(function (c) { return c.getAttribute('data-cat') === startCat; })) setCat(startCat); else apply();
})();
