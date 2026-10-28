/* Plan Your Safari: interactive packing checklist (progress saved in localStorage). */
(function () {
  var root = document.querySelector('[data-packing]');
  if (!root) return;
  var KEY = 'brooks-packing-v1';
  var boxes = Array.prototype.slice.call(root.querySelectorAll('input[type="checkbox"]'));
  var doneEl = root.querySelector('[data-pack-done]');
  var totalEl = root.querySelector('[data-pack-total]');
  var fill = root.querySelector('[data-pack-fill]');
  var meter = root.querySelector('[role="progressbar"]');

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { return []; }
  }
  function save() {
    var ticked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    try { localStorage.setItem(KEY, JSON.stringify(ticked)); } catch (e) { /* storage unavailable: still works for this visit */ }
  }
  function update() {
    var done = boxes.filter(function (b) { return b.checked; }).length;
    var pct = boxes.length ? Math.round(done / boxes.length * 100) : 0;
    doneEl.textContent = done;
    totalEl.textContent = boxes.length;
    fill.style.width = pct + '%';
    meter.setAttribute('aria-valuenow', pct);
    root.classList.toggle('is-complete', done === boxes.length && done > 0);
  }

  var saved = load();
  boxes.forEach(function (b) {
    b.checked = saved.indexOf(b.value) !== -1;
    b.addEventListener('change', function () { save(); update(); });
  });
  root.querySelector('[data-pack-reset]').addEventListener('click', function () {
    boxes.forEach(function (b) { b.checked = false; });
    save(); update();
  });
  root.querySelector('[data-pack-print]').addEventListener('click', function () {
    document.body.classList.add('print-packing');
    window.print();
  });
  window.addEventListener('afterprint', function () { document.body.classList.remove('print-packing'); });
  update();
})();
