/* assess.js - Assessment generator (bi-weekly tests and formative assessments) in the school's paper layout.
   ASSESSUI(app,{SUB,U,S,subKey,F,plain,saveFile}) */
const ASSESS_TYPES={sum:{label:"Summative assessment",marks:100,mcq:40,single:0,mins:120,qSize:10,cap:15,pref:0.9},bi:{label:"Bi-weekly test",marks:25,mcq:0,single:9,mins:40,qSize:6,cap:8,pref:0.25},form:{label:"Formative assessment",marks:40,mcq:10,single:0,mins:60,qSize:8,cap:12,pref:0.5}};
const ASSESS_NUMS=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
function ASSESSUI(app,env){
  const U=env.U,SUB=env.SUB,sk=env.subKey,F=env.F;
  const KEY="hubassess.v3."+sk;
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}};
  const save=o=>{try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}};
  const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const strip=h=>String(h==null?"":h).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
  const st=Object.assign({type:"form",school:(window.HUBSET&&HUBSET.get().teacher.school)||"Lusaka Oaktree School",cls:"",num:1,total:40,nMcq:10,mins:60,units:[],unitsSet:false,off:[],avoid:true,crest:!(window.HUBSET&&HUBSET.get().assess&&HUBSET.get().assess.crest===false),calc:!(window.HUBSET&&HUBSET.get().assess&&HUBSET.get().assess.calc===false),mats:"",pt:!!(window.HUBSET&&HUBSET.get().assess&&HUBSET.get().assess.ptDefault),seed:1,used:{}},load());
  let paper=null,adjOpen=false;
  const SHORT=SUB.officialName.replace(/^Cambridge\s+(International\s+)?/,"").replace(/\s+\d{4}$/,"").replace(/^IGCSE\s+/,"").replace(/^AS and A Level\s+/,"");
  const pts=ms=>(ms||[]).reduce((a,s)=>{const m=String(s).match(/\((\d)\)/g);return a+(m?m.reduce((x,y)=>x+ +y[1],0):1)},0);
  function rngF(seed){let a=(seed>>>0)||1;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  const shuf=(arr,r)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const lessonOn=(u,j)=>!st.off.includes(u.n+"-"+(j+1));
  const unitOn=u=>st.units.includes(u.n);
  const unitName=n=>{const u=U.find(x=>x.n===n);return u?strip(F(u.name)):""};
  const titleName=()=>(ASSESS_TYPES[st.type].label+(st.num?" "+ASSESS_NUMS[st.num]:"")).toUpperCase();
  const durText=()=>st.mins%60===0?(st.mins/60)+"HR":st.mins+" MINUTES";
  const clsText=()=>(st.cls||"").toUpperCase();
  /* ---------- banks ---------- */
  /* summative papers use real past-paper questions only (no generated questions or diagrams) */
  const PPONLY=()=>st.type==="sum";
  function ppMcq(p,u,i){
    const d=document.createElement("div");d.innerHTML=p.q;
    const kids=[...d.children];let at=-1;
    kids.forEach((c,k)=>{if(at<0){const b=c.querySelector&&c.querySelector("b");if(b&&c.firstElementChild===b&&/^A$/.test(b.textContent.trim()))at=k}});
    if(at<1)return null;
    const rest=kids.slice(at);if(rest.some(c=>c.querySelector("img,svg,table")))return null;
    const html=rest.map(c=>c.innerHTML).join(" ");
    const parts=html.split(/<b>\s*([ABCD])\s*<\/b>/);
    if(parts.length!==9||parts[1]!=="A"||parts[3]!=="B"||parts[5]!=="C"||parts[7]!=="D")return null;
    const o=[2,4,6,8].map(k=>parts[k].replace(/&nbsp;/g," ").trim());
    if(o.some(t=>!t))return null;
    const key=(p.ms||[]).map(String).map(t=>/^Answer:\s*([ABCD])\b[^-]*-?\s*(.*)$/.exec(t)).find(Boolean);
    if(!key)return null;
    kids.slice(at).forEach(c=>c.remove());
    return {id:"e:"+u.n+":"+i,kind:"mcq",u:u.n,q:d.innerHTML,o,a:"ABCD".indexOf(key[1]),e:key[2],marks:1,fixed:true,pp:true};
  }
  const looksMcq=p=>/<b>\s*A\s*<\/b>/.test(p.q)&&/<b>\s*B\s*<\/b>/.test(p.q)&&/<b>\s*D\s*<\/b>/.test(p.q);
  function bank(){
    const mcq=[],str=[];
    if(PPONLY()){
      U.forEach(u=>{
        if(!unitOn(u))return;
        (u.pp||[]).forEach((p,i)=>{
          if(!/^Cambridge/.test(String(p.src||"")))return;
          if((String(p.q).match(/<img/g)||[]).length>2)return; /* diagrams cut into many pieces cannot be laid out faithfully */
          if(looksMcq(p)){const m=ppMcq(p,u,i);if(m)mcq.push(m);return}
          const m=pts(p.ms);if(m>0)str.push({id:"e:"+u.n+":"+i,kind:"pp",u:u.n,q:p.q,ms:p.ms,marks:m});
        });
      });
      return {mcq,str};
    }
    U.forEach(u=>{
      if(!unitOn(u))return;
      const all=(u.lessons||[]).every((l,j)=>lessonOn(u,j));
      if(all)(u.quiz||[]).forEach((x,i)=>{
        if(x.o&&x.o.length===4)mcq.push({id:"q:"+u.n+":"+i,kind:"mcq",u:u.n,q:x.q,o:x.o,a:x.a,e:x.e,marks:1});
        else if(x.t==="num"||x.a!==undefined)str.push({id:"q:"+u.n+":"+i,kind:x.t==="num"?"num":"short",u:u.n,q:x.q,a:x.a,unit:x.u,e:x.e,marks:1});
      });
      (u.lessons||[]).forEach((l,j)=>{
        if(!lessonOn(u,j))return;const k=u.n+"-"+(j+1);
        (l.pr||[]).forEach((x,i)=>{
          if(x.t==="mcq"&&x.o&&x.o.length===4)mcq.push({id:"p:"+k+":"+i,kind:"mcq",u:u.n,q:x.q,o:x.o,a:x.a,e:x.e,marks:1});
          else if(x.t==="num")str.push({id:"p:"+k+":"+i,kind:"num",u:u.n,q:x.q,a:x.a,unit:x.u,e:x.e,marks:1});
          else if(x.a!==undefined&&x.t!=="mcq")str.push({id:"p:"+k+":"+i,kind:"short",u:u.n,q:x.q,a:x.a,e:x.e,marks:1});
        });
        (l.ws||[]).forEach((x,i)=>str.push({id:"w:"+k+":"+i,kind:"ws",u:u.n,q:x[0],ms:x[1],marks:x[2]||1}));
      });
      (u.pp||[]).forEach((p,i)=>{const m=pts(p.ms);if(m>0)str.push({id:"e:"+u.n+":"+i,kind:"pp",u:u.n,q:p.q,ms:p.ms,marks:m})});
    });
    return {mcq,str};
  }
  /* ---------- generation ---------- */
  const usedSet=()=>st.avoid?new Set(Object.keys(st.used||{})):new Set();
  const qMarks=q=>q.items.reduce((a,x)=>a+x.marks,0);
  /* compose one numbered Section B question from the pool of one topic */
  function compose(u,target,pool,r,T,wantPP){
    const mine=pool.filter(x=>x.u===u);
    if(wantPP){
      const c=mine.filter(x=>x.kind==="pp"&&x.marks<=Math.min(T.cap,target)&&x.marks>=Math.min(target,3));
      if(c.length){const x=c[0];return {u,kind:"pp",items:[x]}}
    }
    const parts=mine.filter(x=>x.kind!=="pp");
    const items=[];let sum=0;const goal=Math.min(target,T.qSize);
    for(const x of parts){if(sum>=goal)break;if(sum+x.marks<=target){items.push(x);sum+=x.marks}}
    if(!items.length){const c=mine.filter(x=>x.kind==="pp"&&x.marks<=target);if(c.length)return {u,kind:"pp",items:[c[0]]};return null}
    return {u,kind:"group",items};
  }
  function build(){
    const T=ASSESS_TYPES[st.type],r=rngF(st.seed*7919+13);
    const {mcq,str}=bank();const used=usedSet();
    const order=arr=>shuf(arr.filter(x=>!used.has(x.id)),r).concat(shuf(arr.filter(x=>used.has(x.id)),r));
    const units=[...new Set(mcq.map(x=>x.u))];const byU={};units.forEach(n=>byU[n]=order(mcq.filter(x=>x.u===n)));
    const A=[];const nA=st.type==="bi"?0:Math.max(0,Math.min(st.nMcq,st.total));
    let g=0;while(A.length<nA&&g++<5000){let mv=false;for(const n of shuf(units,r)){if(A.length>=nA)break;const x=byU[n].shift();if(x){x.ord=x.fixed?[0,1,2,3]:shuf([0,1,2,3],r);A.push(x);mv=true}}if(!mv)break}
    let remain=Math.max(0,st.total-A.length);
    const pool=order(str);const taken=new Set();const B=[];
    const sUnits=[...new Set(str.map(x=>x.u))];
    if(T.single>0){
      let goal=Math.min(T.single,remain),got=0,g3=0;
      const smalls={};sUnits.forEach(n=>smalls[n]=pool.filter(x=>x.u===n&&x.kind!=="pp"&&x.marks<=2));
      while(got<goal&&g3++<400){let mv=false;
        for(const n of shuf(sUnits,r)){if(got>=goal)break;const i=smalls[n].findIndex(x=>x.marks<=goal-got&&!taken.has(x.id));
          if(i>=0){const x=smalls[n].splice(i,1)[0];taken.add(x.id);B.push({u:n,kind:"single",items:[x]});got+=x.marks;remain-=x.marks;mv=true}}
        if(!mv)break}
    }
    let g2=0;
    while(remain>0&&g2++<400){
      let mv=false;
      for(const n of shuf(sUnits,r)){
        if(remain<=0)break;
        const q=compose(n,remain,pool.filter(x=>!taken.has(x.id)),r,T,r()<T.pref);
        if(q){q.items.forEach(x=>taken.add(x.id));B.push(q);remain-=qMarks(q);mv=true}
      }
      if(!mv)break;
    }
    /* top up: add leftover short parts to the last group questions if marks remain */
    if(remain>0){
      for(const q of B){if(remain<=0)break;if(q.kind!=="group")continue;
        for(const x of pool){if(remain<=0)break;if(taken.has(x.id)||x.u!==q.u||x.kind==="pp"||x.marks>remain)continue;q.items.push(x);taken.add(x.id);remain-=x.marks}}
    }
    B.sort((a,b)=>(a.kind==="single"?0:1)-(b.kind==="single"?0:1)||(+a.u)-(+b.u));
    return {A,B,short:remain};
  }
  const totalOf=p=>p.A.length+p.B.reduce((a,q)=>a+qMarks(q),0);
  const L="ABCD",PL="abcdefghijklmnop";
  /* ---------- learner paper HTML ---------- */
  const dots=n=>`<div class="as-dots">${"<i></i>".repeat(n)}</div>`;
  function optsHTML(x){
    const opts=x.ord.map((k,i)=>({l:L[i],t:F(x.o[k])}));
    const short=false;
    return `<div class="as-opts${short?" row":""}">${opts.map(o=>`<div class="as-opt"><b>${o.l}</b><span>${o.t}</span></div>`).join("")}</div>`;
  }
  function partHTML(x,i,multi){
    const lead=multi?`<span class="as-pl">(${PL[i]})</span>`:"";
    let ans;
    if(x.kind==="num")ans=`<div class="as-eq">answer = ........................ ${x.unit?F(x.unit):""}</div>`;
    else if(x.kind==="short")ans=dots(1);
    else ans=dots(Math.min(8,Math.max(1,x.marks)));
    return `<div class="as-part">${lead}<div class="as-pb2"><div>${F(x.q)}</div>${ans}</div><span class="as-m">[${x.marks}]</span></div>`;
  }
  /* ---------- answer sheet, instructions and per-paper helpers (v2.1) ---------- */
  const AS=()=>(window.HUBSET&&HUBSET.get().assess)||{};
  const LOGOX0=()=>AS().logo||ASSESS_LOGO;
  const TD=ty=>Object.assign({},ASSESS_TYPES[ty],((AS().defs||{})[ty])||{});
  const xesc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const bMarks=()=>paper.B.reduce((a,q)=>a+qMarks(q),0);
  const sheetOn=()=>st.type!=="bi"&&paper.A.length>0&&AS().sheet!==false;
  function partsList(){
    if(st.type==="sum")return [paper.A.length?{kind:"mcq"}:null,paper.B.length?{kind:"struct"}:null].filter(Boolean);
    if(st.type==="form")return [{kind:"both"}];
    return [{kind:"struct"}];
  }
  const partMarks=p=>p.kind==="mcq"?paper.A.length:p.kind==="struct"?bMarks():totalOf(paper);
  const partMins=p=>{if(st.type!=="sum"||partsList().length<2)return st.mins;const m=Math.round(st.mins*partMarks(p)/Math.max(1,totalOf(paper))/5)*5;return Math.max(20,m)};
  const dur=m=>m%60===0?(m/60)+"HR":m+" MINUTES";
  const partTitle=p=>st.type==="sum"?(p.kind==="mcq"?(AS().compMcq||"Paper 1")+": MULTIPLE CHOICE":(AS().compStruct||"Paper 2")+": STRUCTURED QUESTIONS"):"";
  const compLabel=p=>st.type==="sum"?(p.kind==="mcq"?(AS().compMcq||"Paper 1"):(AS().compStruct||"Paper 2")):(st.type==="form"?"Section A":"");
  function instr(p){
    const a=AS(),pt=sk==="chem"&&st.pt,tok=t=>t.replace(/\{N\}/g,paper.A.length).replace(/\{TOTAL\}/g,partMarks(p));
    const custom=(p.kind==="mcq"?a.instrMcq:p.kind==="struct"?a.instrStruct:((a.instrMcq||"")+"\n"+(a.instrStruct||"")).trim())||"";
    if(custom.trim()){return {lines:custom.split(/\n+/).map(x=>x.trim()).filter(Boolean).map(tok).map(xesc),info:[]}}
    const calc=st.calc!==false?["You may use a calculator."]:["You are not allowed to use a calculator."];
    const ptl=pt?["The Periodic Table is printed at the end of this paper."]:[];
    if(st.type==="sum"){
      const first="Write your name, the date, and your teacher’s name in the boxes at the top of the page.";
      if(p.kind==="mcq")return {lines:[first,"There are "+paper.A.length+" questions on this paper. Answer all questions.","For each question there are four possible answers A, B, C and D. Choose the one you consider correct and record your choice in soft pencil on the multiple choice answer sheet.","Follow the instructions on the multiple choice answer sheet.","Do not use correction fluid."].concat(calc),info:["The total mark for this paper is "+partMarks(p)+".","Each correct answer will score one mark.","Any rough working should be done on this question paper."].concat(ptl)};
      return {lines:[first,"Answer all questions.","Write your answer to each question in the space provided.","You should show all your working on the question paper.","Use a black or dark blue pen. You may use an HB pencil for any diagrams or graphs."].concat(calc),info:["The total mark for this paper is "+partMarks(p)+".","The number of marks for each question or part question is shown in brackets [ ]."].concat(ptl)};
    }
    if(p.kind==="mcq")return {lines:["Write your centre number, candidate number and name on the answer sheet in the spaces provided unless this has been done for you.","There are "+paper.A.length+" questions on this paper. Answer all questions.","For each question there are four possible answers A, B, C and D. Choose the one you consider correct and record your choice in soft pencil on the multiple choice answer sheet.","Follow the instructions on the multiple choice answer sheet.","Do not use correction fluid."].concat(calc),info:["The total mark for this paper is "+partMarks(p)+".","Each correct answer will score one mark.","Any rough working should be done on this question paper."].concat(ptl)};
    const struct=["Answer all questions.","Use a black or dark blue pen. You may use an HB pencil for any diagrams or graphs.","Write your name and class in the space provided at the top of the page.","Write your answer to each question in the space provided.","Do not use an erasable pen or correction fluid."].concat(calc,["You should show all the steps in your calculations."]);
    if(p.kind==="struct")return {lines:struct,info:["The total mark for this paper is "+partMarks(p)+".","The number of marks for each question or part question is shown in brackets [ ]."].concat(ptl)};
    return {lines:["There are two sections in this paper, <b>A</b> and <b>B</b>.","Section A: for each question there are four possible answers A, B, C and D. Choose the one you consider correct and record your choice in soft pencil on the multiple choice answer sheet."+(sheetOn()?"":" (Use the answer grid.)")].concat(struct.slice(0,1),["Section B: write your answer to each question in the space provided.","Use a black or dark blue pen for Section B. You may use an HB pencil for any diagrams or graphs.","Write your name and class in the space provided at the top of the page.","Do not use an erasable pen or correction fluid."],calc,["You should show all the steps in your calculations."]),info:["The total mark for this paper is "+partMarks(p)+".","Each correct answer in Section A scores one mark.","The number of marks for each question or part question in Section B is shown in brackets [ ]."].concat(ptl)};
  }
  const stripTags=s=>String(s).replace(/<[^>]+>/g,"").replace(/\*\*/g,"");
  /* the multiple-choice answer sheet, drawn as SVG; px=true gives a high-resolution version for export */
  function sheetSVG(px){
    const a=AS(),n=paper.A.length,nL=+a.letters===8?8:4,Ls="ABCDEFGH".slice(0,nL);
    const info={school:(st.school||"").toUpperCase(),title:titleName()+" - "+SHORT.toUpperCase(),code:String(SUB.code||""),comp:compLabel(partsList()[0]||{kind:"mcq"}),series:a.series||"",cls:(st.cls||""),centre:a.centre||""};
    let s=`<svg xmlns="http://www.w3.org/2000/svg" ${px?'width="1190" height="1684" ':''}viewBox="0 0 595 842" font-family="Arial, Helvetica, sans-serif"><rect width="595" height="842" fill="#fff"/><g fill="none" stroke="#000" stroke-width="0.9">`;
    const lab=(x,y,w,h,t,lw)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"/><text x="${x+6}" y="${y+h/2+3.4}" font-size="9.2" font-weight="700" fill="#000" stroke="none">${xesc(t)}</text>`;
    const val=(x,y,h,t,sz)=>t?`<text x="${x}" y="${y+h/2+3.6}" font-size="${sz||10}" fill="#000" stroke="none">${xesc(t)}</text>`:"";
    const boxes=(x,y,cnt,t)=>{let o="";for(let i=0;i<cnt;i++){o+=`<rect x="${x+i*20}" y="${y}" width="20" height="20"/>`+(t[i]?`<text x="${x+i*20+10}" y="${y+14}" font-size="11" text-anchor="middle" fill="#000" stroke="none">${xesc(t[i])}</text>`:"")}return o};
    let y=76;
    s+=lab(14,y,518,20,"Candidate name");y+=30;
    s+=lab(14,y,518,20,"Candidate signature");y+=30;
    s+=lab(14,y,90,20,"Centre number")+boxes(104,y,5,info.centre.toUpperCase().padEnd(5))+lab(250,y,92,20,"Candidate number")+boxes(342,y,4,"    ");y+=32;
    s+=lab(14,y,390,20,"Examination title")+val(108,y,20,info.title,9.2)+lab(412,y,120,20,"Class")+val(446,y,20,info.cls,9.5);y+=30;
    s+=lab(14,y,78,20,"Syllabus code")+boxes(92,y,4,info.code)+lab(178,y,88,20,"Component code")+`<rect x="266" y="${y}" width="84" height="20"/>`+val(271,y,20,info.comp,9.5)+lab(358,y,62,20,"Exam series")+`<rect x="420" y="${y}" width="112" height="20"/>`+val(424,y,20,info.series,9);y+=34;
    s+=`</g><text x="26" y="${y}" font-size="10" fill="#000">Supervisor:</text><text x="26" y="${y+11}" font-size="6.8" fill="#000">If the candidate is <tspan font-size="9">ABSENT</tspan> or has <tspan font-size="9">WITHDRAWN</tspan> shade here</text><rect x="236" y="${y+5}" width="14" height="5" fill="none" stroke="#000" stroke-width="0.9"/>`;
    y+=26;
    s+=`<rect x="7" y="${y}" width="525" height="19" fill="#000"/><text x="269" y="${y+14}" font-size="13.5" font-weight="700" fill="#fff" text-anchor="middle">Multiple-choice Answer Sheet</text>`;
    const top=y+40;
    /* instructions box */
    s+=`<rect x="20" y="${top}" width="146" height="${20*21.6}" rx="3" fill="#fff" stroke="#000" stroke-width="1.2"/><text x="93" y="${top+34}" font-size="16.5" font-weight="700" text-anchor="middle" fill="#000">Instructions</text><text x="93" y="${top+66}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#000">Use a soft pencil</text><text x="93" y="${top+78}" font-size="8" text-anchor="middle" fill="#000">(B or HB).</text>`;
    const para=(arr,yy)=>arr.map((t,i)=>`<text x="30" y="${yy+i*11.5}" font-size="8.6" fill="#000">${xesc(t)}</text>`).join("");
    s+=para(["Follow the instructions on","your question paper."],top+100)+para(["Make sure you put your","answer in line with the","correct question number."],top+136)+para(["Rub out any answer you","wish to change."],top+184);
    s+=`<text x="30" y="${top+240}" font-size="9" fill="#000">Example:</text>`+para(["For question 1, if you think B","is the right answer, fill in your","answer sheet like this:"],top+256);
    const ey=top+316;
    s+=`<rect x="26" y="${ey}" width="18" height="17" fill="none" stroke="#000" stroke-width="0.9"/><text x="35" y="${ey+12}" font-size="9" font-weight="700" text-anchor="middle" fill="#000">1</text><rect x="44" y="${ey}" width="116" height="17" fill="none" stroke="#000" stroke-width="0.9"/>`;
    for(let i=0;i<4;i++){const lx=56+i*27;s+=`<text x="${lx}" y="${ey+10}" font-size="8.4" font-weight="700" text-anchor="middle" fill="#000">${"ABCD"[i]}</text><rect x="${lx-6}" y="${ey+12}" width="12" height="2.6" fill="${i===1?"#000":"none"}" stroke="#000" stroke-width="0.7"/>`}
    s+=`<g transform="translate(112,${ey-26}) rotate(38)"><rect x="0" y="0" width="7" height="30" fill="#fff" stroke="#000" stroke-width="0.9"/><polygon points="0,30 7,30 3.5,38" fill="#000"/><rect x="0" y="0" width="7" height="5" fill="#000"/></g>`;
    /* answer rows */
    const ncols=n<=40?2:3,rows=20,rh=21.6,lw=ncols===2?(nL===8?13.5:26):(nL===8?10:20),colW=24+nL*lw+6,gapx=ncols===2?(nL===8?42:70):12;
    const x0=ncols===2?Math.round((532-(2*colW+gapx)+190)/2+20):186;
    for(let c=0;c<ncols;c++)for(let r=0;r<rows;r++){
      const q=c*rows+r+1;if(q>n)break;
      const x=x0+c*(colW+gapx),yy=top+r*rh;
      s+=`<rect x="${x}" y="${yy}" width="24" height="${rh}" fill="none" stroke="#000" stroke-width="0.9"/><text x="${x+12}" y="${yy+14.6}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#000">${q}</text><rect x="${x+24}" y="${yy}" width="${nL*lw+6}" height="${rh}" fill="none" stroke="#000" stroke-width="0.9"/>`;
      for(let i=0;i<nL;i++){const lx=x+24+3+lw/2+i*lw;s+=`<text x="${lx}" y="${yy+11.6}" font-size="${ncols===2?10:9}" font-weight="700" text-anchor="middle" fill="#000">${Ls[i]}</text><rect x="${lx-Math.min(6,lw/2-1.2)}" y="${yy+14.6}" width="${Math.min(12,lw-2.4)}" height="2.6" fill="none" stroke="#000" stroke-width="0.7"/>`}
    }
    /* header and footer with the school crest */
    if(st.crest)s+=`<image href="${LOGOX0()}" x="14" y="6" width="62" height="62" preserveAspectRatio="xMinYMid meet"/>`;
    s+=`<text x="${st.crest?84:14}" y="30" font-size="15" font-weight="700" fill="#000">${xesc(info.school)}</text><text x="${st.crest?84:14}" y="46" font-size="10.5" fill="#000">Multiple-Choice Answer Sheet</text><text x="532" y="46" font-size="9" font-weight="700" text-anchor="end" fill="#000">${xesc(titleName())}</text>`;
    s+=`<line x1="7" y1="808" x2="532" y2="808" stroke="#000" stroke-width="0.8"/><text x="7" y="822" font-size="8" font-weight="700" fill="#000">Multiple-Choice Answer Sheet</text><text x="532" y="822" font-size="8" font-weight="700" text-anchor="end" fill="#000">${xesc(info.school)}</text></svg>`;
    return s;
  }
  const sheetURL=()=>"data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(sheetSVG(true))));
  function pageNo(){return ""}
  const durLong=m=>m<60?m+" minutes":(m%60===0?(m/60)+(m===60?" hour":" hours"):Math.floor(m/60)+" hour"+(m>=120?"s":"")+" "+(m%60)+" minutes");
  const matsList=()=>(st.mats||"").split(/\n+/).map(x=>x.trim()).filter(Boolean);
  function coverSum(p){
    const I=instr(p),a=AS(),pt=partTitle(p),mats=matsList();
    return `<section class="as-page as-cover as-cvs">${st.crest?`<div class="as-crest"><img src="${LOGOX0()}" alt="School crest"></div>`:""}<h2 class="as-school2">${esc((st.school||"").toUpperCase())}</h2><div class="as-dept">${esc(a.dept||"Science Department")}</div>
<div class="as-subj"><b>${esc(SHORT)}</b><br><b>${esc(st.cls||"")}</b></div><h2 class="as-ctitle">${esc(a.coverTitle||"Cambridge Secondary Summative Assessment")}</h2>${pt?`<div class="as-cpaper"><b>${esc(pt.charAt(0)+pt.slice(1).toLowerCase())}</b></div>`:""}
<div class="as-cbox"><div class="as-cin"><span>Name</span><span>Class</span></div><div class="as-cin2"><div class="as-cin"><span>Date</span></div><div class="as-cin"><span>Teacher’s Name</span></div></div></div>
<div class="as-cdur"><b>${durLong(partMins(p))}</b></div>${mats.length?`<div>Additional materials:</div><ul class="as-cm">${mats.map(m=>`<li>${esc(m)}</li>`).join("")}</ul>`:""}
<h3 class="as-ch">INSTRUCTIONS</h3><ul class="as-cl">${I.lines.map(l=>`<li>${l}</li>`).join("")}</ul><h3 class="as-ch">INFORMATION</h3><ul class="as-cl">${I.info.map(l=>`<li>${l}</li>`).join("")}</ul></section>`;
  }
  function coverHTML(p){
    if(st.type==="sum")return coverSum(p);
    const I=instr(p),pt=partTitle(p);
    return `<section class="as-page as-cover">${st.crest?`<div class="as-crest"><img src="${LOGOX0()}" alt="School crest"></div>`:""}<h2 class="as-school">${esc((st.school||"").toUpperCase())}</h2>
<div class="as-hd"><div><div>${esc(titleName())}</div>${pt?`<div><b>${esc(pt)}</b></div>`:""}<div><b>SUBJECT:</b> ${esc(SHORT.toUpperCase())}</div><div><b>CLASS:</b> ${esc(clsText())||"&nbsp;"}</div><div><b>TOTAL MARKS:</b> ${partMarks(p)} MARKS</div></div><div class="as-dur"><b>DURATION:</b> ${esc(dur(partMins(p)))}</div></div>
<div class="as-nm"><b>NAME OF STUDENT:</b></div>
<h3 class="as-ins">Instructions to Candidates</h3><ul class="as-il">${I.lines.map(l=>`<li>${l}</li>`).join("")}</ul>${I.info.length?`<h3 class="as-ins" style="margin-top:12px">Information</h3><ul class="as-il">${I.info.map(l=>`<li>${l}</li>`).join("")}</ul>`:""}</section>`;
  }
  function paperHTML(){
    let h=`<div class="as-doc" id="as-doc">`;
    const PTH=sk==="chem"&&st.pt?`<section class="as-page as-ptp"><img src="${ASSESS_PT}" alt="The Periodic Table of Elements"></section>`:"";
    partsList().forEach(p=>{
      let n=0;h+=coverHTML(p);
      const hasA=(p.kind==="mcq"||p.kind==="both")&&paper.A.length,hasB=(p.kind==="struct"||p.kind==="both")&&paper.B.length;
      if(hasA){
        if(sheetOn())h+=`<section class="as-page as-sheet">${sheetSVG(false)}</section>`;
        else h+=`<section class="as-page"><h3 class="as-gh">Answer grid for section A</h3><p>Write your choice in the Answer column</p><table class="as-grid"><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>${paper.A.map((x,i)=>`<tr><td>${i+1}</td><td>&nbsp;</td></tr>`).join("")}</tbody></table></section>`;
        h+=`<section class="as-page">${st.type==="form"?`<h3 class="as-sc">SECTION A</h3>`:st.type==="sum"?`<h3 class="as-sc">${esc(partTitle(p))}</h3>`:""}`;
        paper.A.forEach(x=>{n++;h+=`<div class="as-q" data-id="${esc(x.id)}"><div class="as-qh"><span class="as-n">${n}</span><div class="as-qb"><div>${F(x.q)}</div>${optsHTML(x)}</div></div></div>`});
        if(p.kind==="mcq")h+=`<div class="as-end">End of paper</div>`;
        h+=`</section>`;
      }
      if(hasB){
        h+=`<section class="as-page">${st.type==="form"?`<h3 class="as-sc">SECTION B</h3>`:st.type==="sum"?`<h3 class="as-sc">${esc(partTitle(p))}</h3>`:""}`;
        paper.B.forEach(q=>{
          n++;
          if(q.kind==="single"){h+=`<div class="as-q"><div class="as-qh"><span class="as-n">${n}</span><div class="as-qb">${partHTML(q.items[0],0,false)}</div></div></div>`;return}
          const multi=q.kind==="group"&&q.items.length>1;
          h+=`<div class="as-q"><div class="as-qh"><span class="as-n">${n}</span><div class="as-qb">`;
          if(q.kind==="pp"){const x=q.items[0];h+=`<div>${F(x.q)}</div>${dots(Math.min(10,Math.max(2,Math.round(x.marks/1.5))))}`}
          else{h+=`<div class="as-intro">This question is about ${esc(unitName(q.u).toLowerCase())}.</div>`;q.items.forEach((x,i)=>h+=partHTML(x,i,multi))}
          h+=`<div class="as-tot">[Total: ${qMarks(q)}]</div></div></div></div>`;
        });
        h+=`<div class="as-end">${st.type==="sum"?"End of paper":"End of assessment"}</div></section>`;
      }
      h+=PTH;
    });
    h+=`</div>`;return h;
  }
  /* ---------- mark scheme ---------- */
  function ansText(x){
    if(x.kind==="mcq")return L[x.ord.indexOf(x.a)];
    if(x.kind==="num")return String(x.a)+(x.unit?" "+strip(F(x.unit)):"");
    if(x.kind==="short")return Array.isArray(x.a)?"Accept answers that include: "+x.a.join(" / "):String(x.a);
    return "";
  }
  function msHTML(){
    let n=0,h=`<div class="as-doc as-msdoc" id="as-ms"><h1 class="as-mt">MARK SCHEME</h1><div class="as-sub">${esc(titleName())} · ${esc(SHORT.toUpperCase())}${st.cls?" · "+esc(clsText()):""} · ${totalOf(paper)} MARKS</div>`;
    if(paper.A.length){h+=`<h3>${st.type==="sum"?esc(AS().compMcq||"Paper 1"):"Section A"}</h3><table class="as-ms"><thead><tr><th>Q</th><th>Answer</th><th>Marks</th><th>Notes</th></tr></thead><tbody>${paper.A.map(x=>{n++;return `<tr><td>${n}</td><td><b>${ansText(x)}</b></td><td>1</td><td>${x.e?F(x.e):""}</td></tr>`}).join("")}</tbody></table>`}
    if(paper.B.length){if(st.type==="sum")n=0;h+=st.type==="sum"?`<h3>${esc(AS().compStruct||"Paper 2")}</h3>`:st.type!=="bi"?`<h3>Section B</h3>`:`<h3>Answers</h3>`;paper.B.forEach(q=>{n++;const multi=q.kind==="group"&&q.items.length>1;
      h+=`<div class="as-msq"><b>Question ${n} ${q.kind==="single"?"["+qMarks(q)+"]":"[Total: "+qMarks(q)+"]"}</b>`;
      q.items.forEach((x,i)=>{h+=`<div class="as-msp">${multi?`<b>(${PL[i]})</b> `:""}<span class="as-m">[${x.marks}]</span>`+(Array.isArray(x.ms)?`<ul>${x.ms.map(s=>`<li>${F(s)}</li>`).join("")}</ul>`:x.ms?`<div>${F(x.ms)}</div>`:`<div>${esc(ansText(x))}${x.e?" "+F(x.e):""}</div>`)+`</div>`});
      h+=`</div>`})}
    h+=`</div>`;return h;
  }
  /* ---------- UI ---------- */
  function unitsHTML(){
    return U.filter(u=>(u.lessons||[]).length||(u.pp||[]).length).map(u=>{
      const on=unitOn(u),ls=u.lessons||[];
      return `<details class="as-unit"${on&&ls.some((l,j)=>!lessonOn(u,j))?" open":""}><summary><label><input type="checkbox" data-u="${u.n}"${on?" checked":""}> <b>Topic ${u.n}:</b> ${F(u.name)}</label><span class="as-cnt">${ls.length} lessons</span></summary>${ls.length?`<div class="as-ls">${ls.map((l,j)=>`<label><input type="checkbox" data-l="${u.n}-${j+1}"${on&&lessonOn(u,j)?" checked":""}${on?"":" disabled"}> ${u.n}.${j+1} ${F(l.t)}</label>`).join("")}</div>`:`<div class="as-ls"><i>Exam-style questions only.</i></div>`}</details>`;
    }).join("");
  }
  function css(){
    if(document.getElementById("as-css"))return;
    const s=document.createElement("style");s.id="as-css";
    s.textContent=`
.as{max-width:1180px;margin:0 auto}
.as h1.as-h{font:700 calc(30*var(--u,1px)) var(--f-display);margin:6px 0 4px}
.as-lead{color:var(--muted);max-width:70ch;margin:0 0 14px}
.as-card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:16px;margin:0 0 14px}
.as-card h2{font:700 calc(18*var(--u,1px)) var(--f-display);margin:0 0 10px}
.as-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}
.as-grid2 label{display:flex;flex-direction:column;gap:3px;font:600 calc(12.5*var(--u,1px)) var(--f-body);color:var(--muted)}
.as input[type=text],.as input[type=number],.as input[type=date],.as select{font:500 calc(15*var(--u,1px)) var(--f-body);min-height:42px;padding:6px 10px;border:1px solid var(--line);border-radius:9px;background:var(--bg);color:var(--ink);width:100%;box-sizing:border-box}
.as-seg{display:inline-flex;border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-bottom:12px}
.as-seg button{border:0;background:var(--surface);color:var(--ink);padding:10px 16px;font:600 calc(15*var(--u,1px)) var(--f-body);cursor:pointer;min-height:44px}
.as-seg button[aria-pressed=true]{background:var(--accent);color:#fff}
.as-unit{border:1px solid var(--line);border-radius:10px;margin:0 0 6px;background:var(--bg)}
.as-unit summary{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:9px 12px;cursor:pointer;min-height:40px}
.as-unit summary label{cursor:pointer;display:block}
.as-cnt{color:var(--muted);font-size:calc(13*var(--u,1px));white-space:nowrap}
.as-ls{padding:4px 14px 10px 34px;display:grid;gap:3px}
.as-ls label{display:block}
.as-tools{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;align-items:center}
.as-msg{min-height:1.4em;color:var(--muted);margin:4px 0}
.as-warn{background:#FFF1D6;color:#5C3D00;border-left:4px solid #F2A93B;padding:8px 12px;border-radius:6px;margin:8px 0}
.as-pv{color:var(--muted);margin:12px 0 6px;font-size:calc(13.5*var(--u,1px))}
.as-doc{color:#000;font:15px/1.4 Arial,Helvetica,sans-serif}
.as-doc *{color:#000}
.as-page{background:#fff;border:1px solid var(--line);border-radius:6px;padding:30px 36px;margin:0 0 14px;min-height:300px;overflow-x:auto}
.as-crest{text-align:center}.as-crest img{width:96px;height:auto}
.as-school{text-align:center;font:700 15px Arial;margin:8px 0 26px}
.as-hd{display:flex;justify-content:space-between;gap:20px;margin:0 0 20px}
.as-hd>div>div{margin:0 0 8px}
.as-nm{border-bottom:2px solid #000;padding:6px 0 8px;margin-bottom:16px}
.as-ins{font:700 15px Arial;margin:0 0 6px}
.as-il{margin:0 0 0 22px;padding:0}.as-il li{margin:0 0 2px}
.as-gh{font:700 17px Arial;margin:0 0 4px}
table.as-grid{border-collapse:collapse;margin:8px 0}
table.as-grid th,table.as-grid td{border:1px solid #000;padding:6px 20px;text-align:center;min-width:110px;height:30px}
.as-sc{text-align:center;font:700 15px Arial;margin:0 0 14px}
.as-q{margin:0 0 26px;break-inside:avoid}
.as-qh{display:flex;gap:12px;align-items:flex-start}
.as-n{font-weight:700;min-width:32px}
.as-qb{flex:1;min-width:0}
.as-opts{margin-top:8px;display:grid;gap:3px}
.as-opts.row{grid-template-columns:repeat(4,1fr)}
.as-opt{display:flex;gap:14px}.as-opt b{min-width:28px;font-weight:400}
.as-intro{margin-bottom:6px}
.as-part{display:flex;gap:10px;align-items:flex-start;margin:0 0 12px}
.as-pl{min-width:30px}
.as-pb2{flex:1;min-width:0}
.as-m{white-space:nowrap;align-self:flex-end;margin-left:6px;font-weight:700}
.as-tot{text-align:right;margin-top:6px;font-weight:700}
.as-dots i{display:block;border-bottom:1px dotted #000;height:24px}
.as-eq{text-align:right;margin-top:14px}
.as-end{text-align:center;font-weight:700;margin:22px 0 0}
.as-doc table:not(.as-grid):not(.as-ms){border-collapse:collapse;margin:6px auto}
.as-doc table:not(.as-grid):not(.as-ms) td,.as-doc table:not(.as-grid):not(.as-ms) th{border:1px solid #000;padding:4px 10px;text-align:center}
.as-doc svg,.as-doc img{max-width:100%;height:auto}
.as-cvs{font:15px/1.4 Arial,Helvetica,sans-serif}
.as-school2{text-align:center;font:700 26px Arial;margin:10px 0 0}.as-dept{text-align:center;font:400 22px Arial;margin:0 0 22px}
.as-subj{font-size:19px;margin:0 0 30px}.as-ctitle{font:700 22px Arial;margin:0 0 6px}.as-cpaper{font-size:17px;margin:0 0 18px}
.as-cbox{border:1.5px solid #000;border-radius:22px;padding:16px 18px;margin:22px 0 14px}
.as-cin{border:1px solid #000;border-radius:7px;padding:7px 10px;display:flex;justify-content:space-between;min-height:34px}
.as-cin2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}.as-cin2 .as-cin{min-height:54px;border-radius:9px}
.as-cdur{margin:6px 0 2px}.as-cm{margin:2px 0 8px 24px;padding:0;font-size:12px}
.as-ch{font:700 15px Arial;margin:12px 0 2px}.as-cl{margin:0 0 0 28px;padding:0}.as-cl li{margin:0 0 5px}
.as-sheet{text-align:center;padding:10px!important}.as-sheet svg{width:100%;max-width:640px;height:auto}\n.as-ptp{text-align:center}.as-ptp img{width:min(100%,640px)}
.as-msdoc{background:#fff;border:1px solid var(--line);border-radius:6px;padding:30px 36px}
.as-mt{font:700 24px Arial;color:#0B3D3A;margin:0}
.as-sub{margin:2px 0 14px;color:#444}
.as-msdoc h3{font:700 17px Arial;border-bottom:2px solid #0B3D3A;padding-bottom:3px;margin:18px 0 8px}
.as-ms{border-collapse:collapse;width:100%}
.as-ms th,.as-ms td{border:1px solid #777;padding:5px 8px;text-align:left;vertical-align:top;font-size:14px}
.as-ms th{background:#E6F2EE}
.as-msq{margin:0 0 14px;break-inside:avoid}
.as-msp{margin:4px 0 4px 18px}.as-msp ul{margin:2px 0 0 20px;padding:0}
.as-li{display:flex;gap:10px;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:10px;padding:7px 10px;background:var(--bg);margin:0 0 6px}
.as-li span.t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.as-edit{display:flex;gap:6px}
.as-li .btn{min-height:36px;padding:4px 10px}
@page{size:A4;margin:16mm 16mm 16mm}
@media print{
 header.top,footer,.as-ui,.dsp-panel,.crumb{display:none!important}
 body,.page,main{background:#fff!important;margin:0!important;padding:0!important}
 .as-page{border:0!important;border-radius:0!important;padding:0!important;margin:0!important;min-height:0!important;break-after:page;page-break-after:always;overflow:visible!important}
 .as-page:last-child{break-after:auto;page-break-after:auto}
 .as-doc{font-size:11pt}
 .as-msdoc{border:0!important;padding:0!important}
 .as-sheet svg{max-height:262mm;width:auto;max-width:100%}\n body.as-print-paper #as-ms{display:none!important}
 body.as-print-ms #as-doc{display:none!important}
}`;
    document.head.appendChild(s);
  }
  function listHTML(){
    const row=(t,sec,i)=>`<div class="as-li" data-sec="${sec}" data-i="${i}"><span class="t">${t}</span><span class="as-edit"><button class="btn" type="button" data-act="swap">Swap</button><button class="btn" type="button" data-act="del">Remove</button></span></div>`;
    let n=0;
    return paper.A.map((x,i)=>{n++;return row(`<b>Q${n}</b> · Section A · ${esc(strip(F(x.q)).slice(0,90))}`,"A",i)}).join("")+paper.B.map((q,i)=>{n++;return row(`<b>Q${n}</b> · ${st.type!=="bi"?"Section B · ":""}Topic ${q.u} · ${q.kind==="pp"?"exam-style":q.kind==="single"?"short answer":q.items.length+" part"+(q.items.length>1?"s":"")} <b>[${qMarks(q)}]</b>`,"B",i)}).join("");
  }
  function paperPanel(){
    const tot=totalOf(paper);
    return `<div class="as-card as-ui"><h2>Your assessment: ${tot} marks (${paper.A.length?paper.A.length+" multiple choice, ":""}${paper.B.length} ${st.type!=="bi"?"structured question":"question"}${paper.B.length===1?"":"s"})</h2>
${paper.short>0?`<div class="as-warn">${paper.short} mark${paper.short>1?"s":""} short of ${st.total}. Select more topics or lessons, then regenerate.</div>`:""}
${!paper.A.length&&!paper.B.length?`<div class="as-warn">No questions were available for the selected topics.</div>`:""}
<div class="as-tools"><button class="btn pri" type="button" id="as-print">Print paper</button><button class="btn" type="button" id="as-docx">Paper (.docx)</button><button class="btn" type="button" id="as-pdf">Paper (PDF)</button><button class="btn" type="button" id="as-msprint">Print mark scheme</button><button class="btn" type="button" id="as-msdocx">Mark scheme (.docx)</button><button class="btn" type="button" id="as-mspdf">Mark scheme (PDF)</button></div>
<div class="as-tools"><button class="btn" type="button" id="as-regen">Regenerate</button><button class="btn" type="button" id="as-record">Mark these questions as used</button></div>
<div class="as-msg" id="as-msg" role="status"></div>
<details id="as-det"${adjOpen?" open":""}><summary>Adjust questions (swap or remove)</summary><div id="as-adj" style="margin-top:8px">${listHTML()}</div></details></div>
<div class="as-pv as-ui">Learner paper preview:</div>${paperHTML()}<div class="as-pv as-ui">Mark scheme (teacher copy):</div>${msHTML()}`;
  }
  function render(){
    css();
    const T=ASSESS_TYPES[st.type];
    app.innerHTML=`<div class="as"><div class="as-ui"><h1 class="as-h">Assessments</h1>
<p class="as-lead">Build a summative assessment (final-exam layout: Paper 1 multiple choice and Paper 2 structured questions, mostly real past-paper questions with their diagrams), a formative assessment (Section A multiple choice, Section B structured questions, answer grid) or a bi-weekly test (one run of short-answer and structured questions, no sections), each with a separate mark scheme.</p>
<div class="as-seg" role="group" aria-label="Assessment type"><button type="button" data-type="bi" aria-pressed="${st.type==="bi"}">Bi-weekly test</button><button type="button" data-type="form" aria-pressed="${st.type==="form"}">Formative assessment</button><button type="button" data-type="sum" aria-pressed="${st.type==="sum"}">Summative assessment</button></div>
<div class="as-card"><h2>Paper details</h2><div class="as-grid2">
<label>School<input type="text" data-f="school" value="${esc(st.school)}"></label>
<label>Assessment number<select data-f="num">${[0,1,2,3,4,5,6,7,8,9,10].map(k=>`<option value="${k}"${st.num===k?" selected":""}>${k?ASSESS_NUMS[k][0].toUpperCase()+ASSESS_NUMS[k].slice(1):"No number"}</option>`).join("")}</select></label>
<label>Class (e.g. IGCSE 1)<input type="text" data-f="cls" value="${esc(st.cls)}" placeholder="IGCSE 1"></label>
<label>Total marks<input type="number" min="5" max="150" data-f="total" value="${st.total}"></label>
${st.type!=="bi"?`<label>Section A multiple-choice questions<input type="number" min="0" max="60" data-f="nMcq" value="${st.nMcq}"></label>`:""}
<label>Time allowed (minutes)<input type="number" min="10" max="240" data-f="mins" value="${st.mins}"></label>
${st.type==="sum"?`<label>Additional materials (one per line, leave empty for none)<textarea rows="3" data-f="mats" style="min-height:70px">${esc(st.mats)}</textarea></label>`:""}
</div><div class="as-tools"><label><input type="checkbox" id="as-calc"${st.calc!==false?" checked":""}> Calculator allowed</label><label><input type="checkbox" id="as-crest"${st.crest?" checked":""}> Show the school crest</label>${sk==="chem"?`<label><input type="checkbox" id="as-pt"${st.pt?" checked":""}> Add the Periodic Table page</label>`:""}</div></div>
<div class="as-card"><h2>Topics and lessons covered</h2><p style="margin:0 0 8px;color:var(--muted)">Tick the topics this assessment covers. Open a topic to leave out lessons you have not taught yet.</p>
<div class="as-tools"><button class="btn" type="button" id="as-all">Select all topics</button><button class="btn" type="button" id="as-none">Clear</button><label style="display:flex;gap:6px;align-items:center;margin-left:auto"><input type="checkbox" id="as-avoid"${st.avoid?" checked":""}> Avoid questions already marked as used</label></div>
<div id="as-units">${unitsHTML()}</div></div>
<div class="as-tools"><button class="btn pri" type="button" id="as-gen">Generate assessment</button><span class="as-msg" id="as-gmsg" role="status"></span></div></div>
<div id="as-out">${paper?paperPanel():""}</div></div>`;
  }
  const persist=()=>save(st);
  const $o=()=>app.querySelector("#as-out");
  const msg=t=>{const m=app.querySelector("#as-msg")||app.querySelector("#as-gmsg");if(m){m.textContent=t;setTimeout(()=>{if(m.textContent===t)m.textContent=""},3500)}};
  function refresh(){$o().innerHTML=paperPanel()}
  function regen(){st.seed=Math.floor(Math.random()*1e6)+1;paper=build();persist();refresh()}
  function swap(sec,i){
    const r=rngF(Math.floor(Math.random()*1e9)),T=ASSESS_TYPES[st.type];
    const {mcq,str}=bank();const inUse=new Set(paper.A.concat(paper.B.flatMap(q=>q.items)).map(x=>x.id));
    if(sec==="A"){
      const cur=paper.A[i];let pool=shuf(mcq.filter(x=>!inUse.has(x.id)),r);const nx=pool.find(x=>x.u===cur.u)||pool[0];
      if(!nx){msg("No other question available for that slot.");return}
      nx.ord=nx.fixed?[0,1,2,3]:shuf([0,1,2,3],r);paper.A[i]=nx;
    }else{
      const cur=paper.B[i],target=qMarks(cur);const pool=shuf(str.filter(x=>!inUse.has(x.id)),r);
      const units=[cur.u].concat(shuf([...new Set(pool.map(x=>x.u))].filter(u=>u!==cur.u),r));
      let q=null;if(cur.kind==="single"){const c=pool.filter(x=>x.kind!=="pp"&&x.marks===cur.items[0].marks);const y=c.find(x=>x.u===cur.u)||c[0];if(y)q={u:y.u,kind:"single",items:[y]}}
      else for(const u of units){q=compose(u,target,pool,r,T,cur.kind==="pp");if(q&&qMarks(q)>=Math.min(target,3))break;q=null}
      if(!q){msg("No other question available for that slot.");return}
      paper.B[i]=q;
    }
    refresh();
  }
  /* ---------- export ---------- */
  function htmlBlocks(html){
    const d=document.createElement("div");d.innerHTML=F(html);const out=[];
    const inl=n=>{let s="";n.childNodes.forEach(c=>{if(c.nodeType===3)s+=c.nodeValue;else if(c.nodeType===1){const t=c.tagName.toLowerCase();if(t==="sub")s+="~"+c.textContent+"~";else if(t==="sup")s+="^"+c.textContent+"^";else if(t==="br")s+="\n";else if(t==="b"||t==="strong")s+="**"+c.textContent+"**";else if(/^(svg|img|table|ul|ol)$/.test(t)){}else s+=inl(c)}});return s};
    const INL=/^(sub|sup|b|strong|i|em|span|br|a|code|u|small)$/;
    const walk=n=>{
      let buf="";const flush=()=>{const t=buf.replace(/[ \t\r\n]+/g," ").replace(/ ?\n ?/g,"\n").trim();if(t){if(/^[\u2026.\u00b7_\s]{3,}$/.test(t))out.push({t:"lines",n:2,gap:300,marker:true});else out.push({t:"p",text:t})}buf=""};
      n.childNodes.forEach(c=>{
        if(c.nodeType===3){buf+=c.nodeValue;return}
        if(c.nodeType!==1)return;const t=c.tagName.toLowerCase();
        if(INL.test(t)&&!c.querySelector("svg,table,ul,ol,img,div,p")){
          if(t==="sub")buf+="~"+c.textContent+"~";else if(t==="sup")buf+="^"+c.textContent+"^";else if(t==="br")buf+="\n";else if(t==="b"||t==="strong")buf+="**"+c.textContent+"**";else buf+=inl(c);return}
        flush();
        if(t==="svg")out.push({t:"svgel",el:c});
        else if(t==="img")out.push({t:"imgel",el:c});
        else if(t==="table"){const rows=[...c.querySelectorAll("tr")].map(tr=>[...tr.children].map(td=>inl(td).replace(/\s+/g," ").trim()));if(rows.length){const hasH=c.querySelector("th");out.push({t:"table",head:hasH?rows[0]:null,rows:hasH?rows.slice(1):rows,fontSize:9.5})}}
        else if(t==="ul"||t==="ol")out.push({t:t,items:[...c.querySelectorAll(":scope>li")].map(li=>inl(li).trim())});
        else if(c.querySelector("svg,table,ul,ol,img,div,p"))walk(c);
        else{const x=inl(c).replace(/\s+/g," ").trim();if(x){if(/^[\u2026.\u00b7_\s]{3,}$/.test(x))out.push({t:"lines",n:2,gap:300,marker:true});else out.push({t:"p",text:x})}}
      });
      flush();
    };
    walk(d);return out;
  }
  async function dataImg(src,q,png){
    const im=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=src});
    const c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0);
    return {dataUrl:png?c.toDataURL("image/png"):c.toDataURL("image/jpeg",q||0.85),w:c.width,h:c.height};
  }
  async function resolveImgs(bl){
    const res=[];
    for(const b of bl){
      if(b.t==="svgel"){try{const r=await HUBDOC.svgToPng(b.el,600);res.push({t:"img",dataUrl:r.dataUrl,w:r.w,h:r.h,widthPct:Math.min(100,Math.round(r.w/6.2))})}catch(e){}}
      else if(b.t==="imgel"){try{const s=b.el.getAttribute("src");if(/^data:/.test(s)){const r=await dataImg(s,0,true);res.push({t:"img",dataUrl:r.dataUrl,w:r.w,h:r.h,widthPct:Math.min(100,Math.max(8,Math.round(r.w/7.6))),align:"left",keep:1})}}catch(e){}}
      else res.push(b);
    }
    return res;
  }
  const dl=n=>"."+".".repeat(n);
  const LINE="....................................................................................................";
  /* one question or part in Cambridge layout: label in the margin column, hanging text, marks at the right */
  async function qBl(html,o){
    const bl=await resolveImgs(htmlBlocks(html)),fi=bl.findIndex(b=>b.t==="p"),left=567*((o.lvl||0)+1),out=[];
    if(fi<0)return [{t:"q",lvl:o.lvl,label:o.label,text:"",marks:o.marks}].concat(bl);
    let lp=fi;bl.forEach((b,k)=>{if(b.t==="p")lp=k});
    bl.forEach((b,k)=>{if(k===fi)out.push({t:"q",lvl:o.lvl,label:o.label,text:b.text,marks:fi===lp?o.marks:undefined});else if(k===lp)out.push({t:"q",lvl:o.lvl,cont:true,text:b.text,marks:o.marks,before:40});else if(b.t==="p")out.push(Object.assign({},b,{indent:left,after:60}));else if(b.t==="lines"||b.t==="img")out.push(Object.assign({},b,{indent:left}));else out.push(b)});
    const ii=out.findIndex(b=>b.t==="img");
    if(ii>0)out.slice(0,ii).forEach(b=>{if(b.t==="p")b.keep=1});
    if(o.stripNum){const f=out.find(b=>b.t==="q");if(f)f.text=String(f.text||"").replace(/^\s*(\*\*)?\d{1,2}(\*\*)?[\s\u00a0]+(\*\*)?(?=[A-Z(])/,"")}
    const im=out.find(b=>b.t==="img"),f0=out.find(b=>b.t==="q");
    if(im&&f0)f0.need=Math.min(620,Math.round(499*(im.widthPct||100)/100*(im.h/im.w))+70);
    return out;
  }
  async function paperModel(){
    const B=[];
    const bq=async(p,st0)=>{ /* structured questions */
      let n=0;
      const cam=st.type==="sum";
      const ans=(x,left)=>{const o=[];if(x.kind==="num")o.push({t:"p",text:"answer = ........................ "+(x.unit?strip(F(x.unit)):"")+(cam?"   **["+x.marks+"]**":""),align:"right",before:120});
        else{const k=x.kind==="short"?1:Math.min(8,Math.max(1,x.marks));o.push({t:"lines",n:k,indent:left,gap:300,marks:cam?x.marks:undefined})}return o};
      for(const q of paper.B){
        n++;
        if(q.kind==="single"){const x=q.items[0];(await qBl(x.q,{label:String(n),lvl:0,marks:cam?undefined:x.marks})).forEach(b=>B.push(b));ans(x,567).forEach(b=>B.push(b));continue}
        if(q.kind==="pp"){const x0=q.items[0],bl=await qBl(x0.q,{label:String(n),lvl:0,stripNum:true}),mk=bl.filter(b=>b.t==="lines"&&b.marker);
          if(mk.length){const per=Math.max(1,Math.min(5,Math.round(x0.marks/mk.length/1.5)));mk.forEach((b,k)=>{b.n=per;b.marker=0;if(cam&&k===mk.length-1)b.marks=x0.marks});bl.forEach(b=>B.push(b))}
          else{bl.forEach(b=>B.push(b));B.push({t:"lines",n:Math.min(10,Math.max(2,Math.round(x0.marks/1.5))),indent:567,gap:300,marks:cam?x0.marks:undefined})}}
        else{const multi=q.items.length>1;let i=0;
          if(multi)B.push({t:"q",lvl:0,label:String(n),text:"This question is about "+unitName(q.u).toLowerCase()+"."});
          for(const x of q.items){(await qBl(x.q,multi?{label:"("+PL[i]+")",lvl:1,marks:cam?undefined:x.marks}:{label:String(n),lvl:0,marks:cam?undefined:x.marks})).forEach(b=>B.push(b));ans(x,multi?1134:567).forEach(b=>B.push(b));i++}}
        B.push({t:"p",text:"**[Total: "+qMarks(q)+"]**",align:"right",before:100,after:60});
      }
      B.push({t:"p",text:st.type==="sum"?"End of paper":"End of assessment",bold:true,align:"center",before:200});
    };
    const logo=st.crest?await dataImg(LOGOX0(),0.9):null;
    const pti=sk==="chem"&&st.pt?await dataImg(ASSESS_PT,0.92):null;
    let firstPart=true;
    for(const p of partsList()){
      if(!firstPart)B.push({t:"pb"});firstPart=false;
      const I=instr(p),pt=partTitle(p);
      if(st.type==="sum"){
        if(logo)B.push({t:"img",dataUrl:logo.dataUrl,w:logo.w,h:logo.h,widthPct:14});
        B.push({t:"p",text:(st.school||"").toUpperCase(),bold:true,align:"center",size:18});
        B.push({t:"p",text:AS().dept||"Science Department",align:"center",size:15,after:200});
        B.push({t:"p",text:"**"+SHORT+"**"});B.push({t:"p",text:"**"+(st.cls||"")+"**",after:200});
        B.push({t:"p",text:"**"+(AS().coverTitle||"Cambridge Secondary Summative Assessment")+"**",size:16});
        if(pt)B.push({t:"p",text:"**"+pt.charAt(0)+pt.slice(1).toLowerCase()+"**"});
        B.push({t:"table",head:null,widths:[3,1],fontSize:11,rows:[["Name\n ","Class"],["Date\n ","Teacher’s Name"]]});
        B.push({t:"p",text:"**"+durLong(partMins(p))+"**",before:120});
        const mt=matsList();if(mt.length){B.push({t:"p",text:"Additional materials:"});B.push({t:"ul",items:mt})}
        B.push({t:"p",text:"**INSTRUCTIONS**"});B.push({t:"ul",items:I.lines.map(stripTags)});
        B.push({t:"p",text:"**INFORMATION**"});B.push({t:"ul",items:I.info.map(stripTags)});
      }else{
      if(logo)B.push({t:"img",dataUrl:logo.dataUrl,w:logo.w,h:logo.h,widthPct:14});
      B.push({t:"p",text:(st.school||"").toUpperCase(),bold:true,align:"center",size:12});
      B.push({t:"p",text:titleName()});
      if(pt)B.push({t:"p",text:"**"+pt+"**"});
      B.push({t:"p",text:"**SUBJECT:** "+SHORT.toUpperCase()+"                                                              **DURATION:** "+dur(partMins(p))});
      B.push({t:"p",text:"**CLASS:** "+clsText()});
      B.push({t:"p",text:"**TOTAL MARKS:** "+partMarks(p)+" MARKS"});
      B.push({t:"p",text:"**NAME OF STUDENT:** ______________________________________________"});
      B.push({t:"h",l:3,text:"Instructions to Candidates"});
      B.push({t:"ul",items:I.lines.map(stripTags)});
      if(I.info.length){B.push({t:"h",l:3,text:"Information"});B.push({t:"ul",items:I.info.map(stripTags)})}
      }
      const hasA=(p.kind==="mcq"||p.kind==="both")&&paper.A.length,hasB=(p.kind==="struct"||p.kind==="both")&&paper.B.length;
      let n=0;
      if(hasA){
        B.push({t:"pb"});
        if(sheetOn()){const r=await dataImg(sheetURL(),0.92);B.push({t:"img",dataUrl:r.dataUrl,w:r.w,h:r.h,widthPct:100})}
        else{B.push({t:"h",l:3,text:"Answer grid for section A"});B.push({t:"p",text:"Write your choice in the Answer column"});
          B.push({t:"table",head:["Question","Answer"],widths:[1,1],fontSize:11,rows:paper.A.map((x,i)=>[String(i+1)," \n "])})}
        B.push({t:"pb"});B.push({t:"p",text:st.type==="sum"?partTitle(p):"SECTION A",bold:true,align:"center"});
        for(const x of paper.A){
          n++;
          (await qBl(x.q,{label:String(n),lvl:0})).forEach((b,k)=>{if(k===0&&b.t==="q")b.need=Math.max(b.need||0,170);B.push(b)});
          x.ord.forEach((k,i)=>B.push({t:"q",lvl:1,label:L[i],text:strip(F(x.o[k])),before:50,after:30,nokeep:i>0}));
        }
        if(p.kind==="mcq")B.push({t:"p",text:"End of paper",bold:true,align:"center",before:200});
      }
      if(hasB){
        B.push({t:"pb"});if(st.type!=="bi")B.push({t:"p",text:st.type==="sum"?partTitle(p):"SECTION B",bold:true,align:"center"});
        await bq(p);
      }
      if(pti){B.push({t:"pb"});B.push({t:"img",dataUrl:pti.dataUrl,w:pti.w,h:pti.h,widthPct:100})}
    }
    return {title:"",footer:(st.school||"")+" · "+titleName()+" · "+SHORT,blocks:B,cam:st.type==="sum"?{left:"© "+(st.school||"")+" "+new Date().getFullYear(),mid:SHORT}:null};
  }
  async function msModel(){
    const B=[];let n=0;
    B.push({t:"p",text:titleName()+" · "+SHORT.toUpperCase()+(st.cls?" · "+clsText():"")+" · "+totalOf(paper)+" MARKS"});
    if(paper.A.length){B.push({t:"h",l:2,text:st.type==="sum"?(AS().compMcq||"Paper 1"):"Section A"});B.push({t:"table",head:["Q","Answer","Marks","Notes"],widths:[0.6,3,0.8,6],fontSize:10,rows:paper.A.map(x=>{n++;return[String(n),ansText(x),"1",strip(F(x.e||""))]})})}
    if(paper.B.length){if(st.type==="sum")n=0;B.push({t:"h",l:2,text:st.type==="sum"?(AS().compStruct||"Paper 2"):st.type!=="bi"?"Section B":"Answers"});
      for(const q of paper.B){n++;B.push({t:"p",text:"**Question "+n+"  "+(q.kind==="single"?"["+qMarks(q)+"]":"[Total: "+qMarks(q)+"]")+"**"});const multi=q.kind==="group"&&q.items.length>1;
        q.items.forEach((x,i)=>{const lead=multi?"**("+PL[i]+")** ":"";B.push({t:"p",text:lead+"["+x.marks+"]"});if(Array.isArray(x.ms))B.push({t:"ul",items:x.ms.map(s=>strip(F(s)))});else B.push({t:"p",text:x.ms?strip(F(x.ms)):ansText(x)+(x.e?" - "+strip(F(x.e)):"")})})}}
    if(PPONLY()&&paper.A.length)B.push({t:"p",text:"Note: the Paper 1 answers are school-prepared keys for the past-paper questions. Check them against the published Cambridge mark scheme before marking.",italic:true,size:9,before:200});
    return {title:"MARK SCHEME",footer:"Mark scheme · "+titleName()+" · "+SHORT,blocks:B};
  }
  const slug=s=>String(s||"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const fname=(w,ext)=>slug(titleName().toLowerCase())+"-"+slug(SHORT)+(st.cls?"-"+slug(st.cls):"")+(w?"-"+w:"")+"."+ext;
  async function doExport(which,fmt,btn){
    const old=btn.textContent;btn.disabled=true;btn.textContent="Preparing...";
    try{const m=which==="ms"?await msModel():await paperModel();const data=fmt==="docx"?await HUBDOC.docx(m):await HUBDOC.pdf(m);const r=await env.saveFile(fname(which==="ms"?"mark-scheme":"",fmt),data);msg(r==="saved"?"File saved.":r==="declined"?"":"Could not save the file.")}
    catch(e){console.error(e);msg("Something went wrong. Try again.")}
    btn.disabled=false;btn.textContent=old;
  }
  function doPrint(cls){document.body.classList.add(cls);const done=()=>{document.body.classList.remove(cls);window.removeEventListener("afterprint",done)};window.addEventListener("afterprint",done);window.print()}
  /* ---------- events ---------- */
  render();
  if(!st.unitsSet){st.units=[];st.unitsSet=true;persist()}
  app.onclick=e=>{
    if(!app.querySelector(".as"))return;
    const sm=e.target.closest("#as-det > summary");if(sm)adjOpen=!sm.parentElement.open;
    const t=e.target.closest("button");if(!t)return;
    if(t.dataset.type){const ty=t.dataset.type;if(ty!==st.type){st.type=ty;const T=TD(ty);st.total=T.marks;st.nMcq=T.mcq;st.mins=T.mins;paper=null;persist();render()}return}
    if(t.id==="as-all"){st.units=U.filter(u=>(u.lessons||[]).length||(u.pp||[]).length).map(u=>u.n);persist();app.querySelector("#as-units").innerHTML=unitsHTML();return}
    if(t.id==="as-none"){st.units=[];persist();app.querySelector("#as-units").innerHTML=unitsHTML();return}
    if(t.id==="as-gen"){if(!st.units.length){msg("Tick at least one topic first.");return}paper=build();persist();refresh();$o().scrollIntoView({behavior:"smooth",block:"start"});return}
    if(t.id==="as-regen"){regen();return}
    if(t.id==="as-print"){doPrint("as-print-paper");return}
    if(t.id==="as-msprint"){doPrint("as-print-ms");return}
    if(t.id==="as-docx"){doExport("paper","docx",t);return}
    if(t.id==="as-pdf"){doExport("paper","pdf",t);return}
    if(t.id==="as-msdocx"){doExport("ms","docx",t);return}
    if(t.id==="as-mspdf"){doExport("ms","pdf",t);return}
    if(t.id==="as-record"){paper.A.concat(paper.B.flatMap(q=>q.items)).forEach(x=>st.used[x.id]=1);persist();msg(Object.keys(st.used).length+" questions are now marked as used for future assessments.");return}
    if(t.dataset.act){const row=t.closest(".as-li");const sec=row.dataset.sec,i=+row.dataset.i;
      if(t.dataset.act==="swap")swap(sec,i);else{(sec==="A"?paper.A:paper.B).splice(i,1);refresh()}}
  };
  app.onchange=e=>{
    if(!app.querySelector(".as"))return;
    const t=e.target;
    if(t.dataset.f){const f=t.dataset.f;st[f]=t.type==="number"?Math.max(+t.min||0,Math.min(+t.max||999,+t.value||0)):t.tagName==="SELECT"&&f==="num"?+t.value:t.value;persist();return}
    if(t.dataset.u){const n=+t.dataset.u;st.units=t.checked?st.units.concat(n):st.units.filter(x=>x!==n);if(t.checked)st.off=st.off.filter(k=>!k.startsWith(n+"-"));persist();app.querySelector("#as-units").innerHTML=unitsHTML();return}
    if(t.dataset.l){const k=t.dataset.l;st.off=t.checked?st.off.filter(x=>x!==k):st.off.concat(k);persist();return}
    if(t.id==="as-avoid"){st.avoid=t.checked;persist()}
    if(t.id==="as-crest"){st.crest=t.checked;persist()}
    if(t.id==="as-calc"){st.calc=t.checked;persist()}
    if(t.id==="as-pt"){st.pt=t.checked;persist()}
  };
}
