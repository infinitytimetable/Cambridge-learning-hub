(function(){
"use strict";
const COLS=["#E5384F","#EE5A2D","#F28B1E","#F0B323","#D8C61F","#9FCB36","#4FB84C","#22AE8C","#2290BC","#3F6FD1","#6A57C9","#9050B8"];
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
function rl(hex){const n=parseInt(hex.slice(1),16);const c=[n>>16&255,n>>8&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function onCol(hex){const l=rl(hex);return 1.05/(l+.05)>=(l+.05)/(rl("#10252F")+.05)?"#FFFFFF":"#10252F"}
const F=s=>String(s).replace(/~([^~<>]+)~/g,"<sub>$1</sub>").replace(/\^([^\^<>]+)\^/g,"<sup>$1</sup>");
const fm=s=>s.replace(/([A-Za-z)])(\d+)/g,"$1<sub>$2</sub>");
const plain=s=>String(s).replace(/<[^>]+>/g,"").replace(/[~^]/g,"");
function addPJ(host,fn,label){if(!host||Array.from(host.children).some(c=>c.classList&&c.classList.contains("pjb")))return null;const b=document.createElement("button");b.type="button";b.className="btn sm pjb";b.title="Show this on the projector screen";b.textContent=label||"Project";b.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();fn()});host.appendChild(b);return b}
function projQ(o){PROJ.show("q",el=>{const ans=[o.ans?`<div class="fb ok" style="font-size:1em"><strong>Answer</strong>${o.ans}${o.expl?`<div style="margin-top:6px">${o.expl}</div>`:""}</div>`:""].join("");
  el.innerHTML=`<section class="slide sq" style="margin:0"><div class="sl-top"><span class="pill navy">${o.head||"Question"}</span>${o.marks!=null?`<span class="marks">[${o.marks}]</span>`:""}</div>${o.src?`<div class="src">${o.src}</div>`:""}<h2 class="sl-title" style="font-size:1.3em">${o.q}</h2>${o.opts?`<div class="opts">${o.opts.map((t,k)=>`<div class="opt" data-k="${k}"><b>${"ABCD"[k]}</b><span>${t}</span></div>`).join("")}</div>`:""}<p style="margin-top:22px"><button type="button" class="btn pri" id="pj-rv">Show answer</button></p><div id="pj-ans" hidden style="margin-top:12px">${ans}</div></section>`;
  const rv=el.querySelector("#pj-rv"),an=el.querySelector("#pj-ans");rv.onclick=()=>{const on=an.hidden;an.hidden=!on;rv.textContent=on?"Hide answer":"Show answer";if(o.opts&&o.a!=null)Array.from(el.querySelectorAll(".opt")).forEach(x=>x.classList.toggle("ok",on&&+x.dataset.k===o.a))}})}
function jokeV(el,j){el.innerHTML=`<section class="slide sq" style="margin:0"><div class="sl-top"><span class="pill navy">Joke</span></div><p class="big-joke" style="margin:10px 0 0;font-size:1.5em">${F(j[0])}</p><p class="punch big-joke" style="margin-top:14px;color:var(--accent);font-size:1.5em"></p><p style="margin-top:22px"><button type="button" class="btn pri">Show the punchline</button></p></section>`;const bt=el.querySelector("button"),pn=el.querySelector(".punch");bt.onclick=()=>{pn.innerHTML=F(j[1]);bt.disabled=true}}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function gcd(a,b){return b?gcd(b,a%b):a}

/* ---------- subjects and saved state (per browser, per subject) ---------- */
function hex2(n){return Math.round(n).toString(16).padStart(2,"0")}
function hsl(h,sat,l){sat/=100;l/=100;const a=sat*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return "#"+[f(0),f(8),f(4)].map(v=>hex2(v*255)).join("")}
let U,LS,S,KEY,SUB,MATCH,EQ,FORGE,WORDS,JOKES,subKey="chem";
const prepared={},states={};
function prep(k){
  if(prepared[k])return;
  const sb=SUBJ[k],us=sb.units,n=us.length;
  us.forEach((u,i)=>{u.col=n<=12?COLS[i]:hsl(i*(300/(n-1)),66,44);u.on=onCol(u.col);u.lessons.forEach((l,j)=>{l.key=u.n+"-"+(j+1);l.u=u;l.idx=j;l.no=u.n+"."+(j+1)})});
  let st={done:{},quiz:{},ibl:{},theme:"",last:""};
  try{const r=localStorage.getItem(sb.key);if(r)st=Object.assign(st,JSON.parse(r))}catch(e){}
  states[k]=st;prepared[k]=1;
}
function useSubject(k){
  prep(k);if(window.GAPALL)GAPALL(k);SUB=SUBJ[k];subKey=k;try{applyDsp()}catch(e){}U=SUB.units;KEY=SUB.key;S=states[k];
  LS=[].concat(...U.map(u=>u.lessons));
  MATCH=SUB.MATCH;EQ=SUB.EQ;FORGE=SUB.FORGE;WORDS=SUB.WORDS;JOKES=SUB.JOKES;
  document.documentElement.setAttribute("data-sub",k);
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
window.HUBAPP={prep,states,get subKey(){return subKey},plain,F,saveFile:(n,d)=>saveFile(n,d),nxBlocks:(r,o)=>nxBlocks(r,o),nxInline:n=>nxInline(n),nxStdImg:s=>nxStdImg(s)};
let THEME="";try{THEME=localStorage.getItem("hubtheme")||""}catch(e){}
if(!THEME){prep(HUB.subs[0]);THEME=states[HUB.subs[0]].theme||""}
if(THEME)document.documentElement.setAttribute("data-theme",THEME);
useSubject(HUB.subs[0]);

const app=$("#app");
let X4CTX=null,lessonTab="engage",curLesson="",cardsSel="all",papersSel="all",planPick="",gameScope="all";

/* ---------- file saving (downloads capability, with a browser fallback) ---------- */
async function saveFile(name,data){
  try{if(window.HUBSAVE&&await HUBSAVE.save(name,data))return "saved"}catch(e){console.error(e)}
  try{if(window.claude&&claude.use){const d=await claude.use("downloads");if(d){await d.save({filename:name,data});return "saved"}}}catch(e){if(e&&e.code==="declined")return "declined"}
  try{const blob=data instanceof Blob?data:new Blob([data]);const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(a.href)},1500);return "saved"}catch(e){return "failed"}
}
function alertBox(t){const d=document.createElement("div");d.className="x4annhint";d.style.cssText="top:auto;bottom:20px;pointer-events:auto;cursor:pointer;max-width:min(680px,92vw);font-size:14px;padding:12px 16px;border-radius:12px";d.textContent=t+" (tap to close)";d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),15000)}
async function runExport(btn,fn,label){
  const old=btn.textContent;btn.disabled=true;btn.textContent="Building PowerPoint…";
  try{const r=await fn();const st=await saveFile(r.filename,r.data);btn.textContent=st==="saved"?"Saved ✓":st==="declined"?old:"Could not save";try{const miss=typeof PPX!=="undefined"?PPX.missing:[];if(miss.length&&st==="saved")alertBox(miss.length+" picture"+(miss.length>1?"s":"")+" could not be added to the PowerPoint ("+miss.slice(0,4).join(", ")+(miss.length>4?" …":"")+"). Open the hub from the LOTS Hub desktop shortcut (version 4.1 or newer) so pictures from your content folder can be included.")}catch(e){}}
  catch(e){console.error(e);btn.textContent="Export failed"}
  setTimeout(()=>{btn.textContent=old;btn.disabled=false},2500);
}

/* ---------- shared pieces ---------- */
function lessonRow(l){
  return `<a class="lrow" style="--c:${l.u.col};--on:${l.u.on}" href="#l${l.key}"><span class="no">${l.no}</span><div style="min-width:0"><h3>${F(l.t)}</h3><p>${F(l.sum)}</p></div><span class="tick ${S.done[l.key]?"on":""}" aria-label="${S.done[l.key]?"Completed":"Not completed"}">✓</span></a>`;
}
function wrapTables(root){$$("table",root).forEach(t=>{if(t.parentElement.classList.contains("tw"))return;const w=document.createElement("div");w.className="tw";t.replaceWith(w);w.appendChild(t)})}
function tileHTML(u){
  const d=u.lessons.filter(l=>S.done[l.key]).length,p=Math.round(d/u.lessons.length*100);
  return `<a class="tile" style="--c:${u.col};--on:${u.on}" href="#u${u.n}"><span class="sym"><small>${u.n}</small>${u.sym}</span><span class="tx"><h3>${F(u.name)}</h3><div class="meta">${u.lessons.length} lessons · quiz · exam questions</div><div class="mini" role="img" aria-label="${d} of ${u.lessons.length} lessons done"><i style="width:${p}%"></i></div></span></a>`;
}
function notFoundHome(){location.hash=subKey+"/home"}

/* ---------- home ---------- */
function viewHome(){
  const done=LS.filter(l=>S.done[l.key]).length,last=LS.find(l=>l.key===S.last);
  const jk=JOKES[Math.floor(Date.now()/864e5)%JOKES.length];
  app.innerHTML=`<section class="hero">
<div class="eyebrow">${SUB.eyebrow}</div>
<h1>${SUB.title}</h1>
<p>${LS.length} lessons across all ${U.length} topics. Each lesson has notes, an inquiry task and activity, a worksheet, practice questions and flashcards. Add topic quizzes, exam-style questions, games and jokes.</p>
<div class="scale"><div class="eyebrow">Your progress · ${done} of ${LS.length} lessons done</div>
<div class="bar" role="img" aria-label="Progress across the ${U.length} topics">${U.map(u=>{const d=u.lessons.filter(l=>S.done[l.key]).length;return `<span class="seg" style="--c:${u.col}"><i style="width:${d/u.lessons.length*100}%"></i></span>`}).join("")}</div>
<div class="legend"><span>Topic 1</span><span>Topic ${U.length}</span></div></div>
<div class="tools"><input class="search" id="q" type="search" placeholder="Search lessons, e.g. ${SUB.searchEg}" aria-label="Search lessons"><a class="btn pri" href="#${last?"l"+last.key:"l1-1"}">${last?"Continue: "+F(last.t):"Start with topic 1"}</a></div>
<div id="res" style="margin-top:14px"></div></section>
<h2 class="sec">The ${U.length} topics</h2><div class="grid">${U.map(tileHTML).join("")}</div>
<h2 class="sec">Practise and play</h2>
<div class="links"><a class="lk" href="#cards"><b>Flashcards</b><span>${LS.reduce((a,l)=>a+l.cards.length,0)} cards by topic, with shuffle and review.</span></a>
<a class="lk" href="#papers"><b>Exam-style questions</b><span>${U.reduce((a,u)=>a+u.pp.length,0)} topical questions with self-marking mark schemes.</span></a>
<a class="lk" href="#games"><b>${SUB.name} games</b><span>${SUB.gamesBlurb}</span></a>
<a class="lk" href="#jokes"><b>Jokes</b><span>${SUB.jokeBlurb}</span></a></div>
<div class="joke"><div class="eyebrow">Joke of the day</div><p><b>${F(jk[0])}</b></p><details><summary>Punchline</summary><div>${F(jk[1])}</div></details></div>`;
  $("#q").addEventListener("input",e=>{
    const v=e.target.value.trim().toLowerCase(),res=$("#res");
    if(!v){res.innerHTML="";return}
    const m=LS.filter(l=>plain(l.t+" "+l.sum+" "+l.u.name).toLowerCase().includes(v));
    res.innerHTML=m.length?`<div class="lrows">${m.map(lessonRow).join("")}</div>`:`<p class="meta">No lessons match "${v.replace(/[<>&"]/g,"")}".</p>`;
  });
}

/* ---------- unit ---------- */
function ppHTML(p,u){
  const pts=p.ms.map(s=>{const m=s.match(/\((\d)\)/g);return {s,w:m?m.reduce((a,x)=>a+ +x[1],0):1}});
  const total=pts.reduce((a,b)=>a+b.w,0);
  return `<article class="pp" data-total="${total}"><div class="row" style="justify-content:space-between"><span class="eyebrow">Topic ${u.n} · ${F(u.name)}</span><span class="marks">${total} marks</span></div><h3 style="font-size:19px;margin:8px 0">${F(p.title)}</h3>${p.src?`<div class="src">${p.src}</div>`:""}<div>${F(p.q)}</div><details${(window.HUBSET&&HUBSET.get().exam&&HUBSET.get().exam.open)?" open":""}><summary>Mark scheme and self-mark</summary><div><p class="meta">Tick one box for each mark you earned.</p><ul class="ms">${pts.map(pt=>`<li><span style="display:flex;gap:4px;flex:none">${Array(pt.w).fill('<input type="checkbox" class="mk" aria-label="Mark earned">').join("")}</span><span>${F(pt.s)}</span></li>`).join("")}</ul><p><b class="sc">Your score: 0 / ${total}</b></p></div></details></article>`;
}
function bindPP(root){
  root.addEventListener("change",e=>{
    if(!e.target.classList.contains("mk"))return;
    const a=e.target.closest(".pp");
    $(".sc",a).textContent="Your score: "+$$(".mk:checked",a).length+" / "+a.dataset.total;
  });
}
function viewUnit(n){
  const u=U[n-1];if(!u)return notFoundHome();
  const best=S.quiz["q"+n];
  app.innerHTML=`<div class="crumb"><a href="#home">Topics</a> / Topic ${u.n}</div>
<div class="uhead" style="--c:${u.col};--on:${u.on}"><span class="sym"><small>${u.n}</small>${u.sym}</span><div><h1>${F(u.name)}</h1><p>${F(u.blurb)}</p></div></div>
${u.lessons.length?`<h2 class="sec">Lessons</h2><div class="row" style="gap:8px;margin:0 0 12px;flex-wrap:wrap"><button class="btn" id="exptopic" type="button">Export whole topic as PowerPoint</button>${HUB.teacher?`<a class="btn" href="#plan">Plan a lesson</a>`:""}</div><div class="lrows">${u.lessons.map(lessonRow).join("")}</div>`:""}
${u.lessons.length?`<h2 class="sec">Check your understanding</h2>
<div class="links"><a class="lk" href="#q${u.n}"><b>Topic quiz</b><span>${u.quiz.length} questions with instant feedback.${best?" Best score: "+best.best+"/"+best.of+".":""}</span></a>
<a class="lk" href="#cards" data-deck="u${u.n}"><b>Flashcards for this topic</b><span>${u.lessons.reduce((a,l)=>a+l.cards.length,0)} cards.</span></a></div>`:""}
<h2 class="sec">Exam-style questions</h2><div id="pp">${u.pp.map(p=>ppHTML(p,u)).join("")}</div>`;
  bindPP($("#pp"));
  const et=$("#exptopic");if(et)et.addEventListener("click",e=>runExport(e.currentTarget,()=>exportTopicPPTX(u,SUB)));
  const dl=$("[data-deck]");if(dl)dl.addEventListener("click",()=>{cardsSel=dl.dataset.deck});
}

