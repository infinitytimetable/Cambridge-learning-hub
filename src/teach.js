/* teach.js - Teaching Mode: classes, timetable, lesson check, learner picker, groups, coverage report, differentiation, reminders helper link, calendar export */
(function(){
if(typeof HUB==="undefined"||!HUB.teacher)return;
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const uid=()=>Math.random().toString(36).slice(2,9);
const KEY="hubteach.v1";
const DAYS=["","Monday","Tuesday","Wednesday","Thursday","Friday"];
const PERIODS=[["wu","Warm up","07:10","07:20","x"],["mt","Mentoring","07:20","07:40","x"],["1","Period 1","07:40","08:20","p"],["2","Period 2","08:20","09:00","p"],["3","Period 3","09:00","09:40","p"],["br","Break","09:40","10:00","x"],["4","Period 4","10:00","10:40","p"],["5","Period 5","10:40","11:20","p"],["6","Period 6","11:20","12:00","p"],["7","Period 7","12:00","12:40","p"],["lu","Lunch","12:40","14:00","x"],["8","Period 8","14:00","15:00","p"]].map(a=>({id:a[0],name:a[1],s:a[2],e:a[3],t:a[4]}));
const CLASSES=[["al","A Level Biology","alevel","A2"],["as","AS Level Biology","alevel","AS"],["b2a","IGCSE 2A Biology","bio",""],["b2c","IGCSE 2C Biology","bio",""],["c1a","IGCSE 1A Chemistry","chem",""],["c1b","IGCSE 1B Chemistry","chem",""],["c1c","IGCSE 1C Chemistry","chem",""]].map(a=>({id:a[0],name:a[1],subj:a[2],level:a[3],learners:[]}));
const TT=[[1,3,3,["al"]],[1,4,5,["as"]],[1,6,7,["c1a"]],[1,8,8,["c1b","c1c"]],[2,1,2,["c1b","c1c"]],[2,3,3,["b2a","b2c"]],[2,5,6,["as"]],[2,7,7,["al"]],[3,1,1,["as"]],[3,2,3,["b2a","b2c"]],[3,4,5,["c1a"]],[3,6,7,["al"]],[4,1,2,["c1b","c1c"]],[4,3,3,["as"]],[4,4,5,["b2a","b2c"]],[5,1,2,["al"]],[5,3,3,["c1a"]],[5,4,4,["as"]]].map(a=>({id:uid(),day:a[0],from:a[1],to:a[2],cls:a[3]}));
const DEF={on:false,periods:PERIODS,classes:CLASSES,tt:TT,remind:[10,2],remindOn:true,cal:{from:"",to:""},sessions:[],active:null};
let T;
try{T=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){T=null}
if(!T)T=JSON.parse(JSON.stringify(DEF));
for(const k in DEF)if(T[k]===undefined)T[k]=JSON.parse(JSON.stringify(DEF[k]));
function save(){try{localStorage.setItem(KEY,JSON.stringify(T))}catch(e){}}
window.HUBTEACH={get:()=>T,save};
const SUBN={chem:"Chemistry",bio:"Biology",alevel:"Biology (AS and A Level)"};
const hashKey=()=>{const h=(location.hash||"").replace(/^#\/?/,"").split("/");return h};
function curSubj(){const h=hashKey()[0];if(/^(chem|bio|alevel)$/.test(h))return h;const l=($(".logo .cell small")||{}).textContent||"";return l==="0620"?"chem":l==="0610"?"bio":l==="9700"?"alevel":""}
function curLessonKey(){const m=(hashKey()[1]||"").match(/^l(\d+)-(\d+)$/);return m?{u:+m[1],l:+m[2]}:null}
function lessonObj(sk,k){try{const S=SUBJ[sk];const u=S.units.find(x=>+x.n===k.u);return u&&u.lessons[k.l-1]?{l:u.lessons[k.l-1],u}:null}catch(e){return null}}
const P=n=>T.periods.find(p=>p.id===String(n));
const toM=s=>{const a=String(s).split(":");return +a[0]*60+(+a[1]||0)};
const fmtT=m=>String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
function entryTimes(e){const a=P(e.from),b=P(e.to);return a&&b?[toM(a.s),toM(b.e)]:[0,0]}
const cname=id=>(T.classes.find(c=>c.id===id)||{name:id}).name;
const entrySubj=e=>{const c=T.classes.find(x=>x.id===e.cls[0]);return c?c.subj:""};
const entryLabel=e=>e.cls.map(cname).join(" + ");
function dlFile(name,data,type){const b=new Blob([data],{type:type||"text/plain"});if(window.HUBSAVE&&HUBSAVE.save){HUBSAVE.save(name,b).then(ok=>{if(!ok)dl()}).catch(dl);return}dl();function dl(){const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(a.href)},1500)}}
function suggest(sk){
  const d=new Date(),day=d.getDay(),now=d.getHours()*60+d.getMinutes();
  let best=null,bd=1e9;
  T.tt.forEach(e=>{if(e.day!==day)return;if(sk&&entrySubj(e)!==sk)return;const[s,en]=entryTimes(e);if(now>=s-20&&now<=en){const dd=Math.abs(now-s);if(dd<bd){bd=dd;best=e}}});
  return best;
}
/* ---------- modal helper ---------- */
function modal(html,cls){const o=document.createElement("div");o.className="tch-ov";o.setAttribute("role","dialog");o.innerHTML=`<div class="tch-card ${cls||""}">${html}</div>`;document.body.appendChild(o);o.addEventListener("keydown",e=>{if(e.key==="Escape")o.remove()});o.close=()=>o.remove();return o}
/* ---------- Teaching mode toggle + header buttons ---------- */
function mountButtons(){
  const anchor=$("#setbtn")||$("#pjbtn");if(!anchor||$("#tmbtn"))return;
  const mk=(id,txt)=>{const b=document.createElement("button");b.id=id;b.type="button";b.className="theme dsp-btn";b.textContent=txt;return b};
  const tm=mk("tmbtn","");tm.onclick=()=>{T.on=!T.on;save();applyMode();if(T.on)lessonBar()};
  const tt=mk("ttbtn","Classes and reports");tt.onclick=()=>panel();
  anchor.parentNode.insertBefore(tt,anchor.nextSibling);anchor.parentNode.insertBefore(tm,anchor.nextSibling);
  applyMode();
}
function applyMode(){
  document.body.classList.toggle("teach-on",!!T.on);
  const b=$("#tmbtn");if(b){b.textContent="Teaching Mode: "+(T.on?"ON":"OFF");b.setAttribute("aria-pressed",String(!!T.on));b.classList.toggle("tm-on",!!T.on)}
  if(!T.on){const x=$("#tchbar");if(x)x.remove()}
}
/* ---------- lesson bar ---------- */
let asked="";
function lessonBar(){
  if(!T.on)return;
  const sk=curSubj(),k=curLessonKey(),old=$("#tchbar");
  if(!k||!$(".deck-hero")){if(old)old.remove();return}
  const key=sk+"/"+k.u+"-"+k.l;
  if(T.active&&T.active.cls){
    const A=T.active,names=A.cls.map(cname).join(" + ");
    const h=`<div class="tch-in"><b>Teaching Mode</b><span class="tch-cls">${esc(names)}</span>${A.mins?`<span class="meta">${A.label||""} · ${A.mins} min</span>`:""}<span class="tch-sp"></span><button class="btn" type="button" id="tpick">Pick a learner</button><button class="btn" type="button" id="tgrp">Make groups</button><button class="btn pri" type="button" id="tend">End lesson and check learners</button><button class="btn" type="button" id="tcancel" title="Forget this class for now">✕</button></div>`;
    mountBar(h);
    $("#tpick").onclick=()=>picker(A.cls);$("#tgrp").onclick=()=>groups(A.cls);$("#tend").onclick=()=>endLesson(sk,k);$("#tcancel").onclick=()=>{T.active=null;save();lessonBar()};
    return;
  }
  const h=`<div class="tch-in"><b>Teaching Mode</b><span class="meta">No class chosen for this lesson.</span><span class="tch-sp"></span><button class="btn pri" type="button" id="tstart">Choose class and start</button></div>`;
  mountBar(h);$("#tstart").onclick=()=>chooseClass(sk,k);
  if(asked!==key){asked=key;setTimeout(()=>{if(T.on&&!T.active&&curLessonKey()&&!$(".tch-ov"))chooseClass(sk,k)},350)}
}
function mountBar(h){let b=$("#tchbar");const host=$("#app");if(!b){b=document.createElement("div");b.id="tchbar";b.className="tch-bar";host.insertBefore(b,host.firstChild)}else if(b.parentNode!==host)host.insertBefore(b,host.firstChild);b.innerHTML=h}
function chooseClass(sk,k){
  const cl=T.classes.filter(c=>c.subj===sk);
  if(!cl.length){modal(`<h2>No classes for ${esc(SUBN[sk]||"this subject")}</h2><p>Add your classes first under <b>Classes and reports</b>.</p><div class="tch-act"><button class="btn pri" id="x">Open Classes and reports</button><button class="btn" id="c">Close</button></div>`).querySelector("#c").onclick=function(){this.closest(".tch-ov").remove()};$("#x").onclick=function(){this.closest(".tch-ov").remove();panel()};return}
  const sg=suggest(sk),pre=sg?sg.cls:[];
  const o=modal(`<h2>Which class are you teaching?</h2>${sg?`<p class="meta">Your timetable says <b>${esc(entryLabel(sg))}</b> (${DAYS[sg.day]} ${esc((P(sg.from)||{}).name)}${sg.to!==sg.from?" to "+esc((P(sg.to)||{}).name):""}).</p>`:`<p class="meta">Tick the class or classes in front of you.</p>`}<div class="tch-list">${cl.map(c=>`<label><input type="checkbox" value="${c.id}"${pre.includes(c.id)?" checked":""}> ${esc(c.name)} <span class="meta">${c.learners.length} learners</span></label>`).join("")}</div><div class="tch-act"><button class="btn pri" id="go">Start teaching</button><button class="btn" id="no">Just browsing</button></div>`);
  $("#go",o).onclick=()=>{const ids=$$("input:checked",o).map(i=>i.value);if(!ids.length)return;const mins=sg?(entryTimes(sg)[1]-entryTimes(sg)[0]):0;T.active={cls:ids,start:Date.now(),mins,label:sg?DAYS[sg.day]+" "+(P(sg.from)||{}).name:""};save();if(mins&&window.HUBSET){try{HUBSET.get().timer.period=mins}catch(e){}}o.close();lessonBar();startClock(sg,ids)};
  $("#no",o).onclick=()=>o.close();
}
/* lesson clock follows the timetable: counts down to the end of the period */
function startClock(sg,ids){if(!window.HUBTIMER)return;const lab=ids.map(cname).join(" + ");
  if(sg){const [a,b]=entryTimes(sg),d=new Date(),now=d.getHours()*60+d.getMinutes()+d.getSeconds()/60;let secs=(b-now)*60;
    if(secs>0&&now>=a-15&&secs<=(b-a+15)*60){HUBTIMER.lesson(secs,(P(sg.from)||{}).name+" · "+lab,fmtT(b));return}
    HUBTIMER.lesson((b-a)*60,lab,"");return}
  const m=(window.HUBSET&&HUBSET.get().timer.period)||40;HUBTIMER.lesson(m*60,lab,"")}
window.HUBTEACH={active:()=>T.on&&T.active?T.active:null,classes:()=>T.classes.map(c=>({id:c.id,name:c.name,subj:c.subj,n:c.learners.length,group:c.group||4})),learners:ids=>learnersOf(ids),end:()=>{const sk=curSubj(),k=curLessonKey();if(!T.on||!k)return false;if(!T.active){chooseClass(sk,k);return true}endLesson(sk,k);return true}};
/* ---------- learners helpers ---------- */
function learnersOf(ids){const out=[];ids.forEach(id=>{const c=T.classes.find(x=>x.id===id);if(c)c.learners.forEach(l=>out.push({id:l.id,name:l.name,cls:c.name}))});return out}
function lastRag(id,sk){for(let i=T.sessions.length-1;i>=0;i--){const s=T.sessions[i];if(s.subj===sk&&s.marks&&s.marks[id]&&s.marks[id]!=="x")return s.marks[id]}return ""}
let pickPool={},absent={};
function picker(ids){
  const L=learnersOf(ids);if(!L.length){modal(`<h2>No learners yet</h2><p>Add names under <b>Classes and reports</b>.</p><div class="tch-act"><button class="btn" id="c">Close</button></div>`).querySelector("#c").onclick=function(){this.closest(".tch-ov").remove()};return}
  const pk=ids.join(",");pickPool[pk]=pickPool[pk]||[];
  const o=modal(`<h2>Pick a learner</h2><div class="tch-pick" id="pn" aria-live="polite">Press Pick</div><p class="meta" id="pm"></p><div class="tch-act"><button class="btn pri" id="pp">Pick</button><button class="btn" id="pj">Project</button><button class="btn" id="ab">Absent list</button><button class="btn" id="px">Close</button></div><div id="pa" class="tch-list" hidden></div>`,"wide");
  let last="";
  const avail=()=>L.filter(l=>!absent[l.id]&&!pickPool[pk].includes(l.id));
  const upd=()=>{$("#pm",o).textContent=`${pickPool[pk].length} picked, ${avail().length} left in this round`};
  $("#pp",o).onclick=()=>{let a=avail();if(!a.length){pickPool[pk]=[];a=avail()}if(!a.length)return;
    let n=0;const t=setInterval(()=>{$("#pn",o).textContent=L[Math.floor(Math.random()*L.length)].name;if(++n>12){clearInterval(t);const w=a[Math.floor(Math.random()*a.length)];last=w.name;pickPool[pk].push(w.id);$("#pn",o).textContent=w.name;upd()}},70)};
  $("#pj",o).onclick=()=>{if(window.PROJ)PROJ.showHTML(`<div style="display:grid;place-items:center;min-height:70vh;text-align:center"><div style="font-size:min(14vw,160px);font-weight:800">${esc(last||"?")}</div></div>`)};
  $("#ab",o).onclick=()=>{const p=$("#pa",o);p.hidden=!p.hidden;p.innerHTML=L.map(l=>`<label><input type="checkbox" value="${l.id}"${absent[l.id]?" checked":""}> ${esc(l.name)}</label>`).join("");$$("input",p).forEach(i=>i.onchange=()=>{absent[i.value]=i.checked;upd()})};
  $("#px",o).onclick=()=>o.close();upd();
}
function groups(ids){
  const L=learnersOf(ids);if(!L.length){modal(`<h2>No learners yet</h2><p>Add names under <b>Classes and reports</b>.</p><div class="tch-act"><button class="btn" id="c">Close</button></div>`).querySelector("#c").onclick=function(){this.closest(".tch-ov").remove()};return}
  const sk=curSubj();
  const o=modal(`<h2>Make groups</h2><div class="tch-form"><label>Number of groups <input type="number" id="gn" min="2" max="12" value="${Math.max(2,Math.round(L.length/4))}"></label><label>How to group <select id="gm"><option value="mix">Mixed ability (spread red, amber, green)</option><option value="same">Similar ability together</option><option value="rand">Random</option></select></label><label class="chk"><input type="checkbox" id="gx" checked> Leave out learners marked absent in the picker</label></div><div class="tch-act"><button class="btn pri" id="gg">Make groups</button><button class="btn" id="gp">Project</button><button class="btn" id="gc">Close</button></div><div id="gr" class="tch-groups"></div>`,"wide");
  let cur=[];
  const draw=()=>{$("#gr",o).innerHTML=cur.map((g,i)=>`<div class="tch-g"><h3>Group ${i+1}</h3><ul>${g.map(l=>`<li>${esc(l.name)}${l.r?` <span class="rag ${l.r}"></span>`:""}</li>`).join("")}</ul></div>`).join("")};
  const rank={r:0,a:1,g:2,"":1};
  $("#gg",o).onclick=()=>{
    let a=L.filter(l=>!($("#gx",o).checked&&absent[l.id])).map(l=>({...l,r:lastRag(l.id,sk)}));
    const n=Math.max(2,Math.min(12,+$("#gn",o).value||2)),m=$("#gm",o).value;
    a.sort(()=>Math.random()-.5);
    if(m==="mix"||m==="same")a.sort((x,y)=>rank[x.r]-rank[y.r]);
    cur=Array.from({length:n},()=>[]);
    if(m==="same"){const per=Math.ceil(a.length/n);a.forEach((l,i)=>cur[Math.min(n-1,Math.floor(i/per))].push(l))}
    else if(m==="mix"){a.forEach((l,i)=>{const r=Math.floor(i/n),c=r%2?n-1-(i%n):i%n;cur[c].push(l)})}
    else a.forEach((l,i)=>cur[i%n].push(l));
    draw()};
  $("#gp",o).onclick=()=>{if(window.PROJ)PROJ.showHTML(`<div style="padding:20px"><h1 style="text-align:center">Groups</h1><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px">${cur.map((g,i)=>`<div style="border:3px solid currentColor;border-radius:14px;padding:12px 18px"><h2 style="margin:0 0 6px">Group ${i+1}</h2>${g.map(l=>`<div style="font-size:1.3em">${esc(l.name)}</div>`).join("")}</div>`).join("")}</div></div>`)};
  $("#gc",o).onclick=()=>o.close();
}
/* ---------- end of lesson ---------- */
function objectivesFor(sk,k){const M=(typeof SYL!=="undefined"&&SYL[sk])||{};const list=M[k.u+"."+k.l]||[];const txt={};((typeof OBJ!=="undefined"&&OBJ[sk])||[]).forEach(t=>t.subs.forEach(s=>s.obj.forEach(o=>{txt[o[0]]=o[1]})));return list.map(o=>({ref:o[0],text:o[1]||txt[o[0]]||""}))}
const KEYHTML=`<div class="x4key"><div><span class="x4sw g"></span><span><b>Green:</b> I understand and can explain it to someone else.</span></div><div><span class="x4sw a"></span><span><b>Amber:</b> I partly understand or need some help.</span></div><div><span class="x4sw r"></span><span><b>Red:</b> I don't understand this yet.</span></div><div><span class="x4sw x"></span><span><b>Grey:</b> Absent.</span></div></div>`;
/* projected board: name tiles, key and today's objectives; learners tap their name then a colour; synced with the teacher's list */
function boardView(L,marks,obs,title,onChange){
  let showCol=true,picked=null,on=false;
  const html=()=>{const c={g:0,a:0,r:0,x:0};L.forEach(l=>{const m=marks[l.id];if(c[m]!=null)c[m]++});const left=L.filter(l=>!marks[l.id]).length;
    return `<div class="x4board"><div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><h3>How well did you understand today’s lesson?</h3><div class="x4seg" role="group" aria-label="Board shows"><button type="button" data-bv="c" aria-pressed="${showCol}">Show colours</button><button type="button" data-bv="t" aria-pressed="${!showCol}">Ticks and totals</button></div></div>
<p class="obj">${esc(title)}${obs.length?" · Today: "+obs.slice(0,4).map(b=>esc(b.text||b.ref)).join(" · "):""}</p>
<div class="bk"><span><span class="x4sw g"></span>Green: I understand and can explain it to someone else</span><span><span class="x4sw a"></span>Amber: I partly understand or need some help</span><span><span class="x4sw r"></span>Red: I don't understand this yet</span></div>
<div class="x4tiles">${L.map(l=>{const m=marks[l.id];const cls=m==="x"?"c-x":showCol&&m?"c-"+m:"";return `<button type="button" class="x4tile ${cls}${picked===l.id?" sel":""}" data-tid="${esc(l.id)}"><span>${esc(l.name)}</span><span>${m==="x"?"absent":m?(showCol?"":"✓"):""}</span></button>`}).join("")||"<p>No learner names yet.</p>"}</div>
${picked!=null?`<div class="x4tap"><b>${esc((L.find(l=>l.id===picked)||{}).name||"")}: choose your colour</b><button type="button" style="background:#23855a" data-tap="g">Green</button><button type="button" style="background:#d98a00" data-tap="a">Amber</button><button type="button" style="background:#c9412b" data-tap="r">Red</button><button type="button" style="background:#5c6a6e" data-tap="">Cancel</button></div>`:""}
<div class="x4tot">${showCol?`<span style="color:#7ee0ad">${c.g} green</span><span style="color:#ffc861">${c.a} amber</span><span style="color:#ff9a87">${c.r} red</span>`:`<span>${c.g+c.a+c.r} chosen</span>`}<span style="opacity:.75">${left} still to choose</span></div></div>`};
  const wire=el=>{el.onclick=e=>{const b=e.target.closest("button");if(!b)return;
      if(b.dataset.bv){showCol=b.dataset.bv==="c";draw();return}
      if(b.dataset.tid!=null){picked=b.dataset.tid;draw();return}
      if(b.dataset.tap!=null){if(picked!=null&&b.dataset.tap)marks[picked]=b.dataset.tap;picked=null;onChange();return}}};
  const draw=()=>{if(!on||typeof PROJ==="undefined")return;if(!PROJ.active){on=false;return}PROJ.refresh("endboard")};
  const open=()=>{if(typeof PROJ==="undefined")return;on=true;PROJ.show("endboard",el=>{el.innerHTML=html();wire(el)})};
  return {open,draw};
}
function endLesson(sk,k){
  const A=T.active;if(!A)return;const L=learnersOf(A.cls),obs=objectivesFor(sk,k),lo=lessonObj(sk,k);
  const marks={};let sat=0;
  const o=modal(`<h2>End of lesson check</h2><p class="meta">${esc(A.cls.map(cname).join(" + "))} · ${lo?esc(lo.l.t):"Lesson"}</p>
${obs.length?`<h3>Objectives covered today</h3><div class="tch-list">${obs.map(b=>`<label><input type="checkbox" class="ob" value="${esc(b.ref)}" checked> <b>${esc(b.ref)}</b> ${esc(b.text)}</label>`).join("")}</div>`:""}
<h3>How well did each learner follow?</h3>${KEYHTML}<div class="tch-act"><button class="btn pri" id="proj" title="Show the names and colours on the board so learners choose their own colour">Project</button><button class="btn" id="allg">Everyone green</button><button class="btn" id="clr">Clear</button></div>
<div class="tch-learn" id="lr">${L.length?L.map(l=>`<div class="tch-row" data-id="${l.id}"><span>${esc(l.name)}${A.cls.length>1?` <small class="meta">${esc(l.cls)}</small>`:""}</span><span class="rg"><button class="rg-g" data-v="g" type="button" aria-label="Green: I understand and can explain it">G</button><button class="rg-a" data-v="a" type="button" aria-label="Amber: I partly understand">A</button><button class="rg-r" data-v="r" type="button" aria-label="Red: I don't understand this yet">R</button><button class="rg-x" data-v="x" type="button" aria-label="Grey: absent">Abs</button></span></div>`).join(""):`<p class="meta">No learner names added for these classes yet. You can still rate the lesson.</p>`}</div>
<h3>How satisfied are you with the learners' understanding?</h3><div class="tch-stars" id="st">${[1,2,3,4,5].map(n=>`<button type="button" data-n="${n}" aria-label="${n} of 5">★</button>`).join("")}</div>
<label class="tch-cm">Comment (optional)<textarea id="cm" rows="2" placeholder="What worked, what to re-teach"></textarea></label>
<div class="tch-act"><button class="btn pri" id="sv">Save and show follow-up</button><button class="btn" id="cl">Cancel</button></div>`,"wide");
  const sync=()=>{$$(".tch-row",o).forEach(r=>$$("button",r).forEach(x=>x.classList.toggle("on",marks[r.dataset.id]===x.dataset.v)));board.draw()};
  const board=boardView(L,marks,obs,lo?lo.l.t:"",sync);
  $$(".rg button",o).forEach(b=>b.onclick=()=>{const id=b.closest(".tch-row").dataset.id;marks[id]=b.dataset.v;sync()});
  $("#allg",o).onclick=()=>{$$(".tch-row",o).forEach(r=>{if(marks[r.dataset.id]!=="x")marks[r.dataset.id]="g"});sync()};
  $("#clr",o).onclick=()=>{$$(".tch-row",o).forEach(r=>{delete marks[r.dataset.id]});sync()};
  $("#proj",o).onclick=()=>board.open();
  $$("#st button",o).forEach(b=>b.onclick=()=>{sat=+b.dataset.n;$$("#st button",o).forEach(x=>x.classList.toggle("on",+x.dataset.n<=sat))});
  $("#cl",o).onclick=()=>o.close();
  $("#sv",o).onclick=()=>{
    const rec={id:uid(),ts:Date.now(),date:new Date().toISOString().slice(0,10),subj:sk,key:k.u+"."+k.l,title:lo?lo.l.t:"",cls:A.cls.slice(),marks,sat,note:$("#cm",o).value.trim(),covered:$$(".ob:checked",o).map(i=>i.value),mins:A.mins||0,label:A.label||""};
    T.sessions.push(rec);T.active=null;save();o.close();lessonBar();followUp(rec)};
}
/* ---------- differentiation ---------- */
const METHODS={
  r:["Re-teach the key idea in two or three short chunks with a worked example on the board.","Give sentence starters and a word bank; let learners answer orally before writing.","Pair each learner with a secure peer (think, pair, share) and check in after five minutes.","Use the flashcards and matching pairs as a quick retrieval game, then repeat tomorrow."],
  a:["Give a mixed set: two easy recall questions, then application questions.","Use a model answer with one deliberate gap to complete (partially completed example).","Ask them to explain the idea to a partner using the key terms, then correct each other."],
  g:["Move to exam-style and extended questions and ask 'why' and 'what if' follow-ups.","Ask them to write a mark scheme for a question, or to teach a small group.","Use the extra inquiry tasks (IBL) as a challenge."]
};
function diffSets(sk,k){
  const lo=lessonObj(sk,k);if(!lo)return null;const l=lo.l;
  const cards=(l.cards||[]).filter(c=>Array.isArray(c));
  const pr=(l.pr||[]).filter(q=>q&&q.q);const ws=(l.ws||[]).filter(q=>Array.isArray(q));
  return{l,cards,pr,ws,ibl2:l.ibl2||[],words:l.words||[],pairs:l.pairs||[]};
}
function sheetHTML(kind,title,names,sets,answers){
  const{l,cards,pr,ws,ibl2,pairs}=sets,school=(HUBSET.get().teacher||{}).school||"";
  let h=`<h1>${esc(title)}</h1><p class="sub">${esc(school)} · ${esc(l.t)}</p><p class="nm">Name: ____________________ ${names.length?`<span class="grp">Group: ${names.map(esc).join(", ")}</span>`:""}</p>`;
  const mcq=q=>`<li><b>${esc(q.q)}</b>${q.o?`<ol type="A">${q.o.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`:`<div class="line"></div>`}${answers&&q.a!=null&&q.o?`<p class="ans">Answer: ${"ABCD"[q.a]||""}. ${esc(q.e||"")}</p>`:""}</li>`;
  const wq=q=>`<li><b>${esc(q[0])}</b> <span class="mk">[${q[2]||""}]</span><div class="line"></div><div class="line"></div>${answers?`<p class="ans">${esc(q[1])}</p>`:""}</li>`;
  if(kind==="support"){
    h+=`<h2>1. Key terms (look, cover, write)</h2><table class="kt">${cards.slice(0,8).map(c=>`<tr><td><b>${esc(c[0])}</b></td><td>${answers?esc(c[1]):"&nbsp;"}</td></tr>`).join("")}</table>`;
    if(pairs.length)h+=`<h2>2. Match the pairs</h2><table class="kt">${pairs.slice(0,5).map((p,i)=>`<tr><td>${esc(p[0])}</td><td>${answers?esc(p[1]):"&nbsp;"}</td></tr>`).join("")}</table>`;
    h+=`<h2>3. Choose the answer</h2><ol>${pr.filter(q=>q.o).slice(0,5).map(mcq).join("")}</ol><h2>4. Write it out (start with: “The key idea is …”)</h2><ol>${ws.slice(0,3).map(wq).join("")}</ol>`;
  }else if(kind==="core"){
    h+=`<h2>1. Practice questions</h2><ol>${pr.slice(0,8).map(mcq).join("")}</ol><h2>2. Short answer</h2><ol>${ws.slice(0,4).map(wq).join("")}</ol>`;
  }else{
    h+=`<h2>1. Exam-style questions</h2><ol>${ws.slice(-3).map(wq).join("")}</ol>${ibl2.length?`<h2>2. Challenge</h2>${ibl2.slice(0,2).map(x=>`<h3>${esc(x.q)}</h3><div>${x.task||""}</div>`).join("")}`:""}<h2>3. Think deeper</h2><ol><li>Explain why this idea matters in real life. <div class="line"></div></li><li>Write your own exam question on this lesson and a mark scheme for it. <div class="line"></div><div class="line"></div></li></ol>`;
  }
  return h;
}
function printSheet(kind,title,names,sets,answers){
  const w=window.open("","_blank");if(!w){alert("Allow pop-ups to print the worksheet.");return}
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>body{font:14px/1.45 Calibri,Arial,sans-serif;margin:24px;color:#111}h1{margin:0}h2{font-size:1.1em;margin:18px 0 6px;border-bottom:2px solid #999}.sub{margin:2px 0 8px;color:#444}.line{border-bottom:1px solid #777;height:24px}ol{padding-left:22px}li{margin:8px 0}.ans{color:#0a6c2a;margin:2px 0}.mk{color:#666}.kt{border-collapse:collapse;width:100%}.kt td{border:1px solid #888;padding:6px 8px;width:50%}.grp{margin-left:18px;color:#444}@media print{button{display:none}}</style></head><body><button onclick="print()">Print</button>${sheetHTML(kind,title,names,sets,answers)}</body></html>`);w.document.close();
}
function followUp(rec){
  const sk=rec.subj,[u,j]=rec.key.split(".").map(Number),sets=diffSets(sk,{u,l:j}),all=learnersOf(rec.cls);
  const by={r:[],a:[],g:[]};all.forEach(l=>{const m=rec.marks[l.id];if(by[m])by[m].push(l.name)});
  const grp=(c,lab,cls)=>`<div class="tch-fu ${cls}"><h3><span class="rag ${c}"></span> ${lab} (${by[c].length})</h3>${by[c].length?`<p class="names">${by[c].map(esc).join(", ")}</p>`:`<p class="meta">Nobody marked ${lab.toLowerCase()}.</p>`}<ul>${METHODS[c].map(m=>`<li>${esc(m)}</li>`).join("")}</ul>${sets?`<div class="tch-act"><button class="btn" data-pr="${c}">Print worksheet</button><button class="btn" data-pr="${c}" data-ans="1">Print with answers</button></div>`:""}</div>`;
  const o=modal(`<h2>Follow-up for ${esc(rec.title||"this lesson")}</h2><p class="meta">Satisfaction: ${rec.sat?"★".repeat(rec.sat)+"☆".repeat(5-rec.sat):"not rated"}${rec.note?" · "+esc(rec.note):""}</p>${grp("r","Needs support","fu-r")}${grp("a","Nearly there","fu-a")}${grp("g","Secure, stretch them","fu-g")}<div class="tch-act"><button class="btn pri" id="fd">Done</button></div>`,"wide");
  $("#fd",o).onclick=()=>o.close();
  $$("[data-pr]",o).forEach(b=>b.onclick=()=>{const c=b.dataset.pr;if(!sets)return;const kind=c==="r"?"support":c==="a"?"core":"stretch";printSheet(kind,({support:"Support worksheet",core:"Practice worksheet",stretch:"Stretch worksheet"})[kind],by[c],sets,!!b.dataset.ans)});
}
/* ---------- Classes and reports panel ---------- */
let OV=null,tab="classes";
function panel(t){if(t)tab=t;if(OV){OV.remove();OV=null;if(!t)return}
  OV=document.createElement("div");OV.id="tchov";OV.className="setov";OV.setAttribute("role","dialog");OV.setAttribute("aria-label","Classes and reports");document.body.appendChild(OV);draw()}
function closePanel(){if(OV){OV.remove();OV=null}}
function draw(){
  const tabs=[["classes","Classes and learners"],["tt","Timetable"],["cov","Coverage report"],["rem","Reminders and calendar"]];
  OV.innerHTML=`<div class="set-wrap"><div class="set-top"><h1>Classes and reports</h1><span class="set-actions"><button class="btn" id="tclose" type="button">Close</button></span></div><p class="meta">Everything here is stored on this computer only. Back up from Settings.</p><div class="tch-tabs">${tabs.map(x=>`<button type="button" class="chip" data-t="${x[0]}" aria-pressed="${tab===x[0]}">${x[1]}</button>`).join("")}</div><div id="tcbody"></div></div>`;
  $("#tclose",OV).onclick=closePanel;$$("[data-t]",OV).forEach(b=>b.onclick=()=>{tab=b.dataset.t;draw()});
  ({classes:tClasses,tt:tTimetable,cov:tCoverage,rem:tReminders})[tab]($("#tcbody",OV));
}
/* classes */
function csvRows(txt){const rows=[];let r=[],f="",q=false;txt=txt.replace(/^﻿/,"");for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c==='"'){if(txt[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===","||c===";"||c==="\t"){r.push(f);f=""}else if(c==="\n"||c==="\r"){if(c==="\r"&&txt[i+1]==="\n")i++;r.push(f);f="";if(r.some(x=>x.trim()))rows.push(r);r=[]}else f+=c}r.push(f);if(r.some(x=>x.trim()))rows.push(r);return rows}
async function xlsxRows(buf){
  const u=new Uint8Array(buf),dv=new DataView(buf);let e=u.length-22;while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error("Not an .xlsx file");
  const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const files={};
  for(let i=0;i<n;i++){const meth=dv.getUint16(p+10,true),cs=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true);const name=new TextDecoder().decode(u.subarray(p+46,p+46+nl));files[name]={meth,cs,lo};p+=46+nl+el+cl}
  async function get(name){const f=files[name];if(!f)return"";const ln=dv.getUint16(f.lo+26,true),le=dv.getUint16(f.lo+28,true),st=f.lo+30+ln+le,data=u.subarray(st,st+f.cs);if(f.meth===0)return new TextDecoder().decode(data);const ds=new DecompressionStream("deflate-raw"),w=ds.writable.getWriter();w.write(data);w.close();return await new Response(ds.readable).text()}
  const ss=[];const sx=await get("xl/sharedStrings.xml");(sx.match(/<si>[\s\S]*?<\/si>/g)||[]).forEach(x=>ss.push((x.match(/<t[^>]*>([\s\S]*?)<\/t>/g)||[]).map(t=>t.replace(/<[^>]+>/g,"")).join("")));
  const un=s=>s.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,"&");
  const sh=await get("xl/worksheets/sheet1.xml");const rows=[];
  (sh.match(/<row[\s\S]*?<\/row>/g)||[]).forEach(r=>{const row=[];(r.match(/<c [^>]*?(?:\/>|>[\s\S]*?<\/c>)/g)||[]).forEach(c=>{const ref=(c.match(/r="([A-Z]+)\d+"/)||[])[1]||"A";let ci=0;for(const ch of ref)ci=ci*26+ch.charCodeAt(0)-64;ci--;const t=(c.match(/t="(\w+)"/)||[])[1],v=(c.match(/<v>([\s\S]*?)<\/v>/)||[])[1],is=(c.match(/<is>[\s\S]*?<\/is>/)||[])[0];let val="";if(t==="s")val=ss[+v]||"";else if(is)val=(is.match(/<t[^>]*>([\s\S]*?)<\/t>/g)||[]).map(x=>x.replace(/<[^>]+>/g,"")).join("");else val=v||"";row[ci]=un(val)});if(row.some(x=>x&&String(x).trim()))rows.push(row.map(x=>x||""))});return rows}
function addNames(cls,names){const have=new Set(cls.learners.map(l=>l.name.toLowerCase()));let n=0;names.forEach(nm=>{nm=nm.trim();if(nm&&!have.has(nm.toLowerCase())){cls.learners.push({id:uid(),name:nm});have.add(nm.toLowerCase());n++}});return n}
function tClasses(b){
  b.innerHTML=`<div class="tch-grid">${T.classes.map(c=>`<section class="set-card" data-c="${c.id}"><h2>${esc(c.name)}</h2><div class="tch-form"><label>Class name <input data-f="name" value="${esc(c.name)}"></label><label>Subject <select data-f="subj">${["chem","bio","alevel"].map(s=>`<option value="${s}"${c.subj===s?" selected":""}>${SUBN[s]}</option>`).join("")}</select></label>${c.subj==="alevel"?`<label>Level <select data-f="level"><option value="AS"${c.level==="AS"?" selected":""}>AS Level</option><option value="A2"${c.level!=="AS"?" selected":""}>A Level (A2)</option></select></label>`:""}</div><label class="tch-cm">Learners (one name per line) <span class="meta">${c.learners.length} now</span><textarea data-f="learners" rows="7" placeholder="Type or paste names">${esc(c.learners.map(l=>l.name).join("\n"))}</textarea></label><div class="tch-act"><label class="btn">Import Excel or CSV<input type="file" data-imp accept=".csv,.txt,.xlsx" hidden></label><button class="btn" data-del type="button">Delete class</button></div></section>`).join("")}</div><div class="tch-act"><button class="btn pri" id="addc" type="button">Add a class</button><a class="btn" id="sample" href="#">Download sample file</a></div><p class="meta">Import: use a file with one name per row (first column), or two columns: Name and Class. Names stay on this computer.</p>`;
  const cl=e=>T.classes.find(c=>c.id===e.closest("[data-c]").dataset.c);
  $$("[data-f]",b).forEach(i=>i.onchange=()=>{const c=cl(i),f=i.dataset.f;if(f==="learners"){const names=i.value.split(/\n/).map(s=>s.trim()).filter(Boolean);const old=new Map(c.learners.map(l=>[l.name.toLowerCase(),l]));c.learners=names.filter((n,ix)=>names.findIndex(x=>x.toLowerCase()===n.toLowerCase())===ix).map(n=>old.get(n.toLowerCase())||{id:uid(),name:n})}else c[f]=i.value;save();syncHelper();draw()});
  $$("[data-del]",b).forEach(x=>x.onclick=()=>{const c=cl(x);if(confirm("Delete "+c.name+" and its learners? Past lesson records stay.")){T.classes=T.classes.filter(y=>y!==c);T.tt.forEach(e=>e.cls=e.cls.filter(i=>i!==c.id));T.tt=T.tt.filter(e=>e.cls.length);save();draw()}});
  $$("[data-imp]",b).forEach(inp=>inp.onchange=async()=>{const f=inp.files[0];if(!f)return;const c=cl(inp);try{let rows;if(/\.xlsx$/i.test(f.name))rows=await xlsxRows(await f.arrayBuffer());else rows=csvRows(await f.text());
    if(rows.length&&/^(name|learner|student|first)/i.test(String(rows[0][0]).trim()))rows=rows.slice(1);
    let added=0;const byClass=rows.some(r=>r[1]&&String(r[1]).trim());
    rows.forEach(r=>{const nm=String(r[0]||"").trim();if(!nm)return;let t=c;if(byClass){const cn=String(r[1]||"").trim().toLowerCase();const m=T.classes.find(x=>x.name.toLowerCase()===cn||x.name.toLowerCase().includes(cn)&&cn.length>1);if(m)t=m;else if(cn)return}added+=addNames(t,[nm])});
    save();alert(added+" names added.");draw()}catch(e){alert("Could not read that file: "+e.message+". Save it as CSV and try again.")}});
  $("#addc",b).onclick=()=>{const n=prompt("Class name (for example IGCSE 2B Biology)");if(!n)return;const s=(prompt("Subject: type chem, bio or alevel","bio")||"bio").trim();T.classes.push({id:uid(),name:n,subj:/^(chem|bio|alevel)$/.test(s)?s:"bio",level:"",learners:[]});save();draw()};
  $("#sample",b).onclick=e=>{e.preventDefault();dlFile("class-list-sample.csv","Name,Class\nAda Banda,IGCSE 2A Biology\nJohn Phiri,IGCSE 2A Biology\n","text/csv")};
}
/* timetable */
function tTimetable(b){
  b.innerHTML=`<section class="set-card"><h2>Period times</h2><table class="tch-t"><tr><th>Name</th><th>Starts</th><th>Ends</th><th>Minutes</th></tr>${T.periods.map(p=>`<tr data-p="${p.id}"><td>${esc(p.name)}</td><td><input type="time" data-s value="${p.s}"></td><td><input type="time" data-e value="${p.e}"></td><td>${toM(p.e)-toM(p.s)}</td></tr>`).join("")}</table></section>
<section class="set-card"><h2>My weekly timetable</h2><p class="meta">A lesson that runs across two periods is a double. Pick the first and last period.</p>${[1,2,3,4,5].map(d=>`<h3>${DAYS[d]}</h3>${T.tt.filter(e=>e.day===d).sort((a,b)=>a.from-b.from).map(e=>{const[s,en]=entryTimes(e);return `<div class="tch-tte" data-e="${e.id}"><b>${fmtT(s)}–${fmtT(en)}</b> <span>${esc(entryLabel(e))}</span> <span class="meta">${en-s} min${e.to>e.from?" (double)":""}</span><button class="btn" data-x type="button">Remove</button></div>`}).join("")||`<p class="meta">No lessons.</p>`}`).join("")}
<h3>Add a lesson</h3><div class="tch-form"><label>Day <select id="ad">${[1,2,3,4,5].map(d=>`<option value="${d}">${DAYS[d]}</option>`).join("")}</select></label><label>From <select id="af">${T.periods.filter(p=>p.t==="p").map(p=>`<option value="${p.id}">${esc(p.name)} (${p.s})</option>`).join("")}</select></label><label>To <select id="at">${T.periods.filter(p=>p.t==="p").map(p=>`<option value="${p.id}">${esc(p.name)} (${p.e})</option>`).join("")}</select></label></div><div class="tch-list" id="ac">${T.classes.map(c=>`<label><input type="checkbox" value="${c.id}"> ${esc(c.name)}</label>`).join("")}</div><div class="tch-act"><button class="btn pri" id="adda" type="button">Add to timetable</button></div></section>`;
  $$("[data-p]",b).forEach(r=>{const p=T.periods.find(x=>x.id===r.dataset.p);$("[data-s]",r).onchange=e=>{p.s=e.target.value;save();syncHelper();draw()};$("[data-e]",r).onchange=e=>{p.e=e.target.value;save();syncHelper();draw()}});
  $$("[data-x]",b).forEach(x=>x.onclick=()=>{const id=x.closest("[data-e]").dataset.e;T.tt=T.tt.filter(e=>e.id!==id);save();syncHelper();draw()});
  $("#adda",b).onclick=()=>{const cls=$$("#ac input:checked",b).map(i=>i.value);const f=+$("#af",b).value,t=+$("#at",b).value;if(!cls.length||t<f){alert("Choose at least one class, and make sure the last period is not before the first.");return}T.tt.push({id:uid(),day:+$("#ad",b).value,from:f,to:t,cls});save();syncHelper();draw()};
}
/* coverage report */
function objUniverse(sk,level){const out=[];((typeof OBJ!=="undefined"&&OBJ[sk])||[]).forEach(t=>t.subs.forEach(s=>s.obj.forEach(o=>{if(sk==="alevel"&&level==="AS"&&o[2])return;out.push({topic:t.t+" "+t.name,sub:s.n+" "+s.name,ref:o[0],text:o[1],ext:!!o[2]})})));return out}
function coverageData(clsIds,sk){
  const cls=T.classes.filter(c=>clsIds.includes(c.id));const level=cls.length===1?cls[0].level:"";
  const U=objUniverse(sk,level),map={};
  T.sessions.filter(s=>s.subj===sk&&s.cls.some(c=>clsIds.includes(c))).forEach(s=>{(s.covered||[]).forEach(r=>{const m=map[r]=map[r]||{date:s.date,sat:[],keys:new Set(),rag:{r:0,a:0,g:0}};if(s.date<m.date)m.date=s.date;if(s.sat)m.sat.push(s.sat);m.keys.add(s.key);Object.values(s.marks||{}).forEach(v=>{if(m.rag[v]!=null)m.rag[v]++})})});
  return{U,map,cls};
}
function tCoverage(b){
  const subs=[...new Set(T.classes.map(c=>c.subj))];
  b.innerHTML=`<section class="set-card"><h2>Curriculum coverage</h2><div class="tch-form"><label>Subject <select id="cs">${subs.map(s=>`<option value="${s}">${SUBN[s]}</option>`).join("")}</select></label><label>Class <select id="cc"></select></label></div><div class="tch-act"><button class="btn pri" id="cr" type="button">Show report</button><button class="btn" id="cp" type="button">Print / save as PDF</button><button class="btn" id="cv" type="button">Download CSV</button></div><div id="cout"></div></section><section class="set-card"><h2>Lessons taught</h2><div id="clog"></div></section>`;
  const sel=()=>({sk:$("#cs",b).value,ids:$("#cc",b).value==="*"?T.classes.filter(c=>c.subj===$("#cs",b).value).map(c=>c.id):[$("#cc",b).value]});
  const fillC=()=>{const sk=$("#cs",b).value;$("#cc",b).innerHTML=`<option value="*">All ${SUBN[sk]} classes</option>`+T.classes.filter(c=>c.subj===sk).map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")};
  $("#cs",b).onchange=()=>{fillC();show()};$("#cc",b).onchange=show;fillC();
  const stars=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1)+" ★":"";
  function rows(){const{sk,ids}=sel(),d=coverageData(ids,sk);return{sk,ids,...d}}
  function show(){
    const d=rows(),cov=d.U.filter(o=>d.map[o.ref]);
    const pct=d.U.length?Math.round(100*cov.length/d.U.length):0;
    let h=`<p><b>${cov.length} of ${d.U.length}</b> objectives covered (${pct}%).</p><div class="ovl-bar"><i style="width:${pct}%"></i></div>`;
    let lastT="";d.U.forEach(o=>{if(o.topic!==lastT){h+=`<h3>${esc(o.topic)}</h3>`;lastT=o.topic}const m=d.map[o.ref];h+=`<div class="cov-row${m?" done":""}"><span class="cov-ref">${esc(o.ref)}</span><span class="cov-t">${esc(o.text)}</span><span class="cov-m">${m?`${m.date} · lesson ${[...m.keys].join(", ")}${m.sat.length?" · "+stars(m.sat):""}${m.rag.r+m.rag.a+m.rag.g?` · <span class="rag r"></span>${m.rag.r} <span class="rag a"></span>${m.rag.a} <span class="rag g"></span>${m.rag.g}`:""}`:`<i>not yet covered</i>`}</span></div>`});
    $("#cout",b).innerHTML=h;
    const ss=T.sessions.slice().reverse().filter(s=>s.subj===d.sk);
    $("#clog",b).innerHTML=ss.length?`<table class="tch-t"><tr><th>Date</th><th>Class</th><th>Lesson</th><th>Satisfaction</th><th>R / A / G</th><th>Comment</th></tr>${ss.slice(0,60).map(s=>{const c={r:0,a:0,g:0};Object.values(s.marks||{}).forEach(v=>{if(c[v]!=null)c[v]++});return `<tr><td>${s.date}</td><td>${esc(s.cls.map(cname).join(" + "))}</td><td>${esc(s.key)} ${esc(s.title)}</td><td>${s.sat?"★".repeat(s.sat):"–"}</td><td>${c.r} / ${c.a} / ${c.g}</td><td>${esc(s.note)}</td></tr>`}).join("")}</table>`:`<p class="meta">No lessons recorded yet. Turn Teaching Mode ON, teach a lesson and press End lesson.</p>`;
  }
  show();
  $("#cr",b).onclick=show;
  $("#cv",b).onclick=()=>{const d=rows();const q=s=>'"'+String(s==null?"":s).replace(/"/g,'""')+'"';const L=[["Subject","Class","Topic","Sub-topic","Objective","Text","Covered","First date","Lessons","Average satisfaction","Red","Amber","Green"].map(q).join(",")];d.U.forEach(o=>{const m=d.map[o.ref];L.push([SUBN[d.sk],d.ids.map(cname).join(" + "),o.topic,o.sub,o.ref,o.text,m?"Yes":"No",m?m.date:"",m?[...m.keys].join(" "):"",m&&m.sat.length?(m.sat.reduce((a,c)=>a+c,0)/m.sat.length).toFixed(1):"",m?m.rag.r:"",m?m.rag.a:"",m?m.rag.g:""].map(q).join(","))});dlFile("Coverage-"+d.sk+"-"+new Date().toISOString().slice(0,10)+".csv","﻿"+L.join("\r\n"),"text/csv")};
  $("#cp",b).onclick=()=>{const d=rows(),w=window.open("","_blank");if(!w){alert("Allow pop-ups to print.");return}const cov=d.U.filter(o=>d.map[o.ref]).length,teacher=(HUBSET.get().teacher||{});let h=`<h1>Curriculum coverage report</h1><p>${esc(SUBN[d.sk])} · ${esc(d.ids.map(cname).join(" + "))}<br>${esc(teacher.name||"")} · ${esc(teacher.school||"")} · ${new Date().toLocaleDateString()}</p><p><b>${cov} of ${d.U.length}</b> objectives covered (${d.U.length?Math.round(100*cov/d.U.length):0}%).</p>`;let lt="";d.U.forEach(o=>{if(o.topic!==lt){h+=`<h2>${esc(o.topic)}</h2>`;lt=o.topic}const m=d.map[o.ref];h+=`<div class="r${m?" d":""}"><b>${esc(o.ref)}</b> ${esc(o.text)}<br><small>${m?`Covered ${m.date}, lesson ${[...m.keys].join(", ")}${m.sat.length?", satisfaction "+stars(m.sat):""}${m.rag.r+m.rag.a+m.rag.g?`, learners R ${m.rag.r} / A ${m.rag.a} / G ${m.rag.g}`:""}`:"Not yet covered"}</small></div>`});w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Coverage report</title><style>body{font:13px/1.4 Calibri,Arial,sans-serif;margin:24px}h2{font-size:1.1em;margin:16px 0 4px;border-bottom:2px solid #999}.r{padding:4px 6px;border-bottom:1px solid #ddd}.r.d{background:#e9f7ef}small{color:#444}@media print{button{display:none}}</style></head><body><button onclick="print()">Print</button>${h}</body></html>`);w.document.close()};
}
/* reminders and calendar */
const HELPER="http://127.0.0.1:47213";
function helperPayload(){return{on:!!T.remindOn,lead:T.remind,periods:T.periods,entries:T.tt.map(e=>{const[s,en]=entryTimes(e);return{day:e.day,start:fmtT(s),end:fmtT(en),label:entryLabel(e)+" ("+({chem:"Chemistry",bio:"Biology",alevel:"Biology"}[entrySubj(e)]||"")+")"}})}}
function syncHelper(){try{fetch(HELPER+"/timetable",{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify(helperPayload())}).catch(()=>{})}catch(e){}}
async function helperUp(){try{const r=await fetch(HELPER+"/ping",{cache:"no-store"});return r.ok}catch(e){return false}}
function pad(n){return String(n).padStart(2,"0")}
function icsDate(d,m){return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+"T"+pad(Math.floor(m/60))+pad(m%60)+"00"}
function makeICS(){
  const from=T.cal.from?new Date(T.cal.from+"T00:00"):new Date();from.setHours(0,0,0,0);
  const to=T.cal.to?new Date(T.cal.to+"T23:59"):new Date(from.getTime()+1000*60*60*24*7*30);
  const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//LOTS Hub//Timetable//EN","CALSCALE:GREGORIAN","X-WR-CALNAME:LOTS teaching timetable","X-WR-TIMEZONE:Africa/Lusaka","BEGIN:VTIMEZONE","TZID:Africa/Lusaka","BEGIN:STANDARD","DTSTART:19700101T000000","TZOFFSETFROM:+0200","TZOFFSETTO:+0200","TZNAME:CAT","END:STANDARD","END:VTIMEZONE"];
  const BY=["","MO","TU","WE","TH","FR"];
  T.tt.forEach(e=>{const d=new Date(from);const diff=(e.day-d.getDay()+7)%7;d.setDate(d.getDate()+diff);const[s,en]=entryTimes(e);const sk=entrySubj(e);
    L.push("BEGIN:VEVENT","UID:"+e.id+"@lots-hub","DTSTAMP:"+icsDate(new Date(),new Date().getHours()*60+new Date().getMinutes())+"Z","DTSTART;TZID=Africa/Lusaka:"+icsDate(d,s),"DTEND;TZID=Africa/Lusaka:"+icsDate(d,en),"RRULE:FREQ=WEEKLY;BYDAY="+BY[e.day]+";UNTIL="+to.getFullYear()+pad(to.getMonth()+1)+pad(to.getDate())+"T235959Z","SUMMARY:"+entryLabel(e).replace(/,/g," ")+" ("+(SUBN[sk]||"").replace(/ \(.*\)/,"")+")","DESCRIPTION:Teach with the LOTS Hub","LOCATION:Lusaka Oaktree School");
    (T.remind||[]).filter(m=>m>0).forEach(m=>L.push("BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:Lesson in "+m+" minutes","TRIGGER:-PT"+m+"M","END:VALARM"));
    L.push("END:VEVENT")});
  L.push("END:VCALENDAR");return L.join("\r\n");
}
async function tReminders(b){
  const up=await helperUp();
  b.innerHTML=`<section class="set-card"><h2>Windows reminders</h2><p>${up?`<b class="ok">Reminder helper is running.</b> Notifications appear even when the Hub is closed.`:`<b>Reminder helper not found on this computer.</b> It is installed by the Windows setup (LOTS-Hub-Setup). If you just installed it, restart the computer once.`}</p><div class="tch-form"><label class="chk"><input type="checkbox" id="ron" ${T.remindOn?"checked":""}> Remind me before each lesson</label><label>First reminder (minutes before) <input type="number" id="r1" min="0" max="60" value="${T.remind[0]||0}"></label><label>Second reminder (minutes before, 0 = none) <input type="number" id="r2" min="0" max="60" value="${T.remind[1]||0}"></label></div><div class="tch-act"><button class="btn pri" id="rsv" type="button">Save and send to helper</button></div></section>
<section class="set-card"><h2>Calendar file for your phone</h2><p class="meta">A weekly repeating timetable with the same reminders. Open the file on your phone or computer, or import it into Google Calendar, Outlook or Apple Calendar.</p><div class="tch-form"><label>From <input type="date" id="cf" value="${T.cal.from||new Date().toISOString().slice(0,10)}"></label><label>Until <input type="date" id="ct" value="${T.cal.to||new Date(Date.now()+210*864e5).toISOString().slice(0,10)}"></label></div><div class="tch-act"><button class="btn pri" id="ics" type="button">Download calendar (.ics)</button></div></section>`;
  $("#rsv",b).onclick=()=>{T.remindOn=$("#ron",b).checked;T.remind=[Math.max(0,+$("#r1",b).value||0),Math.max(0,+$("#r2",b).value||0)].filter(x=>x>0);save();syncHelper();draw()};
  $("#ics",b).onclick=()=>{T.cal={from:$("#cf",b).value,to:$("#ct",b).value};save();dlFile("LOTS-teaching-timetable.ics",makeICS(),"text/calendar")};
}
/* ---------- settings link + boot ---------- */
new MutationObserver(()=>{const s=$("#setov .set-wrap");if(s&&!$("#tchlink",s)){const d=document.createElement("section");d.className="set-card";d.id="tchlink";d.innerHTML=`<h2>Teaching Mode</h2><p class="meta">Classes, timetable, learner picker, lesson check, coverage reports and reminders.</p><div class="tch-act"><button class="btn pri" type="button" id="tcho">Open Classes and reports</button></div>`;s.appendChild(d);$("#tcho",d).onclick=()=>{const c=$("#sclose");if(c)c.click();panel()}}}).observe(document.body,{childList:true});
mountButtons();syncHelper();
window.addEventListener("hashchange",()=>setTimeout(lessonBar,250));
new MutationObserver(()=>{if(T.on&&$(".deck-hero")&&!$("#tchbar"))lessonBar()}).observe($("#app"),{childList:true});
if(T.on)setTimeout(lessonBar,400);
})();
