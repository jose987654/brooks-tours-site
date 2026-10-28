/* Home page: hero crossfade slideshow + reviews slider. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Hero slideshow (crossfade + Ken Burns via CSS classes) ---- */
  var hero = document.querySelector(".home-hero");
  if (hero) {
    var slides = hero.querySelectorAll(".home-hero__slide");
    var dots = hero.querySelectorAll(".home-hero__dots i");
    var caption = document.getElementById("hero-caption");
    var current = 0, timer = null, DURATION = 6500;

    var show = function (i) {
      slides[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      if (dots[current]) {
        // restart progress bar animation
        void dots[current].offsetWidth;
        dots[current].classList.add("is-active");
      }
      if (caption) {
        caption.style.opacity = "0";
        setTimeout(function () {
          caption.textContent = slides[current].getAttribute("data-caption") || "";
          caption.style.opacity = "1";
        }, 400);
      }
    };
    // Later slides load only after the page has finished loading, so the first photo gets the full connection.
    // A slide is skipped until its photo has arrived, so the crossfade never fades to a blank frame.
    var ready = function (s) { var img = s.querySelector("img"); return img && img.getAttribute("src") && img.complete && img.naturalWidth > 0; };
    var loadRest = function () {
      hero.querySelectorAll("img[data-src]").forEach(function (img) { img.src = img.getAttribute("data-src"); img.removeAttribute("data-src"); });
    };
    if (document.readyState === "complete") setTimeout(loadRest, 300); else window.addEventListener("load", function () { setTimeout(loadRest, 300); });
    var next = function () {
      for (var k = 1; k < slides.length; k++) {
        var i = (current + k) % slides.length;
        if (ready(slides[i])) { show(i); return; }
      }
    };
    var start = function () { if (!timer && !reduce) timer = setInterval(next, DURATION); };
    var stop = function () { clearInterval(timer); timer = null; };

    if (slides.length > 1 && !reduce) {
      // Kick the first slide's zoom after first paint so it animates 1.12 -> 1.
      slides[0].classList.remove("is-active");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { slides[0].classList.add("is-active"); });
      });
      start();
      document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    }
  }

  /* ---- Reviews slider ---- */
  var track = document.getElementById("reviews-track");
  if (track) {
    var btns = document.querySelectorAll(".reviews__btn");
    var step = function () {
      var card = track.querySelector(".quote-card");
      var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      btns.forEach(function (b) {
        var dir = +b.getAttribute("data-dir");
        b.disabled = dir < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max;
      });
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        track.scrollBy({ left: +b.getAttribute("data-dir") * step(), behavior: reduce ? "auto" : "smooth" });
      });
    });
    track.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
})();
