/* gallery.html — filterable masonry gallery, lightbox and photo credits */
(function () {
  "use strict";
  var CREDITS = window.BROOKS_CREDITS || {};
  var CATS = { primates: "Primates", "big-game": "Big game", birds: "Birds", landscapes: "Landscapes", people: "People & culture" };

  /* name, category, caption — every image in the catalogue, mixed for a varied "All" view */
  var PHOTOS = [
    ["hero-gorilla", "primates", "Silverback mountain gorilla feeding, Bwindi Impenetrable Forest, Uganda"],
    ["serengeti", "landscapes", "The endless plains of the Serengeti, Tanzania"],
    ["lion-mara", "big-game", "A lion family portrait in the Masai Mara, Kenya"],
    ["shoebill", "birds", "The prehistoric-looking shoebill in Mabamba Wetland, Uganda"],
    ["maasai-people", "people", "Maasai elders in traditional dress, Kenya"],
    ["migration", "big-game", "Wildebeest crossing the Mara River during the Great Migration"],
    ["gorilla-family", "primates", "The Nshongi gorilla family, Bwindi, Uganda"],
    ["kilimanjaro", "landscapes", "Reusch Crater near the summit of Kilimanjaro, Tanzania"],
    ["leopard", "big-game", "A young leopard resting in the Serengeti, Tanzania"],
    ["crane", "birds", "Grey crowned crane, Uganda's national bird"],
    ["murchison", "landscapes", "The Nile thundering through the gorge at Murchison Falls, Uganda"],
    ["chimpanzee", "primates", "Alpha male chimpanzee, Kibale Forest National Park, Uganda"],
    ["elephants-amboseli", "big-game", "An elephant beneath Kilimanjaro in Amboseli, Kenya"],
    ["cultural-dance", "people", "Traditional dance at the Ndere Centre, Kampala"],
    ["virunga-volcanoes", "landscapes", "Mikeno and Karisimbi, two volcanoes of the Virunga range"],
    ["lion-tree", "big-game", "Tree-climbing lions resting in a fig tree, Ishasha, Uganda"],
    ["flamingos", "birds", "Flamingos on the shores of Lake Nakuru, Kenya"],
    ["golden-monkey", "primates", "A golden monkey in the bamboo of Volcanoes National Park, Rwanda"],
    ["ngorongoro", "landscapes", "Looking into the Ngorongoro Crater from the rim, Tanzania"],
    ["rhino", "big-game", "White rhino at Ziwa Rhino Sanctuary, Uganda"],
    ["kampala", "people", "The Kampala skyline across the city's seven hills"],
    ["zanzibar", "landscapes", "A traditional dhow off the coast of Zanzibar"],
    ["giraffe", "big-game", "A Rothschild's giraffe in Murchison Falls National Park, Uganda"],
    ["kingfisher", "birds", "A pied kingfisher hovering over Lake Bunyonyi, Uganda"],
    ["gorilla-baby", "primates", "A ten-month-old mountain gorilla"],
    ["bunyonyi", "landscapes", "The terraced islands of Lake Bunyonyi, Uganda"],
    ["zebras", "big-game", "Zebras in Lake Mburo National Park, Uganda"],
    ["kigali", "people", "Kigali's clean, green streets, Rwanda"],
    ["masai-mara", "big-game", "Herds gathering at the Mara River, Masai Mara, Kenya"],
    ["rwenzori", "landscapes", "Alexandra and Margherita peaks in the Rwenzori Mountains, Uganda"],
    ["chimp-kyambura", "primates", "A chimpanzee in the forest canopy, Uganda"],
    ["buffalo", "big-game", "A two-week-old African buffalo calf"],
    ["sunset-acacia", "landscapes", "Sunset over the acacias of the Serengeti"],
    ["elephant-queen", "big-game", "An elephant in Queen Elizabeth National Park, Uganda"],
    ["nile-jinja", "landscapes", "The source of the Nile at Jinja, Uganda"],
    ["hippos", "big-game", "Hippos in Lake Mburo National Park, Uganda"],
    ["kidepo", "landscapes", "The golden Narus Valley of Kidepo, Uganda"],
    ["nairobi-giraffe", "big-game", "A giraffe against the Nairobi skyline, Kenya"],
    ["nyungwe", "landscapes", "Sunrise over the canopy of Nyungwe Forest, Rwanda"],
    ["balloon", "landscapes", "Hot-air balloon safari at dawn over the plains"],
    ["kazinga", "people", "Fishing boats on the Kazinga Channel, Uganda"],
    ["rwanda-hills", "landscapes", "The tea-covered hills of Kitabi and Nyaruguru, Rwanda"],
    ["safari-vehicle", "people", "Out on a game drive in Amboseli, Kenya"],
    ["lake-kivu", "landscapes", "Lake Kivu from the hills above Gisenyi, Rwanda"],
    ["tea-plantation", "landscapes", "Tea plantations of Kyamuhunga, western Uganda"],
    ["safari-lodge", "people", "Evening light on a classic safari tent"],
    ["sipi-falls", "landscapes", "Sipi Falls on the slopes of Mount Elgon, Uganda"]
  ];
  var LICENSES = {
    "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
    "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
    "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
    "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
    "CC0": "https://creativecommons.org/publicdomain/zero/1.0/"
  };
  // portrait crops sprinkled through the grid give the columns a masonry rhythm
  var TALL = { "hero-gorilla": 1, "shoebill": 1, "golden-monkey": 1, "crane": 1, "rwenzori": 1, "chimp-kyambura": 1, "giraffe": 1, "kingfisher": 1, "maasai-people": 1, "nyungwe": 1, "sipi-falls": 1, "kigali": 1 };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function author(name) {
    var c = CREDITS[name];
    if (!c || !c.author) return "";
    return String(c.author).split("\n")[0].replace(/^This photo was taken by\s+/i, "").replace(/\.\s*$/, "").trim();
  }
  function cleanTitle(t) {
    return String(t || "").replace(/^File:/, "").replace(/\.(jpe?g|png|webp|tiff?)$/i, "").replace(/_/g, " ").trim();
  }
  function safeUrl(u) { return /^https:\/\//.test(u || "") ? u : "#"; }

  /* ---------- grid ---------- */
  var grid = document.getElementById("gallery-grid");
  var status = document.getElementById("gallery-status");
  if (!grid) return;
  grid.innerHTML = PHOTOS.map(function (p, i) {
    var by = author(p[0]);
    return '<figure class="masonry__item' + (TALL[p[0]] ? " is-tall" : "") + '" data-cat="' + p[1] + '">' +
      '<button class="gallery-item" type="button" data-index="' + i + '" aria-label="Open photo: ' + esc(p[2]) + '">' +
      '<img src="assets/img/' + p[0] + '-sm.webp" alt="' + esc(p[2]) + '" width="720" height="480" loading="lazy">' +
      '<span class="gallery-item__zoom" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></span>' +
      '</button><figcaption class="masonry__cap"><span class="masonry__cat">' + esc(CATS[p[1]]) + "</span>" + esc(p[2]) +
      (by ? '<span class="masonry__by">Photo: ' + esc(by) + "</span>" : "") + "</figcaption></figure>";
  }).join("");
  var items = Array.prototype.slice.call(grid.querySelectorAll(".masonry__item"));

  // counts on chips
  var counts = { all: PHOTOS.length };
  PHOTOS.forEach(function (p) { counts[p[1]] = (counts[p[1]] || 0) + 1; });
  Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), function (el) {
    el.textContent = counts[el.getAttribute("data-count")] || 0;
  });

  /* ---------- filters ---------- */
  var current = "all";
  var chips = Array.prototype.slice.call(document.querySelectorAll("#gallery-filters [data-filter]"));
  function applyFilter(f) {
    current = CATS[f] ? f : "all";
    chips.forEach(function (c) {
      var on = c.getAttribute("data-filter") === current;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var shown = 0;
    items.forEach(function (it) {
      var show = current === "all" || it.getAttribute("data-cat") === current;
      it.hidden = !show;
      if (show) shown++;
    });
    grid.classList.remove("is-filtering"); void grid.offsetWidth; grid.classList.add("is-filtering");
    if (status) status.textContent = "Showing " + shown + " photos" + (current === "all" ? "" : " in " + CATS[current]);
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var f = c.getAttribute("data-filter");
      applyFilter(f);
      try { history.replaceState(null, "", f === "all" ? location.pathname : "#" + f); } catch (e) { /* file:// */ }
    });
  });
  var hash = (location.hash || "").slice(1);
  if (CATS[hash]) applyFilter(hash);

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbTitle = document.getElementById("lb-title");
  var lbCredit = document.getElementById("lb-credit");
  var lbCounter = document.getElementById("lb-counter");
  var visible = [], pos = 0, opener = null;

  function show(k) {
    pos = (k + visible.length) % visible.length;
    var p = PHOTOS[visible[pos]];
    var c = CREDITS[p[0]] || {};
    lbImg.classList.remove("is-loaded");
    lbImg.onload = function () { lbImg.classList.add("is-loaded"); };
    lbImg.src = "assets/img/" + p[0] + ".webp";
    lbImg.alt = p[2];
    if (lbImg.complete) lbImg.classList.add("is-loaded");
    lbTitle.textContent = p[2];
    var by = author(p[0]);
    lbCredit.innerHTML = by ? "Photo: " + esc(by) + (c.license ? " · " + esc(c.license) : "") +
      (c.source ? ' · <a href="' + esc(safeUrl(c.source)) + '" target="_blank" rel="noopener">Source</a>' : "") : "";
    lbCounter.textContent = (pos + 1) + " / " + visible.length;
    // warm the neighbours
    [1, -1].forEach(function (d) {
      var n = PHOTOS[visible[(pos + d + visible.length) % visible.length]];
      if (n) { var im = new Image(); im.src = "assets/img/" + n[0] + ".webp"; }
    });
  }
  function open(idx, btn) {
    visible = items.filter(function (it) { return !it.hidden; }).map(function (it) {
      return +it.querySelector("[data-index]").getAttribute("data-index");
    });
    opener = btn;
    lb.hidden = false;
    document.documentElement.classList.add("lb-open");
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    show(Math.max(0, visible.indexOf(idx)));
    lb.querySelector(".lightbox__close").focus();
  }
  function close() {
    lb.classList.remove("is-open");
    document.documentElement.classList.remove("lb-open");
    lb.hidden = true;
    if (opener) opener.focus();
  }
  grid.addEventListener("click", function (e) {
    var b = e.target.closest("[data-index]");
    if (b) open(+b.getAttribute("data-index"), b);
  });
  lb.addEventListener("click", function (e) {
    if (e.target.closest("[data-lb-close]")) close();
    else if (e.target.closest("[data-lb-prev]")) show(pos - 1);
    else if (e.target.closest("[data-lb-next]")) show(pos + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); show(pos - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(pos + 1); }
    else if (e.key === "Tab") {
      // keep focus inside the dialog
      var f = Array.prototype.slice.call(lb.querySelectorAll("button, a[href]"));
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // swipe
  var sx = null, sy = 0;
  lb.addEventListener("touchstart", function (e) { if (e.touches.length === 1) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; } }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) show(pos + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) close();
  }, { passive: true });

  /* ---------- credits ---------- */
  var list = document.getElementById("credits-list");
  if (list) {
    var names = PHOTOS.map(function (p) { return p[0]; });
    Object.keys(CREDITS).forEach(function (k) { if (names.indexOf(k) < 0) names.push(k); });
    var rows = names.filter(function (k) { return CREDITS[k]; }).map(function (k) {
      var c = CREDITS[k];
      var lic = c.license || "";
      var licUrl = LICENSES[lic];
      return '<li class="credit"><img class="credit__thumb" src="assets/img/' + k + '-sm.webp" alt="" width="72" height="48" loading="lazy">' +
        '<div class="credit__text"><a class="credit__title" href="' + esc(safeUrl(c.source)) + '" target="_blank" rel="noopener">' + esc(cleanTitle(c.title)) + "</a>" +
        '<span class="credit__meta">' + esc(author(k) || "Unknown author") + " · " +
        (licUrl ? '<a href="' + licUrl + '" target="_blank" rel="noopener license">' + esc(lic) + "</a>" : esc(lic)) +
        " · Wikimedia Commons</span></div></li>";
    });
    list.innerHTML = rows.length ? rows.join("") : '<li class="credit credit--empty">Photo credits are listed in assets/img/credits.json.</li>';
  }
})();