/* ---------- quiz engine ---------- */
function mountQuiz(root,items,key,back){
  let i=0,score=0,wrong=[];
  function show(){
    const it=items[i],order=shuffle(it.o.map((_,k)=>k));let chosen=null;
    const qv=el=>{el.innerHTML=`<section class="slide sq" style="margin:0"><div class="sl-top"><span class="pill navy">Quiz | Question ${i+1} of ${items.length}</span></div><h2 class="sl-title" style="font-size:1.3em">${F(it.q)}</h2><div class="opts">${order.map((k,p)=>`<div class="opt ${chosen!=null&&k===it.a?"ok":chosen===k?"no":""}"><b>${"ABCD"[p]}</b><span>${F(it.o[k])}</span></div>`).join("")}</div>${chosen!=null?`<div class="fb ${chosen===it.a?"ok":"no"}"><strong>${chosen===it.a?"Correct.":"Not quite."}</strong>${F(it.e)}</div>`:""}</section>`};
    root.innerHTML=`<div class="meta">Question ${i+1} of ${items.length}</div><div class="prog"><i style="width:${i/items.length*100}%"></i></div><div class="q" style="max-width:76ch"><p><b>${F(it.q)}</b></p><div class="opts">${order.map((k,p)=>`<button class="opt" data-k="${k}"><b>${"ABCD"[p]}</b><span>${F(it.o[k])}</span></button>`).join("")}</div><div id="fbk"></div></div>`;
    addPJ($(".meta",root),()=>PROJ.show("quiz",qv));
    PROJ.refresh("quiz");
    $$(".opt",root).forEach(b=>b.addEventListener("click",()=>{
      const k=+b.dataset.k,ok=k===it.a;chosen=k;PROJ.refresh("quiz");
      $$(".opt",root).forEach(x=>{x.disabled=true;if(+x.dataset.k===it.a)x.classList.add("ok")});
      if(!ok){b.classList.add("no");wrong.push(i)}else score++;
      try{window.TOOLS&&TOOLS.quizAns(it,ok)}catch(e){}
      $("#fbk",root).innerHTML=`<div class="fb ${ok?"ok":"no"}"><strong>${ok?"Correct.":"Not quite."}</strong>${F(it.e)}</div><div class="row" style="margin-top:12px"><button class="btn pri" id="nx">${i+1<items.length?"Next question":"See my score"}</button></div>`;
      $("#nx",root).focus({preventScroll:true});
      $("#nx",root).addEventListener("click",()=>{i++;i<items.length?show():end()});
    }));
  }
  function end(){
    const prev=S.quiz[key];if(!prev||score>prev.best){S.quiz[key]={best:score,of:items.length};save()}
    const pct=score/items.length,msg=pct===1?"Perfect score.":pct>=.75?"Strong result. Review the ones you missed.":pct>=.5?"A good start. Revisit the lesson notes, then try again.":"Go back through the lessons for this topic, then try again.";
    root.innerHTML=`<div class="prog"><i style="width:100%"></i></div><div class="eyebrow">Your score</div><div class="score">${score}/${items.length}</div><p>${msg}</p>
${wrong.length?`<h3 style="margin:18px 0 8px;font-size:19px">Questions to review</h3><div class="qlist">${wrong.map(w=>`<div class="q"><p><b>${F(items[w].q)}</b></p><p>Answer: ${F(items[w].o[items[w].a])}</p><p class="meta" style="font-family:var(--f-body);font-size:14px">${F(items[w].e)}</p></div>`).join("")}</div>`:""}
<div class="row" style="margin-top:18px"><button class="btn pri" id="again">Try again</button><a class="btn" href="${back}">Back</a></div>`;
    $("#again",root).addEventListener("click",()=>{i=0;score=0;wrong=[];show()});
  }
  show();
}
function viewQuiz(n){
  const u=U[n-1];if(!u||!u.quiz||!u.quiz.length)return notFoundHome();
  app.innerHTML=`<div class="crumb"><a href="#home">Topics</a> / <a href="#u${u.n}">Topic ${u.n}</a> / Quiz</div><h1 class="ltitle">${F(u.name)}: topic quiz</h1><div id="qz" style="margin-top:18px"></div>`;
  mountQuiz($("#qz"),u.quiz,"q"+n,"#u"+n);
}

/* ---------- practice, worksheet, deck ---------- */
function evalQ(it,v){
  if(it.t==="num"){const x=parseFloat(String(v).replace("−","-").replace(",","."));if(isNaN(x))return false;const tol=it.tol!=null?it.tol:Math.abs(it.a)*.005+1e-9;return Math.abs(x-it.a)<=tol}
  const s=String(v).toLowerCase().trim();return !!s&&it.a.some(k=>s.includes(k));
}
function mountPractice(root,items){
  const state=items.map(()=>false);
  const html=items.map((it,i)=>{
    let body="";
    if(it.t==="mcq")body=`<div class="opts">${it.o.map((o,k)=>`<button class="opt" data-q="${i}" data-k="${k}"><b>${"ABCD"[k]}</b><span>${F(o)}</span></button>`).join("")}</div>`;
    else body=`<div class="ans"><input type="text" id="in${i}" data-q="${i}" autocomplete="off" autocapitalize="off" aria-label="Your answer" ${it.t==="num"?'inputmode="decimal"':""} size="14"><span>${it.u?F(it.u):""}</span><button class="btn sm chk" data-q="${i}">Check</button></div>`;
    return `<div class="q" id="pq${i}"><div class="qh"><span class="qn">Question ${i+1}</span></div><p><b>${F(it.q)}</b></p>${body}<div class="fbx"></div></div>`;
  }).join("");
  root.innerHTML=`<div class="qlist">${html}</div><p class="meta" id="psc" style="margin-top:14px"></p>`;
  function update(){const c=state.filter(Boolean).length;$("#psc",root).textContent=c?`Correct so far: ${c} of ${items.length}`:""}
  function fb(i,ok){const it=items[i];$("#pq"+i+" .fbx",root).innerHTML=`<div class="fb ${ok?"ok":"no"}"><strong>${ok?"Correct.":"Not quite."}</strong>${F(it.e)}</div>`}
  items.forEach((it,i)=>{const h=$("#pq"+i+" .qh",root);addPJ(h,()=>projQ({head:"Practice | Question "+(i+1),q:F(it.q),opts:it.t==="mcq"?it.o.map(F):null,a:it.t==="mcq"?it.a:null,ans:it.t==="mcq"?F(it.o[it.a]):it.t==="num"?F(String(it.a))+(it.u?" "+F(it.u):""):F(it.a[0]),expl:F(it.e)}))});
  root.addEventListener("click",e=>{
    const o=e.target.closest(".opt");
    if(o){const i=+o.dataset.q,it=items[i],k=+o.dataset.k;const sib=$$(`.opt[data-q="${i}"]`,root);sib.forEach(x=>{x.disabled=true;if(+x.dataset.k===it.a)x.classList.add("ok")});if(k!==it.a)o.classList.add("no");else state[i]=true;fb(i,k===it.a);update();return}
    const c=e.target.closest(".chk");
    if(c){const i=+c.dataset.q,v=$("#in"+i,root).value,ok=evalQ(items[i],v);if(ok)state[i]=true;fb(i,ok);update()}
  });
  root.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.matches("input[type=text]")){const c=$(`.chk[data-q="${e.target.dataset.q}"]`,root);if(c)c.click()}});
}
function mountDeck(root,cards){
  let queue,pos,flip,known,missed;
  function start(list){queue=list;pos=0;flip=false;known=0;missed=[];draw()}
  function next(){pos++;flip=false;draw()}
  function draw(){
    if(pos>=queue.length){
      root.innerHTML=`<div class="deck"><div class="prog"><i style="width:100%"></i></div><div class="eyebrow">Deck finished</div><div class="score">${known}/${queue.length}</div><p>You marked ${known} cards as known.</p><div class="row">${missed.length?`<button class="btn pri" id="rv">Review ${missed.length} missed</button>`:""}<button class="btn ${missed.length?"":"pri"}" id="rs">Restart deck</button></div></div>`;
      PROJ.refresh("deck");const rv=$("#rv",root);if(rv)rv.addEventListener("click",()=>start(missed.slice()));
      $("#rs",root).addEventListener("click",()=>start(shuffle(cards)));return;
    }
    const c=queue[pos];
    const cardV=el=>{const cc=queue[pos];if(!cc){el.innerHTML="";return}el.innerHTML=`<div class="deck"><button class="fc ${flip?"back":""}" type="button" style="min-height:42vh"><span class="lab">${flip?"Answer":"Question"}${cc[2]?" · lesson "+cc[2]:""}</span><span>${F(flip?cc[1]:cc[0])}</span></button></div>`;el.querySelector(".fc").onclick=()=>{flip=!flip;draw()}};
    root.innerHTML=`<div class="deck"><div class="deckbar"><span>Card ${pos+1} of ${queue.length}${c[2]?" · lesson "+c[2]:""}</span><span>Known: ${known}</span></div><div class="prog"><i style="width:${pos/queue.length*100}%"></i></div>
<button class="fc ${flip?"back":""}" id="fc" type="button"><span class="lab">${flip?"Answer":"Question"}</span><span>${F(flip?c[1]:c[0])}</span></button>
<div class="row" style="margin-top:14px">${flip?`<button class="btn" id="ag">Still learning</button><button class="btn pri" id="gt">Got it</button>`:`<button class="btn pri" id="sh">Show answer</button>`}<button class="btn sm" id="sf">Shuffle</button></div></div>`;
    addPJ($(".deckbar",root),()=>PROJ.show("deck",cardV));PROJ.refresh("deck");
    const flipIt=()=>{flip=true;draw()};
    $("#fc",root).addEventListener("click",()=>{flip=!flip;draw()});
    const sh=$("#sh",root);if(sh)sh.addEventListener("click",flipIt);
    const gt=$("#gt",root);if(gt){gt.addEventListener("click",()=>{known++;next()});$("#ag",root).addEventListener("click",()=>{missed.push(c);next()})}
    $("#sf",root).addEventListener("click",()=>start(shuffle(queue.slice(pos))));
  }
  start(cards.slice());
}

/* ---------- lesson ---------- */
/* ---------- lesson page: stage-by-stage slides (modelled on the teacher's PowerPoint lessons) ---------- */
const STAGES=[["engage","Engage"],["explain","Explore & Explain"],["practise","Practise"],["play","Play"],["reflect","Reflect"]];
const FIGWIDE=k=>/^COV_(SINGLE|MULTI)$/.test(k)||/_WIDE$/.test(k);
function splitNotes(l){
  const parts=l.notes.split(/<h4>/),out=[];
  if(parts[0].trim())out.push({title:l.t,body:parts[0],ext:false});
  parts.slice(1).forEach(p=>{const i=p.indexOf("</h4>");let t=p.slice(0,i);const ext=/extended/i.test(t);
    t=t.replace(/<i>\s*\(?[^<]*Extended[^<]*\)?\s*<\/i>/i,"").replace(/\s*\(Extended( only)?\)/i,"").trim();
    out.push({title:t,body:p.slice(i+5),ext})});
  return out;
}
function figsOf(body){const f=[];const text=body.replace(/\{\{(\w+)\}\}/g,(m,k)=>{f.push(k);return ""});return{text,f}}
function parseSteps(html){
  const d=document.createElement("div");d.innerHTML=F(html);
  const ol=d.querySelector("ol,ul");let lead="",items=[];
  if(ol){[...d.children].forEach(c=>{if(c===ol)return;if(c.tagName==="P"&&!items.length&&c.compareDocumentPosition(ol)&4)lead+=`<p class="lead" style="margin:0 0 10px">${c.innerHTML}</p>`});items=[...ol.children].map(li=>li.innerHTML)}
  else items=[...d.children].map(c=>c.innerHTML);
  return{lead,items};
}
const stepsHTML=a=>`<div class="steps">${a.map((t,i)=>`<div class="step"><span class="n">${i+1}</span><div class="t"><p>${t}</p></div></div>`).join("")}</div>`;

/* ---------- optional picture gallery (Notes/<code>/<lesson>/Gallery) ---------- */
let galList=[];
function bindGallery(root){
  const th=$$(".gthumb",root);if(!th.length)return;
  th.forEach(b=>b.addEventListener("click",()=>openGal(+b.dataset.gi)));
}
function openGal(i){
  const list=galList;if(!list.length)return;
  let ov=$("#galov");if(ov)ov.remove();
  ov=document.createElement("div");ov.id="galov";ov.className="galov";document.body.appendChild(ov);
  const nm=f=>f.name.replace(/\.[^.]+$/,"").replace(/^\d+[\s._-]+/,"").replace(/</g,"&lt;");
  function paint(){
    const f=list[i];
    ov.innerHTML=`<div class="galbar"><b>${nm(f)}</b><span class="meta">${i+1} of ${list.length}</span><button class="btn" type="button" id="gprev">← Previous</button><button class="btn" type="button" id="gnext">Next →</button><button class="btn pri" type="button" id="gpj">Project</button><button class="btn" type="button" id="gx">Close</button></div><div class="galview"><img src="${window.lotsDesktop.url(f.rel)}" alt=""></div>`;
    $("#gprev",ov).onclick=()=>{i=(i+list.length-1)%list.length;paint()};
    $("#gnext",ov).onclick=()=>{i=(i+1)%list.length;paint()};
    $("#gx",ov).onclick=close;
    $("#gpj",ov).onclick=()=>PROJ.show("lib",el=>{el.innerHTML=libView(list[i],1)});
  }
  function key(e){if(e.key==="Escape")close();else if(e.key==="ArrowRight")$("#gnext",ov).click();else if(e.key==="ArrowLeft")$("#gprev",ov).click()}
  function close(){document.removeEventListener("keydown",key);ov.remove()}
  document.addEventListener("keydown",key);paint();
}

/* ---------- learner: export a lesson's notes as PDF or Word ---------- */
function nxInline(n){
  let o="";
  n.childNodes.forEach(c=>{
    if(c.nodeType===3)o+=c.textContent.replace(/\s+/g," ");
    else if(c.nodeType===1){const t=c.tagName;
      if(t==="B"||t==="STRONG")o+="**"+nxInline(c)+"**";
      else if(t==="SUB")o+="~"+c.textContent+"~";
      else if(t==="SUP")o+="^"+c.textContent+"^";
      else if(t==="BR")o+="\n";
      else if(t==="SVG"||t==="svg"||t==="IMG"){}
      else o+=nxInline(c)}
  });
  return o;
}
/* pictures for Word and PDF: always PNG or JPEG (WebP and others are redrawn), at most 1400 px */
function nxStdImg(src){return new Promise(r=>{if(!src)return r(null);const i=new Image();i.onload=()=>{const w=i.naturalWidth,h=i.naturalHeight;if(!w||!h)return r(null);const m=Math.min(1,1400/Math.max(w,h));
  if(/^data:image\/(png|jpe?g);/i.test(src)&&m===1)return r({dataUrl:src,w,h});
  try{const c=document.createElement("canvas");c.width=Math.max(1,Math.round(w*m));c.height=Math.max(1,Math.round(h*m));const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(i,0,0,c.width,c.height);
    const png=/^data:image\/(png|svg|gif)/i.test(src)||/\.(png|svg|gif)$/i.test(src);r({dataUrl:c.toDataURL(png?"image/png":"image/jpeg",0.9),w:c.width,h:c.height})}catch(e){r(null)}};i.onerror=()=>r(null);i.src=src})}
