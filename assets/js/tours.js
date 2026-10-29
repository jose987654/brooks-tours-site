/* tours.html — filterable safari catalogue */
(function () {
  "use strict";
  var TOURS = window.BROOKS_TOURS || [];
  var COUNTRY = window.BROOKS_COUNTRY_NAMES;
  var EXP = window.BROOKS_EXPERIENCE_NAMES;
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var DURATIONS = { "short": { label: "1–5 days", min: 1, max: 5 }, "mid": { label: "6–9 days", min: 6, max: 9 }, "long": { label: "10+ days", min: 10, max: 99 } };
  var STYLES = ["Mid-range", "Luxury", "Fly-in"];

  var grid = document.getElementById("tours-grid");
  if (!grid) return;
  var empty = document.getElementById("tours-empty");
  var search = document.getElementById("tf-search");
  var monthSel = document.getElementById("tf-month");
  var sortSel = document.getElementById("tf-sort");
  var panel = document.getElementById("tour-filters");
  var backdrop = document.querySelector(".tours-sheet-backdrop");
  var filterBtn = document.querySelector(".tours-filter-btn");
  var activeBox = document.querySelector("[data-active]");

  var state = { q: "", country: [], experience: [], duration: [], style: [], month: "", sort: "recommended" };

  /* ---------- build controls ---------- */
  function chips(group, entries) {
    var box = document.querySelector('[data-filter="' + group + '"]');
    box.innerHTML = entries.map(function (e) {
      return '<button type="button" class="chip" data-group="' + group + '" data-value="' + e[0] + '" aria-pressed="false">' + e[1] + '</button>';
    }).join("");
  }
  chips("country", Object.keys(COUNTRY).map(function (k) { return [k, COUNTRY[k]]; }));
  chips("experience", Object.keys(EXP).map(function (k) { return [k, EXP[k]]; }));
  chips("duration", Object.keys(DURATIONS).map(function (k) { return [k, DURATIONS[k].label]; }));
  chips("style", STYLES.map(function (s) { return [s.toLowerCase(), s]; }));
  MONTHS.forEach(function (m, i) {
    var o = document.createElement("option"); o.value = String(i + 1); o.textContent = m; monthSel.appendChild(o);
  });

  /* ---------- URL params (from nav + home trip-finder) ---------- */
  function parseMonth(v) {
    if (!v) return "";
    v = String(v).trim().toLowerCase();
    var n = parseInt(v, 10);
    if (n >= 1 && n <= 12) return String(n);
    for (var i = 0; i < 12; i++) if (MONTHS[i].toLowerCase().indexOf(v.slice(0, 3)) === 0 && v.length >= 3) return String(i + 1);
    return "";
  }
  function listParam(p, key, valid) {
    var raw = p.getAll(key).join(",").toLowerCase();
    return raw.split(",").map(function (s) { return s.trim(); }).filter(function (s) { return s && valid.indexOf(s) > -1; });
  }
  var params = new URLSearchParams(location.search);
  state.country = listParam(params, "country", Object.keys(COUNTRY));
  var expAliases = { gorilla: "gorillas", chimp: "chimps", chimpanzees: "chimps", bigfive: "big-five", "big five": "big-five", birds: "birding", beaches: "beach" };
  var expRaw = params.getAll("experience").join(",").toLowerCase().split(",").map(function (s) { s = s.trim(); return expAliases[s] || s; });
  state.experience = expRaw.filter(function (s) { return EXP[s]; });
  state.duration = listParam(params, "duration", Object.keys(DURATIONS));
  state.style = listParam(params, "style", STYLES.map(function (s) { return s.toLowerCase(); }));
  state.month = parseMonth(params.get("month"));
  state.q = (params.get("q") || "").slice(0, 80);
  var sp = params.get("sort");
  if (sp && sortSel.querySelector('option[value="' + sp + '"]')) state.sort = sp;

  /* ---------- filtering ---------- */
  function haystack(t) {
    var it = t.itinerary.map(function (d) { return d.title + " " + d.overnight + " " + d.text; }).join(" ");
    return (t.title + " " + t.summary + " " + t.highlights.join(" ") + " " + t.countries.join(" ") + " " + t.experiences.map(function (e) { return EXP[e]; }).join(" ") + " " + t.style + " " + it).toLowerCase();
  }
  TOURS.forEach(function (t) { t._hay = haystack(t); });

  function matches(t) {
    if (state.q) {
      var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      for (var i = 0; i < words.length; i++) if (t._hay.indexOf(words[i]) === -1) return false;
    }
    if (state.country.length && !state.country.some(function (c) { return t.countries.indexOf(c) > -1; })) return false;
    if (state.experience.length && !state.experience.some(function (e) { return t.experiences.indexOf(e) > -1; })) return false;
    if (state.duration.length && !state.duration.some(function (d) { var r = DURATIONS[d]; return t.days >= r.min && t.days <= r.max; })) return false;
    if (state.style.length && state.style.indexOf(t.style.toLowerCase()) === -1) return false;
    if (state.month && t.months && t.months.indexOf(+state.month) === -1) return false;
    return true;
  }

  function sorted(list) {
    var l = list.slice();
    var by = {
      "price-asc": function (a, b) { return a.priceFrom - b.priceFrom; },
      "price-desc": function (a, b) { return b.priceFrom - a.priceFrom; },
      "days-asc": function (a, b) { return a.days - b.days || a.priceFrom - b.priceFrom; },
      "days-desc": function (a, b) { return b.days - a.days || b.priceFrom - a.priceFrom; }
    }[state.sort];
    return by ? l.sort(by) : l;
  }

  /* ---------- render ---------- */
  function activeCount() {
    return state.country.length + state.experience.length + state.duration.length + state.style.length + (state.month ? 1 : 0) + (state.q ? 1 : 0);
  }

  function renderActive() {
    var pills = [];
    function add(group, value, label) {
      pills.push('<button type="button" class="tours-active__pill" data-remove-group="' + group + '" data-remove-value="' + window.brooksEsc(value) + '" aria-label="Remove filter ' + window.brooksEsc(label) + '">' + window.brooksEsc(label) +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>');
    }
    if (state.q) add("q", state.q, "“" + state.q + "”");
    state.country.forEach(function (c) { add("country", c, COUNTRY[c]); });
    state.experience.forEach(function (e) { add("experience", e, EXP[e]); });
    state.duration.forEach(function (d) { add("duration", d, DURATIONS[d].label); });
    state.style.forEach(function (s) { add("style", s, STYLES.filter(function (x) { return x.toLowerCase() === s; })[0]); });
    if (state.month) add("month", state.month, "Good in " + MONTHS[state.month - 1]);
    activeBox.hidden = !pills.length;
    activeBox.innerHTML = pills.join("") + (pills.length ? '<button type="button" class="tours-active__clear" data-reset>Clear all</button>' : "");
    var n = activeCount();
    var badge = document.querySelector("[data-active-n]");
    badge.hidden = !n; badge.textContent = n;
  }

  function syncControls() {
    document.querySelectorAll(".tf-chips .chip").forEach(function (b) {
      var on = state[b.dataset.group].indexOf(b.dataset.value) > -1;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (search.value !== state.q) search.value = state.q;
    monthSel.value = state.month;
    sortSel.value = state.sort;
  }

  function writeUrl() {
    var p = new URLSearchParams();
    if (state.q) p.set("q", state.q);
    ["country", "experience", "duration", "style"].forEach(function (k) { if (state[k].length) p.set(k, state[k].join(",")); });
    if (state.month) p.set("month", state.month);
    if (state.sort !== "recommended") p.set("sort", state.sort);
    var qs = p.toString().replace(/%2C/g, ",");
    try { history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "")); } catch (e) { /* file:// in some browsers */ }
  }

  // Closing card in the results: a tailor-made trip in the filtered country (or anywhere)
  function customCard() {
    var c = state.country.length === 1 ? state.country[0] : "";
    var name = c ? COUNTRY[c] : "East Africa";
    var href = "enquire.html" + (c ? "?d=" + c : "");
    return '<article class="tour-card tour-card--custom"><div class="tour-card__body">' +
      '<span class="eyebrow">Tailor-made</span>' +
      '<h3><a href="' + href + '">Design your own ' + name + ' tour</a></h3>' +
      '<p>Pick the places, the pace and the lodges. Mix gorillas, a Rwenzori climb, chimps, game drives or the Nile, and we build the route and quote within 24 hours.</p>' +
      '<ul class="icon-list"><li>Any length, any start date</li><li>Private vehicle and guide</li><li>Free, no-obligation itinerary</li></ul>' +
      '<div class="tour-card__foot"><a class="btn btn-primary btn-sm" href="' + href + '">Start planning <span class="arr">→</span></a></div>' +
      '</div></article>';
  }

  function render() {
    var list = sorted(TOURS.filter(matches));
    grid.innerHTML = list.map(window.brooksTourCard).join("") + (list.length ? customCard() : "");
    grid.hidden = !list.length;
    empty.hidden = !!list.length;
    document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = list.length; });
    var lbl = document.querySelector("[data-count-label]");
    lbl.textContent = (list.length === 1 ? "safari" : "safaris") + (activeCount() ? " match your filters" : " to explore");
    syncControls();
    renderActive();
  }

  function update() { render(); writeUrl(); }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".tf-chips .chip");
    if (chip) {
      var arr = state[chip.dataset.group], i = arr.indexOf(chip.dataset.value);
      if (i > -1) arr.splice(i, 1); else arr.push(chip.dataset.value);
      update(); return;
    }
    var rm = e.target.closest("[data-remove-group]");
    if (rm) {
      var g = rm.dataset.removeGroup, v = rm.dataset.removeValue;
      if (g === "q" || g === "month") state[g] = "";
      else state[g] = state[g].filter(function (x) { return x !== v; });
      update(); return;
    }
    if (e.target.closest("[data-reset]")) {
      state.q = ""; state.country = []; state.experience = []; state.duration = []; state.style = []; state.month = "";
      update(); return;
    }
  });

  var tId;
  search.addEventListener("input", function () {
    clearTimeout(tId);
    tId = setTimeout(function () { state.q = search.value.trim().slice(0, 80); update(); }, 180);
  });
  monthSel.addEventListener("change", function () { state.month = monthSel.value; update(); });
  sortSel.addEventListener("change", function () { state.sort = sortSel.value; update(); });

  /* ---------- mobile filter sheet ---------- */
  var mq = window.matchMedia("(max-width: 959px)");
  var lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement;
    panel.classList.add("is-open");
    backdrop.hidden = false;
    requestAnimationFrame(function () { backdrop.classList.add("is-open"); });
    document.documentElement.classList.add("tours-sheet-lock");
    filterBtn.setAttribute("aria-expanded", "true");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    var c = panel.querySelector(".tours-filters__close"); if (c) c.focus();
  }
  function closeSheet() {
    if (!panel.classList.contains("is-open")) return;
    panel.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    setTimeout(function () { if (!panel.classList.contains("is-open")) backdrop.hidden = true; }, 300);
    document.documentElement.classList.remove("tours-sheet-lock");
    filterBtn.setAttribute("aria-expanded", "false");
    panel.removeAttribute("role"); panel.removeAttribute("aria-modal");
    if (lastFocus) lastFocus.focus();
  }
  filterBtn.addEventListener("click", openSheet);
  document.querySelectorAll("[data-sheet-close]").forEach(function (b) { b.addEventListener("click", closeSheet); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });
  (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () { if (!mq.matches) closeSheet(); });

  render();
})();
