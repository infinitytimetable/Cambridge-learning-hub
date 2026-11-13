/* al_packrun.js - adds the built-in topic 6-19 lessons (AL_PACK) to the 9700 subject. Runs before desk.js, which skips any lesson already present. */
(function(){
  const k=Object.keys(SUBJ).find(x=>String(SUBJ[x].code)==="9700");if(!k)return;
  const units=SUBJ[k].units;
  AL_PACK.forEach(o=>{
    const u=units.find(x=>String(x.n)===String(o.topic));if(!u||u.lessons.some(l=>l.t===o.title))return;
    const nt=String(o.notes||"").replace(/src="@([^"]+)"/g,(m,p)=>'src="'+(AL_PIMG[p]||"")+'"');
    const l=L(o.title,o.summary||"",nt,Object.assign({q:"What do you already know about "+o.title+"?",task:"<ol><li>Write what you know.</li><li>Predict what you will find out.</li></ol>",act:"<ol><li>Follow your teacher’s instructions.</li></ol>"},o.ibl||{}),(o.ws||[]).map(w=>Array.isArray(w)?w:[w.q,w.ms||w.a||"",w.marks||1]),(o.pr||[]),(o.cards||[]));
    l.pairs=o.pairs||[];l.words=o.words||[];l.jokes=o.jokes||[];l.added=1;l.builtin=1;
    u.lessons.push(l);
  });
})();