/* picture width on the page: true size for diagrams cut from papers (data-in = width in inches), otherwise from the pixel size */
const nxPct=(im,z)=>{const inch=parseFloat(im.getAttribute&&im.getAttribute("data-in"));if(inch)return Math.max(15,Math.min(85,Math.round(inch/6.3*100*0.85)));return Math.min(80,Math.max(25,Math.round(z.w/7.5)))};
const nxInlineOnly=el=>[...el.childNodes].every(n=>n.nodeType===3||n.nodeType===8||(n.nodeType===1&&/^(B|I|EM|STRONG|SUB|SUP|SPAN|A|BR|SMALL|U|MARK|CODE|ABBR)$/.test(n.tagName)));
function nxImgSize(src){return new Promise(r=>{const i=new Image();i.onload=()=>r({w:i.naturalWidth,h:i.naturalHeight});i.onerror=()=>r(null);i.src=src})}
async function nxBlocks(root,out){
  for(const el of [...root.children]){
    const t=el.tagName;
    if(t==="P"){const x=nxInline(el).trim();if(x)out.push({t:"p",text:x})}
    else if(t==="UL"||t==="OL"){const it=[...el.children].map(li=>nxInline(li).trim()).filter(Boolean);if(it.length)out.push({t:t==="UL"?"ul":"ol",items:it})}
    else if(/^H[3-6]$/.test(t)){const x=nxInline(el).trim();if(x)out.push({t:"h",l:3,text:x})}
    else if(t==="TABLE"){const rows=[...el.querySelectorAll("tr")].map(r=>[...r.children].map(c=>nxInline(c).trim()));if(rows.length){const hd=el.querySelector("th")?rows.shift():null;out.push({t:"table",head:hd,rows,fontSize:9})}}
    else if(t==="svg"||t==="SVG"||el.querySelector&&el.querySelector(":scope > svg")&&!el.textContent.trim()){
      try{const sv=t.toLowerCase()==="svg"?el:el.querySelector("svg"),fw=parseFloat((el.style&&el.style.maxWidth)||(el.closest&&el.closest("figure")&&el.closest("figure").style.maxWidth)||"")||((sv.viewBox&&sv.viewBox.baseVal&&sv.viewBox.baseVal.width)||400);
        const r=await HUBDOC.svgToPng(sv,600);out.push({t:"img",dataUrl:r.dataUrl,w:r.w,h:r.h,widthPct:Math.max(25,Math.min(70,Math.round(fw/7)))})}catch(e){}}
    else if(t==="IMG"&&el.getAttribute("src")){const z=await nxStdImg(el.getAttribute("src"));if(z)out.push({t:"img",dataUrl:z.dataUrl,w:z.w,h:z.h,widthPct:nxPct(el,z),caption:/question paper/i.test(el.getAttribute("alt")||"")?"":(el.getAttribute("alt")||"")})}
    else if(t==="FIGURE"&&el.querySelector("img")&&!el.querySelector("svg")){const im=el.querySelector("img"),cap=el.querySelector("figcaption"),z=await nxStdImg(im.getAttribute("src")||"");if(z)out.push({t:"img",dataUrl:z.dataUrl,w:z.w,h:z.h,widthPct:nxPct(im,z),caption:cap?nxInline(cap).trim():(/question paper/i.test(im.getAttribute("alt")||"")?"":(im.getAttribute("alt")||""))})}
    else if((t==="DIV"||t==="ASIDE"||t==="SECTION")&&nxInlineOnly(el)&&el.textContent.trim()){const fb=el.firstChild&&el.firstChild.nodeType===1&&/^(B|STRONG)$/.test(el.firstChild.tagName)?el.firstChild:null,c=el.cloneNode(true);if(fb)c.removeChild(c.firstChild);const tx=nxInline(c).trim(),title=fb?fb.textContent.trim():"";
      if(fb||/key|tip|note|warn|box|rem/.test(el.className||""))out.push({t:"box",tone:/warn|safe/.test(el.className||"")?"warn":"info",title,text:tx});else if(tx)out.push({t:"p",text:tx})}
    else if(el.children.length)await nxBlocks(el,out);
    else{const x=nxInline(el).trim();if(x)out.push({t:"p",text:x})}
  }
}
async function exportNotes(l,u,secs,fmt,btn){
  const msg=$("#nxmsg"),say=m=>{if(msg)msg.textContent=m};
  btn.disabled=true;say("Building your notes…");
  try{
    const nm=(window.HUBSET&&HUBSET.get().learner&&HUBSET.get().learner.name)||"";
    const blocks=[];
    blocks.push({t:"p",text:`${SUB.title}  |  Topic ${u.n}: ${plain(u.name)}`,size:10,color:"555555"});
    if(nm)blocks.push({t:"p",text:"Notes for "+nm,size:10,color:"555555"});
    blocks.push({t:"p",text:l.sum?plain(l.sum):"",italic:true});
    for(const s of secs){
      blocks.push({t:"h",l:2,text:plain(s.title)+(s.ext?" (Extended)":"")});
      const d=document.createElement("div");
      const fg=figsOf(s.body);
      d.innerHTML=F(fg.text);
      await nxBlocks(d,blocks);
      for(const k of fg.f){if(!FIGS[k])continue;const h=document.createElement("div");h.innerHTML=FIGS[k]();await nxBlocks(h,blocks)}
    }
    const cards=(l.cards||[]);
    if(cards.length){blocks.push({t:"h",l:2,text:"Key terms to remember"});blocks.push({t:"table",head:["Term or question","Answer"],rows:cards.map(c=>[plain(c[0]),plain(c[1])]),widths:[40,60],fontSize:9})}
    const model={title:plain(l.t),footer:`${SUB.title} | Lesson ${l.no} | ${plain(l.t)}`,blocks};
    const fn=("Notes - "+SUB.code+" "+l.no+" "+plain(l.t)).replace(/[^\w .-]+/g,"").trim().slice(0,80);
    const data=fmt==="docx"?await HUBDOC.docx(model):await HUBDOC.pdf(model);
    const r=await saveFile(fn+"."+fmt,data);
    say(r==="saved"?"Saved. Check your Downloads folder.":r==="declined"?"":"Could not save the file.");
  }catch(e){console.error(e);say("Sorry, the notes could not be built.")}
  btn.disabled=false;
}

