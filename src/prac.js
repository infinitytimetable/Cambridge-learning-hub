/* prac.js - Laboratory practical work page (#<subject>/practicals).
   Data: PRAC_CHEM / PRAC_BIO (other files). Exports through HUBDOC (util.js) with a print fallback.
   Saved in this browser only: hubprac.res.v1 (results), hubprac.ans.v1 (evaluation text), hubprac.ui.v1,
   hubprac.plan.v1 (lab planner), hubpractical.v1 (class practical records and quick class lists).
   Reads/writes hubprogress.v1 only for the optional "record as formative mark" button, after confirmation. */
(function(){
"use strict";
const LSK={res:"hubprac.res.v1",ans:"hubprac.ans.v1",ui:"hubprac.ui.v1",plan:"hubprac.plan.v1",rec:"hubpractical.v1",prog:"hubprogress.v1"};
const lget=(k,d)=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):d}catch(e){return d}};
const lset=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const inl=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/~([^~]+)~/g,"<sub>$1</sub>").replace(/\^([^^]+)\^/g,"<sup>$1</sup>");
const px=n=>`calc(${n}*var(--u,1px))`;
const SN={chem:"Chemistry",bio:"Biology 0610",alevel:"Biology 9700"},SNS={chem:"Chem",bio:"Bio",alevel:"A Lv"};
const SK=["Planning","Manipulating and measuring","Observing and recording","Presenting data","Analysing and evaluating"];
const SKS={"Planning":"Planning","Manipulating and measuring":"Manipulating","Observing and recording":"Observing","Presenting data":"Presenting","Analysing and evaluating":"Evaluating"};
const RB=[["plan","Planning","Plan"],["manip","Manipulation and measurement","Manip."],["obs","Observation and recording","Obs."],["data","Data presentation","Data"],["eval","Analysis and evaluation","Eval."],["safety","Safety","Safety"],["team","Teamwork","Team"]];
const RBD=["0 = not attempted","1 = limited, needs a lot of help","2 = partly secure, some help","3 = mostly secure, little help","4 = secure and independent"];
const TABS=[["sheet","Student sheet"],["record","Record results"],["analysis","Analysis"],["teacher","Teacher"],["exam","Exam practice"]];
const DOCS=[["worksheet","Student worksheet"],["teacher","Teacher prep sheet"],["risk","Risk assessment"],["pack","Combined pack"]];

/* ---------- data ---------- */
let ALL=null;
function allPracs(){
  if(ALL)return ALL;ALL=[];
  [["chem","PRAC_CHEM"],["bio","PRAC_BIO"],["alevel","PRAC_AL"]].forEach(([s,n])=>{let a=[];try{a=(0,eval)("typeof "+n+"!=='undefined'?"+n+":[]")}catch(e){}(a||[]).forEach(p=>{const m=(typeof PRACMAP!=="undefined"&&PRACMAP[s]&&PRACMAP[s][p.id])||null;ALL.push(Object.assign({},p,{sub:s},m?{unit:m.l[0],lesson:m.l[1],also:m.x||[],venue:m.v}:{}))})});
  return ALL;
}
const units=s=>(typeof SUBJ!=="undefined"&&SUBJ[s]&&SUBJ[s].units)||[];
const unitOf=p=>units(p.sub).find(u=>u.n===p.unit);
function links(p){
  const u=unitOf(p),o=[];
  if(u)o.push(["Topic "+u.n+": "+u.name,`#${p.sub}/u${u.n}`]);
  if(u&&p.lesson&&u.lessons&&u.lessons[p.lesson-1])o.push(["Practical lesson "+u.n+"."+p.lesson+": "+u.lessons[p.lesson-1].t,`#${p.sub}/l${u.n}-${p.lesson}`]);
  (p.also||[]).forEach(t=>{const uu=units(p.sub).find(x=>x.n===t[0]);if(uu&&uu.lessons&&uu.lessons[t[1]-1])o.push(["Related lesson "+t[0]+"."+t[1]+": "+uu.lessons[t[1]-1].t,`#${p.sub}/l${t[0]}-${t[1]}`])});
  return o;
}
const minsOf=p=>{const m=String(p.time||"").match(/\d+/);return m?+m[0]:0};
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
const fmt=n=>n==null||!isFinite(n)?"":String(Number((+n).toPrecision(4)));
const num=s=>{if(s==null)return null;s=String(s).trim().replace(",",".");if(s===""||!isFinite(+s))return null;return +s};

/* ---------- safety rating from hazards ---------- */
const HI=/concentrated|corrosive|toxic|poison|flammable|explosi|carcinogen|oxidis|cancer|chlorine|bromine|burn|ignit|fume|harmful gas/i;
const MID=/irritant|hot|boil|scald|glass|sharp|blade|scalpel|heat|eye|splash|spill|allerg|stain|slip|electric|current|ethanol|acid|alkali|alkaline|propanone|lamp|flame|bunsen|knife|cut/i;
const rateOne=h=>{const t=(h.hazard||"")+" "+(h.risk||"");return HI.test(t)?"High":MID.test(t)?"Medium":"Low"};
function rate(hz){let s=0,hi=0;(hz||[]).forEach(h=>{const r=rateOne(h);if(r==="High"){s+=2;hi++}else if(r==="Medium")s++});return hi>=2||s>=6?"High":(hi>=1||s>=3)?"Medium":"Low"}
const RSYM={Low:"●○○",Medium:"●●○",High:"●●●"};
const rpill=r=>`<span class="pr-rt ${r}" title="Safety rating from the hazards listed">${RSYM[r]} ${r}</span>`;

/* ---------- quantities ---------- */
const UNITWORD=/^(cm|mm|m|dm|g|kg|mg|ml|l|mol|mols?|°|%|v|a|w|s|min|h|hz|j|kj|n|cm3|cm³|dm³|dm3|mm³)\b/i;
function apCount(s){
  s=String(s).trim();let m=s.match(/^(\d+)\s*[×x]\s*(.*)$/i);
  if(m)return{n:+m[1],name:m[2]};
  m=s.match(/^(\d+)\s+(.*)$/);
  if(m&&!UNITWORD.test(m[2]))return{n:+m[1],name:m[2]};
  return{n:1,name:s};
}
function qty(s){const m=String(s==null?"":s).trim().match(/^(\d+(?:\.\d+)?)\s*(.*)$/);return m?{n:+m[1],rest:m[2]}:null}
const roundQ=n=>Number(n.toPrecision(4));
function scaleAmt(a,N){const q=qty(a);return q?`${roundQ(q.n*N)}${q.rest?" "+q.rest:""}`:`${a} × ${N}`}
const SPEC=/seed|leaf|leaves|potato|yeast|pondweed|elodea|onion|tissue|specimen|egg|liver|cress|plant|cell|blood|bean|locust|fish|maggot|shoot|stem|root|flower|apple|celery|beetroot|fruit|cotton|bread|milk|learner|volunteer|insect|animal|pea|grain|maize|slug|woodlice|daphnia/i;

/* ---------- state ---------- */
const PS={sub:HUB.subs[0],main:"lib",id:"",tab:"sheet",f:{topic:"",skill:"",level:"",dur:"",q:""},cls:"",pr:"",doc:"worksheet",plan:null,msg:""};
const uiGet=()=>lget(LSK.ui,{groups:8});
function recGet(p){const st=lget(LSK.res,{});return st[p.sub+":"+p.id]||null}
function recSet(p,r){const st=lget(LSK.res,{});st[p.sub+":"+p.id]=r;lset(LSK.res,st)}
function findP(sub,id){return allPracs().find(p=>p.sub===sub&&p.id===id)}

