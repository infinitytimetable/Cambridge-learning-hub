/* al_extrarun.js - merges ALX (pairs, words, jokes, second IBL task) and ALQZ (topic quizzes) into the 9700 units */
(function(){
  const k=Object.keys(SUBJ).find(x=>String(SUBJ[x].code)==="9700");if(!k)return;
  SUBJ[k].units.forEach(u=>{
    if(u.n>=6&&ALQZ[u.n]&&(!u.quiz||!u.quiz.length))u.quiz=ALQZ[u.n];
    (u.lessons||[]).forEach((l,j)=>{const x=ALX[u.n+"."+(j+1)];if(!x||!l.builtin)return;
      l.pairs=x.pairs;l.words=x.words;l.jokes=x.jokes;if(x.ibl&&x.ibl.length)l.ibl2=x.ibl});
  });
})();