/* ---------- Master hub: notes export (learner handout or teacher version) with the school name and logo from Settings ---------- */
const nxFirst=(html,n)=>{const d=document.createElement("div");d.innerHTML=F(String(html||"").replace(/\{\{\w+\}\}/g,""));const ps=[...d.querySelectorAll("p")].map(p=>p.textContent).join(" ")||d.textContent;const t=ps.replace(/\s+/g," ").trim();const ss=t.match(/[^.?!]+[.?!]+/g)||[t];return ss.slice(0,n||2).join(" ").trim().slice(0,400)};
async function exportNotesT(l,u,secs,who,fmt,say){
  const T=who==="teacher",SET=HUBSET.get(),school=(SET.teacher&&SET.teacher.school||"").trim();
  const logoSrc=(SET.assess&&SET.assess.logo)||(typeof ASSESS_LOGO!=="undefined"?ASSESS_LOGO:"");
  let M=null;try{const i=LS.indexOf(l);const ctx={l,u,U:SUBJ[subKey].units,sub:subKey,SUB,secs,prev:i>0?LS[i-1]:null,F};M=X4.model(ctx)}catch(e){console.warn(e)}
  const act=M?(M.acts.find((x,j)=>String(j)===String(M.S.act))||M.acts[0]||null):null;
  const B=[];
  /* header: logo, school, subject */
  if(logoSrc){const z=await nxStdImg(logoSrc);if(z)B.push({t:"img",dataUrl:z.dataUrl,w:z.w,h:z.h,widthPct:Math.round(Math.min(16,16*z.w/z.h))})}
  if(school)B.push({t:"p",text:school,bold:true,size:15,align:"center",after:20});
  B.push({t:"p",text:`${SUB.title}  |  Topic ${u.n}: ${plain(u.name)}`,size:10,color:"555555",align:"center"});
  B.push({t:"band",text:`Lesson ${l.no}: ${plain(l.t)}${T?"  ·  Teacher version":""}`});
  if(!T)B.push({t:"p",text:"Name: ________________________________   Class: ____________   Date: ____________",size:10});
  else if(M){try{const P=X4.plan(M,M.ctx||{l,u,sub:subKey,SUB,secs});if(P&&P.total)B.push({t:"kv",pairs:[["Lesson time","About "+P.total+" minutes"],["Big question",plain(M.hook.q)]]})}catch(e){B.push({t:"kv",pairs:[["Big question",plain(M.hook.q)]]})}}
  if(l.sum)B.push({t:"p",text:plain(l.sum),italic:true});
  /* key terms */
  const kt=window.GL?GL.terms(l):[];
  if(kt.length){B.push({t:"h",l:2,text:"Key terms"});B.push({t:"table",head:["Term","Meaning"],rows:kt.map(x=>[plain(x[0]),plain(x[1])]),widths:[32,68],fontSize:9.5,firstColBold:true})}
  /* teacher: hook, connector and the chosen activity */
  if(T&&M){
    B.push({t:"h",l:2,text:"Starting the lesson"});
    if(M.conn)B.push({t:"box",tone:"info",title:"Connector ("+M.conn.m+" min): "+plain(M.conn.from),text:plain(M.conn.q)+"  "+plain(String(M.conn.task).replace(/<br\s*\/?>/g," "))});
    B.push({t:"box",tone:"info",title:"Hook question",text:plain(M.hook.q)});
    if(M.hook.ans)B.push({t:"p",text:"Answer to look for: "+plain(M.hook.ans)});
    if(act){B.push({t:"h",l:2,text:"Explore activity: "+plain(act.t)});
      B.push({t:"kv",pairs:[["Time",act.m+" minutes"],["Materials",act.mat.map(plain).join("; ")]]});
      if(act.safety)B.push({t:"box",tone:"warn",title:"Safety",text:plain(act.safety)});
      B.push({t:"ol",items:act.st.map(plain)});
      if(act.study)act.study.split(/\n+/).forEach(pp=>B.push({t:"box",tone:"info",text:plain(pp)}));
      if(act.src)B.push({t:"p",text:"Source: "+plain(act.src),size:8,color:"666666"});
      if(act.cards&&act.cards.length&&act.o&&act.o.pairs)B.push({t:"table",head:["Term","Meaning"],rows:act.cards.map(c=>[plain(c[0]),plain(c[1])]),widths:[35,65],fontSize:9});
      else if(act.cards&&act.cards.length&&act.cats)B.push({t:"table",head:["Card","Goes in"],rows:act.cards.map(c=>[plain(c[0]),plain(c[1])]),widths:[60,40],fontSize:9});
      if(act.ans&&act.ans.length){B.push({t:"h",l:3,text:"Answers"});B.push({t:"ol",items:act.ans.map(plain)})}}
  }
  /* the notes, part by part, with diagrams and pictures */
  B.push({t:"h",l:2,text:"Notes"});
  for(let i=0;i<secs.length;i++){const s=secs[i],pt=M&&M.parts[i];
    B.push({t:"h",l:3,text:plain(s.title)+(s.ext?" (Extended)":"")});
    if(T&&pt){B.push({t:"box",tone:"info",title:"Guiding question",text:plain(pt.q)});if(pt.txt)B.push({t:"p",text:"Task ("+pt.m+" min): "+plain(pt.txt),size:9.5,color:"444444"})}
    const d=document.createElement("div"),fg=figsOf(s.body);d.innerHTML=F(fg.text);await nxBlocks(d,B);
    for(const k of fg.f){if(!FIGS[k])continue;const h=document.createElement("div");h.innerHTML=FIGS[k]();await nxBlocks(h,B)}
  }
  /* pictures from the content folder (desktop app) */
  if(DESK.on){try{const fs=(window.lotsDesktop.walk("Notes/"+SUB.code+"/"+l.no)||[]).filter(f=>!/\/Gallery\//i.test(f.rel)&&libKind(f.name)==="img").slice(0,12);
    if(fs.length){B.push({t:"h",l:2,text:"Pictures"});let miss=0;
      for(const f of fs){const z=await nxStdImg(window.lotsDesktop.url(f.rel));if(z)B.push({t:"img",dataUrl:z.dataUrl,w:z.w,h:z.h,widthPct:75,caption:f.name.replace(/\.[^.]+$/,"").replace(/^\d+[\s._-]+/,"")});else miss++}
      if(miss)say("Note: "+miss+" picture(s) from the content folder could not be added.")}}catch(e){}}
  /* summary and summary questions */
  if(M&&M.sum&&M.sum.length){B.push({t:"h",l:2,text:"Summary"});B.push({t:"ul",items:M.sum.map(plain)})}
  const Q=[],seen=new Set(),addQ=(q,a)=>{const k=plain(q).toLowerCase();if(!k||seen.has(k))return;seen.add(k);Q.push([q,a])};
  if(M){M.parts.forEach((p,i)=>addQ(p.q,nxFirst(secs[i]&&secs[i].body,2)));let nc=0;M.parts.forEach(p=>p.chk.forEach(c=>{if(nc++<6)addQ(/[?.:]$/.test(plain(c[0]))||plain(c[0]).split(" ").length>6?c[0]:"What is meant by “"+plain(c[0])+"”?",c[1])}))}
  else (l.cards||[]).forEach(c=>addQ(c[0],c[1]));
  if(M)addQ(M.hook.q,M.hook.ans);
  if(Q.length){B.push({t:"pb"});B.push({t:"h",l:2,text:"Summary questions"});
    Q.forEach((q,i)=>{B.push({t:"q",label:String(i+1),text:plain(q[0])});if(T)B.push({t:"p",text:"Answer: "+plain(q[1]||"See the notes."),size:9.5,color:"0E5C4A",indent:340});else B.push({t:"lines",n:3})})}
  const ver=T?"Teacher version":"Learner handout";
  const model={title:"",meta:plain(l.t)+" | "+ver,footer:`${school?school+" | ":""}${SUB.title} | Lesson ${l.no} | ${ver}`,blocks:B};
  const fn=("Notes - "+SUB.code+" "+l.no+" "+plain(l.t)+" - "+ver).replace(/[^\w .-]+/g,"").trim().slice(0,90);
  const data=fmt==="docx"?await HUBDOC.docx(model):await HUBDOC.pdf(model);
  return await saveFile(fn+"."+fmt,data);
}
function notesDialog(l,u,secs){
  const SET=HUBSET.get(),school=(SET.teacher&&SET.teacher.school)||"",hasLogo=!!(SET.assess&&SET.assess.logo);
  const ov=document.createElement("div");ov.className="x4ov";
  ov.innerHTML=`<div class="x4dlg" role="dialog" aria-label="Export notes"><div class="x4dlg-h"><h2>Export notes: ${F(l.t)}</h2><button class="btn sm" type="button" data-close>Close</button></div>
<p class="mute" style="margin-top:0">Both versions have the key terms, the notes with their diagrams and pictures, and summary questions at the end.</p>
<div class="nxrow"><div><b>Learner handout</b><span class="mute">Space for name and class. Summary questions with lines to write on.</span></div><div class="row" style="gap:8px"><button class="btn pri" type="button" data-w="learner" data-f="pdf">PDF</button><button class="btn" type="button" data-w="learner" data-f="docx">Word</button></div></div>
<div class="nxrow"><div><b>Teacher version</b><span class="mute">Adds the hook, guiding questions, tasks, the chosen Explore activity and all the answers.</span></div><div class="row" style="gap:8px"><button class="btn pri" type="button" data-w="teacher" data-f="pdf">PDF</button><button class="btn" type="button" data-w="teacher" data-f="docx">Word</button></div></div>
<p class="mute">Header: <b>${school?F(school):"no school name yet"}</b> with ${hasLogo?"your school logo":"the built-in logo"}. Change these in Settings, under Teacher and Assessments.</p>
<p class="mute" id="nx-m" role="status"></p></div>`;
  document.body.appendChild(ov);
  const close=()=>ov.remove();ov.querySelector("[data-close]").onclick=close;ov.addEventListener("click",e=>{if(e.target===ov)close()});ov.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  const m=ov.querySelector("#nx-m"),say=t=>{m.textContent=t};
  $$("[data-w]",ov).forEach(b=>b.onclick=async()=>{$$("[data-w]",ov).forEach(x=>x.disabled=true);say("Building the "+(b.dataset.w==="teacher"?"teacher version":"learner handout")+"…");
    try{const r=await exportNotesT(l,u,secs,b.dataset.w,b.dataset.f,say);if(r==="saved")say((m.textContent.startsWith("Note:")?m.textContent+" ":"")+"Saved. Check your Downloads folder.");else if(r==="declined")say("");else say("Could not save the file.")}
    catch(e){console.error(e);say("Sorry, the notes could not be built.")}
    $$("[data-w]",ov).forEach(x=>x.disabled=false)});
  setTimeout(()=>{const b=ov.querySelector("[data-w]");b&&b.focus()},30);
}

/* ---------- teacher: project an end-of-lesson summary and check on the board ---------- */
function projEnd(l,u){
  const cards=(l.cards||[]).filter(c=>c&&c[0]&&c[1]).slice(0,5);
  const qs=cards.map((c,i)=>`<details class="pj-q"><summary><b>${i+1}.</b> ${F(c[0])}</summary><p class="pj-a">${F(c[1])}</p></details>`).join("");
  const html=`<style>.pj-end h1{margin:0 0 4px}.pj-q{border:2px solid #8886;border-radius:12px;padding:10px 16px;margin:10px 0;font-size:1.15em}.pj-q summary{cursor:pointer}.pj-a{margin:8px 0 2px;color:#0a6c74;font-weight:600}.pj-tl{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px}.pj-tl div{border-radius:14px;padding:14px;color:#fff;font-weight:700;text-align:center}</style>
<div class="pj-end"><div class="eyebrow">End of lesson | ${l.no} ${plain(u.name)}</div><h1>${F(l.t)}</h1><p class="lead">${F(l.sum||"")}</p>
<h2>Check your learning</h2>${qs||"<p>Ask the class to explain the main idea in one sentence.</p>"}
<h2>How confident are you?</h2><p>Show a colour with your hand or a card.</p><div class="pj-tl"><div style="background:#2f9e63">Green<br><small>I can explain it to a friend</small></div><div style="background:#d98a00">Amber<br><small>I can do it with some help</small></div><div style="background:#d9482b">Red<br><small>I need more help</small></div></div>
<h2>Before you leave</h2><ul><li>Write one thing you learned and one question you still have.</li><li>Pack away neatly and tidy your area.</li></ul></div>`;
  PROJ.showHTML(html);
}
function viewLesson(key){
  const l=LS.find(x=>x.key===key);if(!l)return notFoundHome();
  if(curLesson!==key){lessonTab=(window.HUBSET&&HUBSET.get().lesson.start)||"engage";curLesson=key}
  if(window.GL&&GL.pending(key))lessonTab="explain";
  if(lessonTab==="explore")lessonTab="explain";if(!STAGES.some(s=>s[0]===lessonTab))lessonTab="engage";{const hd=(window.HUBSET&&HUBSET.get().lesson.hide)||[];if(hd.includes(lessonTab))lessonTab=(STAGES.find(s=>!hd.includes(s[0]))||STAGES[0])[0]}
  S.last=key;save();
  S.crit=S.crit||{};
  const u=l.u,i=LS.indexOf(l),prev=LS[i-1],nxt=LS[i+1],nIn=u.lessons.length;
  const secs=splitNotes(l);
  const tag=`Lesson ${l.no} | ${F(l.t)}`;
  app.innerHTML=`<div style="--c:${u.col};--on:${u.on}">
<section class="deck-hero">${typeof pracBanner==="function"?pracBanner(l,subKey):""}<div class="herotop"><span class="pill">Lesson ${l.idx+1} of ${nIn}</span><span class="row" style="gap:8px;flex-wrap:wrap"><button class="btn" id="expl" type="button">Export PowerPoint</button>${HUB.teacher?`<button class="btn" id="nxopen" type="button">Export notes</button><a class="btn" href="#plan" data-plan="${l.key}">Lesson plan</a>`:""}<button class="btn" id="done" type="button"></button></span></div>
<div class="crumb2"><a href="#home">Topics</a> / <a href="#u${u.n}">Topic ${u.n}: ${F(u.name)}</a></div>
<h1>${F(l.t)}</h1><p class="sub">${F(l.sum)}</p>
<div class="meta2"><b>${SUB.title}</b> &nbsp;|&nbsp; Topic ${u.n}: ${F(u.name)}</div>${typeof sylBlock==="function"?sylBlock(l,subKey):""}
</section>
<div class="x4hdr" id="x4hdr"><div class="hdr-1"><div class="stages" role="tablist" aria-label="Lesson stages">${STAGES.map((s,n)=>`<button class="stg tab" role="tab" data-t="${s[0]}" aria-selected="${s[0]===lessonTab}"><small>${n+1}</small>${s[1]}</button>`).join("")}</div><select class="x4dd" id="x4dd" aria-label="Lesson stage">${STAGES.map(s=>`<option value="${s[0]}"${s[0]===lessonTab?" selected":""}>${s[1]}</option>`).join("")}</select></div><div class="hdr-2"><nav class="x4secs" id="x4secs" aria-label="Sections of this stage"></nav><span class="x4dock" id="x4dock" aria-hidden="true"></span><div class="x4opts" id="x4opts"></div></div></div>
<div id="panel" class="panel" style="padding-top:0"></div>
<div class="pager">${prev?`<a class="btn" href="#l${prev.key}">← ${F(prev.t)}</a>`:"<span></span>"}${nxt?`<a class="btn pri" href="#l${nxt.key}">${F(nxt.t)} →</a>`:`<a class="btn pri" href="#home">Back to topics</a>`}</div></div>`;
  const db=$("#done");
  function doneLabel(){db.textContent=S.done[key]?"Completed ✓":"Mark lesson as done";db.classList.toggle("pri",!!S.done[key])}
  doneLabel();
  $("#expl").addEventListener("click",e=>runExport(e.currentTarget,()=>exportLessonPPTX(l,u,SUB)));
  {const nb=$("#nxopen");if(nb)nb.addEventListener("click",()=>notesDialog(l,u,secs))}
  const dpl=$("[data-plan]");if(dpl)dpl.addEventListener("click",()=>{planPick=l.key});
  db.addEventListener("click",()=>{S.done[key]=!S.done[key];save();doneLabel()});
  function go(t){lessonTab=t;$$(".stg").forEach(x=>x.setAttribute("aria-selected",String(x.dataset.t===t)));const dd=$("#x4dd");if(dd)dd.value=t;panel();const h=$("#x4hdr");if(h&&window.scrollY>h.offsetTop)window.scrollTo(0,h.offsetTop-8)}
  $$(".stg").forEach(b=>b.addEventListener("click",()=>go(b.dataset.t)));
  {const dd=$("#x4dd");if(dd)dd.addEventListener("change",()=>{const b=$(`.stg[data-t="${dd.value}"]`);if(b)b.click();else go(dd.value)})}
  const slide=(cls,pill,pc,title,body,foot,extra)=>`<section class="slide ${cls}"><div class="sl-top"><span class="pill ${pc}">${pill}</span>${extra||""}<span class="tag">${tag}</span></div>${title?`<h2 class="sl-title">${title}</h2>`:""}${body}${foot?`<p class="sl-foot">${foot}</p>`:""}</section>`;
  const nextBtn=t=>{const k=STAGES.findIndex(s=>s[0]===t);const nx=k<STAGES.length-1?`<button class="btn pri" data-go="${STAGES[k+1][0]}" type="button">Next: ${STAGES[k+1][1]} →</button>`:"";const ep=HUB.teacher?`<button class="btn" data-endproj="1" type="button" title="Show the end-of-lesson check on the projector">Project: end lesson and check learners</button>`:"";return nx||ep?`<div class="stagenav">${ep||"<span></span>"}${nx}</div>`:""};
  function panel(){
    const p=$("#panel");let h="";
    const core=secs.filter(s=>!s.ext),ext=secs.filter(s=>s.ext);
    if(lessonTab==="engage"){
      const objs=secs.filter(s=>s.title!==l.t||secs.length===1);
      h+=slide("","Learning objectives","",`What you will learn`,`<p class="lead">${F(l.sum)} By the end of this lesson you should be able to explain each idea below.</p><div class="lcards">${objs.map((s,n)=>`<div class="lcard ${s.ext?"x":""}"><span class="pill ${s.ext?"pur":""}">${s.ext?"Extended":n+1}</span><div>${F(s.title)}</div></div>`).join("")}</div>`,"Core ideas are for everyone. Extended (Supplement) ideas are for Extended candidates.");
      const mk=(arr,ex,off)=>arr.map((s,n)=>[`I can explain and use the ideas in “${F(s.title)}”.`,off+n]);
      const coreC=mk(core.filter(s=>s.title!==l.t||secs.length===1),0,0).concat([["I can score at least 80% on the practice questions at the end of the lesson.",90]]);
      const extC=mk(ext,1,40).concat(ext.length?[]:[[SUB.keyIdea,41]]).concat([["I can answer exam-style questions on this topic and use the mark scheme to improve.",42]]);
      const cb=a=>a.map(c=>`<label><input type="checkbox" data-c="${c[1]}" ${S.crit[key+":"+c[1]]?"checked":""}><span>${c[0]}</span></label>`).join("");
      {const kt=window.GL?GL.keyTermsHTML(l):"";if(kt)h+=slide("","Key terms","","Words to know in this lesson",`<div id="gl-ktbox">${kt}</div>`)}
      h+=slide("","Success criteria","","How we will know we have got there",`<div class="crit"><div class="critbox"><h3>Core: I can …</h3>${cb(coreC)}</div><div class="critbox x"><h3>Extended (Supplement): I can …</h3>${cb(extC)}</div></div>`,"Traffic-light yourself now, then again at the end of the lesson. Ticks are saved in this browser.");
      const b=l.ibl,st=parseSteps(b.task);
      h+=slide("ibl","IBL | Engage","red",F(b.q),`<div class="iblgrid"><div>${st.lead}${stepsHTML(st.items)}</div><div><div class="sidebox"><h5>Evidence to keep</h5><p>Write your thinking here before you read the notes. We return to it in the plenary.</p><textarea id="jr" aria-label="Your working" placeholder="Your working (saved in this browser)"></textarea></div></div></div>`,"Inquiry-based learning: ask, predict, test and explain before the teacher confirms.",`<span class="tag" style="margin-right:auto;margin-left:8px">Starter: wonder first</span>`);
      h+=nextBtn("engage");
    }else if(lessonTab==="explain"){
      let xh="";{let h="";
      if(DESK.on){const nfs=window.lotsDesktop.walk("Notes/"+SUB.code+"/"+l.no)||[],ttl=f=>f.name.replace(/\.[^.]+$/,"").replace(/^\d+[\s._-]+/,"").replace(/</g,"&lt;"),isG=f=>/\/Gallery\//i.test(f.rel);
        const LS=(window.HUBSET&&HUBSET.get().lesson)||{maxInline:99,gallery:true,notes:true};
        let main=nfs.filter(f=>!isG(f)),extra=[];
        if(!LS.notes)main=[];
        else{const im=main.filter(f=>libKind(f.name)==="img");if(im.length>LS.maxInline){const keep=new Set(im.slice(0,LS.maxInline));extra=im.filter(f=>!keep.has(f));main=main.filter(f=>libKind(f.name)!=="img"||keep.has(f))}}
        main.forEach(f=>{h+=slide("","Your notes","",ttl(f),libView(f,0),"From your content folder: Notes/"+SUB.code+"/"+l.no)});
        const gl=LS.gallery&&LS.notes?extra.concat(nfs.filter(f=>isG(f)&&libKind(f.name)==="img")):[];galList=gl;
        if(gl.length)h+=slide("gal","Gallery","pur","Gallery: "+gl.length+" more picture"+(gl.length>1?"s":""),`<p class="lead">Optional extra pictures for this lesson. Click one to enlarge it, then use Project to show it on the board.</p><details class="galbox"><summary class="btn" style="display:inline-block;cursor:pointer">Show the gallery</summary><div class="galgrid">${gl.map((f,i)=>`<button type="button" class="gthumb" data-gi="${i}"><img loading="lazy" src="${window.lotsDesktop.url(f.rel)}" alt=""><span>${ttl(f)}</span></button>`).join("")}</div></details>`,"These pictures are in: Notes/"+SUB.code+"/"+l.no+"/Gallery")}
      if(!HUB.teacher)h+=`<section class="slide notesx"><div class="sl-top"><span class="pill">Take it with you</span><span class="tag">${tag}</span></div><h2 class="sl-title">Download these notes</h2><p class="lead">Make a copy of this lesson’s notes to study offline or print. Your own name goes on the top.</p><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri" type="button" data-nx="pdf">Download as PDF</button><button class="btn" type="button" data-nx="docx">Download as Word (.docx)</button><span class="meta" id="nxmsg" role="status"></span></div></section>`;
      xh=h;}
      const secHTML=s=>{const fg=figsOf(s.body),solo=fg.f.filter(k=>!FIGWIDE(k)),wide=fg.f.filter(k=>FIGWIDE(k));const html=F(fg.text),side=solo.map(k=>FIGS[k]?FIGS[k]():"").join(""),below=wide.map(k=>FIGS[k]?FIGS[k]():"").join("");return `<div class="sl-body ${side?"two":""}"><div class="notes">${html}</div>${side?`<div>${side}</div>`:""}</div>${below}`};
      X4CTX={l,u,U,sub:subKey,SUB,secs,prev,nxt,F,secHTML,extra:xh?`<div class="x4extra">${xh}</div>`:"",projEnd:()=>projEnd(l,u),after:el=>{wrapTables(el);if(window.GL)GL.wrap(el.querySelector(".x4notes"),subKey,l.key)}};
      h+=X4.render(X4CTX);
      h+=nextBtn("explain");
    }else if(lessonTab==="practise"){
      const tot=l.ws.reduce((a,q)=>a+q[2],0);
      h+=slide("sq","Worksheet | Structured","navy",`${F(l.t)}: worksheet (${tot} marks)`,`<div class="qgrid">${l.ws.map((q,n)=>`<div class="qcard"><span class="qn">${n+1}</span><div><b>${F(q[0])}</b></div><span class="marks">[${q[2]}]</span></div>`).join("")}</div>`,"Write your answers on paper first, then open the mark scheme.");
      h+=slide("ms","Mark scheme","pur","Worksheet mark scheme",`<details><summary>Show the mark scheme</summary><div class="mgrid2" style="margin-top:12px">${l.ws.map((q,n)=>`<div class="mcard"><h5>Q${n+1} [${q[2]}]</h5>${F(q[1])}</div>`).join("")}</div></details>`,"One mark for each point in brackets. Mark your own work in a different colour.");
      h+=slide("sq","Practice | Instant feedback","navy","Quick questions",`<p class="lead">Type your answer and press Check, or choose an option.</p><div id="prm"></div>`,"");
      const cnt=u.pp.length;
      h+=slide("sq","Past paper | Topic questions","navy",`Exam-style questions: Topic ${u.n}`,`<p style="text-align:center;margin:0 0 12px">${cnt} questions on <b>${F(u.name)}</b>, including Cambridge past-paper questions, with a self-marking mark scheme.</p><p style="text-align:center;margin:0"><button class="btn pri" id="gopp" type="button">Open the Topic ${u.n} questions</button></p>`,"");
      h+=nextBtn("practise");
    }else if(lessonTab==="play"){
      const okM=l.pairs&&l.pairs.length>=4,okH=l.words&&l.words.length>=1,okJ=l.jokes&&l.jokes.length>=1;
      h+=slide("sq","Play | Match-up","navy",`Match-up: ${F(l.t)}`,okM?`<div id="pl-match"></div>`:`<p class="lead">This lesson has no match-up yet. Try the topic games instead.</p>`,"Tap an item on the left, then its partner on the right.");
      h+=slide("sq","Play | Word game","navy","Flask hangman: key words from this lesson",okH?`<div id="pl-hang"></div>`:`<p class="lead">This lesson has no word game yet.</p>`,"Guess the key word before the flask empties. Use the keyboard or tap the letters.");
      h+=slide("sq","Play | Joke","navy","Joke of the lesson",okJ?`<div id="pl-joke"></div>`:`<p class="lead">No joke for this lesson yet.</p>`,"A little humour helps the ideas stick.");
      h+=`<div class="row" style="gap:10px;flex-wrap:wrap;margin:6px 0 14px"><a class="btn" id="pl-gt" href="#games">More games for this topic</a><a class="btn" id="pl-jt" href="#jokes">More jokes for this topic</a><a class="btn" id="pl-ct" href="#cards">Flashcards for this lesson</a></div>`;
      h+=nextBtn("play");
    }else{
      h+=slide("sq","Flashcards","navy","Test yourself",`<div id="dk"></div>`,"Flip each card, then mark it as known or still learning.");
      const nl=nxt?`<div class="sidebox"><h5>Next lesson</h5><p>${F(nxt.t)}</p></div>`:"";
      h+=slide("ibl","IBL | Evaluate","red","Plenary: exit ticket",`<div class="iblgrid"><div>${stepsHTML([`<b>Answer your own question.</b> Go back to your Engage working. Which parts of “${F(l.ibl.q)}” can you now answer using evidence from the notes?`,`<b>3-2-1.</b> Write 3 key facts, 2 connections between ideas and 1 question you would like to investigate next.`,`<b>Concept map.</b> Link the key words from this lesson with arrows and a verb on every link.`,`<b>Self-assess.</b> Mark the worksheet with the mark scheme, then redo every lost mark in a different colour.`])}</div><div>${nl}<div class="sidebox"><h5>Bring</h5><p>Your concept map and your corrected answers.</p></div></div></div>`,"Inquiry-based learning: ask, predict, test and explain before the teacher confirms.");
    }
    if(lessonTab!=="explain")X4.leave();
    p.innerHTML=h;wrapTables(p);bindGallery(p);if(lessonTab==="explain")X4.bind(p);
    $$("[data-simopen]",p).forEach(b=>b.addEventListener("click",()=>{const hst=p.querySelector(`[data-simhost="${b.dataset.simopen}"]`);if(hst.firstChild){hst.innerHTML="";b.textContent="Open simulation"}else{simMount(hst,b.dataset.simopen);b.textContent="Close simulation"}}));
    $$("[data-simproj]",p).forEach(b=>b.addEventListener("click",()=>simProject(b.dataset.simproj)));
    $$("[data-endproj]",p).forEach(b=>b.addEventListener("click",()=>projEnd(l,u)));
    $$("[data-nx]",p).forEach(b=>b.addEventListener("click",()=>exportNotes(l,u,secs,b.dataset.nx,b)));
    $$("[data-go]",p).forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
    $$("input[data-c]",p).forEach(c=>c.addEventListener("change",()=>{S.crit[key+":"+c.dataset.c]=c.checked;save()}));if(window.GL)GL.bindKeyTerms($("#gl-ktbox",p));
    const gaP=$("#ga-print");if(gaP)gaP.onclick=()=>{const w=window.open("","_blank");if(!w){alert("Allow pop-ups to print.");return}w.document.write("<!doctype html><meta charset=utf-8><title>Group sheet</title><style>body{font:14px Arial;margin:24px}li{margin:4px 0}</style>"+window.__GA);w.document.close();w.print()};
    const jr=$("#jr");if(jr){jr.value=S.ibl[key]||"";let t;jr.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(()=>{S.ibl[key]=jr.value;save()},400)})}
    if($("#prm"))mountPractice($("#prm"),l.pr);
    if($("#dk"))mountDeck($("#dk"),l.cards.map(c=>[c[0],c[1],l.no]));
    if($("#pl-match"))mountMatch($("#pl-match"),{lesson:{title:plain(l.t),pairs:l.pairs}},"lesson");
    if($("#pl-hang"))mountHang($("#pl-hang"),l.words);
    if($("#pl-joke")){let jn=0;const jr2=$("#pl-joke");const showJ=()=>{const j=l.jokes[jn%l.jokes.length];jr2.innerHTML=`<p class="big-joke" style="margin:0">${F(j[0])}</p><p class="punch big-joke" id="pl-pn" style="margin-top:12px;color:var(--accent)"></p><div class="row" style="margin-top:16px;gap:10px"><button class="btn pri" id="pl-rv" type="button">Show the punchline</button><button class="btn" id="pl-nx" type="button">Another joke</button></div>`;$("#pl-rv",jr2).addEventListener("click",()=>{$("#pl-pn",jr2).innerHTML=F(j[1]);$("#pl-rv",jr2).disabled=true});$("#pl-nx",jr2).addEventListener("click",()=>{jn++;showJ()});addPJ($("#pl-rv",jr2).parentElement,()=>PROJ.show("joke",el=>jokeV(el,j)))};showJ()}
    $$(".slide",p).forEach(sl=>{
      const top=$(".sl-top",sl);let fn=()=>PROJ.showNode(sl);
      if($("#dk",sl)||$("#pl-joke",sl))return;
      if($("#prm",sl))fn=()=>PROJ.show("prac",el=>{el.innerHTML=`<section class="slide sq" style="margin:0"><h2 class="sl-title">Quick questions</h2><div></div></section>`;mountPractice(el.querySelector("div"),l.pr)});
      else if($("#pl-match",sl))fn=()=>PROJ.show("game",el=>mountMatch(el,{lesson:{title:plain(l.t),pairs:l.pairs}},"lesson"));
      else if($("#pl-hang",sl))fn=()=>PROJ.show("game",el=>mountHang(el,l.words));
      addPJ(top,fn);
    });
    $$(".qcard",p).forEach((qc,n)=>{const q=l.ws[n];if(q)addPJ(qc,()=>projQ({head:"Worksheet | Question "+(n+1),q:F(q[0]),marks:q[2],ans:F(q[1])}))});
    const gt=$("#pl-gt");if(gt){gt.addEventListener("click",()=>{gameScope="u"+u.n});$("#pl-jt").addEventListener("click",()=>{gameScope="u"+u.n});$("#pl-ct").addEventListener("click",()=>{cardsSel="l"+key})}
    const gp=$("#gopp");if(gp)gp.addEventListener("click",()=>{papersSel="u"+u.n;location.hash="#"+subKey+"/papers"});
  }
  panel();
}

