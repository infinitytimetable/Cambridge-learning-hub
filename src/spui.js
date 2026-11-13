/* spui.js - Study Pack generator (Master Hub). SPUI(app,{SUB,U,S,subKey,F,plain,saveFile})
   Weekly pack in the school's layout: banner, objectives, 4 key ideas, figure, home activity, Cambridge-style worksheet.
   Data: SP[subKey]["t.l"]={k:[[title,text]x4],h:[title,text]} (sp_*.js), OBJ (obj_*.js), lessons (ws, notes) from the hub. */
function SPUI(app,env){
  const sk=env.subKey,SUB=env.SUB,F=env.F,U=env.U;
  const SPD=(typeof SP!=="undefined"&&SP[sk])||{},OB=(typeof OBJ!=="undefined"&&OBJ[sk])||[];
  const KEY="hubsp.v1."+sk;
  const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const txt=s=>String(s==null?"":s).replace(/<br\s*\/?>/gi,"\n").replace(/<\/(p|li|div|tr)>/gi,"\n").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/[ \t]+\n/g,"\n").replace(/\n{2,}/g,"\n").trim();
  const LES=[];U.forEach(u=>u.lessons.forEach(l=>LES.push(l)));
  const lesBy=k=>LES.find(l=>l.key===k);
  const SUBS=[];OB.forEach(t=>t.subs.forEach(s=>SUBS.push({t,s,n:s.n})));
  const accent=sk==="chem"?"B5502D":"2E7D32";
  const RES={
    bio:[["BBC Bitesize (GCSE Biology)","bbc.co.uk/bitesize","Short revision articles, diagrams and quizzes that match each topic."],["Khan Academy","khanacademy.org","Guided videos and practice on cells, enzymes, transport, genetics and ecology."],["PhET Simulations","phet.colorado.edu","Interactive simulations for diffusion, osmosis, natural selection and gene expression."],["Learn.Genetics (University of Utah)","learn.genetics.utah.edu","Clear animations of DNA, inheritance, cells and genetic technology."],["FuseSchool on YouTube","youtube.com/user/fuseschool","Animated 3-minute explanations of key biology ideas."],["Save My Exams","savemyexams.com","Revision notes and exam-style questions arranged by syllabus topic."],["Cambridge International syllabus page","cambridgeinternational.org","The official syllabus, past papers and mark schemes for your course."]],
    chem:[["BBC Bitesize (GCSE Chemistry)","bbc.co.uk/bitesize","Short revision articles, diagrams and quizzes that match each topic."],["PhET Simulations","phet.colorado.edu","Interactive models for atoms, molecules, gas laws, reactions and pH."],["Khan Academy","khanacademy.org","Guided lessons and practice on bonding, stoichiometry, equilibrium and energetics."],["Royal Society of Chemistry","rsc.org/periodic-table","An interactive periodic table for trends, electron arrangements and uses."],["FuseSchool on YouTube","youtube.com/user/fuseschool","Animated 3-minute explanations of bonding, reactions and electrolysis."],["Save My Exams","savemyexams.com","Revision notes and exam-style questions arranged by syllabus topic."],["Cambridge International syllabus page","cambridgeinternational.org","The official syllabus, past papers and mark schemes for your course."]]
  };
  RES.alevel=RES.bio;
  const dflt={school:(window.HUBSET&&HUBSET.get().teacher.school)||"Lusaka Oaktree School",title:SUB.name+" Study Pack",sub:"Interactive Weekly Learning & Active Revision",level:SUB.level+" "+SUB.name+" "+SUB.code,year:"2026 - 2027",sem:"1",time:"11 Weeks + Review",who:"Parents & Students at Home",edition:"Edition: Cambridge-style worksheets with command words, mark allocations and data-based questions",res:true,key:true,pic:true,rows:Array.from({length:11},()=>({les:[],subs:[],manual:false}))};
  let st;try{st=Object.assign({},dflt,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){st=Object.assign({},dflt)}
  if(!HUB.teacher)st.key=false;
  if(!Array.isArray(st.rows)||!st.rows.length)st.rows=dflt.rows;
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
  const tok=s=>new Set(txt(s).toLowerCase().split(/[^a-z]+/).filter(w=>w.length>3));
  function guessSubs(l){
    const t=OB.find(x=>x.t===String(l.u.n));if(!t)return [];
    const lt=tok(l.t);let best=null,bs=0;
    t.subs.forEach(s=>{const sn=tok(s.name);let c=0;lt.forEach(w=>{if(sn.has(w))c++});if(c>bs){bs=c;best=s}});
    if(best)return [best.n];
    return [t.subs[Math.min(l.idx,t.subs.length-1)].n];
  }
  const syncSubs=r=>{if(r.manual)return;const a=[];r.les.forEach(k=>{const l=lesBy(k);if(l)guessSubs(l).forEach(n=>{if(!a.includes(n))a.push(n)})});r.subs=a};
  const subObj=r=>{const o=[];r.subs.forEach(n=>{const x=SUBS.find(y=>y.n===n);if(x)x.s.obj.forEach(z=>{if(!z[2]||true)o.push(txt(z[1]))})});return o};
  const wkTitle=r=>{const ls=r.les.map(lesBy).filter(Boolean);if(!ls.length)return "";if(ls.length===1)return txt(ls[0].t).toUpperCase();const us=new Set(ls.map(l=>l.u.n));return us.size===1?txt(ls[0].u.name).toUpperCase():ls.map(l=>txt(l.t)).join(" & ").toUpperCase()};
  const msg=m=>{const e=document.getElementById("sp-msg");if(e)e.textContent=m||""};
  /* ---------- page ---------- */
  const lesSel=()=>`<select data-addl><option value="">Add a lesson…</option>${U.map(u=>`<optgroup label="${esc("Topic "+u.n+": "+txt(u.name))}">${u.lessons.map(l=>`<option value="${l.key}">${l.no} ${esc(txt(l.t))}</option>`).join("")}</optgroup>`).join("")}</select>`;
  const subSel=()=>`<select data-adds><option value="">Add objectives from a sub-topic…</option>${OB.map(t=>`<optgroup label="${esc(t.t+". "+t.name)}">${t.subs.map(s=>`<option value="${s.n}">${s.n} ${esc(s.name)}</option>`).join("")}</optgroup>`).join("")}</select>`;
  function html(){
    let h=`<h1 class="ltitle">Study packs</h1><p class="lsum">Build a printed weekly pack for parents and students: banner, Cambridge objectives, four key ideas, a figure, a home activity and a Cambridge-style worksheet, with a resources page and an optional answer key. Choose the lessons for each week; the objectives follow automatically.</p>
<div class="ov-card"><div class="ov-grid">
<label>School<input data-f="school" value="${esc(st.school)}"></label><label>Pack title<input data-f="title" value="${esc(st.title)}"></label>
<label>Subtitle<input data-f="sub" value="${esc(st.sub)}"></label><label>Course line<input data-f="level" value="${esc(st.level)}"></label>
<label>Academic year<input data-f="year" value="${esc(st.year)}"></label><label>Semester<select data-f="sem"><option${st.sem==="1"?" selected":""}>1</option><option${st.sem==="2"?" selected":""}>2</option></select></label>
<label>Teaching time<input data-f="time" value="${esc(st.time)}"></label><label>Designed for<input data-f="who" value="${esc(st.who)}"></label>
<label style="grid-column:1/-1">Edition line<input data-f="edition" value="${esc(st.edition)}"></label></div>
<div class="row" style="gap:14px;flex-wrap:wrap;margin-top:8px"><label class="inl"><input type="checkbox" data-c="res"${st.res?" checked":""}> Resources page</label><label class="inl"><input type="checkbox" data-c="pic"${st.pic?" checked":""}> Figure for each week</label>${HUB.teacher?`<label class="inl"><input type="checkbox" data-c="key"${st.key?" checked":""}> Answer key at the end</label>`:""}</div>
<div class="row" style="gap:10px;flex-wrap:wrap;margin-top:10px"><label class="inl">Fill weeks with one lesson each, starting at ${lesSel().replace("data-addl","id=\"sp-first\"").replace("Add a lesson…","First lesson…")}</label><button class="btn" type="button" data-act="auto">Fill weeks automatically</button><button class="btn sm" type="button" data-act="addw">Add a week</button><button class="btn sm" type="button" data-act="remw">Remove last week</button><button class="btn sm" type="button" data-act="clear">Clear all weeks</button></div></div><div id="sp-weeks">`;
    st.rows.forEach((r,i)=>{
      const ls=r.les.map(lesBy).filter(Boolean),tot=ls.reduce((a,l)=>a+l.ws.reduce((x,q)=>x+q[2],0),0);
      h+=`<section class="ov-w" data-i="${i}"><div class="ov-h"><b>Week ${i+1}</b><span>${esc(wkTitle(r)||"choose lessons")}</span>${ls.length?`<span class="mo">${tot} worksheet marks</span>`:""}<span class="ov-mv"><button class="btn sm" type="button" data-act="up" aria-label="Move week up">↑</button><button class="btn sm" type="button" data-act="down" aria-label="Move week down">↓</button></span></div>
<div class="ov-b">${r.les.map(k=>{const l=lesBy(k);return `<span class="ov-chip">${l?l.no+" "+esc(txt(l.t)):k}<button type="button" data-rl="${k}" aria-label="Remove">×</button></span>`}).join("")}${lesSel()}</div>
<div class="ov-b">${r.subs.map(n=>{const x=SUBS.find(y=>y.n===n);return `<span class="ov-chip" style="background:var(--surface)">${n} ${esc(x?x.s.name:"")}<button type="button" data-rs="${n}" aria-label="Remove">×</button></span>`}).join("")}${subSel()}</div></section>`;
    });
    h+=`</div><div class="ov-card" style="margin-top:18px"><div class="row" style="gap:10px;flex-wrap:wrap"><button class="btn pri" type="button" data-act="docx">Download Word (.docx)</button><button class="btn" type="button" data-act="pdf">Download PDF</button><span class="meta" id="sp-msg" aria-live="polite"></span></div><p class="meta" style="margin:8px 0 0">The key ideas and home activities are written for this hub and the objectives follow the Cambridge syllabus; check them before issuing a pack. Resource links are printed as text.</p></div>`;
    return h;
  }
  const paint=keep=>{const y=window.scrollY;app.innerHTML=html();if(keep)window.scrollTo(0,y)};
  /* ---------- figure ---------- */
  const imgInfo=u=>new Promise(res=>{const im=new Image();im.onload=()=>res({dataUrl:u,w:im.naturalWidth,h:im.naturalHeight});im.onerror=()=>res(null);im.src=u});
  async function figureOf(l){
    const keys=[];(l.notes||"").replace(/\{\{(\w+)\}\}/g,(m,k)=>{keys.push(k);return ""});
    for(const k of keys){
      try{const f=typeof FIGS!=="undefined"&&FIGS[k]?FIGS[k]():"";if(!f)continue;
        const d=document.createElement("div");d.innerHTML=f;const cap=(d.querySelector("figcaption")||{}).textContent||"";
        const im=d.querySelector("img");if(im&&/^data:/.test(im.getAttribute("src")||"")){const r=await imgInfo(im.getAttribute("src"));if(r)return{r,cap,w:62}}
        const sv=d.querySelector("svg");if(sv){const r=await HUBDOC.svgToPng(sv,720);return{r:{dataUrl:r.dataUrl,w:r.w,h:r.h},cap,w:52}}
      }catch(e){}
    }
    return null;
  }
  /* ---------- model ---------- */
  async function model(){
    const B=[];
    const lg=await imgInfo(ASSESS_LOGO);if(lg)B.push({t:"img",dataUrl:lg.dataUrl,w:lg.w,h:lg.h,widthPct:20});
    B.push({t:"p",text:st.school.toUpperCase(),bold:1,size:19,align:"center",color:"6B4A2A"});
    B.push({t:"p",text:st.title.toUpperCase(),bold:1,size:26,align:"center",color:accent});
    B.push({t:"p",text:st.sub,bold:1,size:11,align:"center",color:"000000"});
    B.push({t:"p",text:st.level+" · Semester "+st.sem,bold:1,size:11,align:"center",color:"000000"});
    B.push({t:"p",text:" ",size:8});
    B.push({t:"box",fill:"F2F2F2",bar:"000000",text:"Academic Year: "+st.year+"\nTeaching Time: "+st.time+"\nDesigned for: "+st.who+(st.edition?"\n**"+st.edition+"**":"")});
    if(st.res){
      B.push({t:"pb"});
      B.push({t:"band",text:"HELPFUL RESOURCES HUB",fill:accent,size:14});
      B.push({t:"p",text:"Welcome to the "+st.school+" "+SUB.name+" Study Pack! Use these trusted sites whenever an idea needs a picture, a simulation or a second explanation. Open the sites in your browser."});
      B.push({t:"table",head:["RESOURCE HUB / LINK","RECOMMENDED USAGE & FOCUS"],rows:(RES[sk]||[]).map(r=>[["§"+r[0],r[1]],r[2]]),widths:[36,64],fontSize:10,headFill:accent,headColor:"FFFFFF",gridColor:"000000",accent:"000000"});
    }
    const answers=[];
    for(let i=0;i<st.rows.length;i++){
      const r=st.rows[i],ls=r.les.map(lesBy).filter(Boolean);if(!ls.length)continue;
      B.push({t:"pb"});
      B.push({t:"band",text:"WEEK "+(i+1)+": "+wkTitle(r),fill:accent,size:14});
      const ob=subObj(r);
      if(ob.length)B.push({t:"box",fill:"F2F2F2",bar:accent,title:"CAMBRIDGE OBJECTIVES IN FULL:",items:ob});
      /* key ideas */
      const keys=[];for(let k=0;k<4;k++)ls.forEach(l=>{const d=SPD[l.no];if(d&&d.k[k]&&keys.length<4&&(ls.length===1||k<Math.ceil(4/ls.length)))keys.push(d.k[k])});
      for(let k=0;keys.length<4&&k<4;k++)ls.forEach(l=>{const d=SPD[l.no];if(d&&d.k[k]&&keys.length<4&&!keys.includes(d.k[k]))keys.push(d.k[k])});
      if(keys.length){const cell=k=>keys[k]?["§★ "+txt(keys[k][0]),txt(keys[k][1])]:[""];
        B.push({t:"table",rows:[[cell(0),cell(1)],[cell(2),cell(3)]],widths:[1,1],fontSize:10.5,rowFill:"F7F7F7",accent:accent})}
      if(st.pic){const fg=await figureOf(ls.find(l=>/\{\{/.test(l.notes||""))||ls[0]);if(fg){B.push({t:"img",dataUrl:fg.r.dataUrl,w:fg.r.w,h:fg.r.h,widthPct:fg.w,caption:"Figure "+(i+1)+".1: "+txt(fg.cap)})}}
      const home=ls.map(l=>SPD[l.no]&&SPD[l.no].h).find(Boolean);
      if(home)B.push({t:"box",fill:"FFF3D6",bar:"E0A030",title:"PARENT PARTNERSHIP GUIDE & HOME ACTIVITY:",text:"**Active Learning Task: "+txt(home[0])+"**\n"+txt(home[1])});
      B.push({t:"p",text:"CAMBRIDGE-STYLE PRACTICE WORKSHEET",bold:1,size:12,color:"000000"});
      let qn=0;const key=[];
      ls.forEach(l=>l.ws.forEach(q=>{qn++;B.push({t:"p",text:"**Q"+qn+".** "+txt(q[0])+"  **["+q[2]+"]**"});B.push({t:"lines",n:Math.max(1,Math.min(5,q[2])),indent:280});key.push("Q"+qn+" ["+q[2]+"]: "+txt(q[1]))}));
      answers.push([i+1,key]);
    }
    if(st.key&&answers.length){
      B.push({t:"pb"});B.push({t:"band",text:"ANSWER KEY (for parents and teachers)",fill:accent,size:14});
      answers.forEach(([w,k])=>{B.push({t:"p",text:"**Week "+w+"**",size:11,color:accent});B.push({t:"ul",items:k})});
    }
    return {title:"",footer:st.school+" · "+st.title,font:"Times New Roman",blocks:B};
  }
  const slug=s=>String(s||"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"");
  async function exportDoc(fmt,btn){
    const old=btn.textContent;btn.disabled=true;btn.textContent="Preparing...";
    try{if(!st.rows.some(r=>r.les.length)){msg("Choose at least one lesson first.");btn.disabled=false;btn.textContent=old;return}
      const m=await model();const data=fmt==="docx"?await HUBDOC.docx(m):await HUBDOC.pdf(m);
      const r=await env.saveFile(slug(SUB.name)+"-study-pack-S"+st.sem+"."+fmt,data);msg(r==="saved"?"File saved.":r==="declined"?"":"Could not save the file.")}
    catch(e){console.error(e);msg("Something went wrong. Try again.")}
    btn.disabled=false;btn.textContent=old;
  }
  /* ---------- events ---------- */
  paint();
  app.onchange=e=>{
    const t=e.target,w=t.closest(".sp-w,.ov-w"),i=w&&w.dataset.i!=null?+w.dataset.i:-1;
    if(t.dataset.f){st[t.dataset.f]=t.value;persist();return}
    if(t.dataset.c){st[t.dataset.c]=t.checked;persist();return}
    if(i<0)return;const r=st.rows[i];
    if(t.matches("[data-addl]")&&t.value){if(!r.les.includes(t.value))r.les.push(t.value);r.les.sort((a,b)=>LES.indexOf(lesBy(a))-LES.indexOf(lesBy(b)));syncSubs(r);persist();paint(true)}
    else if(t.matches("[data-adds]")&&t.value){r.manual=true;if(!r.subs.includes(t.value)){r.subs.push(t.value);r.subs.sort((a,b)=>SUBS.findIndex(x=>x.n===a)-SUBS.findIndex(x=>x.n===b))}persist();paint(true)}
  };
  app.onclick=e=>{
    const b=e.target.closest("button");if(!b)return;
    const w=b.closest(".ov-w"),i=w?+w.dataset.i:-1,r=i>=0?st.rows[i]:null;
    if(b.dataset.rl){r.les=r.les.filter(k=>k!==b.dataset.rl);syncSubs(r);persist();paint(true);return}
    if(b.dataset.rs){r.manual=true;r.subs=r.subs.filter(n=>n!==b.dataset.rs);persist();paint(true);return}
    const a=b.dataset.act;if(!a)return;
    if(a==="up"&&i>0){[st.rows[i-1],st.rows[i]]=[st.rows[i],st.rows[i-1]];persist();paint(true)}
    else if(a==="down"&&i<st.rows.length-1){[st.rows[i+1],st.rows[i]]=[st.rows[i],st.rows[i+1]];persist();paint(true)}
    else if(a==="addw"){st.rows.push({les:[],subs:[],manual:false});persist();paint(true)}
    else if(a==="remw"){if(st.rows.length>1){st.rows.pop();persist();paint(true)}}
    else if(a==="clear"){st.rows=st.rows.map(()=>({les:[],subs:[],manual:false}));persist();paint(true)}
    else if(a==="auto"){const f=document.getElementById("sp-first").value;let k=Math.max(0,LES.findIndex(l=>l.key===f));st.rows.forEach(r=>{const l=LES[k];r.manual=false;if(l){r.les=[l.key];k++}else r.les=[];syncSubs(r)});persist();paint(true)}
    else if(a==="docx"||a==="pdf")exportDoc(a,b);
  };
}
