(() => {
  let resultData = null;
  try { resultData = JSON.parse(localStorage.getItem('matchResult')); } catch (e) { resultData = null; }
  if (!resultData) return;

  const matchGaugeCtx = document.getElementById('matchGauge');
  const skillRadarCtx = document.getElementById('skillRadar');

  if (matchGaugeCtx && window.Chart) {
    new Chart(matchGaugeCtx, {
      type: 'doughnut',
      data: { labels:['Match','Gap'], datasets:[{ data:[resultData.matchScore, 100 - resultData.matchScore], backgroundColor:['#ff7b5f','#1b2236'], borderWidth:0 }]},
      options: { plugins:{ legend:{display:false}}, cutout:'70%' }
    });
  }

  if (skillRadarCtx && window.Chart) {
    const labels = [...(resultData.matchedSkills||[]), ...(resultData.missingSkills||[])].slice(0,6);
    const values = labels.map(l => (resultData.matchedSkills||[]).includes(l) ? 80 : 30);
    new Chart(skillRadarCtx, {
      type: 'radar',
      data: { labels, datasets:[{ label:'Skill readiness', data: values, backgroundColor:'rgba(255,123,95,0.2)', borderColor:'#ff7b5f' }]},
      options: { scales:{ r:{ suggestedMin:0, suggestedMax:100, grid:{ color:'rgba(255,255,255,0.1)' } } }, plugins:{ legend:{display:false} } }
    });
  }
})();