/* ---------- flashcards and papers pages ---------- */
function chipRow(sel,prefix,all){
  return `<div class="chips">${all.map(a=>`<button class="chip" data-v="${a[0]}" aria-pressed="${a[0]===sel}">${a[1]}</button>`).join("")}</div>`;
}
function unitChips(prefix,sel){return chipRow(sel,prefix,[["all","All topics"]].concat(U.map(u=>[prefix+u.n,"Topic "+u.n])))}
/* ---------- topic and lesson scope (flashcards, games, jokes) ---------- */
const scopeTopic=sc=>sc==="all"?"all":sc[0]==="u"?sc:"u"+sc.slice(1).split("-")[0];
const scopeLessons=sc=>sc==="all"?LS:sc[0]==="u"?LS.filter(l=>"u"+l.u.n===sc):LS.filter(l=>"l"+l.key===sc);
function scopeName(sc){
  if(sc==="all")return "all topics";
  if(sc[0]==="u"){const u=U.find(x=>"u"+x.n===sc);return u?"Topic "+u.n+": "+plain(u.name):"this topic"}
  const l=LS.find(x=>"l"+x.key===sc);return l?"Lesson "+l.no+": "+plain(l.t):"this lesson";
}
function scopeData(sc,kind){return [].concat(...scopeLessons(sc).map(l=>l[kind]||[]))}
function scopeBar(sc){
  const tp=scopeTopic(sc),u=U.find(x=>"u"+x.n===tp),ls=u?u.lessons:[];
  return `<div class="scope"><label>Topic<select id="sc-u"><option value="all"${tp==="all"?" selected":""}>All topics</option>${U.filter(x=>x.lessons.length).map(x=>`<option value="u${x.n}"${"u"+x.n===tp?" selected":""}>Topic ${x.n}: ${plain(x.name)}</option>`).join("")}</select></label><label>Lesson<select id="sc-l"${tp==="all"?" disabled":""}><option value="${tp}"${sc===tp?" selected":""}>All lessons in this topic</option>${ls.map(l=>`<option value="l${l.key}"${sc==="l"+l.key?" selected":""}>${l.no} ${plain(l.t)}</option>`).join("")}</select></label></div>`;
}
function bindScope(root,cb){
  const su=$("#sc-u",root),sl=$("#sc-l",root);if(!su||!sl)return;
  su.addEventListener("change",()=>cb(su.value));
  sl.addEventListener("change",()=>cb(sl.value));
}
function viewCards(){
  app.innerHTML=`<h1 class="ltitle">Flashcards</h1><p class="lsum">Choose a topic, then a single lesson if you like. Flip each card, then mark it as known or still learning.</p><div id="scb"></div><div id="dk"></div>`;
  function load(){
    $("#scb").innerHTML=scopeBar(cardsSel);bindScope($("#scb"),v=>{cardsSel=v;load()});
    const list=scopeLessons(cardsSel);
    const cards=[].concat(...list.map(l=>l.cards.map(c=>[c[0],c[1],l.no])));
    mountDeck($("#dk"),cardsSel==="all"?shuffle(cards):cards);
  }
  load();
}
let papersMode="list",papersIdx=0;
function viewPapers(){
  app.innerHTML=`<h1 class="ltitle">Exam-style questions</h1><p class="lsum">Topical questions with mark schemes you can self-mark. ${SUB.papersNote} Questions titled "Past paper", "Alternative to Practical" or "Practical test" are taken from real Cambridge papers, with their diagrams cut out of the paper; for these the mark scheme comes from the official Cambridge mark scheme. For the full papers and mark schemes, use the official <a href="${SUB.officialUrl}" target="_blank" rel="noopener">${SUB.officialName} page</a> or your school's exam resources.</p><div style="margin-top:18px">${unitChips("u",papersSel)}</div>
<div class="qtools"><div class="chips" role="group" aria-label="View"><button class="chip" type="button" data-mode="list" aria-pressed="${papersMode==="list"}">List view</button><button class="chip" type="button" data-mode="board" aria-pressed="${papersMode==="board"}">Class view: one question at a time</button></div><button class="btn" type="button" id="pshuf">Shuffle order</button></div><div id="pp"></div>`;
  let order=[];
  function list(){const o=[];U.filter(u=>papersSel==="all"||"u"+u.n===papersSel).forEach(u=>u.pp.forEach(p=>o.push([p,u])));return o}
  function decor(){const box=$("#pp");$$(".pp",box).forEach((a,i)=>{const it=order[papersMode==="list"?i:papersIdx];if(!it)return;const [p,u]=it;addPJ($(".row",a),()=>projQ({head:"Topic "+u.n+" | "+F(u.name),q:F(p.q),marks:p.ms.reduce((t,x)=>{const m=x.match(/\((\d)\)/g);return t+(m?m.reduce((z,y)=>z+ +y[1],0):1)},0),src:p.src||"",ans:"<ul style=\"margin:6px 0 0 18px;padding:0\">"+p.ms.map(m=>"<li>"+F(m)+"</li>").join("")+"</ul>"}))})}
  function load(){load0();decor()}
  function load0(){
    $$("[data-v]").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.v===papersSel)));
    $$("[data-mode]").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.mode===papersMode)));
    order=list();
    const box=$("#pp");
    $("#pshuf").hidden=false;
    if(papersMode==="list"){box.innerHTML=order.map(x=>ppHTML(x[0],x[1])).join("")||`<p class="meta">No questions yet for this selection.</p>`;return}
    if(!order.length){box.innerHTML=`<p class="meta">No questions yet for this selection.</p>`;return}
    if(papersIdx>=order.length)papersIdx=0;if(papersIdx<0)papersIdx=order.length-1;
    const [p,u]=order[papersIdx];
    box.innerHTML=`<div class="qnav"><button class="btn" type="button" id="qprev">← Previous</button><span class="qcount">Question ${papersIdx+1} of ${order.length}</span><button class="btn" type="button" id="qnext">Next →</button></div>${ppHTML(p,u).replace('class="pp"','class="pp board"')}<div class="qnav"><button class="btn pri" type="button" id="qshow">Show or hide the mark scheme</button><span class="meta">Tip: use the left and right arrow keys.</span></div>`;
    $("#qprev").onclick=()=>{papersIdx--;load();window.scrollTo(0,0)};
    $("#qnext").onclick=()=>{papersIdx++;load();window.scrollTo(0,0)};
    $("#qshow").onclick=()=>{const d=$("#pp details");if(d)d.open=!d.open};
  }
  bindPP($("#pp"));
  $$("[data-v]").forEach(c=>c.addEventListener("click",()=>{papersSel=c.dataset.v;papersIdx=0;load()}));
  $$("[data-mode]").forEach(c=>c.addEventListener("click",()=>{papersMode=c.dataset.mode;load()}));
  $("#pshuf").addEventListener("click",()=>{U.forEach(u=>{u.pp=shuffle(u.pp)});papersIdx=0;load()});
  const onKey=e=>{if(!$("#pp")||!$("#pp").isConnected){document.removeEventListener("keydown",onKey);return}if(papersMode!=="board"||/INPUT|TEXTAREA/.test((e.target.tagName||"")))return;if(e.key==="ArrowRight"){papersIdx++;load()}else if(e.key==="ArrowLeft"){papersIdx--;load()}};
  document.addEventListener("keydown",onKey);
  load();
}

