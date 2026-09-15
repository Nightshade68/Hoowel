const screen = document.querySelector('#screen');
const navButtons = [...document.querySelectorAll('.nav button')];

const state = {
  page: 'home',
  running: false,
  miles: 0,
  seconds: 0,
  hr: 149,
  cadence: 82,
  battery: 82,
  lastRun: { miles: 10.01, pace: '8:02', hr: 149 },
  workout: { name: 'Easy Run', minutes: 35, rpe: '3–4' },
};

function timeText(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function clockText() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function dateText() {
  return new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
}

function paceText() {
  if (state.miles <= 0 || state.seconds <= 0) return '--:--';
  const pace = state.seconds / 60 / state.miles;
  return `${Math.floor(pace)}:${String(Math.round((pace % 1) * 60)).padStart(2, '0')}`;
}

function common() {
  return `<div class="top"><span class="brand">STRIDE<span>AI</span></span><span class="battery">${state.battery}%</span></div>`;
}

function render() {
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.page === state.page));

  if (state.page === 'home') {
    screen.innerHTML = `${common()}
      <div class="home-clock">${clockText()}</div>
      <div class="date">${dateText()}</div>
      <div class="hero-card">
        <div><small>READY</small><strong>RUN</strong></div>
        <div class="mini"><span>LAST PACE</span><b>${state.lastRun.pace}</b><em>/mi</em></div>
      </div>
      <button class="primary" data-action="start">START RUN</button>
      <div class="hint">GPS + heart rate will appear when connected</div>`;
  } else if (state.page === 'run') {
    screen.innerHTML = `${common()}
      <div class="run-header"><span class="live-dot"></span>${state.running ? 'LIVE RUN' : 'RUN PAUSED'}</div>
      <div class="distance">${state.miles.toFixed(2)}</div>
      <div class="unit">MILES</div>
      <div class="metric-grid">
        <div><span>PACE</span><b>${paceText()}</b><small>/mi</small></div>
        <div><span>HEART RATE</span><b>${state.hr}</b><small>bpm</small></div>
        <div><span>CADENCE</span><b>${state.cadence}</b><small>spm</small></div>
        <div><span>TIME</span><b>${timeText(state.seconds)}</b><small>elapsed</small></div>
      </div>
      <div class="run-controls">
        <button class="secondary" data-action="toggle">${state.running ? 'PAUSE' : 'RESUME'}</button>
        <button class="primary" data-action="finish">END RUN</button>
      </div>`;
  } else if (state.page === 'workout') {
    screen.innerHTML = `${common()}
      <div class="eyebrow">TODAY'S WORKOUT</div>
      <h1>${state.workout.name}</h1>
      <div class="workout-meta"><strong>${state.workout.minutes}</strong><span>MIN</span><strong>RPE ${state.workout.rpe}</strong></div>
      <div class="coach-card"><b>STRIDEAI COACH</b><p>Keep this conversational. Today's goal is controlled aerobic work—not a race.</p></div>
      <button class="primary" data-action="start">START WORKOUT</button>
      <div class="hint">Starting this workout does not schedule anything.</div>`;
  } else {
    screen.innerHTML = `${common()}
      <div class="eyebrow">STRIDEAI COACH</div>
      <div class="coach-title">Stay<br/>controlled.</div>
      <div class="coach-card strong"><b>TRAINING SIGNAL</b><p>Keep the effort easy and consistent. Detailed training analysis stays in the StrideAI phone app.</p></div>
      <div class="coach-stats"><span>7D LOAD</span><b>READY</b></div>
      <button class="secondary" data-action="phone">OPEN ON PHONE</button>`;
  }
}

function startRun() {
  state.running = true;
  state.page = 'run';
  if (state.seconds === 0) state.miles = 0;
  render();
}

function finishRun() {
  state.running = false;
  if (state.miles > 0) {
    state.lastRun = { miles: state.miles, pace: paceText(), hr: state.hr };
  }
  state.page = 'home';
  render();
}

screen.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'start') startRun();
  if (action === 'toggle') { state.running = !state.running; render(); }
  if (action === 'finish') finishRun();
  if (action === 'phone') alert('Phone handoff is reserved for the StrideAI BLE protocol.');
});

navButtons.forEach(button => button.addEventListener('click', () => {
  state.page = button.dataset.page;
  render();
}));

setInterval(() => {
  if (state.running) {
    state.seconds += 1;
    // Prototype simulation only. Real firmware will replace this with GNSS/phone distance and sensor data.
    state.miles += 0.00208;
    state.hr = 146 + Math.round(Math.sin(state.seconds / 11) * 5);
    state.cadence = 80 + Math.round(Math.sin(state.seconds / 8) * 3);
    if (state.battery > 5 && state.seconds % 90 === 0) state.battery -= 1;
  }
  if (state.page === 'home' || state.page === 'run') render();
}, 1000);

render();
