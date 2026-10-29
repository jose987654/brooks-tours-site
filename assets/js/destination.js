/* destination.html?d=SLUG — renders a destination from window.BROOKS_DESTINATIONS */
(function () {
  "use strict";
  var DATA = window.BROOKS_DESTINATIONS || {};
  var ORDER = window.BROOKS_DESTINATION_ORDER || Object.keys(DATA);
  var TOURS = Array.isArray(window.BROOKS_TOURS) ? window.BROOKS_TOURS : [];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var RATING_LABEL = { great: "Excellent", good: "Good", fair: "Fair" };
  var COUNTRY_LABEL = { uganda: "Uganda", rwanda: "Rwanda", kenya: "Kenya", tanzania: "Tanzania", zanzibar: "Zanzibar" };

  var slug = "";
  try { slug = (new URLSearchParams(location.search).get("d") || "").toLowerCase().trim(); } catch (e) { slug = ""; }
  var d = Object.prototype.hasOwnProperty.call(DATA, slug) ? DATA[slug] : null;

  if (!d) {
    // Unknown or missing ?d= — keep the static fallback list in the markup.
    if (slug) {
      document.getElementById("d-title").textContent = "Destination not found";
      document.getElementById("d-lead").textContent = "We couldn't find that destination. Choose one of our five East African destinations below.";
      document.title = "Destination not found | Brooks Tours & Travels";
    } else {
      document.title = "Destinations | Brooks Tours & Travels";
    }
    return;
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function img(name, size) {
    if (!name) return "assets/img/serengeti-sm.webp";
    if (name.indexOf("/") > -1) return name;
    return "assets/img/" + name + (size === "lg" ? ".webp" : "-sm.webp");
  }
  function money(n) {
    var v = Number(n);
    return isFinite(v) && v > 0 ? "$" + v.toLocaleString("en-US") : "";
  }
  var I = {
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2A3 3 0 0 0 12 8c-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2a3 3 0 0 1-2.8-1.2M12 6.5v1.5M12 16v1.5"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/>',
    passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16.5h6"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    plane: '<path d="M10.2 13.8L4 12l-1.5 1.5 5 2.8 2.8 5L11.8 20 10 13.8l4.3-4.3 4.2 8.2 1.8-1.8-2.5-10.4 2.1-2.1a1.8 1.8 0 0 0-2.5-2.5l-2.1 2.1L4.9 2.5 3.1 4.3l8.2 4.2z"/>',
    gorilla: '<circle cx="7" cy="7.5" r="2"/><circle cx="12" cy="5.5" r="2"/><circle cx="17" cy="7.5" r="2"/><path d="M12 11c-3.2 0-6 3.4-6 6.3 0 1.8 1.4 2.7 3 2.2l1.9-.6a3.6 3.6 0 0 1 2.2 0l1.9.6c1.6.5 3-.4 3-2.2C18 14.4 15.2 11 12 11z"/>',
    monkey: '<circle cx="7" cy="7.5" r="2"/><circle cx="12" cy="5.5" r="2"/><circle cx="17" cy="7.5" r="2"/><path d="M12 11c-3.2 0-6 3.4-6 6.3 0 1.8 1.4 2.7 3 2.2l1.9-.6a3.6 3.6 0 0 1 2.2 0l1.9.6c1.6.5 3-.4 3-2.2C18 14.4 15.2 11 12 11z"/>',
    leaf: '<path d="M5 20c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 20l8-8"/>',
    boat: '<path d="M3 16h18l-2.5 4h-13z"/><path d="M12 16V4l6 9h-6"/><path d="M12 7l-5 6h5"/>',
    bird: '<path d="M16 7h.01"/><path d="M3.5 20L12 11.5"/><path d="M20 7l-2.3-2.3A3.5 3.5 0 0 0 12 7.5V12a6 6 0 0 1-6 6H3.5"/><path d="M20 7l2 1-2 1"/><path d="M12 12l4 4"/>',
    wave: '<path d="M2 9c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-1.5 5 0"/><path d="M2 15c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-1.5 5 0"/>',
    mountain: '<path d="M2.5 20l7-12 4 6.5 2.5-3.5 5.5 9z"/><path d="M7.4 11.6l2.1 1.4 2-1.6"/>',
    bridge: '<path d="M2 9c4.5 5 15.5 5 20 0"/><path d="M2 9v10M22 9v10M7 12.5V19M12 13.5V19M17 12.5V19M2 19h20"/>',
    binoculars: '<circle cx="6.5" cy="15.5" r="3.5"/><circle cx="17.5" cy="15.5" r="3.5"/><path d="M10 15.5h4M4 13l2-7h3l1 7M20 13l-2-7h-3l-1 7"/>',
    city: '<path d="M3 21h18M5 21V10l5-3v14M10 21V4h7v17M17 21v-9h3v9M13 8h1M13 11h1M13 14h1"/>',
    balloon: '<path d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 4 4 7.5 5.2 8.5h2.6c1.2-1 5.2-4.5 5.2-8.5A6.5 6.5 0 0 0 12 2.5z"/><path d="M10.5 17.5l.3 3.5h2.4l.3-3.5M12 2.5c-2 2-2.5 5-2.5 7s1.5 6 2.5 8"/>',
    elephant: '<path d="M6 19v-5a6 6 0 0 1 12 0v1.5c0 1.5 1 2.5 2.5 2.5"/><path d="M9 19v-3M14 19v-3M6 14c-2 0-3-1.5-3-3.5S4.5 7 7 7"/><circle cx="13.5" cy="12" r=".6"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M16 4.5a3.2 3.2 0 0 1 0 6.3M18 14.3c1.8.8 3 2.9 3 5.7"/>',
    heart: '<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"/>',
    crater: '<path d="M2 18c2-6.5 5.5-9 10-9s8 2.5 10 9"/><path d="M6.5 18c1-2.6 3-4 5.5-4s4.5 1.4 5.5 4M2 18h20"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    map: '<path d="M9 4L3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    fish: '<path d="M3 12c3-4.5 7-6 11-6 3.5 0 6 3 7 6-1 3-3.5 6-7 6-4 0-8-1.5-11-6z"/><path d="M3 12l-1-3.5M3 12l-1 3.5"/><circle cx="16.5" cy="10.5" r=".7"/>'
  };
  function icon(name, cls) {
    return '<svg' + (cls ? ' class="' + cls + '"' : "") + ' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[name] || I.pin) + "</svg>";
  }

  /* ---------- hero ---------- */
  var hero = document.getElementById("d-hero");
  hero.style.setProperty("--hero", "url('" + img(d.hero, "lg") + "')");
  document.getElementById("d-crumb").textContent = d.name;
  document.getElementById("d-eyebrow").textContent = d.tagline;
  document.getElementById("d-title").textContent = d.name;
  document.getElementById("d-lead").textContent = d.summary;
  var countryLink = d.slug === "zanzibar" ? "tours.html?experience=beach" : "tours.html?country=" + encodeURIComponent(d.slug);
  document.getElementById("d-hero-actions").innerHTML =
    '<a class="btn btn-primary" href="#d-tours">' + esc(d.name) + ' safaris <span class="arr">→</span></a>' +
    '<a class="btn btn-ghost-light" href="#d-when">When to go</a>';
  document.title = d.name + " Safaris & Travel Guide | Brooks Tours & Travels";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", d.name + " — " + d.tagline + ". " + d.summary);
  document.getElementById("d-cta-title").textContent = "Ready to explore " + d.name + "?";
  var ctaBtn = document.getElementById("d-cta-btn");
  if (ctaBtn) ctaBtn.setAttribute("href", "enquire.html?destination=" + encodeURIComponent(d.slug));

  var html = "";

  /* ---------- quick facts ---------- */
  var f = d.facts || {};
  var facts = [
    ["pin", "Capital", f.capital], ["coin", "Currency", f.currency], ["chat", "Language", f.language],
    ["passport", "Visa", f.visa], ["calendar", "Best time", f.bestTime], ["plane", "Fly into", f.hub]
  ];
  html += '<section class="d-facts" aria-label="Quick facts"><div class="container"><dl class="d-facts__bar">' +
    facts.filter(function (x) { return x[2]; }).map(function (x) {
      return '<div class="d-fact">' + icon(x[0], "d-fact__icon") + "<div><dt>" + esc(x[1]) + "</dt><dd>" + esc(x[2]) + "</dd></div></div>";
    }).join("") + "</dl></div></section>";

  /* ---------- intro ---------- */
  var parks = d.parks || [];
  html += '<section class="section d-intro"><div class="container d-intro__grid">' +
    '<div class="d-intro__text"><span class="eyebrow">Discover ' + esc(d.name) + "</span>" +
    "<h2>" + esc(d.tagline) + "</h2>" +
    (d.intro || []).map(function (p, i) { return "<p" + (i === 0 ? ' class="d-intro__first"' : "") + ">" + esc(p) + "</p>"; }).join("") +
    "</div>" +
    '<aside class="d-intro__aside">' +
    (parks[1] ? '<figure class="d-intro__media"><img src="' + img(parks[1].image) + '" alt="' + esc(parks[1].name + ", " + d.name) + '" width="720" height="480" loading="lazy"' + (parks[1].pos ? ' style="object-position:' + esc(parks[1].pos) + '"' : "") + "></figure>" : "") +
    '<div class="d-intro__card"><span class="eyebrow">Don\'t miss</span><ul class="icon-list">' +
    parks.slice(0, 5).map(function (p) { return "<li><strong>" + esc(p.name) + "</strong> <span>— " + esc(p.tag) + "</span></li>"; }).join("") +
    '</ul><a class="btn btn-dark btn-block" href="enquire.html?destination=' + encodeURIComponent(d.slug) + '">Plan a ' + esc(d.name) + ' trip <span class="arr">→</span></a></div>' +
    "</aside></div></section>";

  /* ---------- parks ---------- */
  html += '<section class="section section--sand" id="d-parks"><div class="container">' +
    '<header class="section-head section-head--split"><div><span class="eyebrow">Parks &amp; highlights</span><h2>Where to go in ' + esc(d.name) + "</h2></div>" +
    '<p class="lead">The places our guides return to again and again — each one with its own season, wildlife and character.</p></header>' +
    '<div class="d-parks">' +
    parks.map(function (p, i) {
      var n = parks.length, rem = (n + 3) % 3, last = i === n - 1 && i > 0;
      var cls = i === 0 ? " park-card--lead" : "";
      if (last && rem === 2) cls += " park-card--fill2";
      if (last && rem === 1) cls += " park-card--fill3";
      if (last && n % 2 === 1) cls += " park-card--wide-md";
      return '<article class="park-card' + cls + '">' +
        '<div class="park-card__media"><img src="' + img(p.image, i === 0 ? "lg" : "sm") + '" alt="' + esc(p.name + ", " + d.name) + '" width="' + (i === 0 ? 1800 : 720) + '" height="' + (i === 0 ? 1200 : 480) + '" loading="lazy"' + (p.pos ? ' style="object-position:' + esc(p.pos) + '"' : "") + ">" +
        '<span class="badge badge--light">' + esc(p.tag) + "</span></div>" +
        '<div class="park-card__body"><span class="park-card__num">' + (i < 9 ? "0" : "") + (i + 1) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.text) + "</p></div></article>";
    }).join("") + "</div></div></section>";

  /* ---------- Uganda region by region (Uganda only) ---------- */
  var UG_PLACES = d.slug === "uganda" && Array.isArray(window.BROOKS_UGANDA_PLACES) ? window.BROOKS_UGANDA_PLACES : null;
  var UG_REGIONS = [
    { id: "western", tab: "Western Uganda · from Masaka", label: "Western Uganda", start: "Kampala",
      intro: "The classic circuit leaves Kampala on the Masaka road, climbs into the gorilla highlands of the far south-west, runs north along the Rift Valley to Fort Portal and returns past Lake Albert and Budongo. Allow 10 to 16 days to do it justice." },
    { id: "northern", tab: "Northern Uganda", label: "Northern Uganda", start: "Kampala",
      intro: "North from Kampala to the rhinos of Ziwa and the falls of Murchison, across the Nile into West Nile and Acholiland, then out to remote Kidepo, looping home through Karamoja and Mount Elgon. Allow 9 to 14 days, or fly one way." }
  ];
  function ugPad(n) { return (n < 10 ? "0" : "") + n; }
  function ugRegion(id) {
    return UG_PLACES.filter(function (p) { return p.region === id; }).sort(function (a, b) { return a.order - b.order; });
  }
  if (UG_PLACES) {
    var ugHash = (location.hash || "").slice(1);
    var ugActive = ugHash === "northern" ? "northern" : "western";
    html += '<section class="section ug-regions" id="regions" aria-labelledby="ug-title"><div class="container">' +
      '<header class="section-head section-head--split"><div><span class="eyebrow">Uganda region by region</span><h2 id="ug-title">From Masaka to Kidepo</h2></div>' +
      '<p class="lead">Uganda is compact enough to explore by road, and its best places line up along two great circuits. Follow them stop by stop, in the order you reach them from Kampala, with real drive times and the lodges we use.</p></header>' +
      '<div class="tabs ug-tabs"><div class="ug-tabs__list" role="tablist" aria-label="Uganda regions">' +
      UG_REGIONS.map(function (r) {
        var on = r.id === ugActive;
        return '<button type="button" role="tab" id="ug-tab-' + r.id + '" aria-controls="' + r.id + '" aria-selected="' + on + '"' + (on ? "" : ' tabindex="-1"') + ">" +
          esc(r.tab) + '<span class="ug-tabs__count">' + ugRegion(r.id).length + " stops</span></button>";
      }).join("") + "</div>" +
      UG_REGIONS.map(function (r) {
        var list = ugRegion(r.id);
        return '<div class="ug-panel" role="tabpanel" id="' + r.id + '" aria-labelledby="ug-tab-' + r.id + '"' + (r.id === ugActive ? "" : " hidden") + ">" +
          '<p class="ug-panel__intro">' + esc(r.intro) + "</p>" +
          '<nav class="ug-route" aria-label="' + esc(r.label) + ' route in road order"><ol class="ug-route__list">' +
          '<li class="ug-route__item ug-route__item--start"><span class="ug-route__dot" aria-hidden="true">' + icon("pin") + '</span><span class="ug-route__name">' + esc(r.start) + "</span></li>" +
          list.map(function (p) {
            return '<li class="ug-route__item"><a class="ug-route__stop" href="#ug-' + esc(p.id) + '" data-ug-stop="' + esc(p.id) + '">' +
              '<span class="ug-route__dot">' + p.order + '</span><span class="ug-route__name">' + esc(p.short || p.name) + "</span></a></li>";
          }).join("") + "</ol></nav>" +
          '<div class="ug-grid">' + list.map(function (p) {
            return '<article class="ug-card" id="ug-' + esc(p.id) + '">' +
              '<div class="ug-card__media"><img src="' + img(p.image) + '" alt="' + esc(p.name) + '" width="720" height="480" loading="lazy">' +
              '<span class="ug-card__num" aria-hidden="true">' + ugPad(p.order) + "</span></div>" +
              '<div class="ug-card__body"><span class="ug-card__district">' + icon("pin") + esc(p.district) + "</span>" +
              '<h3><button type="button" class="ug-card__open" data-ug-open="' + esc(p.id) + '" aria-haspopup="dialog"><span class="sr-only">Stop ' + p.order + ": </span>" + esc(p.name) + "</button></h3>" +
              '<p class="ug-card__tagline">' + esc(p.tagline) + "</p>" +
              '<p class="ug-card__drive">' + icon("map") + "<span>" + esc(p.driveFromKampala) + " from Kampala</span></p>" +
              '<ul class="ug-tags" aria-label="Best for">' + (p.bestFor || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
              '<span class="ug-card__more" aria-hidden="true">Read more <span class="arr">→</span></span>' +
              "</div></article>";
          }).join("") + "</div></div>";
      }).join("") +
      "</div></div></section>";
  }

  /* ---------- when to go ---------- */
  var months = d.months || [];
  var nowM = new Date().getMonth();
  html += '<section class="section section--green d-when" id="d-when"><div class="container d-when__grid">' +
    '<div class="d-when__text"><span class="eyebrow">When to go</span><h2>' + esc(d.name) + " <em>month by month</em></h2>" +
    '<p class="lead">' + esc(f.bestTime ? "Best: " + f.bestTime + "." : "") + "</p><p>" + esc(d.seasons) + "</p>" +
    '<ul class="d-when__legend" aria-label="Legend"><li><i class="is-great"></i>Excellent</li><li><i class="is-good"></i>Good</li><li><i class="is-fair"></i>Fair — wetter, quieter</li></ul></div>' +
    '<div class="d-when__chart"><ol class="months" aria-label="Travel conditions by month">' +
    MONTHS.map(function (m, i) {
      var r = months[i] || "good";
      return '<li class="month is-' + r + (i === nowM ? " is-now" : "") + '"><span class="month__bar"><span class="sr-only">' + m + ": " + RATING_LABEL[r] + "</span></span>" +
        '<span class="month__label" aria-hidden="true">' + m + "</span></li>";
    }).join("") + '</ol><p class="months__note">Ratings combine weather, trail conditions and wildlife viewing. ' + MONTHS[nowM] + " is highlighted.</p></div>" +
    "</div></section>";

  /* ---------- things to do ---------- */
  html += '<section class="section" id="d-todo"><div class="container">' +
    '<header class="section-head section-head--center"><span class="eyebrow">Things to do</span><h2>Unforgettable in ' + esc(d.name) + "</h2></header>" +
    '<ul class="d-todo">' +
    (d.todo || []).map(function (t) {
      return '<li class="d-todo__item"><span class="icon-badge">' + icon(t.icon) + "</span><div><h3>" + esc(t.title) + "</h3><p>" + esc(t.text) + "</p></div></li>";
    }).join("") + "</ul></div></section>";

  /* ---------- related tours ---------- */
  var keys = (d.tourKeys || [d.slug]).map(function (k) { return String(k).toLowerCase(); });
  var related = TOURS.filter(function (t) {
    var cs = (t && t.countries || []).map(function (c) { return String(c).toLowerCase(); });
    return cs.some(function (c) { return keys.indexOf(c) > -1; });
  }).sort(function (a, b) {
    var sa = (a.countries || []).length === 1 ? 0 : 1, sb = (b.countries || []).length === 1 ? 0 : 1;
    return sa - sb || (a.priceFrom || 0) - (b.priceFrom || 0);
  }).slice(0, 6);
  html += '<section class="section section--sand" id="d-tours"><div class="container">' +
    '<header class="section-head section-head--split"><div><span class="eyebrow">Safaris in ' + esc(d.name) + "</span><h2>Trips that include " + esc(d.name) + "</h2></div>" +
    '<a class="link-arrow" href="' + countryLink + '">See all ' + esc(d.name) + " safaris →</a></header>";
  if (related.length) {
    html += '<div class="grid grid-3">' + related.map(function (t) {
      var href = "tour.html?t=" + encodeURIComponent(t.slug);
      var countries = (t.countries || []).map(function (c) { return COUNTRY_LABEL[String(c).toLowerCase()] || c; }).join(" & ");
      var price = money(t.priceFrom);
      return '<article class="tour-card"><a href="' + href + '" class="tour-card__media"><img src="' + img(t.image) + '" alt="' + esc(t.title) + '" width="720" height="480" loading="lazy">' +
        (t.badge ? '<span class="badge">' + esc(t.badge) + "</span>" : "") + "</a>" +
        '<div class="tour-card__body"><div class="tour-card__meta"><span>' + esc(t.days) + " Days</span><span>" + esc(countries) + "</span></div>" +
        '<h3><a href="' + href + '">' + esc(t.title) + "</a></h3><p>" + esc(t.summary) + "</p>" +
        '<div class="tour-card__foot">' + (price ? '<span class="price">From <strong>' + price + "</strong> pp</span>" : "<span></span>") +
        '<a class="link-arrow" href="' + href + '">View trip →</a></div></div></article>';
    }).join("") + "</div>";
  } else {
    html += '<div class="d-empty"><p>Every ' + esc(d.name) + ' journey we run is tailor-made. Tell us your dates and interests and we\'ll design one around you.</p><a class="btn btn-dark" href="enquire.html">Design my trip <span class="arr">→</span></a></div>';
  }
  html += "</div></section>";

  /* ---------- other destinations ---------- */
  var others = ORDER.filter(function (k) { return k !== d.slug && DATA[k]; });
  html += '<section class="section" id="d-more"><div class="container">' +
    '<header class="section-head section-head--split"><div><span class="eyebrow">Keep exploring</span><h2>Other destinations</h2></div>' +
    '<a class="link-arrow" href="destinations.html">All destinations →</a></header>' +
    '<div class="d-others">' + others.map(function (k) {
      var o = DATA[k];
      return '<a class="img-card" href="destination.html?d=' + encodeURIComponent(k) + '"><img src="' + img(o.card || o.hero) + '" alt="' + esc(o.name) + '" width="720" height="480" loading="lazy">' +
        '<div class="img-card__overlay"><span class="eyebrow">' + esc(o.tagline) + "</span><h3>" + esc(o.name) + "</h3></div></a>";
    }).join("") + "</div></div></section>";

  document.getElementById("d-app").innerHTML = html;

  if (UG_PLACES) initUgandaRegions();

  /* ---------- Uganda region by region: tabs, deep links, route strip, detail dialog ---------- */
  function initUgandaRegions() {
    var section = document.getElementById("regions");
    if (!section) return;
    var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var byId = {};
    UG_PLACES.forEach(function (p) { byId[p.id] = p; });
    var tourBySlug = {};
    TOURS.forEach(function (t) { if (t && t.slug) tourBySlug[t.slug] = t; });
    I.clock = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
    I.bed = '<path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="2"/>';
    I.check = '<path d="M5 12.5l4.5 4.5L19 7.5"/>';

    /* tabs: main.js wires the shared .tabs keyboard behaviour; we add the URL hash + selection on hash change */
    var tabs = [].slice.call(section.querySelectorAll('[role="tab"]'));
    function selectTab(id) {
      tabs.forEach(function (b) {
        var on = b.getAttribute("aria-controls") === id;
        b.setAttribute("aria-selected", String(on));
        b.setAttribute("tabindex", on ? "0" : "-1");
        var p = document.getElementById(b.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
    }
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("aria-controls");
        selectTab(id);
        if (history.replaceState) history.replaceState(null, "", "#" + id);
      });
    });
    function scrollToSection(smooth) {
      var target = section.querySelector(".ug-tabs") || section;
      target.scrollIntoView({ behavior: smooth && !reduceMotion ? "smooth" : "auto", block: "start" });
    }
    function fromHash(smooth) {
      var h = (location.hash || "").slice(1);
      if (h === "western" || h === "northern") { selectTab(h); scrollToSection(smooth); }
      else if (h === "regions") { section.scrollIntoView({ behavior: smooth && !reduceMotion ? "smooth" : "auto", block: "start" }); }
    }
    window.addEventListener("hashchange", function () { fromHash(true); });
    if (/^#(western|northern|regions)$/.test(location.hash)) {
      // the browser's own fragment jump lands on the panel; re-align to the tabs once layout settles
      fromHash(false);
      window.addEventListener("load", function () { setTimeout(function () { fromHash(false); }, 60); });
    }

    /* route strip: scroll to the card without touching the URL */
    section.addEventListener("click", function (e) {
      var stop = e.target.closest("[data-ug-stop]");
      if (!stop) return;
      e.preventDefault();
      var card = document.getElementById("ug-" + stop.getAttribute("data-ug-stop"));
      if (!card) return;
      card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      card.classList.remove("is-flash"); void card.offsetWidth; card.classList.add("is-flash");
      var btn = card.querySelector(".ug-card__open");
      if (btn) btn.focus({ preventScroll: true });
    });

    /* detail dialog */
    var modal = document.createElement("div");
    modal.className = "ug-modal";
    modal.hidden = true;
    modal.innerHTML = '<div class="ug-modal__backdrop" data-ug-close></div>' +
      '<div class="ug-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ug-modal-title" tabindex="-1">' +
      '<button type="button" class="ug-modal__close" data-ug-close aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '<div class="ug-modal__content"></div></div>';
    document.body.appendChild(modal);
    var dialog = modal.querySelector(".ug-modal__dialog");
    var content = modal.querySelector(".ug-modal__content");
    var opener = null, current = null, inerted = [];

    function render(p) {
      var list = ugRegion(p.region);
      var idx = list.indexOf(p), prev = list[idx - 1], next = list[idx + 1];
      var region = p.region === "northern" ? "Northern Uganda" : "Western Uganda";
      var tours = (p.tourSlugs || []).map(function (s) { return tourBySlug[s]; }).filter(Boolean);
      content.innerHTML =
        '<figure class="ug-modal__media"><img src="' + img(p.image, "lg") + '" alt="' + esc(p.name) + '" width="1800" height="1200">' +
        '<figcaption class="ug-modal__head"><span class="ug-modal__kicker">' + esc(region) + " · Stop " + p.order + " of " + list.length + "</span>" +
        '<h2 id="ug-modal-title">' + esc(p.name) + "</h2><p>" + esc(p.tagline) + "</p></figcaption></figure>" +
        '<div class="ug-modal__body">' +
        '<dl class="ug-modal__facts">' +
        '<div>' + icon("pin") + "<dt>District</dt><dd>" + esc(p.district) + "</dd></div>" +
        '<div>' + icon("map") + "<dt>From Kampala</dt><dd>" + esc(p.driveFromKampala) + "</dd></div>" +
        '<div>' + icon("calendar") + "<dt>Best time</dt><dd>" + esc(p.bestTime) + "</dd></div>" +
        "</dl>" +
        '<p class="ug-modal__about">' + esc(p.about) + "</p>" +
        '<ul class="ug-tags" aria-label="Best for">' + (p.bestFor || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        '<div class="ug-modal__cols">' +
        '<div class="ug-modal__block"><h3>Highlights</h3><ul class="icon-list">' + (p.highlights || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="ug-modal__block"><h3>Where to stay</h3><ul class="ug-modal__stay">' + (p.stayAt || []).map(function (s) { return "<li>" + icon("bed") + "<span>" + esc(s) + "</span></li>"; }).join("") + "</ul>" +
        "<h3>Related safaris</h3>" +
        (tours.length
          ? '<ul class="ug-modal__tours">' + tours.map(function (t) {
              return '<li><a href="tour.html?t=' + encodeURIComponent(t.slug) + '"><span>' + esc(t.title) + "</span><small>" + esc(t.days) + " days" + (money(t.priceFrom) ? " · from " + money(t.priceFrom) : "") + "</small></a></li>";
            }).join("") + "</ul>"
          : '<p class="ug-modal__none">Not in a set itinerary yet. We add it to tailor-made trips on request.</p>') +
        "</div></div></div>" +
        '<div class="ug-modal__foot">' +
        '<a class="btn btn-primary" href="enquire.html?d=uganda">Plan a trip here <span class="arr">→</span></a>' +
        '<div class="ug-modal__nav">' +
        (prev ? '<button type="button" class="ug-modal__step" data-ug-goto="' + esc(prev.id) + '"><span aria-hidden="true">←</span> ' + esc(prev.short || prev.name) + "</button>" : "") +
        (next ? '<button type="button" class="ug-modal__step" data-ug-goto="' + esc(next.id) + '">' + esc(next.short || next.name) + ' <span aria-hidden="true">→</span></button>' : "") +
        "</div></div>";
      dialog.scrollTop = 0;
      current = p;
    }
    function focusables() {
      return [].slice.call(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
    }
    function open(id, from) {
      var p = byId[id]; if (!p) return;
      opener = from || document.activeElement;
      render(p);
      modal.hidden = false;
      document.documentElement.classList.add("ug-lock");
      inerted = [].slice.call(document.body.children).filter(function (el) { return el !== modal && !el.inert && el.tagName !== "SCRIPT"; });
      inerted.forEach(function (el) { el.inert = true; });
      requestAnimationFrame(function () { modal.classList.add("is-open"); });
      dialog.focus({ preventScroll: true });
    }
    function close() {
      if (modal.hidden) return;
      modal.classList.remove("is-open");
      modal.hidden = true;
      document.documentElement.classList.remove("ug-lock");
      inerted.forEach(function (el) { el.inert = false; });
      inerted = [];
      var back = current && document.querySelector('[data-ug-open="' + current.id + '"]');
      // return focus to the card for the stop being shown (the user may have stepped through stops)
      var target = back || opener;
      if (target && target.focus) target.focus({ preventScroll: !!back && back !== opener });
      if (back && back !== opener) back.closest(".ug-card").scrollIntoView({ block: "center" });
      current = null;
    }
    section.addEventListener("click", function (e) {
      var b = e.target.closest("[data-ug-open]");
      if (b) open(b.getAttribute("data-ug-open"), b);
    });
    // the whole card is clickable (the title button carries the accessible name)
    section.addEventListener("click", function (e) {
      if (e.target.closest("[data-ug-open], a, button")) return;
      var card = e.target.closest(".ug-card");
      if (card) { var b = card.querySelector("[data-ug-open]"); if (b) open(b.getAttribute("data-ug-open"), b); }
    });
    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-ug-close]")) { close(); return; }
      var g = e.target.closest("[data-ug-goto]");
      if (g) { render(byId[g.getAttribute("data-ug-goto")]); dialog.focus({ preventScroll: true }); }
    });
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      var f = focusables(); if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // keep focus inside if it escapes (e.g. clicking the backdrop area)
    document.addEventListener("focusin", function (e) {
      if (!modal.hidden && !modal.contains(e.target)) dialog.focus({ preventScroll: true });
    });
  }
})();
