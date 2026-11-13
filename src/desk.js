/* Browser-app mode (Install.bat version): launch.ps1 scans the content folder and writes content.js (window.LOTS_CONTENT); this shim gives the page the same lotsDesktop API the Electron build had. */
(function(){
  const C=typeof window!=="undefined"&&window.LOTS_CONTENT;
  if(!C||window.lotsDesktop)return;
  const files=(C.files||[]).slice();
  window.lotsDesktop={shim:true,
    root:()=>C.rootText||"",
    walk:rel=>{const p=String(rel||"").replace(/\/+$/,"")+"/";return files.filter(f=>f.rel.indexOf(p)===0)},
    url:rel=>C.root+String(rel).split("/").map(encodeURIComponent).join("/"),
    openFile:rel=>{try{window.open(window.lotsDesktop.url(rel),"_blank")}catch(e){}},
    openFolder:()=>{alert("Your content folder is:\n\n"+(C.rootText||"")+"\n\nOpen it in File Explorer (Documents > LOTS Hub Content), add your files, then close and reopen the hub.")},
    readJsonDir:rel=>{const out=[];(C.json||[]).filter(j=>j.dir===rel).forEach(j=>{try{out.push({file:j.file,data:JSON.parse(String(j.raw).replace(/^\uFEFF/,""))})}catch(e){out.push({file:j.file,error:e.message})}});return out}
  };
})();
/* desk.js - desktop app only: merges teacher-added lessons and questions from the content folder (Lessons\*.json, Questions\*.json).
   Runs after the subject registry exists. window.lotsDesktop is provided by the Windows app (preload.js); in a browser this does nothing. */
const DESK=(function(){
  const D=typeof window!=="undefined"&&window.lotsDesktop;
  const out={on:!!D,warn:[],lessons:0,questions:0};
  if(!D)return out;
  const subjKey=c=>Object.keys(SUBJ).find(k=>String(SUBJ[k].code)===String(c));
  const unitOf=(o,f)=>{const k=subjKey(o.subject);if(!k){out.warn.push(f+": unknown subject "+JSON.stringify(o.subject)+" (use 0620, 0610 or 9700)");return null}
    let u=SUBJ[k].units.find(x=>String(x.n)===String(o.topic));
    if(u&&o.topicName&&/^Further AS/i.test(u.name)){u.n=20;u=null;SUBJ[k].units.sort((a,b)=>a.n-b.n)} /* the past-paper holder unit moves aside so real topic 6 can exist */
    if(!u&&o.topicName&&/^\d+$/.test(String(o.topic))){u={n:+o.topic,sym:String(o.sym||o.topicName.replace(/[^A-Za-z ]/g,"").split(/\s+/).map(w=>w[0]).join("").slice(0,2)||"T"),name:o.topicName,blurb:o.blurb||"",lessons:[],quiz:[],pp:[]};SUBJ[k].units.push(u);SUBJ[k].units.sort((a,b)=>a.n-b.n)}
    if(!u){out.warn.push(f+": no topic "+o.topic+" in "+o.subject);return null}return u};
  try{
    (D.readJsonDir("Lessons")||[]).forEach(f=>{
      if(f.error){out.warn.push(f.file+": "+f.error);return}
      (Array.isArray(f.data)?f.data:[f.data]).forEach((o,i)=>{
        if(o&&o.replaceNotes){const uu=unitOf(o,f.file);const l0=uu&&uu.lessons[(+o.lesson||0)-1];if(l0&&o.notes){l0.notes=String(o.notes).replace(/src="@([^"]+)"/g,(m,p)=>'src="'+D.url(p)+'"');l0.smeNotes=1;if(window.GAPFILL)GAPFILL(l0,"bio",uu.n,+o.lesson);out.notes=(out.notes||0)+1}return}
        if(!o||!o.title){out.warn.push(f.file+" #"+(i+1)+": lesson has no title");return}
        const u=unitOf(o,f.file);if(!u)return;
        if(u.lessons.some(x=>x.t===o.title&&x.builtin))return; /* already built into the hub */
        const nt=String(o.notes||"<p>"+(o.summary||"")+"</p>").replace(/src="@([^"]+)"/g,(m,p)=>'src="'+D.url(p)+'"');
        const l=L(o.title,o.summary||"",nt,Object.assign({q:"What do you already know about "+o.title+"?",task:"<ol><li>Write what you know.</li><li>Predict what you will find out.</li></ol>",act:"<ol><li>Follow your teacher’s instructions.</li></ol>"},o.ibl||{}),(o.ws||[]).map(w=>Array.isArray(w)?w:[w.q,w.ms||w.a||"",w.marks||1]),(o.pr||[]),(o.cards||[]));
        l.pairs=o.pairs||[];l.words=o.words||[];l.jokes=o.jokes||[];l.added=1;
        (o.quiz||[]).forEach(q=>{if(q&&q.q&&Array.isArray(q.o)&&q.a!=null){u.quiz.push(M(q.q,q.o,q.a,q.e||""));out.questions++}});
        u.lessons.push(l);out.lessons++;
      });
    });
    (D.readJsonDir("Questions")||[]).forEach(f=>{
      if(f.error){out.warn.push(f.file+": "+f.error);return}
      (Array.isArray(f.data)?f.data:[f.data]).forEach((o,i)=>{
        const u=unitOf(o,f.file);if(!u)return;
        (o.pp||[]).forEach(p=>{if(!p||!p.q||!Array.isArray(p.ms)){out.warn.push(f.file+": exam question needs q and ms (list)");return}u.pp.push(P(p.title||"Question",p.marks||p.ms.length,p.q,p.ms,p.src||""));out.questions++});
        (o.quiz||[]).forEach(q=>{if(!q||!q.q||!Array.isArray(q.o)||q.a==null){out.warn.push(f.file+": quiz item needs q, o (list) and a (index)");return}u.quiz.push(M(q.q,q.o,q.a,q.e||""));out.questions++});
      });
    });
  }catch(e){out.warn.push("Import failed: "+e.message)}
  return out;
})();
