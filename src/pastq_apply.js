/* pastq_apply.js - adds the past-paper questions (with their diagrams) to each topic's exam practice, so they also reach the Assessments builder. */
(function(){
  if(typeof PQ_STORE==="undefined"||typeof SUBJ==="undefined")return;
  Object.keys(PQ_STORE).forEach(sub=>{
    const S=SUBJ[sub];if(!S)return;const D=PQ_STORE[sub];
    D.i.forEach(it=>{
      const u=S.units.find(x=>+x.n===+it.u);if(!u)return;
      const q=it.q.replace(/@@([^@]+)@@/g,(m,k)=>D.f[k]||"");
      (u.pp=u.pp||[]).push(P(it.t,it.m,q,it.ms,it.s));
    });
    delete PQ_STORE[sub];
  });
})();
