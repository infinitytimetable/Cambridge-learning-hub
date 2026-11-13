/* ================= Settings, save folder, back up and timers (v1.2) ================= */
(function(){
const $=(s,r)=> (r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const KEY="hubset",VER="1.3";
const DEF={
  folders:{plans:"Lesson plans",assess:"Assessments",packs:"Study packs",overviews:"Curriculum overviews",pptx:"PowerPoints",progress:"Learner reports",practicals:"Practicals",backups:"Backups",other:"Other exports"},
  teacher:{name:"",school:"Lusaka Oaktree School",year:"2026-2027",classes:""},
  lesson:{maxInline:6,gallery:true,notes:true,hide:[],start:"engage"},
  timer:{show:true,period:40,share:{engage:10,explain:45,practise:25,play:10,reflect:10},beep:true,warn:1,auto:false,pos:"br",hidden:false},
  ui:{clock:true,h24:true,date:true},
  backup:{auto:true,remind:7,last:0},
  assess:{logo:"",dept:"Science Department",coverTitle:"Cambridge Secondary Summative Assessment",crest:true,centre:"",series:"",compMcq:"Paper 1",compStruct:"Paper 2",sheet:true,letters:4,ptDefault:false,calc:true,instrMcq:"",instrStruct:"",defs:{bi:{marks:25,mins:40},form:{marks:40,mcq:10,mins:60},sum:{marks:100,mcq:40,mins:120}},avoid:true},
  games:{pairs:6,hint:true},
  exam:{open:false},
  ibl:{notes:true,roles:"Manager, Recorder, Technician, Reporter"},
  learner:{name:"",greet:true},
  ptimer:{show:true,mode:"ask",mpm:1.2,beep:true}
};
const clone=o=>JSON.parse(JSON.stringify(o));
function merge(a,b){for(const k in b){if(b[k]&&typeof b[k]==="object"&&!Array.isArray(b[k])){a[k]=merge(a[k]&&typeof a[k]==="object"?a[k]:{},b[k])}else a[k]=b[k]}return a}
let SET=clone(DEF);
try{const r=localStorage.getItem(KEY);if(r)merge(SET,JSON.parse(r))}catch(e){}
if(SET.timer.share&&SET.timer.share.explore!=null){SET.timer.share.explain=(+SET.timer.share.explain||0)+(+SET.timer.share.explore||0);delete SET.timer.share.explore}
if(SET.lesson&&SET.lesson.start==="explore")SET.lesson.start="explain";if(SET.lesson&&SET.lesson.hide)SET.lesson.hide=SET.lesson.hide.filter(x=>x!=="explore");
function persist(){try{localStorage.setItem(KEY,JSON.stringify(SET))}catch(e){}}
window.HUBSET={get:()=>SET,save:persist,def:DEF};
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
function toast(msg,btn,ms){
  let t=$("#hstoast");if(t)t.remove();
  t=document.createElement("div");t.id="hstoast";t.className="hstoast";t.setAttribute("role","status");
  t.innerHTML=`<span>${esc(msg)}</span>`+(btn?`<button class="btn pri" type="button">${esc(btn.t)}</button>`:"")+`<button class="btn" type="button" data-x aria-label="Close">✕</button>`;
  document.body.appendChild(t);
  if(btn)$(".pri",t).onclick=()=>{btn.f();t.remove()};
  $("[data-x]",t).onclick=()=>t.remove();
  if(ms!==0)setTimeout(()=>{if(t.isConnected)t.remove()},ms||6000);
}
/* ---------- IndexedDB: remember the chosen save folder ---------- */
function idb(){return new Promise((res,rej)=>{const r=indexedDB.open("lotshub",1);r.onupgradeneeded=()=>r.result.createObjectStore("kv");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function kvGet(k){try{const d=await idb();return await new Promise((res,rej)=>{const q=d.transaction("kv").objectStore("kv").get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}catch(e){return null}}
async function kvSet(k,v){try{const d=await idb();return await new Promise((res,rej)=>{const q=d.transaction("kv","readwrite").objectStore("kv").put(v,k);q.onsuccess=()=>res();q.onerror=()=>rej(q.error)})}catch(e){}}
let DIR=null,PERM="none";   // none | prompt | granted
const CAN=typeof window.showDirectoryPicker==="function";
async function checkPerm(ask){
  if(!DIR)DIR=await kvGet("saveDir");
  if(!DIR){PERM="none";return PERM}
  try{let p=await DIR.queryPermission({mode:"readwrite"});if(p!=="granted"&&ask)p=await DIR.requestPermission({mode:"readwrite"});PERM=p==="granted"?"granted":"prompt"}catch(e){PERM="prompt"}
  return PERM;
}
async function chooseFolder(){
  if(!CAN){toast("This browser cannot choose a save folder. Use Google Chrome or Microsoft Edge.");return false}
  try{const h=await window.showDirectoryPicker({id:"lotshub",mode:"readwrite",startIn:"documents"});DIR=h;await kvSet("saveDir",h);PERM="granted";await makeFolders();return true}
  catch(e){if(e&&e.name!=="AbortError")toast("Could not use that folder: "+e.message);return false}
}
const SAFE=n=>String(n).replace(/[\\/:*?"<>|]+/g," ").trim()||"Folder";
async function sub(key){const name=SAFE(SET.folders[key]||DEF.folders[key]||"Other exports");return DIR.getDirectoryHandle(name,{create:true})}
async function makeFolders(){
  if(!DIR||await checkPerm(true)!=="granted")return 0;
  let n=0;for(const k of Object.keys(DEF.folders)){try{await sub(k);n++}catch(e){}}return n;
}
function classify(name){
  const h=(location.hash||"").toLowerCase(),n=String(name).toLowerCase();
  if(/backup/.test(n))return "backups";
  if(/plan/.test(h)||/lesson-plan|lessonplan/.test(n))return "plans";
  if(/assess/.test(h)||/assess|paper|test|mark-scheme|worksheet/.test(n))return "assess";
  if(/studypack|study-pack/.test(h)||/study.?pack/.test(n))return "packs";
  if(/overview/.test(h)||/overview|curriculum/.test(n))return "overviews";
  if(/progress/.test(h)||/progress|report/.test(n))return "progress";
  if(/practical/.test(h)||/practical/.test(n))return "practicals";
  if(/\.pptx$/.test(n))return "pptx";
  return "other";
}
async function writeFile(key,name,data,pick){
  if(!DIR||await checkPerm(false)!=="granted")return false;
  try{
    const d=await sub(key);const fh=await d.getFileHandle(SAFE(name).replace(/ {2,}/g," "),{create:true});
    const w=await fh.createWritable();await w.write(data instanceof Blob?data:new Blob([data]));await w.close();return SAFE(SET.folders[key]);
  }catch(e){console.error(e);return false}
}
window.HUBSAVE={
  async save(name,data){
    if(!DIR)DIR=await kvGet("saveDir");
    if(!DIR)return false;
    if(await checkPerm(false)!=="granted"){toast("Your save folder needs permission again, so this file went to Downloads.",{t:"Reconnect folder",f:()=>reconnect()},9000);return false}
    const key=classify(name),r=await writeFile(key,name,data);
    if(r)toast("Saved to "+(DIR.name||"save folder")+" › "+r+" › "+name);
    return !!r;
  }
};
async function reconnect(){const p=await checkPerm(true);if(p==="granted"){toast("Save folder connected.");render()}else toast("Permission was not given. Press Reconnect and choose Allow.")}
/* ---------- Back up and restore ---------- */
function snapshot(){
  const local={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);local[k]=localStorage.getItem(k)}}catch(e){}
  let content=[];try{content=((window.LOTS_CONTENT&&LOTS_CONTENT.files)||[]).map(f=>f.rel)}catch(e){}
  return {format:"lots-hub-backup",version:1,app:VER,created:new Date().toISOString(),note:"Progress, quiz scores, notes, settings, lesson plans and assessments. Large content files are not copied: only their names are listed.",local,contentFiles:content};
}
function stamp(){const d=new Date(),p=n=>String(n).padStart(2,"0");return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+"_"+p(d.getHours())+p(d.getMinutes())}
let lastHash="";
function hashOf(){try{const s=JSON.stringify(snapshot().local);let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return String(h)+":"+s.length}catch(e){return ""}}
async function backupNow(kind){
  const snap=snapshot(),json=JSON.stringify(snap),name="LOTS-Hub-Backup-"+stamp()+".json";
  let where="";
  if(DIR&&await checkPerm(false)==="granted"){
    const r=await writeFile("backups",name,json);
    if(r){await writeFile("backups","LOTS-Hub-Backup-latest.json",json);where=(DIR.name||"save folder")+" › "+r;await prune()}
  }
  if(!where){
    if(kind==="auto")return false;
    const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([json],{type:"application/json"}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{a.remove();URL.revokeObjectURL(a.href)},1500);where="your Downloads folder";
  }
  SET.backup.last=Date.now();persist();lastHash=hashOf();
  if(kind!=="auto")toast("Backed up to "+where+".");
  return where;
}
async function prune(){
  try{const d=await sub("backups"),list=[];for await(const [n,h] of d.entries()){if(/^LOTS-Hub-Backup-\d{4}-/.test(n))list.push(n)}list.sort();while(list.length>20)await d.removeEntry(list.shift())}catch(e){}
}
function restoreFile(file){
  const r=new FileReader();
  r.onload=()=>{
    try{
      const o=JSON.parse(r.result);if(o.format!=="lots-hub-backup"||!o.local)throw new Error("This is not a LOTS Hub backup file.");
      const n=Object.keys(o.local).length;
      if(!confirm("Restore this backup from "+new Date(o.created).toLocaleString()+"?\n\nIt replaces the progress, notes, plans and settings now in this hub ("+n+" items). Back up first if you are not sure."))return;
      for(const k in o.local)try{localStorage.setItem(k,o.local[k])}catch(e){}
      toast("Backup restored. The hub will reload.",null,2500);setTimeout(()=>location.reload(),1200);
    }catch(e){alert("Could not restore: "+e.message)}
  };
  r.readAsText(file);
}
/* ---------- Settings page ---------- */
const STG=[["engage","Engage"],["explain","Explore & Explain"],["practise","Practise"],["play","Play"],["reflect","Reflect"]];
function ago(t){if(!t)return "never";const m=Math.round((Date.now()-t)/60000);if(m<2)return "just now";if(m<90)return m+" minutes ago";const h=Math.round(m/60);if(h<36)return h+" hours ago";return Math.round(h/24)+" days ago"}
function stageMins(k){return Math.max(1,Math.round(SET.timer.period*(SET.timer.share[k]||0)/100))}
let OV=null;
function openSettings(){if(OV){OV.remove();OV=null;return}
  OV=document.createElement("div");OV.id="setov";OV.className="setov";OV.setAttribute("role","dialog");OV.setAttribute("aria-label","Settings");document.body.appendChild(OV);render()}
function closeSettings(){if(OV){OV.remove();OV=null}}
async function render(){
  if(!OV)return;
  await checkPerm(false);
  const T=SET.teacher,L=SET.lesson,M=SET.timer,B=SET.backup,A=SET.assess;
  const dsp=typeof DSP!=="undefined"?DSP:null;
  const folderStatus=!CAN?`<p class="set-warn">This browser cannot save into a chosen folder. Open the hub with Google Chrome or Microsoft Edge to use this.</p>`
   :PERM==="granted"?`<p class="set-ok">✓ Saving into: <b>${esc(DIR.name)}</b></p>`
   :PERM==="prompt"?`<p class="set-warn">Folder chosen (<b>${esc(DIR&&DIR.name)}</b>) but the browser needs your permission again. <button class="btn pri" type="button" id="sreconn">Reconnect folder</button></p>`
   :`<p class="meta">No folder chosen yet. Until you choose one, exports go to your Downloads folder.</p>`;
  OV.innerHTML=`<div class="set-wrap">
<div class="set-top"><h1>Settings</h1><span class="set-actions"><button class="btn pri" type="button" id="ssave">Save settings</button><button class="btn" type="button" id="sbk">Back up now</button><button class="btn" type="button" id="sclose">Close</button></span></div>
<p class="meta">Everything you change is kept straight away on this computer. <b>Save settings</b> confirms it and also writes a copy to your Backups folder.</p>

<section class="set-card"><h2>1. Save folder and export folders</h2>
<p>Choose one folder (for example <i>Documents\\LOTS Hub Exports</i>). The hub then saves exported lesson plans, assessments, study packs and so on into the matching sub-folder, and creates the sub-folders itself.</p>
${folderStatus}
<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri" type="button" id="schoose">${DIR?"Change save folder":"Choose save folder"}</button><button class="btn" type="button" id="smk" ${PERM==="granted"?"":"disabled"}>Create the sub-folders now</button></div>
<h3>Sub-folder names</h3><div class="set-grid">${Object.keys(DEF.folders).map(k=>`<label>${({plans:"Lesson plans",assess:"Assessments and papers",packs:"Study packs",overviews:"Curriculum overviews",pptx:"PowerPoint lessons",progress:"Learner reports",practicals:"Practicals",backups:"Back-ups",other:"Anything else"})[k]}<input type="text" data-fold="${k}" value="${esc(SET.folders[k])}"></label>`).join("")}</div>
<p class="meta">Printing to PDF uses the print window of your browser and is not saved automatically.</p></section>

<section class="set-card"><h2>2. Back up and restore</h2>
<p>A back-up holds your learner progress, quiz scores, inquiry notes, lesson plans, assessments and these settings. It lists the names of your Papers, Notes and Images but does not copy those large files.</p>
<p class="meta">Last back-up: <b>${ago(B.last)}</b></p>
<div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri" type="button" id="sbk2">Back up now</button><label class="btn" style="cursor:pointer">Restore from a back-up file…<input type="file" id="srest" accept=".json,application/json" hidden></label></div>
<div class="set-grid"><label class="set-chk"><input type="checkbox" id="sauto" ${B.auto?"checked":""}> Back up automatically when I close or leave the hub, and every 5 minutes while it is open</label>
<label>Remind me to back up every <input type="number" id="srem" min="0" max="60" value="${B.remind}" style="width:5em"> days (0 = never)</label></div>
<p class="meta">Automatic back-ups need the save folder above. Browsers can end a closing page quickly, so the 5-minute back-up is the safety net.</p></section>

<section class="set-card"><h2>3. Display, theme and fonts</h2>
${dsp?`<h3>Text size</h3><div class="row" style="gap:8px;flex-wrap:wrap">${PRESETS.map(p=>`<button class="chip" type="button" data-fs="${p[1]}" aria-pressed="${Math.abs(dsp.fs-p[1])<.01}">${p[0]}</button>`).join("")}</div>
<h3>Font for ${esc((window.hubSub&&hubSub().title)||"this subject")}</h3><p class="meta" style="margin:0 0 6px">Each subject remembers its own font.</p><div class="row" style="gap:8px;flex-wrap:wrap">${FONTS.map(f=>`<button class="chip" type="button" data-font="${f[0]}" aria-pressed="${((dsp.fonts&&dsp.fonts[hubKey()])||dsp.font)===f[0]}">${f[1]}</button>`).join("")}<button class="btn" type="button" id="sfontall">Use for every subject</button></div>
<h3>Accent colour</h3><div class="row" style="gap:8px;flex-wrap:wrap">${[["","Subject default"],["#0A6C74","Teal"],["#1F5FBF","Blue"],["#2E7D32","Green"],["#7B3FA0","Purple"],["#C2570C","Orange"],["#B3261E","Red"]].map(c=>`<button class="chip" type="button" data-acc="${c[0]}" aria-pressed="${(dsp.accent||"")===c[0]}">${c[1]}</button>`).join("")}</div>
<h3>Clock and date (top left)</h3><div class="row" style="gap:12px;flex-wrap:wrap"><label class="set-chk"><input type="checkbox" id="sclk" ${SET.ui.clock?"checked":""}> Show clock and date</label><label class="set-chk"><input type="checkbox" id="sh24" ${SET.ui.h24?"checked":""}> 24-hour clock</label></div>
<h3>Layout</h3><div class="row" style="gap:8px;flex-wrap:wrap">${[["tight","Tight lines"],["normal","Normal lines"],["relaxed","Relaxed lines"]].map(f=>`<button class="chip" type="button" data-lh="${f[0]}" aria-pressed="${dsp.lh===f[0]}">${f[1]}</button>`).join("")}${[["standard","Standard width"],["wide","Full width"]].map(f=>`<button class="chip" type="button" data-width="${f[0]}" aria-pressed="${dsp.width===f[0]}">${f[1]}</button>`).join("")}</div>
<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn" type="button" id="stheme">Switch light / dark</button><button class="btn" type="button" id="sboard">${dsp.board?"Turn off smartboard preset":"Use smartboard preset"}</button><label class="set-chk"><input type="checkbox" id="scon" ${document.documentElement.getAttribute("data-contrast")==="high"?"checked":""}> High contrast</label></div>`:`<p class="meta">Display options are not available.</p>`}</section>

<section class="set-card"><h2>4. Teacher details</h2>
<p class="meta">Used as the defaults on assessments, overviews, study packs and printed papers.</p>
<div class="set-grid"><label>Your name<input type="text" data-t="name" value="${esc(T.name)}"></label><label>School name<input type="text" data-t="school" value="${esc(T.school)}"></label><label>Academic year<input type="text" data-t="year" value="${esc(T.year)}"></label><label>Class names (separated by commas)<input type="text" data-t="classes" value="${esc(T.classes)}" placeholder="10A, 10B, 12 Biology"></label></div></section>

<section class="set-card"><h2>5. Lesson pages</h2>
<div class="set-grid"><label>Pictures shown as slides in the Explain stage (the rest go to the Gallery)<input type="number" id="smax" min="0" max="40" value="${L.maxInline}" style="width:6em"></label>
<label class="set-chk"><input type="checkbox" id="sgal" ${L.gallery?"checked":""}> Show the Gallery slide</label>
<label class="set-chk"><input type="checkbox" id="snotes" ${L.notes?"checked":""}> Show my notes pictures at all</label>
<label>Open each lesson at stage<select id="sstart">${STG.map(s=>`<option value="${s[0]}" ${L.start===s[0]?"selected":""}>${s[1]}</option>`).join("")}</select></label></div>
<h3>Stages to show</h3><div class="row" style="gap:12px;flex-wrap:wrap">${STG.map(s=>`<label class="set-chk"><input type="checkbox" data-stg="${s[0]}" ${L.hide.includes(s[0])?"":"checked"}> ${s[1]}</label>`).join("")}</div></section>

<section class="set-card"><h2>6. Lesson and activity timers</h2>
<label class="set-chk"><input type="checkbox" id="tshow" ${M.show?"checked":""}> Show the timer on lesson pages</label>
<div class="set-grid"><label>Period length<select id="tper"><option value="40" ${M.period==40?"selected":""}>Single period: 40 minutes</option><option value="80" ${M.period==80?"selected":""}>Double period: 80 minutes</option><option value="${M.period!=40&&M.period!=80?M.period:60}" ${M.period!=40&&M.period!=80?"selected":""}>Other…</option></select></label>
<label>Warn me when this many minutes are left<input type="number" id="twarn" min="0" max="20" value="${M.warn}" style="width:5em"></label>
<label class="set-chk"><input type="checkbox" id="tbeep" ${M.beep?"checked":""}> Sound a beep when time is up</label>
<label class="set-chk"><input type="checkbox" id="tauto" ${M.auto?"checked":""}> Start the stage timer automatically when I open a stage</label></div>
<h3>Share of the lesson for each stage (%)</h3><div class="set-grid">${STG.map(s=>`<label>${s[1]} <input type="number" data-sh="${s[0]}" min="0" max="100" value="${M.share[s[0]]}" style="width:5em"> <span class="meta">${stageMins(s[0])} min</span></label>`).join("")}</div>
<p class="meta">Total: ${Object.values(M.share).reduce((a,b)=>a+(+b||0),0)}% (aim for 100%). On a lesson page the timer bar lets you start the stage timer, a task timer for learners, and the whole-lesson clock.</p></section>

<section class="set-card"><h2>7. Assessments and papers</h2>
<p class="meta">Defaults for the Assessments page, the cover page, the multiple-choice answer sheet and the instructions printed on each paper. Settings you change here apply to the next paper you generate.</p>
<h3>School logo</h3><div class="row" style="gap:12px;align-items:center;flex-wrap:wrap"><img id="slogo" alt="School logo" src="${A.logo||(typeof ASSESS_LOGO!=="undefined"?ASSESS_LOGO:"")}" style="height:70px;width:auto;border:1px solid #8886;border-radius:8px;padding:4px;background:#fff"><button class="btn" type="button" id="slogob">Change logo</button><button class="btn" type="button" id="slogor">Use the original logo</button><input type="file" id="slogof" accept="image/png,image/jpeg,image/svg+xml,image/webp" hidden></div><p class="meta">Used on assessment covers, the answer sheet and exported papers. A square or wide picture with a white or transparent background works best.</p>
<h3>Paper details</h3><div class="set-grid">
<label>Centre number (printed on the answer sheet)<input type="text" data-a="assess.centre" value="${esc(A.centre)}" maxlength="5" placeholder="e.g. ZM001"></label>
<label>Exam series (e.g. Semester 1 2026)<input type="text" data-a="assess.series" value="${esc(A.series)}" placeholder="Semester 1 2026"></label>
<label>Department line on the summative cover<input type="text" data-a="assess.dept" value="${esc(A.dept)}"></label>
<label>Title on the summative cover<input type="text" data-a="assess.coverTitle" value="${esc(A.coverTitle)}"></label>
<label>Multiple-choice paper name<input type="text" data-a="assess.compMcq" value="${esc(A.compMcq)}"></label>
<label>Structured paper name<input type="text" data-a="assess.compStruct" value="${esc(A.compStruct)}"></label></div>
<div class="row" style="gap:14px;flex-wrap:wrap;margin-top:8px"><label class="set-chk"><input type="checkbox" data-a="assess.crest" ${A.crest?"checked":""}> Show the school crest on covers and the answer sheet</label><label class="set-chk"><input type="checkbox" data-a="assess.sheet" ${A.sheet?"checked":""}> Add the multiple-choice answer sheet on page 2 (formative and summative)</label><label class="set-chk"><input type="checkbox" data-a="assess.calc" ${A.calc?"checked":""}> Say that calculators may be used</label><label class="set-chk"><input type="checkbox" data-a="assess.ptDefault" ${A.ptDefault?"checked":""}> Tick the Periodic Table option by default (Chemistry)</label><label class="set-chk"><input type="checkbox" data-a="assess.avoid" ${A.avoid?"checked":""}> Avoid questions already used</label></div>
<h3>Answer sheet letters</h3><div class="row" style="gap:12px"><label class="set-chk"><input type="radio" name="sl" data-a="assess.letters" data-v="4" ${+A.letters===4?"checked":""}> A to D</label><label class="set-chk"><input type="radio" name="sl" data-a="assess.letters" data-v="8" ${+A.letters===8?"checked":""}> A to H</label></div>
<h3>Default size of each assessment type</h3><div class="set-grid">${[["bi","Bi-weekly test"],["form","Formative"],["sum","Summative"]].map(t=>`<label>${t[1]}: total marks<input type="number" min="5" max="150" data-a="assess.defs.${t[0]}.marks" value="${A.defs[t[0]].marks}"></label><label>${t[1]}: minutes<input type="number" min="10" max="240" data-a="assess.defs.${t[0]}.mins" value="${A.defs[t[0]].mins}"></label>${t[0]==="bi"?"":`<label>${t[1]}: multiple-choice questions<input type="number" min="0" max="60" data-a="assess.defs.${t[0]}.mcq" value="${A.defs[t[0]].mcq}"></label>`}`).join("")}</div>
<h3>Instructions to candidates</h3><p class="meta">One instruction per line. Leave empty to use the standard Cambridge component-paper wording. You can use {N} for the number of questions and {TOTAL} for the paper's marks.</p>
<div class="set-grid"><label>Multiple-choice paper<textarea rows="8" data-a="assess.instrMcq" placeholder="Standard Cambridge wording">${esc(A.instrMcq)}</textarea></label><label>Structured paper<textarea rows="8" data-a="assess.instrStruct" placeholder="Standard Cambridge wording">${esc(A.instrStruct)}</textarea></label></div></section>

<section class="set-card"><h2>8. Games, exam questions and group activities</h2>
<div class="set-grid"><label>Match-up: pairs per round<input type="number" min="3" max="10" data-a="games.pairs" value="${SET.games.pairs}"></label></div>
<div class="row" style="gap:14px;flex-wrap:wrap;margin-top:8px"><label class="set-chk"><input type="checkbox" data-a="games.hint" ${SET.games.hint?"checked":""}> Show the hint in Flask hangman</label><label class="set-chk"><input type="checkbox" data-a="exam.open" ${SET.exam.open?"checked":""}> Show mark schemes already open in Exam questions</label><label class="set-chk"><input type="checkbox" data-a="ibl.notes" ${SET.ibl.notes?"checked":""}> Show teacher notes on Group activities (Teacher hub only)</label></div>
<div class="set-grid" style="margin-top:8px"><label>Group roles (separated by commas)<input type="text" data-a="ibl.roles" value="${esc(SET.ibl.roles)}"></label></div></section>

<section class="set-card"><h2>About</h2><p class="meta">LOTS Cambridge Learning Hub, installer version ${VER}. Data is kept in this hub's own browser profile on this computer.</p>
<div class="row" style="gap:8px"><button class="btn" type="button" id="sreset">Reset settings to default</button></div></section></div>`;
  if(!HUB.teacher)studentize();
  wire();if(!HUB.teacher)wireStudent();
}

function studentize(){
  const cards=$$(".set-card",OV),H=c=>c.querySelector("h2");
  cards.forEach(c=>{const t=H(c).textContent;
    if(/^(1|4|6|7)\./.test(t))c.remove();
    else if(/^2\./.test(t)){H(c).textContent="Back up and restore my progress";
      c.querySelectorAll("p").forEach(p=>{if(/^A back-up holds/.test(p.textContent))p.textContent="A back-up is a small file with your progress, quiz scores, notes and settings. Keep it safe, then restore it if you use a new computer or clear your browser.";
        if(/^Automatic back-ups need/.test(p.textContent))p.textContent="The back-up file goes to your Downloads folder."});
      const lab=[...c.querySelectorAll("label")].find(l=>/automatically/.test(l.textContent));if(lab)lab.remove();
      const sb=c.querySelector("#sbk2");if(sb)sb.textContent="Download my back-up"}
    else if(/^3\./.test(t))H(c).textContent="Display, theme and fonts";
    else if(/^5\./.test(t)){H(c).textContent="Lesson pages";
      const g=c.querySelector(".set-grid");if(g){[...g.children].forEach(l=>{if(/Pictures shown|Gallery|my notes pictures/.test(l.textContent))l.remove()})}}
    else if(/^8\./.test(t)){H(c).textContent="Games and exam questions";
      [...c.querySelectorAll("label")].forEach(l=>{if(/teacher notes|Group roles/i.test(l.textContent))l.remove()});
      c.querySelectorAll(".set-grid").forEach(g=>{if(!g.children.length)g.remove()})}
  });
  const top=OV.querySelector(".set-top");
  const L=SET.learner,P=SET.ptimer;
  const me=document.createElement("section");me.className="set-card";
  me.innerHTML=`<h2>About you</h2><p class="meta">The hub greets you by name each time you open it.</p>
<div class="set-grid"><label>Your name<input type="text" id="lname" maxlength="30" value="${esc(L.name)}" placeholder="e.g. Chanda"></label>
<label class="set-chk"><input type="checkbox" id="lgreet" ${L.greet?"checked":""}> Greet me on the home page</label></div>`;
  const pt=document.createElement("section");pt.className="set-card";
  pt.innerHTML=`<h2>Practice timer</h2><p class="meta">Time yourself when you answer questions. Use a stopwatch to see how long you take, or a countdown to practise for the exam.</p>
<label class="set-chk"><input type="checkbox" id="pshow" ${P.show?"checked":""}> Show the practice timer on question pages</label>
<div class="set-grid"><label>When I start a timer<select id="pmode"><option value="ask" ${P.mode==="ask"?"selected":""}>Let me choose each time</option><option value="stopwatch" ${P.mode==="stopwatch"?"selected":""}>Always use the stopwatch</option><option value="countdown" ${P.mode==="countdown"?"selected":""}>Always use the countdown</option></select></label>
<label>Countdown: minutes per mark<input type="number" id="pmpm" min="0.5" max="3" step="0.1" value="${P.mpm}" style="width:6em"></label>
<label class="set-chk"><input type="checkbox" id="pbeep" ${P.beep?"checked":""}> Beep when the countdown ends</label></div>
<p class="meta">Cambridge papers give about one minute per mark, plus time to check. The default is 1.2 minutes per mark.</p>`;
  const intro=OV.querySelector(".set-wrap > p.meta");if(intro)intro.textContent="Everything you change is kept straight away on this device.";
  const anc=intro||top;anc.insertAdjacentElement("afterend",pt);anc.insertAdjacentElement("afterend",me);
  const sv=OV.querySelector("#ssave");if(sv)sv.remove();const sk=OV.querySelector("#sbk");if(sk)sk.remove();
  const ab=[...OV.querySelectorAll(".set-card")].pop();if(ab&&/^About$/.test(H(ab).textContent))ab.querySelector("p.meta").textContent="LOTS Cambridge Learning Hub, student edition. Your progress is stored in this browser on this device, so use the back-up above before you clear browser data.";
}
function wireStudent(){
  const set=f=>{f();persist()};
  $("#lname",OV).oninput=e=>set(()=>{SET.learner.name=e.target.value.replace(/[<>]/g,"").trim().slice(0,30)});
  $("#lgreet",OV).onchange=e=>set(()=>{SET.learner.greet=e.target.checked});
  $("#pshow",OV).onchange=e=>set(()=>{SET.ptimer.show=e.target.checked;window.LRN&&LRN.refresh()});
  $("#pmode",OV).onchange=e=>set(()=>{SET.ptimer.mode=e.target.value});
  $("#pmpm",OV).onchange=e=>set(()=>{SET.ptimer.mpm=Math.max(.5,Math.min(3,+e.target.value||1.2))});
  $("#pbeep",OV).onchange=e=>set(()=>{SET.ptimer.beep=e.target.checked});
}
function wire(){
  const $=(s,r)=>(r||document).querySelector(s)||{style:{}};
  const set=(f)=>{f();persist();applyAll()};
  $("#sclose",OV).onclick=closeSettings;
  $("#ssave",OV).onclick=async()=>{persist();applyAll();await backupNow("manual")};
  const bk=()=>backupNow("manual").then(render);$("#sbk",OV).onclick=bk;$("#sbk2",OV).onclick=bk;
  $("#schoose",OV).onclick=async()=>{if(await chooseFolder())render()};
  const rc=$("#sreconn",OV);if(rc)rc.onclick=reconnect;
  $("#smk",OV).onclick=async()=>{const n=await makeFolders();toast("Sub-folders ready ("+n+").")};
  $$("[data-fold]",OV).forEach(i=>i.onchange=()=>set(()=>{SET.folders[i.dataset.fold]=SAFE(i.value)||DEF.folders[i.dataset.fold]}));
  $("#srest",OV).onchange=e=>{if(e.target.files[0])restoreFile(e.target.files[0])};
  $("#sauto",OV).onchange=e=>set(()=>{SET.backup.auto=e.target.checked});
  $("#srem",OV).onchange=e=>set(()=>{SET.backup.remind=Math.max(0,Math.min(60,+e.target.value||0))});
  if(typeof DSP!=="undefined"){
    const d=o=>{Object.assign(DSP,o);applyDsp();render()};
    $$("[data-fs]",OV).forEach(b=>b.onclick=()=>d({fs:+b.dataset.fs}));
    $$("[data-font]",OV).forEach(b=>b.onclick=()=>{if(!DSP.fonts)DSP.fonts={};DSP.fonts[hubKey()]=b.dataset.font;d({})});
    $$("[data-acc]",OV).forEach(b=>b.onclick=()=>d({accent:b.dataset.acc}));
    $("#sfontall",OV).onclick=()=>{const f=(DSP.fonts&&DSP.fonts[hubKey()])||DSP.font;DSP.fonts={};d({font:f})};
    $("#sclk",OV).onchange=e=>{SET.ui.clock=e.target.checked;persist();window.HUBCLOCK&&HUBCLOCK()};
    $("#sh24",OV).onchange=e=>{SET.ui.h24=e.target.checked;persist();window.HUBCLOCK&&HUBCLOCK()};
    $$("[data-lh]",OV).forEach(b=>b.onclick=()=>d({lh:b.dataset.lh}));
    $$("[data-width]",OV).forEach(b=>b.onclick=()=>d({width:b.dataset.width}));
    $("#sboard",OV).onclick=()=>DSP.board?d({board:0,fs:1.25,width:"standard"}):d({board:1,fs:1.6,width:"wide"});
    $("#stheme",OV).onclick=()=>{const t=$("#theme");if(t)t.click()};
    $("#scon",OV).onchange=e=>{document.documentElement.setAttribute("data-contrast",e.target.checked?"high":"");try{localStorage.setItem("hubcontrast",e.target.checked?"high":"")}catch(x){}};
  }
  {const f=$("#slogof",OV);$("#slogob",OV).onclick=()=>f.click();
   $("#slogor",OV).onclick=()=>{SET.assess.logo="";persist();render()};
   f.onchange=()=>{const file=f.files[0];if(!file)return;const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>{const m=Math.min(1,500/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.max(1,Math.round(im.width*m));c.height=Math.max(1,Math.round(im.height*m));const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);SET.assess.logo=c.toDataURL("image/jpeg",0.92);persist();render();toast("Logo updated.")};im.onerror=()=>toast("That picture could not be read.");im.src=rd.result};rd.readAsDataURL(file)}}
  $$("[data-a]",OV).forEach(i=>i.onchange=()=>set(()=>{const p=i.dataset.a.split(".");let o=SET;for(let k=0;k<p.length-1;k++)o=o[p[k]];const last=p[p.length-1];
    if(i.type==="checkbox")o[last]=i.checked;else if(i.type==="radio")o[last]=+i.dataset.v;else if(i.type==="number")o[last]=+i.value||0;else o[last]=i.value}));
  $$("[data-t]",OV).forEach(i=>i.onchange=()=>set(()=>{SET.teacher[i.dataset.t]=i.value.trim()}));
  $("#smax",OV).onchange=e=>set(()=>{SET.lesson.maxInline=Math.max(0,Math.min(40,+e.target.value||0))});
  $("#sgal",OV).onchange=e=>set(()=>{SET.lesson.gallery=e.target.checked});
  $("#snotes",OV).onchange=e=>set(()=>{SET.lesson.notes=e.target.checked});
  $("#sstart",OV).onchange=e=>set(()=>{SET.lesson.start=e.target.value});
  $$("[data-stg]",OV).forEach(i=>i.onchange=()=>set(()=>{const k=i.dataset.stg,h=SET.lesson.hide.filter(x=>x!==k);if(!i.checked)h.push(k);if(h.length>=STG.length){h.pop();i.checked=true}SET.lesson.hide=h}));
  $("#tshow",OV).onchange=e=>set(()=>{SET.timer.show=e.target.checked});
  $("#tper",OV).onchange=e=>{set(()=>{SET.timer.period=+e.target.value||40});render()};
  $("#twarn",OV).onchange=e=>set(()=>{SET.timer.warn=Math.max(0,+e.target.value||0)});
  $("#tbeep",OV).onchange=e=>set(()=>{SET.timer.beep=e.target.checked});
  $("#tauto",OV).onchange=e=>set(()=>{SET.timer.auto=e.target.checked});
  $$("[data-sh]",OV).forEach(i=>i.onchange=()=>{set(()=>{SET.timer.share[i.dataset.sh]=Math.max(0,+i.value||0)});render()});
  $("#sreset",OV).onclick=()=>{if(confirm("Reset every setting on this page to its default? Your progress and back-ups are not touched.")){SET=clone(DEF);window.HUBSET.get=()=>SET;persist();applyAll();render()}};
}
/* ---------- apply settings to the rest of the hub ---------- */
function applyAll(){
  const d=document.documentElement;
  d.setAttribute("data-hide-stages",SET.lesson.hide.join(" "));
  try{if(localStorage.getItem("hubcontrast")==="high")d.setAttribute("data-contrast","high")}catch(e){}
  tmrDraw();
}
/* ---------- timers ---------- */
let TM=null;
try{TM=JSON.parse(sessionStorage.getItem("hubtimer")||"null")}catch(e){}
if(!TM)TM={task:{end:0,left:0,run:false,total:0,label:""},lesson:{end:0,left:SET.timer.period*60,run:false,total:SET.timer.period*60},open:false};
function tmSave(){try{sessionStorage.setItem("hubtimer",JSON.stringify(TM))}catch(e){}}
function rem(t){return t.run?Math.max(0,Math.round((t.end-Date.now())/1000)):t.left}
const fmt=s=>{s=Math.max(0,s);const m=Math.floor(s/60),x=s%60;return m+":"+String(x).padStart(2,"0")};
let ctx=null;
function beep(n){
  if(!SET.timer.beep)return;
  try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();for(let i=0;i<(n||3);i++){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=880;o.connect(g);g.connect(ctx.destination);const t=ctx.currentTime+i*.4;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.3,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.start(t);o.stop(t+.32)}}catch(e){}
}
function curStage(){const b=document.querySelector('.stg[aria-selected="true"]');return b?b.dataset.t:null}
function onLesson(){return !!document.querySelector(".stages")}
function start(t,secs,label){t.total=secs;t.left=secs;t.end=Date.now()+secs*1000;t.run=true;t.warned=false;t.done=false;if(t===TM.task)t.label=label||"";tmSave();tmrDraw()}
function pause(t){if(t.run){t.left=rem(t);t.run=false}tmSave();tmrDraw()}
function resume(t){if(!t.run&&t.left>0){t.end=Date.now()+t.left*1000;t.run=true;tmSave();tmrDraw()}}
function tmrEl(){
  let e=$("#tmr");
  if(!e){e=document.createElement("div");e.id="tmr";e.className="tmr";e.setAttribute("aria-label","Timer");document.body.appendChild(e);
    e.addEventListener("click",ev=>{
      const b=ev.target.closest("[data-a]");if(!b){return}
      const a=b.dataset.a,T=TM.task,Ls=TM.lesson;
      if(a==="toggle"){TM.open=!TM.open}
      else if(a==="stage"){const s=curStage()||SET.lesson.start;start(T,stageMins(s)*60,(STG.find(x=>x[0]===s)||[0,"Stage"])[1])}
      else if(a==="min"){start(T,+b.dataset.v*60,b.dataset.v+" min task")}
      else if(a==="custom"){const v=parseFloat($("#tmin",e).value);if(v>0)start(T,Math.round(v*60),v+" min task")}
      else if(a==="pp"){T.run?pause(T):resume(T)}
      else if(a==="add"){if(T.run)T.end+=60000;else T.left+=60;T.total+=60;tmSave()}
      else if(a==="rs"){T.run=false;T.left=0;T.total=0;T.label="";tmSave()}
      else if(a==="lstart"){Ls.total=SET.timer.period*60;start(Ls,Ls.total)}
      else if(a==="lpp"){Ls.run?pause(Ls):(Ls.left>0&&resume(Ls))}
      else if(a==="lrs"){Ls.run=false;Ls.left=SET.timer.period*60;Ls.total=Ls.left;tmSave()}
      else if(a==="lend"){endFlash()}
      else if(a==="pjfull"){PFULL=!PFULL}
      else if(a==="pos"){SET.timer.pos=b.dataset.v;const m={tl:[14,14],tr:[innerWidth-e.offsetWidth-14,14],bl:[14,innerHeight-e.offsetHeight-14],br:[innerWidth-e.offsetWidth-14,innerHeight-e.offsetHeight-14]}[b.dataset.v];SET.timer.xy=m||null;persist()}
      else if(a==="hide"||a==="mini"){const e2=$("#tmr");SET.timer.mini=!(e2&&e2.classList.contains("x4mini"));if(e2)e2.classList.toggle("x4mini",SET.timer.mini);persist()}
      else if(a==="dock"){SET.timer.xy=null;persist()}
      else if(a==="unhide"){SET.timer.hidden=false;persist()}
      tmrDraw();
    });
  }
  return e;
}
function endFlash(){const e=$("#tmr");if(e)e.classList.remove("tmr-end","tmr-warn")}
let PFULL=false;
function projClock(){
  if(!HUB.teacher||typeof PROJ==="undefined")return;
  const d=PROJ.doc,old=d&&d.getElementById("pj-clk");
  const T=TM.task,Ls=TM.lesson,act=T.run||T.left>0||T.total>0,les=Ls.run||Ls.left<Ls.total;
  if(!d||!SET.timer.show||(!act&&!les)){if(old)old.remove();return}
  if(!d.getElementById("pj-clkcss")){const cs=d.createElement("style");cs.id="pj-clkcss";cs.textContent="#pj-clk{position:fixed;top:56px;right:14px;z-index:30;background:#10252Fe8;color:#fff;border:2px solid #ffffff66;border-radius:16px;padding:8px 18px;font:700 44px/1.05 system-ui,sans-serif;text-align:center;cursor:pointer;box-shadow:0 6px 22px #0006}#pj-clk small{display:block;font:600 15px system-ui,sans-serif;opacity:.85}#pj-clk.warn{background:#b45309}#pj-clk.end{background:#b3261e}#pj-clk.full{inset:0;border-radius:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:24vw;z-index:40}#pj-clk.full small{font-size:3vw}.pjc-two{display:flex}.pjc-two>span{padding:0 14px}.pjc-l{color:#8fe3ea;border-right:3px solid #ffffff66}.pjc-a{color:#ffc861}#pj-clk.full .pjc-two{gap:3vw}";(d.head||d.documentElement).appendChild(cs)}
  let c=old;
  if(!c){c=d.createElement("div");c.id="pj-clk";c.title="Click to fill or shrink";c.onclick=()=>{PFULL=!PFULL;projClock()};(d===document?d.querySelector(".pj-ov")||d.body:d.body).appendChild(c)}
  const tr=rem(T),lr=rem(Ls),main=act?tr:lr,label=act?(T.label||"Task"):"Lesson",st=act&&T.done&&!T.run?"end":(act&&T.run&&SET.timer.warn>0&&tr<=SET.timer.warn*60?"warn":"");
  c.className=(st)+(PFULL?" full":"");
  c.innerHTML=`<span class="pjc-two"><span class="pjc-l"><small>Lesson${Ls.endTxt?" · ends "+Ls.endTxt:""}</small>${les?fmt(lr):"--:--"}</span><span class="pjc-a"><small>${(T.label||"Activity").replace(/</g,"&lt;")}</small>${act?fmt(tr):"--:--"}</span></span>`;
}
function tmrDraw(){
  try{projClock()}catch(e){}
  const show=HUB.teacher&&SET.timer.show&&onLesson();
  let e=$("#tmr");if(!show){if(e)e.style.display="none";return}
  e=tmrEl();e.style.display="";
  const T=TM.task,Ls=TM.lesson,tr=rem(T),lr=rem(Ls),act=T.run||T.left>0||T.total>0,lon=Ls.run||Ls.left<Ls.total;
  const st=curStage(),sm=st?stageMins(st):0;
  const state=T.done&&!T.run?"end":(T.run&&tr<=SET.timer.warn*60&&SET.timer.warn>0?"warn":"");
  e.className="tmr x4c"+(state?" tmr-"+state:"")+(TM.open?" tmr-open":"")+" tmr-p-"+(SET.timer.pos||"br")+(e.classList.contains("x4mini")?" x4mini":"")+(e.classList.contains("docked")?" docked":"");
  const lab=(T.label||"Activity").replace(" · time up","");
  e.innerHTML=`<div class="tmr-bar"><span class="x4grip" title="Drag to move" aria-hidden="true">⠿</span><button class="x4two" type="button" data-a="toggle" aria-expanded="${TM.open}" aria-label="Clock: lesson and activity. Open the timer controls"><span class="l"><small>Lesson${Ls.endTxt&&lon?" · ends "+esc(Ls.endTxt):""}</small><b>${fmt(lon?lr:SET.timer.period*60)}</b><small>${lon?(Ls.run?esc(Ls.lab||"counting down"):"paused"):SET.timer.period+" min · not started"}</small></span><span class="a"><small>${esc(lab)}</small><b>${act?fmt(tr):"--:--"}</b><small>${T.run?"counting down":T.done?"time is up":act?"paused":"none running"}</small></span></button><span class="x4cbtn"><button type="button" data-a="mini" aria-label="Shrink or expand the clock" title="Shrink or expand">${e.classList.contains("x4mini")?"+":"–"}</button><button type="button" data-a="toggle" aria-label="Timer controls" title="Timer controls">⚙</button></span></div>
${TM.open?`<div class="tmr-panel">
<div class="tmr-row"><b>Activity timer</b>${act?`<button class="btn" data-a="pp" type="button">${T.run?"Pause":"Resume"}</button><button class="btn" data-a="add" type="button">+1 min</button><button class="btn" data-a="rs" type="button">Clear</button>`:""}</div>
<div class="tmr-row">${st?`<button class="btn pri" data-a="stage" type="button">${(STG.find(x=>x[0]===st)||[0,"Stage"])[1]} stage: ${sm} min</button>`:""}${[1,2,3,5,10,15,20].map(v=>`<button class="btn" data-a="min" data-v="${v}" type="button">${v} min</button>`).join("")}<span class="tmr-c"><input id="tmin" type="number" min="0.5" step="0.5" placeholder="min" aria-label="Minutes"><button class="btn" data-a="custom" type="button">Start</button></span></div>
<div class="tmr-row"><b>Lesson clock</b> <span class="meta">(${SET.timer.period} min period${Ls.endTxt?", ends "+esc(Ls.endTxt):""})</span>${Ls.run?`<button class="btn" data-a="lpp" type="button">Pause</button>`:Ls.left<Ls.total&&Ls.left>0?`<button class="btn" data-a="lpp" type="button">Resume</button>`:`<button class="btn pri" data-a="lstart" type="button">Start lesson</button>`}<button class="btn" data-a="lrs" type="button">Reset</button><span class="tmr-lt">${fmt(lr)} left</span></div>
<div class="tmr-row"><b>Projector</b>${PROJ.active?`<button class="btn" data-a="pjfull" type="button">${PFULL?"Corner clock on projector":"Fill projector with timer"}</button>`:`<span class="meta">Open the projector to show the clock there.</span>`}</div>
<div class="tmr-row"><b>Position</b><button class="btn${SET.timer.xy?"":" pri"}" data-a="dock" type="button">Automatic (beside the lesson)</button>${[["tl","↖"],["tr","↗"],["bl","↙"],["br","↘"]].map(p=>`<button class="btn" data-a="pos" data-v="${p[0]}" type="button" aria-label="Corner ${p[0]}">${p[1]}</button>`).join("")}<span class="meta">or drag the ⠿ handle</span></div>
<div class="tmr-stages">${STG.map(s=>`<span class="${st===s[0]?"on":""}">${s[1]} ${stageMins(s[0])}′</span>`).join("")}</div></div>`:""}`;
  place();
}
/* ---------- clock placement: dragged spot, else beside the ladder (wide screens), else mini in the lesson header ---------- */
function place(){
  const e=$("#tmr");if(!e||e.style.display==="none")return;
  const xy=SET.timer.xy,slot=document.querySelector(".x4slot"),dock=document.getElementById("x4dock");
  const setXY=(x,y)=>{e.style.left=Math.max(0,Math.min(innerWidth-e.offsetWidth,x))+"px";e.style.top=Math.max(0,Math.min(innerHeight-e.offsetHeight,y))+"px";e.style.right="auto";e.style.bottom="auto";e.style.transform="none"};
  const mb=e.querySelector('[data-a="mini"]');
  const setMini=m=>{e.classList.toggle("x4mini",m);if(mb)mb.textContent=m?"+":"–"};
  if(dock)dock.style.width="0px";
  if(xy){e.classList.add("docked");setMini(!!SET.timer.mini);setXY(xy[0],xy[1]);return}
  if(slot&&slot.offsetHeight&&innerWidth>=1100){e.classList.add("docked");setMini(!!SET.timer.mini);const r=slot.getBoundingClientRect();setXY(r.right-e.offsetWidth,r.top);return}
  if(dock&&dock.offsetParent){e.classList.add("docked");setMini(true);if(TM.open){const r=dock.getBoundingClientRect();setXY(r.left,r.bottom+6);return}dock.style.width=e.offsetWidth+"px";const r=dock.getBoundingClientRect();setXY(r.left,r.top+r.height/2-e.offsetHeight/2);return}
  e.classList.remove("docked");setMini(!!SET.timer.mini);e.style.left=e.style.top=e.style.right=e.style.bottom=e.style.transform="";
}
addEventListener("resize",()=>place());addEventListener("scroll",()=>{place();clearTimeout(window.__x4pl);window.__x4pl=setTimeout(place,280)},{passive:true});
(function drag(){let d=null;document.addEventListener("pointerdown",ev=>{const g=ev.target.closest("#tmr .x4grip");if(!g)return;const e=$("#tmr"),r=e.getBoundingClientRect();d=[ev.clientX-r.left,ev.clientY-r.top];ev.preventDefault()});
  document.addEventListener("pointermove",ev=>{if(!d)return;const e=$("#tmr");SET.timer.xy=[Math.round(ev.clientX-d[0]),Math.round(ev.clientY-d[1])];place()});
  document.addEventListener("pointerup",()=>{if(d){d=null;persist()}})})();
window.HUBTIMER={task:(secs,label)=>{start(TM.task,Math.max(1,Math.round(secs)),label)},lesson:(secs,label,endTxt)=>{TM.lesson.lab=label||"";TM.lesson.endTxt=endTxt||"";start(TM.lesson,Math.max(1,Math.round(secs)))},place:()=>place(),rem:()=>({task:rem(TM.task),lesson:rem(TM.lesson),label:TM.task.label})};
setInterval(()=>{
  const T=TM.task,Ls=TM.lesson;let ch=false;
  if(T.run){const r=rem(T);
    if(SET.timer.warn>0&&!T.warned&&r<=SET.timer.warn*60&&T.total>SET.timer.warn*60){T.warned=true;beep(1);ch=true}
    if(r<=0){T.run=false;T.left=0;T.done=true;T.label=(T.label||"Task")+" · time up";beep(3);ch=true;tmSave();toast("Time is up: "+(T.label.replace(" · time up","")||"timer"),null,5000)}
  }
  if(Ls.run){const r=rem(Ls);if(r<=0){Ls.run=false;Ls.left=0;beep(3);toast("The lesson period is over.",null,6000);ch=true;tmSave()}}
  if(T.run||Ls.run||ch)tmrDraw();
},500);
document.addEventListener("click",e=>{
  const b=e.target.closest(".stg");
  if(b&&SET.timer.auto&&SET.timer.show){setTimeout(()=>{const s=b.dataset.t;start(TM.task,stageMins(s)*60,(STG.find(x=>x[0]===s)||[0,"Stage"])[1])},50)}
  if(b)setTimeout(tmrDraw,80);
});
window.addEventListener("hashchange",()=>setTimeout(tmrDraw,150));
try{PROJ.on(()=>setTimeout(tmrDraw,50))}catch(e){}
/* ---------- automatic back-up ---------- */
setInterval(async()=>{if(SET.backup.auto&&DIR&&PERM==="granted"){const h=hashOf();if(h&&h!==lastHash)await backupNow("auto")}},300000);
function leaving(){if(SET.backup.auto&&DIR&&PERM==="granted"){const h=hashOf();if(h!==lastHash)backupNow("auto")}}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")leaving()});
window.addEventListener("pagehide",leaving);
/* ---------- start-up ---------- */
function init(){
  const nav=$("#dspbtn");
  if(nav&&!$("#setbtn")){const b=document.createElement("button");b.className="theme dsp-btn";b.id="setbtn";b.type="button";b.textContent="Settings";b.setAttribute("aria-haspopup","dialog");nav.insertAdjacentElement("afterend",b);b.addEventListener("click",openSettings)}
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&OV&&!$("#galov"))closeSettings()});
  applyAll();lastHash=hashOf();
  checkPerm(false).then(()=>{
    const B=SET.backup;
    if(B.remind>0){const days=B.last?(Date.now()-B.last)/864e5:99;
      if(days>=B.remind)setTimeout(()=>toast(B.last?"It has been "+Math.floor(days)+" days since your last back-up.":"You have not backed up this hub yet.",{t:"Back up now",f:()=>backupNow("manual")},0),2500)}
    else if(DIR&&PERM==="prompt")setTimeout(()=>toast("Your save folder needs permission again.",{t:"Reconnect folder",f:reconnect},0),2500);
  });
  window.addEventListener("hashchange",tmrDraw);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
