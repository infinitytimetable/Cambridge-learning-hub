/* ===== 4.0 tools: annotate bar (all hubs) and print packs for activities (Master hub) ===== */
(function(){
"use strict";
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const plain=h=>String(h||"").replace(/<br\s*\/?>/gi," ").replace(/<[^>]+>/g,"").replace(/~([^~]+)~/g,"$1").replace(/\^([^\^]+)\^/g,"$1").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim();
/* ---------- annotate bar ---------- */
function mountAnn(){
  if($("#x4ann"))return;
  const bar=document.createElement("div");bar.className="x4ann";bar.id="x4ann";bar.setAttribute("aria-label","Annotate");
  bar.innerHTML=`<button type="button" id="x4a-open" title="Annotate the screen" aria-pressed="false">✎</button><div class="tools">
${[["#111111","Black pen"],["#d22b2b","Red pen"],["#1f5fd1","Blue pen"],["#178a4c","Green pen"]].map((p,i)=>`<button type="button" data-pen="${p[0]}" title="${p[1]}" aria-pressed="${i===0}"><span class="sw2" style="background:${p[0]}"></span></button>`).join("")}
<button type="button" data-pen="hl" title="Highlighter" aria-pressed="false"><span class="sw2" style="background:#ffe14d"></span></button><button type="button" data-pen="er" title="Eraser" aria-pressed="false">⌫</button>
<button type="button" id="x4a-size" title="Pen size: small, medium, large">●</button><button type="button" id="x4a-bg" title="White layer on or off">◐</button><button type="button" id="x4a-undo" title="Undo">↶</button><button type="button" id="x4a-clear" title="Clear all">🗑</button><button type="button" id="x4a-save" title="Save as picture">💾</button></div>`;
  const ov=document.createElement("div");ov.className="x4annov";ov.id="x4annov";ov.hidden=true;ov.innerHTML=`<canvas></canvas>`;
  const hint=document.createElement("div");hint.className="x4annhint";hint.hidden=true;hint.textContent="Annotating: draw with your finger or pen. Tap ✎ to close.";
  document.body.append(ov,hint,bar);
  const cv=ov.querySelector("canvas"),g=cv.getContext("2d");let on=false,pen="#111111",size=4,strokes=[],cur=null;
  const fit=()=>{const r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;g.setTransform(r,0,0,r,0,0);redraw()};
  const drawS=(G,s)=>{G.save();G.globalCompositeOperation=s.p==="er"?"destination-out":"source-over";G.strokeStyle=s.p==="hl"?"rgba(255,225,77,.45)":s.p==="er"?"#000":s.p;G.lineWidth=s.p==="hl"?s.w*5:s.p==="er"?s.w*6:s.w;G.lineCap="round";G.lineJoin="round";G.beginPath();s.pts.forEach((q,i)=>i?G.lineTo(q[0],q[1]):G.moveTo(q[0],q[1]));if(s.pts.length===1)G.lineTo(s.pts[0][0]+.1,s.pts[0][1]);G.stroke();G.restore()};
  const redraw=()=>{g.clearRect(0,0,cv.width,cv.height);strokes.forEach(s=>drawS(g,s))};
  const toggle=v=>{on=v;bar.classList.toggle("on",on);ov.hidden=!on;hint.hidden=!on;$("#x4a-open").setAttribute("aria-pressed",String(on));if(on)fit()};
  $("#x4a-open").onclick=()=>toggle(!on);
  $$("[data-pen]",bar).forEach(b=>b.onclick=()=>{pen=b.dataset.pen;$$("[data-pen]",bar).forEach(x=>x.setAttribute("aria-pressed",String(x===b)))});
  const sizes=[2,4,8];$("#x4a-size").onclick=()=>{size=sizes[(sizes.indexOf(size)+1)%3];$("#x4a-size").style.fontSize=(10+size*1.5)+"px"};
  $("#x4a-bg").onclick=()=>ov.classList.toggle("clear");$("#x4a-undo").onclick=()=>{strokes.pop();redraw()};$("#x4a-clear").onclick=()=>{strokes=[];redraw()};
  $("#x4a-save").onclick=()=>savePic(strokes,drawS,ov.classList.contains("clear"));
  ov.addEventListener("pointerdown",e=>{cur={p:pen,w:size,pts:[[e.clientX,e.clientY]]};strokes.push(cur);try{ov.setPointerCapture(e.pointerId)}catch(_){}redraw()});
  ov.addEventListener("pointermove",e=>{if(!cur)return;cur.pts.push([e.clientX,e.clientY]);redraw()});
  ov.addEventListener("pointerup",()=>{cur=null});ov.addEventListener("pointercancel",()=>{cur=null});
  addEventListener("resize",()=>{if(on)fit()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&on)toggle(false)});
  window.addEventListener("hashchange",()=>{if(on)toggle(false);strokes=[];redraw();vis()});
  const vis=()=>{bar.hidden=!(document.querySelector(".deck-hero")||document.querySelector("[data-simhost],.simpage"))};vis();
  new MutationObserver(()=>vis()).observe($("#app")||document.body,{childList:true});
}
/* Save as picture: the visible page plus the drawing, as a PNG. Falls back to the drawing on white if the page cannot be captured. */
async function savePic(strokes,drawS,clear){
  const W=innerWidth,H=innerHeight,r=Math.min(2,devicePixelRatio||1),c=document.createElement("canvas");c.width=W*r;c.height=H*r;const g=c.getContext("2d");g.scale(r,r);
  g.fillStyle=getComputedStyle(document.body).backgroundColor||"#fff";g.fillRect(0,0,W,H);
  let ok=false;
  try{
    const css=[...document.querySelectorAll("style")].map(s=>s.textContent).join("\n").replace(/@import[^;]+;/g,"");
    const clone=document.body.cloneNode(true);clone.querySelectorAll("script,#x4ann,#x4annov,.x4annhint,#tmr").forEach(x=>x.remove());
    clone.querySelectorAll("canvas").forEach(x=>x.remove());
    const htmlAttr=[...document.documentElement.attributes].map(a=>`${a.name}="${esc(a.value)}"`).join(" ");
    const xml=new XMLSerializer().serializeToString(clone);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><foreignObject width="100%" height="100%"><html xmlns="http://www.w3.org/1999/xhtml" ${htmlAttr}><head><style>${css.replace(/<\/?/g,m=>m)}</style></head><div style="transform:translate(${-scrollX}px,${-scrollY}px);width:${document.documentElement.scrollWidth}px">${xml}</div></html></foreignObject></svg>`;
    const img=new Image();const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"}));
    await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=url;setTimeout(rej,6000)});
    g.drawImage(img,0,0,W,H);URL.revokeObjectURL(url);c.toDataURL();ok=true;
  }catch(e){g.setTransform(r,0,0,r,0,0);g.fillStyle="#fff";g.fillRect(0,0,W,H);ok=false}
  if(!clear){g.fillStyle="rgba(255,255,255,.5)";g.fillRect(0,0,W,H)}
  strokes.forEach(s=>drawS(g,s));
  try{const blob=await new Promise(res=>c.toBlob(res,"image/png"));const d=new Date(),nm="Annotation "+d.toISOString().slice(0,16).replace(/[T:]/g,"-")+".png";
    if(window.HUBAPP&&HUBAPP.saveFile)await HUBAPP.saveFile(nm,blob);
    toastMsg(ok?"Saved the picture with your annotations.":"Saved your annotations (the page itself could not be captured).")}catch(e){toastMsg("Sorry, the picture could not be saved.")}
}
function toastMsg(t){const d=document.createElement("div");d.className="x4annhint";d.style.top="auto";d.style.bottom="20px";d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),3500)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mountAnn);else mountAnn();
/* tell the teacher once when the installed hub has updated itself from GitHub */
setTimeout(()=>{try{const u=window.LOTS_UPDATE;if(u&&u.version){const d=document.createElement("div");d.className="x4annhint";d.style.cssText="top:auto;bottom:20px;pointer-events:auto;cursor:pointer;max-width:90vw;font-size:15px;padding:10px 16px";d.textContent="LOTS Hub updated itself to version "+u.version+". Tap to close.";d.onclick=()=>d.remove();document.body.appendChild(d);setTimeout(()=>d.remove(),12000)}}catch(e){}},2500);

/* ---------- print packs (Master hub) ---------- */
if(!HUB.teacher)return;
const ROLE_D={manager:"Keeps the group on task. Makes sure everyone speaks and the task is finished on time.",recorder:"Writes down the group's answers clearly on the recording sheet.",timekeeper:"Watches the time and warns the group at the halfway point and with one minute left.",reporter:"Shares the group's answers with the class and answers questions.",technician:"Collects, hands out and returns the materials. Keeps the cards in their set.",checker:"Checks every answer against the notes before it is written down.",encourager:"Helps everyone take part and praises good ideas."};
const roleDesc=r=>ROLE_D[r.toLowerCase()]||"Takes on this job for the group and helps the group finish the task.";
const roles=()=>{try{return (HUBSET.get().ibl.roles||"Manager, Recorder, Timekeeper, Reporter").split(",").map(x=>x.trim()).filter(Boolean)}catch(e){return ["Manager","Recorder","Timekeeper","Reporter"]}};
const L=n=>String.fromCharCode(65+(n%26))+(n>=26?Math.floor(n/26):"");
function cardsOf(a){
  if(!a.cards||!a.cards.length)return [];
  if(a.o&&a.o.pairs){const out=[];a.cards.forEach(c=>{out.push(c[0]);out.push(c[1])});return out}
  return a.cards.map(c=>c[0]).concat(a.cats||[]).map(String);
}
function buildModel(a,ctx,o){
  const {l}=ctx,groups=o.groups,cpp=o.cpp,cols=cpp===8?2:3,tag=l.no+" "+plain(l.t),blocks=[],R=a.roles?roles():[];
  const cards=cardsOf(a);
  blocks.push({t:"band",text:"Print pack: "+plain(a.t)});
  blocks.push({t:"kv",pairs:[["Lesson",ctx.SUB.title+" | "+l.no+" "+plain(l.t)],["Class",o.cls+" ("+o.n+" learners)"],["Groups",groups+" groups of about "+o.size+" (sets "+L(0)+" to "+L(groups-1)+")"],["Time",a.m+" minutes"],["Materials",a.mat.map(plain).join("; ")]]});
  blocks.push({t:"h",l:2,text:"Steps"});blocks.push({t:"ol",items:a.st.map(plain)});
  const contents=[];if(cards.length)contents.push(o.cardPages+" card page(s): "+cards.length+" cards per set, "+cpp+" cards per A4 page. Each card shows its set letter.");if(R.length)contents.push("Role cards for every group.");contents.push(groups+" task and recording sheets (one per group).");contents.push("Answer key (teacher only).");
  blocks.push({t:"h",l:2,text:"Contents of this pack"});blocks.push({t:"ul",items:contents});
  if(a.safety)blocks.push({t:"box",tone:"warn",title:"Safety",text:plain(a.safety)});
  /* cards: all sets flow onto as many pages as needed */
  if(cards.length){
    const all=[];for(let gI=0;gI<groups;gI++){const order=cards.slice();if(a.o&&a.o.pairs)order.sort(()=>Math.random()-.5);order.forEach(t=>all.push([L(gI),t]))}
    for(let p=0;p<all.length;p+=cpp){
      blocks.push({t:"pb"});blocks.push({t:"p",text:"Cards | "+tag+" | page "+(p/cpp+1)+" of "+Math.ceil(all.length/cpp)+" | cut along the lines",size:8,color:"666666"});
      const chunk=all.slice(p,p+cpp),rows=[];for(let i=0;i<chunk.length;i+=cols){const r=[];for(let k=0;k<cols;k++){const c=chunk[i+k];r.push(c?["§Set "+c[0],plain(c[1])].concat(new Array(cpp===8?7:6).fill(" ")):[" "])}rows.push(r)}
      blocks.push({t:"table",rows,widths:new Array(cols).fill(1),fontSize:cpp===8?14:12,gridColor:"888888"});
    }
  }
  /* role cards */
  if(R.length){blocks.push({t:"pb"});blocks.push({t:"h",l:2,text:"Role cards (cut out; one set per group)"});
    const rc=[];for(let gI=0;gI<groups;gI++)R.forEach(r=>rc.push(["§Group "+L(gI)+" · "+r,roleDesc(r)," "]));const rows=[];for(let i=0;i<rc.length;i+=2)rows.push([rc[i],rc[i+1]||[" "]]);
    blocks.push({t:"table",rows,widths:[1,1],fontSize:11,gridColor:"888888"})}
  /* task + recording sheets */
  for(let gI=0;gI<groups;gI++){
    blocks.push({t:"pb"});blocks.push({t:"band",text:"Group "+L(gI)+": "+plain(a.t)});
    blocks.push({t:"p",text:"Names: ________________________________________________   Class: "+o.cls,size:10});
    if(a.study)a.study.split(/\n+/).forEach(pp=>blocks.push({t:"box",tone:"info",text:plain(pp)}));
    if(a.src)blocks.push({t:"p",text:"Source: "+plain(a.src),size:8,color:"666666"});
    blocks.push({t:"h",l:3,text:"What to do"});blocks.push({t:"ol",items:a.st.map(plain)});
    blocks.push({t:"h",l:3,text:"Our answers"});
    if(a.cats&&a.cats.length){blocks.push({t:"table",head:a.cats.map(plain),rows:[a.cats.map(()=>["","","","","",""])],fontSize:10})}
    else if(a.o&&a.o.pairs){blocks.push({t:"table",head:["Term","Meaning (in our words)"],rows:a.cards.map(c=>[plain(c[0]),""]),widths:[35,65],fontSize:10})}
    else{const qs=a.st.filter(s=>/\?|^\s*Q\d|explain|suggest|calculate|predict|list|decide|agree|write/i.test(plain(s)));(qs.length?qs:a.st).forEach((q,i)=>{blocks.push({t:"q",label:String(i+1),text:plain(q).slice(0,160)});blocks.push({t:"lines",n:3})})}
  }
  /* answer key */
  blocks.push({t:"pb"});blocks.push({t:"band",text:"Answer key (teacher only)",fill:"7A5600"});
  if(a.cats&&a.cats.length&&a.cards)blocks.push({t:"table",head:["Card","Goes in"],rows:a.cards.map(c=>[plain(c[0]),plain(c[1])]),widths:[60,40],fontSize:10});
  else if(a.o&&a.o.pairs)blocks.push({t:"table",head:["Term","Meaning"],rows:a.cards.map(c=>[plain(c[0]),plain(c[1])]),widths:[35,65],fontSize:10});
  if(a.ans&&a.ans.length)blocks.push({t:"ol",items:a.ans.map(plain)});
  if(!(a.ans&&a.ans.length)&&!(a.cards&&a.cards.length))blocks.push({t:"p",text:"Check answers against the notes in the Explain section of this lesson: "+plain((ctx.l.sum||""))});
  return {title:"Print pack | "+plain(a.t),footer:ctx.SUB.title+" | Lesson "+l.no+" | "+plain(a.t),blocks};
}
function open(a,ctx,M){
  if(!a)return;
  const cls=(window.HUBTEACH?HUBTEACH.classes():[]).filter(c=>c.subj===ctx.sub);
  const ov=document.createElement("div");ov.className="x4ov";
  ov.innerHTML=`<div class="x4dlg" role="dialog" aria-label="Print pack"><div class="x4dlg-h"><h2>Print pack: ${esc(plain(a.t))}</h2><button class="btn sm" type="button" data-close>Close</button></div>
<div class="row" style="gap:12px;flex-wrap:wrap;align-items:center"><label class="x4lab" style="flex-direction:row;align-items:center;gap:8px">Class <select id="pk-c">${cls.map((c,i)=>`<option value="${i}">${esc(c.name)} (${c.n?c.n+" learners":"no learner names yet"})</option>`).join("")}<option value="x">Another class…</option></select></label>
<label class="x4lab" style="flex-direction:row;align-items:center;gap:8px" id="pk-nl" hidden>Learners <input type="number" id="pk-n" min="1" max="80" value="30" style="width:5em"></label>
<label class="x4lab" style="flex-direction:row;align-items:center;gap:8px">Group size <input type="number" id="pk-s" min="1" max="10" value="4" style="width:4em"></label>
${cardsOf(a).length?`<label class="x4lab" style="flex-direction:row;align-items:center;gap:8px">Cards per page <select id="pk-p"><option value="12">12 (standard)</option><option value="8">8 (large print)</option></select></label>`:""}</div>
<div class="x4pinfo" id="pk-i"></div><p class="mute">Preview of the first page of cards or the first task sheet. Every card shows its set letter, so mixed-up sets can be sorted again. The answer key prints once, on its own page.</p>
<div style="overflow-x:auto" id="pk-v"></div>
<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><button class="btn pri" type="button" data-fmt="pdf">Download PDF</button><button class="btn" type="button" data-fmt="docx">Download Word (.docx)</button><span class="mute" id="pk-m" role="status"></span></div></div>`;
  document.body.appendChild(ov);
  const close=()=>ov.remove();ov.querySelector("[data-close]").onclick=close;ov.addEventListener("click",e=>{if(e.target===ov)close()});ov.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  const opts=()=>{const v=$("#pk-c",ov).value,c=v==="x"?null:cls[+v];$("#pk-nl",ov).hidden=!!(c&&c.n);const n=c?c.n||+$("#pk-n",ov).value:+$("#pk-n",ov).value||30,size=Math.max(1,+$("#pk-s",ov).value||4),groups=Math.max(1,Math.ceil(n/size)),cpp=$("#pk-p",ov)?+$("#pk-p",ov).value:12,cards=cardsOf(a).length;
    return {cls:c?c.name:"Class",n,size,groups,cpp,cardPages:Math.ceil(groups*cards/cpp),cards}};
  const upd=()=>{const o=opts(),R=a.roles?roles().length:0,rolePages=R?Math.ceil(o.groups*R/8):0,total=1+o.cardPages+rolePages+o.groups+1;
    $("#pk-i",ov).innerHTML=`<div><b>${o.groups}</b>groups (sets ${L(0)} to ${L(o.groups-1)})</div>${o.cards?`<div><b>${o.groups*o.cards}</b>cards (${o.cards} per set)</div><div><b>${o.cardPages}</b>card pages (${o.cpp} per A4)</div>`:""}<div><b>${total}</b>pages in total: 1 teacher page, ${o.cardPages?o.cardPages+" card pages, ":""}${rolePages?rolePages+" role-card pages, ":""}${o.groups} task sheets, 1 answer key</div>`;
    const cards=cardsOf(a);
    if(cards.length){const cols=o.cpp===8?2:3;let h=`<div class="x4sheet" style="grid-template-columns:repeat(${cols},1fr)">`;for(let k=0;k<Math.min(o.cpp,o.groups*cards.length);k++){h+=`<div class="x4card"><i>Set ${L(Math.floor(k/cards.length))}</i>${esc(plain(cards[k%cards.length]))}<u>${esc(ctx.l.no)}</u></div>`}$("#pk-v",ov).innerHTML=h+"</div>"}
    else $("#pk-v",ov).innerHTML=`<div class="x4sheet" style="display:block"><b>Group A: ${esc(plain(a.t))}</b><p style="margin:6px 0">Names: ____________________</p>${a.study?`<p style="font-size:12px">${esc(plain(a.study)).slice(0,400)}…</p>`:""}<ol style="font-size:13px">${a.st.map(s=>`<li>${esc(plain(s))}</li>`).join("")}</ol></div>`};
  ov.addEventListener("input",upd);ov.addEventListener("change",upd);upd();
  $$("[data-fmt]",ov).forEach(b=>b.onclick=async()=>{const m=$("#pk-m",ov),f=b.dataset.fmt;m.textContent="Building the pack…";$$("[data-fmt]",ov).forEach(x=>x.disabled=true);
    try{const o=opts(),model=buildModel(a,ctx,o),data=f==="docx"?await HUBDOC.docx(model):await HUBDOC.pdf(model);
      const nm=("Print pack - "+ctx.SUB.code+" "+ctx.l.no+" "+plain(a.t)+" - "+o.cls).replace(/[^\w .-]+/g,"").trim().slice(0,90)+"."+f;
      const r=await HUBAPP.saveFile(nm,data);m.textContent=r==="saved"?"Saved. Check your Downloads folder.":r==="declined"?"":"Could not save the file."}
    catch(e){console.error(e);m.textContent="Sorry, the pack could not be built."}
    $$("[data-fmt]",ov).forEach(x=>x.disabled=false)});
  setTimeout(()=>{const s=$("#pk-c",ov);if(s)s.focus()},30);
}
window.X4PACK={open,buildModel};
})();
