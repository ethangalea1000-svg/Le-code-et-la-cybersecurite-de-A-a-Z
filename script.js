const modules=[
["01","HTML","Structure du web","Balises, structure et sémantique.","Débutant","HTML construit la structure d'une page avec des éléments sémantiques. Objectif : savoir créer une page propre, accessible et organisée.","Créer une page personnelle complète avec navigation, image, liste et formulaire."],
["02","CSS","Style & responsive","Mise en page, composants et mobile.","Débutant","CSS contrôle la présentation : sélecteurs, cascade, box model, Flexbox, Grid et responsive design.","Transformer une page HTML en interface responsive sur mobile et ordinateur."],
["03","JavaScript","Logique & interaction","Variables, conditions, fonctions et DOM.","Débutant","JavaScript ajoute de la logique et de l'interactivité grâce aux variables, fonctions, événements et au DOM.","Créer un quiz interactif avec score et validation."],
["04","Python","Programmer","Syntaxe, fonctions, listes et dictionnaires.","Débutant","Python permet de programmer avec une syntaxe claire. Découvre variables, conditions, boucles, fonctions et structures de données.","Créer un outil de calcul avec plusieurs fonctions."],
["05","Git & GitHub","Versionner","Commits, branches, dépôts et publication.","Débutant","Git conserve l'historique du code et GitHub permet de collaborer et publier des projets.","Créer un dépôt, faire des commits et publier un site avec GitHub Pages."],
["06","SQL","Données","Tables, requêtes et relations.","Intermédiaire","SQL sert à organiser et interroger des données avec des tables, requêtes et relations.","Concevoir une base fictive de livres et écrire des requêtes SELECT."],
["07","Réseaux","Internet","IP, DNS, HTTP, ports et client-serveur.","Intermédiaire","Comprendre comment les machines communiquent : IP, DNS, HTTP, ports et architecture client-serveur.","Dessiner le trajet d'une requête entre navigateur, DNS et serveur."],
["08","Linux","Système","Terminal, fichiers, permissions et processus.","Intermédiaire","Découvrir le terminal, les fichiers, les permissions et les processus dans un environnement Linux.","Créer une arborescence de projet et manipuler des fichiers avec le terminal."],
["09","Cybersécurité","Défense","Menaces, vulnérabilités et défense en profondeur.","Intermédiaire","Identifier les risques et apprendre les principes de défense, de réduction de surface d'attaque et de protection des données.","Analyser un scénario fictif et proposer plusieurs mesures défensives."],
["10","Cryptographie","Secrets","Hachage, chiffrement, clés et usages.","Intermédiaire","Comprendre la différence entre hachage et chiffrement, ainsi que les rôles des clés et des signatures.","Comparer plusieurs usages cryptographiques dans un scénario fictif."],
["11","Sécurité web","Applications","Sessions, entrées et principes de sécurité web.","Intermédiaire","Étudier les bonnes pratiques de sécurité des applications web : validation, authentification, sessions et contrôle d'accès.","Auditer une petite application volontairement fictive et proposer des corrections."],
["12","OSINT","Information","Évaluer des sources et informations publiques légalement.","Intermédiaire","Apprendre à rechercher, vérifier et recouper des informations publiques en respectant la vie privée et la légalité.","Vérifier une information publique fictive avec plusieurs sources."],
["13","Analyse","Incidents","Observer et documenter un incident fictif.","Avancé","Apprendre à structurer une analyse d'incident : chronologie, indices, hypothèses et mesures correctives.","Rédiger un rapport sur un incident entièrement fictif."],
["14","Projet final","Portfolio","Assembler tes compétences dans un projet documenté.","Avancé","Mettre en pratique programmation, web, Git et sécurité défensive dans un projet personnel documenté.","Construire, tester et documenter ton projet final de portfolio."]
];

const path=document.querySelector("#path"),courses=document.querySelector("#courses");

function createLearningCard([n,t,d,p,l,c,e]){
  const card=document.createElement("article");
  card.className="path-card";
  card.tabIndex=0;
  card.setAttribute("role","button");
  card.innerHTML=`<span class="num">${n}</span><h3>${t}</h3><p>${d} — ${p}</p><span class="tag">Ouvrir l'étape →</span>`;
  card.addEventListener("click",()=>openPath(n,t,d,p,l,c,e));
  card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openPath(n,t,d,p,l,c,e)}});
  return card;
}
modules.forEach(m=>path.appendChild(createLearningCard(m)));

modules.forEach(([n,t,d,p,l,c,e])=>{
  const card=document.createElement("article");
  card.className="course-card";
  card.tabIndex=0;
  card.setAttribute("role","button");
  card.innerHTML=`<span class="num">${n}</span><h3>${t}</h3><p>${p}</p><span class="tag">Ouvrir le cours →</span>`;
  card.addEventListener("click",()=>openCourse(n,t,d,p,l,c,e));
  card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openCourse(n,t,d,p,l,c,e)}});
  courses.appendChild(card);
});

