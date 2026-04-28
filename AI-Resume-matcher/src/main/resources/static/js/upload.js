(() => {
  // Dynamically get backend URL - works on both localhost and Render
  const getBackendUrl = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    // If running locally
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    }
    
    // If running on Render or deployed
    // Extract subdomain from deployed URL: https://ai-resume-matcher-fu1b.onrender.com
    if (hostname.includes('onrender.com')) {
      return `${protocol}//${hostname}`;
    }
    
    // Fallback to current domain
    return `${protocol}//${hostname}:8080`;
  };

  const API_BASE = `${getBackendUrl()}/api`;
  
  console.log('Backend API URL:', API_BASE);

  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('show'));
  
  const fileInput = document.getElementById('resumeFile');
  const dropZone = document.getElementById('dropZone');
  const statusEl = document.getElementById('status');
  const jobDescriptionEl = document.getElementById('jobDescription');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const charCountEl = document.getElementById('charCount');
  
  const setStatus = (msg, isError = false) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? 'var(--danger)' : 'var(--success)';
  };

  // Character count for job description
  if (jobDescriptionEl) {
    jobDescriptionEl.addEventListener('input', () => {
      if (charCountEl) {
        charCountEl.textContent = jobDescriptionEl.value.length;
      }
    });
  }

  // Drag and drop zone
  if (dropZone) {
    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('active');
    });
    
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('active');
    });
    
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('active');
      fileInput.files = e.dataTransfer.files;
      updateFileLabel();
    });
    
    dropZone.addEventListener('click', () => {
      fileInput.click();
    });
  }

  function updateFileLabel() {
    const file = fileInput?.files?.[0];
    const fileStatus = document.getElementById('fileStatus');
    if (fileStatus) {
      if (file) {
        fileStatus.innerHTML = `<span style="color: var(--success);">✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)</span>`;
      } else {
        fileStatus.textContent = '';
      }
    }
  }

  fileInput?.addEventListener('change', updateFileLabel);

  analyzeBtn?.addEventListener('click', async () => {
    const file = fileInput?.files?.[0];
    const jobDescription = jobDescriptionEl?.value?.trim() || '';

    if (!file) {
      setStatus('❌ Please upload a resume (PDF or DOCX)', true);
      return;
    }

    if (!jobDescription) {
      setStatus('❌ Please paste the job description', true);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setStatus('❌ File size must be less than 10MB', true);
      return;
    }

    const progressContainer = document.getElementById('progressContainer');
    if (progressContainer) {
      progressContainer.style.display = 'block';
    }

    analyzeBtn.disabled = true;
    setStatus('⏳ Analyzing your resume...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);

    try {
      console.log('Sending request to:', `${API_BASE}/matchResume`);
      
      const res = await fetch(`${API_BASE}/matchResume`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      console.log('Analysis result:', data);

      // Store results in localStorage
      localStorage.setItem('matchResult', JSON.stringify(data));
      localStorage.setItem('jobDescription', jobDescription);
      localStorage.setItem('resumeFileName', file.name);

      setStatus('✓ Analysis complete! Redirecting...');
      
      // Redirect to results page
      setTimeout(() => {
        window.location.href = 'result.html';
      }, 1000);

    } catch (err) {
      console.error('Error:', err);
      setStatus(
        `❌ Error: ${err.message}. Make sure the backend is running at ${getBackendUrl()}`,
        true
      );
    } finally {
      analyzeBtn.disabled = false;
      if (progressContainer) {
        progressContainer.style.display = 'none';
      }
    }
  });
})();