/* ---------- css ---------- */
const CSS=`
.pr-wrap{margin-top:${px(14)}}
.pr-top{display:flex;flex-wrap:wrap;gap:${px(10)} ${px(18)};align-items:center;margin-bottom:${px(14)}}
.pr-top .chips{margin:0}
.pr-main{display:flex;gap:${px(4)};border-bottom:1px solid var(--line);margin-bottom:${px(16)};overflow-x:auto;scrollbar-width:none}
.pr-main button,.pr-tabs button{padding:${px(11)} ${px(15)};border:0;background:none;font:700 ${px(16)} var(--f-body);color:var(--muted);border-bottom:3px solid transparent;cursor:pointer;white-space:nowrap}
.pr-main button[aria-selected=true],.pr-tabs button[aria-selected=true]{color:var(--ink);border-bottom-color:var(--accent)}
.pr-tabs{display:flex;gap:${px(2)};border-bottom:1px solid var(--line);margin:${px(14)} 0;overflow-x:auto;scrollbar-width:none}
.pr-filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${px(170)}),1fr));gap:${px(10)};margin-bottom:${px(14)}}
.pr-filters label,.pr-f label{font:700 ${px(13)}/1.3 var(--f-body);color:var(--muted);display:block;margin-bottom:${px(4)}}
.pr-in,.pr-filters select,.pr-filters input,.pr-f select,.pr-f input,.pr-f textarea,.pr-t input,.pr-t select,.pr-ta{font:${px(16)}/1.4 var(--f-body);color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:${px(8)} ${px(10)};min-height:${px(40)};max-width:100%;box-sizing:border-box}
.pr-filters select,.pr-filters input{width:100%}
.pr-count{color:var(--muted);font:600 ${px(14)} var(--f-body);margin:0 0 ${px(10)}}
.pr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,${px(310)}),1fr));gap:${px(14)}}
.pr-card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:${px(16)};box-shadow:var(--shadow);display:flex;flex-direction:column;gap:${px(8)};min-width:0}
.pr-card h3{margin:0;font:700 ${px(19)}/1.25 var(--f-display)}
.pr-card p{margin:0;color:var(--muted);font-size:${px(15)};line-height:1.45}
.pr-badge,.pr-lv{display:inline-block;font:700 ${px(12)}/1 var(--f-body);padding:${px(5)} ${px(9)};border-radius:999px;border:1px solid var(--line);background:var(--surface2);color:var(--ink)}
.pr-sk{display:flex;flex-wrap:wrap;gap:${px(5)}}
.pr-sk span{font:600 ${px(12)} var(--f-body);padding:${px(3)} ${px(8)};border-radius:6px;background:var(--surface2);color:var(--ink)}
.pr-meta{display:flex;flex-wrap:wrap;gap:${px(8)};align-items:center;font:600 ${px(14)} var(--f-body)}
.pr-rt{font:700 ${px(13)}/1 var(--f-body);padding:${px(5)} ${px(9)};border-radius:999px;white-space:nowrap}
.pr-rt.Low{background:var(--good-bg);color:var(--good)}.pr-rt.Medium{background:var(--warn-bg);color:var(--warn)}.pr-rt.High{background:var(--bad-bg);color:var(--bad)}
.pr-lk{display:flex;flex-wrap:wrap;gap:${px(6)} ${px(12)};font-size:${px(14)}}
.pr-lk a{color:var(--accent);font-weight:600}
.pr-card .btn{margin-top:auto;align-self:flex-start}
.pr-head{display:flex;flex-wrap:wrap;gap:${px(10)};align-items:center;margin-bottom:${px(8)}}
.pr-head h2{margin:0;font:700 ${px(26)}/1.2 var(--f-display);flex:1 1 ${px(240)}}
.pr-ex{display:flex;flex-wrap:wrap;gap:${px(8)};align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:${px(10)} ${px(12)};margin:${px(10)} 0}
.pr-ex b{font-size:${px(14)};color:var(--muted)}
.pr-ex select{font:${px(15)} var(--f-body);color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:${px(8)};min-height:${px(40)}}
.pr-msg{font:600 ${px(15)} var(--f-body);color:var(--accent);min-height:${px(20)};margin:${px(4)} 0}
.pr-sec{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:${px(16)} ${px(18)};margin:0 0 ${px(14)}}
.pr-sec h3{margin:0 0 ${px(8)};font:700 ${px(19)} var(--f-display)}
.pr-sec p,.pr-sec li{font-size:${px(17)};line-height:1.55}
.pr-sec ul,.pr-sec ol{margin:${px(4)} 0;padding-left:${px(24)}}
.pr-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${px(300)}),1fr));gap:${px(14)}}
.pr-scroll{overflow-x:auto;max-width:100%}
.pr-t{border-collapse:collapse;width:100%;font-size:${px(16)}}
.pr-t th,.pr-t td{border:1px solid var(--line);padding:${px(7)} ${px(9)};text-align:left;vertical-align:top}
.pr-t th{background:var(--surface2);font-weight:700}
.pr-t td.pr-calc{background:var(--surface2);font-weight:700;text-align:center;min-width:${px(70)}}
.pr-t input{width:100%;min-width:${px(64)};text-align:center;padding:${px(6)}}
.pr-steps{list-style:none;padding:0!important;counter-reset:st}
.pr-steps li{display:flex;gap:${px(10)};align-items:flex-start;padding:${px(8)} 0;border-bottom:1px dashed var(--line);counter-increment:st}
.pr-steps li:last-child{border:0}
.pr-steps input{width:${px(22)};height:${px(22)};margin-top:${px(4)};flex:none;accent-color:var(--accent)}
.pr-steps li.done span{color:var(--muted);text-decoration:line-through}
.pr-steps li span::before{content:counter(st) ". ";font-weight:700}
.pr-fig{max-width:${px(560)};margin:${px(10)} auto}
.pr-fig svg{width:100%;height:auto}
.pr-gr{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:${px(10)};max-width:${px(620)}}
.pr-gr svg{width:100%;height:auto;display:block;color:var(--ink)}
.pr-hint{list-style:none;padding:0!important}
.pr-hint li{padding:${px(5)} 0;font-size:${px(16)}}
.pr-hint .ok{color:var(--good)}.pr-hint .no{color:var(--bad)}.pr-hint .nt{color:var(--muted)}
.pr-qa{border:1px solid var(--line);border-radius:10px;padding:${px(10)} ${px(14)};margin:0 0 ${px(10)};background:var(--bg)}
.pr-qa summary{cursor:pointer;font-weight:600;color:var(--accent)}
.pr-qa .q{font-size:${px(17)};margin:0 0 ${px(6)}}
.pr-mk{font:700 ${px(12)} var(--f-body);background:var(--surface2);border-radius:6px;padding:${px(2)} ${px(7)};margin-left:${px(6)};white-space:nowrap}
.pr-ta{width:100%;min-height:${px(80)};resize:vertical}
.pr-bar{display:flex;flex-wrap:wrap;gap:${px(8)};align-items:center;margin:${px(8)} 0}
.pr-bar label{font:600 ${px(14)} var(--f-body);color:var(--muted);display:flex;gap:${px(6)};align-items:center}
.pr-note{background:var(--warn-bg);color:var(--ink);border-left:4px solid var(--warn);padding:${px(10)} ${px(14)};border-radius:8px;font-size:${px(15)};margin:${px(10)} 0}
.pr-empty{padding:${px(30)};text-align:center;color:var(--muted);background:var(--surface);border:1px dashed var(--line);border-radius:12px}
.pr-pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,${px(280)}),1fr));gap:${px(4)} ${px(14)}}
.pr-pick label{display:flex;gap:${px(8)};align-items:flex-start;font-size:${px(16)};padding:${px(5)} 0}
.pr-pick input{width:${px(20)};height:${px(20)};margin-top:${px(3)};accent-color:var(--accent);flex:none}
.pr-sc select{min-width:${px(54)};padding:${px(5)}}
.pr-ok{display:flex;flex-wrap:wrap;gap:${px(8)};align-items:center;background:var(--warn-bg);border:1px solid var(--warn);border-radius:10px;padding:${px(10)} ${px(12)};margin:${px(8)} 0}
#pr-printbox{display:none}
@media print{
  body.pr-printing>*:not(#pr-printbox){display:none!important}
  body.pr-printing #pr-printbox{display:block!important;color:#000;background:#fff;font:11pt/1.4 Calibri,Arial,sans-serif;padding:0}
  #pr-printbox h1{font-size:20pt;margin:0 0 4pt}#pr-printbox h2{font-size:15pt;margin:12pt 0 4pt}#pr-printbox h3{font-size:12.5pt;margin:8pt 0 3pt}
  #pr-printbox table{border-collapse:collapse;width:100%;margin:4pt 0}#pr-printbox td,#pr-printbox th{border:1px solid #444;padding:3pt 5pt;vertical-align:top;font-size:10pt}
  #pr-printbox th{background:#ddd}#pr-printbox .pb{break-after:page}#pr-printbox img{max-width:100%}
}
@media(max-width:560px){.pr-sec{padding:${px(12)}}.pr-head h2{font-size:${px(22)}}}
`;
function injectCss(){if(document.getElementById("pr-css"))return;const s=document.createElement("style");s.id="pr-css";s.textContent=CSS;document.head.appendChild(s)}

