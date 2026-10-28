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
    '<header class="section-head section-head--split"><span class="eyebrow">Parks &amp; highlights</span><h2>Where to go in ' + esc(d.name) + "</h2>" +
    '<p class="lead">The places our guides return to again and again — each one with its own season, wildlife and character.</p></header>' +
    '<div class="d-parks">' +
    parks.map(function (p, i) {
      return '<article class="park-card' + (i === 0 ? " park-card--lead" : "") + '">' +
        '<div class="park-card__media"><img src="' + img(p.image, i === 0 ? "lg" : "sm") + '" alt="' + esc(p.name + ", " + d.name) + '" width="' + (i === 0 ? 1800 : 720) + '" height="' + (i === 0 ? 1200 : 480) + '" loading="lazy"' + (p.pos ? ' style="object-position:' + esc(p.pos) + '"' : "") + ">" +
        '<span class="badge badge--light">' + esc(p.tag) + "</span></div>" +
        '<div class="park-card__body"><span class="park-card__num">' + (i < 9 ? "0" : "") + (i + 1) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.text) + "</p></div></article>";
    }).join("") + "</div></div></section>";

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
    '<header class="section-head section-head--split"><span class="eyebrow">Safaris in ' + esc(d.name) + "</span><h2>Trips that include " + esc(d.name) + "</h2>" +
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
    '<header class="section-head section-head--split"><span class="eyebrow">Keep exploring</span><h2>Other destinations</h2>' +
    '<a class="link-arrow" href="destinations.html">All destinations →</a></header>' +
    '<div class="d-others">' + others.map(function (k) {
      var o = DATA[k];
      return '<a class="img-card" href="destination.html?d=' + encodeURIComponent(k) + '"><img src="' + img(o.card || o.hero) + '" alt="' + esc(o.name) + '" width="720" height="480" loading="lazy">' +
        '<div class="img-card__overlay"><span class="eyebrow">' + esc(o.tagline) + "</span><h3>" + esc(o.name) + "</h3></div></a>";
    }).join("") + "</div></div></section>";

  document.getElementById("d-app").innerHTML = html;
})();
