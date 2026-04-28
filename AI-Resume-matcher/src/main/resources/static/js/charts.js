(() => {
  let resultData = null;
  try {
    resultData = JSON.parse(localStorage.getItem('matchResult'));
  } catch (e) {
    console.error('Error parsing result data:', e);
    resultData = null;
  }

  if (!resultData) {
    console.log('No result data found - skipping charts');
    return;
  }

  // Wait for Chart.js to be loaded
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
    return;
  }

  // Match Score Gauge Chart
  const matchGaugeCtx = document.getElementById('matchGauge');
  if (matchGaugeCtx) {
    try {
      new Chart(matchGaugeCtx, {
        type: 'doughnut',
        data: {
          labels: ['Match', 'Gap'],
          datasets: [{
            data: [resultData.matchScore || 0, 100 - (resultData.matchScore || 0)],
            backgroundColor: ['#ff7b5f', '#1b2236'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false }
          },
          cutout: '70%'
        }
      });
    } catch (err) {
      console.error('Error rendering match gauge:', err);
    }
  }

  // Skill Radar Chart
  const skillRadarCtx = document.getElementById('skillRadar');
  if (skillRadarCtx) {
    try {
      const allSkills = [
        ...(resultData.matchedSkills || []),
        ...(resultData.missingSkills || [])
      ];
      
      const labels = allSkills.slice(0, 8); // Limit to 8 skills for readability
      const values = labels.map(label => 
        (resultData.matchedSkills || []).includes(label) ? 80 : 30
      );

      new Chart(skillRadarCtx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Skill Readiness',
            data: values,
            backgroundColor: 'rgba(255, 123, 95, 0.2)',
            borderColor: '#ff7b5f',
            borderWidth: 2,
            pointBackgroundColor: '#ff7b5f',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            r: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: function(value) {
                  return value + '%';
                }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    } catch (err) {
      console.error('Error rendering skill radar:', err);
    }
  }
})();
