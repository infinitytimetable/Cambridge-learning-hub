/* ===== merge per-lesson extras (LX, LXI) into the subject data; runs after the subject registry is built ===== */
(function(){
  Object.keys(SUBJ).forEach(k=>{
    const X=LX[k]||{},I=LXI[k]||{};
    SUBJ[k].units.forEach(u=>(u.lessons||[]).forEach((l,j)=>{
      const no=u.n+"."+(j+1),x=X[no],i=I[no];
      if(x){
        const have=new Set(l.cards.map(c=>String(c[0]).toLowerCase()));
        (x.cards||[]).forEach(c=>{if(!have.has(String(c[0]).toLowerCase()))l.cards.push(c)});
        l.pairs=x.pairs||[];l.words=x.words||[];l.jokes=x.jokes||[];
      }
      if(i&&i.length)l.ibl2=i;
    }));
  });
})();
