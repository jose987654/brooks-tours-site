/* The Brooks Journal: featured post, category filter and post grid. */
(function () {
  var posts = (window.BROOKS_POSTS || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var authors = window.BROOKS_AUTHORS || {};
  if (!posts.length) return;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function fmtDate(iso) { var p = iso.split('-'); return +p[2] + ' ' + MONTHS[+p[1] - 1] + ' ' + p[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function url(p) { return 'post.html?p=' + encodeURIComponent(p.slug); }
  var clock = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  function card(p) {
    return '<article class="post-card">' +
      '<a class="post-card__media" href="' + url(p) + '" tabindex="-1" aria-hidden="true">' +
        '<img src="assets/img/' + p.image + '-sm.webp" alt="" width="720" height="480" loading="lazy">' +
        '<span class="badge badge--light">' + esc(p.category) + '</span></a>' +
      '<div class="post-card__body">' +
        '<p class="post-meta"><time datetime="' + p.date + '">' + fmtDate(p.date) + '</time><span>' + clock + p.readMins + ' min read</span></p>' +
        '<h3><a href="' + url(p) + '">' + esc(p.title) + '</a></h3>' +
        '<p class="post-card__excerpt">' + esc(p.excerpt) + '</p>' +
        '<a class="link-arrow" href="' + url(p) + '">Read article <span class="arr">→</span></a>' +
      '</div></article>';
  }

  // Featured (most recent)
  var feat = posts[0];
  var a = authors[feat.author] || {};
  document.querySelector('[data-featured]').innerHTML =
    '<article class="featured__card">' +
      '<a class="featured__media" href="' + url(feat) + '" tabindex="-1" aria-hidden="true">' +
        '<img src="assets/img/' + feat.image + '.webp" alt="" width="1800" height="1200"></a>' +
      '<div class="featured__body">' +
        '<p class="featured__label"><span class="badge">Featured</span><span>' + esc(feat.category) + '</span></p>' +
        '<h2><a href="' + url(feat) + '">' + esc(feat.title) + '</a></h2>' +
        '<p class="featured__excerpt">' + esc(feat.excerpt) + '</p>' +
        '<div class="featured__foot">' +
          '<span class="avatar" aria-hidden="true">' + esc(a.initials || 'BT') + '</span>' +
          '<span class="featured__by"><strong>' + esc(a.name || 'Brooks Team') + '</strong><span>' + fmtDate(feat.date) + ' · ' + feat.readMins + ' min read</span></span>' +
        '</div>' +
        '<a class="btn btn-dark" href="' + url(feat) + '">Read the article <span class="arr">→</span></a>' +
      '</div></article>';

  // Chips
  var cats = ['All'];
  posts.forEach(function (p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });
  var chipsEl = document.querySelector('[data-chips]');
  chipsEl.innerHTML = cats.map(function (c, i) {
    return '<button type="button" class="chip' + (i === 0 ? ' is-active' : '') + '" aria-pressed="' + (i === 0) + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
  }).join('');

  var grid = document.querySelector('[data-grid]');
  var empty = document.querySelector('[data-empty]');
  var nl = document.querySelector('[data-newsletter]');
  function render(cat) {
    var list = cat === 'All' ? posts.slice(1) : posts.filter(function (p) { return p.category === cat; });
    if (nl && nl.parentNode === grid) grid.removeChild(nl);
    grid.innerHTML = list.map(card).join('');
    if (nl) grid.appendChild(nl); // newsletter tile always closes the grid
    empty.hidden = list.length > 0;
  }
  chipsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    Array.prototype.forEach.call(chipsEl.children, function (c) {
      var on = c === btn; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on);
    });
    render(btn.getAttribute('data-cat'));
  });
  render('All');
})();
