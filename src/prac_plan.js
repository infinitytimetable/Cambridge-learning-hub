/* ===== Practical planner v2: multi-week, multi-class. Uses helpers exposed by prac.js as window.PRACH ===== */
(function(){
"use strict";
const H=()=>window.PRACH;
const KEY="hubprac.plan.v2";
const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday"],DS=["Mon","Tue","Wed","Thu","Fri"];
const INC=[["ap","Apparatus"],["ma","Chemicals and consumables"],["sp","Specimens and living material"],["hz","Safety and hazards"],["ck","Preparation checklist"],["mt","Method steps"],["nt","My note for the session"]];
const DEFINC={ap:1,ma:1,sp:1,hz:1,ck:1,mt:0,nt:1};
let P=null,ED=null,MSG="";
const uid=()=>Math.random().toString(36).slice(2,9);
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
function addDays(s,n){const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return iso(d)}
const fmtD=s=>{if(!s)return"";const d=new Date(s+"T12:00:00");return d.toLocaleDateString(undefined,{day:"numeric",month:"short"})};
function load(){
  if(P)return P;
  const h=H();let s=h.lget(KEY,null);
  if(!s||s.v!==2){
    s={v:2,classes:[],weeks:[{n:1,label:"",start:""}],sessions:[],view:"setup",inc:Object.assign({},DEFINC),range:{w1:"",w2:"",d1:"",d2:""}};
    const old=h.lget("hubprac.plan.v1",null);
    if(old&&old.sel&&old.sel.length){
      const sub=old.sel[0].split(":")[0];s.classes.push({id:uid(),name:"My class",sub,learners:(old.groups||8)*2,gsize:2});
      old.sel.forEach((k,i)=>s.sessions.push({id:uid(),wk:1,day:Math.min(4,i),per:"",cls:s.classes[0].id,pk:k,groups:old.groups||8,done:0,note:""}));
      s.weeks[0].label=old.week||"";
    }
  }
  s.inc=Object.assign({},DEFINC,s.inc||{});s.range=s.range||{w1:"",w2:"",d1:"",d2:""};
  return P=s;
}
const save=()=>{if(P)H().lset(KEY,P)};
const cls=id=>P.classes.find(c=>c.id===id);
function guessSub(name){const n=String(name).toLowerCase(),h=H();let g=null;
  if(/chem/.test(n))g="chem";else if(/a level|as level|\bas\b|\ba2\b|9700|a-level/.test(n))g="alevel";else if(/bio|igcse|0610/.test(n))g="bio";
  if(g&&HUB.subs.includes(g))return g;const c=h.curSub();return HUB.subs.includes(c)?c:HUB.subs[0]}
function addHub(c){if(P.classes.some(x=>x.link===c.id))return P.classes.find(x=>x.link===c.id);
  const o={id:uid(),name:c.name,sub:guessSub(c.name),learners:c.learners.length,gsize:2,link:c.id};P.classes.push(o);return o}
const hubFree=()=>H().classList().filter(c=>!P.classes.some(x=>x.link===c.id));
const wk=n=>P.weeks.find(w=>w.n===n);
const prOf=s=>{const i=s.pk.indexOf(":");return H().findP(s.pk.slice(0,i),s.pk.slice(i+1))};
const groupsOf=s=>{if(+s.groups>0)return +s.groups;const c=cls(s.cls);return c&&c.learners&&c.gsize?Math.max(1,Math.ceil(c.learners/c.gsize)):8};
const dateOf=s=>{const w=wk(s.wk);return w&&w.start?addDays(w.start,s.day):""};
const wkName=w=>"Week "+w.n+(w.label?" - "+w.label:"");
const wkSpan=w=>w.start?fmtD(w.start)+" to "+fmtD(addDays(w.start,4)):"";
function inRange(s){
  const r=P.range;
  if(r.w1&&s.wk<+r.w1)return false;if(r.w2&&s.wk>+r.w2)return false;
  const d=dateOf(s);if(d){if(r.d1&&d<r.d1)return false;if(r.d2&&d>r.d2)return false}
  else if(r.d1||r.d2){/* no dates set for this week: keep it, a day range cannot be applied */}
  return true;
}
const sorted=l=>l.slice().sort((a,b)=>a.wk-b.wk||a.day-b.day||String(a.per).localeCompare(String(b.per)));
const live=()=>sorted(P.sessions.filter(s=>prOf(s)&&cls(s.cls)&&inRange(s)));
function rangeText(){
  const r=P.range,a=[];
  if(r.w1||r.w2)a.push("Weeks "+(r.w1||"first")+" to "+(r.w2||"last"));
  if(r.d1||r.d2)a.push("Dates "+(r.d1?fmtD(r.d1):"start")+" to "+(r.d2?fmtD(r.d2):"end"));
  return a.join("; ")||"All weeks";
}

/* ---------- merged lists ---------- */
function merge(list){
  const h=H(),ap=new Map(),ma=new Map(),sp=new Map();
  list.forEach(s=>{const p=prOf(s),N=groupsOf(s),c=cls(s.cls),tag=c.name+" ("+N+" group"+(N===1?"":"s")+")";
    (p.apparatus||[]).forEach(a=>{const q=h.apCount(a),k=q.name.toLowerCase(),e=ap.get(k)||{name:q.name,n:0,used:[]};e.n+=q.n*N;e.used.push(p.title+", "+tag);ap.set(k,e)});
    (p.materials||[]).forEach(m=>{const q=h.qty(m.amount),k=(m.item||"").toLowerCase(),map=h.SPEC.test(m.item||"")?sp:ma,e=map.get(k)||{name:m.item,parts:{},used:[]};
      if(q)e.parts[q.rest]=(e.parts[q.rest]||0)+q.n*N;else e.parts[m.amount+" × "+N]=NaN;
      e.used.push(p.title+", "+tag);map.set(k,e)});
  });
  const amt=e=>Object.keys(e.parts).map(k=>isNaN(e.parts[k])?k:h.roundQ(e.parts[k])+(k?" "+k:"")).join(" + ");
  const fin=(m,isAp)=>[...m.values()].sort((a,b)=>a.name.localeCompare(b.name)).map(e=>({name:e.name,amt:isAp?String(e.n):amt(e),used:[...new Set(e.used)].join("; ")}));
  return{ap:fin(ap,1),ma:fin(ma),sp:fin(sp)};
}
function weekGroups(list){const m=new Map();list.forEach(s=>{if(!m.has(s.wk))m.set(s.wk,[]);m.get(s.wk).push(s)});return [...m.entries()].sort((a,b)=>a[0]-b[0])}

/* ---------- per-practical block (shared by the page and exports) ---------- */
function blockData(s){
  const h=H(),p=prOf(s),c=cls(s.cls),N=groupsOf(s),I=P.inc,w=wk(s.wk),o={s,p,c,N};
  o.title=`${p.title}`;
  o.meta=[wkName(w),DAYS[s.day]+(dateOf(s)?" "+fmtD(dateOf(s)):""),s.per?("Period "+s.per):"",c.name,N+" group"+(N===1?"":"s"),p.time||"",p.venue?("In: "+p.venue):""].filter(Boolean);
  o.rating=h.rate(p.hazards);
  if(I.ap)o.ap=(p.apparatus||[]).map(a=>{const q=h.apCount(a);return(q.n*N)+" × "+q.name});
  const mats=(p.materials||[]);
  if(I.ma)o.ma=mats.filter(m=>!h.SPEC.test(m.item||"")).map(m=>m.item+": "+h.scaleAmt(m.amount,N));
  if(I.sp)o.sp=mats.filter(m=>h.SPEC.test(m.item||"")).map(m=>m.item+": "+h.scaleAmt(m.amount,N));
  if(I.hz)o.hz=(p.hazards||[]).map(z=>[z.hazard,z.risk,z.control,h.rateOne(z)]);
  if(I.ck){const k=[];if(I.ap||true)k.push(`Collect apparatus for ${N} group${N===1?"":"s"}`);
    if((mats||[]).some(m=>!h.SPEC.test(m.item||"")))k.push("Prepare and label chemicals and solutions");
    if((mats||[]).some(m=>h.SPEC.test(m.item||"")))k.push("Order or collect specimens and living material");
    (p.hazards||[]).filter(z=>h.rateOne(z)==="High").forEach(z=>k.push("Arrange control: "+z.hazard));
    k.push("Print the student sheet and results table");const c2=c.learners?Math.ceil(c.learners):0;if(c2)k.push(`Copies for ${c2} learners`);k.push("Set out the practical and check it works");o.ck=k}
  if(I.mt)o.mt=p.method||[];
  if(I.nt&&s.note)o.nt=s.note;
  return o;
}
function blockHtml(o){
  const h=H(),inl=h.inl,esc=h.esc,ul=a=>`<ul>${a.map(x=>`<li>${inl(x)}</li>`).join("")}</ul>`;
  const sec=(t,b)=>b?`<h4 style="margin:${h.px(10)} 0 ${h.px(4)}">${t}</h4>${b}`:"";
  return `<div class="pr-sec" data-sid="${o.s.id}"><h3>${esc(o.title)} ${h.rpill(o.rating)} ${o.s.done?'<span class="pr-rt Low">✓ done</span>':""}</h3><p class="pr-count">${o.meta.map(esc).join(" · ")}</p>
${o.ap&&o.ap.length?sec("Apparatus",ul(o.ap)):""}${o.ma&&o.ma.length?sec("Chemicals and consumables",ul(o.ma)):""}${o.sp&&o.sp.length?sec("Specimens and living material",ul(o.sp)):""}
${o.hz&&o.hz.length?sec("Safety and hazards",`<ul>${o.hz.map(z=>`<li><b>${inl(z[0])}</b> (${z[3]}): ${inl(z[2])}</li>`).join("")}</ul>`):""}${o.ck?sec("Preparation checklist",`<ul style="list-style:none;padding-left:0">${o.ck.map(x=>`<li>☐ ${inl(x)}</li>`).join("")}</ul>`):""}
${o.mt&&o.mt.length?sec("Method",`<ol>${o.mt.map(x=>`<li>${inl(x)}</li>`).join("")}</ol>`):""}${o.nt?sec("Note",`<p>${esc(o.nt)}</p>`):""}
<div class="pr-ex" style="margin-top:${h.px(8)}"><button class="btn sm" type="button" data-pp="edit" data-id="${o.s.id}">Edit</button><button class="btn sm" type="button" data-pp="done" data-id="${o.s.id}">${o.s.done?"Mark as not done":"Mark as done"}</button></div></div>`;
}

/* ---------- views ---------- */
function setupHtml(){
  const h=H(),esc=h.esc;
  const rec=h.classList().filter(c=>!P.classes.some(x=>x.link===c.id));
  return `<div class="pr-sec"><h3>1. Classes</h3><p class="pr-count">Add every class you teach. Learners and group size set the number of groups for each practical.</p>
<div class="pr-scroll"><table class="pr-t"><thead><tr><th>Class</th><th>Subject</th><th>Learners</th><th>Learners per group</th><th>Groups</th><th></th></tr></thead><tbody>${P.classes.map(c=>`<tr><td>${esc(c.name)}${c.link?" <small>(from class record)</small>":""}</td><td><select data-pp-c="sub" data-id="${c.id}" aria-label="Subject for ${esc(c.name)}">${HUB.subs.map(x=>`<option value="${x}"${x===c.sub?" selected":""}>${esc(h.SN[x]||x)}</option>`).join("")}</select></td><td><input type="number" min="0" max="60" style="width:5em" data-pp-c="learners" data-id="${c.id}" value="${c.learners||0}" aria-label="Learners in ${esc(c.name)}"></td><td><input type="number" min="1" max="10" style="width:5em" data-pp-c="gsize" data-id="${c.id}" value="${c.gsize||2}" aria-label="Learners per group in ${esc(c.name)}"></td><td>${c.learners&&c.gsize?Math.ceil(c.learners/c.gsize):"-"}</td><td><button class="btn sm" type="button" data-pp="delc" data-id="${c.id}">Remove</button></td></tr>`).join("")||'<tr><td colspan="6">No classes yet.</td></tr>'}</tbody></table></div>
<div class="pr-two pr-f" style="margin-top:${h.px(8)}"><div><label for="pp-cn">New class name</label><input id="pp-cn" style="width:100%" placeholder="e.g. IGCSE 2B, AS Level A"></div><div><label for="pp-cs">Subject</label><select id="pp-cs" style="width:100%">${HUB.subs.map(s=>`<option value="${s}">${esc(h.SN[s])}</option>`).join("")}</select></div></div>
<div class="pr-two pr-f"><div><label for="pp-cl">Learners</label><input id="pp-cl" type="number" min="0" max="60" value="24"></div><div><label for="pp-cg">Learners per group</label><input id="pp-cg" type="number" min="1" max="10" value="2"></div></div>
<div class="pr-ex"><button class="btn pri sm" type="button" data-pp="addc">Add class</button></div>
<h4 style="margin:${h.px(14)} 0 ${h.px(4)}">Classes saved in this hub</h4>${h.classList().length?`<div class="pr-scroll"><table class="pr-t"><tbody>${h.classList().map(c=>`<tr><td>${esc(c.name)}</td><td>${c.learners.length} learners</td><td>${P.classes.some(x=>x.link===c.id)?"Added":`<button class="btn sm" type="button" data-pp="impc" data-cid="${esc(c.id)}">Add to planner</button>`}</td></tr>`).join("")}</tbody></table></div>${hubFree().length>1?`<div class="pr-ex"><button class="btn sm" type="button" data-pp="impall">Add all saved classes</button></div>`:""}`:`<p class="pr-count">No classes are saved yet. Add classes in Learner progress or as a quick list in the Class practical record tab.</p>`}</div>
<div class="pr-sec"><h3>2. Weeks</h3><p class="pr-count">Add as many weeks as you need. Enter the date of the Monday so each day gets a date.</p>
<div class="pr-scroll"><table class="pr-t"><thead><tr><th>Week</th><th>Label (optional)</th><th>Monday</th><th></th></tr></thead><tbody>${P.weeks.map(w=>`<tr><td>${w.n}</td><td><input style="width:100%" data-pp-w="label" data-n="${w.n}" value="${esc(w.label)}" placeholder="e.g. Week 10"></td><td><input type="date" data-pp-w="start" data-n="${w.n}" value="${w.start||""}"></td><td><button class="btn sm" type="button" data-pp="delw" data-n="${w.n}">Remove</button></td></tr>`).join("")}</tbody></table></div>
<div class="pr-ex"><button class="btn sm" type="button" data-pp="addw">Add next week</button><button class="btn sm" type="button" data-pp="addw4">Add 4 weeks</button></div></div>`;
}
function cellHtml(wn,c){
  const h=H(),l=sorted(P.sessions.filter(s=>s.wk===wn&&s.cls===c.id&&prOf(s)&&inRange(s)));
  return l.map(s=>{const p=prOf(s);return `<button type="button" class="btn sm" style="display:block;width:100%;text-align:left;margin-bottom:4px;${s.done?"opacity:.7":""}" data-pp="edit" data-id="${s.id}" title="${h.esc(p.title)}">${s.done?"✓ ":""}${h.esc(p.title)}<br><small>${DS[s.day]}${s.per?" P"+h.esc(s.per):""} · ${groupsOf(s)} groups</small></button>`}).join("")+`<button type="button" class="btn sm" data-pp="new" data-wk="${wn}" data-cls="${c.id}">+ Add</button>`;
}
function gridHtml(){
  const h=H();if(!P.classes.length)return`<div class="pr-empty">Add a class first. ${hubFree().length?`<button class="btn pri sm" type="button" data-pp="impall">Add my ${hubFree().length} saved class${hubFree().length===1?"":"es"}</button> `:""}<button class="btn sm" type="button" data-pp="view" data-v="setup">Classes and weeks</button></div>`;
  const ws=P.weeks.filter(w=>(!P.range.w1||w.n>=+P.range.w1)&&(!P.range.w2||w.n<=+P.range.w2));
  return `<div class="pr-scroll"><table class="pr-t"><thead><tr><th>Week</th>${P.classes.map(c=>`<th>${h.esc(c.name)}<br><small>${h.esc(h.SNS[c.sub]||"")}</small></th>`).join("")}</tr></thead><tbody>${ws.map(w=>`<tr><th scope="row">${h.esc(wkName(w))}<br><small>${wkSpan(w)}</small></th>${P.classes.map(c=>`<td>${cellHtml(w.n,c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function listHtml(){
  const h=H(),l=live();
  return `<div class="pr-ex"><button class="btn pri sm" type="button" data-pp="new">+ Add a practical session</button></div><div class="pr-scroll"><table class="pr-t"><thead><tr><th>Week</th><th>Day</th><th>Period</th><th>Class</th><th>Practical</th><th>Groups</th><th>Status</th><th></th></tr></thead><tbody>${l.map(s=>`<tr><td>${s.wk}</td><td>${DS[s.day]}${dateOf(s)?" "+fmtD(dateOf(s)):""}</td><td>${h.esc(s.per||"")}</td><td>${h.esc(cls(s.cls).name)}</td><td>${h.esc(prOf(s).title)}</td><td>${groupsOf(s)}</td><td>${s.done?"Done":"Planned"}</td><td><button class="btn sm" type="button" data-pp="edit" data-id="${s.id}">Edit</button></td></tr>`).join("")||'<tr><td colspan="8">No sessions in this range.</td></tr>'}</tbody></table></div>`;
}
function calHtml(){
  const h=H();let n=+P.calwk||(P.weeks[0]||{}).n;if(!wk(n))n=(P.weeks[0]||{}).n;
  const l=sorted(P.sessions.filter(s=>s.wk===n&&prOf(s)&&cls(s.cls)&&inRange(s))),w=wk(n);
  return `<div class="pr-f"><label for="pp-cw">Week</label> <select id="pp-cw" data-pp-cw>${P.weeks.map(x=>`<option value="${x.n}"${x.n===n?" selected":""}>${h.esc(wkName(x))} ${wkSpan(x)}</option>`).join("")}</select></div>
<div class="pr-scroll"><table class="pr-t"><thead><tr>${DAYS.map((d,i)=>`<th>${d}${w&&w.start?"<br><small>"+fmtD(addDays(w.start,i))+"</small>":""}</th>`).join("")}</tr></thead><tbody><tr>${DAYS.map((_,i)=>`<td style="vertical-align:top">${l.filter(s=>s.day===i).map(s=>`<button type="button" class="btn sm" style="display:block;width:100%;text-align:left;margin-bottom:6px;${s.done?"opacity:.7":""}" data-pp="edit" data-id="${s.id}"><b>${h.esc(cls(s.cls).name)}</b>${s.per?" · P"+h.esc(s.per):""}<br>${h.esc(prOf(s).title)}<br><small>${groupsOf(s)} groups</small></button>`).join("")}<button type="button" class="btn sm" data-pp="new" data-day="${i}" data-wk="${n}">+ Add</button></td>`).join("")}</tr></tbody></table></div>`;
}
function editorHtml(){
  if(!ED)return"";
  const h=H(),esc=h.esc,ps=h.allPracs(),c=cls(ED.cls)||P.classes[0],sub=c?c.sub:HUB.subs[0],list=ps.filter(p=>p.sub===sub);
  return `<div class="pr-sec" id="pp-ed" style="border:2px solid var(--blu,#0a6c74)"><h3>${ED.id?"Edit session":"New session"}</h3>
<div class="pr-two pr-f"><div><label for="pe-c">Class</label><select id="pe-c" data-pp-e="cls" style="width:100%">${P.classes.map(x=>`<option value="${x.id}"${x.id===ED.cls?" selected":""}>${esc(x.name)}</option>`).join("")}${hubFree().length?`<optgroup label="Classes saved in the hub">${hubFree().map(x=>`<option value="hub:${esc(x.id)}">${esc(x.name)} (${x.learners.length})</option>`).join("")}</optgroup>`:""}</select></div>
<div><label for="pe-w">Week</label><select id="pe-w" data-pp-e="wk" style="width:100%">${P.weeks.map(w=>`<option value="${w.n}"${w.n===ED.wk?" selected":""}>${esc(wkName(w))}</option>`).join("")}</select></div></div>
<div class="pr-f"><label for="pe-p">Practical</label><select id="pe-p" data-pp-e="pk" style="width:100%"><option value="">Choose a practical</option>${[sub].concat(HUB.subs.filter(x=>x!==sub)).map(sb=>{const l=ps.filter(p=>p.sub===sb);return l.length?`<optgroup label="${esc(h.SN[sb]||sb)}">${l.map(p=>`<option value="${p.sub}:${esc(p.id)}"${ED.pk===p.sub+":"+p.id?" selected":""}>${esc(p.title)} (${esc(p.time||"")})</option>`).join("")}</optgroup>`:""}).join("")}</select></div>
<div class="pr-two pr-f"><div><label for="pe-d">Day</label><select id="pe-d" data-pp-e="day" style="width:100%">${DAYS.map((d,i)=>`<option value="${i}"${ED.day===i?" selected":""}>${d}</option>`).join("")}</select></div><div><label for="pe-pe">Period or time (optional)</label><input id="pe-pe" data-pp-e="per" value="${esc(ED.per||"")}" placeholder="e.g. 3-4 or 10:20" style="width:100%"></div></div>
<div class="pr-two pr-f"><div><label for="pe-g">Groups (leave empty to use the class size)</label><input id="pe-g" type="number" min="1" max="40" data-pp-e="groups" value="${ED.groups||""}" placeholder="${c&&c.learners&&c.gsize?Math.ceil(c.learners/c.gsize):8}"></div><div><label for="pe-n">Note</label><input id="pe-n" data-pp-e="note" value="${esc(ED.note||"")}" style="width:100%"></div></div>
<label class="pr-pick" style="display:block"><input type="checkbox" data-pp-e="done"${ED.done?" checked":""}> This practical has been done</label>
<div class="pr-ex"><button class="btn pri sm" type="button" data-pp="saveed">Save session</button><button class="btn sm" type="button" data-pp="canceled">Cancel</button>${ED.id?`<button class="btn sm" type="button" data-pp="deled">Delete session</button>`:""}${ED.id?`<button class="btn sm" type="button" data-pp="dup">Copy to the next week</button>`:""}</div></div>`;
}
function optionsHtml(){
  const h=H(),r=P.range;
  return `<div class="pr-sec"><h3>3. What to show for each practical</h3><p class="pr-count">Tick what each practical block and the Word or PDF planner must include.</p><div class="pr-pick">${INC.map(i=>`<label><input type="checkbox" data-pp-i="${i[0]}"${P.inc[i[0]]?" checked":""}><span>${i[1]}</span></label>`).join("")}</div></div>
<div class="pr-sec"><h3>4. Show and export which weeks or days?</h3><p class="pr-count">Leave blank for everything. A day range only applies to weeks that have a Monday date.</p>
<div class="pr-two pr-f"><div><label for="pr-w1">From week</label><select id="pr-w1" data-pp-r="w1"><option value="">First</option>${P.weeks.map(w=>`<option value="${w.n}"${+r.w1===w.n?" selected":""}>${w.n}</option>`).join("")}</select></div><div><label for="pr-w2">To week</label><select id="pr-w2" data-pp-r="w2"><option value="">Last</option>${P.weeks.map(w=>`<option value="${w.n}"${+r.w2===w.n?" selected":""}>${w.n}</option>`).join("")}</select></div></div>
<div class="pr-two pr-f"><div><label for="pr-d1">From date</label><input id="pr-d1" type="date" data-pp-r="d1" value="${r.d1||""}"></div><div><label for="pr-d2">To date</label><input id="pr-d2" type="date" data-pp-r="d2" value="${r.d2||""}"></div></div><p class="pr-count">Showing: <b>${h.esc(rangeText())}</b> · ${live().length} session${live().length===1?"":"s"}</p></div>`;
}
function exportHtml(){
  const b=(k,t)=>`<div class="pr-ex"><b>${t}</b><button class="btn sm" type="button" data-pp="x" data-k="${k}" data-f="docx">Word</button><button class="btn sm" type="button" data-pp="x" data-k="${k}" data-f="pdf">PDF</button><button class="btn sm" type="button" data-pp="x" data-k="${k}" data-f="print">Print</button></div>`;
  return `<div class="pr-sec"><h3>5. Export</h3><p class="pr-count">Exports use the weeks or dates chosen above.</p>
${b("plan","Practical planner")}${b("tech","Technician prep pack, one section per week")}${b("term","Summary of practicals run per class and week")}${b("crep","Class practical report (marks from the class practical record)")}
<div class="pr-ex"><b>Spreadsheet (CSV)</b><button class="btn sm" type="button" data-pp="x" data-k="csv" data-f="csv">Download CSV</button></div><div class="pr-msg" id="pp-msg" role="status">${MSG}</div></div>`;
}
function html(){
  load();const h=H();
  const l=live(),views=[["grid","Grid by class"],["list","List"],["cal","Calendar by day"]];
  const blocks=weekGroups(l).map(([n,ss])=>`<h3 style="margin:${h.px(16)} 0 ${h.px(6)}">${h.esc(wkName(wk(n)))} <small>${wkSpan(wk(n))}</small></h3>${ss.map(s=>blockHtml(blockData(s))).join("")}`).join("");
  return `<div class="pr-sec"><h3>Practical planner</h3><p class="pr-count">Plan practicals across many weeks and classes. Each practical gets its own block with its lists below the planner.</p>
<div class="pr-main" role="tablist" style="margin-bottom:${h.px(10)}">${views.map(v=>`<button role="tab" type="button" data-pp="view" data-v="${v[0]}" aria-selected="${P.view===v[0]}">${v[1]}</button>`).join("")}<button role="tab" type="button" data-pp="view" data-v="setup" aria-selected="${P.view==="setup"}">Classes and weeks</button></div>
<div id="pp-view">${P.view==="setup"?setupHtml():P.view==="list"?listHtml():P.view==="cal"?calHtml():gridHtml()}</div></div>${editorHtml()}${P.view==="setup"?"":""}${optionsHtml()}${exportHtml()}
<div class="pr-sec"><h3>Each practical, in detail</h3>${l.length?"":'<div class="pr-empty">No practicals in the planner yet. Use + Add in the grid or list.</div>'}${blocks}</div>`;
}

/* ---------- exports ---------- */
function plannerModel(){
  const h=H(),l=live(),b=[{t:"kv",pairs:[["Range",rangeText()],["Sessions",String(l.length)],["Classes",P.classes.map(c=>c.name).join("; ")]]}];
  weekGroups(l).forEach(([n,ss])=>{
    b.push({t:"h",l:2,text:wkName(wk(n))+(wkSpan(wk(n))?" ("+wkSpan(wk(n))+")":"")});
    b.push({t:"table",head:["Day","Period","Class","Practical","Groups","Status"],rows:ss.map(s=>[DS[s.day]+(dateOf(s)?" "+fmtD(dateOf(s)):""),s.per||"",cls(s.cls).name,prOf(s).title,String(groupsOf(s)),s.done?"Done":"Planned"]),widths:[16,10,18,36,9,11],fontSize:10});
    ss.forEach(s=>{const o=blockData(s);b.push({t:"h",l:3,text:o.title+" - "+o.c.name+", "+DS[s.day]});b.push({t:"p",text:o.meta.join("  |  "),size:10,color:"555555"});
      if(o.ap&&o.ap.length)b.push({t:"p",text:"Apparatus",bold:true},{t:"ul",items:o.ap});
      if(o.ma&&o.ma.length)b.push({t:"p",text:"Chemicals and consumables",bold:true},{t:"ul",items:o.ma});
      if(o.sp&&o.sp.length)b.push({t:"p",text:"Specimens and living material",bold:true},{t:"ul",items:o.sp});
      if(o.hz&&o.hz.length)b.push({t:"p",text:"Safety and hazards ("+o.rating+")",bold:true},{t:"table",head:["Hazard","Risk","Control"],rows:o.hz.map(z=>[z[0],z[1],z[2]]),widths:[28,32,40],fontSize:9});
      if(o.ck)b.push({t:"p",text:"Preparation checklist",bold:true},{t:"ul",items:o.ck.map(x=>"☐ "+x)});
      if(o.mt&&o.mt.length)b.push({t:"p",text:"Method",bold:true},{t:"ol",items:o.mt});
      if(o.nt)b.push({t:"p",text:"Note: "+o.nt});
    });
  });
  b.push({t:"sig",labels:["Teacher","Technician"]});
  return{title:"Practical planner",subtitle:rangeText(),orientation:"portrait",footer:"Cambridge Learning Hub - practical planner",blocks:b};
}
function techModel(){
  const h=H(),l=live(),b=[];
  weekGroups(l).forEach(([n,ss],i)=>{
    const M=merge(ss),w=wk(n);
    b.push({t:"h",l:2,text:wkName(w)+(wkSpan(w)?" ("+wkSpan(w)+")":"")});
    b.push({t:"table",head:["Day","Class","Practical","Groups"],rows:ss.map(s=>[DS[s.day]+(s.per?" P"+s.per:""),cls(s.cls).name,prOf(s).title,String(groupsOf(s))]),widths:[18,22,48,12],fontSize:10});
    if(M.ap.length)b.push({t:"h",l:3,text:"Apparatus"},{t:"table",head:["Item","Total","Used in"],rows:M.ap.map(e=>[e.name,e.amt,e.used]),widths:[34,10,56],fontSize:9.5});
    if(M.ma.length)b.push({t:"h",l:3,text:"Chemicals and consumables"},{t:"table",head:["Item","Total","Used in"],rows:M.ma.map(e=>[e.name,e.amt,e.used]),widths:[32,24,44],fontSize:9.5});
    if(M.sp.length)b.push({t:"h",l:3,text:"Specimens and living material"},{t:"table",head:["Item","Total","Used in"],rows:M.sp.map(e=>[e.name,e.amt,e.used]),widths:[32,24,44],fontSize:9.5});
    const sf=ss.map(s=>{const p=prOf(s);return{s,p,r:h.rate(p.hazards)}}).sort((a,c)=>["High","Medium","Low"].indexOf(a.r)-["High","Medium","Low"].indexOf(c.r));
    b.push({t:"h",l:3,text:"Safety"},{t:"table",head:["Practical","Rating","Main hazards and controls"],rows:sf.map(x=>[x.p.title,x.r,(x.p.hazards||[]).filter(z=>h.rateOne(z)!=="Low").map(z=>z.hazard+": "+z.control).join("\n")||"Low-level hazards only."]),widths:[28,12,60],fontSize:9,tone:sf.map((x,i)=>[i,x.r==="High"?"bad":x.r==="Medium"?"warn":"good"])});
    b.push({t:"sig",labels:["Teacher","Technician"]});
  });
  if(!b.length)b.push({t:"p",text:"No practicals in this range."});
  return{title:"Technician prep pack",subtitle:rangeText(),orientation:"portrait",footer:"Cambridge Learning Hub - technician prep pack",blocks:b};
}
function termModel(){
  const h=H(),l=live(),b=[];
  const done=l.filter(s=>s.done).length,mins=l.reduce((a,s)=>a+h.minsOf(prOf(s)),0),sk={};
  l.forEach(s=>(prOf(s).skills||[]).forEach(k=>{sk[k]=(sk[k]||0)+1}));
  b.push({t:"kv",pairs:[["Range",rangeText()],["Practicals scheduled",String(l.length)],["Marked as done",done+" ("+(l.length?Math.round(done/l.length*100):0)+"%)"],["Planned practical time",Math.floor(mins/60)+" h "+(mins%60)+" min"],["Classes",String(new Set(l.map(s=>s.cls)).size)]]});
  b.push({t:"h",l:2,text:"By class"},{t:"table",head:["Class","Subject","Scheduled","Done","Not yet done","Practicals"],rows:P.classes.map(c=>{const m=l.filter(s=>s.cls===c.id);return[c.name,h.SN[c.sub]||c.sub,String(m.length),String(m.filter(s=>s.done).length),String(m.filter(s=>!s.done).length),[...new Set(m.map(s=>prOf(s).title))].join("; ")]}).filter(r=>+r[2]>0),widths:[16,14,10,8,10,42],fontSize:9.5});
  b.push({t:"h",l:2,text:"By week"},{t:"table",head:["Week","Dates","Sessions","Done","Practicals (class)"],rows:weekGroups(l).map(([n,ss])=>[wkName(wk(n)),wkSpan(wk(n)),String(ss.length),String(ss.filter(s=>s.done).length),ss.map(s=>prOf(s).title+" ("+cls(s.cls).name+")").join("; ")]),widths:[16,16,9,8,51],fontSize:9.5});
  if(Object.keys(sk).length)b.push({t:"h",l:2,text:"Practical skills covered"},{t:"table",head:["Skill","Sessions"],rows:Object.entries(sk).sort((a,c)=>c[1]-a[1]).map(e=>[e[0],String(e[1])]),widths:[70,30],fontSize:10});
  const notDone=l.filter(s=>!s.done);
  if(notDone.length)b.push({t:"h",l:2,text:"Still to do"},{t:"table",head:["Week","Class","Practical"],rows:notDone.map(s=>[String(s.wk),cls(s.cls).name,prOf(s).title]),widths:[12,24,64],fontSize:9.5});
  return{title:"Practical summary",subtitle:rangeText(),orientation:"portrait",footer:"Cambridge Learning Hub - practical summary",blocks:b};
}
function crepModel(){
  const h=H(),st=h.recStore(),all=h.classList(),b=[];
  const linked=P.classes.map(c=>c.link).filter(Boolean);
  const use=(linked.length?all.filter(c=>linked.includes(c.id)):all);
  const inD=d=>{const r=P.range;if(!d)return true;return !(r.d1&&d<r.d1)&&!(r.d2&&d>r.d2)};
  let any=false;
  use.forEach(cl=>{
    const recs=Object.entries(st.records).filter(([k])=>k.startsWith(cl.id+"|")).map(([k,r])=>{const pk=k.slice(cl.id.length+1),i=pk.indexOf(":");return{p:h.findP(pk.slice(0,i),pk.slice(i+1)),r}}).filter(x=>x.p&&inD(x.r.date)).sort((a,c)=>String(a.r.date).localeCompare(String(c.r.date)));
    if(!recs.length)return;any=true;
    b.push({t:"h",l:2,text:cl.name+" ("+cl.learners.length+" learners)"});
    const rows=recs.map(x=>{const s=h.classStats(cl,x.r);return[x.r.date||"",x.p.title,s.avg==null?"-":s.avg+"%",String(s.count)+"/"+cl.learners.length,s.per.filter(q=>q.m!=null).map(q=>q.n+" "+h.fmt(q.m)).join(", ")||"-"]});
    b.push({t:"table",head:["Date","Practical","Class average","Learners scored","Skill means (out of 4)"],rows,widths:[13,30,13,13,31],fontSize:9.5});
    const sup=new Map();recs.forEach(x=>h.classStats(cl,x.r).sup.forEach(u=>{const e=sup.get(u.name)||{n:u.name,w:new Set(),min:100};u.weak.forEach(w=>e.w.add(w));e.min=Math.min(e.min,u.pct);sup.set(u.name,e)}));
    if(sup.size)b.push({t:"p",text:"Learners who may need support",bold:true},{t:"table",head:["Learner","Lowest score","Weak skills"],rows:[...sup.values()].map(e=>[e.n,e.min+"%",[...e.w].join(", ")||"-"]),widths:[40,20,40],fontSize:9.5});
    const sched=P.sessions.filter(s=>(cls(s.cls)||{}).link===cl.id&&prOf(s)&&inRange(s));
    const missing=sched.filter(s=>!recs.some(x=>x.p.sub+":"+x.p.id===s.pk));
    if(missing.length)b.push({t:"p",text:"Planned but no marks recorded yet",bold:true},{t:"ul",items:missing.map(s=>"Week "+s.wk+": "+prOf(s).title)});
  });
  if(!any)b.push({t:"p",text:"No class practical records were found for this range. Record learner scores in the Class practical record tab first."});
  return{title:"Class practical report",subtitle:rangeText(),orientation:"portrait",footer:"Cambridge Learning Hub - class practical report",blocks:b};
}
function csv(){
  const h=H(),q=v=>'"'+String(v==null?"":v).replace(/"/g,'""')+'"',rows=[["Week","Week label","Week starts","Day","Date","Period","Class","Subject","Learners","Groups","Practical","Topic","Duration","Safety rating","Status","Note"]];
  live().forEach(s=>{const p=prOf(s),c=cls(s.cls),w=wk(s.wk),u=(typeof SUBJ!=="undefined"&&SUBJ[p.sub]&&SUBJ[p.sub].units.find(x=>x.n===p.unit));
    rows.push([s.wk,w.label||"",w.start||"",DAYS[s.day],dateOf(s),s.per||"",c.name,h.SN[p.sub]||p.sub,c.learners||"",groupsOf(s),p.title,u?("Topic "+u.n+": "+u.name):"",p.time||"",h.rate(p.hazards),s.done?"Done":"Planned",s.note||""])});
  return "﻿"+rows.map(r=>r.map(q).join(",")).join("\r\n");
}

/* ---------- events ---------- */
async function handle(e,kind,root,env,redraw){
  if(!root.querySelector("#pp-view"))return false;
  load();const h=H(),T=e.target;
  const say=m=>{MSG=m;const x=root.querySelector("#pp-msg");if(x)x.textContent=m};
  if(kind==="click"){
    const t=T.closest("[data-pp]");if(!t)return false;const a=t.dataset.pp,id=t.dataset.id;
    if(a==="view"){P.view=t.dataset.v;save();redraw()}
    else if(a==="addc"){const n=root.querySelector("#pp-cn").value.trim();if(!n){say("Type a class name first.");return true}
      P.classes.push({id:uid(),name:n.slice(0,40),sub:root.querySelector("#pp-cs").value,learners:+root.querySelector("#pp-cl").value||0,gsize:+root.querySelector("#pp-cg").value||2});save();redraw()}
    else if(a==="impc"){const c=h.classList().find(x=>x.id===t.dataset.cid);if(c){addHub(c);save();redraw()}}
    else if(a==="impall"){hubFree().forEach(addHub);save();redraw()}
    else if(a==="delc"){if(confirm("Remove this class and its planned practicals?")){P.classes=P.classes.filter(c=>c.id!==id);P.sessions=P.sessions.filter(s=>s.cls!==id);save();redraw()}}
    else if(a==="addw"||a==="addw4"){const k=a==="addw4"?4:1;for(let i=0;i<k;i++){const last=P.weeks[P.weeks.length-1];P.weeks.push({n:last?last.n+1:1,label:"",start:last&&last.start?addDays(last.start,7):""})}save();redraw()}
    else if(a==="delw"){const n=+t.dataset.n;if(confirm("Remove week "+n+" and its planned practicals?")){P.weeks=P.weeks.filter(w=>w.n!==n);P.sessions=P.sessions.filter(s=>s.wk!==n);if(!P.weeks.length)P.weeks.push({n:1,label:"",start:""});save();redraw()}}
    else if(a==="new"){if(!P.classes.length&&hubFree().length)addHub(hubFree()[0]);if(!P.classes.length){P.view="setup";MSG="";redraw();return true}
      ED={id:"",cls:t.dataset.cls||P.classes[0].id,wk:+t.dataset.wk||(P.weeks[0]||{}).n,pk:"",day:+t.dataset.day||0,per:"",groups:"",note:"",done:0};redraw();setTimeout(()=>{const x=root.querySelector("#pp-ed");if(x)x.scrollIntoView({behavior:"smooth",block:"center"})},50)}
    else if(a==="edit"){const s=P.sessions.find(x=>x.id===id);if(s){ED=Object.assign({},s);redraw();setTimeout(()=>{const x=root.querySelector("#pp-ed");if(x)x.scrollIntoView({behavior:"smooth",block:"center"})},50)}}
    else if(a==="done"){const s=P.sessions.find(x=>x.id===id);if(s){s.done=s.done?0:1;save();redraw()}}
    else if(a==="saveed"){if(!ED.pk){say("Choose a practical first.");const x=root.querySelector("#pe-p");if(x)x.focus();return true}
      const o={id:ED.id||uid(),wk:+ED.wk,day:+ED.day,per:ED.per||"",cls:ED.cls,pk:ED.pk,groups:+ED.groups||0,done:ED.done?1:0,note:ED.note||""};
      const i=P.sessions.findIndex(x=>x.id===o.id);if(i>=0)P.sessions[i]=o;else P.sessions.push(o);ED=null;save();redraw()}
    else if(a==="canceled"){ED=null;redraw()}
    else if(a==="deled"){if(confirm("Delete this session?")){P.sessions=P.sessions.filter(s=>s.id!==ED.id);ED=null;save();redraw()}}
    else if(a==="dup"){const n=(P.weeks.find(w=>w.n>ED.wk)||{}).n;if(!n){say("Add a next week first.");return true}
      P.sessions.push(Object.assign({},ED,{id:uid(),wk:n,done:0}));ED=null;save();redraw()}
    else if(a==="x"){
      const k=t.dataset.k,f=t.dataset.f;
      if(!live().length&&k!=="crep"){say("Add at least one practical in the range first.");return true}
      if(k==="csv"){const r=await env.saveFile("practical-planner.csv",new Blob([csv()],{type:"text/csv"}));say(r==="saved"||r===true?"CSV saved.":r==="declined"?"":"Could not save the file.");return true}
      const m={plan:plannerModel,tech:techModel,term:termModel,crep:crepModel}[k]();
      await h.outModel(env,m,f,{plan:"practical-planner",tech:"technician-prep-pack",term:"practical-summary",crep:"class-practical-report"}[k],say);
    }
    else return false;
    return true;
  }
  if(kind==="change"){
    if(T.dataset.ppC){const c=cls(T.dataset.id);if(c){if(T.dataset.ppC==="sub")c.sub=T.value;else{c[T.dataset.ppC]=Math.max(0,+T.value||0);if(T.dataset.ppC==="gsize")c.gsize=Math.max(1,c.gsize)}save();redraw()}return true}
    if(T.dataset.ppW){const w=wk(+T.dataset.n);if(w){w[T.dataset.ppW]=T.value;save();redraw()}return true}
    if(T.dataset.ppI){P.inc[T.dataset.ppI]=T.checked?1:0;save();redraw();return true}
    if(T.dataset.ppR){P.range[T.dataset.ppR]=T.value;save();redraw();return true}
    if(T.dataset.ppCw!==undefined){P.calwk=+T.value;save();redraw();return true}
    if(T.dataset.ppE){const k=T.dataset.ppE;ED[k]=k==="done"?T.checked:(k==="wk"||k==="day")?+T.value:T.value;if(k==="cls"){if(String(ED.cls).startsWith("hub:")){const c=h.classList().find(x=>x.id===ED.cls.slice(4));if(c){ED.cls=addHub(c).id;save()}}redraw()}return true}
  }
  if(kind==="input"&&T.dataset.ppE){const k=T.dataset.ppE;if(k==="per"||k==="note"||k==="groups")ED[k]=T.value;return true}
  return false;
}
window.PRACPLAN={html,handle};
})();
