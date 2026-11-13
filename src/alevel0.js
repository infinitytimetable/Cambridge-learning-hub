/* ===== BIOLOGY 9700 (AS and A Level): unit skeletons. Biology 0610 units are parked in BIO_U; this block restores chemistry afterwards via alevel9.js ===== */
const AL_CHEM_U=U.splice(0,U.length);
UN(1,"Ce","Cell structure","The microscope in cell studies, and the structure of eukaryotic and prokaryotic cells.",[],[],[]);
UN(2,"Bm","Biological molecules","Tests for biological molecules, carbohydrates, lipids, proteins and water.",[],[],[]);
UN(3,"En","Enzymes","How enzymes work and the factors that affect enzyme-catalysed reactions.",[],[],[]);
UN(4,"Cm","Cell membranes and transport","Membrane structure and the movement of substances into and out of cells.",[],[],[]);
UN(5,"Mc","The mitotic cell cycle","DNA replication, nuclear division and chromosome behaviour in mitosis.",[],[],[]);
UN(6,"Nu","Nucleic acids and protein synthesis","DNA and RNA structure, DNA replication, the genetic code, transcription and translation, and gene mutation.",[],[],[]);
UN(7,"Tp","Transport in plants","Xylem and phloem, water uptake and transpiration, and translocation of assimilates.",[],[],[]);
UN(8,"Tm","Transport in mammals","The circulatory system, blood, haemoglobin and gas transport, and the structure and action of the heart.",[],[],[]);
UN(9,"Ge","Gas exchange","Gas exchange surfaces, the human gas exchange system, and smoking and lung disease.",[],[],[]);
UN(10,"Id","Infectious diseases","Cholera, malaria, TB and HIV/AIDS, their transmission and control, and antibiotics.",[],[],[]);
UN(11,"Im","Immunity","The immune system, antibodies, vaccination and monoclonal antibodies.",[],[],[]);
UN(12,"Er","Energy and respiration","ATP, glycolysis, the link reaction, Krebs cycle, oxidative phosphorylation and anaerobic respiration.",[],[],[]);
UN(13,"Ph","Photosynthesis","Chloroplasts, the light-dependent and light-independent stages, and limiting factors.",[],[],[]);
UN(14,"Ho","Homeostasis","Control of body temperature, blood glucose and the kidney, and plant responses to stimuli.",[],[],[]);
UN(15,"Cc","Control and coordination","Nervous and hormonal coordination, nerve impulses, synapses, muscle contraction and plant hormones.",[],[],[]);
UN(16,"In","Inheritance","Meiosis, monohybrid and dihybrid crosses, gene interaction, linkage and the chi-squared test.",[],[],[]);
UN(17,"Se","Selection and evolution","Variation, natural and artificial selection, speciation and evolution.",[],[],[]);
UN(18,"Cb","Classification, biodiversity and conservation","Classification, biodiversity, threats to biodiversity and conservation methods.",[],[],[]);
UN(19,"Gt","Genetic technology","Genetic engineering, gene therapy, PCR, gel electrophoresis and GM organisms.",[],[],[]);
const ALSET=(n,lessons,quiz,pp)=>{const u=U.find(x=>x.n===n);if(!u)throw new Error("ALSET: no topic "+n);u.lessons=lessons;u.quiz=quiz;u.pp=pp||[]};
/* each content file fills AL_L["1.1"]=[lessons], AL_Q["1.1"]=[quiz questions], AL_P["1.1"]=[exam questions]; alevel9.js assembles them in order */
const AL_L={},AL_Q={},AL_P={};
