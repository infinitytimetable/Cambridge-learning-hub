/* ---------- games data ---------- */
const MATCH={
  symbols:{title:"Element symbols",pairs:[["H","Hydrogen"],["He","Helium"],["Li","Lithium"],["C","Carbon"],["N","Nitrogen"],["O","Oxygen"],["F","Fluorine"],["Na","Sodium"],["Mg","Magnesium"],["Al","Aluminium"],["Si","Silicon"],["P","Phosphorus"],["S","Sulfur"],["Cl","Chlorine"],["K","Potassium"],["Ca","Calcium"],["Fe","Iron"],["Cu","Copper"],["Zn","Zinc"],["Ag","Silver"],["Au","Gold"],["Pb","Lead"]]},
  gas:{title:"Gas tests",pairs:[["Hydrogen","Squeaky pop with a lighted splint"],["Oxygen","Relights a glowing splint"],["Carbon dioxide","Turns limewater milky"],["Chlorine","Bleaches damp litmus paper"],["Ammonia","Turns damp red litmus blue"],["Sulfur dioxide","Acidified KMnO~4~ goes purple to colourless"]]},
  ions:{title:"Ion tests",pairs:[["Cu^2+^ + NaOH","Light blue precipitate"],["Fe^2+^ + NaOH","Green precipitate"],["Fe^3+^ + NaOH","Red-brown precipitate"],["Li^+^ flame test","Red flame"],["Na^+^ flame test","Yellow flame"],["K^+^ flame test","Lilac flame"],["Cu^2+^ flame test","Blue-green flame"],["I^−^ + acidified AgNO~3~","Yellow precipitate"],["Br^−^ + acidified AgNO~3~","Cream precipitate"],["Cl^−^ + acidified AgNO~3~","White precipitate"]]},
  organic:{title:"Organic groups",pairs:[["Alkane","Only C–C single bonds, C~n~H~2n+2~"],["Alkene","C=C double bond, C~n~H~2n~"],["Alcohol","–OH group"],["Carboxylic acid","–COOH group"],["Ester","Sweet smelling, made from acid + alcohol"],["Polymer","Long chain of monomers"],["Isomers","Same formula, different structure"]]},
  process:{title:"Processes and products",pairs:[["Haber process","Ammonia"],["Contact process","Sulfuric acid"],["Blast furnace","Iron"],["Electrolysis of Al~2~O~3~","Aluminium"],["Fractional distillation of petroleum","Fuels and fractions"],["Fermentation","Ethanol"],["Cracking","Alkenes and shorter alkanes"],["Fractional distillation of air","Nitrogen and oxygen"]]}
};
const EQ=[
  {l:["H2","O2"],r:["H2O"],a:[2,1,2]},{l:["Mg","O2"],r:["MgO"],a:[2,1,2]},{l:["N2","H2"],r:["NH3"],a:[1,3,2]},
  {l:["Na","H2O"],r:["NaOH","H2"],a:[2,2,2,1]},{l:["CH4","O2"],r:["CO2","H2O"],a:[1,2,1,2]},{l:["Zn","HCl"],r:["ZnCl2","H2"],a:[1,2,1,1]},
  {l:["Fe","Cl2"],r:["FeCl3"],a:[2,3,2]},{l:["KClO3"],r:["KCl","O2"],a:[2,2,3]},{l:["Al","O2"],r:["Al2O3"],a:[4,3,2]},
  {l:["C2H4","O2"],r:["CO2","H2O"],a:[1,3,2,2]},{l:["Fe2O3","CO"],r:["Fe","CO2"],a:[1,3,2,3]},{l:["C3H8","O2"],r:["CO2","H2O"],a:[1,5,3,4]},
  {l:["HCl","CaCO3"],r:["CaCl2","H2O","CO2"],a:[2,1,1,1,1]},{l:["C2H5OH","O2"],r:["CO2","H2O"],a:[1,3,2,3]},{l:["Pb(NO3)2"],r:["PbO","NO2","O2"],a:[2,2,4,1]},
  {l:["Al","H2SO4"],r:["Al2(SO4)3","H2"],a:[2,3,1,3]}
];
const FORGE=[
  {n:"sodium chloride",c:["Na^+^",1,"Na",0],a:["Cl^−^",1,"Cl",0]},
  {n:"magnesium oxide",c:["Mg^2+^",2,"Mg",0],a:["O^2−^",2,"O",0]},
  {n:"calcium chloride",c:["Ca^2+^",2,"Ca",0],a:["Cl^−^",1,"Cl",0]},
  {n:"aluminium oxide",c:["Al^3+^",3,"Al",0],a:["O^2−^",2,"O",0]},
  {n:"potassium sulfate",c:["K^+^",1,"K",0],a:["SO~4~^2−^",2,"SO4",1]},
  {n:"calcium nitrate",c:["Ca^2+^",2,"Ca",0],a:["NO~3~^−^",1,"NO3",1]},
  {n:"aluminium sulfate",c:["Al^3+^",3,"Al",0],a:["SO~4~^2−^",2,"SO4",1]},
  {n:"ammonium sulfate",c:["NH~4~^+^",1,"NH4",1],a:["SO~4~^2−^",2,"SO4",1]},
  {n:"iron(III) hydroxide",c:["Fe^3+^",3,"Fe",0],a:["OH^−^",1,"OH",1]},
  {n:"copper(II) sulfate",c:["Cu^2+^",2,"Cu",0],a:["SO~4~^2−^",2,"SO4",1]},
  {n:"zinc chloride",c:["Zn^2+^",2,"Zn",0],a:["Cl^−^",1,"Cl",0]},
  {n:"magnesium hydroxide",c:["Mg^2+^",2,"Mg",0],a:["OH^−^",1,"OH",1]},
  {n:"sodium carbonate",c:["Na^+^",1,"Na",0],a:["CO~3~^2−^",2,"CO3",1]},
  {n:"iron(II) chloride",c:["Fe^2+^",2,"Fe",0],a:["Cl^−^",1,"Cl",0]},
  {n:"ammonium chloride",c:["NH~4~^+^",1,"NH4",1],a:["Cl^−^",1,"Cl",0]},
  {n:"silver nitrate",c:["Ag^+^",1,"Ag",0],a:["NO~3~^−^",1,"NO3",1]}
];
const WORDS=[["electrolysis","Splitting a compound using electricity"],["catalyst","Speeds up a reaction without being used up"],["isotope","Atoms with the same protons but different neutrons"],["covalent","Bond formed by sharing electrons"],["alkali","A soluble base"],["distillation","Separating a liquid from a mixture by boiling and condensing"],["oxidation","Loss of electrons"],["precipitate","An insoluble solid formed in a reaction"],["polymer","Long chain made of monomers"],["neutralisation","Acid reacts with base to form salt and water"],["electron","Negative particle in an atom"],["molecule","Atoms joined by covalent bonds"],["alkane","Saturated hydrocarbon"],["displacement","A more reactive element takes the place of a less reactive one"],["exothermic","Releases energy to the surroundings"],["endothermic","Takes in energy from the surroundings"],["chromatography","Separating coloured substances on paper"],["fermentation","Yeast turns sugar into ethanol"],["crystallisation","Forming crystals from a saturated solution"],["reactivity","How easily an element reacts"],["equilibrium","Forward and reverse rates are equal"],["diffusion","Particles spreading from high to low concentration"],["cathode","The negative electrode"],["isomer","Same formula, different structure"]];
const JOKES=[
["Why can't you trust atoms?","They make up everything."],
["What do you do with a dead chemist?","Barium."],
["If you are not part of the solution…","You are part of the precipitate."],
["I would tell you a chemistry joke…","But I know I would not get a reaction."],
["What did the scientist say when she found two isotopes of helium?","HeHe."],
["Why do chemists like nitrates?","They are cheaper than day rates."],
["Why are helium, curium and barium the medical elements?","If you cannot helium or curium, you barium."],
["A neutron walks into a bar and asks how much for a drink.","The bartender says: for you, no charge."],
["What did oxygen say to magnesium?","OMg."],
["What do you call a tooth in a glass of water?","A one molar solution."],
["A noble gas walks into a bar.","There is no reaction."],
["What do you call an acid with an attitude?","A-mean-oh acid."],
["Why are electrons never invited to parties?","They are always so negative."],
["Why did the chemist break up with her partner?","There was no chemistry left."],
["What is the best way to learn the periodic table?","Practise elementary things every day."],
["Why did the bear dissolve in water?","It was polar."]
];
