/* ===== end of Biology 9700 data: assemble sections, park A Level units, restore chemistry ===== */
[[1,["1.1","1.2"]],[2,["2.1","2.2","2.3","2.4"]],[3,["3.1","3.2"]],[4,["4.1","4.2"]],[5,["5.1","5.2"]]].forEach(([n,ks])=>{
  ALSET(n,[].concat(...ks.map(k=>AL_L[k]||[])),[].concat(...ks.map(k=>AL_Q[k]||[])),[].concat(...ks.map(k=>AL_P[k]||[])).concat(AL_P["T"+n]||[]));
});
ALSET(6,[],[],AL_P["T6"]||[]);
const AL_U=U.splice(0,U.length);
AL_CHEM_U.forEach(x=>U.push(x));