const pathModal=document.createElement("div");
pathModal.className="course-modal";
pathModal.innerHTML=`<div class="course-overlay"></div><article class="course-window" role="dialog" aria-modal="true"><button class="course-close" aria-label="Fermer">×</button><span id="pathNum" class="num"></span><h2 id="pathTitle"></h2><p id="pathSubtitle" class="course-subtitle"></p><div class="course-body"><h3>Petit résumé</h3><p id="pathText"></p><h3>Exercice / projet</h3><p id="pathExercise"></p><div class="path-actions"><button id="pathFull" class="btn">Cours entier →</button><button id="pathPrev" class="btn">← Étape précédente</button><button id="pathNext" class="btn">Étape suivante →</button></div></div></article></div>`;
document.body.appendChild(pathModal);
let currentPathIndex=0;
function openPath(n,t,d,p,l,c,e){
  currentPathIndex=modules.findIndex(m=>m[0]===n);
  renderPath();
  pathModal.classList.add("show");
  document.body.classList.add("modal-open");
}
function renderPath(){
  const [n,t,d,p,l,c,e]=modules[currentPathIndex];
  document.querySelector("#pathNum").textContent=n+" • "+l;
  document.querySelector("#pathTitle").textContent=t;
  document.querySelector("#pathSubtitle").textContent=d+" — "+p;
  document.querySelector("#pathText").textContent=c;
  document.querySelector("#pathExercise").textContent=e;
  document.querySelector("#pathPrev").disabled=currentPathIndex===0;
  document.querySelector("#pathNext").disabled=currentPathIndex===modules.length-1;
}
function closePath(){pathModal.classList.remove("show");document.body.classList.remove("modal-open")}
pathModal.querySelector(".course-close").onclick=closePath;
pathModal.querySelector(".course-overlay").onclick=closePath;
pathModal.querySelector("#pathPrev").onclick=()=>{if(currentPathIndex>0){currentPathIndex--;renderPath()}};
pathModal.querySelector("#pathNext").onclick=()=>{if(currentPathIndex<modules.length-1){currentPathIndex++;renderPath()}};
pathModal.querySelector("#pathFull").onclick=()=>{closePath();document.querySelector("#cours").scrollIntoView({behavior:"smooth"})};

const modal=document.createElement("div");
modal.className="course-modal";
modal.id="courseModal";
modal.innerHTML=`<div class="course-overlay"></div><article class="course-window" role="dialog" aria-modal="true" aria-labelledby="courseTitle"><button class="course-close" aria-label="Fermer">×</button><span id="courseNum" class="num"></span><h2 id="courseTitle"></h2><p id="courseSubtitle" class="course-subtitle"></p><div class="course-body"><h3>Le cours</h3><p id="courseText"></p><h3>À faire</h3><p id="courseExercise"></p></div></article>`;
document.body.appendChild(modal);

function openCourse(n,t,d,p,l,c,e){
  const data=window.courseData&&window.courseData[n];
  document.querySelector("#courseNum").textContent=n+" • "+l;
  document.querySelector("#courseTitle").textContent=data?.title||t;
  document.querySelector("#courseSubtitle").textContent=d+" — "+p;
  const body=document.querySelector("#courseText");
  const exercise=document.querySelector("#courseExercise");
  if(data){
    body.innerHTML="<p>"+data.intro+"</p>"+data.sections.map((section,index)=>"<section class=\"lesson-section\"><h4>"+(index+1)+". "+section[0]+"</h4><p>"+section[1]+"</p></section>").join("");
    exercise.innerHTML="<ol>"+data.exercises.map(x=>"<li>"+x+"</li>").join("")+"</ol>";
  }else{
    body.textContent=c;
    exercise.textContent=e;
  }
  modal.classList.add("show");
  document.body.classList.add("modal-open");
}
function closeCourse(){modal.classList.remove("show");document.body.classList.remove("modal-open")}
modal.querySelector(".course-close").onclick=closeCourse;
modal.querySelector(".course-overlay").onclick=closeCourse;
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeCourse()});

const qs=[
["Quel langage structure principalement une page web ?","HTML",["HTML","CSS","Python","SQL"]],
["À quoi sert Git ?","Suivre les versions d'un projet",["Créer un Wi-Fi","Suivre les versions d'un projet","Chiffrer un disque","Créer un DNS"]],
["Que signifie DNS ?","Domain Name System",["Digital Network Security","Domain Name System","Data Number System","Dynamic Node Service"]],
["Quel principe est essentiel en cybersécurité ?","N'agir que sur des systèmes autorisés",["Tester n'importe quel site","Partager ses mots de passe","N'agir que sur des systèmes autorisés","Désactiver les protections"]],
["Quel langage est particulièrement utilisé pour débuter ?","Python",["HTML","Python","CSS","DNS"]]
];
let i=0,s=0,done=false;
const q=document.querySelector("#question"),ans=document.querySelector("#answers"),next=document.querySelector("#next"),cnt=document.querySelector("#qCount"),sc=document.querySelector("#score"),res=document.querySelector("#result");
function render(){
  done=false;next.disabled=true;res.textContent="";cnt.textContent=`Question ${i+1} / ${qs.length}`;sc.textContent=`Score : ${s}`;q.textContent=qs[i][0];ans.innerHTML="";
  qs[i][2].forEach(x=>{const b=document.createElement("button");b.className="answer";b.textContent=x;b.onclick=()=>pick(b,x);ans.appendChild(b)})
}
function pick(b,x){
  if(done)return;done=true;const good=qs[i][1];
  document.querySelectorAll(".answer").forEach(a=>{a.disabled=true;if(a.textContent===good)a.classList.add("correct")});
  if(x===good){s++;res.textContent="Correct."}else{b.classList.add("wrong");res.textContent="La bonne réponse est : "+good+"."}
  sc.textContent=`Score : ${s}`;next.disabled=false
}
next.onclick=()=>{
  i++;
  if(i<qs.length)render();
  else{q.textContent="Quiz terminé";ans.innerHTML="";next.textContent="Recommencer";res.textContent=`Score final : ${s} / ${qs.length}`;next.onclick=()=>{i=0;s=0;next.textContent="Question suivante";render()}}
};
render();
document.querySelector("#menuBtn").onclick=()=>document.querySelector("#nav").classList.toggle("open");