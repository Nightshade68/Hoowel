const screen=document.querySelector('#screen');
const clock=document.querySelector('#clock');
const date=document.querySelector('#date');
const runButton=document.querySelector('#run');

function tick(){
  const now=new Date();
  clock.textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',hour12:false});
  date.textContent=now.toLocaleDateString([], {weekday:'short',month:'short',day:'numeric'}).toUpperCase();
}
setInterval(tick,1000);tick();

function render(page){
  if(page==='home'){
    screen.innerHTML='<div class="status"><span>StrideAI</span><span>82%</span></div><div class="clock">'+clock.textContent+'</div><div class="date">'+date.textContent+'</div><div class="cards"><div class="card"><span>RUN</span><strong>8:02</strong><small>/mi</small></div><div class="card"><span>HR</span><strong>149</strong><small>bpm</small></div></div><button class="run" id="run">START RUN</button>';
  }else if(page==='run'){
    screen.innerHTML='<div class="status"><span>RUNNING</span><span>82%</span></div><div class="metric">0.00</div><div class="label">MILES</div><div class="cards"><div class="card"><span>PACE</span><strong>--:--</strong><small>/mi</small></div><div class="card"><span>HR</span><strong>--</strong><small>bpm</small></div></div><button class="run" id="run">END RUN</button>';
  }else if(page==='workout'){
    screen.innerHTML='<div class="status"><span>TODAY</span><span>WORKOUT</span></div><div class="metric">EASY RUN</div><div class="label">35 MIN · CONVERSATIONAL</div><div class="coach"><b>STRIDEAI COACH</b>Keep this relaxed. The goal today is controlled aerobic work.</div><button class="run">VIEW STEPS</button>';
  }else{
    screen.innerHTML='<div class="status"><span>STRIDEAI</span><span>COACH</span></div><div class="coach"><b>COACH</b>You are building consistently. Stay controlled today and let your training history guide the next step.</div><button class="run">OPEN ON PHONE</button>';
  }
}

document.querySelectorAll('.nav button').forEach(button=>button.addEventListener('click',()=>render(button.dataset.page)));
runButton?.addEventListener('click',()=>render('run'));
