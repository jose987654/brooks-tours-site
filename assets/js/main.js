/* Brooks Tours & Travels — shared site script.
   Single place to change contact details: */
window.BROOKS = {
  phone: '+256 745 453 146',
  phoneHref: 'tel:+256745453146',
  whatsapp: '256745453146',
  email: 'hello@brookstours.co.ug'
};

document.documentElement.classList.add('js');

/* Inline --hero / --bg url() values resolve against the stylesheet that uses them,
   so rewrite them to absolute URLs as early as possible. (partials/head.html also
   applies them from an inline <style>, which covers the no-JS case.) */
(function () {
  function absolutise(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[style*="--hero"], [style*="--bg"]'), function (el) {
      ['--hero', '--bg'].forEach(function (prop) {
        var v = el.style.getPropertyValue(prop);
        var m = v && /url\(\s*['"]?([^'")]+)['"]?\s*\)/.exec(v);
        if (m && !/^(https?:|data:|file:|blob:)/.test(m[1])) {
          el.style.setProperty(prop, 'url("' + new URL(m[1], document.baseURI).href + '")');
        }
      });
    });
  }
  window.BROOKS_absolutiseBg = absolutise;
  absolutise(document);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { absolutise(document); });
})();

(function () {
  'use strict';
  var B = window.BROOKS;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var waDefault = "Hello Brooks Tours & Travels! I'd like help planning a safari.";

  function waLink(text) { return 'https://wa.me/' + B.whatsapp + '?text=' + encodeURIComponent(text || waDefault); }
  window.BROOKS.waLink = waLink;

  /* Fill text into an element: into a [data-*-text] child if present, else only when it has no element children */
  function fillText(el, childSel, text) {
    var target = $(childSel, el);
    if (target) { target.textContent = text; return; }
    if (!el.children.length && !el.textContent.trim()) el.textContent = text;
  }

  /* ---------- Contact markers ---------- */
  function fillContacts(root) {
    $$('[data-phone]', root).forEach(function (el) {
      if (el.tagName === 'A') el.setAttribute('href', B.phoneHref);
      fillText(el, '[data-phone-text]', B.phone);
      if (el.tagName === 'A' && !el.getAttribute('aria-label') && !el.textContent.trim()) el.setAttribute('aria-label', 'Call ' + B.phone);
    });
    $$('[data-whatsapp]', root).forEach(function (el) {
      if (el.tagName === 'A') {
        el.setAttribute('href', waLink(el.getAttribute('data-whatsapp') || ''));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
      fillText(el, '[data-whatsapp-text]', 'WhatsApp us');
    });
    $$('[data-email]', root).forEach(function (el) {
      if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + B.email);
      fillText(el, '[data-email-text]', B.email);
    });
    $$('[data-year]', root).forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }
  window.BROOKS.fillContacts = fillContacts;
  fillContacts(document);

  /* ---------- Header scroll state ---------- */
  var header = $('.site-header');
  var toTop = $('.to-top');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    var main = $('#main'); if (main) { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }); }
  });

  /* ---------- Active nav ---------- */
  var page = document.body.getAttribute('data-page') || (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
  var here = (location.pathname.split('/').pop() || 'index.html') + location.search;
  $$('.nav-item[data-nav]').forEach(function (li) {
    if ((' ' + li.getAttribute('data-nav') + ' ').indexOf(' ' + page + ' ') > -1) {
      li.classList.add('is-current');
      var top = $('.nav-link', li); if (top) top.setAttribute('aria-current', 'page');
    }
  });
  $$('.dropdown a[href], .drawer-nav a[href], .footer-col a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (href === page + '.html' && !location.search)) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Desktop dropdowns ---------- */
  $$('.nav-item').forEach(function (li) {
    var link = $('.nav-link', li), dd = $('.dropdown', li);
    if (!dd || !link) return;
    function open() { li.classList.remove('is-closed'); link.setAttribute('aria-expanded', 'true'); }
    function close(hard) { li.classList.remove('is-open'); link.setAttribute('aria-expanded', 'false'); if (hard) li.classList.add('is-closed'); }
    li.addEventListener('mouseenter', open);
    li.addEventListener('mouseleave', function () { li.classList.remove('is-closed'); close(); });
    li.addEventListener('focusin', open);
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) { li.classList.remove('is-closed'); close(); } });
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(true); link.focus(); }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var links = $$('a', dd), i = links.indexOf(document.activeElement);
        (links[i + 1] || links[0]).focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        var l2 = $$('a', dd), j = l2.indexOf(document.activeElement);
        (j <= 0 ? link : l2[j - 1]).focus();
      }
    });
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = $('.drawer'), toggle = $('.nav-toggle'), lastFocus = null;
  function setDrawer(open) {
    if (!header || !drawer) return;
    header.classList.toggle('drawer-open', open);
    document.documentElement.classList.toggle('drawer-lock', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      lastFocus = document.activeElement;
      setTimeout(function () { var c = $('.drawer__close', drawer); if (c) c.focus(); }, 60);
    } else if (lastFocus) { lastFocus.focus(); }
  }
  if (toggle) toggle.addEventListener('click', function () { setDrawer(!header.classList.contains('drawer-open')); });
  $$('[data-drawer-close]').forEach(function (el) { el.addEventListener('click', function () { setDrawer(false); }); });
  if (drawer) {
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setDrawer(false);
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button, summary', drawer).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    $$('a[href]', drawer).forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
    /* only one accordion open at a time */
    var dets = $$('.drawer-nav details', drawer);
    dets.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) dets.forEach(function (o) { if (o !== d) o.open = false; }); }); });
  }
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) setDrawer(false); });
  if (/[?&]drawer\b/.test(location.search)) setDrawer(true); /* preview helper */

  /* ---------- Reveal on scroll ---------- */
  var IO = 'IntersectionObserver' in window && !reduceMotion;
  var imgSel = '.tour-card__media img, .img-card > img, .split__media img, .gallery-item img, .media-frame img, [data-reveal-img] img';
  $$(imgSel).forEach(function (img) { if (!img.closest('.mega, .drawer')) img.classList.add('img-reveal'); });

  function reveal(el) { el.classList.add(el.classList.contains('img-reveal') ? 'is-in' : 'is-visible'); }
  function observeAll(root) {
    var els = $$('[data-reveal]:not(.is-visible), .img-reveal:not(.is-in)', root);
    if (!IO) { els.forEach(reveal); return; }
    els.forEach(function (el) { if (!el.__obs) { el.__obs = 1; io.observe(el); } });
  }
  var io = IO ? new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (e) { return e.isIntersecting; });
    batch.forEach(function (e, i) {
      var el = e.target;
      if (!el.classList.contains('img-reveal') && !el.style.getPropertyValue('--reveal-delay')) {
        el.style.setProperty('--reveal-delay', Math.min(i * 0.09, 0.45) + 's');
      }
      reveal(el);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  observeAll(document);
  /* pages that render content from data/*.js can call BROOKS.refresh(container) afterwards */
  window.BROOKS.refresh = function (root) {
    root = root || document;
    fillContacts(root);
    if (window.BROOKS_absolutiseBg) window.BROOKS_absolutiseBg(root);
    $$(imgSel, root).forEach(function (img) { if (!img.closest('.mega, .drawer')) img.classList.add('img-reveal'); });
    observeAll(root);
    initTabs(root);
  };
  /* auto-pick up content injected later by page scripts */
  if ('MutationObserver' in window) {
    var mo = new MutationObserver(function (muts) {
      var added = false;
      muts.forEach(function (m) { if (m.addedNodes.length) added = true; });
      if (added) { clearTimeout(mo.t); mo.t = setTimeout(function () { window.BROOKS.refresh(document); }, 30); }
    });
    var main = $('#main'); if (main) mo.observe(main, { childList: true, subtree: true });
  }

  /* ---------- Tabs ---------- */
  function initTabs(root) {
    $$('.tabs', root).forEach(function (tabs) {
      if (tabs.__tabs) return; tabs.__tabs = 1;
      var list = $('[role="tablist"]', tabs); if (!list) return;
      var btns = $$('[role="tab"]', list);
      var panels = $$('[role="tabpanel"]', tabs).filter(function (p) { return p.closest('.tabs') === tabs; });
      btns.forEach(function (b, i) {
        var p = b.getAttribute('aria-controls') ? document.getElementById(b.getAttribute('aria-controls')) : panels[i];
        if (!p) return;
        if (!p.id) p.id = 'tabpanel-' + Math.random().toString(36).slice(2, 8);
        if (!b.id) b.id = p.id + '-tab';
        b.setAttribute('aria-controls', p.id);
        p.setAttribute('aria-labelledby', b.id);
        p.setAttribute('tabindex', '0');
        b.__panel = p;
        if (b.tagName === 'BUTTON' && !b.getAttribute('type')) b.setAttribute('type', 'button');
      });
      function select(b, focus) {
        btns.forEach(function (o) {
          var on = o === b;
          o.setAttribute('aria-selected', String(on));
          o.setAttribute('tabindex', on ? '0' : '-1');
          if (o.__panel) o.__panel.hidden = !on;
        });
        if (focus) b.focus();
      }
      var initial = btns.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0] || btns[0];
      if (initial) select(initial);
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { select(b); });
        b.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowRight') n = btns[(i + 1) % btns.length];
          if (e.key === 'ArrowLeft') n = btns[(i - 1 + btns.length) % btns.length];
          if (e.key === 'Home') n = btns[0];
          if (e.key === 'End') n = btns[btns.length - 1];
          if (n) { e.preventDefault(); select(n, true); }
        });
      });
    });
  }
  initTabs(document);

  /* ---------- Forms ---------- */
  function labelFor(field, form) {
    var lab = field.id && form.querySelector('label[for="' + field.id + '"]');
    if (!lab) lab = field.closest('label');
    if (!lab) { var f = field.closest('.field'); lab = f && $('label, .field-label', f); }
    var t = lab ? lab.textContent.replace(/\*/g, '').replace(/\s+/g, ' ').trim() : '';
    if (!t) t = field.getAttribute('aria-label') || field.getAttribute('placeholder') || field.name;
    return t;
  }
  function clearError(field) {
    var wrap = field.closest('.field') || field.parentNode;
    wrap.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    var err = wrap.querySelector('.field-error'); if (err) err.remove();
  }
  function setError(field, msg) {
    clearError(field);
    var wrap = field.closest('.field') || field.parentNode;
    wrap.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    var err = document.createElement('p');
    err.className = 'field-error';
    err.id = (field.id || field.name) + '-error';
    err.textContent = msg;
    field.setAttribute('aria-describedby', err.id);
    wrap.appendChild(err);
  }
  function validate(form) {
    var first = null;
    $$('input, select, textarea', form).forEach(function (f) {
      if (f.disabled || f.type === 'hidden') return;
      clearError(f);
      var v = (f.value || '').trim(), msg = '';
      if (f.required) {
        if ((f.type === 'checkbox' || f.type === 'radio')) {
          var group = f.name ? $$('[name="' + f.name + '"]', form) : [f];
          if (!group.some(function (g) { return g.checked; })) msg = f.type === 'checkbox' && group.length === 1 ? 'Please tick this box to continue.' : 'Please choose an option.';
          if (msg && group[0] !== f) msg = '';
        } else if (!v) msg = 'Please enter your ' + labelFor(f, form).toLowerCase() + '.';
      }
      if (!msg && v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Please enter a valid email address.';
      if (!msg && v && f.type === 'tel' && v.replace(/\D/g, '').length < 7) msg = 'Please enter a valid phone number.';
      if (!msg && v && f.type === 'number' && f.min !== '' && Number(v) < Number(f.min)) msg = 'Please enter at least ' + f.min + '.';
      if (msg) { setError(f, msg); if (!first) first = f; }
    });
    if (first) first.focus();
    return !first;
  }
  function buildMessage(form) {
    var lines = ['New enquiry from Brooks website:'];
    var seen = {};
    $$('input[name], select[name], textarea[name]', form).forEach(function (f) {
      if (f.type === 'hidden' && !f.value) return;
      if (f.type === 'submit' || f.type === 'button') return;
      var name = f.name;
      if (f.type === 'checkbox' || f.type === 'radio') {
        if (seen[name]) return; seen[name] = 1;
        var checked = $$('[name="' + name + '"]', form).filter(function (g) { return g.checked; });
        if (!checked.length) return;
        var groupLabel = '';
        var fs = f.closest('fieldset'); if (fs && $('legend', fs)) groupLabel = $('legend', fs).textContent.trim();
        var fld = f.closest('.field'); if (!groupLabel && fld && $('.field-label', fld)) groupLabel = $('.field-label', fld).textContent.replace(/\*/g, '').trim();
        var vals = checked.map(function (c) { var l = c.closest('label'); return l ? l.textContent.replace(/\s+/g, ' ').trim() : c.value; });
        lines.push((groupLabel || labelFor(f, form)) + ': ' + (checked.length === 1 && vals[0] === labelFor(f, form) ? 'Yes' : vals.join(', ')));
        return;
      }
      var v = (f.value || '').trim(); if (!v) return;
      if (f.tagName === 'SELECT' && f.selectedOptions && f.selectedOptions[0]) v = f.selectedOptions[0].textContent.trim();
      lines.push(labelFor(f, form) + ': ' + v);
    });
    lines.push('Page: ' + document.title.split('|')[0].trim());
    return lines.join('\n');
  }
  function showSuccess(form, html) {
    var old = $('.form-success', form); if (old) old.remove();
    var box = document.createElement('div');
    box.className = 'form-success';
    box.setAttribute('role', 'status');
    box.setAttribute('tabindex', '-1');
    box.innerHTML = html;
    form.appendChild(box);
    box.focus({ preventScroll: true });
    box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  }
  $$('form[data-whatsapp-form]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('input', function (e) { if (e.target.closest('.is-invalid')) clearError(e.target); });
    form.addEventListener('change', function (e) { if (e.target.closest('.is-invalid')) clearError(e.target); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var url = waLink(buildMessage(form));
      var w = window.open(url, '_blank', 'noopener');
      if (!w) location.href = url;
      var custom = form.getAttribute('data-success');
      showSuccess(form, '<div><strong>' + (custom || 'Thank you — your enquiry is ready to send') + '</strong><p>WhatsApp has opened with your details filled in; just press send. A safari specialist replies within 2 working hours. Prefer email? Write to <a href="mailto:' + B.email + '">' + B.email + '</a>.</p></div>');
      form.reset();
    });
  });

  /* Newsletter (demo) */
  $$('form[data-newsletter-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input[type="email"]', form);
      var v = input ? input.value.trim() : '';
      var err = $('.field-error', form); if (err) err.remove();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        var p = document.createElement('p'); p.className = 'field-error'; p.textContent = 'Please enter a valid email address.';
        p.style.color = '#f0b7ad'; form.appendChild(p); if (input) input.focus(); return;
      }
      var row = $('.newsletter-form__row', form), small = $('small', form);
      if (row) row.hidden = true; if (small) small.hidden = true;
      showSuccess(form, '<div><strong>You are on the list</strong><p>Look out for our next Field Notes in your inbox.</p></div>');
    });
  });
})();

/* ---------- Theme (light / dark) ---------- */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'brooks-theme';
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function sync() {
    var dark = root.getAttribute('data-theme') === 'dark';
    Array.prototype.forEach.call(document.querySelectorAll('[data-theme-toggle]'), function (b) {
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      b.setAttribute('title', dark ? 'Light theme' : 'Dark theme');
    });
  }
  function apply(theme, save) {
    root.setAttribute('data-theme', theme);
    if (save) { try { localStorage.setItem(KEY, theme); } catch (e) {} }
    sync();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!b) return;
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });
  /* follow the OS setting live unless the visitor has chosen explicitly */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (m) { if (!stored() && !/[?&]theme=/.test(location.search)) apply(m.matches ? 'dark' : 'light', false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }
  sync();
})();
