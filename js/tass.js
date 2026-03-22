// ── Tab switching (nav + any inline tab links)
function activateTab(tabName) {
  document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-link[data-tab="' + tabName + '"]').forEach(l => l.classList.add('active'));
  document.getElementById('tab-' + tabName).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    activateTab(this.dataset.tab);
  });
});

// ── "Any / All" disables individual checkboxes
document.getElementById('f-any').addEventListener('change', function () {
  document.querySelectorAll('.dict-checkboxes input[type="checkbox"]:not(#f-any)').forEach(cb => {
    cb.disabled = this.checked;
    if (this.checked) cb.checked = false;
  });
});

// ── Build mailto and open
function submitForm() {
  const name        = document.getElementById('f-name').value.trim();
  const email       = document.getElementById('f-email').value.trim();
  const institution = document.getElementById('f-institution').value.trim();
  const role        = document.getElementById('f-role').value;
  const message     = document.getElementById('f-message').value.trim();
  const anyChecked  = document.getElementById('f-any').checked;

  const selected = anyChecked
    ? ['Any / All Dictionaries']
    : Array.from(
        document.querySelectorAll('.dict-checkboxes input[type="checkbox"]:not(#f-any):checked')
      ).map(cb => cb.value);

  const dictList = selected.length > 0
    ? selected.map(d => '  - ' + d).join('\n')
    : '  (none selected)';

  const body = [
    'T-Lex Project — Expression of Interest',
    '========================================',
    '',
    'Name:        ' + (name        || '[not provided]'),
    'Email:       ' + (email       || '[not provided]'),
    'Institution: ' + (institution || '[not provided]'),
    'Role:        ' + (role        || '[not provided]'),
    '',
    'Dictionaries of Interest:',
    dictList,
    '',
    'Background & Interest:',
    (message || '[not provided]'),
  ].join('\n');

  const subject = 'T-Lex Project \u2014 Expression of Interest';
  window.location.href =
    'mailto:ap@simdadllc.com'
    + '?subject=' + encodeURIComponent(subject)
    + '&body='    + encodeURIComponent(body);
}
