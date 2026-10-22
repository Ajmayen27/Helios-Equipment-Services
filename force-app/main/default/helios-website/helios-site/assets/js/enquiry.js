/* Enquiry form: product prefill from ?product=CODE, live summary, progress, inline validation,
   loading state. The form still posts the same field names to Salesforce Web-to-Lead. */
(function () {
  var form = document.getElementById('leadForm');
  if (!form) return;
  var EQUIP = '00Nfj00005MxhMf', POST = '00Nfj00005MxiLx', BUDGET = '00Nfj00005MxjEn', REGION = '00Nfj00005MxmUP';
  var requiredNames = ['last_name', 'email', 'company', EQUIP, POST];

  // Send visitors back to this site's thank-you page, whatever domain the site is published on.
  if (/^https?:$/.test(location.protocol)) {
    document.getElementById('retURL').value = location.origin + location.pathname.replace(/[^/]*$/, '') + 'thank-you.html';
  }

  function radios(name) { return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]')); }
  function val(name) {
    var group = radios(name);
    if (group.length && group[0].type === 'radio') {
      var c = group.filter(function (r) { return r.checked; })[0];
      return c ? c.value : '';
    }
    var el = form.elements[name];
    return el ? (el.value || '').trim() : '';
  }
  function isValid(name) {
    var v = val(name);
    if (!v) return false;
    if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    return true;
  }
  function firstInput(name) { var g = radios(name); return g.length ? g[0] : form.elements[name]; }
  function fieldOf(name) { return firstInput(name).closest('.field'); }
  function setText(id, text) {
    var dd = document.getElementById(id);
    dd.textContent = text || '–';
    dd.classList.toggle('empty', !text);
  }

  // ---------- Product prefill ----------
  var picked = document.getElementById('picked');
  var desc = document.getElementById('description');
  var prefillText = '';
  var code = new URLSearchParams(location.search).get('product');
  var product = code ? HES.byCode(code) : null;
  if (product) {
    document.getElementById('pickedImg').src = product.image;
    document.getElementById('pickedImg').alt = product.name;
    document.getElementById('pickedName').textContent = product.name;
    document.getElementById('pickedMeta').textContent = product.code + ' · indicative list price ' + HES.euro.format(product.price);
    picked.classList.add('show');
    radios(EQUIP).forEach(function (r) { r.checked = (r.value === product.family); });
    prefillText = 'Interested in: ' + product.name + ' (' + product.code + ').\n';
    if (!desc.value) desc.value = prefillText;
  }
  document.getElementById('pickedClear').addEventListener('click', function () {
    picked.classList.remove('show');
    if (desc.value.indexOf(prefillText) === 0) desc.value = desc.value.slice(prefillText.length);
    history.replaceState(null, '', location.pathname);
    refresh();
    window.location.href = 'index.html#products';
  });

  // ---------- Live summary and progress ----------
  function refresh() {
    var done = requiredNames.filter(isValid).length;
    document.getElementById('progressBar').style.width = (done / requiredNames.length * 100) + '%';
    document.getElementById('progressLabel').textContent = done + ' of ' + requiredNames.length + ' required fields';
    if (done === requiredNames.length) document.getElementById('formAlert').classList.remove('show');

    setText('sName', [val('first_name'), val('last_name')].filter(Boolean).join(' '));
    setText('sCompany', val('company'));
    setText('sEquip', product && val(EQUIP) === product.family ? product.name : val(EQUIP));
    setText('sPost', val(POST));
    setText('sRegion', val(REGION));
    var b = val(BUDGET);
    setText('sBudget', b ? HES.euro.format(Number(b)) : '');
    document.getElementById('budgetHint').textContent = b ? HES.euro.format(Number(b)) : 'Optional – helps us suggest the right size.';
    document.getElementById('descCount').textContent = desc.value.length;

    requiredNames.forEach(function (n) {
      var f = fieldOf(n);
      if (f.classList.contains('has-error') && isValid(n)) f.classList.remove('has-error');
    });
  }

  form.addEventListener('input', refresh);
  form.addEventListener('change', refresh);
  requiredNames.forEach(function (n) {
    var list = radios(n).length ? radios(n) : [form.elements[n]];
    list.forEach(function (x) {
      x.addEventListener('blur', function () { if (!isValid(n)) fieldOf(n).classList.add('has-error'); });
    });
  });

  form.addEventListener('submit', function (e) {
    var bad = requiredNames.filter(function (n) { return !isValid(n); });
    if (bad.length) {
      e.preventDefault();
      bad.forEach(function (n) { fieldOf(n).classList.add('has-error'); });
      document.getElementById('formAlert').classList.add('show');
      firstInput(bad[0]).focus();
      return;
    }
    document.getElementById('formAlert').classList.remove('show');
    var btn = document.getElementById('submitBtn');
    btn.classList.add('loading');
    btn.setAttribute('disabled', 'disabled');
    document.getElementById('btnText').textContent = 'Sending…';
  });

  refresh();
})();
