/* Plan My Trip — multi-step trip builder (enquire.html) */
(function () {
  'use strict';
  var form = document.getElementById('planner-form');
  if (!form) return;

  var planner = document.getElementById('planner');
  var steps = Array.prototype.slice.call(form.querySelectorAll('.step'));
  var TOTAL = 5; // step 6 is the review screen
  var NAMES = ['Destinations', 'Experiences', 'When & how long', 'Travellers & style', 'Your details', 'Review'];
  var current = 1;
  var maxReached = 1;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var backBtn = $('[data-back]', form);
  var nextBtn = $('[data-next]', form);
  var errorEl = $('[data-error]', form);
  var bar = $('[data-bar]', planner);
  var barWrap = $('.planner__bar', planner);
  var countEl = $('[data-step-count]', planner);
  var nameEl = $('[data-step-name]', planner);
  var pctEl = $('[data-step-pct]', planner);
  var gotoBtns = $$('[data-goto]', planner);

  function cfg() { return window.BROOKS || {}; }
  function waNumber() {
    var n = String(cfg().whatsapp || '256745453146').replace(/\D/g, '');
    return n || '256745453146';
  }
  function email() { return cfg().email || 'hello@brookstours.co.ug'; }

  /* ---------- Year select ---------- */
  var yearSel = form.elements.year;
  var now = new Date();
  for (var y = now.getFullYear(); y <= now.getFullYear() + 2; y++) {
    var o = document.createElement('option'); o.value = o.textContent = String(y); yearSel.appendChild(o);
  }
  // Default to next year if we're late in the year
  if (now.getMonth() >= 9) yearSel.value = String(now.getFullYear() + 1);

  /* ---------- Dial code default from browser locale ---------- */
  (function () {
    var map = { US: '+1', CA: '+1', GB: '+44', DE: '+49', FR: '+33', NL: '+31', BE: '+32', CH: '+41', ES: '+34', IT: '+39',
      SE: '+46', NO: '+47', DK: '+45', IE: '+353', AU: '+61', NZ: '+64', ZA: '+27', UG: '+256', KE: '+254', RW: '+250',
      TZ: '+255', AE: '+971', IN: '+91', CN: '+86', JP: '+81', SG: '+65' };
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var m = /-([A-Z]{2})$/i.exec(langs[i] || '');
      if (m && map[m[1].toUpperCase()]) { form.elements.dial.value = map[m[1].toUpperCase()]; return; }
    }
  })();

  /* ---------- Helpers ---------- */
  function values(name) {
    return $$('input[name="' + name + '"]:checked', form).map(function (i) { return i.value; });
  }
  function val(name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el instanceof RadioNodeList) return el.value || '';
    return (el.value || '').trim();
  }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  /* ---------- Duration slider ---------- */
  var range = form.elements.duration;
  var durOut = $('[data-duration-out]', form);
  var durTip = $('[data-duration-tip]', form);
  function durationTip(d) {
    if (d <= 4) return 'Perfect for a focused gorilla or chimp trek, or a short add-on.';
    if (d <= 7) return 'Time for gorillas plus one classic savannah park.';
    if (d <= 10) return 'Ideal for a full country circuit — primates, big game and a boat safari.';
    if (d <= 14) return 'Enough to combine two countries at a relaxed pace.';
    return 'A grand East African journey — add the Migration or a Zanzibar beach finale.';
  }
  function syncRange() {
    var d = +range.value;
    var pct = (d - +range.min) / (+range.max - +range.min) * 100;
    range.style.setProperty('--fill', pct + '%');
    durOut.textContent = plural(d, 'day', 'days');
    range.setAttribute('aria-valuetext', plural(d, 'day', 'days'));
    durTip.textContent = durationTip(d);
  }
  range.addEventListener('input', syncRange);

  /* ---------- Steppers ---------- */
  function clampNum(input) {
    var min = +input.min, max = +input.max;
    var v = parseInt(input.value, 10);
    if (isNaN(v)) v = min;
    v = Math.max(min, Math.min(max, v));
    input.value = v;
    var wrap = input.parentNode;
    $$('button', wrap).forEach(function (b) {
      var delta = +b.getAttribute('data-delta');
      b.disabled = delta < 0 ? v <= min : v >= max;
    });
    if (input.name === 'children') $('[data-child-note]', form).hidden = v === 0;
    return v;
  }
  $$('[data-step-btn]', form).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = form.elements[btn.getAttribute('data-step-btn')];
      input.value = (parseInt(input.value, 10) || 0) + (+btn.getAttribute('data-delta'));
      clampNum(input);
    });
  });
  ['adults', 'children'].forEach(function (n) {
    form.elements[n].addEventListener('change', function () { clampNum(form.elements[n]); });
  });

  /* ---------- Flexible toggle ---------- */
  var flexible = form.elements.flexible;
  flexible.addEventListener('change', function () {
    planner.classList.toggle('is-flexible', flexible.checked);
  });

  /* "Help me choose" is exclusive-ish: picking it doesn't block others; just clear errors on change */
  form.addEventListener('change', function () { if (!errorEl.hidden) validate(current, true); });

  /* ---------- Validation ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setFieldError(input, msg) {
    var field = input.closest('.field');
    if (!field) return;
    var err = field.querySelector('.field-error');
    if (msg) {
      if (!err) { err = document.createElement('p'); err.className = 'field-error'; err.id = input.id + '-err'; field.appendChild(err); }
      err.textContent = msg;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
      field.classList.add('has-error');
    } else {
      if (err) err.remove();
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      field.classList.remove('has-error');
    }
  }
  function validate(step, quiet) {
    var msg = '';
    var focusEl = null;
    if (step === 1 && !values('destinations').length) {
      msg = 'Please choose at least one destination — or select "Help me choose".';
      focusEl = $('input[name="destinations"]', form);
    } else if (step === 2 && !values('experiences').length) {
      msg = 'Please choose at least one experience you would enjoy.';
      focusEl = $('input[name="experiences"]', form);
    } else if (step === 3 && !values('months').length && !flexible.checked) {
      msg = 'Choose at least one month, or switch on "My dates are flexible".';
      focusEl = $('input[name="months"]', form);
    } else if (step === 4) {
      if (!val('budget')) { msg = 'Please choose a budget range per person.'; focusEl = $('input[name="budget"]', form); }
      else if (!val('style')) { msg = 'Please choose your preferred travel style.'; focusEl = $('input[name="style"]', form); }
    } else if (step === 5) {
      var name = form.elements.name, mail = form.elements.email, phone = form.elements.phone;
      var errs = [];
      var nameMsg = val('name').length < 2 ? 'Please enter your name.' : '';
      var mailMsg = !val('email') ? 'Please enter your email address.' : (!EMAIL_RE.test(val('email')) ? 'That email address doesn\'t look quite right.' : '');
      var digits = val('phone').replace(/\D/g, '');
      var phoneMsg = digits.length < 6 ? 'Please enter a phone number we can reach you on.' : (digits.length > 15 ? 'That phone number looks too long.' : '');
      if (!quiet || name.hasAttribute('aria-invalid')) setFieldError(name, nameMsg);
      if (!quiet || mail.hasAttribute('aria-invalid')) setFieldError(mail, mailMsg);
      if (!quiet || phone.hasAttribute('aria-invalid')) setFieldError(phone, phoneMsg);
      if (nameMsg) errs.push(name); if (mailMsg) errs.push(mail); if (phoneMsg) errs.push(phone);
      if (errs.length) { msg = 'Please check the highlighted fields.'; focusEl = errs[0]; }
    }
    if (msg && quiet && errorEl.hidden) return false;
    errorEl.textContent = msg;
    errorEl.hidden = !msg;
    var stepEl = stepNode(step);
    if (stepEl) stepEl.classList.toggle('has-error', !!msg);
    if (msg && !quiet && focusEl) focusEl.focus({ preventScroll: false });
    return !msg;
  }
  ['name', 'email', 'phone'].forEach(function (n) {
    form.elements[n].addEventListener('blur', function () {
      if (current === 5 && form.elements[n].value) validate(5, true);
    });
    form.elements[n].addEventListener('input', function () {
      if (form.elements[n].hasAttribute('aria-invalid')) validate(5, true);
    });
  });

  /* ---------- Step navigation ---------- */
  function stepNode(n) { return form.querySelector('.step[data-step="' + n + '"]'); }

  function show(n, opts) {
    opts = opts || {};
    current = n;
    if (n <= TOTAL) maxReached = Math.max(maxReached, n);
    steps.forEach(function (s) { s.hidden = +s.getAttribute('data-step') !== n; });
    errorEl.hidden = true; errorEl.textContent = '';

    var shown = Math.min(n, TOTAL);
    var pct = n > TOTAL ? 100 : Math.round(n / TOTAL * 100);
    bar.style.width = pct + '%';
    barWrap.setAttribute('aria-valuenow', String(shown));
    countEl.textContent = n > TOTAL ? 'All steps complete' : 'Step ' + n + ' of ' + TOTAL;
    nameEl.textContent = NAMES[n - 1];
    pctEl.textContent = pct + '%';
    gotoBtns.forEach(function (b) {
      var s = +b.getAttribute('data-goto');
      var li = b.parentNode;
      li.classList.toggle('is-current', s === n);
      li.classList.toggle('is-done', s < n || (n > TOTAL));
      b.disabled = s > maxReached && n <= TOTAL;
      if (s === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });

    backBtn.hidden = n === 1;
    if (n === TOTAL) nextBtn.innerHTML = 'Review my trip <span class="arr">→</span>';
    else if (n > TOTAL) nextBtn.innerHTML = 'Send via WhatsApp <span class="arr">→</span>';
    else nextBtn.innerHTML = 'Next <span class="arr">→</span>';
    nextBtn.classList.toggle('btn-whatsapp', n > TOTAL);
    nextBtn.classList.toggle('btn-primary', n <= TOTAL);
    planner.setAttribute('data-current', String(n));

    if (n > TOTAL) renderReview();

    if (!opts.initial) {
      var top = planner.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.4) {
        var y = window.pageYOffset + top - 96;
        window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
      var title = $('.step__title', stepNode(n));
      if (title) title.focus({ preventScroll: true });
    }
    if (!opts.noHistory) {
      try { history.replaceState(null, '', updateParam('step', n > 1 ? n : null)); } catch (e) { /* file:// */ }
    }
  }

  function updateParam(key, value) {
    var url = new URL(location.href);
    if (value == null) url.searchParams.delete(key); else url.searchParams.set(key, value);
    return url.pathname + url.search + url.hash;
  }

  function next() {
    if (current > TOTAL) return submit();
    if (!validate(current)) return;
    show(current + 1);
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); next(); });
  backBtn.addEventListener('click', function () { if (current > 1) show(current - 1); });
  gotoBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var s = +b.getAttribute('data-goto');
      if (s <= maxReached) show(s);
    });
  });
  // Enter on checkboxes/radios shouldn't toggle-and-submit unexpectedly; Enter on a tile label advances
  form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'Enter' && (e.target.type === 'checkbox' || e.target.type === 'radio')) { e.preventDefault(); next(); }
  });

  /* ---------- Review + message ---------- */
  function travellers() {
    var a = +val('adults') || 1, c = +val('children') || 0;
    return plural(a, 'adult', 'adults') + (c ? ', ' + plural(c, 'child', 'children') : '');
  }
  function when() {
    var m = values('months');
    var s = m.length ? m.join(', ') + ' ' + val('year') : 'Any time in ' + val('year');
    if (flexible.checked) s += ' (flexible)';
    return s;
  }
  function data() {
    return [
      { step: 1, label: 'Trip of interest', value: val('trip'), optional: true },
      { step: 1, label: 'Destinations', value: values('destinations').join(', ') },
      { step: 2, label: 'Experiences', value: values('experiences').join(', ') },
      { step: 3, label: 'When', value: when() },
      { step: 3, label: 'Duration', value: plural(+val('duration'), 'day', 'days') },
      { step: 4, label: 'Travellers', value: travellers() },
      { step: 4, label: 'Budget', value: val('budget') },
      { step: 4, label: 'Style', value: val('style') },
      { step: 5, label: 'Name', value: val('name') },
      { step: 5, label: 'Email', value: val('email') },
      { step: 5, label: 'Phone', value: val('phone') ? val('dial') + ' ' + val('phone') : '' },
      { step: 5, label: 'Notes', value: val('notes'), optional: true }
    ].filter(function (r) { return !r.optional || r.value; });
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function renderReview() {
    var dl = $('[data-review]', form);
    var groups = {};
    data().forEach(function (r) { (groups[r.step] = groups[r.step] || []).push(r); });
    var html = '';
    Object.keys(groups).forEach(function (s) {
      html += '<div class="review__group"><div class="review__head"><span>' + esc(NAMES[s - 1]) + '</span>' +
        '<button type="button" class="review__edit" data-edit="' + s + '">Edit<span class="sr-only"> ' + esc(NAMES[s - 1]) + '</span></button></div>';
      groups[s].forEach(function (r) {
        html += '<div class="review__row"><dt>' + esc(r.label) + '</dt><dd>' + esc(r.value || '—') + '</dd></div>';
      });
      html += '</div>';
    });
    dl.innerHTML = html;
    $$('[data-edit]', dl).forEach(function (b) {
      b.addEventListener('click', function () { show(+b.getAttribute('data-edit')); });
    });
  }
  function message(rich) {
    var b = rich ? function (s) { return '*' + s + '*'; } : function (s) { return s; };
    var lines = [b('New trip enquiry — Brooks Tours & Travels'), ''];
    data().forEach(function (r, i, all) {
      if (i > 0 && r.step === 5 && all[i - 1].step !== 5) lines.push('', b('Contact details'));
      lines.push(b(r.label + ':') + ' ' + r.value);
    });
    lines.push('', 'Sent from the Plan My Trip form');
    return lines.join('\n');
  }
  function waUrl() { return 'https://wa.me/' + waNumber() + '?text=' + encodeURIComponent(message(true)); }
  function mailUrl() {
    var subject = 'Trip enquiry: ' + (val('trip') || values('destinations').join(' + ') || 'East Africa safari') + ' — ' + val('name');
    return 'mailto:' + email() + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message(false));
  }

  function submit() {
    for (var s = 1; s <= TOTAL; s++) {
      if (!validate(s, false)) { show(s); validate(s); return; }
    }
    var wa = waUrl();
    var win = window.open(wa, '_blank', 'noopener');
    var success = $('[data-success]', planner);
    $('[data-wa-link]', success).href = wa;
    $('[data-mail-link]', success).href = mailUrl();
    var first = val('name').split(/\s+/)[0];
    $('[data-success-name]', success).textContent = first ? ', ' + first : '';
    form.hidden = true;
    $('.planner__progress', planner).classList.add('is-complete');
    bar.style.width = '100%';
    countEl.textContent = 'Request ready';
    nameEl.textContent = 'Sent to WhatsApp';
    pctEl.textContent = '100%';
    gotoBtns.forEach(function (b) { b.parentNode.classList.add('is-done'); b.parentNode.classList.remove('is-current'); b.disabled = true; });
    success.hidden = false;
    planner.classList.add('is-sent');
    success.focus();
    var top = planner.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: window.pageYOffset + top - 96, behavior: 'smooth' });
    if (!win) { /* popup blocked: the visible "Open WhatsApp" button remains */ }
  }

  /* ---------- Prefill from URL ---------- */
  var params = new URLSearchParams(location.search);
  var COUNTRIES = { uganda: 'Uganda', rwanda: 'Rwanda', kenya: 'Kenya', tanzania: 'Tanzania', zanzibar: 'Zanzibar' };
  function check(name, value) {
    var el = $('input[name="' + name + '"][value="' + value + '"]', form);
    if (el) el.checked = true;
  }
  (params.get('d') || params.get('country') || '').toLowerCase().split(',').forEach(function (d) {
    if (COUNTRIES[d.trim()]) check('destinations', COUNTRIES[d.trim()]);
  });
  var tripSlug = params.get('trip') || params.get('t');
  if (tripSlug) {
    var tours = window.BROOKS_TOURS || [];
    var tour = null;
    for (var i = 0; i < tours.length; i++) if (tours[i] && tours[i].slug === tripSlug) { tour = tours[i]; break; }
    var title = tour && (tour.title || tour.name) ||
      tripSlug.replace(/-\d+d$/, '').split('-').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
    var days = tour && (tour.days || tour.duration) || (/-(\d+)d$/.exec(tripSlug) || [])[1];
    if (days && !/day/i.test(title)) title += ' (' + parseInt(days, 10) + ' days)';
    form.elements.trip.value = title;
    $('[data-trip-name]', form).textContent = title;
    $('[data-trip-banner]', form).hidden = false;
    // infer destinations and duration from the tour
    var hay = (tripSlug + ' ' + JSON.stringify(tour && (tour.countries || tour.country || tour.destinations) || '')).toLowerCase();
    Object.keys(COUNTRIES).forEach(function (k) { if (hay.indexOf(k) > -1) check('destinations', COUNTRIES[k]); });
    if (/gorilla/.test(hay)) check('experiences', 'Gorilla trekking');
    if (/primate|chimp/.test(hay)) { check('experiences', 'Chimpanzee tracking'); check('experiences', 'Gorilla trekking'); }
    if (/migration/.test(hay)) check('experiences', 'Great Migration');
    if (/mara|serengeti|wildlife|explorer/.test(hay)) check('experiences', 'Big Five game drives');
    if (/honeymoon/.test(hay)) { check('experiences', 'Honeymoon'); check('experiences', 'Beach and islands'); }
    if (/luxury|fly-in/.test(hay)) check('style', 'Luxury');
    if (days) { range.value = Math.max(3, Math.min(21, parseInt(days, 10))); }
  }

  /* ---------- Init ---------- */
  syncRange();
  clampNum(form.elements.adults);
  clampNum(form.elements.children);
  var startStep = parseInt(params.get('step'), 10);
  if (startStep >= 1 && startStep <= TOTAL + 1) {
    maxReached = Math.min(startStep, TOTAL);
    show(startStep, { initial: true, noHistory: true });
  } else {
    show(1, { initial: true, noHistory: true });
  }
})();
