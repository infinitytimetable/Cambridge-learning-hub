/* ===== Learner features (student builds only): greeting, practice timer ===== */
(function(){
if(typeof HUB==="undefined"||HUB.teacher)return;
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const SET=()=>HUBSET.get();
const fmt=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
const st=document.createElement("style");
st.textContent=`.greet{margin:0 0 14px;padding:12px 16px;border-radius:12px;background:var(--surface,#fff);border:1px solid var(--bluline,#8884)}
.greet b{font-size:1.25em}.greet form{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px}.greet input{padding:8px 10px;border-radius:8px;border:1px solid #8888;font:inherit;min-width:12em}
.greet .lnk{background:none;border:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit;opacity:.75;padding:0 0 0 6px}
#ptm{position:fixed;left:12px;bottom:12px;z-index:800;background:var(--surface,#fff);color:var(--ink,#111);border:2px solid var(--blu,#0a6c74);border-radius:14px;box-shadow:0 6px 24px #0003;padding:8px 12px;max-width:min(360px,calc(100vw - 24px));font:14px/1.3 system-ui,sans-serif}
#ptm .tt{display:flex;align-items:center;gap:8px;flex-wrap:wrap}#ptm .big{font:700 26px/1 ui-monospace,Consolas,monospace;min-width:3.6em}
#ptm.end{border-color:#d9482b;background:#fde7e2}#ptm.warn .big{color:#c2570c}#ptm .row2{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center}
#ptm button{cursor:pointer}#ptm input[type=number]{width:4.5em}#ptm .lbl{font-size:12px;opacity:.8}#ptm .res{font-size:13px;margin-top:4px}
.ptbtn{align-self:flex-end;width:auto;margin-left:8px;font-size:12px;padding:3px 9px;cursor:pointer}@media print{#ptm,.ptbtn,.greet{display:none!important}}`;
document.head.appendChild(st);

/* ---------- greeting ---------- */
function hello(){const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening"}
function greet(){
  const L=SET().learner||{};
  const hero=$(".hero");if(!hero||$(".greet",hero))return;
  if(L.greet===false&&L.name)return;
  const d=document.createElement("div");d.className="greet";
  if(L.name){d.innerHTML=`<b>${hello()}, ${esc(L.name)}!</b> <span class="meta">Ready to learn something new today?</span><button class="lnk" type="button">Change name</button>`;
    $(".lnk",d).onclick=()=>{L.name="";HUBSET.save();d.remove();greet()}}
  else{d.innerHTML=`<b>${hello()}!</b> <span class="meta">What should I call you?</span><form><input type="text" maxlength="30" placeholder="Your first name" aria-label="Your name" required><button class="btn pri" type="submit">Save my name</button><button class="btn" type="button" data-skip>Not now</button></form>`;
    $("form",d).onsubmit=e=>{e.preventDefault();const v=$("input",d).value.replace(/[<>]/g,"").trim().slice(0,30);if(!v)return;SET().learner.name=v;HUBSET.save();d.remove();greet()};
    $("[data-skip]",d).onclick=()=>{d.remove();try{sessionStorage.setItem("lrnskip","1")}catch(e){}}}
  if(!L.name){try{if(sessionStorage.getItem("lrnskip"))return}catch(e){}}
  hero.insertBefore(d,hero.firstChild);
}

/* ---------- practice timer ---------- */
const T={mode:"stopwatch",run:false,t0:0,acc:0,target:0,label:"",done:false,iv:0,min:0};
let box=null;
function mode(){const m=SET().ptimer.mode;return m==="ask"?T.mode:m}
function elapsed(){return T.acc+(T.run?(Date.now()-T.t0)/1000:0)}
function beep(){if(!SET().ptimer.beep)return;try{const c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(()=>{o.stop();c.close()},700)}catch(e){}}
function tick(){
  if(!box)return;
  const m=mode(),e=elapsed();let shown=e,cls="";
  if(m==="countdown"){const left=T.target-e;shown=Math.max(0,left);if(left<=0&&T.run){T.run=false;T.acc=T.target;T.done=true;clearInterval(T.iv);beep()}
    if(T.done)cls="end";else if(left<=60&&T.target>120)cls="warn"}
  box.className=cls;
  const big=$(".big",box);if(big)big.textContent=fmt(shown);
  const pb=$("#ptgo",box);if(pb)pb.textContent=T.run?"Pause":(e>0&&!T.done?"Resume":"Start");
  const rs=$(".res",box);
  if(rs){rs.textContent=T.done?(m==="countdown"?"Time is up. Check your answer against the mark scheme.":""):""}
}
function start(){if(T.run)return;if(mode()==="countdown"&&!T.target)T.target=Math.max(30,(T.min||5)*60);T.run=true;T.done=false;T.t0=Date.now();clearInterval(T.iv);T.iv=setInterval(tick,250);tick()}
function pause(){if(!T.run)return;T.acc=elapsed();T.run=false;clearInterval(T.iv);tick()}
function reset(){T.run=false;T.acc=0;T.done=false;clearInterval(T.iv);const rs=$(".res",box);if(rs)rs.textContent="";tick()}
function stopReport(){
  const e=elapsed();pause();
  const rs=$(".res",box);if(rs)rs.textContent=`You took ${fmt(e)}${T.target?" for "+(T.label||"this task")+" (suggested "+fmt(T.target)+")":""}.`;
}
function build(){
  if(box)return box;
  box=document.createElement("div");box.id="ptm";box.setAttribute("role","timer");
  box.innerHTML=`<div class="tt"><b>⏱ Practice timer</b><span class="big">0:00</span><button class="btn pri sm" id="ptgo" type="button">Start</button><button class="btn sm" id="ptstop" type="button">Stop</button><button class="btn sm" id="ptrst" type="button">Reset</button><button class="btn sm" id="ptmin" type="button" aria-label="Hide timer options" title="Hide or show options">▾</button></div>
<div id="ptopt"><div class="row2" id="ptmodes"><span class="lbl">Mode:</span><button class="btn sm" data-m="stopwatch" type="button">Stopwatch</button><button class="btn sm" data-m="countdown" type="button">Countdown</button></div>
<div class="row2" id="ptcd"><label class="lbl">Minutes <input type="number" id="ptm_min" min="1" max="180" value="5"></label><span class="lbl" id="ptlbl"></span></div><div class="res" aria-live="polite"></div></div>`;
  document.body.appendChild(box);
  $("#ptgo",box).onclick=()=>T.run?pause():start();
  $("#ptstop",box).onclick=stopReport;
  $("#ptrst",box).onclick=reset;
  $("#ptmin",box).onclick=()=>{const o=$("#ptopt",box);o.hidden=!o.hidden;$("#ptmin",box).textContent=o.hidden?"▴":"▾"};
  $$("[data-m]",box).forEach(b=>b.onclick=()=>{T.mode=b.dataset.m;reset();syncUI()});
  $("#ptm_min",box).onchange=e=>{T.min=Math.max(1,Math.min(180,+e.target.value||5));T.target=T.min*60;T.label="";syncUI();if(!T.run)reset()};
  syncUI();return box;
}
function syncUI(){
  if(!box)return;const m=mode(),lock=SET().ptimer.mode!=="ask";
  $("#ptmodes",box).style.display=lock?"none":"";
  $$("[data-m]",box).forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.m===m)));
  $("#ptcd",box).style.display=m==="countdown"?"":"none";
  $("#ptlbl",box).textContent=T.label;
  if(m==="countdown"&&!T.target){T.min=T.min||5;T.target=T.min*60}
  $("#ptm_min",box).value=Math.max(1,Math.round((T.target||T.min*60||300)/60*10)/10);
  tick();
}
function setFor(label,marks){
  build();const mpm=+SET().ptimer.mpm||1.2;
  pause();T.acc=0;T.done=false;T.label=label;T.target=Math.max(30,Math.round(marks*mpm*60));T.min=T.target/60;
  if(SET().ptimer.mode==="ask"&&!T.userPicked)T.mode=T.mode;
  syncUI();start();
}
function marksOf(el){
  if(el.dataset.total)return +el.dataset.total||1;
  const m=$(".marks",el);const n=m&&m.textContent.match(/\d+/);return n?+n[0]:3;
}
function decorate(){
  $$(".qcard:not([data-pt]),.pp:not([data-pt])").forEach(el=>{
    el.dataset.pt="1";
    const mk=marksOf(el),qn=$(".qn",el),name=qn?"Question "+qn.textContent.trim():"This question";
    const b=document.createElement("button");b.type="button";b.className="btn sm ptbtn";b.textContent="⏱ Time this";b.title=`${mk} mark${mk>1?"s":""}`;
    b.onclick=e=>{e.preventDefault();e.stopPropagation();setFor(`${name} (${mk} mark${mk>1?"s":""})`,mk)};
    const m=$(".marks",el);if(m&&m.parentNode)m.parentNode.insertBefore(b,m.nextSibling);else el.insertBefore(b,el.firstChild);
  });
}
function refresh(){
  const want=SET().ptimer.show&&$(".qcard,.pp,.q");
  if(!want){if(box)box.style.display="none";return}
  build();box.style.display="";decorate();
  $$(".ptbtn").forEach(b=>b.style.display="");
}
window.LRN={refresh};
let raf=0;
const mo=new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;try{greet();refresh()}catch(e){console.error(e)}})});
function init(){const a=$("#app");if(!a)return;mo.observe(a,{childList:true,subtree:true});greet();refresh()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
