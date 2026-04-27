(() => {
  const API_BASE = 'http://localhost:8080/api';
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  // DOM Elements
  const fileInput = document.getElementById('resumeFile');
  const dropZone = document.getElementById('dropZone');
  const analyzeForm = document.getElementById('analyzeForm');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const statusEl = document.getElementById('status');
  const jobDescriptionEl = document.getElementById('jobDescription');
  const fileStatus = document.getElementById('fileStatus');
  const progressContainer = document.getElementById('progressContainer');
  const charCountEl = document.getElementById('charCount');

  // Initialize
  init();

  function init() {
    setupDropZone();
    setupFileInput();
    setupJobDescriptionCounter();
    setupFormSubmit();
    addFadeInAnimations();
  }

  function addFadeInAnimations() {
    document.querySelectorAll('.fade-in-up').forEach((el, index) => {
      el.style.animationDelay = (index * 0.1) + 's';
    });
  }

  function setupDropZone() {
    if (!dropZone) return;

    dropZone.addEventListener('click', () => fileInput?.click());
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('active');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('active');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('active');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        updateFileLabel();
      }
    });
  }

  function setupFileInput() {
    if (!fileInput) return;
    fileInput.addEventListener('change', updateFileLabel);
  }

  function setupJobDescriptionCounter() {
    if (!jobDescriptionEl) return;
    jobDescriptionEl.addEventListener('input', () => {
      const charCount = jobDescriptionEl.value.length;
      if (charCountEl) {
        charCountEl.textContent = Math.min(charCount, 5000);
      }
    });
  }

  function setupFormSubmit() {
    if (!analyzeForm) return;
    analyzeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitAnalysis();
    });
  }

  function updateFileLabel() {
    const file = fileInput?.files?.[0];
    
    if (!file) {
      if (fileStatus) {
        fileStatus.textContent = '';
        fileStatus.classList.remove('error');
      }
      return;
    }

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileStatus('Invalid file type. Please upload PDF or DOCX.', true);
      fileInput.value = '';
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileStatus('File too large. Maximum 10MB allowed.', true);
      fileInput.value = '';
      return;
    }

    // Success
    const sizeKB = (file.size / 1024).toFixed(1);
    setFileStatus(`✓ ${file.name} (${sizeKB} KB)`, false);
  }

  function setFileStatus(message, isError = false) {
    if (!fileStatus) return;
    fileStatus.textContent = message;
    fileStatus.classList.toggle('error', isError);
  }

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'status-message';
    if (isError) {
      statusEl.classList.add('error');
    } else {
      statusEl.classList.add('success');
    }
  }

  function showProgress(show = true) {
    if (progressContainer) {
      progressContainer.style.display = show ? 'block' : 'none';
    }
  }

  async function submitAnalysis() {
    const file = fileInput?.files?.[0];
    const jobDescription = jobDescriptionEl?.value?.trim() || '';

    // Validation
    if (!file) {
      setStatus('Please select a resume file.', true);
      return;
    }

    if (!jobDescription) {
      setStatus('Please paste a job description.', true);
      return;
    }

    if (jobDescription.length < 50) {
      setStatus('Job description is too short. Please provide complete details.', true);
      return;
    }

    // Disable button and show progress
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.6';
    showProgress(true);
    setStatus('Analyzing your resume...');

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      // Make API request
      console.log('Sending request to:', `${API_BASE}/matchResume`);
      const res = await fetch(`${API_BASE}/matchResume`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log('API Response:', data);

      // Store results in localStorage
      localStorage.setItem('matchResult', JSON.stringify(data));
      localStorage.setItem('jobDescription', jobDescription);
      localStorage.setItem('resumeFileName', file.name);

      // Success message
      setStatus('✓ Analysis complete! Redirecting to results...', false);
      
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = 'result.html';
      }, 1000);

    } catch (err) {
      console.error('Error:', err);
      let errorMsg = 'Failed to analyze resume. ';
      
      if (err.message.includes('Failed to fetch')) {
        errorMsg += 'Backend server is not running. Please start the Spring Boot application on http://localhost:8080';
      } else {
        errorMsg += err.message;
      }
      
      setStatus(errorMsg, true);
      showProgress(false);
      analyzeBtn.disabled = false;
      analyzeBtn.style.opacity = '1';
    }
  }

  // Health check on load
  window.addEventListener('load', async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) {
        console.log('Backend is running!');
      }
    } catch (err) {
      console.warn('Backend not available at startup');
    }
  });
})();