/* ---------- games ---------- */
function viewGames(){
  app.innerHTML=`<h1 class="ltitle">${SUB.name} games</h1><p class="lsum">${SUB.gamesIntro}</p><div id="scb"></div><p class="meta" id="scn"></p>
<div class="links" style="margin-top:20px">${SUB.games.map(g=>`<a class="lk" href="#${g[0]}"><b>${g[1]}</b><span>${g[2]}</span></a>`).join("")}</div>`;
  const paint=()=>{$("#scb").innerHTML=scopeBar(gameScope);bindScope($("#scb"),v=>{gameScope=v;paint()});$("#scn").textContent="Match-up, word and joke content now comes from: "+scopeName(gameScope)+"."};
  paint();
}
function gameShell(title,blurb,again){
  app.innerHTML=`<div class="crumb"><a href="#games">Games</a> / ${title}</div><h1 class="ltitle">${title}</h1><p class="lsum">${blurb}</p>${again?`<div id="scb"></div>`:""}<div id="gm" style="margin-top:20px"></div>`;
  if(again){$("#scb").innerHTML=scopeBar(gameScope);bindScope($("#scb"),v=>{gameScope=v;again()})}
  return $("#gm");
}
function matchSets(){
  const sets={},pool=scopeData(gameScope,"pairs");
  if(gameScope!=="all"&&pool.length>=4){sets.lesson={title:plain(scopeName(gameScope)),pairs:pool};return sets}
  Object.keys(MATCH).forEach(k=>sets[k]=MATCH[k]);
  const all=scopeData("all","pairs");if(all.length>=6)sets.lessons={title:"Mixed from all lessons",pairs:all};
  return sets;
}
function gameMatch(){
  const root=gameShell("Match-up","Tap an item on the left, then its partner on the right.",gameMatch);
  const sets=matchSets();
  const s0=sets.lesson?"lesson":sets.symbols?"symbols":Object.keys(sets)[0];
  mountMatch($("#gm"),sets,s0);
  addPJ($(".ltitle"),()=>PROJ.show("game",el=>mountMatch(el,sets,s0)),"Project game");
}
function mountMatch(root,MATCH,set0){
  let set=set0;
  function chips(){const ks=Object.keys(MATCH);return ks.length<2?"":`<div class="chips">${ks.map(k=>`<button class="chip" data-v="${k}" aria-pressed="${k===set}">${MATCH[k].title}</button>`).join("")}</div>`}
  function start(){
    const pairs=shuffle(MATCH[set].pairs).slice(0,Math.max(3,(window.HUBSET&&HUBSET.get().games.pairs)||6)),left=pairs.map((p,i)=>({i,t:p[0]})),right=shuffle(pairs.map((p,i)=>({i,t:p[1]})));
    let sel=null,matched=0,miss=0;const t0=Date.now();
    root.innerHTML=chips()+`<div class="meta" id="st" style="margin-bottom:10px">Matched 0 of ${pairs.length} · Mistakes 0</div><div class="mgrid" id="mg">${left.map((a,k)=>`<button class="mi" data-s="l" data-i="${a.i}">${F(a.t)}</button><button class="mi" data-s="r" data-i="${right[k].i}">${F(right[k].t)}</button>`).join("")}</div>`;
    $$(".chip",root).forEach(c=>c.addEventListener("click",()=>{set=c.dataset.v;start()}));
    $$(".mi",root).forEach(b=>b.addEventListener("click",()=>{
      if(b.classList.contains("done"))return;
      if(b.dataset.s==="l"){$$(".mi.sel",root).forEach(x=>x.classList.remove("sel"));sel=b;b.classList.add("sel");return}
      if(!sel){return}
      if(sel.dataset.i===b.dataset.i){sel.classList.remove("sel");sel.classList.add("done");b.classList.add("done");sel=null;matched++}
      else{miss++;b.classList.add("bad");setTimeout(()=>b.classList.remove("bad"),400)}
      $("#st",root).textContent=`Matched ${matched} of ${pairs.length} · Mistakes ${miss}`;
      if(matched===pairs.length){const s=Math.round((Date.now()-t0)/1000);root.insertAdjacentHTML("beforeend",`<div class="fb ok" style="margin-top:16px;max-width:720px"><strong>All matched in ${s} seconds with ${miss} mistake${miss===1?"":"s"}.</strong></div><div class="row" style="margin-top:12px"><button class="btn pri" id="pa">Play again</button></div>`);$("#pa",root).addEventListener("click",start)}
    }));
  }
  start();
}
function atoms(f){
  let i=0;
  function num(){let s="";while(i<f.length&&/\d/.test(f[i])){s+=f[i];i++}return s?parseInt(s,10):1}
  function grp(){const m={};while(i<f.length){const c=f[i];
    if(c==="("){i++;const g=grp(),n=num();for(const k in g)m[k]=(m[k]||0)+g[k]*n}
    else if(c===")"){i++;return m}
    else{let el=c;i++;while(i<f.length&&/[a-z]/.test(f[i])){el+=f[i];i++}const n=num();m[el]=(m[el]||0)+n}}
    return m}
  return grp();
}
function gameBalance(){
  const root=gameShell("Equation balancer","Use + and − to set each coefficient until the atoms balance. Use the smallest whole numbers.");
  addPJ($(".ltitle"),()=>PROJ.show("game",mountBalance),"Project game");mountBalance(root);
}
function mountBalance(root){
  const order=shuffle(EQ.map((_,i)=>i));let idx=0,solved=0,tries=0;
  function load(){
    const e=EQ[order[idx%EQ.length]],all=e.l.concat(e.r),co=all.map(()=>1);tries=0;
    let h="";all.forEach((f,i)=>{h+=i===e.l.length?`<span>→</span>`:i>0?`<span>+</span>`:"";h+=`<span class="co" data-i="${i}"><button type="button" data-d="-1" aria-label="Decrease coefficient">−</button><b>${co[i]}</b><button type="button" data-d="1" aria-label="Increase coefficient">+</button></span><span>${fm(f)}</span>`});
    root.innerHTML=`<div class="meta">Equation ${idx+1} · Solved ${solved}</div><div class="eq" id="eq">${h}</div><div class="tw" style="max-width:420px"><table class="counts" id="ct"></table></div><div class="row" style="margin-top:14px"><button class="btn pri" id="ck">Check</button><button class="btn sm" id="sa">Show answer</button><button class="btn sm" id="sk">Skip</button></div><div id="msg"></div>`;
    function counts(){
      const L={},R={};e.l.forEach((f,i)=>{const a=atoms(f);for(const k in a)L[k]=(L[k]||0)+a[k]*co[i]});
      e.r.forEach((f,j)=>{const a=atoms(f),i=e.l.length+j;for(const k in a)R[k]=(R[k]||0)+a[k]*co[i]});
      const els=Array.from(new Set(Object.keys(L).concat(Object.keys(R))));
      $("#ct",root).innerHTML=`<tr><th>Atom</th><th>Left</th><th>Right</th><th></th></tr>`+els.map(k=>{const ok=(L[k]||0)===(R[k]||0);return `<tr><td>${k}</td><td>${L[k]||0}</td><td>${R[k]||0}</td><td class="${ok?"okc":"noc"}">${ok?"✓":"✗"}</td></tr>`}).join("");
      return els.every(k=>(L[k]||0)===(R[k]||0));
    }
    counts();
    $("#eq",root).addEventListener("click",ev=>{const b=ev.target.closest("button");if(!b)return;const i=+b.parentElement.dataset.i;co[i]=Math.max(1,Math.min(12,co[i]+ +b.dataset.d));$("b",b.parentElement).textContent=co[i];counts()});
    $("#ck",root).addEventListener("click",()=>{
      const bal=counts(),g=co.reduce(gcd);
      if(bal&&g===1){solved++;$("#msg",root).innerHTML=`<div class="fb ok" style="margin-top:14px;max-width:560px"><strong>Balanced.</strong>The atoms match on both sides with the smallest numbers.</div><div class="row" style="margin-top:12px"><button class="btn pri" id="nx">Next equation</button></div>`;$("#nx",root).addEventListener("click",()=>{idx++;load()})}
      else{tries++;$("#msg",root).innerHTML=`<div class="fb no" style="margin-top:14px;max-width:560px"><strong>${bal?"Balanced, but not in the smallest numbers.":"Not balanced yet."}</strong>${bal?"Divide every coefficient by the same number.":"Compare the left and right columns and change one coefficient at a time."}</div>`}
    });
    $("#sa",root).addEventListener("click",()=>{e.a.forEach((v,i)=>{co[i]=v;$("b",$(`.co[data-i="${i}"]`,root)).textContent=v});counts()});
    $("#sk",root).addEventListener("click",()=>{idx++;load()});
  }
  load();
}
function gameForge(){
  const root=gameShell("Formula forge","Choose how many of each ion you need so the positive and negative charges cancel. Use the smallest ratio.");
  addPJ($(".ltitle"),()=>PROJ.show("game",mountForge),"Project game");mountForge(root);
}
function mountForge(root){
  const order=shuffle(FORGE.map((_,i)=>i));let k=0,solved=0;
  function load(){
    const it=FORGE[order[k%FORGE.length]];let nc=1,na=1;
    const part=(s,n,p)=>n===1?s:(p?`(${s})${n}`:`${s}${n}`);
    root.innerHTML=`<div class="meta">Compound ${k+1} · Solved ${solved}</div><h2 style="font-size:24px;margin:6px 0 4px">${it.n}</h2>
<div class="ions"><div class="ion"><div class="big">${F(it.c[0])}</div><div class="co" data-w="c"><button type="button" data-d="-1" aria-label="Fewer positive ions">−</button><b id="nc">1</b><button type="button" data-d="1" aria-label="More positive ions">+</button></div></div>
<div class="ion"><div class="big">${F(it.a[0])}</div><div class="co" data-w="a"><button type="button" data-d="-1" aria-label="Fewer negative ions">−</button><b id="na">1</b><button type="button" data-d="1" aria-label="More negative ions">+</button></div></div></div>
<p>Formula so far: <b class="word" id="fo"></b></p><p class="meta" id="ch"></p><div class="row"><button class="btn pri" id="ck">Check</button><button class="btn sm" id="sk">Skip</button></div><div id="msg"></div>`;
    function upd(){const f=part(it.c[2],nc,it.c[3])+part(it.a[2],na,it.a[3]);$("#fo",root).innerHTML=fm(f);$("#nc",root).textContent=nc;$("#na",root).textContent=na;$("#ch",root).textContent=`Positive charge ${it.c[1]*nc} · Negative charge ${it.a[1]*na}`;return f}
    upd();
    $$(".co",root).forEach(w=>w.addEventListener("click",ev=>{const b=ev.target.closest("button");if(!b)return;const d=+b.dataset.d;if(w.dataset.w==="c")nc=Math.max(1,Math.min(6,nc+d));else na=Math.max(1,Math.min(6,na+d));upd()}));
    $("#ck",root).addEventListener("click",()=>{
      const net=it.c[1]*nc-it.a[1]*na;
      if(net===0&&gcd(nc,na)===1){solved++;$("#msg",root).innerHTML=`<div class="fb ok" style="margin-top:14px;max-width:560px"><strong>Correct: ${fm(upd())}</strong>The charges cancel and the ratio is as small as possible.</div><div class="row" style="margin-top:12px"><button class="btn pri" id="nx">Next compound</button></div>`;$("#nx",root).addEventListener("click",()=>{k++;load()})}
      else $("#msg",root).innerHTML=`<div class="fb no" style="margin-top:14px;max-width:560px"><strong>${net!==0?"The charges do not cancel yet.":"Charges cancel, but the ratio can be smaller."}</strong>${net!==0?"Make the total positive charge equal the total negative charge.":"Divide both numbers by their common factor."}</div>`;
    });
    $("#sk",root).addEventListener("click",()=>{k++;load()});
  }
  load();
}
function flaskSVG(miss){
  const lvl=Math.max(0,(7-miss)/7)*78,d="M46 12H74V52L106 122Q112 138 96 138H24Q8 138 14 122L46 52Z";
  return `<svg viewBox="0 0 120 150" role="img" aria-label="Flask with ${7-miss} of 7 parts of liquid left"><defs><clipPath id="fcl"><path d="${d}"/></clipPath></defs><rect x="0" y="${138-lvl}" width="120" height="${lvl}" clip-path="url(#fcl)" style="fill:var(--accent)" fill-opacity=".75"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M40 12H80" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
}
function hangWords(){
  const sc=scopeData(gameScope,"words").filter(w=>/^[a-z]+$/.test(w[0]));
  if(gameScope!=="all"&&sc.length>=3)return sc;
  return WORDS.concat(scopeData("all","words").filter(w=>/^[a-z]+$/.test(w[0])));
}
function gameHangman(){
  const root=gameShell("Flask hangman","Guess the key word. Every wrong letter drains the flask. Seven misses and it is empty.",gameHangman);
  mountHang($("#gm"),hangWords());
  addPJ($(".ltitle"),()=>PROJ.show("game",el=>mountHang(el,hangWords())),"Project game");
}
function mountHang(root,WORDS){
  const order=shuffle(WORDS.map((_,i)=>i));let n=0;
  function load(){
    const w=WORDS[order[n%WORDS.length]],word=w[0];let got=new Set(),bad=new Set(),over=false;
    function draw(){
      const miss=bad.size,won=word.split("").every(c=>got.has(c)),lost=miss>=7;over=won||lost;
      root.innerHTML=`<div class="hang">${flaskSVG(miss)}<div><div class="word" aria-label="Word">${word.split("").map(c=>got.has(c)||lost?c:"_").join(" ")}</div>${(window.HUBSET&&HUBSET.get().games.hint===false)?"":`<p class="meta" style="margin-top:8px">Hint: ${F(w[1])}</p>`}<p class="meta">Misses ${miss} of 7${bad.size?" · "+Array.from(bad).join(" ").toUpperCase():""}</p></div></div>
<div class="keys">${"abcdefghijklmnopqrstuvwxyz".split("").map(c=>`<button type="button" data-c="${c}" class="${got.has(c)?"hit":bad.has(c)?"miss":""}" ${got.has(c)||bad.has(c)||over?"disabled":""}>${c.toUpperCase()}</button>`).join("")}</div>
${over?`<div class="fb ${won?"ok":"no"}" style="margin-top:16px;max-width:560px"><strong>${won?"You got it.":"The word was "+word+"."}</strong>${F(w[1])}.</div><div class="row" style="margin-top:12px"><button class="btn pri" id="nw">New word</button></div>`:""}`;
      $$(".keys button",root).forEach(b=>b.addEventListener("click",()=>guess(b.dataset.c)));
      const nw=$("#nw",root);if(nw)nw.addEventListener("click",()=>{n++;load()});
    }
    function guess(c){if(over||got.has(c)||bad.has(c))return;word.includes(c)?got.add(c):bad.add(c);draw()}
    const dc=root.ownerDocument,onKey=e=>{if(!root.isConnected){dc.removeEventListener("keydown",onKey);return}if(/^[a-z]$/i.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey)guess(e.key.toLowerCase())};
    dc.addEventListener("keydown",onKey);
    draw();
  }
  load();
}
function viewJokes(){
  const own=scopeData(gameScope,"jokes");
  const J=gameScope!=="all"&&own.length?own:JOKES.concat(scopeData("all","jokes"));
  const order=shuffle(J.map((_,i)=>i));let n=0;
  app.innerHTML=`<h1 class="ltitle">${SUB.name} jokes</h1><p class="lsum">${SUB.jokesIntro}</p><div id="scb"></div><p class="meta">Jokes from: ${gameScope!=="all"&&own.length?scopeName(gameScope):"all topics"}</p><div id="jk" style="margin-top:22px"></div>`;
  $("#scb").innerHTML=scopeBar(gameScope);bindScope($("#scb"),v=>{gameScope=v;viewJokes()});
  function show(){
    const j=J[order[n%J.length]];
    const jv=el=>{el.innerHTML=`<section class="slide sq" style="margin:0"><div class="sl-top"><span class="pill navy">Joke</span></div><p class="big-joke" style="margin:10px 0 0;font-size:1.5em">${F(j[0])}</p><p class="punch big-joke" style="margin-top:14px;color:var(--accent);font-size:1.5em"></p><p style="margin-top:22px"><button type="button" class="btn pri">Show the punchline</button></p></section>`;const bt=el.querySelector("button"),pn=el.querySelector(".punch");bt.onclick=()=>{pn.innerHTML=F(j[1]);bt.disabled=true}};
    $("#jk").innerHTML=`<div class="meta">Joke ${n%J.length+1} of ${J.length}</div><p class="big-joke" style="margin:10px 0 0">${F(j[0])}</p><p class="punch big-joke" id="pn" style="margin-top:12px;color:var(--accent)"></p><div class="row" style="margin-top:18px"><button class="btn pri" id="rv">Show punchline</button><button class="btn" id="nx">Next joke</button></div>`;
    $("#rv").addEventListener("click",()=>{$("#pn").innerHTML=F(j[1]);$("#rv").disabled=true});
    $("#nx").addEventListener("click",()=>{n++;show()});
    addPJ($("#rv").parentElement,()=>PROJ.show("joke",jv));
  }
  show();
}

/* ---------- library (desktop app): files from the content folder ---------- */
let libCat="Papers",libSub="mine",libQ="",libSel="";
function libKind(n){const e=(n.split(".").pop()||"").toLowerCase();return /^(png|jpe?g|gif|webp|bmp|svg)$/.test(e)?"img":e==="pdf"?"pdf":"other"}
function libView(f,big){const u=window.lotsDesktop.url(f.rel),k=libKind(f.name);return k==="img"?`<img src="${u}" alt="${f.name.replace(/"/g,"")}" style="max-width:100%;${big?"max-height:90vh;":"max-height:78vh;"}display:block;margin:auto">`:k==="pdf"?`<embed src="${u}#view=FitH" type="application/pdf" style="width:100%;height:${big?"88vh":"76vh"};border:0">`:`<p class="lead">This file type opens in its own program. Use “Open file”.</p>`}
function viewLibrary(){
  const D=window.lotsDesktop;
  app.innerHTML=`<h1 class="ltitle">Library</h1><p class="lsum">Papers, notes and images from your content folder. Drop files into the folders and they appear here. Folder: <code>${D.root().replace(/</g,"&lt;")}</code></p>${DESK.warn.length?`<div class="fb no" style="max-width:none"><strong>Some imported content was skipped</strong>${DESK.warn.map(w=>"<div>"+w.replace(/</g,"&lt;")+"</div>").join("")}</div>`:""}${DESK.lessons||DESK.questions?`<p class="meta">Imported from your folder: ${DESK.lessons} lessons, ${DESK.questions} questions.</p>`:""}
<div class="row" style="gap:8px;flex-wrap:wrap;margin:12px 0"><div class="chips" id="lb-cat">${["Papers","Notes","Images"].map(c=>`<button class="chip" type="button" data-c="${c}" aria-pressed="${c===libCat}">${c}</button>`).join("")}</div><div class="chips" id="lb-sub"><button class="chip" type="button" data-s="mine" aria-pressed="${libSub==="mine"}">${SUB.code} only</button><button class="chip" type="button" data-s="all" aria-pressed="${libSub==="all"}">All subjects</button></div><input id="lb-q" placeholder="Search file names" value="${libQ.replace(/"/g,"")}" style="font:inherit;padding:7px 10px;border:1px solid var(--line);border-radius:8px"><button class="btn" type="button" id="lb-open">Open content folder</button><button class="btn" type="button" id="lb-ref">Refresh</button></div>
<div style="display:grid;grid-template-columns:minmax(260px,380px) 1fr;gap:16px;align-items:start"><div id="lb-list" style="max-height:78vh;overflow:auto"></div><div id="lb-view"></div></div>`;
  const list=$("#lb-list"),vw=$("#lb-view");
  function files(){let all=D.walk(libCat)||[];if(libSub==="mine")all=all.filter(f=>f.rel.split("/").includes(SUB.code)||libCat==="Images");const q=libQ.toLowerCase();if(q)all=all.filter(f=>f.rel.toLowerCase().includes(q));return all}
  function paint(){
    const fs=files();
    if(!fs.length){list.innerHTML=`<p class="meta">No files yet in <b>${libCat}</b>${libSub==="mine"?" for "+SUB.code:""}. Put files in <code>${libCat}${libCat==="Images"?"":"/"+SUB.code}</code> in your content folder, then ${D.shim?"close and reopen the hub":"press Refresh"}.</p>`;return}
    let last="",h="";fs.forEach((f,i)=>{const d=f.rel.split("/").slice(1,-1).join(" / ");if(d!==last){h+=`<h5 style="margin:12px 0 4px;color:var(--accent)">${d||libCat}</h5>`;last=d}h+=`<button class="opt" type="button" data-i="${i}" style="${libSel===f.rel?"border-color:var(--accent)":""}"><span>${f.name.replace(/</g,"&lt;")}</span></button>`});
    list.innerHTML=h;$$("[data-i]",list).forEach(b=>b.addEventListener("click",()=>{libSel=fs[+b.dataset.i].rel;show(fs[+b.dataset.i]);paint()}));
    const cur=fs.find(f=>f.rel===libSel);if(cur&&!vw.innerHTML)show(cur);
  }
  function show(f){vw.innerHTML=`<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px"><b style="margin-right:auto">${f.name.replace(/</g,"&lt;")}</b><button class="btn pri" type="button" id="lb-pj">Project</button><button class="btn" type="button" id="lb-of">Open file</button></div>${libView(f)}`;
    $("#lb-pj").addEventListener("click",()=>PROJ.show("lib",el=>{el.innerHTML=libView(f,1)}));$("#lb-of").addEventListener("click",()=>D.openFile(f.rel))}
  $$("#lb-cat [data-c]").forEach(b=>b.addEventListener("click",()=>{libCat=b.dataset.c;libSel="";viewLibrary()}));
  $$("#lb-sub [data-s]").forEach(b=>b.addEventListener("click",()=>{libSub=b.dataset.s;viewLibrary()}));
  $("#lb-q").addEventListener("change",e=>{libQ=e.target.value;viewLibrary()});
  $("#lb-open").addEventListener("click",()=>D.openFolder(""));$("#lb-ref").addEventListener("click",viewLibrary);
  paint();
}
/* ---------- group activity generated for every lesson (from its notes sections, key terms and matching pairs) ---------- */
function groupAct(l,secs){
  const roles=(HUBSET.get().ibl.roles||"Manager, Recorder, Technician, Reporter").split(",").map(x=>x.trim()).filter(Boolean);
  const kinds=["jigsaw","sort","poe","map"];const k=kinds[((l.idx!=null?l.idx:0)+(+l.u.n||0))%4];
  const titles=secs.filter(s=>s.title!==l.t||secs.length===1).map(s=>s.title);
  const words=(l.words||[]).slice(0,10).map(w=>w[0]),pairs=(l.pairs||[]).slice(0,8);
  let name,mins,steps,out,tn;
  if(k==="jigsaw"){
    const pick=titles.slice(0,Math.max(2,Math.min(4,roles.length)));while(pick.length<2)pick.push(l.t);
    name="Jigsaw: become the expert";mins=30;
    steps=[`Home groups of ${roles.length}: give each member one idea to master: ${pick.map((t,i)=>`<b>${i+1}.</b> ${F(t)}`).join("; ")}.`,"Expert pairs: meet with others who have the same idea (5 minutes). Use the notes to agree three key points and one example.","Return to your home group. Each expert teaches their idea in 2 minutes without reading from the notes.","Together write three exam-style questions about the lesson and swap them with another group to answer."];
    out="A one-page summary and three exam-style questions with answers.";tn="Check every member can teach their idea. Listen for correct key words: "+words.slice(0,5).join(", ")+".";
  }else if(k==="sort"){
    name="Card sort: match, then justify";mins=25;
    steps=[`Print the card sheet. Cut it up. Match each term to its meaning (${pairs.length} pairs).`,"Agree as a group which pair was hardest. Explain why in one sentence.","Each member explains two pairs to the group in their own words, with an example.","Hide the definitions. Take turns to give the term from the definition alone, then swap."];
    out="All pairs matched correctly and one explained 'hardest pair'.";tn="Misconceptions often appear in the 'hardest pair' discussion. Ask the Reporter to share it with the class.";
  }else if(k==="poe"){
    name="Predict, observe, explain";mins=35;
    steps=[`Driving question: <b>${F(l.ibl.q)}</b> Write a group prediction and reasons before you start.`,"Carry out the Explore activity on this page (or use the data your teacher gives you). Record what you observe in a table.","Write a claim, the evidence for it and the biology or chemistry that explains it (claim, evidence, reasoning).","Compare with another group: where do you agree, where do you differ, and why?"];
    out="A claim with evidence and reasoning, and a comparison with another group.";tn="Use the notes after the activity to confirm or correct explanations. Ask groups to revise their reasoning in a different colour.";
  }else{
    name="Concept map and gallery walk";mins=30;
    steps=[`Write each key term on a sticky note or card: ${words.map(w=>F(w)).join(", ")||F(l.t)}.`,"Arrange the terms on a large sheet and draw arrows. Write a linking phrase on every arrow (for example “is made of”, “causes”).","Check against the notes: add anything that is missing and fix any wrong links.","Gallery walk: leave the Reporter at the map, the others visit two other maps and leave one question and one improvement on each."];
    out="A concept map with labelled links, and feedback from two other groups.";tn="Look for the number of correct links, not the number of terms. Wrong links show misconceptions.";
  }
  const sheet=`<h2>${plain(name)}: ${plain(F(l.t))}</h2><p>${mins} minutes · Group: ________ Date: ________</p><p><b>Roles:</b> ${roles.map(r=>plain(r)+" ______").join(" ")}</p><ol>${steps.map(s=>`<li>${plain(s)}</li>`).join("")}</ol>`+(k==="sort"?`<h3>Card sheet</h3><table border="1" cellpadding="8" style="border-collapse:collapse;width:100%">${pairs.map(p=>`<tr><td><b>${plain(F(p[0]))}</b></td><td>${plain(F(p[1]))}</td></tr>`).join("")}</table>`:"")+`<p><b>Product:</b> ${out}</p><div style="height:200px;border:1px solid #000"></div>`;
  window.__GA=sheet;
  const html=`<div class="iblgrid"><div><p class="lead"><b>${name}</b> · about ${mins} minutes · groups of ${roles.length}</p>${stepsHTML(steps)}</div><div><div class="sidebox"><h5>Group roles</h5><p>${roles.map(r=>`<b>${F(r)}</b>`).join(" · ")}. Rotate roles from lesson to lesson.</p></div><div class="sidebox"><h5>What to hand in</h5><p>${out}</p></div>${HUB.teacher&&HUBSET.get().ibl.notes!==false?`<div class="sidebox"><h5>Teacher notes</h5><p>${F(tn)}</p></div>`:""}<p style="margin-top:10px"><button class="btn" type="button" id="ga-print">Print the group sheet${k==="sort"?" with cards":""}</button></p></div></div>`;
  return {name,html};
}
/* ---------- IBL group activities ---------- */
function viewIBL(){
  const L=(IBL[subKey]||[]);
  const rub=[["Asking questions and predicting","Makes a clear prediction with a reason"],["Planning and carrying out","Uses a fair, safe method and records accurately"],["Working together","Everyone has a role and contributes ideas"],["Explaining with biology or chemistry","Uses correct key words and links cause to effect"],["Presenting and evaluating","Communicates clearly and suggests improvements"]];
  app.innerHTML=`<h1 class="ltitle">Group activities</h1><p class="lsum">Inquiry-based learning (IBL) tasks for every topic. Groups of 3 to 4: a <b>Rotate roles between activities. Group roles: <b>${(HUBSET.get().ibl.roles||"").split(",").map(x=>x.trim()).filter(Boolean).join(", ")}</b>.</p>
<div class="links" style="margin:14px 0"><button class="btn" type="button" id="ibl-print">Print all</button></div>
<div id="ibl-list">${L.map((a,i)=>{const u=U.find(x=>x.n===a[0]);return `<details class="qd" id="ibl-${i}"><summary><b>Topic ${a[0]}${u?": "+plain(u.name):""}</b> · ${F(a[1])} <span class="meta">(${a[3]} min)</span></summary><div class="ibl-body"><p><b>Driving question:</b> ${F(a[2])}</p><p><b>Materials:</b> ${F(a[4])}</p><ol>${a[5].map(s=>`<li>${F(s)}</li>`).join("")}</ol>${HUB.teacher&&HUBSET.get().ibl.notes!==false?`<p class="meta"><b>Teacher notes:</b> ${F(a[6])}</p>`:""}<p class="meta"><button class="btn" type="button" data-pr="${i}">Print this activity</button></p></div></details>`}).join("")||"<p class='meta'>No activities for this subject yet.</p>"}</div>
<h2 class="sec">Group work rubric</h2><table class="rtab"><thead><tr><th>Skill</th><th>What good looks like</th></tr></thead><tbody>${rub.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table>`;
  const win=html=>{const w=window.open("","_blank");if(!w){alert("Allow pop-ups to print.");return}w.document.write("<!doctype html><meta charset=utf-8><title>Group activity</title><style>body{font:14px Arial;margin:24px}h2{margin:18px 0 4px}li{margin:3px 0}</style>"+html);w.document.close();w.print()};
  const one=a=>{const u=U.find(x=>x.n===a[0]);return `<h2>${plain(F(a[1]))}</h2><p>Topic ${a[0]}${u?": "+plain(u.name):""} · ${a[3]} minutes · Group: ________ Date: ________</p><p><b>Driving question:</b> ${plain(F(a[2]))}</p><p><b>Materials:</b> ${plain(F(a[4]))}</p><ol>${a[5].map(s=>`<li>${plain(F(s))}</li>`).join("")}</ol><p><b>Roles:</b> ${(HUBSET.get().ibl.roles||"").split(",").map(x=>x.trim()).filter(Boolean).map(r=>plain(r)+" ______").join(" ")}</p><p><b>Notes and results:</b></p><div style="height:220px;border:1px solid #000"></div>`};
  $$("[data-pr]").forEach(b=>b.onclick=()=>win(one(L[+b.dataset.pr])));
  $("#ibl-print").onclick=()=>win(L.map(one).join("<hr>"));
}
/* ---------- routing ---------- */
function setNav(r){
  const k=/^(home|u\d+|l\d+-\d+|q\d+)$/.test(r)?"home":/^game/.test(r)?"games":/^practicals/.test(r)?"practicals":/^sims/.test(r)?"sims":r;
  $$(".nav a").forEach(a=>{if(a.dataset.k===k)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
}
if(!HUB.teacher)["progress","plan","assess","sims"].concat(HUB.teacher&&DESK.on?[]:["library"]).forEach(k=>{const a=document.querySelector(`.nav a[data-k="${k}"]`);if(a)a.remove()});
function fixLinks(root){$$('a[href^="#"]',root).forEach(a=>{let h=a.dataset.h;if(!h){h=a.getAttribute("href");if(/^#(hub$|chem\/|bio\/|alevel\/)/.test(h)||h.length<=1)return;a.dataset.h=h}a.setAttribute("href","#"+subKey+"/"+h.slice(1))})}
function chrome(hub){
  const lg=$(".logo");
  if(hub){lg.setAttribute("href","#hub");lg.innerHTML=`<span class="cell"><small>LOTS</small>Hub</span><span><b>LOTS Cambridge Learning Hub</b><span>${HUB.tag}</span></span>`;$(".nav").style.display="none";$("footer").innerHTML="Made for students at a Cambridge accredited school and not affiliated with Cambridge. Your progress, quiz scores and inquiry notes are saved in this browser only.";document.title=HUB.docTitle}
  else{lg.setAttribute("href","#"+subKey+"/home");lg.innerHTML='<span class="cell"><small>'+SUB.code+'</small>'+SUB.short+'</span><span><b>'+SUB.level+" "+SUB.name+'</b><span>'+SUB.code+' HUB</span></span>';$(".nav").style.display="";$("footer").innerHTML=SUB.footer;document.title=SUB.level+" "+SUB.name+" "+SUB.code+" | LOTS Cambridge Learning Hub";
    const nv=$(".nav");if(!$("#sw")){const a=document.createElement("a");a.id="sw";a.href="#hub";a.textContent="Subjects";nv.insertBefore(a,nv.firstChild)}}
}
function viewHub(){
  const card=(k)=>{const sb=SUBJ[k];if(sb.soon)return `<div class="tile soon" style="--c:#8A93A0;--on:#fff"><span class="sym"><small>${sb.code}</small>${sb.short}</span><span class="tx"><h3>${sb.level} ${sb.name} ${sb.code}</h3><div class="meta">Coming soon. Syllabus and notes to be added.</div></span></div>`;
    prep(k);const us=sb.units,ls=[].concat(...us.map(u=>u.lessons)),d=ls.filter(l=>states[k].done[l.key]).length,p=ls.length?Math.round(d/ls.length*100):0,qn=us.reduce((a,u)=>a+u.pp.length,0);
    return `<a class="tile" style="--c:${sb.color};--on:#fff" href="#${k}/home"><span class="sym"><small>${sb.code}</small>${sb.short}</span><span class="tx"><h3>${sb.level} ${sb.name} ${sb.code}</h3><div class="meta">${us.length} topics · ${ls.length} lessons · ${qn} exam questions</div><div class="meta">${d} of ${ls.length} lessons done (${p}%)</div></span></a>`};
  app.innerHTML=`<section class="hero"><div class="eyebrow">LOTS Cambridge Learning Hub · ${HUB.tag}</div><h1>${HUB.heading}</h1><p>${HUB.blurb}</p></section><h2 class="sec">${HUB.subs.length>1?"Subjects":"Subject"}</h2><div class="grid">${HUB.subs.map(card).join("")}</div>`;
}
function render(){
  let raw=(location.hash||"").replace(/^#/,"");
  if(raw===""||raw==="hub"){chrome(true);viewHub();fixLinks(document);window.scrollTo(0,0);return}
  const mm=raw.match(/^(chem|bio|alevel)(?:\/(.*))?$/);
  if(mm&&HUB.subs.includes(mm[1])){if(mm[1]!==subKey){gameScope="all";cardsSel="all"}useSubject(mm[1]);raw=mm[2]||"home"}else if(mm){location.hash="#hub";return}else useSubject(HUB.subs[0]);
  if((!HUB.teacher&&/^(progress|plan|assess)$/.test(raw))||(raw==="library"&&!(HUB.teacher&&DESK.on)))raw="home";
  const r=raw||"home";let m;chrome(false);
  if(r==="home")viewHome();
  else if((m=r.match(/^u(\d+)$/)))viewUnit(+m[1]);
  else if((m=r.match(/^l(\d+)-(\d+)$/)))viewLesson(m[1]+"-"+m[2]);
  else if((m=r.match(/^q(\d+)$/)))viewQuiz(+m[1]);
  else if(r==="cards")viewCards();
  else if(r==="papers")viewPapers();
  else if(r==="progress")PROGUI(app,{SUB,U,S,subKey,F,plain,saveFile})
  else if((m=r.match(/^practicals\/(.+)$/))){window.PRACOPEN={sub:subKey,id:decodeURIComponent(m[1])};PRACUI(app,{SUB,U,S,subKey,F,plain,saveFile})}
  else if(r==="sims"&&typeof SIMUI!=="undefined")SIMUI(app,{subKey});
  else if((m=r.match(/^sims\/(.+)$/))&&typeof SIMUI!=="undefined")SIMUI(app,{subKey},m[1]);
  else if(r==="practicals")PRACUI(app,{SUB,U,S,subKey,F,plain,saveFile})
  else if(r==="plan"){const pk=planPick;planPick="";PLANUI(app,{SUB,U,S,subKey,F,plain,saveFile,pick:pk})}
  else if(r==="assess")ASSESSUI(app,{SUB,U,S,subKey,F,plain,saveFile})
  else if(r==="ibl")viewIBL();
  else if(r==="library")viewLibrary();
  else if(r==="overview"){if(HUB.teacher)OVUI(app,{SUB,U,S,subKey,F,plain,saveFile});else OVLEARN(app,{SUB,U,S,subKey,F,plain,saveFile})}
  else if(r==="studypack")SPUI(app,{SUB,U,S,subKey,F,plain,saveFile})
  else if(r==="games")viewGames();
  else if(r==="game-match")gameMatch();
  else if(r==="game-balance"&&EQ.length)gameBalance();
  else if(r==="game-forge"&&FORGE.length)gameForge();
  else if(r==="game-hangman")gameHangman();
  else if(r==="jokes")viewJokes();
  else if(r==="help")viewHelp();
  else viewHome();
  setNav(r);fixLinks(document);window.scrollTo(0,0);
}
new MutationObserver(()=>fixLinks(app)).observe(app,{childList:true,subtree:true});
/* ---------- display settings ---------- */
const FONTS=[["default","Deck (Caladea and Carlito)"],["atkinson","Atkinson Hyperlegible"],["lexend","Lexend (easy reading)"],["nunito","Nunito"],["opensans","Open Sans"],["verdana","Verdana"],["arial","Arial"],["georgia","Georgia"],["merriweather","Merriweather"]];
const PRESETS=[["Normal",1],["Large",1.25],["Board",1.6],["Extra large",1.9],["Maximum",2.2]];
let DSP={fs:1.25,font:"default",fonts:{},accent:"",lh:"normal",width:"standard",board:0};
try{const r=localStorage.getItem("hubdisplay");if(r)DSP=Object.assign(DSP,JSON.parse(r))}catch(e){}
function applyDsp(){
  const d=document.documentElement;d.style.setProperty("--fs",String(DSP.fs));
  if(!DSP.fonts)DSP.fonts={};d.setAttribute("data-font",DSP.fonts[subKey]||DSP.font);
  if(DSP.accent){d.style.setProperty("--accent",DSP.accent);d.style.setProperty("--accent-ink","#FFFFFF")}else{d.style.removeProperty("--accent");d.style.removeProperty("--accent-ink")}d.setAttribute("data-lh",DSP.lh);d.setAttribute("data-width",DSP.width);d.setAttribute("data-board",DSP.board?"1":"0");
  try{localStorage.setItem("hubdisplay",JSON.stringify(DSP))}catch(e){}
}
applyDsp();
window.DSP=DSP;window.applyDsp=applyDsp;window.FONTS=FONTS;window.PRESETS=PRESETS;window.hubKey=()=>subKey;window.hubSub=()=>SUB;
function dspPanel(){
  let pn=$("#dsp");if(pn){pn.remove();return}
  pn=document.createElement("div");pn.id="dsp";pn.className="dsp-panel";pn.setAttribute("role","dialog");pn.setAttribute("aria-label","Display settings");
  function draw(){
    pn.innerHTML=`<button class="btn dsp-x" type="button" id="dx" aria-label="Close">Close</button><h2>Display settings</h2><p class="meta" style="margin:0">Saved on this device. Use these to make the hub readable from the back of the room.</p>
<h3>Text size</h3><div class="dsp-row"><button class="btn" id="dm" type="button" aria-label="Smaller text">A−</button><span class="dsp-size" aria-live="polite">${Math.round(DSP.fs*100)}%</span><button class="btn" id="dp" type="button" aria-label="Larger text">A+</button></div>
<div class="dsp-row" style="margin-top:8px">${PRESETS.map(p=>`<button class="chip" type="button" data-fs="${p[1]}" aria-pressed="${Math.abs(DSP.fs-p[1])<.01}">${p[0]}</button>`).join("")}</div>
<h3>Font for ${SUB.title||SUB.code||subKey}</h3><p class="meta" style="margin:0 0 6px">Each subject remembers its own font.</p><div class="dsp-row">${FONTS.map(f=>`<button class="chip" type="button" data-font="${f[0]}" aria-pressed="${(DSP.fonts[subKey]||DSP.font)===f[0]}">${f[1]}</button>`).join("")}</div><div class="dsp-row" style="margin-top:6px"><button class="btn" type="button" id="dfontall">Use this font for every subject</button></div>
<h3>Accent colour</h3><div class="dsp-row">${[["","Subject default"],["#0A6C74","Teal"],["#1F5FBF","Blue"],["#2E7D32","Green"],["#7B3FA0","Purple"],["#C2570C","Orange"],["#B3261E","Red"]].map(c=>`<button class="chip" type="button" data-acc="${c[0]}" aria-pressed="${(DSP.accent||"")===c[0]}">${c[0]?`<span style="display:inline-block;width:.9em;height:.9em;border-radius:50%;background:${c[0]};vertical-align:-.1em;margin-right:.35em"></span>`:""}${c[1]}</button>`).join("")}</div>
<h3>Line spacing</h3><div class="dsp-row">${[["tight","Tight"],["normal","Normal"],["relaxed","Relaxed"]].map(f=>`<button class="chip" type="button" data-lh="${f[0]}" aria-pressed="${DSP.lh===f[0]}">${f[1]}</button>`).join("")}</div>
<h3>Page width</h3><div class="dsp-row">${[["standard","Standard"],["wide","Full width"]].map(f=>`<button class="chip" type="button" data-width="${f[0]}" aria-pressed="${DSP.width===f[0]}">${f[1]}</button>`).join("")}</div>
<h3>Smartboard</h3><div class="dsp-row"><button class="btn pri" type="button" id="dboard">${DSP.board?"Turn off smartboard preset":"Use smartboard preset"}</button></div>
<p class="meta" style="margin:6px 0 0">The preset uses 160% text, full width and larger buttons for touch screens.</p>
<div class="dsp-sample"><b>Sample:</b> Osmosis is the net movement of water molecules through a partially permeable membrane. CO${"<sub>2</sub>"} + H${"<sub>2</sub>"}O</div>
<div class="dsp-row" style="margin-top:12px"><button class="btn" type="button" id="dreset">Reset to default</button></div>`;
    const set=(o)=>{Object.assign(DSP,o);applyDsp();draw()};
    $("#dx",pn).onclick=()=>pn.remove();
    $("#dm",pn).onclick=()=>set({fs:Math.max(.9,Math.round((DSP.fs-.1)*100)/100)});
    $("#dp",pn).onclick=()=>set({fs:Math.min(2.2,Math.round((DSP.fs+.1)*100)/100)});
    $$("[data-fs]",pn).forEach(b=>b.onclick=()=>set({fs:+b.dataset.fs}));
    $$("[data-font]",pn).forEach(b=>b.onclick=()=>{DSP.fonts[subKey]=b.dataset.font;set({})});
    $$("[data-acc]",pn).forEach(b=>b.onclick=()=>set({accent:b.dataset.acc}));
    $("#dfontall",pn).onclick=()=>{const f=DSP.fonts[subKey]||DSP.font;DSP.fonts={};set({font:f})};
    $$("[data-lh]",pn).forEach(b=>b.onclick=()=>set({lh:b.dataset.lh}));
    $$("[data-width]",pn).forEach(b=>b.onclick=()=>set({width:b.dataset.width}));
    $("#dboard",pn).onclick=()=>DSP.board?set({board:0,fs:1.25,width:"standard"}):set({board:1,fs:1.6,width:"wide"});
    $("#dreset",pn).onclick=()=>{DSP.fonts={};set({fs:1.25,font:"default",accent:"",lh:"normal",width:"standard",board:0})};
  }
  draw();document.body.appendChild(pn);
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){const p=$("#dsp");if(p)p.remove();const q=$("#pjp");if(q)q.remove()}});
document.addEventListener("click",e=>{const p=$("#dsp");if(p&&!p.contains(e.target)&&!e.target.closest("#dspbtn"))p.remove()});
$("#dspbtn").addEventListener("click",dspPanel);
/* projector: Next / Previous step through every "Project" button of the page being taught */
let LASTPJ=null;
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".pjb");if(b&&app.contains(b))LASTPJ=b},true);
PROJ.setStep(dir=>{
  const all=$$(".pjb",app).filter(b=>b.offsetParent!==null);if(!all.length)return;
  let i=LASTPJ?all.indexOf(LASTPJ):-1;
  if(i<0)i=dir>0?-1:all.length;
  const n=all[Math.max(0,Math.min(all.length-1,i+dir))];
  if(n){n.scrollIntoView({block:"center"});n.click()}
});
const pjbtn=$("#pjbtn");
function pjLabel(){pjbtn.textContent=PROJ.active?"Projector: on":"Projector";pjbtn.setAttribute("aria-pressed",String(PROJ.active))}
PROJ.on(pjLabel);pjLabel();
function pjPanel(){
  let pn=$("#pjp");if(pn){pn.remove();return}
  pn=document.createElement("div");pn.id="pjp";pn.className="dsp-panel";pn.setAttribute("role","dialog");pn.setAttribute("aria-label","Projector");
  function draw(){
    pn.innerHTML=`<button class="btn dsp-x" type="button" id="px" aria-label="Close">Close</button><h2>Projector</h2><p class="meta" style="margin:0">Open the projector window, drag it onto the smartboard and press Full screen there. Then press <b>Project</b> on any lesson slide, question, flashcard, game or joke and it appears on the board while this screen stays with you.</p>
<div class="dsp-row" style="margin-top:12px">${PROJ.active?`<button class="btn" type="button" id="pcl">Close projector</button><button class="btn" type="button" id="pbl">Blank screen</button>`:`<button class="btn pri" type="button" id="pop">Open projector window</button>`}</div>
<div class="dsp-row" style="margin-top:8px"><button class="btn" type="button" id="ppg">Project this whole page</button></div>
<p class="meta" style="margin:8px 0 0">If this browser blocks the second window, the projector opens as a full-screen view on this page instead; press Close or Esc to return.</p>`;
    $("#px",pn).onclick=()=>pn.remove();
    const op=$("#pop",pn);if(op)op.onclick=()=>{PROJ.open();draw()};
    const cl=$("#pcl",pn);if(cl)cl.onclick=()=>{PROJ.close();draw()};
    const bl=$("#pbl",pn);if(bl)bl.onclick=()=>PROJ.blank();
    $("#ppg",pn).onclick=()=>{pn.remove();PROJ.showNode(app)};
  }
  draw();document.body.appendChild(pn);
}
pjbtn.addEventListener("click",e=>{e.stopPropagation();pjPanel()});
document.addEventListener("click",e=>{const p=$("#pjp");if(p&&!p.contains(e.target)&&!e.target.closest("#pjbtn"))p.remove()});
const tb=$("#theme");
function dark(){const t=document.documentElement.getAttribute("data-theme");return t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches}
function themeLabel(){tb.textContent=dark()?"Light mode":"Dark mode"}
tb.addEventListener("click",()=>{const t=dark()?"light":"dark";document.documentElement.setAttribute("data-theme",t);THEME=t;try{localStorage.setItem("hubtheme",t)}catch(e){}themeLabel()});
themeLabel();
window.addEventListener("hashchange",render);
render();
})();
