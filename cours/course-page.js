const COURSES={
"01":{slug:"html",title:"HTML",subtitle:"Structure du web",level:"Débutant",file:"../courses-01.js"},
"02":{slug:"css",title:"CSS",subtitle:"Style & responsive",level:"Débutant",file:"../courses-02.js"},
"03":{slug:"javascript",title:"JavaScript",subtitle:"Logique & interaction",level:"Débutant",file:"../courses-03.js"},
"04":{slug:"python",title:"Python",subtitle:"Programmer",level:"Débutant",file:"../courses-04.js"},
"05":{slug:"git-github",title:"Git & GitHub",subtitle:"Versionner",level:"Débutant",file:"../courses-05.js"},
"06":{slug:"sql",title:"SQL",subtitle:"Données",level:"Intermédiaire",file:"../courses-06.js"},
"07":{slug:"reseaux",title:"Réseaux",subtitle:"Internet",level:"Intermédiaire",file:"../courses-07.js"},
"08":{slug:"linux",title:"Linux",subtitle:"Système",level:"Intermédiaire",file:"../courses-08.js"},
"09":{slug:"cybersecurite",title:"Cybersécurité",subtitle:"Défense",level:"Intermédiaire",file:"../courses-09.js"},
"10":{slug:"cryptographie",title:"Cryptographie",subtitle:"Secrets",level:"Intermédiaire",file:"../courses-10.js"},
"11":{slug:"securite-web",title:"Sécurité web",subtitle:"Applications",level:"Intermédiaire",file:"../courses-11.js"},
"12":{slug:"osint",title:"OSINT",subtitle:"Information",level:"Intermédiaire",file:"../courses-12.js"},
"13":{slug:"analyse-incidents",title:"Analyse d'incidents",subtitle:"Incidents",level:"Avancé",file:"../courses-13.js"},
"14":{slug:"projet-final",title:"Projet final",subtitle:"Portfolio",level:"Avancé",file:"../courses-14.js"}
};
const params=new URLSearchParams(location.search);const id=params.get("id")||document.body.dataset.course||"01";const meta=COURSES[id]||COURSES["01"];
document.title=meta.title+" — Le Code & la Cybersécurité de A à Z";
const root=document.querySelector("#courseRoot");
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
const LEVELS=[
 {name:"Débutant",icon:"🟢",intro:"Fondations : comprendre les concepts, le vocabulaire et les premières manipulations."},
 {name:"Intermédiaire",icon:"🟡",intro:"Consolidation : combiner plusieurs notions et résoudre des problèmes réalistes."},
 {name:"Avancé",icon:"🟠",intro:"Maîtrise : analyser, diagnostiquer, optimiser et justifier ses choix."},
 {name:"Expert / Projet",icon:"🔴",intro:"Mise en pratique : réaliser un travail complet, le tester, le documenter et l’évaluer."}
];
function renderLevel(level,sections,start,end){
 const lessons=sections.slice(start,end);
 return `<section class="level level-${level+1}" id="niveau-${level+1}">
 <div class="level-head"><span class="level-number">${LEVELS[level].icon} NIVEAU ${level+1}</span><h2>${LEVELS[level].name}</h2><p>${esc(LEVELS[level].intro)}</p></div>
 ${lessons.map((s,i)=>`<article class="lesson"><div class="lesson-tag">Leçon ${start+i+1}</div><h3>${esc(s[0]||"Notion")}</h3><p>${esc(s[1]||s)}</p>
 <div class="learning-path"><span>1. Comprendre</span><span>2. Reproduire</span><span>3. Pratiquer</span><span>4. Vérifier</span></div></article>`).join("")}
 <div class="level-check"><strong>Validation du niveau</strong><p>Avant de continuer, refais les exercices liés à ce niveau sans regarder la correction, puis vérifie que tu peux expliquer les notions avec tes propres mots.</p><a class="btn secondary" href="#niveau-${level<3?level+2:4}">${level<3?"Passer au niveau suivant →":"Aller au projet final →"}</a></div>
 </section>`;
}

