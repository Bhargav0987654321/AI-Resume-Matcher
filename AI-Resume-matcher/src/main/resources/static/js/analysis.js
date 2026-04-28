(() => {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('show'));

  const matchedList = document.getElementById('matchedList');
  const missingList = document.getElementById('missingList');
  const suggestionsList = document.getElementById('suggestionsList');
  const scoreLabel = document.getElementById('scoreLabel');
  const scoreValue = document.getElementById('scoreValue');

  const renderList = (el, items, missing = false) => {
    if (!el) return;
    el.innerHTML = '';
    
    if (!items || !items.length) {
      const li = document.createElement('li');
      li.textContent = missing ? 'All skills matched!' : 'None found';
      li.style.color = 'var(--muted)';
      el.appendChild(li);
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      if (missing) {
        li.style.color = 'var(--danger)';
        li.style.marginBottom = '8px';
      } else {
        li.style.color = 'var(--success)';
        li.style.marginBottom = '8px';
      }
      el.appendChild(li);
    });
  };

  // Get results from localStorage
  let result = null;
  try {
    result = JSON.parse(localStorage.getItem('matchResult'));
  } catch (e) {
    console.error('Error parsing result:', e);
    result = null;
  }

  // If no data, show empty state
  if (!result) {
    if (scoreLabel) {
      scoreLabel.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <div style="font-size: 48px; margin-bottom: 16px;">📊</div>
          <h3>No Analysis Yet</h3>
          <p style="color: var(--muted); margin-bottom: 16px;">Run an analysis from the Upload page to see results here</p>
          <a href="upload.html" class="button" style="display: inline-block;">Start Analysis</a>
        </div>
      `;
    }
    renderList(matchedList, []);
    renderList(missingList, []);
    renderList(suggestionsList, []);
    return;
  }

  // Update score display - FIXED template literal
  const matchScore = result.matchScore || 0;
  if (scoreLabel) {
    scoreLabel.textContent = `${matchScore}% Match`;
  }
  if (scoreValue) {
    scoreValue.textContent = `${matchScore}%`;
  }

  // Update score interpretation
  const scoreTitle = document.getElementById('scoreTitle');
  const scoreDescription = document.getElementById('scoreDescription');

  if (scoreTitle) {
    if (matchScore >= 80) {
      scoreTitle.textContent = '✓ Excellent Match!';
      scoreTitle.style.color = 'var(--success)';
    } else if (matchScore >= 60) {
      scoreTitle.textContent = '◐ Good Match';
      scoreTitle.style.color = 'var(--accent-2)';
    } else if (matchScore >= 40) {
      scoreTitle.textContent = '◑ Fair Match';
      scoreTitle.style.color = 'var(--accent)';
    } else {
      scoreTitle.textContent = '✗ Needs Work';
      scoreTitle.style.color = 'var(--danger)';
    }
  }

  if (scoreDescription) {
    const matched = (result.matchedSkills || []).length;
    const missing = (result.missingSkills || []).length;
    scoreDescription.textContent = `${matched} skills matched, ${missing} skills to develop`;
  }

  // Update badges
  const matchedCount = document.getElementById('matchedCount');
  const missingCount = document.getElementById('missingCount');

  if (matchedCount) {
    matchedCount.textContent = (result.matchedSkills || []).length;
  }
  if (missingCount) {
    missingCount.textContent = (result.missingSkills || []).length;
  }

  // Render lists
  renderList(matchedList, result.matchedSkills);
  renderList(missingList, result.missingSkills, true);
  renderList(suggestionsList, result.suggestions);

  // Download PDF Report
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      const getBackendUrl = () => {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
          return 'http://localhost:8080';
        }
        
        if (hostname.includes('onrender.com')) {
          return `${protocol}//${hostname}`;
        }
        
        return `${protocol}//${hostname}:8080`;
      };

      const resumeFileName = localStorage.getItem('resumeFileName') || 'candidate';
      
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Generating PDF...';

      try {
        const res = await fetch(`${getBackendUrl()}/api/analysisReport?name=${encodeURIComponent(resumeFileName)}`);
        
        if (!res.ok) {
          throw new Error('Failed to generate PDF');
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume-analysis-report.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        downloadBtn.textContent = '✓ Downloaded!';
        setTimeout(() => {
          downloadBtn.textContent = 'Download PDF Report';
          downloadBtn.disabled = false;
        }, 2000);

      } catch (err) {
        console.error('Download error:', err);
        downloadBtn.textContent = '❌ Failed - Backend not running';
        downloadBtn.disabled = false;
      }
    });
  }
})();
