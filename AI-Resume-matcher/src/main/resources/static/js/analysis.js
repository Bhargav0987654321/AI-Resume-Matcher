(() => {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('show'));

  const matchedList = document.getElementById('matchedList');
  const missingList = document.getElementById('missingList');
  const suggestionsList = document.getElementById('suggestionsList');
  const scoreLabel = document.getElementById('scoreLabel');

  const renderList = (el, items, missing=false) => {
    if (!el) return;
    el.innerHTML = '';
    (items || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      if (missing) li.classList.add('missing');
      el.appendChild(li);
    });
    if (!items || !items.length) {
      const li = document.createElement('li');
      li.textContent = 'None';
      el.appendChild(li);
    }
  };

  let result = null;
  try { result = JSON.parse(localStorage.getItem('matchResult')); } catch (e) { result = null; }

  if (!result) {
    if (scoreLabel) scoreLabel.textContent = 'No data yet. Run an analysis from Upload after starting the backend.';
    renderList(matchedList, []);
    renderList(missingList, []);
    renderList(suggestionsList, []);
    return;
  }

  if (scoreLabel) scoreLabel.textContent = '${result.matchScore}% match';
  renderList(matchedList, result.matchedSkills);
  renderList(missingList, result.missingSkills, true);
  renderList(suggestionsList, result.suggestions);

  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn?.addEventListener('click', async () => {
    const resumeText = 'See backend extracted text';
    const jobDescription = localStorage.getItem('jobDescription') || '';
    const name = localStorage.getItem('resumeFileName') || 'candidate';
    const params = new URLSearchParams({ name, resumeText, jobDescription });
    try {
      const res = await fetch('http://localhost:8080/api/analysisReport?');
      if (!res.ok) throw new Error('API error');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'analysis-report.pdf';
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Backend not running ? start Spring Boot to download the PDF.');
    }
  });
})();
