/* pastq_core.js - registry for the past-paper question data files (pastq_chem.js, pastq_bio.js, pastq_alevel.js). */
const PQ_STORE={};
function PASTQ_ADD(sub,figs,items){PQ_STORE[sub]={f:figs,i:items}}
