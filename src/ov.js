/* ov.js - Curriculum Overview generator (Master Hub). OVUI(app,{SUB,U,S,subKey,F,plain,saveFile})
   Data: OBJ[subKey] = [{t,name,subs:[{n,name,obj:[[ref,text,ext]]}]}] (obj_*.js). Enter week 1 dates; every other week fills itself. */
const OV_MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const OV_MON3=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function ovOrd(n){const t=n%100;if(t>=11&&t<=13)return n+"th";return n+(["th","st","nd","rd"][n%10]||"th")}
function ovParse(s){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||"");return m?new Date(Date.UTC(+m[1],+m[2]-1,+m[3])):null}
function ovAdd(d,n){return new Date(d.getTime()+n*86400000)}
function ovShort(d){return ovOrd(d.getUTCDate())+" "+OV_MON3[d.getUTCMonth()]}
function ovRange(a,b){return ovShort(a)+"-"+ovShort(b)+", "+b.getUTCFullYear()}
function ovMonth(a,b){const x=OV_MONTHS[a.getUTCMonth()],y=OV_MONTHS[b.getUTCMonth()];return x===y?x:x+"/"+y}
function OVUI(app,env){
  const sk=env.subKey,SUB=env.SUB,F=env.F;
  const DATA=(typeof OBJ!=="undefined"&&OBJ[sk])||[];
  const KEY="hubov.v1."+sk;
  const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const isAL=sk==="alevel";
  const LEVELS=isAL?["AS LEVEL","A LEVEL (YEAR 2)"]:["IGCSE 1","IGCSE 2"];
  const dflt={level:LEVELS[0],year:"2026-2027",sem:"1",s1:"2026-08-24",e1:"2026-08-28",rows:[],ext:true,label:true,school:(window.HUBSET&&HUBSET.get().teacher.school)||"Lusaka Oaktree School"};
  let st;try{st=Object.assign({},dflt,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){st=Object.assign({},dflt)}
  if(!Array.isArray(st.rows)||!st.rows.length)st.rows=Array.from({length:13},()=>({skip:false,label:"",subs:[],off:{},custom:[]}));
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
  const SUBS=[];DATA.forEach(t=>t.subs.forEach(s=>SUBS.push({t,s,n:s.n})));
  const find=n=>SUBS.find(x=>x.n===n);
  const subName=sub=>SUB.name;
  const msg=m=>{const e=document.getElementById("ov-msg");if(e)e.textContent=m||""};
  function dates(i){const a=ovParse(st.s1),b=ovParse(st.e1);if(!a||!b)return null;const A=ovAdd(a,7*i),B=ovAdd(b,7*i);return{a:A,b:B}}
  /* Carry-over: an objective that is unticked in a week moves, with its topic and sub-topic, to the next teaching week. */
  function calc(){
    const out=[];let carry=[];  /* carry: [{ref,from}] */
    const objOf={};SUBS.forEach(x=>x.s.obj.forEach(o=>{objOf[o[0]]={ref:o[0],text:o[1],ext:!!o[2],sub:x.n}}));
    st.rows.forEach((r,i)=>{
      if(r.skip){out.push({skip:true,list:[],subs:[],carriedIn:0});return}
      const own=[],seen=new Set();
      r.subs.forEach(n=>{const x=find(n);if(!x)return;x.s.obj.forEach(o=>{own.push({ref:o[0],text:o[1],ext:!!o[2],sub:n,from:0});seen.add(o[0])})});
      const inc=carry.filter(c=>objOf[c.ref]&&!seen.has(c.ref)).map(c=>Object.assign({},objOf[c.ref],{from:c.from}));
      const list=own.concat(inc).sort((a,b)=>(SUBS.findIndex(x=>x.n===a.sub)-SUBS.findIndex(x=>x.n===b.sub))||0);
      list.forEach(o=>{o.on=!r.off[o.ref]&&(st.ext||!o.ext)});
      const subs=[...new Set(list.map(o=>o.sub))].sort((a,b)=>SUBS.findIndex(x=>x.n===a)-SUBS.findIndex(x=>x.n===b));
      const carriedSubs=[...new Set(inc.map(o=>o.sub))];
      carry=list.filter(o=>!o.on&&(st.ext||!o.ext)).map(o=>({ref:o.ref,from:i+1}));
      out.push({skip:false,list,subs,carriedIn:inc.length,carriedSubs});
    });
    out.leftover=carry.length;
    return out;
  }
  let CALC=calc();
  function topicLines(i){
    const r=st.rows[i];if(r.skip)return [r.label||"No teaching this week"];
    const c=CALC[i];
    const prev=i>0&&!st.rows[i-1].skip?new Set(CALC[i-1].subs.map(n=>(find(n)||{}).t&&find(n).t.t)):new Set();
    const out=[],seen=new Set();
    c.subs.forEach(n=>{const x=find(n);if(!x)return;if(!seen.has(x.t.t)&&!prev.has(x.t.t)){out.push(x.t.t+". "+x.t.name)}seen.add(x.t.t);out.push(n+" "+x.s.name)});
    return out;
  }
  function objLines(i){
    const r=st.rows[i];if(r.skip)return [];
    const l=CALC[i].list.filter(o=>o.on).map(o=>o.text+(o.ext&&st.label?" (Supplement)":""));
    return l.concat(r.custom||[]);
  }
  /* ---------- page ---------- */
  function sel(){return `<select data-add><option value="">Add a syllabus sub-topic…</option>${DATA.map(t=>`<optgroup label="${esc(t.t+". "+t.name)}">${t.subs.map(s=>`<option value="${s.n}">${s.n} ${esc(s.name)}</option>`).join("")}</optgroup>`).join("")}</select>`}
  function tsel(){return `<select data-addtopic><option value="">Add a whole topic…</option>${DATA.map(t=>`<option value="${t.t}">${esc(t.t+". "+t.name)} (${t.subs.length} sub-topic${t.subs.length>1?"s":""})</option>`).join("")}</select>`}
  function html(){
    const nW=st.rows.length;
    let h=`<h1 class="ltitle">Curriculum overviews</h1><p class="lsum">Enter the dates for week 1 and every other week is dated for you. Pick a syllabus sub-topic for each week and its Cambridge objectives appear automatically. Untick any objective you will not teach that week.</p>
<div class="ov-card"><div class="ov-grid">
<label>Level<input list="ov-lv" id="ov-level" value="${esc(st.level)}"><datalist id="ov-lv">${LEVELS.map(l=>`<option value="${esc(l)}">`).join("")}</datalist></label>
<label>Academic year<input id="ov-year" value="${esc(st.year)}"></label>
<label>Semester<select id="ov-sem"><option${st.sem==="1"?" selected":""}>1</option><option${st.sem==="2"?" selected":""}>2</option></select></label>
<label>Week 1 starts<input type="date" id="ov-s1" value="${esc(st.s1)}"></label>
<label>Week 1 ends<input type="date" id="ov-e1" value="${esc(st.e1)}"></label>
<label>School<input id="ov-school" value="${esc(st.school)}"></label></div>
<div class="row" style="gap:14px;flex-wrap:wrap;margin-top:8px">${isAL?"":`<label class="inl"><input type="checkbox" id="ov-ext"${st.ext?" checked":""}> Include Supplement objectives</label><label class="inl"><input type="checkbox" id="ov-lab"${st.label?" checked":""}> Label them “(Supplement)”</label>`}
<span class="meta">${SUBS.length} syllabus sub-topics loaded for ${esc(SUB.name)} ${esc(SUB.code)}.</span></div>
<div class="row" style="gap:10px;flex-wrap:wrap;margin-top:10px"><label class="inl">Fill the weeks in syllabus order, starting at ${sel().replace("data-add","id=\"ov-first\"").replace("Add a syllabus sub-topic…","First sub-topic…")}</label><button class="btn" type="button" data-act="auto">Fill weeks automatically</button><button class="btn sm" type="button" data-act="addw">Add a week</button><button class="btn sm" type="button" data-act="remw">Remove last week</button><button class="btn sm" type="button" data-act="clear">Clear all weeks</button></div></div>`;
    h+=`<div id="ov-weeks">`;
    for(let i=0;i<nW;i++){
      const r=st.rows[i],d=dates(i);
      h+=`<section class="ov-w${r.skip?" skip":""}" data-i="${i}"><div class="ov-h"><b>Week ${i+1}</b><span>${d?ovRange(d.a,d.b):"enter week 1 dates"}</span><span class="mo">${d?ovMonth(d.a,d.b):""}</span>
<label class="inl"><input type="checkbox" data-skip${r.skip?" checked":""}> No teaching</label>${r.skip?`<input class="ov-lb" data-label placeholder="e.g. Mid-semester break" value="${esc(r.label)}">`:""}
<span class="ov-mv"><button class="btn sm" type="button" data-act="up" aria-label="Move week up">↑</button><button class="btn sm" type="button" data-act="down" aria-label="Move week down">↓</button></span></div>`;
      if(!r.skip){
        const c=CALC[i];
        h+=`<div class="ov-b">${r.subs.map(n=>{const x=find(n);return `<span class="ov-chip">${n} ${esc(x?x.s.name:"")}<button type="button" data-rm="${n}" aria-label="Remove">×</button></span>`}).join("")}${tsel()}${sel()}</div>`;
        if(c.list.length){h+=`<div class="ov-o">${c.subs.map(n=>{const x=find(n);if(!x)return "";const g=c.list.filter(o=>o.sub===n),car=c.carriedSubs.includes(n)&&!r.subs.includes(n),fr=g.find(o=>o.from);
          return `<h5>${n} ${esc(x.s.name)}${car?` <em class="ov-car">carried over from Week ${fr?fr.from:i}</em>`:""} <span class="ov-all"><button type="button" class="btn sm" data-all="on" data-sub="${n}">Tick all</button><button type="button" class="btn sm" data-all="off" data-sub="${n}">Untick all</button></span></h5>`+g.map(o=>`<label class="${o.ext?"x":""}${!st.ext&&o.ext?" dim":""}"><input type="checkbox" data-ob="${o.ref}"${o.on?" checked":""}${!st.ext&&o.ext?" disabled":""}><span>${F(esc(o.text))}${o.ext?` <em>Supplement</em>`:""}${o.from&&r.subs.includes(n)?` <em class="ov-car">carried over from Week ${o.from}</em>`:""}</span></label>`).join("")}).join("")}${i<st.rows.length-1&&c.list.some(o=>!o.on&&(st.ext||!o.ext))?`<p class="meta ov-mvn">Unticked objectives move to the next teaching week with their topic and sub-topic.</p>`:""}</div>`}
        h+=`<div class="ov-c">${(r.custom||[]).map((c,k)=>`<span class="ov-chip">${esc(c)}<button type="button" data-rc="${k}" aria-label="Remove">×</button></span>`).join("")}<input class="ov-cu" data-custom placeholder="Add your own objective, then press Enter"></div>`;
      }
      h+=`</section>`;
    }
    h+=`</div>${CALC.leftover?`<div class="ov-card" style="margin-top:14px"><b>${CALC.leftover} objective${CALC.leftover>1?"s":""} not covered by the last week.</b> <span class="meta">Add a week, or tick them in an earlier week.</span></div>`:""}<div class="ov-card" style="margin-top:18px"><div class="row" style="gap:10px;flex-wrap:wrap"><button class="btn pri" type="button" data-act="docx">Download Word (.docx)</button><button class="btn" type="button" data-act="pdf">Download PDF</button><button class="btn" type="button" data-act="print">Print</button><span class="meta" id="ov-msg" aria-live="polite"></span></div></div>
<h2 class="sec" style="margin-top:22px">Preview</h2><div id="ov-prev" class="ov-prev"></div>`;
    return h;
  }
  function preview(){
    CALC=calc();const p=document.getElementById("ov-prev");if(!p)return;
    let t=`<div class="ov-pc"><div class="ov-sub">${esc(SUB.name.toUpperCase())}</div><div class="ov-sub">CURRICULUM OVERVIEW</div><div class="ov-sub">${esc(st.level)}</div><div class="ov-sub">${esc(st.year)} ACADEMIC YEAR</div><div class="ov-sub" style="margin-top:14px">SEMESTER ${esc(st.sem)}</div></div><table class="ov-t"><thead><tr><th>MONTH</th><th>WEEK</th><th>TOPIC</th><th>CAMBRIDGE OBJECTIVES</th></tr></thead><tbody>`;
    st.rows.forEach((r,i)=>{const d=dates(i);
      t+=`<tr class="${i%2?"w":"g"}"><td><b>${d?esc(ovMonth(d.a,d.b)):""}</b></td><td class="c"><b>${i+1}<br>${d?"("+esc(ovRange(d.a,d.b))+")":""}</b></td><td>${topicLines(i).map(x=>`<div><b>${F(esc(x))}</b></div>`).join("")}</td><td>${objLines(i).length?`<ul>${objLines(i).map(x=>`<li>${F(esc(x))}</li>`).join("")}</ul>`:""}</td></tr>`});
    p.innerHTML=t+`</tbody></table>`;
  }
  function paint(keepY){CALC=calc();const y=window.scrollY;app.innerHTML=html();preview();if(keepY)window.scrollTo(0,y)}
  /* ---------- export ---------- */
  const slug=s=>String(s||"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const imgInfo=u=>new Promise(res=>{const im=new Image();im.onload=()=>res({dataUrl:u,w:im.naturalWidth,h:im.naturalHeight});im.onerror=()=>res(null);im.src=u});
  async function model(){
    CALC=calc();const B=[];
    const lg=await imgInfo(ASSESS_LOGO);if(lg)B.push({t:"img",dataUrl:lg.dataUrl,w:lg.w,h:lg.h,widthPct:22});
    B.push({t:"p",text:SUB.name.toUpperCase(),bold:1,size:20,align:"center",color:"000000"});
    B.push({t:"p",text:"CURRICULUM OVERVIEW",bold:1,size:20,align:"center",color:"000000"});
    B.push({t:"p",text:st.level,bold:1,size:20,align:"center",color:"000000"});
    B.push({t:"p",text:st.year+" ACADEMIC YEAR",bold:1,size:20,align:"center",color:"000000"});
    B.push({t:"p",text:" ",size:10});
    B.push({t:"p",text:"SEMESTER "+st.sem,bold:1,size:18,align:"center",color:"000000"});
    B.push({t:"p",text:" ",size:10});
    const rows=st.rows.map((r,i)=>{const d=dates(i);return [
      d?[ovMonth(d.a,d.b)]:[""],
      ["§"+(i+1)].concat(d?["§("+ovRange(d.a,d.b)+")"]:[]),
      topicLines(i).map(x=>"§"+x),
      objLines(i).length?objLines(i).map(x=>"• "+x):[""]]});
    B.push({t:"table",head:["MONTH","WEEK","TOPIC","CAMBRIDGE OBJECTIVES"],rows,widths:[13,15,24,48],fontSize:10.5,headFill:"7030A0",headColor:"FFFFFF",headAlign:"center",headSize:22,headPad:140,gridColor:"000000",zebra:true,zebraFill:"F2F2F2",firstColBold:true,accent:"000000",colAlign:["left","center","left","left"],splitRows:true});
    return {title:"",footer:st.school+" · "+SUB.name+" curriculum overview · "+st.level,font:"Times New Roman",blocks:B};
  }
  async function exportDoc(fmt,btn){
    const old=btn.textContent;btn.disabled=true;btn.textContent="Preparing...";
    try{const m=await model();const data=fmt==="docx"?await HUBDOC.docx(m):await HUBDOC.pdf(m);
      const r=await env.saveFile(slug(SUB.name)+"-"+slug(st.level)+"-curriculum-overview-S"+st.sem+"."+fmt,data);msg(r==="saved"?"File saved.":r==="declined"?"":"Could not save the file.")}
    catch(e){console.error(e);msg("Something went wrong. Try again.")}
    btn.disabled=false;btn.textContent=old;
  }
  /* ---------- events ---------- */
  paint();
  const textIds={"ov-level":"level","ov-year":"year","ov-school":"school"};
  app.onchange=e=>{
    const t=e.target,id=t.id,w=t.closest(".ov-w"),i=w?+w.dataset.i:-1;
    if(textIds[id]){st[textIds[id]]=t.value;persist();preview();return}
    if(id==="ov-sem"){st.sem=t.value;persist();preview();return}
    if(id==="ov-s1"||id==="ov-e1"){st[id==="ov-s1"?"s1":"e1"]=t.value;
      if(id==="ov-s1"&&ovParse(st.s1)&&(!ovParse(st.e1)||ovParse(st.e1)<ovParse(st.s1)))st.e1=ovParse(st.s1)?ovAdd(ovParse(st.s1),4).toISOString().slice(0,10):st.e1;
      persist();paint(true);return}
    if(id==="ov-ext"){st.ext=t.checked;persist();paint(true);return}
    if(id==="ov-lab"){st.label=t.checked;persist();preview();return}
    if(i<0)return;
    const r=st.rows[i];
    if(t.matches("[data-skip]")){r.skip=t.checked;persist();paint(true)}
    else if(t.matches("[data-label]")){r.label=t.value;persist();preview()}
    else if(t.matches("[data-add]")){if(t.value&&!r.subs.includes(t.value)){r.subs.push(t.value);r.subs.sort((a,b)=>SUBS.findIndex(x=>x.n===a)-SUBS.findIndex(x=>x.n===b))}persist();paint(true)}
    else if(t.matches("[data-addtopic]")){const tp=DATA.find(x=>x.t===t.value);if(tp){tp.subs.forEach(x=>{if(!r.subs.includes(x.n))r.subs.push(x.n)});r.subs.sort((a,b)=>SUBS.findIndex(x=>x.n===a)-SUBS.findIndex(x=>x.n===b))}persist();paint(true)}
    else if(t.matches("[data-ob]")){if(t.checked)delete r.off[t.dataset.ob];else r.off[t.dataset.ob]=1;persist();paint(true)}
  };
  app.onkeydown=e=>{if(e.key==="Enter"&&e.target.matches("[data-custom]")){e.preventDefault();const v=e.target.value.trim(),i=+e.target.closest(".ov-w").dataset.i;if(v){st.rows[i].custom=(st.rows[i].custom||[]).concat(v);persist();paint(true)}}};
  app.onclick=e=>{
    const b=e.target.closest("button");if(!b)return;
    const w=b.closest(".ov-w"),i=w?+w.dataset.i:-1;
    if(b.dataset.rm){const r=st.rows[i];r.subs=r.subs.filter(n=>n!==b.dataset.rm);persist();paint(true);return}
    if(b.dataset.rc!=null){st.rows[i].custom.splice(+b.dataset.rc,1);persist();paint(true);return}
    if(b.dataset.all){const r=st.rows[i],x=find(b.dataset.sub);if(x){x.s.obj.forEach(o=>{if(b.dataset.all==="on")delete r.off[o[0]];else r.off[o[0]]=1})}persist();paint(true);return}
    const a=b.dataset.act;if(!a)return;
    if(a==="up"&&i>0){[st.rows[i-1],st.rows[i]]=[st.rows[i],st.rows[i-1]];persist();paint(true)}
    else if(a==="down"&&i<st.rows.length-1){[st.rows[i+1],st.rows[i]]=[st.rows[i],st.rows[i+1]];persist();paint(true)}
    else if(a==="addw"){st.rows.push({skip:false,label:"",subs:[],off:{},custom:[]});persist();paint(true)}
    else if(a==="remw"){if(st.rows.length>1){st.rows.pop();persist();paint(true)}}
    else if(a==="clear"){if(confirm&&false){}st.rows=st.rows.map(()=>({skip:false,label:"",subs:[],off:{},custom:[]}));persist();paint(true)}
    else if(a==="auto"){
      const f=document.getElementById("ov-first").value;const start=Math.max(0,SUBS.findIndex(x=>x.n===f));let k=start;
      st.rows.forEach(r=>{if(r.skip)return;const x=SUBS[k];if(x){r.subs=[x.n];r.off={};k++}else r.subs=[]});persist();paint(true);
      if(k<SUBS.length)msg("");}
    else if(a==="docx"||a==="pdf")exportDoc(a,b);
    else if(a==="print"){document.body.classList.add("ov-printing");const done=()=>{document.body.classList.remove("ov-printing");window.removeEventListener("afterprint",done)};window.addEventListener("afterprint",done);window.print()}
  };
}
