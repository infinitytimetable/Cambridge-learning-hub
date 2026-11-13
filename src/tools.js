/* ===== Study tools (all hubs): glossary, revision sheets, exam countdown, offline help; student: points, mistakes, paper tracker, progress code; teacher: class codes ===== */
(function(){
const isT=!!HUB.teacher;
const A=()=>window.HUBAPP,prep=k=>A().prep(k),states=new Proxy({},{get:(_,k)=>A().states[k]}),plain=s=>A().plain(s),F=s=>A().F(s),saveFile=(n,d)=>A().saveFile(n,d);
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const jget=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
const jset=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dayNum=s=>Math.round(Date.parse(s+"T00:00:00Z")/864e5);
const subs=()=>HUB.subs.filter(k=>SUBJ[k]);
const stOf=k=>{prep(k);return states[k]};
const learner=()=>((HUBSET.get().learner||{}).name||"");
const st=document.createElement("style");
st.textContent=`.tl-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 10px}.tl-tabs button[aria-selected=true]{background:var(--on-btn,#0a6c74);color:#fff}
.tl-gl dt{font-weight:700;margin-top:10px}.tl-gl dd{margin:2px 0 0 0}.tl-az{display:flex;flex-wrap:wrap;gap:4px;margin:8px 0}.tl-az button{min-width:30px}
.tl-tbl{border-collapse:collapse;width:100%;font-size:.95em}.tl-tbl th,.tl-tbl td{border:1px solid #8885;padding:5px 8px;text-align:left}
.tl-big{font:700 34px/1.1 var(--f-head,serif)}.tl-badge{display:inline-block;margin:3px 6px 3px 0;padding:4px 10px;border-radius:99px;border:1px solid #8886}.tl-badge.on{background:#fde68a;color:#3b2a00;border-color:#d4a72c}
.tl-chip{margin:0 0 10px;padding:8px 12px;border-radius:12px;border:1px solid #8884;display:flex;gap:14px;flex-wrap:wrap;align-items:center}
.tl-chip b{font-weight:700}.tl-opt{display:block;width:100%;text-align:left;margin:6px 0}.tl-opt.ok{background:#d9f2e3;border-color:#2f9e63}.tl-opt.no{background:#fde7e2;border-color:#d9482b}
@media print{.tl-chip{display:none}}`;
document.head.appendChild(st);

/* ---------- days, points, streak (derived, so nothing can drift) ---------- */
function touch(){const d=jget("hubdays",[]),t=today();if(d[d.length-1]!==t&&!d.includes(t)){d.push(t);jset("hubdays",d.slice(-400))}}
function streak(){const d=new Set(jget("hubdays",[])),t=today();let n=0,x=dayNum(t);if(!d.has(t))x--;while(d.has(new Date((x)*864e5).toISOString().slice(0,10))){n++;x--}return n}
const MISS=()=>jget("hubmiss",{items:{},cleared:0});
const PAPERS=()=>jget("hubpapers",[]);
function stats(){
  let done=0,qpts=0,perfect=0,tot=0;
  subs().forEach(k=>{const S=stOf(k);done+=Object.values(S.done||{}).filter(Boolean).length;Object.values(S.quiz||{}).forEach(b=>{qpts+=b.best||0;if(b.best===b.of&&b.of>0)perfect++});SUBJ[k].units.forEach(u=>tot+=u.lessons.length)});
  const days=jget("hubdays",[]).length,pp=PAPERS().length,cl=MISS().cleared||0;
  const xp=done*20+qpts*3+perfect*10+days*5+pp*10+cl*2;
  return {done,tot,qpts,perfect,days,pp,cl,xp,streak:streak()};
}
const LEVELS=["Beginner","Explorer","Learner","Scholar","Analyst","Researcher","Specialist","Expert","Master","Professor"];
const level=xp=>{const n=Math.min(LEVELS.length-1,Math.floor(xp/150));return {n:n+1,name:LEVELS[n],next:n>=LEVELS.length-1?null:(n+1)*150}};
function badges(s){return [["First lesson done",s.done>=1],["10 lessons done",s.done>=10],["3-day streak",s.streak>=3],["7-day streak",s.streak>=7],["Perfect quiz",s.perfect>=1],["5 perfect quizzes",s.perfect>=5],["10 mistakes cleared",s.cl>=10],["Logged a past paper",s.pp>=1]]}

/* ---------- mistakes (called by the quiz engine) ---------- */
const hid=q=>{let h=0;for(let i=0;i<q.length;i++)h=(h*31+q.charCodeAt(i))|0;return String(h)};
function quizAns(it,ok){
  if(isT||!it||!it.q)return;
  const m=MISS(),id=hid(String(it.q)),x=m.items[id];
  if(!ok){m.items[id]=Object.assign(x||{},{s:A().subKey,q:it.q,o:it.o,a:it.a,e:it.e||"",ok:0,n:((x&&x.n)||0)+1})}
  else if(x){x.ok=(x.ok||0)+1;if(x.ok>=2){delete m.items[id];m.cleared=(m.cleared||0)+1}}
  jset("hubmiss",m);
}

/* ---------- glossary ---------- */
function glossary(k){
  const map=new Map();
  SUBJ[k].units.forEach(u=>u.lessons.forEach(l=>{
    (l.pairs||[]).forEach(p=>{const t=plain(p[0]);if(!map.has(t.toLowerCase()))map.set(t.toLowerCase(),{t:p[0],d:p[1],l:l.no||"",n:u.n})});
    (l.words||[]).forEach(w=>{const t=w[0].charAt(0).toUpperCase()+w[0].slice(1);if(!map.has(t.toLowerCase()))map.set(t.toLowerCase(),{t,d:w[1],l:l.no||"",n:u.n})});
  }));
  return [...map.values()].sort((a,b)=>plain(a.t).localeCompare(plain(b.t)));
}

/* ---------- revision sheets ---------- */
function sheetBlocks(k,u){
  const b=[{t:"p",text:`${SUBJ[k].title}  |  Topic ${u.n}: ${plain(u.name)}`,size:10,color:"555555"},{t:"p",text:"Revision sheet. Cover the answers and test yourself.",italic:true}];
  u.lessons.forEach(l=>{
    b.push({t:"h",l:2,text:`${l.no||""} ${plain(l.t)}`.trim()});
    if(l.sum)b.push({t:"p",text:plain(l.sum)});
    const pr=(l.pairs||[]);if(pr.length)b.push({t:"table",head:["Key term","Meaning"],rows:pr.map(p=>[plain(p[0]),plain(p[1])]),widths:[35,65],fontSize:9});
    const cd=(l.cards||[]).slice(0,5);if(cd.length)b.push({t:"table",head:["Test yourself","Answer"],rows:cd.map(c=>[plain(c[0]),plain(c[1])]),widths:[45,55],fontSize:9});
  });
  b.push({t:"h",l:2,text:"Checklist"});
  b.push({t:"ul",items:u.lessons.map(l=>"I can explain: "+plain(l.t))});
  return b;
}
function sheetHTML(k,u){
  const rows=u.lessons.map(l=>`<h2>${esc(l.no||"")} ${esc(plain(l.t))}</h2>${l.sum?`<p>${esc(plain(l.sum))}</p>`:""}${(l.pairs||[]).length?`<table><tr><th>Key term</th><th>Meaning</th></tr>${l.pairs.map(p=>`<tr><td>${F(esc(p[0]))}</td><td>${F(esc(p[1]))}</td></tr>`).join("")}</table>`:""}${(l.cards||[]).length?`<table><tr><th>Test yourself</th><th>Answer</th></tr>${l.cards.slice(0,5).map(c=>`<tr><td>${F(esc(c[0]))}</td><td>${F(esc(c[1]))}</td></tr>`).join("")}</table>`:""}`).join("");
  return `<!doctype html><meta charset="utf-8"><title>Revision sheet</title><style>body{font:13px/1.4 Calibri,Arial,sans-serif;margin:18mm}h1{font-size:20px;margin:0}h2{font-size:15px;margin:14px 0 4px}table{border-collapse:collapse;width:100%;margin:4px 0}td,th{border:1px solid #444;padding:3px 6px;text-align:left;vertical-align:top}th{background:#eee}</style><h1>Revision sheet: Topic ${u.n} ${esc(plain(u.name))}</h1><p>${esc(SUBJ[k].title)} | ${esc(learner())}</p>${rows}<script>setTimeout(()=>print(),300)<\/script>`;
}
async function sheetExport(k,u,fmt,msg){
  msg.textContent="Building…";
  try{const model={title:`Revision sheet: Topic ${u.n} ${plain(u.name)}`,footer:`${SUBJ[k].title} | Topic ${u.n} revision sheet`,blocks:sheetBlocks(k,u)};
    const data=fmt==="docx"?await HUBDOC.docx(model):await HUBDOC.pdf(model);
    const r=await saveFile(`Revision sheet - ${SUBJ[k].code} topic ${u.n}.${fmt}`,data);msg.textContent=r==="saved"?"Saved.":r==="declined"?"":"Could not save."}
  catch(e){console.error(e);msg.textContent="Sorry, that could not be built."}
}

/* ---------- exam countdown ---------- */
const EXAMS=()=>jget("hubexams",[]);
function daysTo(d){return dayNum(d)-dayNum(today())}
function examStrip(){
  const hero=$(".hero");if(!hero||$(".tl-chip",hero))return;
  const ex=EXAMS().filter(e=>daysTo(e.date)>=0).sort((a,b)=>a.date<b.date?-1:1).slice(0,2);
  const s=isT?null:stats();
  if(!ex.length&&!s)return;
  const d=document.createElement("div");d.className="tl-chip";
  d.innerHTML=ex.map(e=>`<span>📅 <b>${esc(e.name)}</b>: ${daysTo(e.date)===0?"today":daysTo(e.date)+" day"+(daysTo(e.date)===1?"":"s")+" to go"}</span>`).join("")+(s?`<span>🔥 <b>${s.streak}</b> day streak</span><span>⭐ <b>${s.xp}</b> points · Level ${level(s.xp).n} ${level(s.xp).name}</span>`:"")+`<button class="btn sm" type="button" data-open="tools">Study tools</button>`;
  d.querySelector("button").onclick=()=>openTools();
  hero.insertBefore(d,hero.firstChild);
}

/* ---------- progress codes ---------- */
const b64=s=>{const u=new TextEncoder().encode(s);let x="";u.forEach(c=>x+=String.fromCharCode(c));return btoa(x).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};
const unb64=t=>{t=t.replace(/-/g,"+").replace(/_/g,"/");while(t.length%4)t+="=";const x=atob(t),u=new Uint8Array(x.length);for(let i=0;i<x.length;i++)u[i]=x.charCodeAt(i);return u};
async function packCode(o){
  const json=JSON.stringify(o);
  try{if(window.CompressionStream){const cs=new CompressionStream("deflate-raw"),w=cs.writable.getWriter();w.write(new TextEncoder().encode(json));w.close();const buf=new Uint8Array(await new Response(cs.readable).arrayBuffer());let x="";buf.forEach(c=>x+=String.fromCharCode(c));return "LOTS1z."+btoa(x).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}}catch(e){}
  return "LOTS1."+b64(json);
}
async function unpackCode(code){
  code=String(code).trim().replace(/\s+/g,"");
  const z=code.startsWith("LOTS1z."),p=z||code.startsWith("LOTS1.");if(!p)throw new Error("Not a LOTS progress code");
  const body=code.slice(z?7:6),bytes=unb64(body);
  if(z){const ds=new DecompressionStream("deflate-raw"),w=ds.writable.getWriter();w.write(bytes);w.close();return JSON.parse(new TextDecoder().decode(new Uint8Array(await new Response(ds.readable).arrayBuffer())))}
  return JSON.parse(new TextDecoder().decode(bytes));
}
function buildCodeObj(){
  const s=stats(),o={v:1,n:learner()||"Learner",t:Date.now(),x:s.xp,st:s.streak,p:PAPERS().map(p=>[p.n,p.d,p.m,p.x,p.t||0]),s:{}};
  subs().forEach(k=>{const S=stOf(k),code=SUBJ[k].code||k;let tot=0;SUBJ[k].units.forEach(u=>tot+=u.lessons.length);
    o.s[code]={d:Object.keys(S.done||{}).filter(x=>S.done[x]),q:Object.fromEntries(Object.entries(S.quiz||{}).map(([a,b])=>[a,[b.best,b.of]])),L:tot}});
  return o;
}

/* ---------- overlay ---------- */
let OVL=null,TAB="";
function tabsList(){
  const t=[["gloss","Glossary"],["sheet","Revision sheets"],["exam","Exam countdown"]];
  if(!isT)t.unshift(["pts","Points and streak"]),t.push(["miss","My mistakes"],["paper","Past papers"],["code","Progress code"]);
  else t.push(["class","Learner codes"]);
  t.push(["off","Offline and install"]);return t;
}
function openTools(tab){
  if(OVL){OVL.remove();OVL=null;if(!tab)return}
  TAB=tab||TAB||tabsList()[0][0];
  OVL=document.createElement("div");OVL.className="setov";OVL.id="toolov";OVL.setAttribute("role","dialog");OVL.setAttribute("aria-label","Study tools");document.body.appendChild(OVL);paint();
}
function closeTools(){if(OVL){OVL.remove();OVL=null}}
function paint(){
  if(!OVL)return;
  OVL.innerHTML=`<div class="set-wrap"><div class="set-top"><h1>Study tools</h1><div class="set-actions"><button class="btn pri" id="tlx" type="button">Close</button></div></div>
<div class="tl-tabs" role="tablist">${tabsList().map(t=>`<button class="btn" role="tab" data-t="${t[0]}" aria-selected="${TAB===t[0]}" type="button">${t[1]}</button>`).join("")}</div><div class="set-card" id="tlbody"></div></div>`;
  $("#tlx",OVL).onclick=closeTools;
  $$("[data-t]",OVL).forEach(b=>b.onclick=()=>{TAB=b.dataset.t;paint()});
  const body=$("#tlbody",OVL);({gloss,sheet,exam,pts,miss,paper,code,class:klass,off}[TAB]||gloss)(body);
}
function subPick(body,cb,cur){
  if(subs().length<2)return subs()[0];
  const w=document.createElement("label");w.className="set-chk";w.innerHTML=`Subject <select>${subs().map(k=>`<option value="${k}" ${k===cur?"selected":""}>${esc(SUBJ[k].title)}</option>`).join("")}</select>`;
  body.appendChild(w);$("select",w).onchange=e=>cb(e.target.value);return cur||subs()[0];
}
let GK=null;
function gloss(body,az){
  GK=GK||A().subKey;body.innerHTML="<h2>Glossary</h2><p class=\"meta\">Key terms from every lesson. Type to search.</p>";
  subPick(body,v=>{GK=v;gloss(body)},GK);
  const all=glossary(GK),box=document.createElement("div");
  box.innerHTML=`<input type="search" id="glq" placeholder="Search ${all.length} terms…" aria-label="Search the glossary" style="width:100%;font:inherit;padding:8px 10px;border:1px solid #8886;border-radius:8px;margin:8px 0"><div class="tl-az" id="glaz"></div><dl class="tl-gl" id="gll"></dl>`;body.appendChild(box);
  const letters=[...new Set(all.map(g=>plain(g.t).charAt(0).toUpperCase()))];let L="";
  const draw=()=>{const q=$("#glq",box).value.trim().toLowerCase();
    const r=all.filter(g=>(!L||plain(g.t).charAt(0).toUpperCase()===L)&&(!q||plain(g.t).toLowerCase().includes(q)||g.d.toLowerCase().includes(q)));
    $("#gll",box).innerHTML=r.map(g=>`<dt>${F(esc(g.t))} <span class="meta">${g.l?"Lesson "+esc(g.l):""}</span></dt><dd>${F(esc(g.d))}</dd>`).join("")||"<p>No matches.</p>"};
  $("#glaz",box).innerHTML=`<button class="btn sm" data-l="">All</button>`+letters.map(l=>`<button class="btn sm" data-l="${l}">${l}</button>`).join("");
  $$("[data-l]",box).forEach(b=>b.onclick=()=>{L=b.dataset.l;draw()});$("#glq",box).oninput=draw;draw();
}
let SK=null;
function sheet(body){
  SK=SK||A().subKey;body.innerHTML="<h2>Revision sheets</h2><p class=\"meta\">One sheet per topic with key terms, test-yourself questions and a checklist. Download it or print it.</p>";
  subPick(body,v=>{SK=v;sheet(body)},SK);
  const d=document.createElement("div");d.innerHTML=`<label class="set-chk">Topic <select id="shu">${SUBJ[SK].units.filter(u=>u.lessons.length).map(u=>`<option value="${u.n}">${u.n}. ${esc(plain(u.name))}</option>`).join("")}</select></label>
<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn pri" data-f="pdf">Download PDF</button><button class="btn" data-f="docx">Download Word</button><button class="btn" data-f="print">Print</button><span class="meta" id="shm" role="status"></span></div>`;body.appendChild(d);
  $$("[data-f]",d).forEach(b=>b.onclick=()=>{const u=SUBJ[SK].units.find(x=>String(x.n)===$("#shu",d).value);if(!u)return;
    if(b.dataset.f==="print"){const w=window.open("","_blank");if(w){w.document.write(sheetHTML(SK,u));w.document.close()}else $("#shm",d).textContent="Pop-ups are blocked. Use PDF instead."}
    else sheetExport(SK,u,b.dataset.f,$("#shm",d))});
}
function exam(body){
  const ex=EXAMS().sort((a,b)=>a.date<b.date?-1:1);
  body.innerHTML=`<h2>Exam countdown</h2><p class="meta">Add your exam dates. The nearest ones appear on the home page.</p>
<form id="exf" class="set-grid"><label>Paper or exam<input type="text" id="exn" maxlength="40" placeholder="e.g. Biology Paper 4" required></label><label>Date<input type="date" id="exd" required></label><div style="align-self:end"><button class="btn pri" type="submit">Add</button></div></form>
<table class="tl-tbl"><tr><th>Exam</th><th>Date</th><th>Days left</th><th></th></tr>${ex.map((e,i)=>`<tr><td>${esc(e.name)}</td><td>${esc(e.date)}</td><td>${daysTo(e.date)<0?"finished":daysTo(e.date)}</td><td><button class="btn sm" data-r="${i}" type="button">Remove</button></td></tr>`).join("")||"<tr><td colspan=4>No exams added yet.</td></tr>"}</table>`;
  $("#exf",body).onsubmit=e=>{e.preventDefault();const a=EXAMS();a.push({name:$("#exn",body).value.trim().slice(0,40),date:$("#exd",body).value});jset("hubexams",a);exam(body)};
  $$("[data-r]",body).forEach(b=>b.onclick=()=>{const a=EXAMS().sort((x,y)=>x.date<y.date?-1:1);a.splice(+b.dataset.r,1);jset("hubexams",a);exam(body)});
}
function pts(body){
  const s=stats(),lv=level(s.xp);
  body.innerHTML=`<h2>Points and streak</h2><div class="tl-big">⭐ ${s.xp} points</div><p>Level ${lv.n}: <b>${lv.name}</b>${lv.next?` · ${lv.next-s.xp} points to the next level`:" · top level"}</p>
<div class="tl-big">🔥 ${s.streak} day${s.streak===1?"":"s"} in a row</div><p class="meta">Open the hub and study each day to keep your streak.</p>
<h3>How points are earned</h3><ul><li>20 points for each lesson marked as done (${s.done} so far)</li><li>3 points for each mark in your best quiz scores, and 10 extra for a perfect quiz</li><li>5 points for each day you study (${s.days} days)</li><li>10 points for each past paper you log, 2 for each mistake you clear</li></ul>
<h3>Badges</h3><div>${badges(s).map(b=>`<span class="tl-badge${b[1]?" on":""}">${b[1]?"★ ":"☆ "}${b[0]}</span>`).join("")}</div>`;
}
function miss(body){
  const m=MISS(),items=Object.values(m.items);
  body.innerHTML=`<h2>My mistakes</h2><p class="meta">Questions you got wrong in quizzes come here. Get a question right twice and it is cleared.</p><p><b>${items.length}</b> to review · <b>${m.cleared||0}</b> cleared</p><div id="mq"></div>`;
  const mq=$("#mq",body);
  if(!items.length){mq.innerHTML="<p>Nothing to review. Well done!</p>";return}
  const it=items[Math.floor(Math.random()*items.length)],ord=it.o.map((_,i)=>i).sort(()=>Math.random()-.5);
  mq.innerHTML=`<div class="q"><p><b>${F(esc(it.q))}</b></p>${ord.map((k,p)=>`<button class="btn tl-opt" data-k="${k}"><b>${"ABCD"[p]}</b> ${F(esc(it.o[k]))}</button>`).join("")}<div id="mf"></div></div>`;
  $$(".tl-opt",mq).forEach(b=>b.onclick=()=>{const ok=+b.dataset.k===it.a;$$(".tl-opt",mq).forEach(x=>{x.disabled=true;if(+x.dataset.k===it.a)x.classList.add("ok")});if(!ok)b.classList.add("no");
    quizAns(it,ok);$("#mf",mq).innerHTML=`<p><b>${ok?"Correct.":"Not quite."}</b> ${F(esc(it.e||""))}</p><button class="btn pri" id="mn" type="button">Next question</button>`;$("#mn",mq).onclick=()=>miss(body)});
}
function paper(body){
  const ps=PAPERS();
  body.innerHTML=`<h2>Past paper tracker</h2><p class="meta">Log each past paper you attempt to see your progress.</p>
<form id="pf" class="set-grid"><label>Paper<input type="text" id="pn" maxlength="50" placeholder="e.g. 9700/42 May/June 2023" required></label><label>Date<input type="date" id="pd" value="${today()}" required></label><label>Marks scored<input type="number" id="pm" min="0" step="0.5" required></label><label>Out of<input type="number" id="px" min="1" required></label><label>Minutes taken (optional)<input type="number" id="pt" min="0"></label><div style="align-self:end"><button class="btn pri" type="submit">Add paper</button></div></form>
<div id="pc"></div><table class="tl-tbl"><tr><th>Paper</th><th>Date</th><th>Score</th><th>%</th><th>Minutes</th><th></th></tr>${ps.map((p,i)=>`<tr><td>${esc(p.n)}</td><td>${esc(p.d)}</td><td>${p.m}/${p.x}</td><td>${Math.round(p.m/p.x*100)}%</td><td>${p.t||""}</td><td><button class="btn sm" data-r="${i}" type="button">Remove</button></td></tr>`).join("")||"<tr><td colspan=6>No papers logged yet.</td></tr>"}</table>`;
  if(ps.length>1){const sp=[...ps].sort((a,b)=>a.d<b.d?-1:1),W=520,H=140,pad=24,pt=(i)=>[pad+i*(W-2*pad)/(sp.length-1),H-pad-(sp[i].m/sp[i].x)*(H-2*pad)];
    $("#pc",body).innerHTML=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:560px" role="img" aria-label="Past paper scores over time"><line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${H-pad}" stroke="#888"/><line x1="${pad}" y1="${pad}" x2="${pad}" y2="${H-pad}" stroke="#888"/><polyline fill="none" stroke="#0a6c74" stroke-width="3" points="${sp.map((_,i)=>pt(i).join(",")).join(" ")}"/>${sp.map((_,i)=>`<circle cx="${pt(i)[0]}" cy="${pt(i)[1]}" r="4" fill="#0a6c74"/>`).join("")}<text x="2" y="${pad+4}" font-size="10" fill="currentColor">100%</text><text x="2" y="${H-pad}" font-size="10" fill="currentColor">0</text></svg><p class="meta">Average: ${Math.round(sp.reduce((a,p)=>a+p.m/p.x,0)/sp.length*100)}% over ${sp.length} papers.</p>`}
  $("#pf",body).onsubmit=e=>{e.preventDefault();const m=+$("#pm",body).value,x=+$("#px",body).value;if(m>x){alert("Marks scored cannot be more than the total.");return}
    const a=PAPERS();a.push({n:$("#pn",body).value.trim().slice(0,50),d:$("#pd",body).value,m,x,t:+$("#pt",body).value||0});jset("hubpapers",a);paper(body)};
  $$("[data-r]",body).forEach(b=>b.onclick=()=>{const a=PAPERS();a.splice(+b.dataset.r,1);jset("hubpapers",a);paper(body)});
}
function code(body){
  body.innerHTML=`<h2>Progress code</h2><p class="meta">Make a code that shows your teacher your lessons, quiz scores, points and papers. It holds no passwords. Send it by message or email.</p><button class="btn pri" id="cg" type="button">Make my code</button><div id="co"></div>`;
  $("#cg",body).onclick=async()=>{const c=await packCode(buildCodeObj());
    $("#co",body).innerHTML=`<textarea readonly rows="5" style="width:100%;font:12px monospace;margin-top:10px" id="ct">${c}</textarea><div class="row" style="gap:8px;margin-top:6px"><button class="btn" id="cc" type="button">Copy code</button><button class="btn" id="cs" type="button">Save as a file</button><span class="meta" id="cm"></span></div>`;
    $("#cc",body).onclick=async()=>{try{await navigator.clipboard.writeText(c);$("#cm",body).textContent="Copied."}catch(e){$("#ct",body).select();$("#cm",body).textContent="Press Ctrl+C to copy."}};
    $("#cs",body).onclick=async()=>{const r=await saveFile("progress-"+(learner()||"learner").replace(/\W+/g,"_")+".lots.txt",c);$("#cm",body).textContent=r==="saved"?"Saved.":""}};
}
const CLS=()=>jget("hubclass",{});
function klass(body){
  const c=CLS(),rows=Object.values(c).sort((a,b)=>a.n.localeCompare(b.n));
  const codes=[...new Set(rows.flatMap(r=>Object.keys(r.s)))];
  body.innerHTML=`<h2>Learner codes</h2><p class="meta">Paste the progress codes learners send you (one per line) or choose the saved files. Each new code from a learner replaces their old one.</p>
<textarea id="kc" rows="4" style="width:100%;font:12px monospace" placeholder="LOTS1z.…"></textarea><div class="row" style="gap:8px;margin:6px 0"><button class="btn pri" id="ka" type="button">Add codes</button><input type="file" id="kf" accept=".txt,.json" multiple><button class="btn" id="ke" type="button">Export as CSV</button><span class="meta" id="km" role="status"></span></div>
<table class="tl-tbl"><tr><th>Learner</th><th>Updated</th>${codes.map(x=>`<th>${esc(x)} lessons</th><th>${esc(x)} quiz avg</th>`).join("")}<th>Points</th><th>Streak</th><th>Papers avg</th><th></th></tr>${rows.map(r=>`<tr><td>${esc(r.n)}</td><td>${new Date(r.t).toLocaleDateString()}</td>${codes.map(x=>{const s=r.s[x];if(!s)return"<td>-</td><td>-</td>";const q=Object.values(s.q),av=q.length?Math.round(q.reduce((a,b)=>a+b[0]/b[1],0)/q.length*100)+"%":"-";return `<td>${s.d.length}/${s.L}</td><td>${av}</td>`}).join("")}<td>${r.x}</td><td>${r.st}</td><td>${r.p.length?Math.round(r.p.reduce((a,p)=>a+p[2]/p[3],0)/r.p.length*100)+"%":"-"}</td><td><button class="btn sm" data-r="${esc(r.n)}" type="button">Remove</button></td></tr>`).join("")||`<tr><td colspan="${5+codes.length*2}">No learner codes yet.</td></tr>`}</table>`;
  const add=async txt=>{let ok=0,bad=0;const c2=CLS();for(const line of String(txt).split(/\n+/).map(x=>x.trim()).filter(Boolean)){try{const o=await unpackCode(line);if(!o.n)throw 0;const key=o.n.toLowerCase();if(!c2[key]||c2[key].t<=o.t)c2[key]=o;ok++}catch(e){bad++}}jset("hubclass",c2);klass(body);$("#km",body).textContent=`${ok} added${bad?", "+bad+" not understood":""}.`};
  $("#ka",body).onclick=()=>add($("#kc",body).value);
  $("#kf",body).onchange=async e=>{let t="";for(const f of e.target.files)t+=(await f.text())+"\n";add(t)};
  $$("[data-r]",body).forEach(b=>b.onclick=()=>{const c2=CLS();delete c2[b.dataset.r.toLowerCase()];jset("hubclass",c2);klass(body)});
  $("#ke",body).onclick=async()=>{const head=["Learner","Points","Streak",...codes.flatMap(x=>[x+" lessons done",x+" quiz avg %"]),"Papers avg %"];
    const lines=[head].concat(rows.map(r=>[r.n,r.x,r.st,...codes.flatMap(x=>{const s=r.s[x];if(!s)return["",""];const q=Object.values(s.q);return[s.d.length,q.length?Math.round(q.reduce((a,b)=>a+b[0]/b[1],0)/q.length*100):""]}),r.p.length?Math.round(r.p.reduce((a,p)=>a+p[2]/p[3],0)/r.p.length*100):""]));
    const csv=lines.map(l=>l.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n");const r=await saveFile("learner-progress.csv",csv);$("#km",body).textContent=r==="saved"?"Saved.":""};
}
let DEF=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();DEF=e});
function off(body){
  const p=location.protocol;
  body.innerHTML=`<h2>Offline and install</h2><p><b>Everything is already inside this one file.</b> It needs no internet after you have it, apart from the fonts which fall back to your device fonts.</p>
<p>Status: <span class="${navigator.onLine?"set-ok":"set-warn"}">${navigator.onLine?"online":"offline"}</span> · opened from <b>${p==="file:"?"a file on this device":esc(location.host||p)}</b></p>
<h3>Put it on your device</h3><ul><li><b>Windows PC:</b> use the LOTS Hub Setup installer. It adds a Start menu icon.</li><li><b>Any computer:</b> keep the file in a folder, or pin it in Chrome or Edge by opening it and choosing Menu, Cast, save and share, Install page as app (when offered).</li><li><b>Android:</b> save the file to Downloads and open it in Chrome. Use the menu, then Add to Home screen when the file is on a web address.</li><li><b>iPhone and iPad:</b> use Share, then Add to Home Screen when the hub is on a web address.</li></ul>
<p class="meta">A one-tap install and automatic updates need the hub to be put on a web address (https). A file opened from a folder cannot register an install. Ask your teacher if the school wants to host it.</p>${DEF?`<button class="btn pri" id="ins" type="button">Install this page as an app</button>`:""}`;
  const b=$("#ins",body);if(b)b.onclick=()=>{DEF.prompt();DEF=null;b.remove()};
}

/* ---------- start ---------- */
function init(){
  touch();
  const nav=$("#setbtn")||$("#dspbtn");
  if(nav&&!$("#toolbtn")){const b=document.createElement("button");b.className="theme dsp-btn";b.id="toolbtn";b.type="button";b.textContent=isT?"Tools":"Study tools";b.setAttribute("aria-haspopup","dialog");nav.insertAdjacentElement("afterend",b);b.addEventListener("click",()=>openTools())}
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&OVL&&!$("#galov"))closeTools()});
  const a=$("#app");if(a){let raf=0;new MutationObserver(()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;try{examStrip()}catch(e){console.error(e)}})}).observe(a,{childList:true,subtree:true});examStrip()}
}
window.TOOLS={quizAns,open:openTools,stats};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(init,0));else setTimeout(init,0);
})();
