/* Single Journal article: renders post.html?p=<slug> from window.BROOKS_POSTS. */
(function () {
  var posts = (window.BROOKS_POSTS || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var authors = window.BROOKS_AUTHORS || {};
  var slug = new URLSearchParams(location.search).get('p') || '';
  var post = posts.filter(function (p) { return p.slug === slug; })[0];

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function fmtDate(iso) { var p = iso.split('-'); return +p[2] + ' ' + MONTHS[+p[1] - 1] + ' ' + p[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(sel) { return document.querySelector(sel); }
  function url(p) { return 'post.html?p=' + encodeURIComponent(p.slug); }
  var SITE = ' | Brooks Tours & Travels';
  var svg = function (body, fill) {
    return '<svg viewBox="0 0 24 24" ' + (fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"') + ' aria-hidden="true">' + body + '</svg>';
  };
  var ICON = {
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    cal: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'),
    wa: svg('<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41"/>', true),
    x: svg('<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"/>', true),
    fb: svg('<path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>', true),
    link: svg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>')
  };

  function card(p) {
    return '<article class="post-card">' +
      '<a class="post-card__media" href="' + url(p) + '" tabindex="-1" aria-hidden="true">' +
        '<img src="assets/img/' + p.image + '-sm.webp" alt="" width="720" height="480" loading="lazy">' +
        '<span class="badge badge--light">' + esc(p.category) + '</span></a>' +
      '<div class="post-card__body">' +
        '<p class="post-meta"><time datetime="' + p.date + '">' + fmtDate(p.date) + '</time><span>' + ICON.clock + p.readMins + ' min read</span></p>' +
        '<h3><a href="' + url(p) + '">' + esc(p.title) + '</a></h3>' +
        '<p class="post-card__excerpt">' + esc(p.excerpt) + '</p>' +
        '<a class="link-arrow" href="' + url(p) + '">Read article <span class="arr">→</span></a>' +
      '</div></article>';
  }

  var relatedEl = $('[data-related]');

  if (!post) {
    document.title = 'Article not found' + SITE;
    $('[data-post-root]').hidden = true;
    $('[data-post-missing]').hidden = false;
    $('[data-post-title]').textContent = 'Article not found';
    $('[data-post-crumb]').textContent = 'Not found';
    $('[data-post-cat]').textContent = 'The Brooks Journal';
    $('[data-related-title]').textContent = 'Latest from the Journal';
    relatedEl.innerHTML = posts.slice(0, 3).map(card).join('');
    return;
  }

  var author = authors[post.author] || { name: 'Brooks Team', role: 'Brooks Tours & Travels', initials: 'BT', bio: '' };
  document.title = post.title + SITE;
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', post.excerpt);

  var hero = $('[data-post-hero]');
  hero.style.setProperty('--hero', "url('assets/img/" + post.image + ".webp')");
  $('[data-post-crumb]').textContent = post.title;
  $('[data-post-cat]').textContent = post.category;
  $('[data-post-title]').textContent = post.title;
  $('[data-post-meta]').innerHTML =
    '<span class="post-hero__author"><span class="avatar avatar--sm" aria-hidden="true">' + esc(author.initials) + '</span>By ' + esc(author.name) + '</span>' +
    '<span>' + ICON.cal + '<time datetime="' + post.date + '">' + fmtDate(post.date) + '</time></span>' +
    '<span>' + ICON.clock + post.readMins + ' min read</span>';
  $('[data-post-excerpt]').textContent = post.excerpt;
  $('[data-post-body]').innerHTML = post.body.join('\n');

  // Share
  var pageUrl = location.href.split('#')[0];
  var enc = encodeURIComponent;
  var shareHtml =
    '<a class="share__btn share__btn--wa" href="https://wa.me/?text=' + enc(post.title + ' ' + pageUrl) + '" target="_blank" rel="noopener" aria-label="Share on WhatsApp">' + ICON.wa + '</a>' +
    '<a class="share__btn" href="https://twitter.com/intent/tweet?text=' + enc(post.title) + '&amp;url=' + enc(pageUrl) + '" target="_blank" rel="noopener" aria-label="Share on X">' + ICON.x + '</a>' +
    '<a class="share__btn" href="https://www.facebook.com/sharer/sharer.php?u=' + enc(pageUrl) + '" target="_blank" rel="noopener" aria-label="Share on Facebook">' + ICON.fb + '</a>' +
    '<button type="button" class="share__btn" data-copy aria-label="Copy link to this article">' + ICON.link + '</button>';
  Array.prototype.forEach.call(document.querySelectorAll('[data-share]'), function (el) {
    el.innerHTML = (el.classList.contains('share--rail') ? '<span class="share__label">Share</span>' : '') + shareHtml;
  });

  function copied(btn) {
    btn.classList.add('is-copied');
    btn.innerHTML = ICON.check;
    btn.setAttribute('aria-label', 'Link copied');
    setTimeout(function () { btn.classList.remove('is-copied'); btn.innerHTML = ICON.link; btn.setAttribute('aria-label', 'Copy link to this article'); }, 2000);
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(pageUrl).then(function () { copied(btn); }, function () { fallbackCopy(pageUrl); copied(btn); });
    } else { fallbackCopy(pageUrl); copied(btn); }
  });

  // Author
  $('[data-author]').innerHTML =
    '<span class="avatar avatar--lg" aria-hidden="true">' + esc(author.initials) + '</span>' +
    '<div><p class="author-box__eyebrow">Written by</p><p class="author-box__name">' + esc(author.name) + '</p>' +
    '<p class="author-box__role">' + esc(author.role) + '</p><p class="author-box__bio">' + esc(author.bio) + '</p></div>';

  // Related: same category first, then most recent
  var others = posts.filter(function (p) { return p.slug !== post.slug; });
  var same = others.filter(function (p) { return p.category === post.category; });
  var rest = others.filter(function (p) { return p.category !== post.category; });
  relatedEl.innerHTML = same.concat(rest).slice(0, 3).map(card).join('');
})();
