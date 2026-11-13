/* ===== 4.0 Explore & Explain engine: lesson connector, topic hook, hook, Explore activities, Explain parts with guiding questions, Summary, question ladder ===== */
const X4=(function(){
"use strict";
const C={chem:{},bio:{},alevel:{}},TH={chem:{},bio:{},alevel:{}};
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const strip=h=>String(h||"").replace(/<[^>]+>/g," ").replace(/\{\{\w+\}\}/g," ").replace(/&[a-z]+;/g," ").replace(/\s+/g," ").trim();
const TK={talk:"Turn and talk",pred:"Predict",sketch:"Sketch it",write:"Write it",calc:"Calculate",think:"Think, pair, share",list:"List it",recall:"Recall",label:"Label it",expl:"Explain it",comp:"Compare",sort:"Sort it",draw:"Draw it",apply:"Apply it",read:"Read and answer",spot:"Spot the mistake",rank:"Rank it",show:"Show me"};
const TKS={talk:"Think it through",think:"Think it through",show:"Write it"};
const AK={sim:"Simulation",case:"Case study",diag:"Diagnosis",prob:"Problem solving",disc:"Discussion",debate:"Debate",data:"Data analysis",cards:"Card activity",out:"Outdoor",ibl:"Inquiry task",role:"Role play",model:"Model it"};
const PAPER={cards:1};
const LAB=/\b(beakers?|test[- ]?tubes?|boiling tubes?|bunsen|burners?|burettes?|pipettes?|thermometers?|measuring cylinders?|apparatus|conical flasks?|flasks?|visking|microscopes?|crucibles?|tripod|gauze|water[- ]bath|electrodes?|power pack|colorimeters?|spirit lamp|petri|agar|iodine solution|benedict|biuret|limewater|hydrochloric|sulfuric|sodium hydroxide|copper\(II\) sulfate|magnesium ribbon|potometer|respirometer|fume cupboard|heat (?:it|the|gently|strongly)|goggles)\b/i;
function add(s,o){Object.assign(C[s],o)}
function topic(s,o){Object.assign(TH[s],o)}
/* ---------- per-lesson saved state ---------- */
function st(sub,no){const k="x4:"+sub+":"+no;let o={};try{o=JSON.parse(localStorage.getItem(k)||"{}")||{}}catch(e){}Object.defineProperty(o,"_k",{value:k,enumerable:false});return o}
function sv(o){try{localStorage.setItem(o._k,JSON.stringify(o))}catch(e){}}
const words=h=>strip(h).split(" ").filter(Boolean).length;
const qtx=q=>{const t=strip(q);return /[?.:]$/.test(t)||t.split(" ").length>6?q:"What is meant by “"+q+"”?"};
const toks=s=>new Set(strip(s).toLowerCase().replace(/[^a-z0-9 ]/g," ").split(" ").filter(w=>w.length>3&&!/^(what|which|when|where|that|this|with|from|have|they|their|there|these|those|into|than|then|them|does|will|would|about|between|other|each|more|most|only|also|some|such|because|explain|describe|state|give|name)$/.test(w)));
/* ---------- quick checks from flashcards (and quiz items) ---------- */
function checks(parts,l){
  const cards=(l.cards||[]).filter(c=>c&&c[0]&&c[1]);
  const pq=(l.pr||[]).filter(q=>q&&q[0]&&q[1]&&typeof q[1]==="string"&&q[1].length<120).map(q=>[q[0],q[1]]);
  const pool=cards.concat(pq),used=new Set();
  const pt=parts.map(p=>toks(p.s.title+" "+p.s.body+" "+p.q));
  const sc=pool.map(c=>{const t=toks(c[0]+" "+c[1]);return pt.map(P=>{let n=0;t.forEach(w=>{if(P.has(w))n++});return n})});
  parts.forEach((p,i)=>{
    const order=pool.map((c,j)=>[j,sc[j][i]-Math.max(0,...sc[j].filter((_,k)=>k!==i))*0.5]).filter(x=>sc[x[0]][i]>0).sort((a,b)=>b[1]-a[1]);
    for(const [j] of order){if(p.chk.length>=2)break;if(used.has(j))continue;used.add(j);p.chk.push(pool[j])}
  });
  parts.forEach(p=>{if(!p.chk.length){const j=pool.findIndex((c,k)=>!used.has(k));if(j>=0){used.add(j);p.chk.push(pool[j])}}});
}
/* ---------- activity model ---------- */
function mkAct(a){const o=a[5]||{};return{k:a[0],t:a[1],m:+a[2]||10,mat:(a[3]||"Board only").split(";").map(x=>x.trim()).filter(Boolean),st:a[4]||[],o,src:o.src||"",study:o.study||"",cards:o.cards||null,cats:o.cats||null,roles:o.roles!==0&&/^(cards|out|disc|debate|role|case|diag|prob|data|ibl|model)$/.test(a[0]),safety:o.safety||"",sim:o.sim||"",ans:o.ans||null,solo:o.solo||null,dbl:!!o.dbl}}
function cardsLesson(u){let best=0,bi=0;u.lessons.forEach((l,i)=>{const n=(l.pairs||[]).length;if(n>best){best=n;bi=i}});return bi}
function anyAuthoredCards(sub,u){return u.lessons.some(l=>{const c=C[sub][l.no];return c&&(c.a||[]).some(a=>a[0]==="cards")})}
function model(ctx){
  const {l,u,sub,secs}=ctx,T=!!HUB.teacher,c=C[sub][l.no]||{},S=st(sub,l.no);
  const sims=T&&typeof simsFor!=="undefined"?simsFor(sub,l.no):[];
  const parts=secs.map((s,i)=>{const a=(c.p||[])[i];return{s,i,q:a?a[0]:autoQ(s,l),tk:a?a[1]:"think",m:a?(+a[2]||1):1,txt:a?a[3]:autoTask(s,l),chk:[]}});
  checks(parts,l);
  let simIn=-1;if(sims.length&&c.sp!=null&&c.sp>=0&&c.sp<parts.length)simIn=c.sp;
  let acts=(c.a||[]).map(mkAct);
  if(sims.length&&simIn<0&&!acts.some(a=>a.k==="sim")){const sm=sims[0];acts.unshift(mkAct(["sim","Simulation: "+sm.t,10,"Board or projector only",[`Open the simulation below and show it on the board.`,`Before changing anything, ask the class to predict what will happen. Write two predictions on the board.`,`Change one control at a time. Learners record what changes and what stays the same.`,`Use the challenge list in the simulation. Pairs agree an explanation for each result.`,`Keep the findings: you will check them against the notes in Explain.`],{sim:sm.id}]));if(sims[1])acts.push(mkAct(["sim","Simulation: "+sims[1].t,10,"Board or projector only",["Open the second simulation and predict first.","Change one control at a time and record the results.","Explain one result to your partner using the key words."],{sim:sims[1].id}]))}
  acts.forEach(a=>{if(a.k==="sim"&&!a.sim&&sims[0])a.sim=sims[0].id});
  acts=acts.filter(a=>a.k!=="sim"||(T&&a.sim&&(typeof SIMS==="undefined"||SIMS[a.sim])));
  if(!c.a){
    const b=l.ibl||{},txt=strip((b.act||"")+" "+(b.task||""));
    if(b.act&&!LAB.test(txt)){const ps=parseList(b.act);if(ps.length>=2)acts.push(mkAct(["ibl","Inquiry task: "+strip(b.q).slice(0,90),12,"Board only; paper and pen",ps]))}
    acts.push(mkAct(["disc","Discussion: "+strip(b.q||l.t).slice(0,110),10,"None",[`Think (1 minute): on your own, write your first answer to: <b>${esc(strip(b.q||("What do you already know about "+l.t+"?")))}</b>`,`Pair (3 minutes): compare answers with a partner. Agree one answer and one question you still have.`,`Share (4 minutes): two pairs report to the class. Others add evidence or disagree politely.`,`Note the class’s best answer on the board. You will check it in Explain.`]]));
    if(!anyAuthoredCards(sub,u)&&cardsLesson(u)===l.idx&&(l.pairs||[]).length>=6)acts.push(mkAct(["cards","Card sort: match the key terms",15,"Printed cards (1 set per group); scissors",["In groups, deal out the cards face up.","Match each key term to its meaning.","For each pair, agree an example and say it out loud.","Check with another group, then use the notes to settle any disagreements."],{cards:(l.pairs||[]).slice(0,12).map(p=>[strip(p[0]),strip(p[1])]),pairs:1}]));
  }
  if(!T){acts=acts.filter(a=>a.k!=="sim"&&a.k!=="cards"&&a.k!=="out"&&a.k!=="role");acts.forEach(a=>{if(a.solo)a.st=a.solo;else if(a.k==="disc"||a.k==="debate"){a.t=a.t.replace(/^(Discussion|Debate)/,"Think and write");a.st=[`Write your own answer to the question in three or four sentences.`,`Give one piece of evidence or an example that supports your answer.`,`Write one argument someone might use against your answer, and reply to it.`,`Check your answer against the notes in Explain and improve it.`]}else a.st=a.st.map(s=>s.replace(/\b[Ii]n (pairs|groups)( of \d+)?,?\s*/g,"").replace(/\b[Ww]ith (a|your) partner,?\s*/g,""))})}
  const hk=c.h||null;
  const hook={q:hk?hk[0]:(strip((l.ibl||{}).q)||("What do you already know about "+strip(l.t)+"?")),vis:hk?hk[1]:"",ans:hk?hk[2]:strip(l.sum)};
  const prev=ctx.prev&&ctx.prev.u===u?ctx.prev:ctx.prev;
  let conn=null;
  if(c.c)conn={from:c.c[0],q:c.c[1],task:c.c[2],m:+c.c[3]||3};
  else if(prev){const pc=(prev.cards||[]).filter(x=>x&&x[0])[0];conn={from:"Lesson "+prev.no+" "+strip(prev.t),q:"Last lesson: "+strip(prev.t)+". How might it help us today with "+strip(l.t)+"?",task:`1. Write two things you remember about ${esc(strip(prev.t))}.`+(pc?`<br>2. ${ctx.F(qtx(pc[0]))}`:"")+`<br>${pc?3:2}. Predict one way it links to today’s lesson.`,m:3}}
  const sum=c.s||secs.filter(s=>!s.ext).slice(0,5).map(s=>{const t=strip(s.body);const m=t.match(/^[^.?!]{12,220}[.?!]/);return m?m[0]:t.slice(0,180)});
  const th=T&&l.idx===0?TH[sub][u.n]||autoTopic(ctx):null;
  return{c,S,sims,parts,simIn,acts,hook,conn,sum,th,T};
}
function autoTopic(ctx){const{u,U}=ctx;const i=U.indexOf(u);const ch=[U[i-1],u,U[i+1]].filter(Boolean).map(x=>x.n);
  return [`What will we discover in Topic ${u.n}: ${strip(u.name)}?`,"",[],ch,u.lessons.slice(0,4).map(l=>strip(l.ibl&&l.ibl.q||l.t))]}
function parseList(html){const d=document.createElement("div");d.innerHTML=html;const li=[...d.querySelectorAll("li")].map(x=>x.innerHTML);if(li.length)return li;return [...d.children].map(x=>x.innerHTML).filter(Boolean)}
function autoQ(s,l){const t=strip(s.title);if(/\?$/.test(t))return t;return "What do we need to know about "+t.charAt(0).toLowerCase()+t.slice(1)+"?"}
function autoTask(s,l){return `Before reading: write one thing you already know about <b>${esc(strip(s.title))}</b> and one question you have.`}
/* ---------- timing ---------- */
function partMins(p){return p.m+Math.min(6,Math.max(1,Math.round(words(p.s.body)/110)))+(p.chk.length?1:0)}
function plan(M,ctx){
  const S=M.S,T=M.T,act=curAct(M);
  const conn=M.conn&&S.conn!==false?M.conn.m:0,topic=M.th&&S.th!==false?4:0,hook=T?5:0,summ=4;
  const expl=M.parts.reduce((a,p)=>a+partMins(p),0)+(M.simIn>=0?6:0),expo=act?act.m:0;
  const total=conn+topic+hook+summ+expl+expo;
  let per=S.per;if(!per){const A=window.HUBTEACH&&HUBTEACH.active&&HUBTEACH.active();per=A&&A.mins?(A.mins>=60?80:40):(total<=46?40:80)}
  const t=Object.assign({},S.t||{});
  const fixed=(t.conn!=null?t.conn:conn)+(t.topic!=null?t.topic:topic)+(t.hook!=null?t.hook:hook)+(t.sum!=null?t.sum:summ);
  const avail=Math.max(10,per-fixed);
  let e1=t.exp,e2=t.expl;
  if(e1==null&&e2==null){const sc=avail/Math.max(1,expo+expl);e1=Math.max(expo?6:0,Math.round(expo*sc));e2=Math.max(5,avail-e1)}
  else if(e1==null)e1=Math.max(0,avail-e2);else if(e2==null)e2=Math.max(5,avail-e1);
  const out={conn:t.conn!=null?t.conn:conn,topic:t.topic!=null?t.topic:topic,hook:t.hook!=null?t.hook:hook,exp:e1,expl:e2,sum:t.sum!=null?t.sum:summ};
  out.total=out.conn+out.topic+out.hook+out.exp+out.expl+out.sum;out.per=per;out.est=total;return out;
}
function curAct(M){const k=M.S.act;let a=M.acts.find((x,i)=>String(i)===String(k));if(!a)a=M.acts[0];return a||null}
/* ---------- visuals ---------- */
function deskPhoto(ctx,names){
  try{if(!(typeof DESK!=="undefined"&&DESK.on&&window.lotsDesktop))return "";
    for(const dir of names){const fs=window.lotsDesktop.walk(dir)||[];const f=fs.find(x=>/(^|\/)(topic[ _-]?)?hook\.(png|jpe?g|webp|gif)$/i.test(x.rel)&&(dir.indexOf("Topic")>=0||!/topic[ _-]?hook/i.test(x.rel)));if(f)return window.lotsDesktop.url(f.rel)}
  }catch(e){}return "";
}
function visHTML(v,ctx,id){
  if(!v)return "";
  const i=v.indexOf(":"),t=v.slice(0,i),val=v.slice(i+1);
  if(t==="fig"){const ks=val.split(",");const h=ks.map(k=>typeof FIGS!=="undefined"&&FIGS[k]?FIGS[k]():"").join("");return h?`<div class="x4vis">${h}</div>`:""}
  if(t==="sim")return `<div class="x4vis" style="display:block"><div data-x4simv="${esc(val)}" data-hid="${id}"></div></div>`;
  if(t==="svg")return `<div class="x4vis">${val}</div>`;
  if(t==="img")return `<div class="x4vis"><img src="${esc(val)}" alt="Hook picture"></div>`;
  if(t==="emo"){const p=val.split("|");return `<div class="x4vis"><div class="x4mys"><span style="font-size:clamp(54px,9vw,110px);letter-spacing:.08em">${p[0]}</span><small>${p[1]||""}</small></div></div>`}
  if(t==="txt"){const p=val.split("|");return `<div class="x4vis"><div class="x4mys">${p[0]}<small>${p[1]||""}</small></div></div>`}
  return "";
}
function hookVis(M,ctx){
  const code=ctx.SUB.code,ph=deskPhoto(ctx,["Notes/"+code+"/"+ctx.l.no]);
  if(ph)return visHTML("img:"+ph,ctx,"h");
  let v=M.hook.vis;
  if(!v){const fg=ctx.secs.map(s=>(s.body.match(/\{\{(\w+)\}\}/)||[])[1]).find(k=>k&&typeof FIGS!=="undefined"&&FIGS[k]);if(fg)v="fig:"+fg;else if(M.sims[0]&&M.simIn<0&&!M.acts.some(a=>a.sim===M.sims[0].id))v="sim:"+M.sims[0].id;else v="txt:"+esc(strip(ctx.l.t))+"|What do you think this lesson is about? What do you already know?"}
  return visHTML(v,ctx,"h");
}
/* ---------- rendering ---------- */
let CUR=null;
function render(ctx){
  const M=model(ctx),T=M.T,S=M.S,P=plan(M,ctx),{l,u}=ctx,F=ctx.F;
  CUR={M,ctx,P,part:Math.min(S.part||0,M.parts.length-1),done:new Set(S.done||[]),proj:""};
  let h=`<div class="x4lay${S.rail?" rail":""}" id="x4lay"><div class="x4main">`;
  /* topic hook */
  if(M.th){const th=M.th,ph=deskPhoto(ctx,["Notes/"+ctx.SUB.code+"/Topic "+u.n,"Notes/"+ctx.SUB.code+"/Topic"+u.n,"Notes/"+ctx.SUB.code+"/"+l.no]),vis=ph?visHTML("img:"+ph,ctx,"t"):visHTML(th[1],ctx,"t");
    const chain=(th[3]||[]).map(n=>{const x=ctx.U.find(z=>String(z.n)===String(n));return x?`<span class="${x===u?"here":""}">${x.n} ${esc(strip(x.name))}</span>`:""}).filter(Boolean).join("<i>→</i>");
    h+=`<section class="x4sec x4topic" id="x4-topic"${S.th===false?" hidden":""}><div class="x4sec-h"><h2>Why this topic matters</h2><span class="row" style="gap:8px;align-items:center"><span class="x4tag topic">Topic hook · Topic ${u.n}</span>${projBtn("x4-topic")}</span></div>
${vis?`<div class="x4rev" id="x4rv-t"><button class="x4cover" type="button" data-x4rev="x4rv-t">Tap to reveal<small>Show it to the class, then ask the question</small></button>${vis}</div>`:""}
<p class="x4bigq">${F(th[0])}</p>
${(th[2]||[]).length?`<div><b style="font-size:14px">Why we learn this</b><div class="x4why" style="margin-top:6px">${th[2].map(w=>`<div><b>${F(w[0])}</b>${F(w[1])}</div>`).join("")}</div></div>`:""}
${chain?`<div><b style="font-size:14px">Where it fits</b><div class="x4chain">${chain}</div></div>`:""}
${(th[4]||[]).length?`<div><b style="font-size:14px">By the end of this topic you will be able to answer:</b><ul style="margin:6px 0 0;padding-left:20px">${th[4].map(q=>`<li>${F(q)}</li>`).join("")}</ul></div>`:""}</section>`}
  /* connector */
  if(M.conn){const on=S.conn!==false;h+=`<section class="x4sec" id="x4-conn"><div class="x4sec-h"><h2>Lesson connector</h2><div class="row" style="gap:10px;align-items:center;flex-wrap:wrap"><span class="x4tag">Optional · links to ${esc(M.conn.from)}</span><label class="x4time" style="cursor:pointer"><input type="checkbox" id="x4conn" ${on?"checked":""}> Use in this lesson</label>${T?projBtn("x4-conn"):""}</div></div>
<div id="x4connb" ${on?"":"hidden"} style="display:flex;flex-direction:column;gap:10px"><div class="x4gq"><small>Connect to what you know</small><p>${F(M.conn.q)}</p></div><div class="x4task">${T?`<button class="x4clk" type="button" data-x4clk="conn" title="Start the timer">${M.conn.m}:00</button>`:""}<div><p><b>Recall and link · ${M.conn.m} min</b>${T?` <button class="btn sm" type="button" data-x4go="conn">Start</button>`:""}</p><p>${F(M.conn.task)}</p></div></div></div></section>`}
  /* hook */
  if(T){h+=`<section class="x4sec" id="x4-hook"><div class="x4sec-h"><h2>Hook</h2><span class="row" style="gap:10px;align-items:center">${timeIn("hook",P.hook)}${projBtn("x4-hook")}</span></div>
<div class="x4rev${S.hopen?" open":""}" id="x4rv-h"><button class="x4cover" type="button" data-x4rev="x4rv-h">Tap to reveal<small>A picture to wonder about. Reveal it, then ask the big question.</small></button>${hookVis(M,ctx)}</div>
<p class="x4bigq">Big question: ${F(M.hook.q)}</p>
<label class="x4lab">Our ideas now (type the class’s first guesses)<textarea id="x4ideas" placeholder="Write the first ideas here. They come back in the Summary.">${esc(S.ideas||"")}</textarea></label></section>`}
  /* explore */
  const A=curAct(M);
  h+=`<section class="x4sec" id="x4-explore"><div class="x4sec-h"><h2>Explore</h2><span class="row" style="gap:10px;align-items:center">${timeIn("exp",P.exp)}${T?projBtn("x4-explore"):""}</span></div>`;
  if(M.acts.length){
    h+=`<div class="x4pick" role="group" aria-label="Choose the activity">${M.acts.map((a,i)=>`<button class="x4chip" type="button" data-x4act="${i}" aria-pressed="${a===A}">${esc(AK[a.k]||"Activity")}${a.o&&a.o.intl?" · international":""}${PAPER[a.k]?" (uses paper)":""} · ${a.m} min</button>`).join("")}</div>
<p class="mute" id="x4why">${whyAct(A,M)}</p><div id="x4actbox">${actHTML(A,M,ctx)}</div>`;
  }else h+=`<p class="mute">No activity for this lesson yet. Go straight to Explain.</p>`;
  h+=`</section>`;
  /* explain */
  h+=`<section class="x4sec" id="x4-explain"><div class="x4sec-h"><h2>Explain</h2><span class="row" style="gap:10px;align-items:center">${timeIn("expl",P.expl)}${T?projBtn("x4-explain"):""}</span></div>
<details class="x4bar" id="x4bar"><summary></summary><ol></ol></details>
<div class="x4parts" role="tablist" aria-label="Parts of the notes" id="x4tabs"></div><div class="x4pb" id="x4pb"></div></section>`;
  /* summary */
  h+=`<section class="x4sec" id="x4-summary"><div class="x4sec-h"><h2>Summary</h2><span class="row" style="gap:10px;align-items:center">${timeIn("sum",P.sum)}${T?projBtn("x4-summary"):""}</span></div>
<p class="x4bigq">${T?"Back to the big question: ":"Big question: "}${F(M.hook.q)}</p>
<div class="x4sum">${T?`<div class="x4box"><h4>What we thought at the start</h4><p class="mute" id="x4back"></p></div>`:""}<div class="x4box"><h4>What we know now</h4><p style="margin:0">${F(M.hook.ans)}</p></div></div>
<div class="x4box"><h4>Key points</h4><ul>${M.sum.map(s=>`<li>${F(s)}</li>`).join("")}</ul></div>
<div class="x4box"><h4>Can you answer the question ladder?</h4><ol style="margin:0;padding-left:20px">${M.parts.map(p=>`<li>${F(p.q)}</li>`).join("")}</ol></div>
${T?`<div class="x4end"><p class="mute">In Teaching Mode this opens the colour check for your class. You can project it so learners choose their own colour.</p><button class="btn pri" type="button" id="x4endbtn">End lesson and check learners</button></div>`:""}</section>`;
  h+=(ctx.extra||"")+`</div>`;
  /* ladder column */
  h+=`<div class="x4col">${T?`<div class="x4slot" aria-hidden="true"></div>`:""}<aside class="x4lad" aria-label="Question ladder"><div class="x4lad-h"><h3>Question ladder</h3><button type="button" id="x4railbtn" aria-label="Shrink or expand the question ladder" title="Shrink or expand">${S.rail?"⇤":"⇥"}</button></div><ol id="x4ladder"></ol><p class="mute">Each part’s question is a step towards the big question. Steps tick off as you reveal each explanation.</p></aside></div></div>`;
  return h;
}
const projBtn=id=>HUB.teacher?`<button class="btn sm" type="button" data-x4proj="${id}" title="Show this on the projector">Project</button>`:"";
const timeIn=(k,v)=>HUB.teacher?`<label class="x4time">Time <input type="number" min="0" max="80" value="${v}" data-x4t="${k}" aria-label="Minutes"> min</label>`:"";
function whyAct(a,M){
  if(!a)return "";
  const r={sim:"a simulation exists for this lesson, so learners can discover the idea themselves with nothing to print",cards:"card activities use paper, so the hub suggests them about once per topic",out:"this idea suits a short outdoor model",case:"a real study gives learners evidence to reason with",diag:"learners use the ideas to work out what went wrong",prob:"learners apply the idea to a real problem",data:"learners find the pattern in real data",disc:"it needs no materials and gets every learner talking",debate:"it makes learners weigh evidence on both sides",ibl:"learners investigate the question before the notes",role:"acting it out makes the process memorable",model:"building a simple model makes the idea visible"}[a.k]||"it fits this lesson";
  return (M.S.act==null?"Chosen for this lesson: ":"Selected: ")+`<b>${esc(AK[a.k]||"Activity")}${a.o&&a.o.intl?" (international)":""}</b>, because ${a.o&&a.o.intl?"it shows the same science in a real case from elsewhere in the world":r}. ${M.T?"Swap any time.":""}`;
}
function actHTML(a,M,ctx){
  if(!a)return "";const F=ctx.F,T=M.T;
  const study=a.study?`<div class="x4study">${a.study.split(/\n+/).map(p=>`<p>${F(p)}</p>`).join("")}${a.src?`<p class="x4src">Source: ${F(a.src)}</p>`:""}</div>`:a.src?`<p class="x4src">Source: ${F(a.src)}</p>`:"";
  const cards=a.cards&&a.cards.length&&T?`<details><summary class="btn sm" style="display:inline-flex">Show the ${a.cards.length} cards</summary><div class="x4sheet" style="margin-top:8px;min-width:0;grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">${a.cards.map(c=>`<div class="x4card">${F(c[0])}${a.o.pairs?`<u>${F(c[1])}</u>`:""}</div>`).join("")}</div></details>`:"";
  const simb=a.k==="sim"&&a.sim?`<div class="x4simbox"><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri sm" type="button" data-x4sim="${esc(a.sim)}">Open simulation</button><button class="btn sm" type="button" data-simproj="${esc(a.sim)}">Project</button></div><div data-x4simhost="${esc(a.sim)}"></div></div>`:"";
  const roles=T&&a.roles?`<h4>Roles</h4><p style="margin:0">${esc(rolesList().join(" · "))}</p>`:"";
  return `<div class="x4act"><div><h3>${F(a.t)}</h3>${study}<ol>${a.st.map(s=>`<li>${F(s)}</li>`).join("")}</ol>${a.safety?`<p class="mute" style="margin-top:8px"><b>Safety:</b> ${F(a.safety)}</p>`:""}${cards}</div>
<div class="x4side"><h4>Materials</h4><div class="x4mat">${a.mat.map(m=>`<span>${F(m)}</span>`).join("")}</div>${roles}${T?`<h4>Time</h4><label class="x4time" style="font-size:14px"><input type="number" min="1" max="80" value="${a.m}" id="x4am" aria-label="Activity minutes"> min estimated (editable)</label>
<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri sm" type="button" id="x4start">Start activity</button>${a.k!=="sim"?`<button class="btn sm" type="button" id="x4pack">Print pack</button>`:""}</div>`:`<h4>Time</h4><p style="margin:0">About ${a.m} minutes</p>`}</div></div>${simb}`;
}
function rolesList(){try{return (HUBSET.get().ibl.roles||"Manager, Recorder, Timekeeper, Reporter").split(",").map(x=>x.trim()).filter(Boolean)}catch(e){return ["Manager","Recorder","Timekeeper","Reporter"]}}
function partHTML(){
  const {M,ctx}=CUR,F=ctx.F,T=M.T,i=CUR.part,p=M.parts[i],n=M.parts.length,open=CUR.done.has(i);
  const lab=T?(TK[p.tk]||"Task"):(TKS[p.tk]||TK[p.tk]||"Task");
  const simb=M.simIn===i&&M.sims[0]?`<div class="x4simbox"><b>Simulation: ${esc(M.sims[0].t)}</b><p class="mute">${esc(M.sims[0].d||"")}</p><div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri sm" type="button" data-x4sim="${esc(M.sims[0].id)}">Open simulation</button><button class="btn sm" type="button" data-simproj="${esc(M.sims[0].id)}">Project</button></div><div data-x4simhost="${esc(M.sims[0].id)}"></div></div>`:"";
  return `<div class="x4gq"><small>Guiding question · Part ${i+1} of ${n}${p.s.ext?" · Extended":""}</small><p>${F(p.q)}</p></div>
<div class="x4task">${T?`<button class="x4clk" type="button" id="x4tclk" title="Restart the task timer">${p.m}:00</button>`:""}<div><p><b>${esc(lab)} · ${p.m} min</b>${T?` <span class="mute">(the timer starts when this part opens)</span>`:""}</p><p>${F(p.txt)}</p></div></div>
${simb}<div class="x4notes${open?" open":""}" id="x4notes"><button class="x4cover" type="button" id="x4shown">Show the explanation</button><h3 style="margin:0 0 8px;font-size:calc(17*var(--u))">${F(p.s.title)}</h3>${ctx.secHTML(p.s)}</div>
${p.chk.length?`<div class="x4check"><h4>Quick check</h4>${p.chk.map((c,k)=>`<div class="x4qa"><span>${k+1}. ${F(qtx(c[0]))}</span><button class="btn sm" type="button" data-x4ans="${k}" style="align-self:flex-start">Show answer</button><span class="ans" hidden id="x4ans${k}">${F(c[1])}</span></div>`).join("")}</div>`:""}
<div class="x4nav">${i>0?`<button class="btn sm" type="button" data-x4part="${i-1}">◀ Part ${i}</button>`:"<span></span>"}${i<n-1?`<button class="btn pri sm" type="button" data-x4part="${i+1}">Part ${i+2} ▶</button>`:`<button class="btn pri sm" type="button" data-x4goto="x4-summary">Go to Summary ▶</button>`}</div>`;
}
function ladder(p){
  const {M,ctx}=CUR,F=ctx.F,i=CUR.part,d=CUR.done;
  const lad=p.querySelector("#x4ladder");
  if(lad)lad.innerHTML=`<li class="big" data-x4goto="${M.T?"x4-hook":"x4-summary"}"><span class="dot">?</span><span>${F(M.hook.q)}</span></li>`+M.parts.map((x,k)=>`<li class="${d.has(k)?"done":""} ${k===i?"cur":""}" data-x4lp="${k}"><span class="dot">${d.has(k)?"✓":""}</span><span>${k+1}. ${F(x.q)}</span></li>`).join("");
  const lb=p.querySelector("#x4bar");
  if(lb){lb.querySelector("summary").innerHTML=`<span>Question ladder · step ${i+1} of ${M.parts.length}</span><span class="x4steps"><i class="cur">?</i>${M.parts.map((x,k)=>`<b></b><i class="${d.has(k)?"done":""} ${k===i&&!d.has(k)?"cur":""}">${d.has(k)?"✓":k+1}</i>`).join("")}</span>`;
    lb.querySelector("ol").innerHTML=`<li data-x4goto="${M.T?"x4-hook":"x4-summary"}"><b>Big question:</b> ${F(M.hook.q)}</li>`+M.parts.map((x,k)=>`<li class="${k===i?"cur":""}" data-x4lp="${k}">${d.has(k)?"✓ ":""}${k+1}. ${F(x.q)}</li>`).join("")}
  const tabs=p.querySelector("#x4tabs");
  if(tabs)tabs.innerHTML=M.parts.map((x,k)=>`<button class="x4chip" role="tab" type="button" data-x4part="${k}" aria-pressed="${k===i}" title="${esc(strip(x.s.title))}">Part ${k+1}${x.s.ext?" (Ext)":""}${d.has(k)?" ✓":""}</button>`).join("");
}
/* ---------- header strip ---------- */
function stripHTML(){
  const {M,P}=CUR,T=M.T,on=x=>x;
  const L=[["x4-topic","Topic hook",P.topic,M.th&&M.S.th!==false],["x4-conn","Connector",P.conn,M.conn&&M.S.conn!==false],["x4-hook","Hook",P.hook,T],["x4-explore","Explore",P.exp,1],["x4-explain","Explain",P.expl,1],["x4-summary","Summary",P.sum,1]];
  return L.filter(x=>x[3]).map(x=>`<a href="#${x[0]}" data-x4goto="${x[0]}">${x[1]}${T?` <small>${x[2]}</small>`:""}</a>`).join("");
}
function optsHTML(){
  const {M,P}=CUR,T=M.T;if(!T)return "";
  const fit=P.est<=46?"fits a single 40-minute lesson":"fits better in a double (80 minutes)";
  return `<span class="x4plan${P.total>P.per?" over":""}" title="Planned minutes for this stage / period length"><b id="x4tot">${P.total}</b> / ${P.per} min</span><button class="btn sm" type="button" id="x4optbtn" aria-expanded="false" aria-controls="x4menu">Lesson options ⋯</button>
<div class="x4menu" id="x4menu" hidden><div><b>Period</b><div class="x4seg" role="group" aria-label="Period length"><button type="button" data-x4per="40" aria-pressed="${P.per===40}">Single 40</button><button type="button" data-x4per="80" aria-pressed="${P.per===80}">Double 80</button></div><p class="mute" style="margin-top:6px">Estimate: about ${P.est} min of teaching, so this lesson ${fit}.</p></div>
${M.th?`<div><b>Topic hook</b><p class="mute">Shown automatically on the first lesson of a topic.</p><div class="x4seg" role="group" aria-label="Topic hook"><button type="button" data-x4th="1" aria-pressed="${M.S.th!==false}">Show</button><button type="button" data-x4th="0" aria-pressed="${M.S.th===false}">Hide</button></div></div>`:""}
<div><b>Times</b><button class="btn sm" type="button" id="x4reset">Reset to the hub’s estimate</button></div></div>`;
}
/* ---------- binding ---------- */
let scrollFn=null,ro=null;
function bind(p){
  const {M,ctx}=CUR,S=M.S,T=M.T,hdr=document.getElementById("x4hdr");
  const fillHdr=()=>{const s=document.getElementById("x4secs"),o=document.getElementById("x4opts");if(s)s.innerHTML=stripHTML();if(o)o.innerHTML=optsHTML()};
  fillHdr();
  const showPart=(i,auto)=>{CUR.part=i;S.part=i;sv(S);const pb=p.querySelector("#x4pb");pb.innerHTML=partHTML();ctx.after&&ctx.after(pb);ladder(p);if(auto&&T)startTask();reproj("x4-explain")};
  const startTask=()=>{const pt=M.parts[CUR.part];if(window.HUBTIMER)HUBTIMER.task(pt.m*60,"Part "+(CUR.part+1)+": "+(TK[pt.tk]||"Task"))};
  showPart(CUR.part,false);
  const echo=()=>{const b=p.querySelector("#x4back"),t=p.querySelector("#x4ideas");if(b)b.textContent=(t&&t.value)||"(nothing written yet)"};echo();
  p.addEventListener("input",e=>{
    const t=e.target;
    if(t.id==="x4ideas"){S.ideas=t.value;sv(S);echo()}
    else if(t.dataset.x4t){S.t=S.t||{};const v=parseInt(t.value,10);if(isNaN(v))return;S.t[t.dataset.x4t]=v;sv(S);recalc(false)}
    else if(t.id==="x4am"){const a=curAct(M);const v=parseInt(t.value,10);if(a&&v>0){a.m=v;S.am=S.am||{};S.am[M.acts.indexOf(a)]=v;sv(S);recalc(false)}}
  });
  if(S.am)Object.keys(S.am).forEach(k=>{if(M.acts[k])M.acts[k].m=S.am[k]});
  p.addEventListener("change",e=>{if(e.target.id==="x4conn"){S.conn=e.target.checked;sv(S);p.querySelector("#x4connb").hidden=!S.conn;recalc(true)}});
  p.addEventListener("click",e=>{
    const b=e.target.closest("button,li,a");if(!b||!p.contains(b))return;
    const d=b.dataset;
    if(d.x4rev){const r=p.querySelector("#"+d.x4rev);r.classList.add("open");if(d.x4rev==="x4rv-h"){S.hopen=1;sv(S)}const sh=r.querySelector("[data-x4simv]");if(sh&&!sh.firstChild&&typeof simMount!=="undefined")simMount(sh,sh.dataset.x4simv);reproj(r.closest("section").id)}
    else if(d.x4act!=null){S.act=+d.x4act;sv(S);const a=curAct(M);p.querySelectorAll("[data-x4act]").forEach(c=>c.setAttribute("aria-pressed",String(c===b)));p.querySelector("#x4why").innerHTML=whyAct(a,M);p.querySelector("#x4actbox").innerHTML=actHTML(a,M,ctx);recalc(false);reproj("x4-explore")}
    else if(b.id==="x4start"){const a=curAct(M);if(window.HUBTIMER)HUBTIMER.task(a.m*60,"Activity: "+(AK[a.k]||"Activity"));b.textContent="Restart activity timer"}
    else if(b.id==="x4pack"){if(window.X4PACK)X4PACK.open(curAct(M),ctx,M)}
    else if(d.x4sim){const host=p.querySelector(`[data-x4simhost="${d.x4sim}"]`);if(!host)return;if(host.firstChild){host.innerHTML="";b.textContent="Open simulation"}else{simMount(host,d.x4sim);b.textContent="Close simulation"}}
    else if(d.simproj){if(typeof simProject!=="undefined")simProject(d.simproj)}
    else if(d.x4part!=null){showPart(+d.x4part,true);const ex=p.querySelector("#x4-explain");if(ex&&ex.getBoundingClientRect().top<0)ex.scrollIntoView({block:"start"})}
    else if(d.x4lp!=null){showPart(+d.x4lp,true);p.querySelector("#x4-explain").scrollIntoView({behavior:"smooth",block:"start"})}
    else if(d.x4goto){e.preventDefault();const t=document.getElementById(d.x4goto);if(t)t.scrollIntoView({behavior:"smooth",block:"start"})}
    else if(b.id==="x4shown"){const n=p.querySelector("#x4notes");n.classList.add("open");CUR.done.add(CUR.part);S.done=[...CUR.done];sv(S);ladder(p);reproj("x4-explain")}
    else if(d.x4ans!=null){p.querySelector("#x4ans"+d.x4ans).hidden=false;b.hidden=true}
    else if(b.id==="x4tclk"){startTask()}
    else if(d.x4clk==="conn"||d.x4go==="conn"){if(window.HUBTIMER)HUBTIMER.task(M.conn.m*60,"Lesson connector")}
    else if(b.id==="x4railbtn"){S.rail=!S.rail;sv(S);p.querySelector("#x4lay").classList.toggle("rail",!!S.rail);b.textContent=S.rail?"⇤":"⇥";setTimeout(()=>window.HUBTIMER&&HUBTIMER.place(),60)}
    else if(d.x4proj){project(d.x4proj)}
    else if(b.id==="x4endbtn"){if(window.HUBTEACH&&HUBTEACH.end&&HUBTEACH.end())return;ctx.projEnd&&ctx.projEnd()}
  });
  /* header controls live outside the panel */
  const hc=e=>{
    const b=e.target.closest("button,a");if(!b)return;const d=b.dataset;
    if(b.id==="x4optbtn"){e.stopPropagation();const m=document.getElementById("x4menu");m.hidden=!m.hidden;b.setAttribute("aria-expanded",String(!m.hidden));return}
    if(d.x4per){S.per=+d.x4per;delete S.t;sv(S);recalc(true,true)}
    else if(d.x4th){S.th=d.x4th==="1";sv(S);const t=document.getElementById("x4-topic");if(t)t.hidden=!S.th;recalc(true,true)}
    else if(b.id==="x4reset"){delete S.t;delete S.per;sv(S);recalc(true,true)}
    else if(d.x4goto){e.preventDefault();const t=document.getElementById(d.x4goto);if(t){t.scrollIntoView({behavior:"smooth",block:"start"});if(d.x4goto==="x4-explain"&&T&&!CUR.tstarted){CUR.tstarted=1;startTask()}}}
  };
  if(hdr){hdr.onclick=hc}
  document.addEventListener("click",outside);
  function recalc(full,keepMenu){CUR.P=plan(M,ctx);const P=CUR.P;
    p.querySelectorAll("[data-x4t]").forEach(i=>{if(document.activeElement!==i)i.value=P[i.dataset.x4t]});
    const s=document.getElementById("x4secs");if(s)s.innerHTML=stripHTML();
    const o=document.getElementById("x4opts");if(o&&(full||!o.querySelector("#x4menu:not([hidden])"))){const wasOpen=keepMenu&&o.querySelector("#x4menu")&&!o.querySelector("#x4menu").hidden;o.innerHTML=optsHTML();if(wasOpen){o.querySelector("#x4menu").hidden=false}}
    else if(o){const tt=o.querySelector("#x4tot");if(tt)tt.textContent=P.total;const pl=o.querySelector(".x4plan");if(pl)pl.classList.toggle("over",P.total>P.per)}
  }
  /* sticky header behaviour */
  if(scrollFn)removeEventListener("scroll",scrollFn);
  if(hdr){const setH=()=>document.documentElement.style.setProperty("--x4hh",hdr.offsetHeight+"px");let last=scrollY,lock=0;
    scrollFn=()=>{const y=scrollY,now=Date.now();if(now>lock){const c=hdr.classList.contains("compact");if(!c&&y>last+12&&y>260){hdr.classList.add("compact");lock=now+400}else if(c&&(y<last-24||y<140)){hdr.classList.remove("compact");lock=now+400}last=y}else last=y;setTimeout(setH,260);
      let cur=null;document.querySelectorAll("#x4secs a").forEach(a=>{const t=document.getElementById(a.dataset.x4goto);if(t&&!t.hidden&&t.getBoundingClientRect().top<hdr.offsetHeight+120)cur=a});document.querySelectorAll("#x4secs a").forEach(a=>a.classList.toggle("on",a===cur))};
    addEventListener("scroll",scrollFn,{passive:true});if(ro)ro.disconnect();if(window.ResizeObserver){ro=new ResizeObserver(setH);ro.observe(hdr)}setH()}
  setTimeout(()=>window.HUBTIMER&&HUBTIMER.place(),80);
}
function outside(e){const m=document.getElementById("x4menu"),b=document.getElementById("x4optbtn");if(!m){document.removeEventListener("click",outside);return}if(!m.hidden&&!m.contains(e.target)&&e.target!==b){m.hidden=true;b&&b.setAttribute("aria-expanded","false")}}
function project(id){if(typeof PROJ==="undefined")return;const n=document.getElementById(id);if(!n)return;CUR&&(CUR.proj=id);
  const c=n.cloneNode(true);c.querySelectorAll("[data-x4proj],.x4time,.x4cover,textarea,#x4am,#x4start,#x4pack,[data-simproj],[data-x4sim]").forEach(x=>{if(x.tagName==="TEXTAREA"){const pdiv=document.createElement("p");pdiv.textContent=x.value;x.replaceWith(pdiv)}else x.remove()});
  c.querySelectorAll(".x4rev:not(.open) .x4vis,.x4notes:not(.open)>*:not(.x4cover)").forEach(x=>x.style.visibility="hidden");
  c.querySelectorAll(".x4notes:not(.open)").forEach(x=>{const m=document.createElement("p");m.className="x4bigq";m.style.cssText="position:absolute;inset:0;display:grid;place-items:center;font-size:22px";m.textContent="Explanation coming up…";x.appendChild(m)});
  c.querySelectorAll(".x4rev:not(.open)").forEach(x=>{const m=document.createElement("p");m.className="x4bigq";m.style.cssText="position:absolute;inset:0;display:grid;place-items:center;font-size:26px";m.textContent="❓";x.appendChild(m)});
  c.querySelectorAll("[id]").forEach(x=>x.removeAttribute("id"));c.querySelectorAll("[data-x4simv],[data-x4simhost]").forEach(x=>x.innerHTML="");
  PROJ.showHTML(`<div class="x4main" style="max-width:1200px;margin:auto">${c.outerHTML}</div>`);
}
function reproj(id){try{if(CUR&&CUR.proj===id&&typeof PROJ!=="undefined"&&PROJ.active)project(id)}catch(e){}}
function leave(){if(scrollFn){removeEventListener("scroll",scrollFn);scrollFn=null}if(ro){ro.disconnect();ro=null}const s=document.getElementById("x4secs"),o=document.getElementById("x4opts");if(s)s.innerHTML="";if(o)o.innerHTML="";const h=document.getElementById("x4hdr");if(h){h.onclick=null;h.classList.remove("compact")}}
return {add,topic,render,bind,leave,C,TH,model,plan,get cur(){return CUR},strip,AK,TK,esc};
})();
function X4ADD(s,o){X4.add(s,o)}
function X4TOPIC(s,o){X4.topic(s,o)}
