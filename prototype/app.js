const screen = document.querySelector('#screen');
const navButtons = [...document.querySelectorAll('.nav button')];

const state = {
  page: 'home',
  running: false,
  miles: 0,
  seconds: 0,
  hr: 149,
  battery: 82,
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
  if (!state.running || state.miles <= 0) return '--:--';
  const pace = state.seconds / 60 / state.miles;
  return `${Math.floor(pace)}:${String(Math.round((pace % 1) * 60)).padStart(2, '0')}`;
}

function render() {
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.page === state.page));
  const common = `<div class="top"><span class="brand">STRIDE<span>AI</span></span><span class="battery">${state.battery}%</span></div>`;

  if (state.page === 'home') {
    screen.innerHTML = `${common}
      <div class="home-clock">${clockText()}</div>
      <div class="date">${dateText()}</div>
      <div class="hero-card">
        <div><small>READY</small><strong>RUN</strong></div>
        <div class="mini"><span>LAST PACE</span><b>8:02</b><em>/mi</em></div>
      </div>
      <button class="primary" data-action="start">${state.running ? 'RESUME RUN' : 'START RUN'}</button>
      <div class="hint">Tap RUN for live metrics</div>`;
  } else if (state.page === 'run') {
    screen.innerHTML = `${common}
      <div class="run-header"><span class="live-dot"></span>${state.running ? 'LIVE RUN' : 'RUN READY'}</div>
      <div class="distance">${state.miles.toFixed(2)}</div>
      <div class="unit">MILES</div>
      <div class="metric-grid">
        <div><span>PACE</span><b>${paceText()}</b><small>/mi</small></div>
        <div><span>HEART RATE</span><b>${state.hr}</b><small>bpm</small></div>
      </div>
      <div class="run-controls">
        <button class="secondary" data-action="toggle">${state.running ? 'PAUSE' : 'RESUME'}</button>
        <button class="primary" data-action="finish">END RUN</button>
      </div>
      <div class="elapsed">${timeText(state.seconds)}</div>`;
  } else if (state.page === 'workout') {
    screen.innerHTML = `${common}
      <div class="eyebrow">TODAY'S WORKOUT</div>
      <h1>Easy Run</h1>
      <div class="workout-meta"><strong>35</strong><span>MIN</span><strong>RPE 3–4</strong></div>
      <div class="coach-card"><b>STRIDEAI COACH</b><p>Keep this conversational. Today's goal is controlled aerobic work—not a race.</p></div>
      <button class="primary" data-action="start">START WORKOUT</button>`;
  } else {
    screen.innerHTML = `${common}
      <div class="eyebrow">STRIDEAI COACH</div>
      <div class="coach-title">Stay<br/>controlled.</div>
      <div class="coach-card strong"><b>TRAINING SIGNAL</b><p>Your watch should keep the message short and useful. Detailed analysis stays in the StrideAI phone app.</p></div>
      <button class="secondary" data-action="phone">OPEN ON PHONE</button>`;
  }
}

function startRun() {
  state.running = true;
  state.page = 'run';
  render();
}

function finishRun() {
  state.running = false;
  state.page = 'home';
  render();
}

screen.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'start') startRun();
  if (action === 'toggle') state.running = !state.running;
  if (action === 'finish') finishRun();
  if (action === 'phone') alert('Phone handoff placeholder — BLE protocol will connect here.');
  render();
});

navButtons.forEach(button => button.addEventListener('click', () => {
  state.page = button.dataset.page;
  render();
}));

setInterval(() => {
  if (state.running) {
    state.seconds += 1;
    state.miles += 0.00208; // prototype only; real distance will come from watch/phone sensors
    state.hr = 146 + Math.round(Math.sin(state.seconds / 11) * 5);
  }
  if (state.page === 'home' || state.page === 'run') render();
}, 1000);

render();
