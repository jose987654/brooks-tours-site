/* offers.html — renders tours with offer:true */
(function () {
  "use strict";
  var grid = document.getElementById("offers-grid");
  if (!grid) return;
  var esc = window.brooksEsc, money = window.brooksMoney, COUNTRY = window.BROOKS_COUNTRY_NAMES;
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var now = new Date();

  function parseDate(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 23, 59, 59); }
  function fmt(d) { return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }

  var offers = (window.BROOKS_TOURS || []).filter(function (t) {
    return t.offer && t.oldPrice && (!t.offerValid || parseDate(t.offerValid) >= now);
  }).sort(function (a, b) { return (a.offerValid || "9").localeCompare(b.offerValid || "9"); });

  if (!offers.length) {
    grid.innerHTML = '<div class="offers-none"><h3>New offers are on their way</h3><p>Our current deals have just closed. Sign up below and we will message you the moment the next one goes live.</p><a class="btn btn-dark" href="#signup-h">Get offer alerts</a></div>';
    return;
  }

  grid.innerHTML = offers.map(function (t) {
    var href = "tour.html?t=" + encodeURIComponent(t.slug);
    var save = t.oldPrice - t.priceFrom;
    var pct = Math.round(save / t.oldPrice * 100);
    var valid = t.offerValid ? parseDate(t.offerValid) : null;
    var daysLeft = valid ? Math.ceil((valid - now) / 864e5) : 999;
    var countries = t.countries.map(function (c) { return COUNTRY[c]; }).join(" · ");
    return '<article class="offer-card">' +
      '<a class="offer-card__media" href="' + href + '">' +
        '<img src="assets/img/' + t.image + '-sm.webp" alt="' + esc(t.title) + '" width="720" height="480" loading="lazy">' +
        '<span class="offer-card__save"><small>Save</small>' + money(save) + '<small>pp · ' + pct + '% off</small></span>' +
        (daysLeft <= 75 ? '<span class="badge offer-card__soon">Ends soon</span>' : '') +
      '</a>' +
      '<div class="offer-card__body">' +
        '<div class="tour-card__meta"><span>' + t.days + ' Days</span><span>' + esc(countries) + '</span><span>' + esc(t.style) + '</span></div>' +
        '<h3><a href="' + href + '">' + esc(t.title) + '</a></h3>' +
        '<p class="offer-card__note">' + esc(t.offerNote || "") + '</p>' +
        '<p class="offer-card__summary">' + esc(t.summary) + '</p>' +
        '<div class="offer-card__foot">' +
          '<div class="offer-card__price"><span class="offer-card__was">Was <s>' + money(t.oldPrice) + '</s></span>' +
          '<span class="offer-card__now">From <strong>' + money(t.priceFrom) + '</strong> pp</span></div>' +
          '<div class="offer-card__cta">' +
            (valid ? '<span class="offer-card__valid"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Valid until ' + fmt(valid) + '</span>' : '') +
            '<a class="btn btn-dark btn-sm" href="' + href + '">View offer <span class="arr">→</span></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join("");
})();
