/* ── Password Gate ── */
(function () {
  function simpleHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
    }
    return hash.toString(16);
  }

  var CORRECT     = simpleHash('yourpropfirm26');
  var SESSION_KEY = 'ypf_fanbasis_auth';
  var gate        = document.getElementById('gate');
  var input       = document.getElementById('gate-input');
  var btn         = document.getElementById('gate-btn');
  var err         = document.getElementById('gate-error');
  var toggle      = document.getElementById('gate-toggle');

  if (sessionStorage.getItem(SESSION_KEY) === CORRECT) {
    gate.style.display = 'none';
  }

  function attempt() {
    if (simpleHash(input.value) === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, CORRECT);
      gate.style.display = 'none';
      err.classList.remove('show');
      input.classList.remove('error');
    } else {
      err.classList.add('show');
      input.classList.add('error');
      input.value = '';
      input.focus();
    }
  }

  btn.addEventListener('click', attempt);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') attempt();
    if (input.classList.contains('error')) {
      input.classList.remove('error');
      err.classList.remove('show');
    }
  });

  toggle.addEventListener('click', function () {
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '🙈';
    } else {
      input.type = 'password';
      toggle.textContent = '👁';
    }
    input.focus();
  });

  input.focus();
})();

/* ── Settings Tabs ── */
(function () {
  var tabBtns  = document.querySelectorAll('.tab-btn');
  var panelIds = {
    general:    'tab-general',
    advanced:   'tab-advanced',
    additional: 'tab-additional',
    fields:     'tab-fields',
    styling:    'tab-styling'
  };

  ['tab-advanced', 'tab-additional', 'tab-fields', 'tab-styling'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var target = btn.getAttribute('data-tab');
      Object.keys(panelIds).forEach(function (key) {
        var el = document.getElementById(panelIds[key]);
        if (el) el.style.display = (key === target) ? 'block' : 'none';
      });
    });
  });
})();
