/* Product catalogue: renders cards from HES_PRODUCTS, with family filter, search, sort,
   a detail dialog, and links into the enquiry form (enquiry.html?product=CODE). */
(function () {
  var products = window.HES_PRODUCTS || [];
  var families = window.HES_FAMILIES || [];
  var grid = document.getElementById('productGrid');
  var chips = document.getElementById('familyChips');
  var search = document.getElementById('productSearch');
  var sort = document.getElementById('productSort');
  var countEl = document.getElementById('resultCount');
  if (!grid) return;

  var state = { family: 'All', q: '', sort: 'featured' };

  // Read the starting filter from the URL (#products?family=Chiller also works from other pages)
  var params = new URLSearchParams(location.search);
  if (params.get('family')) state.family = params.get('family');

  function keySpecs(p) {
    var s = p.specs, out = [];
    Object.keys(s).slice(0, 2).forEach(function (k) { out.push(s[k]); });
    return out;
  }

  function renderChips() {
    var list = [{ key: 'All', label: 'All products' }].concat(families);
    chips.innerHTML = list.map(function (f) {
      var n = f.key === 'All' ? products.length : products.filter(function (p) { return p.family === f.key; }).length;
      return '<button type="button" class="chip" data-family="' + HES.esc(f.key) + '" aria-pressed="' + (state.family === f.key) + '">' +
        HES.esc(f.label) + '<span class="count">' + n + '</span></button>';
    }).join('');
  }

  function filtered() {
    var q = state.q.toLowerCase();
    var list = products.filter(function (p) {
      if (state.family !== 'All' && p.family !== state.family) return false;
      if (!q) return true;
      var hay = [p.code, p.name, p.family, p.summary, p.uses.join(' '), Object.values(p.specs).join(' ')].join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    if (state.sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    if (state.sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }

  function card(p, i) {
    return '<article class="product" style="animation-delay:' + (i * 50) + 'ms">' +
      '<div class="product-media"><span class="tag" style="background:' + p.accent + '">' + HES.esc(p.tag) + '</span>' +
      '<img src="' + p.image + '" alt="' + HES.esc(p.name) + '" loading="lazy" width="400" height="260"></div>' +
      '<div class="product-body">' +
        '<div class="product-code">' + HES.esc(p.code) + ' · ' + HES.esc(p.family) + '</div>' +
        '<h3>' + HES.esc(p.name) + '</h3>' +
        '<p>' + HES.esc(p.summary) + '</p>' +
        '<div class="keyspecs">' + keySpecs(p).map(function (s) { return '<span>' + HES.esc(s) + '</span>'; }).join('') + '</div>' +
        '<div class="product-foot">' +
          '<div class="price">' + HES.euro.format(p.price) + '<small>Indicative list price</small></div>' +
          '<div class="product-actions">' +
            '<button type="button" class="btn btn-outline btn-sm" data-details="' + p.code + '">Details</button>' +
            '<a class="btn btn-sm" href="enquiry.html?product=' + encodeURIComponent(p.code) + '">Quote</a>' +
          '</div>' +
        '</div>' +
      '</div></article>';
  }

  function render() {
    var list = filtered();
    grid.innerHTML = list.length ? list.map(card).join('') :
      '<div class="empty-state"><b>No products match “' + HES.esc(state.q) + '”.</b><br>Try another word, or <a href="enquiry.html">ask our specialists</a>.</div>';
    countEl.textContent = list.length + (list.length === 1 ? ' product' : ' products');
    Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (c) {
      c.setAttribute('aria-pressed', c.getAttribute('data-family') === state.family ? 'true' : 'false');
    });
  }

  chips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (!b) return;
    state.family = b.getAttribute('data-family');
    render();
  });
  search.addEventListener('input', function () { state.q = search.value.trim(); render(); });
  sort.addEventListener('change', function () { state.sort = sort.value; render(); });

  // Family cards ("View chillers") filter the grid and scroll to it
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-show-family]');
    if (!f) return;
    state.family = f.getAttribute('data-show-family');
    render();
    document.getElementById('products').scrollIntoView();
  });

  // ---------- Detail dialog ----------
  var modal = document.getElementById('productModal');
  var lastFocus = null;
  function openModal(code) {
    var p = HES.byCode(code);
    if (!p) return;
    lastFocus = document.activeElement;
    document.getElementById('mImg').src = p.image;
    document.getElementById('mImg').alt = p.name;
    document.getElementById('mCode').textContent = p.code + ' · ' + p.family;
    document.getElementById('mName').textContent = p.name;
    document.getElementById('mSummary').textContent = p.summary;
    document.getElementById('mSpecs').innerHTML = Object.keys(p.specs).map(function (k) {
      return '<tr><th scope="row">' + HES.esc(k) + '</th><td>' + HES.esc(p.specs[k]) + '</td></tr>';
    }).join('') + '<tr><th scope="row">Indicative list price</th><td><b>' + HES.euro.format(p.price) + '</b></td></tr>';
    document.getElementById('mUses').innerHTML = p.uses.map(function (u) { return '<span>' + HES.esc(u) + '</span>'; }).join('');
    document.getElementById('mQuote').href = 'enquiry.html?product=' + encodeURIComponent(p.code);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('[data-details]');
    if (b) openModal(b.getAttribute('data-details'));
  });
  modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.modal-close')) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  renderChips();
  render();
})();