function playground(){return '<section class="playground" id="atelier"><div class="playground-head"><div><div class="eyebrow">ATELIER DE CODE</div><h2>Écris ton code et teste-le</h2><p>Un mini-laboratoire directement dans le cours. Tes essais restent dans ton navigateur.</p></div><button class="btn" id="runCode">▶ Exécuter</button></div><div class="code-tabs"><button class="code-tab active" data-lang="html">HTML</button><button class="code-tab" data-lang="css">CSS</button><button class="code-tab" data-lang="js">JavaScript</button></div><textarea id="codeEditor" spellcheck="false"></textarea><div class="playground-actions"><button class="btn secondary" id="resetCode">Réinitialiser</button><button class="btn secondary" id="clearCode">Effacer</button><span id="runStatus">Prêt.</span></div><iframe id="codePreview" title="Résultat du code" sandbox="allow-scripts"></iframe></section>';}
function initPlayground(){
 const editor=document.querySelector("#codeEditor"),preview=document.querySelector("#codePreview"),status=document.querySelector("#runStatus");if(!editor||!preview)return;
 const starters={html:"<h1>Bonjour !</h1>\n<p>Écris ton HTML ici.</p>",css:"body { font-family: system-ui; padding: 24px; }\nh1 { color: #42e8a4; }",js:"document.querySelector('h1')?.addEventListener('click',()=>alert('Ça fonctionne !'));"};let lang="html";
 function load(){editor.value=starters[lang];}
 function run(){let html=starters.html,css=starters.css,js=starters.js;if(lang==="html")html=editor.value;if(lang==="css")css=editor.value;if(lang==="js")js=editor.value;preview.srcdoc="<!doctype html><html><head><meta charset='utf-8'><style>"+css+"</style></head><body>"+html+"<script>"+js+"<\\/script></body></html>";status.textContent="Exécuté à "+new Date().toLocaleTimeString("fr-FR");}
 document.querySelectorAll(".code-tab").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.lang;document.querySelectorAll(".code-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");load()}));
 document.querySelector("#runCode").addEventListener("click",run);document.querySelector("#resetCode").addEventListener("click",()=>{load();status.textContent="Code réinitialisé."});document.querySelector("#clearCode").addEventListener("click",()=>{editor.value="";status.textContent="Éditeur vidé."});
 editor.addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();let a=editor.selectionStart;editor.value=editor.value.slice(0,a)+"  "+editor.value.slice(editor.selectionEnd);editor.selectionStart=editor.selectionEnd=a+2;}});load();run();
}
function render(data){
 const sections=Array.isArray(data.sections)?data.sections:[];const exercises=Array.isArray(data.exercises)?data.exercises:[];
 const cuts=[0,Math.ceil(sections.length/4),Math.ceil(sections.length/2),Math.ceil(sections.length*3/4),sections.length];
 root.innerHTML=`<header class="hero"><div class="eyebrow">COURS ${id} • PROGRESSION COMPLÈTE</div><h1>${esc(meta.title)}</h1><p class="lead">${esc(data.intro||meta.subtitle)}</p><div class="meta"><span class="pill">${esc(meta.subtitle)}</span><span class="pill">Débutant → Expert</span><span class="pill">Environnement autorisé</span></div></header>
 <div class="progression"><strong>Parcours :</strong> 🟢 Débutant → 🟡 Intermédiaire → 🟠 Avancé → 🔴 Expert / Projet</div>${playground()}
 <div class="course-content"><h2>Le cours, du début à la fin</h2><p>Chaque cours suit désormais une progression en quatre niveaux. Pour chaque leçon : comprends la notion, reproduis l’exemple, réalise la pratique, puis valide avant de monter de niveau.</p>
 ${LEVELS.map((_,i)=>renderLevel(i,sections,cuts[i],cuts[i+1])).join("")}
 <section id="exercices"><h2>Exercices & validation finale</h2>${exercises.map((x,i)=>`<div class="exercise"><strong>Exercice ${i+1}</strong><p>${esc(x)}</p></div>`).join("")}</section>
 <div class="final-check"><h2>Validation du cours</h2><p>Objectif atteint lorsque tu peux refaire le mini-projet, expliquer tes choix, corriger tes erreurs et produire un résultat propre sans suivre pas à pas le cours.</p></div>
 </div>${nav(id)}`;initPlayground();
}
function nav(id){const n=Number(id),prev=String(n-1).padStart(2,"0"),next=String(n+1).padStart(2,"0");return `<div class="nav-course">${n>1?`<a class="btn secondary" href="${COURSES[prev].slug}.html">← ${esc(COURSES[prev].title)}</a>`:"<span></span>"}<a class="btn secondary" href="../index.html#cours">Sommaire</a>${n<14?`<a class="btn" href="${COURSES[next].slug}.html">${esc(COURSES[next].title)} →</a>`:"<span></span>"}</div>`}
document.querySelector("#courseTitle").textContent=meta.title;
const s=document.createElement("script");s.src=meta.file;s.onload=()=>render(window.courseData?.[id]||{});document.body.appendChild(s);