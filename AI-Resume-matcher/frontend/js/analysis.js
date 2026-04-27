(() => {
  // DOM Elements
  const noDataState = document.getElementById('noDataState');
  const resultsState = document.getElementById('resultsState');
  const scoreValue = document.getElementById('scoreValue');
  const scoreTitle = document.getElementById('scoreTitle');
  const scoreDescription = document.getElementById('scoreDescription');
  const matchedList = document.getElementById('matchedList');
  const missingList = document.getElementById('missingList');
  const suggestionsList = document.getElementById('suggestionsList');
  const downloadBtn = document.getElementById('downloadBtn');
  const matchedCount = document.getElementById('matchedCount');
  const missingCount = document.getElementById('missingCount');

  // Initialize
  init();

  function init() {
    const result = getStoredResult();
    
    if (!result) {
      showNoData();
    } else {
      showResults(result);
      setupDownloadButton();
    }

    addFadeInAnimations();
  }

  function addFadeInAnimations() {
    document.querySelectorAll('.fade-in-up').forEach((el, index) => {
      el.style.animationDelay = (index * 0.1) + 's';
    });
  }

  function getStoredResult() {
    try {
      const stored = localStorage.getItem('matchResult');
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Error parsing stored result:', err);
      return null;
    }
  }

  function showNoData() {
    if (noDataState) noDataState.style.display = 'flex';
    if (resultsState) resultsState.style.display = 'none';
  }

  function showResults(result) {
    if (noDataState) noDataState.style.display = 'none';
    if (resultsState) resultsState.style.display = 'block';

    // Update score
    const score = result.matchScore || 0;
    displayScore(score);

    // Update matched and missing counts
    const matchedSkills = result.matchedSkills || [];
    const missingSkills = result.missingSkills || [];
    
    if (matchedCount) matchedCount.textContent = matchedSkills.length;
    if (missingCount) missingCount.textContent = missingSkills.length;

    // Render lists
    renderList(matchedList, matchedSkills, false);
    renderList(missingList, missingSkills, true);
    renderList(suggestionsList, result.suggestions || [], false);
  }

  function displayScore(score) {
    if (scoreValue) {
      scoreValue.textContent = score + '%';
    }

    if (scoreTitle && scoreDescription) {
      let title = '';
      let description = '';
      let color = '';

      if (score >= 80) {
        title = 'Excellent Match!';
        description = 'Your resume is very well aligned with this job. You meet most of the requirements!';
        color = '#66f0a7';
      } else if (score >= 60) {
        title = 'Good Match';
        description = 'Your resume aligns well with this position. Consider addressing a few missing skills.';
        color = '#6dd5ff';
      } else if (score >= 40) {
        title = 'Moderate Match';
        description = 'Your resume matches some requirements. Focus on the missing skills before applying.';
        color = '#ffd700';
      } else {
        title = 'Fair Match';
        description = 'Your resume has limited alignment. Consider upskilling or finding more aligned roles.';
        color = '#ff7b5f';
      }

      scoreTitle.textContent = title;
      scoreTitle.style.color = color;
      scoreDescription.textContent = description;
    }
  }

  function renderList(container, items, isMissing = false) {
    if (!container) return;

    container.innerHTML = '';

    if (!items || items.length === 0) {
      const li = document.createElement('li');
      li.className = 'placeholder';
      li.textContent = isMissing ? 'No missing skills!' : 'None found';
      container.appendChild(li);
      return;
    }

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = isMissing ? 'missing' : '';
      
      if (isMissing) {
        li.innerHTML = `<span>✗</span> ${escapeHtml(item)}`;
      } else if (container.id === 'suggestionsList') {
        li.innerHTML = `<span>${index + 1}.</span> ${escapeHtml(item)}`;
      } else {
        li.innerHTML = `<span>✓</span> ${escapeHtml(item)}`;
      }
      
      container.appendChild(li);
    });
  }

  function setupDownloadButton() {
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', async () => {
      downloadBtn.disabled = true;
      downloadBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating PDF...';

      try {
        const res = await fetch('http://localhost:8080/api/analysisReport', {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf'
          }
        });

        if (!res.ok) {
          throw new Error('Failed to generate PDF');
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume-analysis-report.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        downloadBtn.innerHTML = '<span class="btn-icon">📥</span> Download PDF Report';
        downloadBtn.disabled = false;
      } catch (err) {
        console.error('Error downloading PDF:', err);
        alert('Failed to generate PDF. Make sure backend is running on http://localhost:8080');
        downloadBtn.innerHTML = '<span class="btn-icon">📥</span> Download PDF Report';
        downloadBtn.disabled = false;
      }
    });
  }

  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Add delete data button functionality (optional)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' && e.ctrlKey) {
      if (confirm('Clear all stored results?')) {
        localStorage.removeItem('matchResult');
        localStorage.removeItem('jobDescription');
        localStorage.removeItem('resumeFileName');
        location.reload();
      }
    }
  });
})();
