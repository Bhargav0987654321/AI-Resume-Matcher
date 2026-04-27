(() => {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', initCharts);

  function initCharts() {
    const result = getStoredResult();
    if (result) {
      renderGaugeChart(result.matchScore);
      renderSkillRadarChart(result.matchedSkills, result.missingSkills);
    }
  }

  function getStoredResult() {
    try {
      const stored = localStorage.getItem('matchResult');
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Error parsing result:', err);
      return null;
    }
  }

  function renderGaugeChart(matchScore) {
    const ctx = document.getElementById('matchGauge');
    if (!ctx) return;

    // Determine colors based on score
    let startColor, endColor;
    if (matchScore >= 80) {
      startColor = '#66f0a7';
      endColor = '#00c851';
    } else if (matchScore >= 60) {
      startColor = '#6dd5ff';
      endColor = '#0099cc';
    } else if (matchScore >= 40) {
      startColor = '#ffd700';
      endColor = '#ffb700';
    } else {
      startColor = '#ff7b5f';
      endColor = '#ff5f6d';
    }

    // Create gradient
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Match', 'Gap'],
        datasets: [
          {
            data: [matchScore, 100 - matchScore],
            backgroundColor: [gradient, 'rgba(255, 255, 255, 0.08)'],
            borderColor: ['transparent', 'transparent'],
            borderWidth: 0,
            borderRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: startColor,
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  function renderSkillRadarChart(matchedSkills, missingSkills) {
    const ctx = document.getElementById('skillRadar');
    if (!ctx) return;

    // Prepare data
    const matched = matchedSkills || [];
    const missing = missingSkills || [];

    // Get top skills
    const topMatched = matched.slice(0, 6);
    const topMissing = missing.slice(0, 6);

    // Create labels
    const allLabels = [...topMatched, ...topMissing];
    const uniqueLabels = [...new Set(allLabels)];

    // Create datasets
    const matchedData = uniqueLabels.map(label => topMatched.includes(label) ? 1 : 0);
    const missingData = uniqueLabels.map(label => topMissing.includes(label) ? 1 : 0);

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: uniqueLabels.length > 0 ? uniqueLabels : ['No skills'],
        datasets: [
          {
            label: 'Matched',
            data: matchedData,
            borderColor: '#66f0a7',
            backgroundColor: 'rgba(102, 240, 167, 0.15)',
            pointBackgroundColor: '#66f0a7',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#66f0a7',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Missing',
            data: missingData,
            borderColor: '#ff5f6d',
            backgroundColor: 'rgba(255, 95, 109, 0.15)',
            pointBackgroundColor: '#ff5f6d',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff5f6d',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#e0e0e0',
              font: {
                size: 13,
                weight: '600'
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#6dd5ff',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + (context.parsed.r === 1 ? '✓ Match' : '✗ Missing');
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 1,
            ticks: {
              display: false,
              stepSize: 0.5
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            },
            pointLabels: {
              color: '#b0b0b0',
              font: {
                size: 12,
                weight: '600'
              },
              padding: 10
            }
          }
        }
      }
    });
  }

  // Also initialize on window load for fallback
  window.addEventListener('load', () => {
    // Give slight delay to ensure elements are rendered
    setTimeout(initCharts, 100);
  });
})();
