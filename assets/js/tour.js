/* tour.html?t=slug — renders a single safari from data/tours.js */
(function () {
  "use strict";
  var TOURS = window.BROOKS_TOURS || [];
  var esc = window.brooksEsc, money = window.brooksMoney;
  var COUNTRY = window.BROOKS_COUNTRY_NAMES, EXP = window.BROOKS_EXPERIENCE_NAMES;
  var slug = (new URLSearchParams(location.search).get("t") || "").trim().toLowerCase();
  var tour = TOURS.filter(function (t) { return t.slug === slug; })[0];
  var root = document.getElementById("tour-root");
  if (!root) return;

  if (!tour) {
    document.getElementById("tour-missing").hidden = false;
    document.title = "Safari not found | Brooks Tours & Travels";
    return;
  }
  root.hidden = false;

  var IMG_ALT = {
    "gorilla-family": "A mountain gorilla family resting in the forest", "gorilla-baby": "A baby mountain gorilla in Bwindi",
    "bunyonyi": "Terraced islands on Lake Bunyonyi", "rwanda-hills": "Terraced green hills of Rwanda",
    "chimpanzee": "A chimpanzee in the forest canopy", "kazinga": "Hippos and buffalo along the Kazinga Channel",
    "lion-tree": "A tree-climbing lion resting in a fig tree", "murchison": "The Nile thundering through Murchison Falls",
    "rhino": "White rhinos grazing", "elephant-queen": "Elephants in Queen Elizabeth National Park", "shoebill": "A shoebill stork in the papyrus",
    "chimp-kyambura": "A chimpanzee in Kyambura Gorge", "safari-lodge": "A luxury safari lodge at dusk",
    "golden-monkey": "A golden monkey among bamboo", "virunga-volcanoes": "The Virunga volcanoes above the clouds", "kigali": "Kigali city on its green hills",
    "elephants-amboseli": "Elephants crossing Amboseli beneath Kilimanjaro", "kilimanjaro": "Snow-capped Mount Kilimanjaro",
    "masai-mara": "Open plains of the Masai Mara", "lion-mara": "A male lion in the Masai Mara", "maasai-people": "Maasai men in traditional dress",
    "serengeti": "Acacia trees on the Serengeti plains", "ngorongoro": "The Ngorongoro Crater floor", "giraffe": "A giraffe browsing an acacia",
    "leopard": "A leopard resting on a branch", "zebras": "A herd of zebras", "migration": "Wildebeest crossing the Mara River",
    "balloon": "A hot-air balloon over the savannah at sunrise", "nairobi-giraffe": "A Rothschild's giraffe in Nairobi",
    "nyungwe": "Mist over Nyungwe Forest", "lake-kivu": "Lake Kivu at sunset", "zanzibar": "A dhow on turquoise water off Zanzibar",
    "sunset-acacia": "An acacia silhouetted at sunset", "kidepo": "The Narus Valley in Kidepo", "buffalo": "Cape buffalo on the plains"
  };
  function alt(name) { return IMG_ALT[name] || tour.title; }

  var countries = tour.countries.map(function (c) { return COUNTRY[c]; });
  var countryText = countries.length > 1 ? countries.slice(0, -1).join(", ") + " & " + countries[countries.length - 1] : countries[0];
  var MEALS = { B: "Breakfast", L: "Lunch", D: "Dinner" };
  function meals(m) {
    var parts = String(m || "").split("/").filter(function (x) { return MEALS[x]; }).map(function (x) { return MEALS[x]; });
    if (!parts.length) return "";
    return parts.length === 1 ? parts[0] : parts.slice(0, -1).join(", ") + " & " + parts[parts.length - 1].toLowerCase();
  }
  function fill(key, html) { root.querySelectorAll('[data-t="' + key + '"]').forEach(function (el) { el.innerHTML = html; }); }
  function text(key, s) { root.querySelectorAll('[data-t="' + key + '"]').forEach(function (el) { el.textContent = s; }); }

  var ICON = {
    days: '<path d="M8 3v3M16 3v3M4 9h16"/><rect x="4" y="5" width="16" height="16" rx="2"/>',
    pin: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    style: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    bed: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>',
    fork: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 7h3"/>'
  };
  function svg(name, size) { return '<svg viewBox="0 0 24 24" width="' + (size || 18) + '" height="' + (size || 18) + '" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + '</svg>'; }

  /* ---------- head ---------- */
  document.title = tour.title + " — " + tour.days + " Days | Brooks Tours & Travels";
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", tour.summary);

  /* ---------- hero ---------- */
  document.getElementById("tour-hero").style.setProperty("--hero", 'url("' + new URL("assets/img/" + tour.image + ".webp", document.baseURI).href + '")');
  text("title", tour.title);
  text("eyebrow", tour.days + "-day private safari · " + countryText);
  text("summary", tour.summary);
  fill("pills", [
    '<li>' + svg("days") + tour.days + ' days / ' + tour.nights + ' nights</li>',
    '<li>' + svg("pin") + esc(countries.join(" · ")) + '</li>',
    '<li>' + svg("style") + esc(tour.style) + '</li>',
    '<li class="tour-pills__price">' + svg("tag") + 'From ' + money(tour.priceFrom) + ' pp</li>'
  ].join(""));
  text("subprice", "From " + money(tour.priceFrom) + " pp");

  /* ---------- overview ---------- */
  var expNames = tour.experiences.map(function (e) { return EXP[e]; });
  text("intro", tour.summary + " This is a private journey for your party only, run by our own Kampala-based team, and every day below can be adjusted: add a night, upgrade a lodge or slot in a beach extension.");
  fill("facts", [
    ["Duration", tour.days + " days, " + tour.nights + " nights"],
    ["Destinations", countryText],
    ["Travel style", tour.style],
    ["Group", tour.groupSize],
    ["Best time", tour.bestMonths],
    ["Experiences", expNames.join(", ")]
  ].map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join(""));
  fill("highlights", tour.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join(""));

  /* ---------- itinerary ---------- */
  fill("itinerary", tour.itinerary.map(function (d, i) {
    var stay = d.overnight && d.overnight !== "End of tour";
    return '<li class="timeline__item">' +
      '<details class="tl-day"' + (i === 0 ? " open" : "") + '>' +
      '<summary><span class="tl-day__num"><small>Day</small>' + esc(d.day) + '</span>' +
      '<span class="tl-day__title"><strong>' + esc(d.title) + '</strong>' +
      '<span class="tl-day__stay">' + (stay ? esc(d.overnight) : "Departure day") + '</span></span>' +
      '<span class="tl-day__toggle" aria-hidden="true"></span></summary>' +
      '<div class="tl-day__body"><p>' + esc(d.text) + '</p>' +
      '<div class="tl-day__meta">' +
      (stay ? '<span>' + svg("bed", 16) + esc(d.overnight) + '</span>' : '') +
      (meals(d.meals) ? '<span>' + svg("fork", 16) + meals(d.meals) + '</span>' : '') +
      '</div></div></details></li>';
  }).join(""));
  var toggleBtn = root.querySelector("[data-toggle-days]");
  function allOpen() { return Array.prototype.every.call(root.querySelectorAll(".tl-day"), function (d) { return d.open; }); }
  function syncToggle() { toggleBtn.textContent = allOpen() ? "Collapse all" : "Expand all"; }
  toggleBtn.addEventListener("click", function () {
    var open = !allOpen();
    root.querySelectorAll(".tl-day").forEach(function (d) { d.open = open; });
    syncToggle();
  });
  root.querySelectorAll(".tl-day").forEach(function (d) { d.addEventListener("toggle", syncToggle); });

  /* ---------- inclusions ---------- */
  fill("included", tour.included.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""));
  fill("excluded", tour.excluded.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""));

  /* ---------- gallery + lightbox ---------- */
  var gallery = tour.gallery.slice(0, 5);
  fill("gallery", gallery.map(function (g, i) {
    return '<button type="button" class="tour-gallery__item gallery-item" data-index="' + i + '" aria-label="Open photo ' + (i + 1) + ' of ' + gallery.length + ': ' + esc(alt(g)) + '">' +
      '<img src="assets/img/' + g + (i === 0 ? '' : '-sm') + '.webp" alt="' + esc(alt(g)) + '" width="' + (i === 0 ? 1800 : 720) + '" height="' + (i === 0 ? 1200 : 480) + '" loading="lazy">' +
      (i === gallery.length - 1 ? '<span class="tour-gallery__more">' + gallery.length + ' photos</span>' : '') + '</button>';
  }).join(""));
  root.querySelector(".tour-gallery").classList.add("tour-gallery--" + gallery.length);

  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector(".lightbox__img"), lbCap = lb.querySelector(".lightbox__cap");
  var cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + gallery.length) % gallery.length;
    lbImg.classList.remove("is-in");
    lbImg.src = "assets/img/" + gallery[cur] + ".webp";
    lbImg.alt = alt(gallery[cur]);
    lbCap.textContent = alt(gallery[cur]) + "  ·  " + (cur + 1) + " / " + gallery.length;
  }
  lbImg.addEventListener("load", function () { lbImg.classList.add("is-in"); });
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i); lb.hidden = false;
    document.documentElement.classList.add("lb-lock");
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    lb.querySelector(".lightbox__close").focus();
  }
  function closeLb() {
    lb.classList.remove("is-open"); lb.hidden = true;
    document.documentElement.classList.remove("lb-lock");
    if (lastFocus) lastFocus.focus();
  }
  root.querySelector(".tour-gallery").addEventListener("click", function (e) {
    var b = e.target.closest("[data-index]"); if (b) openLb(+b.dataset.index);
  });
  lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
  lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(cur - 1); });
  lb.querySelector(".lightbox__next").addEventListener("click", function () { show(cur + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__figure")) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(cur - 1);
    else if (e.key === "ArrowRight") show(cur + 1);
    else if (e.key === "Tab") { /* keep focus inside the dialog */
      var f = lb.querySelectorAll("button"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var tx = null, ty = 0;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(cur + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) closeLb();
    tx = null;
  }, { passive: true });

  /* ---------- booking card ---------- */
  text("price", money(tour.priceFrom));
  text("mprice", money(tour.priceFrom));
  if (tour.oldPrice) { var s = root.querySelector('[data-t="oldprice"]'); s.textContent = money(tour.oldPrice); s.hidden = false; }
  if (tour.offer && tour.offerNote) { var o = root.querySelector('[data-t="offer"]'); o.textContent = tour.offerNote; o.hidden = false; }
  var tripInput = root.querySelector('.booking-form input[name="Trip"]');
  if (tripInput) tripInput.value = tour.title + " (" + tour.days + " days)";
  var dateIn = document.getElementById("bf-date");
  if (dateIn) { var d = new Date(); d.setDate(d.getDate() + 14); dateIn.min = d.toISOString().slice(0, 10); }

  /* ---------- related ---------- */
  var related = TOURS.filter(function (t) { return t.slug !== tour.slug; }).map(function (t) {
    var score = 0;
    t.countries.forEach(function (c) { if (tour.countries.indexOf(c) > -1) score += 3; });
    t.experiences.forEach(function (e) { if (tour.experiences.indexOf(e) > -1) score += 1; });
    if (t.style === tour.style) score += 1;
    return { t: t, s: score - Math.abs(t.days - tour.days) * 0.1 };
  }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3).map(function (x) { return x.t; });
  fill("related", related.map(window.brooksTourCard).join(""));

  /* ---------- sub-nav active state ---------- */
  var links = Array.prototype.slice.call(root.querySelectorAll(".tour-subnav__inner a"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  var subnav = root.querySelector(".tour-subnav");
  var mbar = root.querySelector(".tour-mbar");
  var hero = document.getElementById("tour-hero");
  var enquire = document.getElementById("enquire");
  var ticking = false;
  var siteHeader = document.querySelector(".site-header");
  function onScroll() {
    ticking = false;
    if (siteHeader) document.documentElement.style.setProperty("--stick-top", Math.max(0, Math.round(siteHeader.getBoundingClientRect().bottom)) + "px");
    var offset = subnav.getBoundingClientRect().bottom + 140;
    var active = 0;
    var desk = window.innerWidth >= 1024; // enquiry card sits beside the content on desktop
    sections.forEach(function (s, i) { if (s && !(desk && i === sections.length - 1) && s.getBoundingClientRect().top <= offset) active = i; });
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 4 && window.innerWidth < 1024) active = sections.length - 1;
    links.forEach(function (a, i) {
      var on = i === active;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    subnav.classList.toggle("is-stuck", hero.getBoundingClientRect().bottom <= subnav.offsetHeight + 90);
    // Mobile bottom bar: after the hero, hidden while the enquiry form is on screen
    var er = enquire.getBoundingClientRect();
    var formVisible = er.top < window.innerHeight && er.bottom > 0;
    var show = hero.getBoundingClientRect().bottom < 0 && !formVisible;
    mbar.classList.toggle("is-visible", show);
    document.body.classList.toggle("has-tour-mbar", show);
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // keep the active sub-nav link visible on small screens
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      var inner = a.parentNode; inner.scrollTo({ left: a.offsetLeft - 24, behavior: "smooth" });
    });
  });
  mbar.querySelector("a").addEventListener("click", function () {
    setTimeout(function () { var n = document.getElementById("bf-name"); if (n) n.focus({ preventScroll: true }); }, 600);
  });
})();
