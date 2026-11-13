/* progress_report — PDF / Word export of class results and analysis.
   PROGREPORT.build(classId,year,sem,{format:'pdf'|'docx',names:true,interventions:true}) -> Promise<{filename,data:Blob}> */
const PROGREPORT=(function(){
  const SUBJN={chem:"Chemistry",bio:"Biology",other:"Other / mixed"};
  const ST={critical:"CRITICAL",risk:"AT RISK",watch:"Watch",ontrack:"On track",nodata:"No data"};
  const BANDS=[["A*",90],["A",80],["B",70],["C",60],["D",50],["E",40],["F",30],["G",20]];
  const pc=v=>v==null?"-":Math.round(v)+"%";
  const pc1=v=>v==null?"-":(Math.round(v*10)/10)+"%";
  const grade=v=>{if(v==null)return"-";for(const b of BANDS)if(v>=b[1])return b[0];return"U"};
  const slug=s=>String(s||"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"")||"class";
  const arrow=s=>s==null?"-":s>=2?"Improving":s<=-2?"Declining":"Steady";
  function topicName(t){
    try{const u=SUBJ[t.s].units.find(x=>x.n===t.n);return(t.s==="chem"?"Chem ":"Bio ")+t.n+": "+(u&&(u.name||u.t)||"Topic")}catch(e){return(t.s||"")+" "+t.n}
  }
  async function chart(svg,w){
    try{const r=await HUBDOC.svgToPng(svg,w||900);return{t:"img",dataUrl:r.dataUrl,w:r.w,h:r.h,widthPct:100}}catch(e){return null}
  }
  async function build(classId,year,sem,opts){
    opts=Object.assign({format:"pdf",names:true,interventions:true},opts||{});
    const c=PROG.cls(classId);if(!c)throw new Error("Class not found");
    const an=PROG.analyse(c,year,sem),S=an.settings,sm=an.summary;
    const semL=sem==="sem2"?"Semester 2":"Semester 1";
    const nm={};an.learners.forEach((l,i)=>{nm[l.id]=opts.names?l.name:"Learner "+String(i+1).padStart(2,"0")});
    const today=new Date().toISOString().slice(0,10);
    const B=[];
    B.push({t:"kv",pairs:[["Class",c.name+(c.yearGroup?" ("+c.yearGroup+")":"")],["Subject",SUBJN[c.subject]||c.subject||""],["Academic year / semester",year+" - "+semL],["Date generated",today],["Teacher","______________________________"],["Learners",String(sm.n)+(opts.names?"":" (names anonymised)")]]});
    B.push({t:"h",l:1,text:"1. Summary"});
    B.push({t:"kv",pairs:[["Class average",pc1(sm.mean)],["Median",pc1(sm.median)],["Pass rate (>= "+S.passMark+"%)",pc1(sm.passRate)],["Highest / lowest",pc(sm.high)+" / "+pc(sm.low)],["Spread (standard deviation)",sm.sd==null?"-":sm.sd.toFixed(1)],["Results entered",pc(sm.completion)],["Critical / At risk / Watch / On track",sm.counts.critical+" / "+sm.counts.risk+" / "+sm.counts.watch+" / "+sm.counts.ontrack]]});
    B.push({t:"h",l:2,text:"Assessment structure and weights"});
    const hasWeights=S.weights;
    B.push({t:"p",text:"Each semester has bi-weekly tests, two formative assessments and one summative assessment. Semester result = weighted mean of the three assessment types (bi-weekly "+S.weights.bi+"%, formative "+S.weights.form+"%, summative "+S.weights.sum+"%), re-balanced over the types that have results."});
    B.push({t:"table",head:["Assessment","Type","Date","Max","Entered","Mean","Median","Pass rate"],widths:[3,2.4,1.6,1,1.2,1.2,1.2,1.4],zebra:true,fontSize:9,
      rows:an.assess.map(a=>[a.name,a.type==="bi"?"Bi-weekly test":a.type==="form"?"Formative":"Summative",a.date||"-",String(a.max),a.held?a.entered+(a.absent?" (+"+a.absent+" abs)":""):"not yet",pc(a.mean),pc(a.median),pc(a.passRate)])});
    // charts
    B.push({t:"pb"});B.push({t:"h",l:1,text:"2. Charts and trends"});
    const held=an.assess.filter(a=>a.held);const CH=[];
    if(held.length){
      const im=await chart(PCH_line({static:true,w:760,h:300,labels:held.map(a=>a.short),title:"Class average per assessment",series:[{name:"Class mean",vals:held.map(a=>a.mean)},{name:"Median",vals:held.map(a=>a.median),dash:true}],ref:[{y:S.passMark,label:"Pass",color:"bad"}]}));
      if(im){im.caption="Class mean and median per assessment (pass mark "+S.passMark+"%).";CH.push(im)}
    }
    const bi=await chart(PCH_bars({static:true,w:760,h:260,labels:["0-9","10-19","20-29","30-39","40-49","50-59","60-69","70-79","80-89","90-100"],vals:sm.bands,max:Math.ceil(Math.max(4,...sm.bands)/4)*4,title:"Distribution of semester results",colors:sm.bands.map((v,i)=>i<S.passMark/10?"bad":"accent")}));
    if(bi){bi.caption="Learners per 10% band of semester result (red = below pass mark).";CH.push(bi)}
    const tv=["bi","form","sum"].filter(t=>sm.byType[t]!=null);
    if(tv.length){
      const ti=await chart(PCH_bars({static:true,w:760,h:240,labels:tv.map(t=>t==="bi"?"Bi-weekly":t==="form"?"Formative":"Summative"),vals:tv.map(t=>sm.byType[t]),max:100,ref:[{y:S.passMark,label:"Pass",color:"bad"}],title:"Average by assessment type"}));
      if(ti){ti.caption="Class average by assessment type.";CH.push(ti)}
    }
    const flush=()=>{for(let i=0;i<CH.length;i+=2)B.push({t:"cols",cols:CH.slice(i,i+2).map(x=>[x])});CH.length=0};
    // weak topics
    const tp={};
    an.assess.filter(a=>a.held&&a.mean!=null).forEach(a=>(a.topics||[]).forEach(t=>{const k=t.s+":"+t.n;(tp[k]=tp[k]||{t,v:[]}).v.push(a.mean)}));
    const tlist=Object.values(tp).map(o=>({t:o.t,m:o.v.reduce((x,y)=>x+y,0)/o.v.length})).sort((a,b)=>a.m-b.m);
    if(tlist.length){
      const tc=await chart(PCH_bars({static:true,w:760,h:260,labels:tlist.map(x=>"T"+x.t.n),vals:tlist.map(x=>x.m),max:100,colors:tlist.map(x=>x.m<S.passMark?"bad":x.m<S.watchMark?"warn":"good"),ref:[{y:S.passMark,label:"Pass",color:"bad"}],title:"Average by topic"}));
      if(tc){tc.caption="Class average by topic tag (red below pass mark, amber below watch level).";CH.push(tc)}
      flush();B.push({t:"h",l:2,text:"Topic strengths and weaknesses"});
      B.push({t:"table",head:["Topic","Class average","Comment"],widths:[5,1.6,3],zebra:true,fontSize:9,
        rows:tlist.map(x=>[topicName(x.t),pc(x.m),x.m<S.passMark?"Weak - reteach":x.m<S.watchMark?"Needs consolidation":"Secure"]),
        tone:tlist.map((x,i)=>x.m<S.passMark?[i,"bad"]:x.m<S.watchMark?[i,"warn"]:null).filter(Boolean)});
    }
    flush();
    // learners table (landscape for docx/pdf: whole doc landscape)
    B.push({t:"pb"});
    B.push({t:"h",l:1,text:"3. Learner results"});
    const ls=an.learners.slice().sort((a,b)=>(b.overall==null?-1:b.overall)-(a.overall==null?-1:a.overall));
    const order={critical:0,risk:1,watch:2,ontrack:3,nodata:4};
    const rowsL=ls.map(l=>[l.rank?String(l.rank):"-",nm[l.id],pc(l.byType.bi),pc(l.byType.form),pc(l.byType.sum),pc(l.overall),grade(l.overall),arrow(l.slope)+(l.slope==null?"":" ("+(l.slope>0?"+":"")+l.slope.toFixed(1)+")"),ST[l.status]]);
    B.push({t:"table",head:["Rank","Learner","Bi-weekly","Formative","Summative","Semester %","Grade","Trend (pts/test)","Status"],widths:[0.8,3.2,1.3,1.3,1.4,1.4,1,2.2,1.5],zebra:true,fontSize:9,rows:rowsL,
      tone:ls.map((l,i)=>l.status==="critical"||l.status==="risk"?[i,"bad"]:l.status==="watch"?[i,"warn"]:null).filter(Boolean)});
    B.push({t:"p",size:8,italic:true,text:"Grades use the default bands A* 90, A 80, B 70, C 60, D 50, E 40, F 30, G 20 (percent). Absent (A) marks are excluded, not counted as zero."});
    // at risk
    B.push({t:"h",l:1,text:"4. Weak learners and learners at risk"});
    const risk=an.learners.filter(l=>["critical","risk","watch"].includes(l.status)).sort((a,b)=>order[a.status]-order[b.status]||(a.overall||0)-(b.overall||0));
    if(!risk.length)B.push({t:"box",tone:"good",title:"No learners flagged",text:"All learners with results are meeting expectations."});
    else B.push({t:"table",head:["Learner","Status","Semester %","Why flagged","Weak topics"],widths:[2.4,1.3,1.2,6,3],zebra:true,fontSize:9,
      rows:risk.map(l=>[nm[l.id],ST[l.status],pc(l.overall),l.reasons.join("\n"),l.weakTopics.slice(0,3).map(w=>"T"+w.n+" ("+w.fails+" below pass)").join(", ")||"-"]),
      tone:risk.map((l,i)=>[i,l.status==="watch"?"warn":"bad"])});
    B.push({t:"box",tone:"info",title:"How risk is worked out",items:[
      "Critical: several serious flags together, or an overall result far below the pass mark.",
      "At risk: overall below the pass mark ("+S.passMark+"%), a drop of "+S.dropPts+" points or more between earlier and recent results, 3 or more assessments missed, or a summative result below the pass mark.",
      "Watch: overall below "+S.watchMark+"%, a downward trend, latest result below the pass mark, repeated absences or a missed assessment.",
      "Trend is the least-squares slope of the learner's results in date order; at least 3 results are needed. Flags are prompts for teacher judgement, not decisions."]});
    // interventions
    const ints=(c.interventions||[]).filter(i=>nm[i.learnerId]);
    if(opts.interventions){
      B.push({t:"h",l:1,text:"5. Interventions and extra work"});
      if(!ints.length)B.push({t:"p",text:"No interventions have been assigned yet."});
      else{
        B.push({t:"table",head:["Learner","Type","Task / resource","Due","Status","Before","After"],widths:[2.2,2,4,1.4,1.4,1,1],zebra:true,fontSize:9,
          rows:ints.map(i=>[nm[i.learnerId],i.type||"",(i.title||"")+(i.resource&&i.resource.label?"\n"+i.resource.label:""),i.due||"-",i.status||"",pc(i.before),pc(i.after)])});
        const dn=ints.filter(i=>i.before!=null&&i.after!=null);
        if(dn.length){const d=dn.reduce((s,i)=>s+i.after-i.before,0)/dn.length;B.push({t:"p",text:"Impact: across "+dn.length+" intervention(s) with before and after results, the average change is "+(d>=0?"+":"")+d.toFixed(1)+" percentage points."})}
      }
      const plan=risk.filter(l=>l.status!=="watch");
      plan.forEach(l=>{
        B.push({t:"pb"});
        B.push({t:"h",l:1,text:"Support plan: "+nm[l.id]});
        B.push({t:"kv",pairs:[["Class",c.name],["Period",year+" - "+semL],["Semester result",pc(l.overall)+" (grade "+grade(l.overall)+")"],["Status",ST[l.status]],["Bi-weekly / Formative / Summative",pc(l.byType.bi)+" / "+pc(l.byType.form)+" / "+pc(l.byType.sum)]]});
        B.push({t:"h",l:3,text:"Concerns"});B.push({t:"ul",items:l.reasons});
        if(l.weakTopics.length){B.push({t:"h",l:3,text:"Topics to revisit"});B.push({t:"ul",items:l.weakTopics.slice(0,5).map(w=>topicName({s:w.s,n:w.n}))})}
        const mine=ints.filter(i=>i.learnerId===l.id);
        B.push({t:"h",l:3,text:"Agreed actions"});
        if(mine.length)B.push({t:"table",head:["Action","Resource / task","Due","Status"],widths:[2.5,5,1.5,1.5],fontSize:9,rows:mine.map(i=>[i.type||"",(i.title||"")+(i.resource&&i.resource.label?" - "+i.resource.label:"")+(i.note?"\n"+i.note:""),i.due||"-",i.status||""])});
        else B.push({t:"p",italic:true,text:"No actions assigned yet."});
        B.push({t:"p",text:"Review date: ____________________    Progress notes: ______________________________________________"});
        B.push({t:"sig",labels:["Teacher","Learner","Parent / guardian"]});
      });
    }
    const model={title:"Learner progress report",subtitle:c.name+" - "+year+" "+semL,orientation:"landscape",
      footer:"Generated by Cambridge Learning Hub - confidential: contains learner data",blocks:B};
    const data=opts.format==="docx"?await HUBDOC.docx(model):await HUBDOC.pdf(model);
    return{filename:slug(c.name)+"-"+year+"-"+sem+"-progress-report."+(opts.format==="docx"?"docx":"pdf"),data};
  }
  return{build};
})();