/* ---------- document models (HUBDOC) and print fallback ---------- */
function mhtml(m){
  const cell=c=>inl(c).replace(/\n/g,"<br>");
  let h=`<h1>${inl(m.title)}</h1>`+(m.subtitle?`<p><i>${inl(m.subtitle)}</i></p>`:"");
  const blk=b=>{switch(b.t){
    case "h":return `<h${Math.min(3,(b.l||1)+1)}>${inl(b.text)}</h${Math.min(3,(b.l||1)+1)}>`;
    case "p":return `<p${b.align?` style="text-align:${b.align}"`:""}>${b.bold?"<b>":""}${b.italic?"<i>":""}${inl(b.text)}${b.italic?"</i>":""}${b.bold?"</b>":""}</p>`;
    case "ul":return `<ul>${b.items.map(i=>`<li>${inl(i)}</li>`).join("")}</ul>`;
    case "ol":return `<ol>${b.items.map(i=>`<li>${inl(i)}</li>`).join("")}</ol>`;
    case "table":return `<table><thead><tr>${b.head.map(x=>`<th>${cell(x)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map(x=>`<td>${cell(x)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    case "kv":return `<table>${b.pairs.map(p=>`<tr><th style="width:30%">${cell(p[0])}</th><td>${cell(p[1])}</td></tr>`).join("")}</table>`;
    case "img":return `<p><img src="${b.dataUrl}" alt="" style="width:${b.widthPct||70}%"></p>`+(b.caption?`<p><i>${inl(b.caption)}</i></p>`:"");
    case "box":return `<table><tr><td>${b.title?`<b>${inl(b.title)}</b><br>`:""}${b.text?inl(b.text):""}${(b.items||[]).map(i=>`<br>• ${inl(i)}`).join("")}</td></tr></table>`;
    case "sig":return `<p style="margin-top:28pt">${b.labels.map(l=>`______________________ ${esc(l)}`).join("&nbsp;&nbsp;&nbsp;&nbsp;")}</p>`;
    case "pb":return `<div class="pb"></div>`;
    default:return ""}};
  return h+m.blocks.map(blk).join("");
}
function printModel(m){
  let box=document.getElementById("pr-printbox");
  if(!box){box=document.createElement("div");box.id="pr-printbox";document.body.appendChild(box)}
  box.innerHTML=mhtml(m);
  document.body.classList.add("pr-printing");
  const off=()=>{document.body.classList.remove("pr-printing");window.removeEventListener("afterprint",off)};
  window.addEventListener("afterprint",off);
  setTimeout(()=>window.print(),60);
  setTimeout(off,60000);
}
async function outModel(env,m,fmt,name,say){
  if(fmt==="print"||typeof HUBDOC==="undefined"){
    if(fmt!=="print"&&say)say("Export tools are not loaded, so the print view was opened. Choose Save as PDF in the print window.");
    printModel(m);return}
  try{
    const blob=await(fmt==="docx"?HUBDOC.docx(m):HUBDOC.pdf(m));
    const r=await env.saveFile(name+"."+fmt,blob);
    if(say)say(r==="saved"||r===true?(fmt==="docx"?"Word":"PDF")+" file saved.":r==="declined"?"":"Could not save the file.");
  }catch(e){if(say)say("Export failed: "+(e&&e.message||e)+". The print view was opened instead.");printModel(m)}
}
const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48);

function hazRows(p){return (p.hazards||[]).map(h=>[h.hazard||"",h.risk||"",h.control||"",rateOne(h)])}
function apRows(p,N){return (p.apparatus||[]).map(a=>{const c=apCount(a);return[(c.n*N)+" × "+c.name,c.n+" per group"]})}
function matRows(p,N){return (p.materials||[]).map(m=>[m.item||"",m.amount||"",scaleAmt(m.amount,N)])}
function metaLine(p){const u=unitOf(p);return [SN[p.sub]+(p.sub==="chem"?" 0620":""),u?"Topic "+u.n+": "+u.name:"",p.level||"",p.time||""].filter(Boolean).join("  |  ")}
function mdWorksheet(p){
  const cols=(p.results&&p.results.columns)||[];const rep=(p.results&&p.results.repeats)||1;
  const head=[];cols.forEach((c,i)=>{const nm=c.name+(c.unit?" ("+c.unit+")":"");if(rep>1&&i>0&&!c.calc){for(let k=1;k<=rep;k++)head.push(nm+" R"+k)}else head.push(nm)});
  const nr=Math.max(5,Array.isArray(p.results&&p.results.rows)?p.results.rows.length:(p.results&&p.results.rows)||5);
  const b=[{t:"kv",pairs:[["Name",""],["Class and date",""],["Group",""]]},{t:"h",l:2,text:"Aim"},{t:"p",text:p.aim||""}];
  if(p.apparatus&&p.apparatus.length)b.push({t:"h",l:2,text:"Apparatus (per group)"},{t:"ul",items:p.apparatus});
  if(p.materials&&p.materials.length)b.push({t:"h",l:2,text:"Materials"},{t:"table",head:["Item","Amount"],rows:p.materials.map(m=>[m.item||"",m.amount||""]),widths:[65,35]});
  if(p.hazards&&p.hazards.length)b.push({t:"h",l:2,text:"Hazards and precautions"},{t:"table",head:["Hazard","Risk","Control","Level"],rows:hazRows(p),widths:[24,28,36,12],fontSize:9.5,tone:hazRows(p).map((r,i)=>[i,r[3]==="High"?"bad":r[3]==="Medium"?"warn":"good"])});
  b.push({t:"h",l:2,text:"Method"},{t:"ol",items:p.method||[]});
  const v=p.variables;if(v)b.push({t:"h",l:2,text:"Variables"},{t:"kv",pairs:[["Independent",v.independent||""],["Dependent",v.dependent||""],["Controlled",(v.controlled||[]).join("; ")]]});
  if(cols.length)b.push({t:"h",l:2,text:"Results"},{t:"table",head,rows:Array.from({length:nr},()=>head.map(()=>"")),fontSize:10});
  b.push({t:"p",text:"Use graph paper to plot your graph. Label both axes with the quantity and unit.",italic:true});
  if(p.questions&&p.questions.length)b.push({t:"h",l:2,text:"Analysis questions"},{t:"ol",items:p.questions.map(q=>q.q+" ["+q.marks+"]")});
  if(p.evaluation&&p.evaluation.length)b.push({t:"h",l:2,text:"Evaluation"},{t:"ul",items:p.evaluation});
  return{title:p.title,subtitle:metaLine(p),orientation:"portrait",footer:"Cambridge Learning Hub - "+SN[p.sub]+" practical worksheet",blocks:b};
}
function mdTeacher(p,N){
  const t=p.teacher||{},b=[{t:"kv",pairs:[["Practical",p.title],["Groups",String(N)],["Timing",t.timing||p.time||""]]},
    {t:"h",l:2,text:"Technician preparation for "+N+" groups"},{t:"table",head:["Apparatus","Quantity needed"],rows:apRows(p,N),widths:[65,35]}];
  if(p.materials&&p.materials.length)b.push({t:"table",head:["Material","Per group","Total for "+N+" groups"],rows:matRows(p,N),widths:[44,26,30]});
  if(t.prep&&t.prep.length)b.push({t:"h",l:2,text:"Preparation notes"},{t:"ul",items:t.prep});
  if(t.expected)b.push({t:"h",l:2,text:"Expected results"},{t:"p",text:t.expected});
  if(t.disposal&&t.disposal.length)b.push({t:"h",l:2,text:"Disposal"},{t:"ul",items:t.disposal});
  if(t.problems&&t.problems.length)b.push({t:"h",l:2,text:"Common problems"},{t:"ul",items:t.problems});
  return{title:p.title+" - teacher prep sheet",subtitle:metaLine(p),orientation:"portrait",footer:"Cambridge Learning Hub - teacher / technician copy",blocks:b};
}
function mdRisk(p){
  const hz=hazRows(p),r=rate(p.hazards);
  return{title:p.title+" - risk assessment",subtitle:metaLine(p),orientation:"landscape",footer:"Cambridge Learning Hub - risk assessment (check against your school's policy before use)",blocks:[
    {t:"kv",pairs:[["Overall rating (from hazards)",r],["Date",""],["Class",""],["Teacher",""]]},
    {t:"table",head:["Hazard","Who / what could be harmed and how","Control measures","Level"],rows:hz,widths:[22,30,38,10],tone:hz.map((x,i)=>[i,x[3]==="High"?"bad":x[3]==="Medium"?"warn":"good"])},
    {t:"h",l:2,text:"Disposal"},{t:"ul",items:(p.teacher&&p.teacher.disposal)||["See school policy."]},
    {t:"box",tone:"info",title:"Teacher note",text:"This rating is a guide worked out from the hazards listed. The teacher must check the risk assessment against current school and CLEAPSS-type guidance before the lesson."},
    {t:"sig",labels:["Teacher","Head of department / supervisor"]}]};
}
function mdPack(p,N){
  const w=mdWorksheet(p),t=mdTeacher(p,N),r=mdRisk(p);
  const ex=(p.exam||[]).length?[{t:"pb"},{t:"h",l:1,text:"Exam practice with mark scheme"}].concat(...p.exam.map((e,i)=>[{t:"p",text:"**Question "+(i+1)+"** ["+e.marks+"]\n"+e.q},{t:"ul",items:e.ms||[]}])):[];
  const answers=(p.questions||[]).length?[{t:"pb"},{t:"h",l:1,text:"Model answers"},{t:"ol",items:p.questions.map(q=>q.a+" ["+q.marks+"]")}]:[];
  return{title:p.title+" - practical pack",subtitle:metaLine(p),orientation:"portrait",footer:"Cambridge Learning Hub - practical pack",
    blocks:[{t:"h",l:1,text:"Student worksheet"}].concat(w.blocks,[{t:"pb"},{t:"h",l:1,text:"Teacher prep sheet"}],t.blocks,[{t:"pb"},{t:"h",l:1,text:"Risk assessment"}],r.blocks,answers,ex)};
}
const MODEL={worksheet:(p)=>mdWorksheet(p),teacher:(p,N)=>mdTeacher(p,N),risk:(p)=>mdRisk(p),pack:(p,N)=>mdPack(p,N)};

/* ---------- results maths ---------- */
function calcOK(expr,n){
  if(!expr)return false;
  if(/^\s*mean\s*$/i.test(expr))return true;
  return calcRun(expr,Array.from({length:n},()=>1.5))!=null;
}
function calcRun(expr,vals){
  if(/^\s*mean\s*$/i.test(expr)){const a=vals.slice(1).filter(v=>v!=null);return a.length?mean(a):null}
  let bad=false;
  let e=String(expr).replace(/[−–]/g,"-").replace(/[×·]/g,"*").replace(/÷/g,"/").replace(/\^/g,"**").replace(/%/g,"/100");
  e=e.replace(/\bc(\d+)\b/gi,(m,i)=>{const v=vals[+i-1];if(v==null||!isFinite(v)){bad=true;return"0"}return"("+v+")"});
  if(bad)return null;
  e=e.replace(/\b(mean|avg|sqrt|abs|pow|min|max|round)\s*\(/gi,(m,f)=>"M."+f.toLowerCase()+"(");
  if(!/^[0-9eE+\-*/().,\sM_a-z]*$/.test(e)||/[a-z_]/.test(e.replace(/M\.(mean|avg|sqrt|abs|pow|min|max|round)/g,"").replace(/\be\b/gi,"")))return null;
  try{
    const M={mean:(...a)=>mean(a),avg:(...a)=>mean(a),sqrt:Math.sqrt,abs:Math.abs,pow:Math.pow,min:Math.min,max:Math.max,round:Math.round};
    const v=new Function("M","return ("+e+")")(M);
    return typeof v==="number"&&isFinite(v)?v:null;
  }catch(x){return null}
}
function resInfo(p){
  const R=p.results||{},cols=R.columns||[],rep=R.repeats>1?R.repeats:1;
  const calc=cols.map(c=>!!c.calc&&calcOK(c.calc,cols.length));
  return{R,cols,rep,calc,n:cols.length};
}
function initRec(p){
  const I=resInfo(p);let nr=Array.isArray(I.R.rows)?I.R.rows.length:(+I.R.rows||5);nr=Math.max(1,nr);
  const cells=Array.from({length:nr},(_,ri)=>I.cols.map((c,ci)=>{
    const len=I.rep>1&&ci>0&&!I.calc[ci]?I.rep:1;const a=Array(len).fill("");
    if(ci===0&&Array.isArray(I.R.rows)){const v=I.R.rows[ri];if(v!=null&&!Array.isArray(v))a[0]=String(v);else if(Array.isArray(v)&&v[0]!=null)a[0]=String(v[0])}
    return a}));
  const g=I.R.graph||{};let x=g.x==null?0:g.x,y=g.y==null?Math.max(0,I.n-1):g.y;
  if(x>=I.n||y>=I.n){x=Math.max(0,x-1);y=Math.max(0,y-1)}
  const lab=i=>{const c=I.cols[i];return c?c.name+(c.unit?" ("+c.unit+")":""):""};
  return{cells,steps:{},g:{x,y,type:g.type||"scatter",trend:false,xl:g.xLabel||lab(x),yl:g.yLabel||lab(y)}};
}
function getRec(p){let r=recGet(p);if(!r||!r.cells){r=initRec(p);}return r}
function rowVals(p,r,ri){
  const I=resInfo(p),vals=[];
  I.cols.forEach((c,ci)=>{
    if(I.calc[ci]){vals[ci]=null;return}
    const cell=(r.cells[ri]||[])[ci]||[""];
    const nums=cell.map(num).filter(v=>v!=null);
    vals[ci]=I.rep>1&&ci>0?(nums.length?mean(nums):null):num(cell[0]);
  });
  I.cols.forEach((c,ci)=>{if(I.calc[ci])vals[ci]=calcRun(c.calc,vals)});
  return vals;
}
function graphPoints(p,r){
  const I=resInfo(p),g=r.g,pts=[];
  r.cells.forEach((row,ri)=>{
    const v=rowVals(p,r,ri),y=v[g.y];let x=v[g.x];
    const raw=!I.calc[g.x]?((row[g.x]||[""])[0]||""):fmt(x);
    if(y==null)return;
    if(x==null&&g.type!=="bar")return;
    if(g.type==="bar"&&!raw&&x==null)return;
    pts.push({x,y,l:raw||fmt(x),ri});
  });
  return pts;
}
function niceTicks(lo,hi,n){
  if(hi===lo){hi=lo+1}
  const span=hi-lo,raw=span/n,pow=Math.pow(10,Math.floor(Math.log10(raw))),f=raw/pow;
  const step=(f<=1?1:f<=2?2:f<=5?5:10)*pow;const a=Math.floor(lo/step+1e-9)*step,b=Math.ceil(hi/step-1e-9)*step,t=[];
  for(let v=a;v<=b+step/2;v+=step)t.push(Number(v.toPrecision(10)));
  return t;
}
function regress(pts){
  const n=pts.length;if(n<2)return null;
  const mx=mean(pts.map(p=>p.x)),my=mean(pts.map(p=>p.y));
  let sxx=0,sxy=0,syy=0;pts.forEach(p=>{sxx+=(p.x-mx)**2;sxy+=(p.x-mx)*(p.y-my);syy+=(p.y-my)**2});
  if(sxx===0)return null;
  const m=sxy/sxx,c=my-m*mx,r2=syy===0?1:(sxy*sxy)/(sxx*syy);
  return{m,c,r2};
}
function graphSVG(p,r){
  const g=r.g,pts=graphPoints(p,r);
  const W=520,H=400,L=70,Rr=18,T=18,B=66;
  const pw=W-L-Rr,ph=H-T-B;
  let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of ${esc(g.yl)} against ${esc(g.xl)}" font-family="Figtree, Arial, sans-serif">`;
  if(!pts.length){s+=`<text x="${W/2}" y="${H/2}" text-anchor="middle" font-size="16" fill="currentColor">Enter at least two complete rows to draw the graph</text></svg>`;return{svg:s,pts,reg:null,cfg:null}}
  let reg=null,cfg={};
  const ys=pts.map(q=>q.y);let ylo=Math.min(...ys),yhi=Math.max(...ys);
  if(ylo>=0&&ylo<0.6*yhi)ylo=0;
  const yt=niceTicks(ylo,yhi,5);ylo=yt[0];yhi=yt[yt.length-1];
  const sy=v=>T+ph-(v-ylo)/(yhi-ylo)*ph;
  let sx,xt=null;
  if(g.type==="bar"){
    const n=pts.length,bw=pw/n;sx=i=>L+bw*(i+.5);
    pts.forEach((q,i)=>{const x0=L+bw*i+bw*.15;s+=`<rect x="${x0}" y="${Math.min(sy(q.y),sy(Math.max(ylo,0)))}" width="${bw*.7}" height="${Math.abs(sy(q.y)-sy(Math.max(ylo,0)))}" style="fill:var(--accent)" fill-opacity=".75" stroke="currentColor" stroke-width="1.2"/>`;
      s+=`<text x="${sx(i)}" y="${H-B+20}" text-anchor="middle" font-size="${n>8?11:14}" fill="currentColor">${esc(String(q.l).slice(0,12))}</text>`});
  }else{
    const xs=pts.map(q=>q.x);let xlo=Math.min(...xs),xhi=Math.max(...xs);
    if(xlo>=0&&xlo<0.6*xhi)xlo=0;
    xt=niceTicks(xlo,xhi,6);xlo=xt[0];xhi=xt[xt.length-1];
    sx=v=>L+(v-xlo)/(xhi-xlo)*pw;
    cfg={xfrac:(Math.max(...xs)-Math.min(...xs))/(xhi-xlo),yfrac:(Math.max(...ys)-Math.min(...ys))/(yhi-ylo)};
    xt.forEach(v=>{s+=`<line x1="${sx(v)}" y1="${T}" x2="${sx(v)}" y2="${T+ph}" stroke="currentColor" stroke-opacity=".12"/><text x="${sx(v)}" y="${H-B+20}" text-anchor="middle" font-size="14" fill="currentColor">${fmt(v)}</text>`});
  }
  yt.forEach(v=>{s+=`<line x1="${L}" y1="${sy(v)}" x2="${W-Rr}" y2="${sy(v)}" stroke="currentColor" stroke-opacity=".12"/><text x="${L-8}" y="${sy(v)+5}" text-anchor="end" font-size="14" fill="currentColor">${fmt(v)}</text>`});
  s+=`<path d="M${L} ${T}V${T+ph}H${W-Rr}" fill="none" stroke="currentColor" stroke-width="2"/>`;
  if(g.type!=="bar"){
    const srt=g.type==="line"?pts.slice().sort((a,b)=>a.x-b.x):pts;
    if(g.type==="line")s+=`<polyline fill="none" style="stroke:var(--accent)" stroke-width="2.4" points="${srt.map(q=>sx(q.x)+","+sy(q.y)).join(" ")}"/>`;
    pts.forEach(q=>{const X=sx(q.x),Y=sy(q.y);s+=`<path d="M${X-5} ${Y-5}L${X+5} ${Y+5}M${X+5} ${Y-5}L${X-5} ${Y+5}" stroke="currentColor" stroke-width="2.2" fill="none"/>`});
    if(g.trend){
      reg=regress(pts);
      if(reg){const x1=Math.min(...pts.map(q=>q.x)),x2=Math.max(...pts.map(q=>q.x));
        s+=`<line x1="${sx(x1)}" y1="${sy(reg.m*x1+reg.c)}" x2="${sx(x2)}" y2="${sy(reg.m*x2+reg.c)}" style="stroke:var(--bad,#D9482B)" stroke-width="2.2" stroke-dasharray="7 5"/>`;
        s+=`<text x="${L+10}" y="${T+16}" font-size="14" fill="currentColor">trend: y = ${fmt(reg.m)}x ${reg.c<0?"-":"+"} ${fmt(Math.abs(reg.c))},  R² = ${fmt(reg.r2)}</text>`}
    }
  }
  s+=`<text x="${L+pw/2}" y="${H-12}" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">${esc(g.xl)}</text>`;
  s+=`<text transform="translate(18 ${T+ph/2}) rotate(-90)" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">${esc(g.yl)}</text></svg>`;
  return{svg:s,pts,reg,cfg};
}
function graphHints(p,r,G){
  const g=r.g,h=[],pts=G.pts,v=p.variables||{};
  const lab=s=>s&&/\S/.test(s);
  h.push([lab(g.xl)&&lab(g.yl)&&/\(|\/|unit|%/.test(g.xl+g.yl)?"ok":"no","Both axes are labelled with the quantity and its unit"+(lab(g.xl)&&lab(g.yl)&&!/\(|\//.test(g.xl+g.yl)?" (add units in brackets, e.g. (cm³))":"")+"."]);
  h.push(["nt","The independent variable"+(v.independent?" ("+v.independent+")":"")+" goes on the x-axis and the dependent variable"+(v.dependent?" ("+v.dependent+")":"")+" on the y-axis."]);
  h.push([pts.length>=5?"ok":pts.length>=3?"nt":"no",pts.length+" point"+(pts.length===1?"":"s")+" plotted. Aim for at least 5 different values of the independent variable."]);
  if(G.cfg&&G.cfg.xfrac!=null){
    const good=G.cfg.xfrac>=.5&&G.cfg.yfrac>=.5;
    h.push([good?"ok":"no",good?"The points fill more than half of the graph in both directions (good scale).":"Choose a bigger scale so the points use more than half of each axis."]);
  }
  if(g.type==="scatter")h.push(["nt","Mark each point with a small cross and draw ONE straight line or smooth curve of best fit (not dot-to-dot). Tick 'Trend line' to compare your own line with the calculated one."]);
  if(g.type==="line")h.push(["nt","Join the points with a ruler or a smooth curve only if the pattern is clear."]);
  if(g.type==="bar")h.push(["nt","Use bars of equal width with gaps between them; categories go along the x-axis."]);
  if(g.type!=="bar"&&pts.length>=5){
    const rg=regress(pts);
    if(rg){const res=pts.map(q=>q.y-(rg.m*q.x+rg.c)),sd=Math.sqrt(mean(res.map(e=>e*e)));
      const out=pts.filter((q,i)=>sd>0&&Math.abs(res[i])>2*sd);
      if(out.length)h.push(["no","Possible anomalous result at x = "+out.map(q=>fmt(q.x)).join(", ")+". Circle it and say whether you would repeat that reading."]);
      else h.push(["ok","No point stands far from the trend, so there are no obvious anomalous results."]);
    }
  }
  return h;
}

/* ---------- views ---------- */
function filtered(){
  const f=PS.f,q=f.q.trim().toLowerCase();
  return allPracs().filter(p=>{
    if(PS.sub!=="all"&&p.sub!==PS.sub)return false;
    if(f.topic&&String(p.unit)!==f.topic)return false;
    if(f.skill&&!(p.skills||[]).includes(f.skill))return false;
    if(f.level&&!(p.level===f.level||p.level==="Both"))return false;
    if(f.dur){const m=minsOf(p);if(f.dur==="40"&&!(m>0&&m<=40))return false;if(f.dur==="80"&&!(m>40&&m<=80))return false;if(f.dur==="oth"&&!(m>80||m===0))return false}
    if(q&&!(p.title+" "+(p.aim||"")+" "+(p.summary||"")).toLowerCase().includes(q))return false;
    return true;
  });
}
function cardHtml(p){
  const u=unitOf(p),r=rate(p.hazards);
  return `<article class="pr-card"><div class="pr-meta"><span class="pr-badge">${SN[p.sub]}</span><span class="pr-lv">${esc(p.level||"")}</span></div>
<h3>${esc(p.title)}</h3><p>${u?`Topic ${u.n}: ${esc(u.name)}`:""}</p><p>${inl(p.summary||p.aim||"")}</p>
<div class="pr-sk">${(p.skills||[]).map(s=>`<span>${esc(SKS[s]||s)}</span>`).join("")}</div>
<div class="pr-meta"><span>⏱ ${esc(p.time||"")}</span>${rpill(r)}</div>
<div class="pr-lk">${links(p).map(l=>`<a href="${l[1]}">${esc(l[0])}</a>`).join("")}</div>
<button class="btn pri" type="button" data-a="open" data-s="${p.sub}" data-id="${esc(p.id)}">Open practical</button></article>`;
}
function gridHtml(){
  const L=filtered();
  if(!allPracs().length)return `<div class="pr-empty">The practical investigations are still being added to this hub.</div>`;
  return `<p class="pr-count" aria-live="polite">${L.length} practical${L.length===1?"":"s"} shown</p>`+(L.length?`<div class="pr-grid">${L.map(cardHtml).join("")}</div>`:`<div class="pr-empty">No practicals match these filters. Try clearing one.</div>`);
}
function libHtml(){
  const subs=PS.sub==="all"?HUB.subs.slice():[PS.sub];
  const topics=[].concat(...subs.map(s=>units(s).map(u=>[String(u.n),(PS.sub==="all"?SNS[s]+" ":"")+u.n+". "+u.name])));
  const f=PS.f,sel=(v,a)=>v===a?" selected":"";
  return `<div class="pr-filters">
<div><label for="pr-ft">Topic</label><select id="pr-ft" data-f="topic"><option value="">All topics</option>${topics.map(t=>`<option value="${t[0]}"${sel(f.topic,t[0])}>${esc(t[1])}</option>`).join("")}</select></div>
<div><label for="pr-fs">Skill</label><select id="pr-fs" data-f="skill"><option value="">All skills</option>${SK.map(s=>`<option${sel(f.skill,s)}>${s}</option>`).join("")}</select></div>
<div><label for="pr-fl">Level</label><select id="pr-fl" data-f="level"><option value="">Core and Extended</option><option${sel(f.level,"Core")}>Core</option><option${sel(f.level,"Extended")}>Extended</option></select></div>
<div><label for="pr-fd">Duration</label><select id="pr-fd" data-f="dur"><option value="">Any</option><option value="40"${sel(f.dur,"40")}>Single period (40 min)</option><option value="80"${sel(f.dur,"80")}>Double period (80 min)</option><option value="oth"${sel(f.dur,"oth")}>Longer or flexible</option></select></div>
<div><label for="pr-fq">Search</label><input id="pr-fq" type="search" data-f="q" value="${esc(f.q)}" placeholder="Title or aim"></div></div>
<div id="pr-grid">${gridHtml()}</div>`;
}

function stepsHtml(p,r){
  return `<ol class="pr-steps">${(p.method||[]).map((m,i)=>`<li class="${r.steps[i]?"done":""}"><input type="checkbox" data-step="${i}" id="pr-st${i}"${r.steps[i]?" checked":""} aria-label="Step ${i+1} done"><span>${inl(m)}</span></li>`).join("")}</ol>`;
}
function sheetHtml(p){
  const r=getRec(p),v=p.variables||{};let fig="";
  if(p.diagram&&typeof FIGS!=="undefined"&&FIGS[p.diagram]){try{fig=`<div class="pr-fig">${FIGS[p.diagram]()}</div>`}catch(e){}}
  return `<div class="pr-sec"><h3>Aim</h3><p>${inl(p.aim||"")}</p></div>${fig?`<div class="pr-sec"><h3>Set-up</h3>${fig}</div>`:""}
<div class="pr-two"><div class="pr-sec"><h3>Apparatus (per group)</h3><ul>${(p.apparatus||[]).map(a=>`<li>${inl(a)}</li>`).join("")}</ul></div>
<div class="pr-sec"><h3>Materials</h3><div class="pr-scroll"><table class="pr-t"><thead><tr><th>Item</th><th>Amount</th></tr></thead><tbody>${(p.materials||[]).map(m=>`<tr><td>${inl(m.item)}</td><td>${inl(m.amount)}</td></tr>`).join("")}</tbody></table></div></div></div>
<div class="pr-sec"><h3>Hazards and precautions ${rpill(rate(p.hazards))}</h3><div class="pr-scroll"><table class="pr-t"><thead><tr><th>Hazard</th><th>Risk</th><th>Control</th><th>Level</th></tr></thead><tbody>${(p.hazards||[]).map(h=>`<tr><td>${inl(h.hazard)}</td><td>${inl(h.risk)}</td><td>${inl(h.control)}</td><td>${rpill(rateOne(h))}</td></tr>`).join("")}</tbody></table></div></div>
<div class="pr-sec"><h3>Method</h3><p class="pr-count">Tick each step when it is done. Ticks are saved in this browser.</p>${stepsHtml(p,r)}</div>
<div class="pr-sec"><h3>Variables</h3><div class="pr-scroll"><table class="pr-t"><tbody><tr><th>Independent (what I change)</th><td>${inl(v.independent||"")}</td></tr><tr><th>Dependent (what I measure)</th><td>${inl(v.dependent||"")}</td></tr><tr><th>Controlled (kept the same)</th><td>${(v.controlled||[]).map(c=>`<div>• ${inl(c)}</div>`).join("")}</td></tr></tbody></table></div></div>`;
}

function tableHtml(p,r){
  const I=resInfo(p);let h1="<tr>",h2="";
  I.cols.forEach((c,ci)=>{const nm=esc(c.name)+(c.unit?` <small>(${esc(c.unit)})</small>`:"");
    if(I.rep>1&&ci>0&&!I.calc[ci]){h1+=`<th colspan="${I.rep+1}">${nm}</th>`;for(let k=1;k<=I.rep;k++)h2+=`<th>R${k}</th>`;h2+=`<th>Mean</th>`}
    else{h1+=`<th${I.rep>1?' rowspan="2"':""}>${nm}${I.calc[ci]?" <small>(calculated)</small>":""}</th>`}});
  h1+="</tr>";
  let body="";
  r.cells.forEach((row,ri)=>{
    body+="<tr>";const vals=rowVals(p,r,ri);
    I.cols.forEach((c,ci)=>{
      if(I.calc[ci])body+=`<td class="pr-calc" data-calc="${ri},${ci}">${fmt(vals[ci])}</td>`;
      else{
        const cell=row[ci]||[""];
        cell.forEach((val,k)=>{body+=`<td><input inputmode="decimal" data-r="${ri}" data-c="${ci}" data-k="${k}" value="${esc(val)}" aria-label="${esc(c.name)} row ${ri+1}${I.rep>1&&ci>0?" repeat "+(k+1):""}"></td>`});
        if(I.rep>1&&ci>0)body+=`<td class="pr-calc" data-calc="${ri},${ci}">${fmt(vals[ci])}</td>`;
      }});
    body+="</tr>";});
  return `<div class="pr-scroll"><table class="pr-t"><thead>${h1}${h2?`<tr>${h2}</tr>`:""}</thead><tbody>${body}</tbody></table></div>`;
}
function recordHtml(p){
  const r=getRec(p),I=resInfo(p),g=r.g,opts=(sel)=>I.cols.map((c,i)=>`<option value="${i}"${i===sel?" selected":""}>${esc(c.name)}</option>`).join("");
  if(!I.cols.length)return `<div class="pr-empty">This practical has no results table.</div>`;
  return `<div class="pr-sec"><h3>Results table</h3>
<p class="pr-count">${I.rep>1?`Enter each repeat (R1 to R${I.rep}); the mean is worked out for you. `:""}Grey cells are calculated. Your entries are saved in this browser for this practical.${I.R.notes?" "+esc(I.R.notes):""}</p>
<div id="pr-tbl">${tableHtml(p,r)}</div>
<div class="pr-bar"><button class="btn sm" type="button" data-a="addrow">+ Add row</button><button class="btn sm" type="button" data-a="delrow">Remove last row</button><button class="btn sm" type="button" data-a="clearres">Clear all results</button></div></div>
<div class="pr-sec"><h3>Graph</h3>
<div class="pr-bar pr-f"><label>Type <select data-g="type"><option value="scatter"${g.type==="scatter"?" selected":""}>Scatter (crosses)</option><option value="line"${g.type==="line"?" selected":""}>Line</option><option value="bar"${g.type==="bar"?" selected":""}>Bar</option></select></label>
<label>x-axis <select data-g="x">${opts(g.x)}</select></label><label>y-axis <select data-g="y">${opts(g.y)}</select></label>
<label><input type="checkbox" data-g="trend"${g.trend?" checked":""}> Trend line</label></div>
<div class="pr-bar pr-f"><label>x label <input data-g="xl" value="${esc(g.xl)}"></label><label>y label <input data-g="yl" value="${esc(g.yl)}"></label></div>
<div class="pr-gr" id="pr-graph"></div>
<h3 style="margin-top:${px(14)}">Check the graph</h3><ul class="pr-hint" id="pr-hints"></ul>
<div class="pr-ex"><b>My results:</b><button class="btn sm" type="button" data-a="myres" data-f="docx">Word</button><button class="btn sm" type="button" data-a="myres" data-f="pdf">PDF</button><button class="btn sm" type="button" data-a="myres" data-f="print">Print</button><button class="btn sm" type="button" data-a="myres" data-f="csv">CSV</button></div></div>`;
}
function analysisHtml(p){
  const ans=lget(LSK.ans,{}),k=p.sub+":"+p.id;
  const qs=(p.questions||[]).map((q,i)=>`<div class="pr-qa"><p class="q"><b>${i+1}.</b> ${inl(q.q)} <span class="pr-mk">${q.marks} mark${q.marks===1?"":"s"}</span></p><details><summary>Show model answer</summary><p>${inl(q.a)}</p></details></div>`).join("");
  const ev=(p.evaluation||[]).map((e,i)=>`<div class="pr-qa"><p class="q"><b>${i+1}.</b> ${inl(e)}</p><textarea class="pr-ta" data-ev="${i}" placeholder="Write your answer here. It is saved in this browser." aria-label="Evaluation answer ${i+1}">${esc((ans[k]||[])[i]||"")}</textarea></div>`).join("");
  return `<div class="pr-sec"><h3>Analysis questions</h3><div class="pr-bar"><button class="btn sm" type="button" data-a="revealall">Show or hide all model answers</button></div>${qs||"<p>No analysis questions.</p>"}</div>
<div class="pr-sec"><h3>Evaluation prompts</h3>${ev||"<p>No evaluation prompts.</p>"}</div>`;
}
function teacherHtml(p){
  const t=p.teacher||{},N=uiGet().groups||8;
  const list=a=>a&&a.length?`<ul>${a.map(x=>`<li>${inl(x)}</li>`).join("")}</ul>`:"<p>None listed.</p>";
  return `<div class="pr-sec"><h3>Technician preparation list</h3>
<div class="pr-bar pr-f"><label>Number of groups <input id="pr-N" type="number" min="1" max="40" value="${N}" style="width:${px(90)}"></label></div>
<div id="pr-prep">${prepHtml(p,N)}</div></div>
<div class="pr-sec"><h3>Risk assessment ${rpill(rate(p.hazards))}</h3><div class="pr-scroll"><table class="pr-t"><thead><tr><th>Hazard</th><th>Risk</th><th>Control</th><th>Level</th></tr></thead><tbody>${(p.hazards||[]).map(h=>`<tr><td>${inl(h.hazard)}</td><td>${inl(h.risk)}</td><td>${inl(h.control)}</td><td>${rpill(rateOne(h))}</td></tr>`).join("")}</tbody></table></div>
<p class="pr-count">The rating is a guide worked out from the hazards. Check it against your school's current safety guidance.</p></div>
<div class="pr-two"><div class="pr-sec"><h3>Expected results</h3><p>${inl(t.expected||"")}</p></div><div class="pr-sec"><h3>Timing</h3><p>${inl(t.timing||p.time||"")}</p></div></div>
<div class="pr-two"><div class="pr-sec"><h3>Disposal</h3>${list(t.disposal)}</div><div class="pr-sec"><h3>Common problems</h3>${list(t.problems)}</div></div>
<div class="pr-sec"><h3>Print or export set</h3><div class="pr-bar"><button class="btn sm" type="button" data-a="exset" data-d="teacher" data-f="print">Print prep sheet</button><button class="btn sm" type="button" data-a="exset" data-d="risk" data-f="print">Print risk assessment</button><button class="btn sm" type="button" data-a="exset" data-d="pack" data-f="docx">Pack (Word)</button><button class="btn sm" type="button" data-a="exset" data-d="pack" data-f="pdf">Pack (PDF)</button></div></div>`;
}
function prepHtml(p,N){
  const t=p.teacher||{};
  return `<div class="pr-two"><div><table class="pr-t"><thead><tr><th>Apparatus</th><th>For ${N} groups</th></tr></thead><tbody>${(p.apparatus||[]).map(a=>{const c=apCount(a);return `<tr><td>${inl(c.name)}</td><td><b>${c.n*N}</b> <small>(${c.n} per group)</small></td></tr>`}).join("")}</tbody></table></div>
<div><table class="pr-t"><thead><tr><th>Material</th><th>Per group</th><th>Total</th></tr></thead><tbody>${(p.materials||[]).map(m=>`<tr><td>${inl(m.item)}</td><td>${inl(m.amount)}</td><td><b>${esc(scaleAmt(m.amount,N))}</b></td></tr>`).join("")}</tbody></table></div></div>
${t.prep&&t.prep.length?`<h3 style="margin-top:${px(12)}">Preparation notes</h3><ul>${t.prep.map(x=>`<li>${inl(x)}</li>`).join("")}</ul>`:""}`;
}
function examHtml(p){
  const L=p.exam||[];
  return `<div class="pr-sec"><h3>Paper ${p.sub==="alevel"?"3 / 5":"5 / 6"} style questions</h3>${L.length?L.map((e,i)=>`<div class="pr-qa"><p class="q"><b>Question ${i+1}</b> <span class="pr-mk">${e.marks} marks</span></p><p>${inl(e.q).replace(/\n/g,"<br>")}</p><details><summary>Show mark scheme</summary><ul>${(e.ms||[]).map(m=>`<li>${inl(m)}</li>`).join("")}</ul></details></div>`).join(""):"<p>No exam questions for this practical yet.</p>"}
<p class="pr-count">These mark schemes are written for this hub. They are not official Cambridge mark schemes.</p></div>`;
}
function detailHtml(p){
  const u=unitOf(p);
  return `<div class="pr-head"><button class="btn sm" type="button" data-a="back">← All practicals</button><h2>${esc(p.title)}</h2></div>
<div class="pr-meta"><span class="pr-badge">${SN[p.sub]}</span><span class="pr-lv">${esc(p.level||"")}</span><span>⏱ ${esc(p.time||"")}</span>${rpill(rate(p.hazards))}${links(p).map(l=>`<a href="${l[1]}" style="color:var(--accent);font-weight:600">${esc(l[0])}</a>`).join("")}</div>
${p.venue?`<div class="pbn" style="margin-top:${px(8)}"><div class="pbn-h"><span class="pbn-ic">🧪</span><b>Practical lesson</b><span class="pbn-env">Takes place in: ${esc(p.venue)}</span></div>${links(p).filter(l=>/lesson/i.test(l[0])).map((l,i)=>`<div class="pbn-row"><div class="pbn-t"><b>${esc(l[0])}</b><span>${i?"Related lesson":"The lesson this practical belongs to"}</span></div><a class="btn pbn-b" href="${l[1]}">Open lesson →</a></div>`).join("")}</div>`:""}
<div class="pr-sk" style="margin-top:${px(8)}">${(p.skills||[]).map(s=>`<span>${esc(s)}</span>`).join("")}</div>
<div class="pr-ex"><b>Export:</b><select id="pr-doc" aria-label="Document">${DOCS.map(d=>`<option value="${d[0]}"${PS.doc===d[0]?" selected":""}>${d[1]}</option>`).join("")}</select><button class="btn sm" type="button" data-a="ex" data-f="docx">Word</button><button class="btn sm" type="button" data-a="ex" data-f="pdf">PDF</button><button class="btn sm" type="button" data-a="ex" data-f="print">Print</button></div>
<div class="pr-msg" id="pr-msg" role="status">${esc(PS.msg)}</div>
<div class="pr-tabs" role="tablist">${TABS.map(t=>`<button role="tab" type="button" data-a="tab" data-t="${t[0]}" aria-selected="${PS.tab===t[0]}">${t[1]}</button>`).join("")}</div>
<div id="pr-tab">${tabHtml(p)}</div>`;
}
function tabHtml(p){return PS.tab==="record"?recordHtml(p):PS.tab==="analysis"?analysisHtml(p):PS.tab==="teacher"?teacherHtml(p):PS.tab==="exam"?examHtml(p):sheetHtml(p)}

/* ---------- class practical record ---------- */
function recStore(){const s=lget(LSK.rec,null);return s&&s.v===1?s:{v:1,quick:[],records:{}}}
function classList(){
  const prog=lget(LSK.prog,null),a=[];
  ((prog&&prog.classes)||[]).forEach(c=>a.push({id:"p:"+c.id,name:c.name+(c.yearGroup?" ("+c.yearGroup+")":""),learners:c.learners||[],src:"progress",raw:c}));
  recStore().quick.forEach(c=>a.push({id:"q:"+c.id,name:c.name,learners:c.learners,src:"quick"}));
  return a;
}
const lkey=(cid,p)=>cid+"|"+p.sub+":"+p.id;
function tot(sc){let s=0,n=0;RB.forEach(r=>{const v=sc&&sc[r[0]];if(v!==""&&v!=null){s+=+v;n++}});return{s,n,pct:n?Math.round(s/(n*4)*100):null}}
function classStats(cl,rec){
  const per=RB.map(r=>{const a=cl.learners.map(l=>rec.scores[l.id]&&rec.scores[l.id][r[0]]).filter(v=>v!==""&&v!=null).map(Number);return{k:r[0],n:r[2],m:a.length?mean(a):null}});
  const sup=[];let tp=[];
  cl.learners.forEach(l=>{const sc=rec.scores[l.id]||{},t=tot(sc);if(t.pct==null)return;tp.push(t.pct);
    const weak=RB.filter(r=>sc[r[0]]!==""&&sc[r[0]]!=null&&+sc[r[0]]<=1).map(r=>r[2]);
    if(t.pct<50||weak.length)sup.push({name:l.name,pct:t.pct,weak})});
  return{per,sup,avg:tp.length?Math.round(mean(tp)):null,count:tp.length};
}
function classChart(per){
  const W=520,H=per.length*38+20;let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Class mean score per skill out of 4" font-family="Figtree, Arial, sans-serif">`;
  per.forEach((q,i)=>{const y=10+i*38,w=q.m==null?0:q.m/4*(W-170);
    s+=`<text x="96" y="${y+19}" text-anchor="end" font-size="16" fill="currentColor">${esc(q.n)}</text><rect x="104" y="${y+3}" width="${W-170}" height="24" rx="4" fill="none" stroke="currentColor" stroke-opacity=".3"/><rect x="104" y="${y+3}" width="${w}" height="24" rx="4" style="fill:${q.m!=null&&q.m<2?"var(--bad,#D9482B)":"var(--accent)"}"/><text x="${W-52}" y="${y+21}" font-size="16" font-weight="700" fill="currentColor">${q.m==null?"–":(Math.round(q.m*10)/10)}</text>`});
  return s+"</svg>";
}
function classHtml(){
  const cls=classList(),st=recStore(),ps=allPracs();
  const cl=cls.find(c=>c.id===PS.cls),p=ps.find(x=>x.sub+":"+x.id===PS.pr);
  let h=`<div class="pr-sec"><h3>Class practical record</h3><p class="pr-count">Pick a class and a practical, then score each learner 0 to 4 on each skill. Records are saved in this browser only.</p>
<div class="pr-two pr-f"><div><label for="pr-cls">Class</label><select id="pr-cls" data-c="cls" style="width:100%"><option value="">${cls.length?"Choose a class":"No classes yet - add a quick list below"}</option>
${["progress","quick"].map(src=>{const l=cls.filter(c=>c.src===src);return l.length?`<optgroup label="${src==="progress"?"Learner progress classes":"Quick lists"}">${l.map(c=>`<option value="${esc(c.id)}"${c.id===PS.cls?" selected":""}>${esc(c.name)} (${c.learners.length})</option>`).join("")}</optgroup>`:""}).join("")}</select></div>
<div><label for="pr-cpr">Practical</label><select id="pr-cpr" data-c="pr" style="width:100%"><option value="">Choose a practical</option>${HUB.subs.map(s=>`<optgroup label="${SN[s]}">${ps.filter(x=>x.sub===s).map(x=>`<option value="${x.sub}:${esc(x.id)}"${PS.pr===x.sub+":"+x.id?" selected":""}>${esc(x.title)}</option>`).join("")}</optgroup>`).join("")}</select></div></div>
<details class="pr-qa"><summary>Add a quick class list (no Learner progress class needed)</summary><div class="pr-f" style="margin-top:${px(8)}"><label for="pr-qn">Class name</label><input id="pr-qn" placeholder="e.g. 10B Chemistry" style="width:100%"><label for="pr-ql" style="margin-top:${px(8)}">Learners (one name per line)</label><textarea id="pr-ql" class="pr-ta" placeholder="Name one&#10;Name two"></textarea><div class="pr-bar"><button class="btn sm pri" type="button" data-a="addquick">Save list</button>${PS.cls.startsWith("q:")?`<button class="btn sm" type="button" data-a="delquick">Delete the selected quick list</button>`:""}</div></div></details></div>`;
  if(!cl||!p){return h+`<div class="pr-empty">Choose a class and a practical to start scoring.</div>`}
  const key=lkey(cl.id,p),rec=st.records[key]||{date:new Date().toISOString().slice(0,10),group:"Pairs",scores:{},comments:{}};
  if(!cl.learners.length)return h+`<div class="pr-empty">This class has no learners yet.</div>`;
  const S=classStats(cl,rec);
  h+=`<div class="pr-sec"><h3>${esc(p.title)} - ${esc(cl.name)}</h3>
<div class="pr-two pr-f"><div><label for="pr-rd">Date</label><input id="pr-rd" type="date" data-r="date" value="${esc(rec.date)}" style="width:100%"></div><div><label for="pr-rg">Group arrangement</label><input id="pr-rg" list="pr-gl" data-r="group" value="${esc(rec.group)}" style="width:100%"><datalist id="pr-gl"><option>Individual</option><option>Pairs</option><option>Groups of 3</option><option>Groups of 4</option><option>Teacher demonstration</option></datalist></div></div>
<details class="pr-qa"><summary>Scoring guide (0 to 4)</summary><ul>${RBD.map(x=>`<li>${x}</li>`).join("")}</ul></details>
<div class="pr-scroll"><table class="pr-t pr-sc"><thead><tr><th>Learner</th>${RB.map(r=>`<th title="${esc(r[1])}">${r[2]}</th>`).join("")}<th>Total /28</th><th>%</th><th>Comment</th></tr></thead><tbody>
${cl.learners.map(l=>{const sc=rec.scores[l.id]||{},t=tot(sc);return `<tr data-l="${esc(l.id)}"><td>${esc(l.name)}</td>${RB.map(r=>`<td><select data-sc="${r[0]}" aria-label="${esc(l.name)} ${esc(r[1])}"><option value="">-</option>${[0,1,2,3,4].map(v=>`<option${sc[r[0]]!==""&&sc[r[0]]!=null&&+sc[r[0]]===v?" selected":""}>${v}</option>`).join("")}</select></td>`).join("")}<td data-tot>${t.n?t.s+"/"+t.n*4:""}</td><td data-pct>${t.pct==null?"":t.pct+"%"}</td><td><input data-cm value="${esc((rec.comments||{})[l.id]||"")}" style="min-width:${px(160)}" aria-label="Comment for ${esc(l.name)}"></td></tr>`}).join("")}</tbody></table></div></div>
<div class="pr-sec" id="pr-sum">${summaryHtml(S)}</div>
<div class="pr-sec"><h3>Export</h3><div class="pr-bar"><button class="btn sm" type="button" data-a="cx" data-f="csv">CSV</button><button class="btn sm" type="button" data-a="cx" data-f="docx">Word</button><button class="btn sm" type="button" data-a="cx" data-f="pdf">PDF</button><button class="btn sm" type="button" data-a="cx" data-f="print">Print</button></div>
<div class="pr-msg" id="pr-cmsg" role="status"></div>${formHtml(cl,rec)}</div>`;
  return h;
}
function summaryHtml(S){
  return `<h3>Class summary</h3>${S.count?`<p>Scored learners: <b>${S.count}</b>. Class average: <b>${S.avg}%</b>.</p>`:"<p>Score at least one learner to see the summary.</p>"}
<div class="pr-gr">${classChart(S.per)}</div>
<h3 style="margin-top:${px(12)}">Learners needing support</h3>${S.sup.length?`<ul>${S.sup.map(x=>`<li><b>${esc(x.name)}</b> - ${x.pct}%${x.weak.length?" (low in: "+esc(x.weak.join(", "))+")":""}</li>`).join("")}</ul><p class="pr-count">Listed when the total is under 50% or any skill is scored 0 or 1.</p>`:"<p>No learners flagged yet.</p>"}`;
}
function semNow(){return new Date().getMonth()<6?"sem1":"sem2"}
function formHtml(cl,rec){
  if(cl.src!=="progress")return `<p class="pr-count">To send a practical mark to Learner progress as a formative assessment, choose a class created on the Learner progress page.</p>`;
  const sem=PS.sem||semNow();
  return `<h3 style="margin-top:${px(12)}">Learner progress</h3><div class="pr-bar pr-f"><label>Semester <select data-c="sem"><option value="sem1"${sem==="sem1"?" selected":""}>Semester 1</option><option value="sem2"${sem==="sem2"?" selected":""}>Semester 2</option></select></label><button class="btn sm" type="button" data-a="formask">Record as formative assessment mark</button></div><div id="pr-form"></div>`;
}
function progTarget(cl,sem){
  const prog=lget(LSK.prog,null);if(!prog)return{err:"No Learner progress data was found in this browser."};
  const pc=(prog.classes||[]).find(c=>"p:"+c.id===cl.id);if(!pc)return{err:"That class was not found in Learner progress."};
  const yr=(prog.settings&&prog.settings.academicYear)||String(new Date().getFullYear());
  const sm=pc.years&&pc.years[yr]&&pc.years[yr][sem];
  const as=sm&&(sm.assess||[]).find(a=>a.type==="form");
  if(!as)return{err:"The Learner progress page has no formative assessment for "+(sem==="sem1"?"Semester 1":"Semester 2")+" "+yr+" yet. Add one there first."};
  return{prog,pc,sm,as,yr};
}

/* ---------- lab planner ---------- */
function planState(){if(!PS.plan)PS.plan=lget(LSK.plan,{sel:[],groups:8,week:""});return PS.plan}
function planSave(){lset(LSK.plan,PS.plan)}
function planMerge(sel,N){
  const ap=new Map(),ma=new Map(),sp=new Map(),saf=[];
  sel.forEach(p=>{
    (p.apparatus||[]).forEach(a=>{const c=apCount(a),k=c.name.toLowerCase();const e=ap.get(k)||{name:c.name,n:0,used:[]};e.n+=c.n*N;if(!e.used.includes(p.title))e.used.push(p.title);ap.set(k,e)});
    (p.materials||[]).forEach(m=>{const q=qty(m.amount),k=(m.item||"").toLowerCase(),map=SPEC.test(m.item||"")?sp:ma;
      const e=map.get(k)||{name:m.item,parts:{},used:[]};
      if(q){e.parts[q.rest]=(e.parts[q.rest]||0)+q.n*N}else{const t=m.amount+" × "+N;e.parts[t]=NaN}
      if(!e.used.includes(p.title))e.used.push(p.title);map.set(k,e)});
    saf.push({p,r:rate(p.hazards)});
  });
  const amt=e=>Object.keys(e.parts).map(k=>isNaN(e.parts[k])?k:roundQ(e.parts[k])+(k?" "+k:"")).join(" + ");
  return{ap:[...ap.values()].sort((a,b)=>a.name.localeCompare(b.name)),ma:[...ma.values()].sort((a,b)=>a.name.localeCompare(b.name)).map(e=>({name:e.name,amt:amt(e),used:e.used})),sp:[...sp.values()].sort((a,b)=>a.name.localeCompare(b.name)).map(e=>({name:e.name,amt:amt(e),used:e.used})),saf};
}
function planSel(){const st=planState();return st.sel.map(k=>{const i=k.indexOf(":");return findP(k.slice(0,i),k.slice(i+1))}).filter(Boolean)}
function plannerOut(){
  const st=planState(),sel=planSel(),N=st.groups||8;
  if(!sel.length)return `<div class="pr-empty">Tick the practicals for the week to build the combined lists.</div>`;
  const M=planMerge(sel,N);
  const tbl=(head,rows)=>`<div class="pr-scroll"><table class="pr-t"><thead><tr>${head.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  return `<div class="pr-sec"><h3>Apparatus for ${N} groups</h3>${tbl(["Item","Total","Used in"],M.ap.map(e=>[inl(e.name),`<b>${e.n}</b>`,esc(e.used.join("; "))]))}</div>
<div class="pr-sec"><h3>Chemicals and consumables</h3>${M.ma.length?tbl(["Item","Total","Used in"],M.ma.map(e=>[inl(e.name),`<b>${esc(e.amt)}</b>`,esc(e.used.join("; "))])):"<p>None.</p>"}</div>
<div class="pr-sec"><h3>Specimens and living material</h3>${M.sp.length?tbl(["Item","Total","Used in"],M.sp.map(e=>[inl(e.name),`<b>${esc(e.amt)}</b>`,esc(e.used.join("; "))])):"<p>None.</p>"}</div>
<div class="pr-sec"><h3>Safety warnings</h3>${M.saf.slice().sort((a,b)=>["High","Medium","Low"].indexOf(a.r)-["High","Medium","Low"].indexOf(b.r)).map(x=>`<div class="pr-qa"><p class="q"><b>${esc(x.p.title)}</b> ${rpill(x.r)}</p><ul>${(x.p.hazards||[]).filter(h=>rateOne(h)!=="Low").map(h=>`<li><b>${inl(h.hazard)}</b>: ${inl(h.control)}</li>`).join("")||"<li>Low-level hazards only. Follow the usual lab rules.</li>"}</ul></div>`).join("")}</div>`;
}
function mdPlanner(){
  const st=planState(),sel=planSel(),N=st.groups||8,M=planMerge(sel,N);
  const b=[{t:"kv",pairs:[["Week / dates",st.week||""],["Number of groups",String(N)],["Practicals",sel.map(p=>p.title).join("; ")]]},
    {t:"h",l:2,text:"Apparatus"},{t:"table",head:["Item","Total","Used in"],rows:M.ap.map(e=>[e.name,String(e.n),e.used.join("; ")]),widths:[40,14,46],fontSize:10}];
  if(M.ma.length)b.push({t:"h",l:2,text:"Chemicals and consumables"},{t:"table",head:["Item","Total","Used in"],rows:M.ma.map(e=>[e.name,e.amt,e.used.join("; ")]),widths:[36,24,40],fontSize:10});
  if(M.sp.length)b.push({t:"h",l:2,text:"Specimens and living material"},{t:"table",head:["Item","Total","Used in"],rows:M.sp.map(e=>[e.name,e.amt,e.used.join("; ")]),widths:[36,24,40],fontSize:10});
  const sf=M.saf.slice().sort((a,c)=>["High","Medium","Low"].indexOf(a.r)-["High","Medium","Low"].indexOf(c.r));
  b.push({t:"h",l:2,text:"Safety warnings"},{t:"table",head:["Practical","Rating","Main hazards and controls"],rows:sf.map(x=>[x.p.title,x.r,(x.p.hazards||[]).filter(h=>rateOne(h)!=="Low").map(h=>h.hazard+": "+h.control).join("\n")||"Low-level hazards only."]),widths:[28,12,60],fontSize:9.5,tone:sf.map((x,i)=>[i,x.r==="High"?"bad":x.r==="Medium"?"warn":"good"])});
  b.push({t:"sig",labels:["Teacher","Technician"]});
  return{title:"Laboratory plan"+(st.week?" - "+st.week:""),subtitle:sel.length+" practical"+(sel.length===1?"":"s")+" for "+N+" groups",orientation:"portrait",footer:"Cambridge Learning Hub - laboratory planner",blocks:b};
}
function plannerHtml(){return window.PRACPLAN?PRACPLAN.html():"<div class=\"pr-empty\">The planner is not loaded.</div>"}
window.PRACH={curSub:()=>PS.sub,allPracs,findP,rate,rateOne,rpill,inl,esc,px,apCount,qty,roundQ,scaleAmt,SPEC,classList,recStore,classStats,lget,lset,outModel,minsOf,fmt,SN,SNS};

/* ---------- page ---------- */
window.PRACUI=function(app,env){
  injectCss();
  if(!PS.started){PS.started=1}
  if(window.PRACOPEN&&window.PRACOPEN.sub===env.subKey&&findP(env.subKey,window.PRACOPEN.id)){PS.cursub=env.subKey;PS.id=window.PRACOPEN.id;PS.tab="sheet";PS.msg=""}window.PRACOPEN=null;
  PS.sub=PS.sub==="all"?"all":env.subKey;PS.id=PS.id&&findP(env.subKey,PS.id)?PS.id:"";
  const root=document.createElement("div");root.className="pr-wrap";
  app.innerHTML=`<h1 class="ltitle">Laboratory practicals</h1><p class="lsum">Student sheets, results tables with graphs, teacher preparation lists, risk assessments, class practical records and a weekly lab planner. Your results and records stay in this browser.</p>`;
  app.appendChild(root);
  const cur=()=>findP(PS.cursub||PS.sub,PS.id);
  const say=m=>{PS.msg=m;const e=root.querySelector("#pr-msg");if(e)e.textContent=m};
  const body=()=>root.querySelector("#pr-body");
  function draw(){
    const p=PS.id?findP(PS.cursub,PS.id):null;
    root.innerHTML=`<div class="pr-top"><div class="chips" role="group" aria-label="Subject">${[["chem","Chemistry"],["bio","Biology 0610"],["alevel","Biology 9700"],["all","All subjects"]].filter(s=>HUB.subs.includes(s[0])||(s[0]==="all"&&HUB.subs.length>1)).map(s=>`<button class="chip" type="button" data-a="sub" data-s="${s[0]}" aria-pressed="${PS.sub===s[0]}">${s[1]}</button>`).join("")}</div></div>
<div class="pr-main" role="tablist">${[["lib","Practical library"],["class","Class practical record"],["plan","Practical planner"]].filter(t=>HUB.teacher||t[0]!=="plan").map(t=>`<button role="tab" type="button" data-a="main" data-t="${t[0]}" aria-selected="${PS.main===t[0]}">${t[1]}</button>`).join("")}</div>
<div id="pr-body">${PS.main==="lib"?(p?detailHtml(p):libHtml()):PS.main==="class"?classHtml():plannerHtml()}</div>`;
    if(p&&PS.main==="lib"&&PS.tab==="record")refreshGraph(p);
  }
  function refreshGraph(p){
    const r=getRec(p),G=graphSVG(p,r),gd=root.querySelector("#pr-graph"),hd=root.querySelector("#pr-hints");
    if(gd)gd.innerHTML=G.svg;
    if(hd)hd.innerHTML=graphHints(p,r,G).map(h=>`<li class="${h[0]}"><b>${h[0]==="ok"?"✓":h[0]==="no"?"!":"i"}</b> ${esc(h[1])}</li>`).join("");
  }
  function refreshCalc(p){
    const r=getRec(p);
    r.cells.forEach((row,ri)=>{const v=rowVals(p,r,ri);root.querySelectorAll(`[data-calc^="${ri},"]`).forEach(td=>{const ci=+td.dataset.calc.split(",")[1];td.textContent=fmt(v[ci])})});
    refreshGraph(p);
  }
  function saveRecs(cl,p,rec){const st=recStore();st.records[lkey(cl.id,p)]=rec;lset(LSK.rec,st)}
  function curClassRec(){
    const cls=classList(),cl=cls.find(c=>c.id===PS.cls),p=allPracs().find(x=>x.sub+":"+x.id===PS.pr);
    if(!cl||!p)return null;
    const st=recStore();let rec=st.records[lkey(cl.id,p)];
    if(!rec)rec={date:new Date().toISOString().slice(0,10),group:"Pairs",scores:{},comments:{}};
    return{cl,p,rec};
  }
  function classRows(o){
    const rows=[["Learner"].concat(RB.map(r=>r[1]),["Total","Percent","Comment"])];
    o.cl.learners.forEach(l=>{const sc=o.rec.scores[l.id]||{},t=tot(sc);rows.push([l.name].concat(RB.map(r=>sc[r[0]]==null?"":sc[r[0]]),[t.n?t.s+"/"+t.n*4:"",t.pct==null?"":t.pct+"%",(o.rec.comments||{})[l.id]||""]))});
    return rows;
  }
  async function classExport(fmt){
    const o=curClassRec();if(!o)return;const cm=root.querySelector("#pr-cmsg"),sayc=m=>{if(cm)cm.textContent=m};
    const S=classStats(o.cl,o.rec),rows=classRows(o),name="practical-record-"+slug(o.cl.name)+"-"+slug(o.p.title);
    if(fmt==="csv"){
      const csv=typeof HUBDOC!=="undefined"&&HUBDOC.csv?HUBDOC.csv(rows):rows.map(r=>r.map(c=>/[",\n]/.test(c)?'"'+String(c).replace(/"/g,'""')+'"':c).join(",")).join("\r\n");
      const r=await env.saveFile(name+".csv",new Blob(["﻿"+csv],{type:"text/csv"}));sayc(r==="saved"||r===true?"CSV saved.":r==="declined"?"":"Could not save the file.");return}
    let png=null;
    if(typeof HUBDOC!=="undefined"&&HUBDOC.svgToPng){try{png=await HUBDOC.svgToPng(classChart(S.per),900)}catch(e){}}
    const b=[{t:"kv",pairs:[["Class",o.cl.name],["Practical",o.p.title],["Date",o.rec.date],["Grouping",o.rec.group],["Class average",S.avg==null?"":S.avg+"%"]]},
      {t:"table",head:rows[0].map((x,i)=>i>0&&i<=RB.length?RB[i-1][2]:x),rows:rows.slice(1),fontSize:9,widths:[18,5,5,5,5,5,5,5,8,7,32]}];
    if(png)b.push({t:"h",l:2,text:"Class mean per skill (out of 4)"},{t:"img",dataUrl:png.dataUrl,w:png.w,h:png.h,widthPct:60});
    b.push({t:"h",l:2,text:"Learners needing support"},S.sup.length?{t:"ul",items:S.sup.map(x=>x.name+" - "+x.pct+"%"+(x.weak.length?" (low in "+x.weak.join(", ")+")":""))}:{t:"p",text:"No learners flagged."});
    b.push({t:"p",italic:true,text:"Scores: "+RBD.join("; ")});
    await outModel(env,{title:"Practical record: "+o.p.title,subtitle:o.cl.name+" | "+o.rec.date,orientation:"landscape",footer:"Cambridge Learning Hub - class practical record",blocks:b},fmt,name,sayc);
  }
  async function myResults(p,fmt){
    const r=getRec(p),I=resInfo(p),name="my-results-"+slug(p.title);
    const head=[];I.cols.forEach((c,i)=>{const nm=c.name+(c.unit?" ("+c.unit+")":"");if(I.rep>1&&i>0&&!I.calc[i]){for(let k=1;k<=I.rep;k++)head.push(nm+" R"+k);head.push(nm+" mean")}else head.push(nm)});
    const rows=r.cells.map((row,ri)=>{const v=rowVals(p,r,ri),o=[];I.cols.forEach((c,ci)=>{if(I.calc[ci])o.push(fmt0(v[ci]));else{(row[ci]||[""]).forEach(x=>o.push(x));if(I.rep>1&&ci>0)o.push(fmt0(v[ci]))}});return o});
    function fmt0(x){return fmt(x)}
    if(fmt==="csv"){
      const csv=typeof HUBDOC!=="undefined"&&HUBDOC.csv?HUBDOC.csv([head].concat(rows)):[head].concat(rows).map(q=>q.join(",")).join("\r\n");
      const s=await env.saveFile(name+".csv",new Blob(["﻿"+csv],{type:"text/csv"}));say(s==="saved"||s===true?"CSV saved.":s==="declined"?"":"Could not save the file.");return}
    const G=graphSVG(p,r);let png=null;
    if(G.pts.length&&typeof HUBDOC!=="undefined"&&HUBDOC.svgToPng){try{png=await HUBDOC.svgToPng(G.svg,900)}catch(e){}}
    const b=[{t:"kv",pairs:[["Name",""],["Class and date",""]]},{t:"h",l:2,text:"Results"},{t:"table",head,rows,fontSize:10}];
    if(png)b.push({t:"h",l:2,text:"Graph"},{t:"img",dataUrl:png.dataUrl,w:png.w,h:png.h,widthPct:75});
    const ans=(lget(LSK.ans,{})[p.sub+":"+p.id])||[];
    const ev=(p.evaluation||[]).map((e,i)=>[e,ans[i]||""]).filter(x=>x[1]);
    if(ev.length)b.push({t:"h",l:2,text:"Evaluation"},{t:"table",head:["Prompt","My answer"],rows:ev,widths:[40,60]});
    await outModel(env,{title:p.title+" - my results",subtitle:metaLine(p),orientation:"portrait",footer:"Cambridge Learning Hub - learner results",blocks:b},fmt,name,say);
  }

  root.addEventListener("click",async e=>{
    if(PS.main==="plan"&&window.PRACPLAN&&e.target.closest("[data-pp]")){await PRACPLAN.handle(e,"click",root,env,draw);return}
    const t=e.target.closest("[data-a]");if(!t)return;const a=t.dataset.a;
    if(a==="sub"){PS.sub=t.dataset.s;PS.f.topic="";PS.id="";draw()}
    else if(a==="main"){PS.main=t.dataset.t;draw()}
    else if(a==="open"){PS.cursub=t.dataset.s;PS.id=t.dataset.id;PS.tab="sheet";PS.msg="";draw();window.scrollTo(0,0)}
    else if(a==="back"){PS.id="";draw()}
    else if(a==="tab"){PS.tab=t.dataset.t;draw()}
    else if(a==="ex"){const p=findP(PS.cursub,PS.id),N=uiGet().groups||8;PS.doc=root.querySelector("#pr-doc").value;await outModel(env,MODEL[PS.doc](p,N),t.dataset.f,slug(p.title)+"-"+PS.doc,say)}
    else if(a==="exset"){const p=findP(PS.cursub,PS.id),N=uiGet().groups||8;await outModel(env,MODEL[t.dataset.d](p,N),t.dataset.f,slug(p.title)+"-"+t.dataset.d,say)}
    else if(a==="addrow"||a==="delrow"||a==="clearres"){
      const p=findP(PS.cursub,PS.id),r=getRec(p),I=resInfo(p);
      if(a==="addrow")r.cells.push(I.cols.map((c,ci)=>Array(I.rep>1&&ci>0&&!I.calc[ci]?I.rep:1).fill("")));
      else if(a==="delrow"&&r.cells.length>1)r.cells.pop();
      else if(a==="clearres"){const f=initRec(p);r.cells=f.cells}
      recSet(p,r);draw()}
    else if(a==="myres"){await myResults(findP(PS.cursub,PS.id),t.dataset.f)}
    else if(a==="revealall"){const d=root.querySelectorAll("#pr-tab details"),open=![...d].every(x=>x.open);d.forEach(x=>x.open=open)}
    else if(a==="addquick"){
      const n=root.querySelector("#pr-qn").value.trim(),ls=root.querySelector("#pr-ql").value.split("\n").map(x=>x.trim()).filter(Boolean);
      if(!n||!ls.length)return;const st=recStore(),id="q"+Date.now().toString(36);
      st.quick.push({id,name:n,learners:ls.map((x,i)=>({id:"l"+i,name:x}))});lset(LSK.rec,st);PS.cls="q:"+id;draw()}
    else if(a==="delquick"){const id=PS.cls.slice(2),st=recStore();st.quick=st.quick.filter(c=>c.id!==id);Object.keys(st.records).forEach(k=>{if(k.startsWith("q:"+id+"|"))delete st.records[k]});lset(LSK.rec,st);PS.cls="";draw()}
    else if(a==="cx"){await classExport(t.dataset.f)}
    else if(a==="formask"){
      const o=curClassRec();if(!o)return;const box=root.querySelector("#pr-form"),tg=progTarget(o.cl,PS.sem||semNow());
      if(tg.err){box.innerHTML=`<div class="pr-note">${esc(tg.err)}</div>`;return}
      const sc=o.cl.learners.filter(l=>tot(o.rec.scores[l.id]).pct!=null);
      if(!sc.length){box.innerHTML=`<div class="pr-note">Score at least one learner first.</div>`;return}
      box.innerHTML=`<div class="pr-ok"><span>Write each learner's practical percentage, scaled to <b>${esc(tg.as.name||"the formative assessment")}</b> (out of ${tg.as.max}), for <b>${sc.length}</b> learner${sc.length===1?"":"s"}? Existing marks for this assessment will be replaced.</span><button class="btn sm pri" type="button" data-a="formgo">Confirm</button><button class="btn sm" type="button" data-a="formno">Cancel</button></div>`}
    else if(a==="formno"){root.querySelector("#pr-form").innerHTML=""}
    else if(a==="formgo"){
      const o=curClassRec(),box=root.querySelector("#pr-form"),tg=o&&progTarget(o.cl,PS.sem||semNow());
      if(!o||tg.err){box.innerHTML=`<div class="pr-note">${esc(tg?tg.err:"")}</div>`;return}
      tg.sm.marks=tg.sm.marks||{};let n=0;
      o.cl.learners.forEach(l=>{const t2=tot(o.rec.scores[l.id]);if(t2.pct==null)return;tg.sm.marks[l.id]=tg.sm.marks[l.id]||{};tg.sm.marks[l.id][tg.as.id]=Math.round(t2.pct/100*tg.as.max*10)/10;n++});
      box.innerHTML=lset(LSK.prog,tg.prog)?`<div class="pr-msg">Saved ${n} mark${n===1?"":"s"} to Learner progress.</div>`:`<div class="pr-note">Could not save to Learner progress.</div>`}
    else if(a==="plx"){const m=mdPlanner(),sel=planSel();if(!sel.length){root.querySelector("#pr-pmsg").textContent="Tick at least one practical first.";return}await outModel(env,m,t.dataset.f,"lab-plan-"+slug(planState().week||"week"),m2=>{root.querySelector("#pr-pmsg").textContent=m2})}
  });
  root.addEventListener("input",e=>{
    if(PS.main==="plan"&&window.PRACPLAN){PRACPLAN.handle(e,"input",root,env,draw);return}
    const t=e.target;
    if(t.dataset.f!==undefined&&PS.main==="lib"&&!PS.id){PS.f[t.dataset.f]=t.value;root.querySelector("#pr-grid").innerHTML=gridHtml();return}
    if(t.dataset.step!==undefined){const p=findP(PS.cursub,PS.id),r=getRec(p);r.steps[t.dataset.step]=t.checked;recSet(p,r);t.closest("li").classList.toggle("done",t.checked);return}
    if(t.dataset.r!==undefined&&t.dataset.c!==undefined&&t.dataset.k!==undefined&&PS.id){
      const p=findP(PS.cursub,PS.id),r=getRec(p);r.cells[+t.dataset.r][+t.dataset.c][+t.dataset.k]=t.value;recSet(p,r);refreshCalc(p);return}
    if(t.dataset.g!==undefined&&PS.id){
      const p=findP(PS.cursub,PS.id),r=getRec(p),k=t.dataset.g;
      r.g[k]=t.type==="checkbox"?t.checked:(k==="x"||k==="y")?+t.value:t.value;
      if(k==="x"||k==="y"){const c=resInfo(p).cols[+t.value];if(c){const lb=c.name+(c.unit?" ("+c.unit+")":"");r.g[k==="x"?"xl":"yl"]=lb;const inp=root.querySelector(`[data-g="${k}l"]`);if(inp)inp.value=lb}}
      recSet(p,r);refreshGraph(p);return}
    if(t.dataset.ev!==undefined&&PS.id){const a=lget(LSK.ans,{}),k=PS.cursub+":"+PS.id;a[k]=a[k]||[];a[k][+t.dataset.ev]=t.value;lset(LSK.ans,a);return}
    if(t.id==="pr-N"){const u=uiGet();u.groups=Math.max(1,Math.min(40,+t.value||1));lset(LSK.ui,u);const p=findP(PS.cursub,PS.id);root.querySelector("#pr-prep").innerHTML=prepHtml(p,u.groups);return}
    if(t.dataset.pl!==undefined){const st=planState();st[t.dataset.pl]=t.dataset.pl==="groups"?Math.max(1,Math.min(40,+t.value||1)):t.value;planSave();root.querySelector("#pr-pout").innerHTML=plannerOut();return}
    if(t.dataset.cm!==undefined){const o=curClassRec(),tr=t.closest("tr");o.rec.comments=o.rec.comments||{};o.rec.comments[tr.dataset.l]=t.value;saveRecs(o.cl,o.p,o.rec);return}
    if(t.dataset.r==="date"||t.dataset.r==="group"){const o=curClassRec();o.rec[t.dataset.r]=t.value;saveRecs(o.cl,o.p,o.rec);return}
  });
  root.addEventListener("change",e=>{
    if(PS.main==="plan"&&window.PRACPLAN){PRACPLAN.handle(e,"change",root,env,draw);return}
    const t=e.target;
    if(t.dataset.f!==undefined&&PS.main==="lib"&&!PS.id){PS.f[t.dataset.f]=t.value;root.querySelector("#pr-grid").innerHTML=gridHtml();return}
    if(t.dataset.g==="type"||t.dataset.g==="x"||t.dataset.g==="y"||t.dataset.g==="trend"){return}
    if(t.id==="pr-doc"){PS.doc=t.value;return}
    if(t.dataset.c==="cls"){PS.cls=t.value;draw();return}
    if(t.dataset.c==="pr"){PS.pr=t.value;draw();return}
    if(t.dataset.c==="sem"){PS.sem=t.value;root.querySelector("#pr-form").innerHTML="";return}
    if(t.dataset.plSel){const st=planState(),k=t.dataset.plSel;st.sel=st.sel.filter(x=>x!==k);if(t.checked)st.sel.push(k);planSave();root.querySelector("#pr-pout").innerHTML=plannerOut();return}
    if(t.dataset.sc){
      const o=curClassRec(),tr=t.closest("tr"),id=tr.dataset.l;o.rec.scores[id]=o.rec.scores[id]||{};o.rec.scores[id][t.dataset.sc]=t.value;
      saveRecs(o.cl,o.p,o.rec);const tt=tot(o.rec.scores[id]);
      tr.querySelector("[data-tot]").textContent=tt.n?tt.s+"/"+tt.n*4:"";tr.querySelector("[data-pct]").textContent=tt.pct==null?"":tt.pct+"%";
      root.querySelector("#pr-sum").innerHTML=summaryHtml(classStats(o.cl,o.rec));return}
  });
  draw();
};
})();
