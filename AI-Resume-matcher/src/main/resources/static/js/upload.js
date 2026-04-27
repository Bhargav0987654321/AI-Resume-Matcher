(() => {
  const API_BASE = "/api";

  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('show'));

  const fileInput = document.getElementById('resumeFile');
  const dropZone = document.getElementById('dropZone');
  const statusEl = document.getElementById('status');
  const jobDescriptionEl = document.getElementById('jobDescription');
  const analyzeBtn = document.getElementById('analyzeBtn');

  const setStatus = (msg, isError=false) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? 'var(--danger)' : 'var(--muted)';
  };

  if (dropZone) {
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('active'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('active'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('active');
      fileInput.files = e.dataTransfer.files;
      updateFileLabel();
    });
  }

  function updateFileLabel() {
    const file = fileInput?.files?.[0];
    const label = document.getElementById('fileLabel');
    if (label) label.textContent = file ? file.name : 'Drag & drop or click to choose a file';
  }
  fileInput?.addEventListener('change', updateFileLabel);

  analyzeBtn?.addEventListener('click', async () => {
    const file = fileInput?.files?.[0];
    const jobDescription = jobDescriptionEl?.value?.trim() || '';
    if (!file || !jobDescription) {
      setStatus('Please attach a resume and paste the job description.', true);
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);
    setStatus('Analyzing...');
    try {
      const res = await fetch(`${API_BASE}/matchResume`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      localStorage.setItem('matchResult', JSON.stringify(data));
      localStorage.setItem('jobDescription', jobDescription);
      localStorage.setItem('resumeFileName', file.name);
      window.location.href = 'result.html';
    } catch (err) {
      console.error(err);
      setStatus('Server error. Please try again.', true);
    }
  });
})();
