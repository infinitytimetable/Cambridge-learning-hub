/* ===== Lesson plan generator (deterministic, built from the lesson data) =====
   PLANUI(app, env) is called by app.js for the route #<subject>/plan.
   env = {SUB,U,S,subKey,F,plain,saveFile,pick}. The plan is built as editable HTML; every export
   (print, text, Word .docx, HTML) is read back from that live DOM so teacher edits are kept. */
(function(){
"use strict";

/* ---------- small helpers ---------- */
const SUBM={"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉","+":"₊","-":"₋","−":"₋","=":"₌","(":"₍",")":"₎","a":"ₐ","e":"ₑ","o":"ₒ","x":"ₓ","n":"ₙ","i":"ᵢ"};
const SUPM={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","+":"⁺","-":"⁻","−":"⁻","=":"⁼","(":"⁽",")":"⁾","n":"ⁿ","i":"ⁱ"};
function mapAll(s,m,fallback){let o="";for(const c of s){if(!(c in m))return fallback+s;o+=m[c]}return o}
const uSub=s=>mapAll(s,SUBM,"_");
const uSup=s=>mapAll(s,SUPM,"^");
function markup(s){return String(s).replace(/~([^~<>]+)~/g,(m,a)=>uSub(a)).replace(/\^([^\^<>]+)\^/g,(m,a)=>uSup(a))}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function dom(html){const d=document.createElement("div");d.innerHTML=String(html||"").replace(/\{\{[A-Z0-9_]+\}\}/g,"");return d}
function flat(d){d.querySelectorAll("sub").forEach(n=>n.replaceWith(uSub(n.textContent)));d.querySelectorAll("sup").forEach(n=>n.replaceWith(uSup(n.textContent)));return d}
function txt(html){const d=flat(dom(html));return markup(d.textContent.replace(/\s+/g," ").trim())}
function items(html){const d=flat(dom(html));const li=[...d.querySelectorAll("li")].map(n=>markup(n.textContent.replace(/\s+/g," ").trim())).filter(Boolean);if(li.length)return li;return [...d.querySelectorAll("p")].map(n=>markup(n.textContent.replace(/\s+/g," ").trim())).filter(Boolean)}
function firstSentence(s,max){s=String(s||"").trim();if(!s)return "";const m=s.match(/^.{20,}?[.!?](\s|$)/);let r=m?m[0].trim():s;if(r.length>(max||170))r=r.slice(0,(max||170)-1).replace(/\s+\S*$/,"")+"…";return r}
function lc(s){return s?s.charAt(0).toLowerCase()+s.slice(1):s}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s}
function uniq(a){return [...new Set(a)]}

/* notes -> sections */
function sections(l){
  const parts=String(l.notes||"").split(/<h4>/i).slice(1);
  return parts.map(p=>{
    const i=p.indexOf("</h4>"),th=p.slice(0,i),body=p.slice(i+5);
    const ext=/extended/i.test(th);
    const title=txt(th.replace(/<i>\s*\(?[^<]*Extended[^<]*\)?\s*<\/i>/i,"").replace(/\s*\(Extended( only)?\)/i,"")).replace(/\s*\(Extended( only)?\)\s*$/i,"");
    const d=dom(body);
    const key=[...d.querySelectorAll(".key")].map(k=>txt(k.innerHTML));
    const first=d.querySelector("p");
    return {title,ext,key,lead:first?txt(first.innerHTML):txt(body)};
  });
}

/* ---------- plan generation ---------- */
const FOCUS={
  introduction:{label:"Introducing new content",w:[12,18,34,22,14]},
  practical:{label:"Practical and investigation",w:[10,36,18,22,14]},
  consolidation:{label:"Consolidation",w:[10,18,22,32,18]},
  revision:{label:"Revision and exam practice",w:[10,8,24,38,20]}
};
function alloc(total,w){
  const sum=w.reduce((a,b)=>a+b,0);let m=w.map(x=>Math.round(total*x/sum/5)*5);
  m=m.map(x=>w.length&&x<5&&x!==0?5:x);
  let diff=total-m.reduce((a,b)=>a+b,0);
  // put the difference into the largest block
  const k=m.indexOf(Math.max(...m));m[k]+=diff;
  return m;
}
const EQUIP=["eye protection","safety glasses","beaker","boiling tube","test tube","conical flask","measuring cylinder","burette","pipette","Bunsen burner","tripod","gauze","heatproof mat","thermometer","stopwatch","balance","filter paper","filter funnel","evaporating basin","crucible","spatula","dropper","glass rod","litmus","universal indicator","pH paper","limewater","iodine","Benedict","biuret","ethanol","hydrochloric acid","sulfuric acid","nitric acid","sodium hydroxide","copper sulfate","magnesium","zinc","iron","copper","carbon electrodes","power pack","wires","crocodile clips","ammeter","voltmeter","gas syringe","delivery tube","clamp stand","white tile","microscope","slide","cover slip","scalpel","forceps","knife","potato","visking tubing","potometer","hand lens","ruler","quadrat","tape measure","yeast","glucose","sucrose","cotton wool","water bath","hydrogencarbonate indicator","leaf","petri dish","graph paper","coloured pencils","scissors","card","sticky notes","mini whiteboards","calculator"];
const SAFE={
  chem:[[/acid|alkali|hydroxide|corros/i,"Acids and alkalis: wear eye protection, wipe spills at once and keep solutions dilute."],[/bunsen|heat|boil|flame|burn/i,"Heating: tie back hair, use heatproof mats, never leave a flame unattended, point tubes away from faces."],[/electrolys|electrode|power pack|current/i,"Electrolysis: low-voltage supply only; chlorine and bromine must be made in a fume cupboard or as a demonstration."],[/chlorine|bromine|ammonia|sulfur dioxide|nitrogen dioxide|fume/i,"Toxic gases: demonstration only, in a fume cupboard, with class risk assessment."],[/ethanol|propanol|flammable|alkane|hexane/i,"Flammable liquids: keep away from naked flames and use small volumes."],[/copper|lead|barium|silver|nitrate|heavy metal/i,"Metal compounds: avoid skin contact and wash hands; dispose of waste in the labelled container."]],
  bio:[[/microscope|slide|cover slip/i,"Microscopes: carry with two hands, never use direct sunlight, handle slides and cover slips carefully."],[/scalpel|knife|blade|cut|dissect/i,"Sharp tools: cut away from the body onto a tile, one person cutting at a time."],[/iodine|biuret|benedict|indicator|ethanol/i,"Test reagents: wear eye protection, keep ethanol away from flames, avoid skin contact with iodine and Benedict's solution."],[/water bath|hot water|boil|heat/i,"Hot water: use a kettle only under supervision, keep water baths below 80 °C, and keep bags and stools clear."],[/yeast|bacteria|culture|microorgan|petri/i,"Microorganisms: use sterile technique, keep dishes taped shut and never open cultures grown from the environment."],[/plant|leaf|seed|flower|pollen|living|animal|exercise|pulse/i,"Living material: wash hands afterwards, check for allergies (pollen, latex, nuts) and for health conditions before exercise tasks."]]
};
const MISC={
  chem:["Learners mix up the meanings of atom, ion and molecule, or of mass and moles.","Check every equation is balanced by changing coefficients, never subscripts.","Observations must say what is seen (colour change, bubbles, precipitate), not the conclusion."],
  bio:["Learners use everyday meanings for terms such as respiration, diffusion or adaptation.","Check that explanations link structure to function and use the key word asked for.","Describe-and-explain questions need a reason (because…) as well as a statement."]
};

function buildPlan(l,u,o,env){
  const SUB=env.SUB,bio=env.subKey==="bio"||env.subKey==="alevel";
  const secs=sections(l);
  const useExt=o.tier!=="Core";
  const coreSecs=secs.filter(s=>!s.ext),extSecs=secs.filter(s=>s.ext);
  const teachSecs=useExt?secs:coreSecs.length?coreSecs:secs;
  const ibl=l.ibl||{},iblQ=txt(ibl.q||""),task=items(ibl.task),act=items(ibl.act);
  const actHead=txt(ibl.act||"").split(/[.:]/)[0];
  const pr=l.pr||[],ws=l.ws||[];
  const wsMarks=ws.reduce((a,q)=>a+(+q[2]||0),0);
  const prev=l.idx>0?u.lessons[l.idx-1]:null,next=u.lessons[l.idx+1]||null;
  const F0=FOCUS[o.focus]||FOCUS.introduction;
  const practical=o.practical&&act.length>0;
  const mins=+o.mins;
  const w=F0.w.slice();
  if(!practical){w[2]+=Math.round(w[1]/2);w[3]+=w[1]-Math.round(w[1]/2);w[1]=0}
  const ms=alloc(mins,w);
  // double period (80 min, one lesson): add a mid-lesson checkpoint and an apply-and-extend block
  let extMin=0,chkMin=0;
  if(o.double&&mins>=80){chkMin=5;ms[2]=Math.max(5,ms[2]-5);extMin=Math.max(10,Math.round(ms[3]*0.4/5)*5);ms[3]=Math.max(5,ms[3]-extMin)}
  let clock=+o.offset||0;const stamp=n=>{const a=clock;clock+=n;return a+"–"+clock+" min"};
  const vocab=(l.cards||[]).map(c=>[txt(c[0]),txt(c[1])]).filter(c=>c[0].length<=48&&c[0].length>0);
  const vocabT=vocab.filter(c=>!/\?$/.test(c[0])&&c[0].split(" ").length<=6);if(vocabT.length>=4){vocab.length=0;vocab.push(...vocabT)}
  const kw=uniq(vocab.map(c=>c[0])).slice(0,12);

  const meta=[["Subject",SUB.title],["Topic",`Topic ${u.n}: ${txt(u.name)}`],["Lesson",`${l.no} ${txt(l.t)}`],["Class",o.cls||"—"],["Teacher",o.teacher||"—"],["School",o.school||"—"],["Date",o.date||"—"],["Length",`${mins} minutes`],["Tier",o.tier==="Mixed"?"Mixed (Core and Extended)":o.tier],["Class size",o.size||"—"],["Focus",F0.label]];

  const S=[];
  // objectives
  const obj=teachSecs.map(s=>`${s.ext?"Extended: ":""}Explain and use the ideas in “${s.title}”.`);
  if(!teachSecs.length)obj.push(txt(l.sum));
  S.push({h:"Learning objectives",b:[{t:"p",x:txt(l.sum)},{t:"ul",items:obj}]});
  // success criteria
  const sc=teachSecs.map(s=>`I can explain and use the ideas in “${s.title}”.${s.ext?" (Extended)":""}`);
  sc.push("I can score at least 80% on the practice questions at the end of the lesson.");
  sc.push("I can answer exam-style questions on this topic and use the mark scheme to improve.");
  S.push({h:"Success criteria",b:[{t:"ul",items:sc}]});
  // prior knowledge
  const prior=o.prior&&o.prior.trim()?[o.prior.trim()]:[prev?`Lesson ${prev.no} “${txt(prev.t)}”: ${firstSentence(txt(prev.sum),140)}`:`This is the first lesson of Topic ${u.n}. Check what learners already know about ${lc(txt(u.name))} from earlier years.`,next?`Next lesson: ${next.no} “${txt(next.t)}”.`:"This is the last lesson in the topic. Link to the topic quiz and exam-style questions."];
  S.push({h:"Prior learning and links",b:[{t:"ul",items:prior}]});
  // vocab
  if(vocab.length)S.push({h:"Key vocabulary",b:[{t:"table",head:["Term","Meaning"],rows:vocab.slice(0,10).map(c=>[c[0],c[1]]),w:[28,72]}]});
  // resources
  const hay=(ibl.task||"")+" "+(ibl.act||"");
  const mat=EQUIP.filter(e=>new RegExp("\\b"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i").test(txt(hay)));
  const res=[`Hub lesson ${l.no}: project the Engage, Explain, Practise and Reflect tabs.`,`Worksheet (${ws.length} questions, ${wsMarks} marks) with mark scheme.`,`${pr.length} practice questions with instant feedback.`,`${(l.cards||[]).length} flashcards for retrieval practice.`,"Optional: use “Export PowerPoint” on the lesson page for a slide deck of this lesson.",`Topic ${u.n} exam-style questions (${(u.pp||[]).length}) and a topic quiz (${(u.quiz||[]).length} questions).`];
  if(ibl.link&&ibl.link[0])res.push(`Online resource: ${ibl.link[1]||ibl.link[0]} (${ibl.link[0]}).`);
  if(practical&&mat.length)res.push("Likely equipment for the activity (check against the activity text): "+mat.join(", ")+".");
  res.push("Mini whiteboards or scrap paper, and the learners’ inquiry journals.");
  S.push({h:"Resources",b:[{t:"ul",items:res}]});

  // sequence
  const rows=[];
  const verbs=o.focus==="revision"?["Retrieve","Practise"]:["Introduce","Explain"];
  const kT=Math.round(ms[0]);
  if(o.ibl&&iblQ){
    rows.push([stamp(ms[0]),"Engage",[`Share the objectives and success criteria.`,`Pose the inquiry question: “${iblQ}”.`,`Take initial ideas without correcting them yet.`],[`Work through the starter steps${task.length?` (for example: ${firstSentence(task[0],110)})`:""}.`,"Record predictions and questions in the inquiry journal."],"Lesson ▸ Engage tab"]);
  }else{
    rows.push([stamp(ms[0]),"Engage",["Share the objectives and success criteria.","Run a quick retrieval starter on prior learning (3 questions on mini whiteboards).",prev?`Link back to “${txt(prev.t)}”.`:"Link to what learners already know."],["Answer the retrieval questions.","Self-assess against the success criteria."],"Lesson ▸ Engage tab"]);
  }
  if(practical){
    rows.push([stamp(ms[1]),"Explore",[`Set up the activity${actHead?`: ${actHead}`:""}. Go over safety first.`,"Circulate and ask probing questions: What do you notice? Why do you think that happened?",`Note groups that need support.`],[act[0]?firstSentence(act[0],170):"Carry out the investigation in groups.","Record results and observations.","Compare findings with the starter predictions."],"Lesson ▸ Explore tab"]);
  }
  // explain rows (group when many sections)
  let eSecs=teachSecs.map(s=>s);
  let groups=[];
  const maxRows=Math.max(1,Math.min(5,Math.floor(ms[2]/5)));const per=Math.ceil(eSecs.length/maxRows)||1;
  for(let i=0;i<eSecs.length;i+=per)groups.push(eSecs.slice(i,i+per));
  if(!groups.length)groups=[[{title:txt(l.t),ext:false,lead:txt(l.sum),key:[]}]];
  const gm=alloc(ms[2],groups.map(()=>1));
  groups.forEach((g,i)=>{
    const tl=g.map(s=>`“${s.title}”${s.ext?" (Extended)":""}`);const titles=tl.length>3?tl.slice(0,2).join(", ")+` and ${tl.length-2} more sections`:tl.join(" and ");
    const lead=g.map(s=>s.lead).filter(Boolean).map(x=>firstSentence(x,140));
    rows.push([stamp(gm[i]),i===0?"Explain":"Explain (cont.)",[`${verbs[1]} ${titles} using the slides and diagrams.`,...(lead[0]?[`Key idea: ${lead[0]}`]:[]),"Stop after each slide for a cold-call question, then link back to the inquiry question."],["Annotate diagrams and take brief notes.","Answer questions and explain ideas to a partner.",...(g.some(s=>s.ext)?["Extended learners record the Supplement points; Core learners listen and ask questions."]:[])],`Lesson ▸ Explain tab${g.length===1?" ▸ "+g[0].title:""}`]);
  });
  if(chkMin)rows.push([stamp(chkMin),"Checkpoint",["Pause for a mini-plenary: three questions on mini whiteboards covering the ideas so far.","Reteach anything the class got wrong before moving on."],["Answer on mini whiteboards and hold answers up.","Correct any misconceptions."],"Practice ▸ quick questions"]);
  rows.push([stamp(ms[3]),"Practise",[`Model the first worksheet question and annotate the mark scheme.`,"Learners attempt the worksheet and the practice questions; circulate and use the mark scheme for feedback.",`Use the self-marking practice (${pr.length} questions) as a progress check.`],[`Complete the worksheet (${ws.length} questions, ${wsMarks} marks) and the practice questions.`,"Self- or peer-mark with the mark scheme and correct in a different colour."],"Lesson ▸ Practise tab"]);
  if(extMin){const hardT=(u.pp||[]).slice().sort((a,b)=>b.marks-a.marks).slice(0,2).map(p=>`“${txt(p.title)}” (${p.marks} marks)`);
    rows.push([stamp(extMin),"Apply and extend",[hardT.length?`Set harder exam-style questions from the topic: ${hardT.join("; ")}.`:"Set one or two harder exam-style questions from the topic.","Learners work under timed conditions, then peer-mark with the mark scheme.",extSecs.length?`Release the Extended slides to learners who are ready: ${extSecs.map(x=>"“"+x.title+"”").join(", ")}.`:"Ask fast finishers to explain the ideas in a new context."],["Answer the exam-style questions in full sentences.","Peer-mark, then correct and improve one answer."],"Exam questions page"])}
  rows.push([stamp(ms[4]),"Reflect",["Run the flashcard deck on the board for retrieval.",`Plenary exit ticket: return to “${iblQ||txt(l.t)}”.`,"Collect exit tickets and note who needs support next lesson."],["Test themselves with flashcards.","Answer the exit ticket and complete the success-criteria checklist."],"Lesson ▸ Reflect tab"]);
  S.push({h:"Lesson sequence",b:[{t:"table",head:["Time","Stage","Teacher actions","Learner actions","Hub reference"],rows,w:[10,9,34,31,16],cls:"seq"}]});

  // questioning
  const qs=[];
  pr.forEach(q=>{if(qs.length>=5)return;let ans="";if(q.t==="mcq")ans=txt(q.o[q.a]);else if(q.t==="num")ans=(q.a+(q.u?" "+txt(q.u):""));else ans=txt(q.a[0]);qs.push(`${txt(q.q)} — Answer: ${ans}${q.e?`. ${firstSentence(txt(q.e),130)}`:""}`)});
  ws.slice(0,2).forEach(q=>qs.push(`${txt(q[0])} — Mark scheme: ${firstSentence(txt(q[1]),150)}`));
  S.push({h:"Key questions to ask",b:[{t:"p",x:"Use these with mini whiteboards or cold-calling. Answers follow the dash."},{t:"ul",items:qs.slice(0,6)}]});

  // differentiation
  const hard=(u.pp||[]).slice().sort((a,b)=>b.marks-a.marks).slice(0,2).map(p=>`“${txt(p.title)}” (${p.marks} marks)`);
  const sup=["Provide sentence starters and the key vocabulary table; allow learners to use flashcards while working.","Pair with a confident partner for the activity; give structured step cards.","Start the worksheet with questions 1–2 and use the diagrams on the Explain slides as prompts.","Pre-teach the key terms in the starter."];
  const core=["Complete the worksheet and the practice questions, aiming for at least 80%.","Explain answers using the key words from the notes.","Use the mark scheme to self-assess and redraft one answer."];
  const cha=[extSecs.length?`Extended content: ${extSecs.map(s=>"“"+s.title+"”").join(", ")}.`:"Explain the ideas in a new context and justify with evidence.",hard.length?`Attempt harder exam-style questions from the topic: ${hard.join("; ")}.`:"Attempt the hardest exam-style questions from the topic.",iblQ?`Design a follow-up investigation to answer: “${iblQ}”.`:"Design a follow-up investigation."];
  let diff=o.diff==="Support"?[["Support (priority)",sup],["Core",core],["Challenge",cha.slice(0,2)]]:o.diff==="Challenge"?[["Challenge (priority)",cha],["Core",core],["Support",sup.slice(0,3)]]:[["Support",sup.slice(0,3)],["Core",core],["Challenge",cha]];
  const tierNote=o.tier==="Core"?"Tier: Core. Extended content is left for extension.":o.tier==="Extended"?"Tier: Extended. Supplement content is taught in the Explain stage.":"Tier: Mixed. Teach the Core ideas to everyone, then release the Extended slides to those who are ready.";
  S.push({h:"Differentiation",b:[{t:"p",x:tierNote},{t:"table",head:["Group","Strategies"],rows:diff.map(d=>[d[0],{ul:d[1]}]),w:[18,82]}]});

  // AfL
  const tips=uniq(secs.flatMap(s=>s.key)).slice(0,4).map(k=>firstSentence(k,200));
  S.push({h:"Assessment for learning and misconceptions",b:[{t:"ul",items:[...MISC[bio?"bio":"chem"],...tips.map(t=>"From the notes: "+t)]},{t:"p",x:`Evidence of progress: success-criteria checklist, worksheet marks, practice score (aim 80%+), exit ticket${practical?", practical observations":""}.`}]});

  // safety
  const safeSrc=txt(hay+" "+(l.notes||"")+" "+SUB.safety);
  const sf=[SUB.safety];
  (SAFE[bio?"bio":"chem"]).forEach(r=>{if(r[0].test(txt(hay)))sf.push(r[1])});
  if(!practical)sf.push("No practical work is planned in this version of the lesson. If you add the activity, complete a risk assessment first.");
  else sf.push("Complete a risk assessment and follow school and CLEAPSS (or equivalent) guidance before the practical.");
  S.push({h:"Safety notes",b:[{t:"ul",items:uniq(sf)}]});

  // homework
  if(o.homework){
    const words=txt(l.t).toLowerCase().split(/[^a-z]+/).filter(x=>x.length>3);
    const scored=(u.pp||[]).map(p=>({p,s:words.filter(x=>txt(p.title).toLowerCase().includes(x)).length}));
    scored.sort((a,b)=>b.s-a.s);
    const pick=scored.slice(0,3).map(x=>`Exam-style question: “${txt(x.p.title)}” (${x.p.marks} marks) in the Exam questions section, Topic ${u.n}.`);
    S.push({h:"Homework and extension",b:[{t:"ul",items:[...pick,"Finish the worksheet, then mark it and correct mistakes.","Make 5 revision flashcards for this lesson and test a family member.",`Attempt the Topic ${u.n} quiz once the topic is complete.`]}]});
  }
  // plenary
  S.push({h:"Plenary",b:[{t:"ul",items:[iblQ?`Return to the inquiry question: “${iblQ}”. Learners rewrite their answer using today’s key words.`:`Learners rewrite what they know about “${txt(l.t)}” using today’s key words.`,"3–2–1: three things learned, two key words, one question still open.","Traffic-light the success criteria."]}]});
  // reflection
  S.push({h:"Teacher reflection",b:[{t:"lines",label:"What went well",n:2},{t:"lines",label:"Even better if",n:2},{t:"lines",label:"Learners needing follow-up",n:2},{t:"lines",label:"Next steps",n:2}]});

  return {title:`Lesson plan: ${txt(l.t)}`,sub:`${SUB.title} · ${meta[1][1]} · Lesson ${l.no}`,meta,sections:S};
}

/* ---------- rendering ---------- */
function cellHTML(c){
  if(c&&c.ul)return "<ul>"+c.ul.map(x=>`<li>${esc(x)}</li>`).join("")+"</ul>";
  if(Array.isArray(c))return "<ul>"+c.map(x=>`<li>${esc(x)}</li>`).join("")+"</ul>";
  return esc(c);
}
function blockHTML(b){
  if(b.t==="p")return `<p>${esc(b.x)}</p>`;
  if(b.t==="ul")return "<ul>"+b.items.map(x=>`<li>${esc(x)}</li>`).join("")+"</ul>";
  if(b.t==="lines")return `<div class="pl-lines"><b>${esc(b.label)}</b>${"<div class='pl-line'><br></div>".repeat(b.n)}</div>`;
  if(b.t==="table"){
    const cg="<colgroup>"+b.w.map(x=>`<col style="width:${x}%">`).join("")+"</colgroup>";
    return `<div class="pl-tw"><table class="pl-t ${b.cls||""}">${cg}<thead><tr>${b.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===0&&b.cls==="seq"?' class="pl-time"':""}>${cellHTML(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  return "";
}
function planHTML(p){
  return `<h1>${esc(p.title)}</h1><p class="pl-sub">${esc(p.sub)}</p>
<div class="pl-tw"><table class="pl-t pl-meta"><tbody>${(()=>{let h="";for(let i=0;i<p.meta.length;i+=2){const a=p.meta[i],b=p.meta[i+1];h+=`<tr><th>${esc(a[0])}</th><td>${esc(a[1])}</td>${b?`<th>${esc(b[0])}</th><td>${esc(b[1])}</td>`:"<th></th><td></td>"}</tr>`}return h})()}</tbody></table></div>`+
  p.sections.map(s=>`<h2>${esc(s.h)}</h2>${s.b.map(blockHTML).join("")}`).join("");
}

/* ---------- reading the live DOM for exports ---------- */
function runs(node,acc,st){
  node.childNodes.forEach(n=>{
    if(n.nodeType===3){if(n.nodeValue)acc.push({t:n.nodeValue,b:st.b})}
    else if(n.nodeType===1){
      const tag=n.tagName;
      if(tag==="BR")acc.push({br:1});
      else if(tag==="UL"||tag==="OL"||tag==="DIV"||tag==="P"||tag==="LI"){/* handled by caller */ runs(n,acc,st)}
      else runs(n,acc,{b:st.b||tag==="B"||tag==="STRONG"||tag==="TH"})
    }
  });
  return acc;
}
function paras(cell){ // -> [{runs,bullet}] from a td/th
  const out=[];
  const walk=(el)=>{
    let cur=[];
    const flush=(bullet)=>{if(cur.some(r=>r.t&&r.t.trim()))out.push({runs:cur,bullet:!!bullet});cur=[]};
    el.childNodes.forEach(n=>{
      if(n.nodeType===1&&n.tagName==="UL"){flush(0);n.querySelectorAll(":scope>li").forEach(li=>{out.push({runs:runs(li,[],{b:cell.tagName==="TH"}),bullet:true})})}
      else if(n.nodeType===1&&(n.tagName==="P"||n.tagName==="DIV")){flush(0);out.push({runs:runs(n,[],{b:cell.tagName==="TH"}),bullet:false})}
      else if(n.nodeType===1&&n.tagName==="BR"){flush(0)}
      else if(n.nodeType===3){cur.push({t:n.nodeValue,b:cell.tagName==="TH"})}
      else if(n.nodeType===1){runs(n,cur,{b:cell.tagName==="TH"||n.tagName==="B"})}
    });
    flush(0);
  };
  walk(cell);
  return out.length?out:[{runs:[{t:"",b:false}],bullet:false}];
}
function readDoc(root){
  const blocks=[];
  root.childNodes.forEach(n=>{
    if(n.nodeType!==1)return;
    const tag=n.tagName;
    if(tag==="H1")blocks.push({k:"h1",t:n.textContent.trim()});
    else if(tag==="H2")blocks.push({k:"h2",t:n.textContent.trim()});
    else if(tag==="P")blocks.push({k:"p",runs:runs(n,[],{b:n.classList.contains("pl-sub")?false:false}),sub:n.classList.contains("pl-sub")});
    else if(tag==="UL")n.querySelectorAll(":scope>li").forEach(li=>blocks.push({k:"li",runs:runs(li,[],{b:false})}));
    else if(n.classList.contains("pl-pb"))blocks.push({k:"pb"});
    else if(n.classList.contains("pl-lines")){const lab=n.querySelector("b");blocks.push({k:"lab",t:lab?lab.textContent:""});n.querySelectorAll(".pl-line").forEach(l=>blocks.push({k:"line",t:l.textContent.trim()}))}
    else if(n.classList.contains("pl-tw")){
      const t=n.querySelector("table");if(!t)return;
      const widths=[...t.querySelectorAll("col")].map(c=>parseFloat(c.style.width)||0);
      const rows=[...t.querySelectorAll("tr")].map(tr=>[...tr.children].map(c=>({th:c.tagName==="TH",paras:paras(c)})));
      blocks.push({k:"table",rows,widths,meta:t.classList.contains("pl-meta")});
    }
  });
  return blocks;
}
const rtext=r=>r.map(x=>x.br?"\n":x.t).join("").replace(/\s+/g," ").trim();
function toText(blocks){
  const L=[];
  blocks.forEach(b=>{
    if(b.k==="h1")L.push(b.t.toUpperCase(),"");
    else if(b.k==="pb")L.push("","----------------------------------------","");
    else if(b.k==="h2")L.push("","## "+b.t);
    else if(b.k==="p")L.push(rtext(b.runs));
    else if(b.k==="li")L.push("  • "+rtext(b.runs));
    else if(b.k==="lab")L.push(b.t+":");
    else if(b.k==="line")L.push(b.t||"  ______________________________");
    else if(b.k==="table"){b.rows.forEach(r=>L.push(r.map(c=>c.paras.map(p=>(p.bullet?"• ":"")+rtext(p.runs)).filter(Boolean).join("; ")).join(" | ")))}
  });
  return L.join("\n").replace(/\n{3,}/g,"\n\n").trim()+"\n";
}

/* ---------- minimal .docx writer ---------- */
const X=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"");
function rXML(rs,extra){
  return rs.filter(r=>!r.br).map(r=>`<w:r><w:rPr>${(r.b||(extra&&extra.b))?"<w:b/>":""}${extra&&extra.sz?`<w:sz w:val="${extra.sz}"/>`:""}${extra&&extra.color?`<w:color w:val="${extra.color}"/>`:""}</w:rPr><w:t xml:space="preserve">${X(r.t)}</w:t></w:r>`).join("")||"<w:r><w:t></w:t></w:r>";
}
function pXML(rs,o){
  o=o||{};
  const pPr=`<w:pPr>${o.style?`<w:pStyle w:val="${o.style}"/>`:""}${o.bullet?'<w:ind w:left="284" w:hanging="227"/>':""}<w:spacing w:before="${o.before||0}" w:after="${o.after==null?60:o.after}"/></w:pPr>`;
  const rr=o.bullet?[{t:"• ",b:false},...rs]:rs;
  return `<w:p>${pPr}${rXML(rr,o)}</w:p>`;
}
function tblXML(b,total){
  const w=b.widths.length?b.widths:b.rows[0].map(()=>100/b.rows[0].length);
  const sum=w.reduce((a,c)=>a+c,0)||100;
  const tw=w.map(x=>Math.round(total*x/sum));
  const grid="<w:tblGrid>"+tw.map(x=>`<w:gridCol w:w="${x}"/>`).join("")+"</w:tblGrid>";
  const rows=b.rows.map((r,ri)=>{
    const head=!b.meta&&ri===0;
    return `<w:tr>${head?"<w:trPr><w:tblHeader/></w:trPr>":""}`+r.map((c,ci)=>{
      const shade=head?'<w:shd w:val="clear" w:color="auto" w:fill="0B3D3A"/>':c.th?'<w:shd w:val="clear" w:color="auto" w:fill="E6F2EE"/>':"";
      const ps=c.paras.map(p=>pXML(p.runs,{bullet:p.bullet,after:40,b:head||c.th,color:head?"FFFFFF":null,sz:20})).join("");
      return `<w:tc><w:tcPr><w:tcW w:w="${tw[ci]||1000}" w:type="dxa"/>${shade}</w:tcPr>${ps}</w:tc>`;
    }).join("")+"</w:tr>";
  }).join("");
  const bd=["top","left","bottom","right","insideH","insideV"].map(s=>`<w:${s} w:val="single" w:sz="4" w:space="0" w:color="BFDCD3"/>`).join("");
  return `<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/><w:tblBorders>${bd}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="90" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tblCellMar></w:tblPr>${grid}${rows}</w:tbl><w:p><w:pPr><w:spacing w:after="80"/></w:pPr></w:p>`;
}
async function toDocx(blocks,tpl){
  const TOTAL=15400;
  let body="";
  blocks.forEach(b=>{
    if(b.k==="pb")body+='<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
    else if(b.k==="h1")body+=`<w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:t xml:space="preserve">${X(b.t)}</w:t></w:r></w:p>`;
    else if(b.k==="h2")body+=`<w:p><w:pPr><w:pStyle w:val="Heading1"/><w:keepNext/></w:pPr><w:r><w:t xml:space="preserve">${X(b.t)}</w:t></w:r></w:p>`;
    else if(b.k==="p")body+=pXML(b.runs,{color:b.sub?"4D6573":null,after:b.sub?120:80});
    else if(b.k==="li")body+=pXML(b.runs,{bullet:true,after:40});
    else if(b.k==="lab")body+=pXML([{t:b.t,b:true}],{before:80,after:20});
    else if(b.k==="line")body+=`<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="999999"/></w:pBdr><w:spacing w:before="200" w:after="0"/></w:pPr><w:r><w:t xml:space="preserve">${X(b.t)}</w:t></w:r></w:p>`;
    else if(b.k==="table")body+=tblXML(b,TOTAL);
  });
  const doc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body}<w:sectPr>${tpl&&tpl.footer?'<w:footerReference w:type="default" r:id="rId2"/>':""}<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="259" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="60"/></w:pPr><w:rPr><w:rFonts w:ascii="Cambria" w:hAnsi="Cambria"/><w:b/><w:color w:val="0B3D3A"/><w:sz w:val="48"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:rFonts w:ascii="Cambria" w:hAnsi="Cambria"/><w:b/><w:color w:val="0E7C66"/><w:sz w:val="30"/></w:rPr></w:style></w:styles>`;
  const ct=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`;
  const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const drels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const z=new JSZip();
  const FT=tpl&&tpl.footer?`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="4D6573"/></w:rPr><w:t xml:space="preserve">${X(tpl.footer)}  ·  Page </w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`:"";
  if(FT){z.file("word/footer1.xml",FT)}
  z.file("[Content_Types].xml",FT?ct.replace("</Types>",'<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>'):ct);z.file("_rels/.rels",rels);z.file("word/document.xml",doc);z.file("word/styles.xml",styles);z.file("word/_rels/document.xml.rels",FT?drels.replace("</Relationships>",'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>'):drels);
  return z.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",compression:"DEFLATE"});
}

/* ---------- styles ---------- */
const U1="var(--u,1px)";
const px=n=>`calc(${n}*${U1})`;
const CSS=`
.pl-wrap{margin-top:${px(18)}}
.pl-form{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:${px(20)};box-shadow:var(--shadow);max-width:none}
.pl-form h2{font-size:${px(20)};margin:0 0 ${px(12)}}
.pl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${px(210)}),1fr));gap:${px(14)} ${px(16)}}
.pl-f{display:flex;flex-direction:column;gap:${px(5)};min-width:0}
.pl-f.wide{grid-column:1/-1}
.pl-f label,.pl-f .pl-lab{font:700 ${px(14)}/1.3 var(--f-body);color:var(--muted)}
.pl-f input,.pl-f select,.pl-f textarea{font:${px(16)}/1.4 var(--f-body);color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:9px;padding:${px(9)} ${px(12)};min-height:${px(44)};width:100%;min-width:0}
.pl-f textarea{min-height:${px(76)};resize:vertical}
.pl-f select{appearance:auto}
.pl-checks{display:flex;flex-wrap:wrap;gap:${px(10)} ${px(22)};align-items:center}
.pl-checks label{display:flex;gap:${px(8)};align-items:center;font:600 ${px(16)} var(--f-body);color:var(--ink);cursor:pointer}
.pl-checks input{width:${px(20)};height:${px(20)};accent-color:var(--accent)}
.pl-act{display:flex;flex-wrap:wrap;gap:${px(10)};margin-top:${px(18)}}
.pl-tools{display:flex;flex-wrap:wrap;gap:${px(10)};align-items:center;margin:${px(22)} 0 ${px(12)}}
.pl-tools .pl-hint{flex:1 1 100%;color:var(--muted);font-size:${px(14)};margin:0}
.pl-doc{background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:${px(24)};box-shadow:var(--shadow);outline:none;font-size:${px(16)};line-height:1.5}
.pl-doc:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.pl-doc h1{font-size:clamp(${px(26)},4vw,${px(38)});margin:0 0 ${px(4)};color:var(--accent)}
.pl-doc h2{font-size:${px(21)};margin:${px(26)} 0 ${px(8)};padding-bottom:${px(4)};border-bottom:2px solid var(--line);color:var(--ink)}
.pl-doc .pl-sub{color:var(--muted);margin:0 0 ${px(14)}}
.pl-doc p{margin:${px(6)} 0}
.pl-doc ul{margin:${px(6)} 0;padding-left:${px(22)}}
.pl-doc li{margin:${px(3)} 0}
.pl-tw{overflow-x:auto;margin:${px(8)} 0;-webkit-overflow-scrolling:touch}
.pl-t{border-collapse:collapse;width:100%;min-width:${px(560)};font-size:${px(15)}}
.pl-t th,.pl-t td{border:1px solid var(--line);padding:${px(8)} ${px(10)};text-align:left;vertical-align:top}
.pl-t thead th{background:var(--dk,#0B3D3A);color:#fff}
.pl-t.pl-meta{min-width:${px(480)}}
.pl-t.pl-meta th{background:var(--mint,var(--surface2));color:var(--ink);width:15%;white-space:nowrap}
.pl-t.seq{min-width:${px(900)}}
.pl-t td ul{margin:0;padding-left:${px(18)}}
.pl-t td.pl-time{font-weight:700;white-space:nowrap}
.pl-lines{margin:${px(8)} 0}
.pl-line{border-bottom:1px solid var(--line);min-height:${px(30)}}
.pl-msg{color:var(--accent);font-weight:700;font-size:${px(15)}}
@media (max-width:520px){.pl-doc,.pl-form{padding:${px(14)}}}
@media print{
  html,body{background:#fff!important;color:#000!important;padding:0!important}
  header.top,footer,.nav,.ltitle,.lsum,.pl-form,.pl-tools,body::before,.crumb{display:none!important}
  .page,main,#app{max-width:none!important;margin:0!important;padding:0!important}
  .pl-wrap{margin:0!important}
  .pl-doc{border:0!important;box-shadow:none!important;padding:0!important;background:#fff!important;color:#000!important;font-size:10.5pt!important}
  .pl-doc h1{font-size:20pt!important;color:#0B3D3A!important}
  .pl-doc h2{font-size:13pt!important;color:#0E7C66!important;break-after:avoid}
  .pl-t{font-size:9.5pt!important;min-width:0!important}
  .pl-t thead th{background:#0B3D3A!important;color:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .pl-t th,.pl-t td{border-color:#999!important}
  .pl-tw{overflow:visible!important}
  tr,.pl-lines{break-inside:avoid}
  @page{size:A4 landscape;margin:10mm}
}`;
function injectCSS(){
  let st=document.getElementById("pl-css");
  if(!st){st=document.createElement("style");st.id="pl-css";document.head.appendChild(st)}
  st.textContent=CSS+(typeof CSS2==="string"?CSS2:"");
}

/* ---------- page ---------- */
const LSKEY="hubplan.v1";
function loadPrefs(){try{return JSON.parse(localStorage.getItem(LSKEY)||"{}")}catch(e){return {}}}
function savePrefs(p){try{localStorage.setItem(LSKEY,JSON.stringify(p))}catch(e){}}

function singleUI(app,env){
  const U=env.U,pref=loadPrefs(),sk=env.subKey;
  const lastKey=(pref.last||{})[sk];
  let pickKey=env.pick||lastKey||"";
  let pu=U.find(x=>pickKey&&x.lessons.some(l=>l.key===pickKey))||U[0];
  const unitOpts=sel=>U.map(u=>`<option value="${u.n}"${u===sel?" selected":""}>Topic ${u.n}: ${esc(txt(u.name))}</option>`).join("");
  const lessOpts=(u,key)=>u.lessons.map(l=>`<option value="${l.key}"${l.key===key?" selected":""}>${esc(l.no+"  "+txt(l.t))}</option>`).join("");
  const key0=pu.lessons.some(l=>l.key===pickKey)?pickKey:pu.lessons[0].key;
  const v=(k,d)=>pref[k]!=null?pref[k]:d;
  const opt=(vals,cur)=>vals.map(x=>`<option${x===cur?" selected":""}>${esc(x)}</option>`).join("");
  app.innerHTML=`<div class="pl-wrap"><form class="pl-form" id="plf" autocomplete="off" onsubmit="return false">
<h2>Plan details</h2>
<div class="pl-grid">
<div class="pl-f"><label for="pl-u">Topic</label><select id="pl-u">${unitOpts(pu)}</select></div>
<div class="pl-f"><label for="pl-l">Lesson</label><select id="pl-l">${lessOpts(pu,key0)}</select></div>
<div class="pl-f"><label for="pl-mins">Lesson length</label><select id="pl-mins">${[40,50,60,80,100].map(m=>`<option value="${m}"${+v("mins",60)===m?" selected":""}>${m} minutes</option>`).join("")}</select></div>
<div class="pl-f"><label for="pl-tier">Tier</label><select id="pl-tier">${opt(["Core","Extended","Mixed"],v("tier","Mixed"))}</select></div>
<div class="pl-f"><label for="pl-focus">Lesson focus</label><select id="pl-focus">${Object.keys(FOCUS).map(k=>`<option value="${k}"${v("focus","introduction")===k?" selected":""}>${esc(FOCUS[k].label)}</option>`).join("")}</select></div>
<div class="pl-f"><label for="pl-diff">Differentiation emphasis</label><select id="pl-diff">${opt(["Balanced","Support","Challenge"],v("diff","Balanced"))}</select></div>
<div class="pl-f"><label for="pl-school">School</label><input id="pl-school" type="text" value="${esc(v("school",""))}"></div>
<div class="pl-f"><label for="pl-teacher">Teacher</label><input id="pl-teacher" type="text" value="${esc(v("teacher",""))}"></div>
<div class="pl-f"><label for="pl-cls">Class</label><input id="pl-cls" type="text" value="${esc(v("cls",""))}" placeholder="e.g. 10B"></div>
<div class="pl-f"><label for="pl-date">Date</label><input id="pl-date" type="date" value=""></div>
<div class="pl-f"><label for="pl-start">Start time (optional)</label><input id="pl-start" type="time" value=""></div>
<div class="pl-f"><label for="pl-week">Week</label><input id="pl-week" type="text" value="${esc(v("week",""))}" placeholder="e.g. 10"></div>
<div class="pl-f"><label for="pl-sup">Supervisor's name</label><input id="pl-sup" type="text" value="${esc(v("supervisor",""))}"></div>
<div class="pl-f"><label for="pl-layout">Plan layout</label><select id="pl-layout"><option value="tpl"${v("layout","tpl")==="tpl"?" selected":""}>School template (table)</option><option value="detail"${v("layout","tpl")==="detail"?" selected":""}>Detailed lesson page</option></select></div>
<div class="pl-f"><label for="pl-size">Class size</label><input id="pl-size" type="text" inputmode="numeric" value="${esc(v("size",""))}" placeholder="e.g. 28"></div>
<div class="pl-f wide"><label for="pl-prior">Prior learning (leave blank to fill automatically)</label><textarea id="pl-prior" placeholder="What the class already knows, or the lesson that came before"></textarea></div>
<div class="pl-f wide"><span class="pl-lab">Include</span><div class="pl-checks">
<label><input type="checkbox" id="pl-prac"${v("practical",true)?" checked":""}> Practical activity</label>
<label><input type="checkbox" id="pl-ibl"${v("ibl",true)?" checked":""}> Inquiry starter</label>
<label><input type="checkbox" id="pl-hw"${v("homework",true)?" checked":""}> Homework</label></div></div>
</div>
<div class="pl-act"><button class="btn pri" type="button" id="pl-go">Generate plan</button></div>
</form>
<div id="pl-out"></div></div>`;
  const $=s=>app.querySelector(s);
  const us=$("#pl-u"),ls=$("#pl-l");
  us.addEventListener("change",()=>{const u=U.find(x=>String(x.n)===us.value);ls.innerHTML=lessOpts(u,u.lessons[0].key)});
  const find=()=>{for(const u of U){const l=u.lessons.find(x=>x.key===ls.value);if(l&&String(u.n)===us.value)return [l,u]}return [U[0].lessons[0],U[0]]};
  function opts(){
    return {mins:$("#pl-mins").value,tier:$("#pl-tier").value,focus:$("#pl-focus").value,diff:$("#pl-diff").value,school:$("#pl-school").value.trim(),teacher:$("#pl-teacher").value.trim(),cls:$("#pl-cls").value.trim(),date:$("#pl-date").value?new Date($("#pl-date").value+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}):"",size:$("#pl-size").value.trim(),prior:$("#pl-prior").value,practical:$("#pl-prac").checked,ibl:$("#pl-ibl").checked,homework:$("#pl-hw").checked};
  }
  function generate(){
    const [l,u]=find(),o=opts();
    const p=loadPrefs();p.mins=+o.mins;p.tier=o.tier;p.focus=o.focus;p.diff=o.diff;p.school=o.school;p.teacher=o.teacher;p.cls=o.cls;p.size=o.size;p.week=$("#pl-week").value.trim();p.supervisor=$("#pl-sup").value.trim();p.layout=$("#pl-layout").value;p.practical=o.practical;p.ibl=o.ibl;p.homework=o.homework;p.last=Object.assign({},p.last,{[sk]:l.key});savePrefs(p);
    const tplMode=$("#pl-layout").value==="tpl";
    let plan,groups;
    try{
      if(tplMode){
        const dv=$("#pl-date").value,d=dv?new Date(dv+"T12:00:00"):null,mins=+o.mins;
        groups=PLAN_TEMPLATE.school.single({dayName:d?dayName(d):"",dateShort:d?fmtShort(d):"",time:tpTime($("#pl-start").value,mins,""),mins,l,u,o:{tier:o.tier,focus:o.focus,practical:o.practical,ibl:o.ibl},teacher:o.teacher,cls:o.cls,subject:tpSubj(sk),week:$("#pl-week").value.trim(),supervisor:$("#pl-sup").value.trim()});
      }else plan=buildPlan(l,u,o,env);
    }catch(e){console.error(e);$("#pl-out").innerHTML=`<p class="pl-msg">Sorry, the plan could not be built for this lesson.</p>`;return}
    $("#pl-out").innerHTML=`<div class="pl-tools"><button class="btn pri" type="button" data-a="print">Print or save as PDF</button><button class="btn" type="button" data-a="docx">Download Word (.docx)</button><button class="btn" type="button" data-a="html">Download HTML</button><button class="btn" type="button" data-a="copy">Copy as text</button><span class="pl-msg" id="pl-msg" role="status" aria-live="polite"></span><p class="pl-hint">The plan below is editable: click in any part of it to change the wording before you print or download.</p></div><div class="pl-doc${tplMode?" tp-doc":""}" id="pl-doc" contenteditable="true" spellcheck="true">${tplMode?PLAN_TEMPLATE.school.html(groups):planHTML(plan)}</div>`;
    const name=tplMode?PLAN_TEMPLATE.school.fileName(groups,null,{week:$("#pl-week").value.trim()}):`Lesson plan ${l.no} ${txt(l.t)}`.replace(/[^A-Za-z0-9 ._-]+/g,"").replace(/\s+/g," ").trim();
    const msg=t=>{const m=$("#pl-msg");if(m){m.textContent=t;setTimeout(()=>{if(m.textContent===t)m.textContent=""},3500)}};
    $("#pl-out").querySelector(".pl-tools").addEventListener("click",async e=>{
      const b=e.target.closest("button[data-a]");if(!b)return;
      const doc=$("#pl-doc"),a=b.dataset.a;
      try{
        if(a==="print"){window.print()}
        else if(a==="copy"){
          const t=tplMode?PLAN_TEMPLATE.school.text(PLAN_TEMPLATE.school.read(doc)):toText(readDoc(doc));
          try{await navigator.clipboard.writeText(t);msg("Copied to the clipboard.")}
          catch(err){const ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand("copy")}catch(x){}ta.remove();msg(ok?"Copied to the clipboard.":"Copy was blocked. Select the plan and copy it instead.")}
        }
        else if(a==="docx"){const blob=tplMode?await PLAN_TEMPLATE.school.docx(PLAN_TEMPLATE.school.read(doc)):await toDocx(readDoc(doc));const r=await env.saveFile(name+".docx",blob);msg(r==="saved"?"Word file saved.":r==="declined"?"":"Could not save the file.")}
        else if(a==="html"){
          const html=`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${esc(name)}</title><style>${tplMode?TP_HTML_CSS:`body{font:16px/1.5 Calibri,Arial,sans-serif;color:#10252F;max-width:1200px;margin:24px auto;padding:0 16px}h1{font-family:Cambria,Georgia,serif;color:#0B3D3A}h2{font-family:Cambria,Georgia,serif;color:#0E7C66;border-bottom:2px solid #BFDCD3;padding-bottom:4px;margin-top:26px}table{border-collapse:collapse;width:100%;margin:8px 0}th,td{border:1px solid #BFDCD3;padding:6px 9px;text-align:left;vertical-align:top}thead th{background:#0B3D3A;color:#fff}.pl-meta th{background:#E6F2EE;width:15%}.pl-sub{color:#4D6573}.pl-line{border-bottom:1px solid #999;min-height:28px}td ul{margin:0;padding-left:18px}@media print{@page{size:A4 landscape;margin:10mm}body{font-size:10pt;max-width:none;margin:0}}`}</style></head><body>${doc.innerHTML}</body></html>`;
          const r=await env.saveFile(name+".html",new Blob([html],{type:"text/html"}));msg(r==="saved"?"HTML file saved.":r==="declined"?"":"Could not save the file.")
        }
      }catch(err){console.error(err);msg("Something went wrong. Try again.")}
    });
    $("#pl-doc").scrollIntoView({block:"start",behavior:"smooth"});
  }
  $("#pl-go").addEventListener("click",generate);
  if(env.pick)setTimeout(generate,0);
}
/* =====================================================================================
   WEEKLY PLANS
   -------------------------------------------------------------------------------------
   TEMPLATE LAYER  (edit PLAN_TEMPLATE below to match the school's official layout)
   Everything the teacher sees and downloads is produced by the functions in PLAN_TEMPLATE:
     document(wk,items,opt)  -> whole document HTML (calls the functions below in order)
     coverPage(wk,items)     -> cover and weekly overview page
     lessonHeader(wk,it)     -> header band at the top of every lesson page
     lessonBody(it)          -> the lesson plan itself (one or two plan objects)
     signOff(wk)             -> supervisor sign-off box
     pageBreak()             -> page separator
     docx{footer(wk),...}    -> settings only used by the Word export (footer text)
   The Word (.docx), text, print and HTML exports are all read back from this HTML (readDoc),
   so a new template only has to keep to these supported elements: h1, h2, p, ul, tables inside
   <div class="pl-tw">, <div class="pl-lines"> and <div class="pl-pb"> (page break).
   Data objects: wk = week info, items[] = lessons of the week (see weekItems()).
   ===================================================================================== */
const CSS2=`
.pl-modes{display:flex;flex-wrap:wrap;gap:${px(8)};margin:${px(16)} 0 0}
.pl-sec{margin:${px(20)} 0 ${px(10)};font-size:${px(18)};border-bottom:2px solid var(--line);padding-bottom:${px(4)}}
.pl-form .pl-sec:first-child{margin-top:0}
.pl-cal{display:flex;flex-wrap:wrap;gap:${px(8)};margin-top:${px(8)}}
.pl-cal span{background:var(--mint,var(--surface2));border:1px solid var(--line);border-radius:999px;padding:${px(4)} ${px(12)};font-size:${px(14)};font-weight:600}
.pl-row{border:1px solid var(--line);border-radius:12px;padding:${px(14)};margin:${px(12)} 0;background:var(--bg)}
.pl-rowhead{display:flex;flex-wrap:wrap;gap:${px(8)};align-items:center;justify-content:space-between;margin-bottom:${px(10)}}
.pl-rowhead b{font-size:${px(17)}}
.pl-rowhead .pl-dt{color:var(--accent);font-weight:700;font-size:${px(15)}}
.pl-rowbtn{display:flex;flex-wrap:wrap;gap:${px(6)}}
.pl-rowbtn .btn{min-height:${px(36)};padding:${px(4)} ${px(10)};font-size:${px(14)}}
.pl-f.chk{justify-content:flex-end}
.pl-f.chk label{display:flex;gap:${px(8)};align-items:center;font:600 ${px(15)} var(--f-body);color:var(--ink);min-height:${px(44)}}
.pl-f.chk input{width:${px(20)};height:${px(20)};min-height:0;accent-color:var(--accent)}
.pl-note{color:var(--muted);font-size:${px(14)};margin:${px(6)} 0 0}
.pl-pb{border-top:2px dashed var(--line);margin:${px(26)} 0;text-align:center;height:0;user-select:none}
.pl-pb span{position:relative;top:-${px(11)};background:var(--surface);padding:0 ${px(10)};font-size:${px(12)};color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
.pl-doc .pl-band th{width:14%}
.tp-doc{font-family:Arial,Helvetica,var(--f-body),sans-serif}
.tp-hl{margin:${px(4)} 0!important}
.tp-hl b,.tp-sup b{font-weight:700}
.tp-tw{overflow-x:auto;margin:${px(12)} 0}
.tp-t{border-collapse:collapse;table-layout:fixed;width:100%;min-width:${px(1180)};font-size:${px(14)}}
.tp-t th,.tp-t td{border:1px solid var(--ink);padding:${px(8)};text-align:left;vertical-align:top;line-height:1.4}
.tp-t th{background:var(--surface2,#f2f2f2);color:var(--ink);font-size:${px(13)}}
.tp-t td p{margin:0 0 ${px(6)}}
.tp-sup{margin:${px(14)} 0 ${px(4)}!important}
.tp-g+.pl-pb{margin:${px(30)} 0}
.pl-doc .pl-sign td{height:${px(34)}}
.pl-doc .pl-sign td.pl-tall{height:${px(80)}}
@media (max-width:520px){.pl-rowhead{flex-direction:column;align-items:flex-start}}
@page tpl{size:letter landscape;margin:1in}
.tp-doc{page:tpl}
@media print{
  .tp-doc{font-size:10pt!important;font-family:Arial,Helvetica,sans-serif!important}
  .tp-t{font-size:9pt!important;min-width:0!important}
  .tp-t th,.tp-t td{border-color:#000!important}
  .tp-t th{background:#f2f2f2!important;color:#000!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .tp-tw{overflow:visible!important}
  .tp-doc .tp-g{break-inside:auto}
  .pl-modes,.pl-wkform{display:none!important}
  .pl-pb{border:0!important;margin:0!important;break-after:page;page-break-after:always;height:0!important}
  .pl-pb span{display:none!important}
}`;

const PLAN_TEMPLATE={
  pageBreak(){return '<div class="pl-pb" contenteditable="false"><span>Page break</span></div>'},
  /* two-column "label | value" table used for headers and sign-off boxes */
  metaTable(pairs,cls){
    let h="";
    for(let i=0;i<pairs.length;i+=2){const a=pairs[i],b=pairs[i+1];
      h+=`<tr><th>${esc(a[0])}</th><td>${esc(a[1]||"—")}</td>${b?`<th>${esc(b[0])}</th><td>${esc(b[1]||"—")}</td>`:"<th></th><td></td>"}</tr>`}
    return `<div class="pl-tw"><table class="pl-t pl-meta ${cls||""}"><tbody>${h}</tbody></table></div>`;
  },
  signOff(wk){
    return `<h2>Supervisor sign-off</h2><div class="pl-tw"><table class="pl-t pl-meta pl-sign"><tbody>
<tr><th>Supervisor's name</th><td>${esc(wk.supervisor||"")}</td><th>Role</th><td>${esc(wk.supRole||"")}</td></tr>
<tr><th>Signature</th><td></td><th>Date reviewed</th><td></td></tr>
<tr><th>Comments</th><td class="pl-tall" colspan="3"></td></tr></tbody></table></div>`;
  },
  coverPage(wk,items){
    const totalMin=items.reduce((a,it)=>a+it.minutes,0);
    const head=PLAN_TEMPLATE.metaTable([
      ["School",wk.school],["Teacher",wk.teacher],
      ["Department or subject",wk.dept],["Class or group",wk.cls],
      ["Supervisor",wk.supervisor],["Supervisor role",wk.supRole],
      ["Term and week",wk.weekLabel],["Week commencing",wk.commText],
      ["Lesson dates",wk.range],["Lessons this week",`${items.length} lessons, ${totalMin} minutes`]]);
    const rows=items.map(it=>[it.dateText||"—",it.dayName,it.typeShort,it.cls||"—",it.subjLabel,it.lessonTitle]);
    const table=blockHTML({t:"table",head:["Date","Day","Period and type","Class","Subject","Lesson"],rows,w:[16,11,17,10,14,32]});
    return `<h1>Weekly lesson plans</h1><p class="pl-sub">${esc(wk.weekLabel||"Week")}${wk.range?" · "+esc(wk.range):""}</p>${head}<h2>Lessons this week</h2>${table}${PLAN_TEMPLATE.signOff(wk)}`;
  },
  lessonHeader(wk,it){
    return PLAN_TEMPLATE.metaTable([
      ["Term and week",wk.weekLabel],["Date",it.dateText],
      ["Day",it.dayName],["Period",it.period||"—"],
      ["Period type",it.typeLong],["Class",it.cls],
      ["Supervisor",wk.supervisor],["Subject",it.subjLabel]],"pl-band");
  },
  lessonBody(it){
    return it.plans.map((p,k)=>(k?PLAN_TEMPLATE.pageBreak():"")+planHTML(p)).join("");
  },
  document(wk,items,opt){
    let h=PLAN_TEMPLATE.coverPage(wk,items);
    items.forEach(it=>{
      h+=PLAN_TEMPLATE.pageBreak()+PLAN_TEMPLATE.lessonHeader(wk,it)+PLAN_TEMPLATE.lessonBody(it);
      if(opt&&opt.signEach)h+=PLAN_TEMPLATE.signOff(wk);
    });
    return h;
  },
  docx:{footer(wk){return [wk.school,wk.weekLabel,wk.supervisor?"Supervisor: "+wk.supervisor:""].filter(Boolean).join("  ·  ")||"Weekly lesson plans"}}
};

/* =====================================================================================
   SCHOOL TEMPLATE  (default output)  — the 8-column weekly table from the school's own .docx
   One group = one class + subject: header lines (Teacher, Class, Subject, Week / Topic /
   Teaching Aids), the table (one row per lesson) and the supervisor lines.
   The Word file is made from the school's template package itself (window.__PLAN_TPL_B64):
   styles, theme, numbering, page set-up and table formatting are kept, only the body is rebuilt.
   ===================================================================================== */
const TP={
  cols:["DAY/TIME","OBJECTIVES","KEY QUESTION","LESSON ELEMENTS","TEACHER'S ACTIVITIES","PUPILS' ACTIVITIES","METHODOLOGY","EVALUATION"],
  w:[1440,1800,1530,1530,2160,1998,2070,1710],
  methods:["Direct Instruction","Visual Modeling","Discussion","Inquiry-Based Learning","Practical Investigation","Guided Practice","Retrieval Practice","Collaborative Learning","Demonstration","Think-Pair-Share","Problem Solving","Flipped Learning"],
  stages:{introduction:["Intro","Presentation","Practice","Plenary"],practical:["Intro","Demo","Practical","Plenary"],consolidation:["Starter","Recap","Practice","Plenary"],revision:["Retrieval","Review","Exam practice","Plenary"]}
};
const tpX=s=>String(s==null?"":s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const tpNIL='<w:pBdr><w:top w:space="0" w:sz="0" w:val="nil"/><w:left w:space="0" w:sz="0" w:val="nil"/><w:bottom w:space="0" w:sz="0" w:val="nil"/><w:right w:space="0" w:sz="0" w:val="nil"/><w:between w:space="0" w:sz="0" w:val="nil"/></w:pBdr>';
const tpBR='<w:tcBorders><w:top w:color="000000" w:space="0" w:sz="6" w:val="single"/><w:left w:color="000000" w:space="0" w:sz="6" w:val="single"/><w:bottom w:color="000000" w:space="0" w:sz="6" w:val="single"/><w:right w:color="000000" w:space="0" w:sz="6" w:val="single"/></w:tcBorders>';
const tpMAR='<w:tcMar><w:top w:w="120" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>';
const tpListJoin=a=>a.length<=1?(a[0]||""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];
const tpSubj=k=>subjLabel(k).replace(/\s*\d{4}$/,"");
const tpHM=m=>pad(Math.floor(m/60)%24)+":"+pad(m%60);
function tpTime(start,mins,period){
  const m=/^(\d{1,2}):(\d{2})/.exec(start||"");
  if(m){const s=+m[1]*60+ +m[2];return tpHM(s)+" - "+tpHM(s+mins)}
  return (period||"").trim();
}
function tpElements(mins,focus,practical){
  const names=(practical&&focus==="introduction"?TP.stages.practical:TP.stages[focus]||TP.stages.introduction);
  const a=Math.max(5,Math.round(mins/8/5)*5),rest=Math.max(10,mins-2*a),p=Math.round(rest/2/5)*5,q=rest-p;
  return [[names[0],a],[names[1],p],[names[2],q],[names[3],a]].map(x=>x[0]+": "+x[1]+"m");
}
function tpMethod(o,hasIbl,secs){
  if(o.method&&o.method.trim())return o.method.trim();
  if(o.focus==="practical"||(o.practical&&hasIbl&&o.focus!=="revision"))return "Practical Investigation";
  if(o.focus==="revision")return "Retrieval Practice";
  if(o.focus==="consolidation")return "Guided Practice";
  if(hasIbl&&o.ibl)return "Inquiry-Based Learning";
  if(secs.some(s=>/diagram|structure|model|shape|cell|organ|apparatus/i.test(s.title)))return "Visual Modeling";
  return "Direct Instruction";
}
/* one lesson -> {obj,kq,teach,pupil,methodName} as paragraph strings */
function tpLesson(l,u,o,part){
  const secs=sections(l),useExt=o.tier!=="Core";
  const core=secs.filter(s=>!s.ext),ext=secs.filter(s=>s.ext);
  const teach=useExt?secs:(core.length?core:secs);
  const ibl=l.ibl||{},q=txt(ibl.q||""),act=items(ibl.act),actHead=txt(ibl.act||"").split(/[.:]/)[0].trim();
  const practical=!!o.practical&&act.length>0;
  const title=txt(l.t),prev=l.idx>0?u.lessons[l.idx-1]:null;
  const ws=l.ws||[],pr=l.pr||[],wsMarks=ws.reduce((a,x)=>a+(+x[2]||0),0);
  const tt=teach.filter(s=>!s.ext).map(s=>"“"+s.title+"”");
  const titles=tt.slice(0,2);const more=tt.length>2?` and ${tt.length-2} further ideas`:"";
  const topicsT=(titles.length?tpListJoin(titles):"“"+title+"”")+more;
  const sum=firstSentence(txt(l.sum||""),190);
  let obj=sum||`Explain ${lc(title)}.`;
  if(useExt&&ext.length)obj+=" Extended: "+tpListJoin(ext.slice(0,2).map(s=>s.title))+".";
  let kq=q||`What are the key ideas of ${lc(title)}?`;if(!/[?]$/.test(kq))kq+="?";
  const f=o.focus;
  const open=f==="revision"?`The teacher opens with a short retrieval quiz${prev?` that includes “${txt(prev.t)}”`:""} and shares the objectives.`:
    q?`The teacher poses the inquiry question “${q}” and shares the objectives.`:
    `The teacher shares the objectives and runs a short retrieval starter${prev?` on “${txt(prev.t)}”`:""}.`;
  const mid=f==="revision"?`The teacher reviews the most commonly tested ideas in ${topicsT} and models how to use the mark scheme.`:
    f==="consolidation"?`The teacher recaps ${topicsT} with the hub slides and checks understanding with mini whiteboards.`:
    `The teacher explains ${topicsT} using the hub slides and diagrams, pausing for cold-call questions.`;
  const prac=practical?` The teacher supervises the activity${actHead?` (${actHead})`:""}, going over safety first.`:"";
  const doP=` During practice the teacher circulates, gives feedback with the mark scheme and addresses misconceptions${ws.length?` (worksheet: ${ws.length} questions, ${wsMarks} marks)`:""}, then closes with an exit ticket.`;
  const tp=[open,mid+prac+doP].join(" ");
  const pu=[
    q?`Pupils record first ideas and predictions in the inquiry journal.`:`Pupils answer the starter questions.`,
    `Pupils annotate diagrams, take notes and explain ideas to a partner${practical?", then carry out the activity in groups and record observations":""}.`,
    `Pupils complete the practice questions${ws.length?" and worksheet":""}, self-mark with the mark scheme and correct mistakes, then complete the exit ticket.`+(useExt&&ext.length?" Extended learners record the Supplement points.":"")
  ].join(" ");
  return {obj,kq,teach:tp,pupil:pu,method:tpMethod(o,!!q,teach),aids:practical?EQUIP.filter(e=>new RegExp("\\b"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i").test(txt((ibl.task||"")+" "+(ibl.act||"")))).slice(0,6):[]};
}
/* a lesson row for the table */
function tpRow(s){
  // s = {dayName,dateShort,time,mins,l,l2,u,o,row}
  const col1=[s.dayName||"",s.dateShort||"",s.time||"","("+s.mins+" mins)"].filter(Boolean);
  let obj=[],kq=[],el=[],te=[],pu=[],me=[],aids=[];
  const o=Object.assign({},s.o,{method:s.row&&s.row.method});
  if(s.l){
    if(s.l2){
      [[s.l,1],[s.l2,2]].forEach(([l,k])=>{const x=tpLesson(l,s.u,o);
        obj.push(`Part ${k}: ${x.obj}`);kq.push(`Part ${k}: ${x.kq}`);te.push(`Part ${k}: ${x.teach}`);pu.push(`Part ${k}: ${x.pupil}`);me.push(x.method);aids.push(...x.aids);
        el.push(`Part ${k} (${Math.round(s.mins/2)} min)`,...tpElements(Math.round(s.mins/2),o.focus,o.practical))});
      me=[...new Set(me)];
    }else{
      const x=tpLesson(s.l,s.u,o);obj=[x.obj];kq=[x.kq];te=[x.teach];pu=[x.pupil];me=[x.method];aids=x.aids;
      el=tpElements(s.mins,o.focus,o.practical);
    }
  }else{
    const r=s.row||{};
    obj=String(r.obj||"").split(/\n+/).map(x=>x.trim()).filter(Boolean);if(!obj.length&&r.title)obj=[r.title];
    kq=[""];el=tpElements(s.mins,o.focus,false);te=[""];pu=[""];me=[o.method&&o.method.trim()||""];
  }
  const evOf=(l)=>{const ws=l.ws||[],pr=l.pr||[],m=ws.reduce((t,x)=>t+(+x[2]||0),0),q=txt((l.ibl&&l.ibl.q)||"");
    const o=[];if(q)o.push("Exit ticket: pupils answer the inquiry question “"+q.replace(/[?.]+$/,"")+"?” in their own words.");
    if(pr.length)o.push("Practice questions: "+pr.length+" items with instant feedback; record the score.");
    if(ws.length)o.push("Worksheet ("+m+" marks) self-marked with the mark scheme.");
    o.push("Questioning and mini whiteboards during the lesson; note misconceptions for the next lesson.");return o};
  const ev=s.l?(s.l2?[...evOf(s.l),...evOf(s.l2)]:evOf(s.l)):[];
  return {c:[col1,obj,kq,el,te,pu,me,ev],aids};
}
function tpGroups(wk,items,H){
  const gs=[],map={};
  items.forEach(it=>{
    const r=it.row,key=(it.cls||"")+"|"+r.subj;
    let g=map[key];
    if(!g){
      g=map[key]={h:{teacher:H.teacher||"",cls:it.cls||"",subject:tpSubj(r.subj),week:(H.week==="other"?(H.weekOther||""):(H.week||""))+(H.term?"  (Term "+H.term+")":""),topic:"",aids:"",supervisor:H.supervisor||""},rows:[],topics:[],aids:[]};
      gs.push(g);
    }
    const row=tpRow({dayName:it.dayName,dateShort:it.d?fmtShort(it.d):"",time:tpTime(r.start,it.minutes,r.period),mins:it.minutes,l:it.l,l2:it.l2,u:it.u,o:{tier:r.tier,focus:r.focus,practical:!!r.prac,ibl:true},row:r});
    g.rows.push(row);g.aids.push(...row.aids);
    if(it.u&&it.l)g.topics.push(`Topic ${it.u.n} ${txt(it.u.name)}`);else if((r.title||"").trim())g.topics.push(r.title.trim());
  });
  gs.forEach(g=>{
    g.h.topic=[...new Set(g.topics)].join("; ");
    const base=["projector or smart board","hub lesson slides","mini whiteboards","worksheets and past paper questions"];
    g.h.aids=[...new Set([...g.aids,...base])].join(", ");
    delete g.topics;delete g.aids;
    g.rows=g.rows.map(r=>r.c);
  });
  return gs;
}
function tpGroupsSingle(p){
  const row=tpRow({dayName:p.dayName,dateShort:p.dateShort,time:p.time,mins:p.mins,l:p.l,l2:null,u:p.u,o:p.o,row:{}});
  const base=["projector or smart board","hub lesson slides","mini whiteboards","worksheets and past paper questions"];
  return [{h:{teacher:p.teacher||"",cls:p.cls||"",subject:p.subject,week:p.week||"",topic:`Topic ${p.u.n} ${txt(p.u.name)}`,aids:[...new Set([...row.aids,...base])].join(", "),supervisor:p.supervisor||""},rows:[row.c]}];
}
/* ---- on-screen document (editable) ---- */
function tpHTML(groups){
  const ps=a=>(a&&a.length?a:[""]).map(x=>`<p>${esc(x)||"<br>"}</p>`).join("");
  const sp=(k,v)=>`<span data-k="${k}">${esc(v||"")}</span>`;
  return groups.map((g,i)=>{
    const h=g.h;
    const cg=`<colgroup>${TP.w.map(w=>`<col style="width:${(w/TP.w.reduce((a,b)=>a+b,0)*100).toFixed(2)}%">`).join("")}</colgroup>`;
    const th=TP.cols.map(c=>`<th>${esc(c)}</th>`).join("");
    const body=g.rows.map(r=>`<tr>${r.map((c,j)=>`<td>${j===0&&c.length?`<p><b>${esc(c[0])}</b></p>${ps(c.slice(1))}`:ps(c)}</td>`).join("")}</tr>`).join("");
    return (i?PLAN_TEMPLATE.pageBreak():"")+`<section class="tp-g">
<p class="tp-hl"><b>Teacher:</b> ${sp("teacher",h.teacher)} <b>Class:</b> ${sp("cls",h.cls)} <b>Subject:</b> ${sp("subject",h.subject)} <b>Week:</b> ${sp("week",h.week)}</p>
<p class="tp-hl"><b>Topic:</b> ${sp("topic",h.topic)}</p>
<p class="tp-hl"><b>Teaching Aids:</b> ${sp("aids",h.aids)}</p>
<div class="tp-tw"><table class="tp-t">${cg}<thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>
<p class="tp-sup"><b>Supervisor:</b> ${sp("supervisor",h.supervisor)}</p>
<p class="tp-sup tp-com">Supervisor’s Comment</p></section>`;
  }).join("");
}
function tpRead(root){
  return [...root.querySelectorAll(".tp-g")].map(g=>{
    const h={};g.querySelectorAll("[data-k]").forEach(s=>{h[s.dataset.k]=(s.innerText||s.textContent).replace(/\s+/g," ").trim()});
    const rows=[...g.querySelectorAll("tbody tr")].map(tr=>[...tr.children].map(td=>(td.innerText||td.textContent).split(/\n+/).map(x=>x.replace(/\u00a0/g," ").trim()).filter(Boolean)));
    return {h,rows};
  });
}
function tpText(groups){
  return groups.map(g=>{
    const h=g.h;let t=`Teacher: ${h.teacher}   Class: ${h.cls}   Subject: ${h.subject}   Week: ${h.week}\nTopic: ${h.topic}\nTeaching Aids: ${h.aids}\n`;
    g.rows.forEach(r=>{t+="\n"+r.map((c,j)=>TP.cols[j]+": "+c.join(" | ")).join("\n")+"\n"});
    return t+`\nSupervisor: ${h.supervisor}\nSupervisor’s Comment\n`;
  }).join("\n\n――――――――――\n\n");
}
/* ---- Word file from the school's template package ---- */
async function tpDocx(groups){
  const zip=await JSZip.loadAsync(window.__PLAN_TPL_B64,{base64:true});
  const src=await zip.file("word/document.xml").async("string");
  const i0=src.indexOf("<w:body>");
  const root=src.slice(0,i0+8);
  const tblPr=src.match(/<w:tblPr>[\s\S]*?<\/w:tblPr>/)[0];
  const hdr=src.match(/<w:tr[ >][\s\S]*?<\/w:tr>/)[0].replace(/ w14:paraId="[^"]*"/g,"");
  const sect=src.match(/<w:sectPr>[\s\S]*?<\/w:sectPr>/)[0];
  const run=(t,b,tabs)=>`<w:r><w:rPr>${b?'<w:b w:val="1"/><w:bCs w:val="1"/>':""}</w:rPr><w:t xml:space="preserve">${tpX(t)}</w:t>${tabs?"<w:tab/>".repeat(tabs):""}</w:r>`;
  const hp=(runs,after,pbb)=>`<w:p><w:pPr>${pbb?"<w:pageBreakBefore/>":""}${tpNIL}<w:spacing w:after="${after}" w:lineRule="auto"/><w:rPr/></w:pPr>${runs}</w:p>`;
  const bp=(runs)=>`<w:p><w:pPr>${tpNIL}<w:spacing w:line="276" w:lineRule="auto"/><w:rPr/></w:pPr>${runs}</w:p>`;
  const cell=(paras,j)=>{
    const ps=(paras&&paras.length?paras:[""]);
    return `<w:tc><w:tcPr>${tpBR}<w:shd w:fill="auto" w:val="clear"/>${tpMAR}</w:tcPr>`+ps.map((t,k)=>{
      const last=k===ps.length-1,b=j===0&&k===0;
      return `<w:p><w:pPr>${tpNIL}${last?'<w:spacing w:after="120" w:before="120" w:lineRule="auto"/>':""}<w:rPr>${b?'<w:b w:val="1"/><w:bCs w:val="1"/>':""}</w:rPr></w:pPr>${t===""?"":run(t,b)}</w:p>`;
    }).join("")+`</w:tc>`;
  };
  let body="";
  groups.forEach((g,gi)=>{
    const h=g.h,pb=gi>0;
    body+=hp(run("Teacher:",1)+run(" "+h.teacher,0,3)+run("Class:",1)+run(" "+h.cls,0,3)+run("Subject:",1)+run(" "+h.subject,0,h.week?2:0)+(h.week?run("Week:",1)+run(" "+h.week,0):""),60,pb);
    body+=hp(run("Topic:",1)+run(" "+h.topic,0),60);
    body+=hp(run("Teaching Aids:",1)+run(" "+h.aids,0),225);
    body+=`<w:tbl>${tblPr}<w:tblGrid>${TP.w.map(w=>`<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>${hdr}`;
    g.rows.forEach(r=>{body+=`<w:tr><w:trPr><w:cantSplit w:val="0"/><w:tblHeader w:val="0"/></w:trPr>${r.map((c,j)=>cell(c,j)).join("")}</w:tr>`});
    body+=`</w:tbl>`+bp("")+bp(run("Supervisor: "+(h.supervisor||""),0))+bp("")+bp(run("Supervisor’s Comment",0))+bp("");
  });
  zip.file("word/document.xml",root+body+sect+"</w:body></w:document>");
  return zip.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",compression:"DEFLATE"});
}
PLAN_TEMPLATE.school={groups:tpGroups,single:tpGroupsSingle,html:tpHTML,read:tpRead,text:tpText,docx:tpDocx,fileName:tpFileName};
const TP_HTML_CSS=`body{font:11pt/1.35 Arial,Helvetica,sans-serif;color:#000;margin:24px}.tp-hl{margin:0 0 4px}.tp-hl+.tp-hl+.tp-hl{margin-bottom:12px}.tp-t{border-collapse:collapse;table-layout:fixed;width:100%}.tp-t th,.tp-t td{border:1px solid #000;padding:6px;text-align:left;vertical-align:top;font-size:10pt}.tp-t th{background:#f2f2f2}.tp-t p{margin:0 0 4px}.tp-sup{margin:10px 0}.tp-tw{overflow:visible}.pl-pb{break-after:page;height:0;border-top:1px dashed #999;margin:28px 0}.pl-pb span{display:none}@media print{@page{size:letter landscape;margin:1in}body{margin:0}.pl-pb{border:0;margin:0}}`;
function tpFileName(groups,wk,H){
  const wn=(H.week==="other"?(H.weekOther||""):(H.week||"")).replace(/\W+/g,"_");
  const wt=wn?"Week_"+wn:"";
  const cl=s=>String(s||"").trim().replace(/[^A-Za-z0-9]+/g,"_").replace(/^_|_$/g,"");
  if(groups.length===1)return [cl(groups[0].h.subject),cl(groups[0].h.cls),"Lesson_Plan",wt].filter(Boolean).join("_");
  return ["Lesson_Plans",wt].filter(Boolean).join("_");
}

/* ---------- dates ---------- */
const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday"];
const pad=n=>String(n).padStart(2,"0");
const isoD=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parseISO=s=>s?new Date(s+"T12:00:00"):null;
const mondayOf=d=>{const x=new Date(d.getTime());x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const fmtLong=d=>d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const fmtShort=d=>d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
const fmtDM=d=>d.toLocaleDateString("en-GB",{day:"numeric",month:"short"});
const dayName=d=>d.toLocaleDateString("en-GB",{weekday:"long"});

function decorate(sk){SUBJ[sk].units.forEach(u=>u.lessons.forEach((l,j)=>{l.idx=j;l.no=u.n+"."+(j+1);l.key=u.n+"-"+(j+1);l.u=u}))}
const SUBJ_OPTS=[["chem","Chemistry 0620"],["bio","Biology 0610"],["alevel","Biology 9700 (AS/A Level)"],["other","Other subject"]];
const subjLabel=k=>(SUBJ_OPTS.find(x=>x[0]===k)||[0,"—"])[1];

/* ---------- weekly state ---------- */
const WKKEY="hubweekly.v1";
function wkLoad(){try{return JSON.parse(localStorage.getItem(WKKEY)||"{}")}catch(e){return {}}}
function wkSave(o){try{localStorage.setItem(WKKEY,JSON.stringify(o))}catch(e){}}
let RID=1,DEFSUBJ="chem";
const newRow=(o)=>Object.assign({id:RID++,day:0,date:"",period:"",start:"",mins:60,method:"",type:"single",cls:"",subj:DEFSUBJ,un:"",li:"",li2:"",title:"",obj:"",tier:"Mixed",focus:"introduction",prac:false},o||{});
const rowMins=r=>r.type==="double"?80:r.type==="other"?Math.max(5,Math.min(300,Math.round(+r.mins||40))):40;
const typeLong=r=>r.type==="double"?"Double period (80 minutes)":r.type==="other"?`Other (${rowMins(r)} minutes)`:"Single period (40 minutes)";
const typeShort=r=>r.type==="double"?"Double · 80 min":r.type==="other"?`Other · ${rowMins(r)} min`:"Single · 40 min";

function buildOwnPlan(r,mins,o,wkEnv){
  const lines=String(r.obj||"").split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const w=[10,35,30,15,10];const ms=alloc(mins,w);let clock=0;const stamp=n=>{const a=clock;clock+=n;return a+"–"+clock+" min"};
  const stages=["Engage","Teach","Practise","Apply","Plenary"];
  const rows=stages.map((s,i)=>[stamp(ms[i]),s,["—"],["—"],"—"]);
  const title=(r.title||"").trim()||"Lesson to be planned";
  const S=[
    {h:"Learning objectives",b:lines.length?[{t:"ul",items:lines}]:[{t:"lines",label:"Objectives",n:3}]},
    {h:"Success criteria",b:[{t:"lines",label:"I can…",n:3}]},
    {h:"Resources",b:[{t:"lines",label:"Resources and equipment",n:2}]},
    {h:"Lesson sequence",b:[{t:"table",head:["Time","Stage","Teacher actions","Learner actions","Resources"],rows,w:[10,9,34,31,16],cls:"seq"}]},
    {h:"Differentiation",b:[{t:"table",head:["Group","Strategies"],rows:[["Support",["—"]],["Core",["—"]],["Challenge",["—"]]],w:[18,82]}]},
    {h:"Assessment and homework",b:[{t:"lines",label:"Assessment for learning",n:2},{t:"lines",label:"Homework",n:2}]},
    {h:"Safety notes",b:[{t:"lines",label:"Risks and controls",n:2}]},
    {h:"Teacher reflection",b:[{t:"lines",label:"What went well",n:2},{t:"lines",label:"Even better if",n:2},{t:"lines",label:"Next steps",n:2}]}
  ];
  const meta=[["Subject",subjLabel(r.subj)],["Lesson",title],["Class",o.cls||"—"],["Teacher",o.teacher||"—"],["School",o.school||"—"],["Date",o.date||"—"],["Length",`${mins} minutes`],["Tier",o.tier]];
  return {title:`Lesson plan: ${title}`,sub:`${subjLabel(r.subj)} · own lesson`,meta,sections:S};
}

function weekItems(wk,rows,common,envBase){
  // sort chronologically (date or weekday), keeping the order of the list for ties
  const withKey=rows.map((r,i)=>{
    const d=r.date?parseISO(r.date):wk.days[r.day].d;
    const k=d?d.getTime():(r.day*864e5);
    return {r,i,d,k};
  }).sort((a,b)=>a.k-b.k||a.i-b.i);
  return withKey.map(({r,d})=>{
    const mins=rowMins(r);
    const o=Object.assign({},common,{cls:r.cls||wk.cls||"",date:d?fmtLong(d):"",mins:String(mins),tier:r.tier,focus:r.focus,practical:!!r.prac,double:false,prior:""});
    const dn=d?dayName(d):DAYS[r.day];
    const it={row:r,d,dateText:d?fmtLong(d):"",dayName:dn,period:r.period,typeLong:typeLong(r),typeShort:typeShort(r),cls:o.cls,subjLabel:subjLabel(r.subj),minutes:mins,plans:[],lessonTitle:""};
    const sk=r.subj;
    let l=null,l2=null,u=null;
    if(sk==="chem"||sk==="bio"||sk==="alevel"){decorate(sk);u=SUBJ[sk].units.find(x=>String(x.n)===String(r.un));if(u&&r.li!==""&&r.li!=="own"){l=u.lessons[+r.li]||null;if(r.type==="double"&&r.li2!==""&&r.li2!=="own")l2=u.lessons[+r.li2]||null}}
    const env2=Object.assign({},envBase,{SUB:SUBJ[sk]||envBase.SUB,subKey:SUBJ[sk]?sk:"chem"});
    it.l=l;it.l2=l2;it.u=u;
    try{
      if(l&&l2){
        const p1=buildPlan(l,u,Object.assign({},o,{mins:"40",offset:0}),env2),p2=buildPlan(l2,u,Object.assign({},o,{mins:"40",offset:40}),env2);
        p1.title="Part 1 (0–40 min): "+p1.title;p2.title="Part 2 (40–80 min): "+p2.title;
        it.plans=[p1,p2];it.lessonTitle=`${txt(l.t)} + ${txt(l2.t)}`;
      }else if(l){
        const p=buildPlan(l,u,Object.assign({},o,{double:r.type==="double"}),env2);
        it.plans=[p];it.lessonTitle=`${l.no} ${txt(l.t)}`;
      }else{
        const p=buildOwnPlan(r,mins,o,env2);it.plans=[p];it.lessonTitle=(r.title||"").trim()||"To be planned";
      }
    }catch(e){console.error(e);const p=buildOwnPlan(r,mins,o,env2);it.plans=[p];it.lessonTitle="(plan could not be built)"}
    return it;
  });
}

function weekInfoFrom(h){
  const mon=h.commencing?mondayOf(parseISO(h.commencing)):null;
  const days=DAYS.map((n,i)=>{let d=null;if(mon){d=new Date(mon.getTime());d.setDate(mon.getDate()+i)}return {name:n,d}});
  const wn=h.week==="other"?(h.weekOther||"").trim():(h.week?"Week "+h.week:"");
  const weekLabel=[h.term?"Term "+h.term:"",wn].filter(Boolean).join(", ");
  const range=mon?`${fmtDM(mon)} to ${fmtShort(days[4].d)}`:"";
  return {school:h.school,teacher:h.teacher,dept:h.dept,cls:h.cls,supervisor:h.supervisor,supRole:h.supRole,weekLabel,range,commText:mon?fmtLong(mon):"",days};
}

function weeklyUI(app,env){
  DEFSUBJ=env.subKey||"chem";
  const st=wkLoad();
  const H=Object.assign({school:"",teacher:"",dept:"",cls:"",supervisor:"",supRole:"",term:"1",week:"",weekOther:"",commencing:"",signEach:true,layout:"tpl"},st.header||{});
  let rows=(st.timetable&&st.timetable.length?st.timetable.map(r=>newRow(Object.assign({},r,{un:"",li:"",li2:"",title:"",obj:""}))):[newRow()]);
  const loadedNote=st.timetable&&st.timetable.length?`Loaded your saved timetable (${st.timetable.length} lessons). Choose this week's lessons below.`:"";
  const $=s=>app.querySelector(s);
  const opt=(vals,cur)=>vals.map(x=>`<option value="${esc(x[0])}"${String(x[0])===String(cur)?" selected":""}>${esc(x[1])}</option>`).join("");
  const weekOpts=[["","Choose…"]].concat(Array.from({length:14},(_,i)=>[String(i+1),"Week "+(i+1)]),[["other","Other (type it)"]]);
  app.innerHTML=`<div class="pl-wrap"><form class="pl-form pl-wkform" id="wkf" autocomplete="off" onsubmit="return false">
<h2 class="pl-sec">School and supervisor</h2>
<div class="pl-grid">
<div class="pl-f"><label for="h-school">School</label><input id="h-school" data-h="school" type="text" value="${esc(H.school)}"></div>
<div class="pl-f"><label for="h-teacher">Teacher</label><input id="h-teacher" data-h="teacher" type="text" value="${esc(H.teacher)}"></div>
<div class="pl-f"><label for="h-dept">Department or subject</label><input id="h-dept" data-h="dept" type="text" value="${esc(H.dept)}" placeholder="e.g. Science"></div>
<div class="pl-f"><label for="h-cls">Default class or group (optional)</label><input id="h-cls" data-h="cls" type="text" value="${esc(H.cls)}" placeholder="e.g. 10B"></div>
<div class="pl-f"><label for="h-sup">Supervisor's name</label><input id="h-sup" data-h="supervisor" type="text" value="${esc(H.supervisor)}"></div>
<div class="pl-f"><label for="h-supr">Supervisor's role (optional)</label><input id="h-supr" data-h="supRole" type="text" value="${esc(H.supRole)}" placeholder="e.g. Head of Science"></div>
</div>
<h2 class="pl-sec">School calendar</h2>
<div class="pl-grid">
<div class="pl-f"><label for="h-term">Term</label><select id="h-term" data-h="term">${opt([["","Choose…"],["1","Term 1"],["2","Term 2"],["3","Term 3"]],H.term)}</select></div>
<div class="pl-f"><label for="h-week">School week</label><select id="h-week" data-h="week">${opt(weekOpts,H.week)}</select></div>
<div class="pl-f" id="h-wo-box"${H.week==="other"?"":" hidden"}><label for="h-wo">Week (free text)</label><input id="h-wo" data-h="weekOther" type="text" value="${esc(H.weekOther)}" placeholder="e.g. Week 3 (revision)"></div>
<div class="pl-f"><label for="h-comm">Week commencing (a Monday)</label><input id="h-comm" data-h="commencing" type="date" value="${esc(H.commencing)}"></div>
<div class="pl-f"><span class="pl-lab">&nbsp;</span><button class="btn" type="button" id="h-now">Use this week</button></div>
</div>
<div class="pl-cal" id="wk-cal" aria-live="polite"></div>
<p class="pl-note">Pick any date and it moves to that week's Monday. Each lesson below then shows its date. You can type a different date for a lesson if it moves.</p>
<h2 class="pl-sec">Weekly timetable</h2>
<div class="pl-checks"><button class="btn pri" type="button" id="wk-add">Add lesson</button><button class="btn" type="button" id="wk-fill">Add Mon–Fri single periods</button><button class="btn" type="button" id="wk-save">Save as my weekly timetable</button><button class="btn" type="button" id="wk-load">Load saved timetable</button><button class="btn" type="button" id="wk-clear">Clear timetable</button><span class="pl-msg" id="wk-msg" role="status" aria-live="polite">${esc(loadedNote)}</span></div>
<p class="pl-note">A single period is 40 minutes and a double period is 80 minutes. For a double period you can plan two different lessons (40 minutes each), or one lesson with a checkpoint and an extension block. Saved timetables keep the days, period types, classes and subjects, not the lessons.</p>
<datalist id="tp-methods">${TP.methods.map(m=>`<option value="${esc(m)}">`).join("")}</datalist><div id="wk-rows"></div>
<div class="pl-grid" style="margin-top:14px"><div class="pl-f"><label for="h-layout">Plan layout</label><select id="h-layout" data-h="layout">${opt([["tpl","School template (weekly table)"],["detail","Detailed lesson pages"]],H.layout)}</select></div></div>
<div class="pl-checks" style="margin-top:14px"><label><input type="checkbox" id="h-sign"${H.signEach?" checked":""}> Add a supervisor sign-off box to every lesson page (detailed layout only)</label></div>
<div class="pl-act"><button class="btn pri" type="button" id="wk-go">Generate weekly plans</button></div>
</form><div id="pl-out"></div></div>`;

  const msg=t=>{const m=$("#wk-msg");if(m){m.textContent=t;setTimeout(()=>{if(m.textContent===t)m.textContent=""},4000)}};
  const saveHeader=()=>{const s=wkLoad();s.header=H;wkSave(s)};
  function commDate(){return H.commencing?mondayOf(parseISO(H.commencing)):null}
  function rowDate(r){if(r.date)return parseISO(r.date);const m=commDate();if(!m)return null;const d=new Date(m.getTime());d.setDate(m.getDate()+r.day);return d}
  function cal(){
    const m=commDate();
    $("#wk-cal").innerHTML=m?DAYS.map((n,i)=>{const d=new Date(m.getTime());d.setDate(m.getDate()+i);return `<span>${n.slice(0,3)} ${esc(fmtDM(d))}</span>`}).join(""):`<span>Choose a week commencing date to see the dates</span>`;
  }
  const units=sk=>sk==="chem"||sk==="bio"||sk==="alevel"?SUBJ[sk].units:[];
  function rowHTML(r,i){
    const hub=r.subj==="chem"||r.subj==="bio"||r.subj==="alevel";
    if(hub)decorate(r.subj);
    const us=units(r.subj),u=us.find(x=>String(x.n)===String(r.un));
    const d=rowDate(r);
    const dayOpts=DAYS.map((n,k)=>[String(k),n]);
    const lessonOpts=(sel,none)=>`<option value="">${esc(none)}</option>`+(u?u.lessons.map((l,j)=>`<option value="${j}"${String(sel)===String(j)?" selected":""}>${esc(l.no+"  "+txt(l.t))}</option>`).join(""):"")+`<option value="own"${sel==="own"?" selected":""}>Other / own lesson (type below)</option>`;
    return `<div class="pl-row" data-id="${r.id}"><div class="pl-rowhead"><b>Lesson ${i+1}</b><span class="pl-dt">${d?esc(fmtLong(d)):esc(DAYS[r.day])} · ${esc(typeShort(r).replace(" · ",", "))}</span>
<span class="pl-rowbtn"><button class="btn" type="button" data-act="up" aria-label="Move up">▲</button><button class="btn" type="button" data-act="down" aria-label="Move down">▼</button><button class="btn" type="button" data-act="dup">Duplicate</button><button class="btn" type="button" data-act="del">Remove</button></span></div>
<div class="pl-grid">
<div class="pl-f"><label>Day</label><select data-f="day">${opt(dayOpts,r.day)}</select></div>
<div class="pl-f"><label>Date (optional change)</label><input type="date" data-f="date" value="${esc(r.date)}"></div>
<div class="pl-f"><label>Start time (optional)</label><input type="time" data-f="start" value="${esc(r.start)}"></div>
<div class="pl-f"><label>Period label (optional)</label><input type="text" data-f="period" value="${esc(r.period)}" placeholder="e.g. P3"></div>
<div class="pl-f"><label>Period type</label><select data-f="type">${opt([["single","Single period (40 min)"],["double","Double period (80 min)"],["other","Other (enter minutes)"]],r.type)}</select></div>
${r.type==="other"?`<div class="pl-f"><label>Length in minutes</label><input type="number" min="5" max="300" step="5" data-f="mins" value="${esc(r.mins)}"></div>`:""}
<div class="pl-f"><label>Class or group</label><input type="text" data-f="cls" value="${esc(r.cls)}" placeholder="${esc(H.cls||"e.g. 10B")}"></div>
<div class="pl-f"><label>Subject</label><select data-f="subj">${opt(SUBJ_OPTS,r.subj)}</select></div>
${hub?`<div class="pl-f"><label>Topic</label><select data-f="un"><option value="">Choose a topic…</option>${us.map(x=>`<option value="${x.n}"${String(x.n)===String(r.un)?" selected":""}>Topic ${x.n}: ${esc(txt(x.name))}</option>`).join("")}</select></div>
<div class="pl-f"><label>Lesson</label><select data-f="li"${u?"":" disabled"}>${lessonOpts(r.li,"Choose a lesson…")}</select></div>
${r.type==="double"?`<div class="pl-f"><label>Second lesson (optional)</label><select data-f="li2"${u?"":" disabled"}>${lessonOpts(r.li2,"No second lesson: extend the first")}</select></div>`:""}`:""}
<div class="pl-f"><label>Tier</label><select data-f="tier">${opt([["Core","Core"],["Extended","Extended"],["Mixed","Mixed"]],r.tier)}</select></div>
<div class="pl-f"><label>Focus</label><select data-f="focus">${Object.keys(FOCUS).map(k=>`<option value="${k}"${r.focus===k?" selected":""}>${esc(FOCUS[k].label)}</option>`).join("")}</select></div>
<div class="pl-f"><label>Methodology (blank = suggested)</label><input type="text" data-f="method" list="tp-methods" value="${esc(r.method)}" placeholder="e.g. Direct Instruction"></div>
<div class="pl-f chk"><label><input type="checkbox" data-f="prac"${r.prac?" checked":""}> Include the practical activity</label></div>
${(!hub||r.li==="own"||r.li2==="own")?`<div class="pl-f wide"><label>Lesson title</label><input type="text" data-f="title" value="${esc(r.title)}" placeholder="e.g. Revision: acids and bases"></div>
<div class="pl-f wide"><label>Objectives (one per line)</label><textarea data-f="obj">${esc(r.obj)}</textarea></div>`:""}
</div></div>`;
  }
  function renderRows(){$("#wk-rows").innerHTML=rows.map(rowHTML).join("")||`<p class="pl-note">No lessons yet. Press “Add lesson”.</p>`}
  function rerender(id){const i=rows.findIndex(r=>r.id===id);const el=app.querySelector(`.pl-row[data-id="${id}"]`);if(i<0||!el)return renderRows();el.outerHTML=rowHTML(rows[i],i)}
  function refreshHeads(){rows.forEach(r=>{const el=app.querySelector(`.pl-row[data-id="${r.id}"] .pl-dt`);if(el){const d=rowDate(r);el.textContent=(d?fmtLong(d):DAYS[r.day])+" · "+typeShort(r).replace(" · ",", ")}})}
  cal();renderRows();

  // header fields
  $("#wkf").addEventListener("input",e=>{
    const t=e.target;
    if(t.dataset.h){
      H[t.dataset.h]=t.value;
      if(t.dataset.h==="commencing"&&t.value){const m=mondayOf(parseISO(t.value));H.commencing=isoD(m);if(t.type==="date"&&document.activeElement!==t){t.value=H.commencing}}
      saveHeader();cal();refreshHeads();
    }
  });
  $("#wkf").addEventListener("change",e=>{
    const t=e.target;
    if(t.dataset.h==="commencing"&&t.value){const m=mondayOf(parseISO(t.value));H.commencing=isoD(m);t.value=H.commencing;saveHeader();cal();refreshHeads()}
    if(t.dataset.h==="week"){H.week=t.value;$("#h-wo-box").hidden=t.value!=="other";saveHeader()}
    if(t.dataset.h==="term"){H.term=t.value;saveHeader()}
    if(t.dataset.h==="layout"){H.layout=t.value;saveHeader()}
    if(t.id==="h-sign"){H.signEach=t.checked;saveHeader()}
    const rowEl=t.closest&&t.closest(".pl-row");
    if(rowEl&&t.dataset.f){
      const r=rows.find(x=>x.id===+rowEl.dataset.id);if(!r)return;
      const f=t.dataset.f;r[f]=t.type==="checkbox"?t.checked:t.value;
      if(f==="subj"){r.un="";r.li="";r.li2="";rerender(r.id)}
      else if(f==="un"){r.li="";r.li2="";rerender(r.id)}
      else if(f==="type"){r.prac=r.type==="double";if(r.type!=="double")r.li2="";rerender(r.id)}
      else if(f==="mins"){refreshHeads()}
      else if(f==="li"||f==="li2"){rerender(r.id)}
      else if(f==="day"){r.day=+t.value;rerender(r.id)}
      else if(f==="date"){rerender(r.id)}
    }
  });
  $("#wkf").addEventListener("input",e=>{
    const t=e.target,rowEl=t.closest&&t.closest(".pl-row");
    if(rowEl&&t.dataset.f&&(t.type==="text"||t.tagName==="TEXTAREA")){const r=rows.find(x=>x.id===+rowEl.dataset.id);if(r)r[t.dataset.f]=t.value}
  });
  $("#wk-rows").addEventListener("click",e=>{
    const b=e.target.closest("button[data-act]");if(!b)return;
    const el=b.closest(".pl-row"),i=rows.findIndex(x=>x.id===+el.dataset.id);if(i<0)return;
    const a=b.dataset.act;
    if(a==="del")rows.splice(i,1);
    else if(a==="dup")rows.splice(i+1,0,newRow(Object.assign({},rows[i],{id:undefined})));
    else if(a==="up"&&i>0)[rows[i-1],rows[i]]=[rows[i],rows[i-1]];
    else if(a==="down"&&i<rows.length-1)[rows[i+1],rows[i]]=[rows[i],rows[i+1]];
    renderRows();
  });
  $("#h-now").addEventListener("click",()=>{H.commencing=isoD(mondayOf(new Date()));$("#h-comm").value=H.commencing;saveHeader();cal();refreshHeads()});
  $("#wk-add").addEventListener("click",()=>{rows.push(newRow({cls:""}));renderRows();const last=app.querySelector(".pl-row:last-child");if(last)last.scrollIntoView({block:"center",behavior:"smooth"})});
  $("#wk-fill").addEventListener("click",()=>{
    const blank=rows.length===1&&!rows[0].un&&!rows[0].period&&!rows[0].cls&&!rows[0].title;
    const add=DAYS.map((n,i)=>newRow({day:i}));
    rows=blank?add:rows.concat(add);renderRows();msg("Added five single periods. Choose a subject and lesson for each.");
  });
  const skel=()=>rows.map(r=>({day:r.day,period:r.period,start:r.start,mins:r.mins,type:r.type,cls:r.cls,subj:r.subj,tier:r.tier,focus:r.focus,prac:r.prac}));
  $("#wk-save").addEventListener("click",()=>{const s=wkLoad();s.header=H;s.timetable=skel();wkSave(s);msg("Timetable saved on this device.")});
  $("#wk-load").addEventListener("click",()=>{const s=wkLoad();if(!s.timetable||!s.timetable.length)return msg("No saved timetable yet.");rows=s.timetable.map(r=>newRow(Object.assign({},r,{un:"",li:"",li2:"",title:"",obj:""})));renderRows();msg("Saved timetable loaded.")});
  $("#wk-clear").addEventListener("click",()=>{rows=[newRow()];renderRows();const s=wkLoad();delete s.timetable;wkSave(s);msg("Timetable cleared.")});

  // generate
  function generate(){
    if(!rows.length){msg("Add at least one lesson first.");return}
    const wk=weekInfoFrom(H);
    const common={school:H.school,teacher:H.teacher,diff:"Balanced",size:"",ibl:true,homework:true};
    const items=weekItems(wk,rows,common,{SUB:env.SUB,subKey:env.subKey,U:env.U,S:env.S,F:env.F,plain:env.plain,saveFile:env.saveFile});
    const tplMode=(H.layout||"tpl")==="tpl";
    const groups=tplMode?PLAN_TEMPLATE.school.groups(wk,items,H):null;
    const doc=tplMode?PLAN_TEMPLATE.school.html(groups):PLAN_TEMPLATE.document(wk,items,{signEach:!!H.signEach});
    const name=tplMode?PLAN_TEMPLATE.school.fileName(groups,wk,H):("Weekly lesson plans "+(wk.weekLabel||"")+(wk.range?" "+wk.range:"")).replace(/[^A-Za-z0-9 ._,-]+/g," ").replace(/\s+/g," ").trim();
    $("#pl-out").innerHTML=`<div class="pl-tools"><button class="btn pri" type="button" data-a="print">Print or save as PDF</button><button class="btn" type="button" data-a="docx">Download Word (.docx)</button><button class="btn" type="button" data-a="html">Download HTML</button><button class="btn" type="button" data-a="copy">Copy as text</button><span class="pl-msg" id="pl-msg" role="status" aria-live="polite"></span><p class="pl-hint">${tplMode?`${items.length} lessons in ${groups.length} school-template table${groups.length>1?"s (one per class and subject, each on its own page)":""}.`:`${items.length} lesson plans in one document, each on its own page.`} The document is editable: click in any part to change the wording before you print or download.</p></div><div class="pl-doc${tplMode?" tp-doc":""}" id="pl-doc" contenteditable="true" spellcheck="true">${doc}</div>`;
    $("#pl-doc").dataset.footer=PLAN_TEMPLATE.docx.footer(wk);
    const pm=t=>{const m=$("#pl-msg");if(m){m.textContent=t;setTimeout(()=>{if(m.textContent===t)m.textContent=""},3500)}};
    $("#pl-out").querySelector(".pl-tools").addEventListener("click",async e=>{
      const b=e.target.closest("button[data-a]");if(!b)return;
      const d=$("#pl-doc"),a=b.dataset.a,isTp=d.classList.contains("tp-doc");
      try{
        if(a==="print")window.print();
        else if(a==="copy"){const t=isTp?PLAN_TEMPLATE.school.text(PLAN_TEMPLATE.school.read(d)):toText(readDoc(d));try{await navigator.clipboard.writeText(t);pm("Copied to the clipboard.")}catch(err){const ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand("copy")}catch(x){}ta.remove();pm(ok?"Copied to the clipboard.":"Copy was blocked. Select the plan and copy it instead.")}}
        else if(a==="docx"){const blob=isTp?await PLAN_TEMPLATE.school.docx(PLAN_TEMPLATE.school.read(d)):await toDocx(readDoc(d),{footer:d.dataset.footer});const r=await env.saveFile(name+".docx",blob);pm(r==="saved"?"Word file saved.":r==="declined"?"":"Could not save the file.")}
        else if(a==="html"){
          const html=`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${esc(name)}</title><style>${isTp?TP_HTML_CSS:`body{font:16px/1.5 Calibri,Arial,sans-serif;color:#10252F;max-width:1200px;margin:24px auto;padding:0 16px}h1{font-family:Cambria,Georgia,serif;color:#0B3D3A}h2{font-family:Cambria,Georgia,serif;color:#0E7C66;border-bottom:2px solid #BFDCD3;padding-bottom:4px;margin-top:26px}table{border-collapse:collapse;width:100%;margin:8px 0}th,td{border:1px solid #BFDCD3;padding:6px 9px;text-align:left;vertical-align:top}thead th{background:#0B3D3A;color:#fff}.pl-meta th{background:#E6F2EE;width:14%}.pl-sub{color:#4D6573}.pl-line{border-bottom:1px solid #999;min-height:28px}td ul{margin:0;padding-left:18px}.pl-pb{break-after:page;height:0;border-top:1px dashed #BFDCD3;margin:28px 0}.pl-pb span{display:none}.pl-sign td{height:34px}.pl-sign td.pl-tall{height:80px}@media print{@page{size:A4 landscape;margin:10mm}body{font-size:10pt;max-width:none;margin:0}.pl-pb{border:0;margin:0}}`}</style></head><body>${d.innerHTML}</body></html>`;
          const r=await env.saveFile(name+".html",new Blob([html],{type:"text/html"}));pm(r==="saved"?"HTML file saved.":r==="declined"?"":"Could not save the file.")
        }
      }catch(err){console.error(err);pm("Something went wrong. Try again.")}
    });
    $("#pl-doc").scrollIntoView({block:"start",behavior:"smooth"});
  }
  $("#wk-go").addEventListener("click",generate);
}

/* ---------- entry point: mode switch ---------- */
window.PLANUI=function(app,env){
  injectCSS();
  const p0=loadPrefs();
  let mode=env.pick?"single":(p0.mode||"weekly");
  app.innerHTML=`<h1 class="ltitle">Lesson plans</h1>
<p class="lsum">Plan a whole week from your timetable, or plan one lesson. The hub drafts each plan from the lesson's notes, activity, questions and flashcards. Edit anything, then print it or save it as a Word file.</p>
<div class="chips pl-modes" role="group" aria-label="Plan type"><button class="chip" type="button" data-m="weekly">Weekly plan</button><button class="chip" type="button" data-m="single">Single lesson</button></div><div id="pl-mode"></div>`;
  function show(){
    app.querySelectorAll("[data-m]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.m===mode)));
    const box=app.querySelector("#pl-mode");box.innerHTML="";
    if(mode==="weekly")weeklyUI(box,env);else singleUI(box,env);
  }
  app.querySelectorAll("[data-m]").forEach(b=>b.addEventListener("click",()=>{if(mode===b.dataset.m)return;mode=b.dataset.m;const p=loadPrefs();p.mode=mode;savePrefs(p);env.pick="";show()}));
  show();
};
window.__planTest={buildPlan,readDoc,toDocx,toText,PLAN_TEMPLATE,weekItems,weekInfoFrom};
})();
