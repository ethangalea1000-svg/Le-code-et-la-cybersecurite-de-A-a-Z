const modules=[
["01","HTML","Structure du web","Balises, structure et sémantique.","Débutant","HTML est le langage qui décrit la structure d'une page. Tu vas apprendre les balises, les titres, les paragraphes, les liens, les images, les formulaires et la sémantique.","Créer une page personnelle avec un titre, une navigation, une image et un formulaire."],
["02","CSS","Style & responsive","Mise en page, composants et mobile.","Débutant","CSS sert à présenter une page HTML. Tu vas apprendre les sélecteurs, les couleurs, les espacements, Flexbox, Grid, les cartes et les media queries.","Transformer une page HTML simple en interface responsive."],
["03","JavaScript","Logique & interaction","Variables, conditions, fonctions et DOM.","Débutant","JavaScript permet de rendre une page interactive. Tu vas découvrir les variables, conditions, boucles, fonctions, événements et la modification du DOM.","Créer une mini-calculatrice ou un quiz interactif."],
["04","Python","Programmer","Syntaxe, fonctions, listes et dictionnaires.","Débutant","Python est un langage polyvalent. Tu vas apprendre variables, conditions, boucles, fonctions, listes, dictionnaires et lecture simple de données.","Créer un petit outil de calcul ou de traitement de données."],
["05","Git & GitHub","Versionner","Commits, branches, dépôts et publication.","Débutant","Git permet de suivre les versions d'un projet. GitHub héberge les dépôts et facilite le travail collaboratif et la publication de sites.","Publier ton premier site avec GitHub Pages et conserver son historique."],
["06","SQL","Données","Tables, requêtes et relations.","Intermédiaire","SQL permet d'interroger des bases de données. Tu vas découvrir tables, colonnes, SELECT, WHERE, INSERT et les relations.","Concevoir une petite base fictive de livres ou de cours."],
["07","Réseaux","Internet","IP, DNS, HTTP, ports et client-serveur.","Intermédiaire","Les réseaux permettent aux machines de communiquer. Tu vas comprendre IP, DNS, HTTP, ports et le modèle client-serveur.","Analyser le trajet théorique d'une requête vers un site web."],
["08","Linux","Système","Terminal, fichiers, permissions et processus.","Intermédiaire","Linux est très présent dans les serveurs et la cybersécurité. Tu vas apprendre les commandes essentielles, les fichiers, permissions et processus.","Créer une petite arborescence de projet et la manipuler dans un terminal."],
["09","Cybersécurité","Défense","Menaces, vulnérabilités et défense en profondeur.","Intermédiaire","La cybersécurité vise notamment à protéger confidentialité, intégrité et disponibilité. Tu découvriras menaces, vulnérabilités, risques et mesures de défense.","Étudier un scénario fictif et proposer des protections."],
["10","Cryptographie","Secrets","Hachage, chiffrement, clés et usages.","Intermédiaire","La cryptographie protège l'information grâce à des mécanismes mathématiques. Tu vas distinguer hachage, chiffrement symétrique et asymétrique, clés et signatures.","Comparer des exemples fictifs de hachage et de chiffrement."],
["11","Sécurité web","Applications","Sessions, entrées et principes de sécurité web.","Intermédiaire","Tu vas apprendre les grands risques des applications web et les principes de validation des entrées, gestion des sessions et contrôle des accès.","Auditer une petite application volontairement fictive et corriger ses problèmes."],
["12","OSINT","Information","Évaluer des sources et informations publiques légalement.","Intermédiaire","L'OSINT consiste à exploiter des informations publiquement accessibles. Le cours insiste sur la vérification des sources, le recoupement et le respect de la vie privée.","Vérifier un dossier documentaire composé uniquement de sources fictives."],
["13","Analyse","Incidents","Observer et documenter un incident fictif.","Avancé","L'analyse d'incident consiste à comprendre ce qui s'est passé, préserver les éléments utiles et documenter les faits. Ici, tout scénario est fictif et autorisé.","Construire une chronologie d'un incident simulé et proposer des mesures correctives."],
["14","Projet final","Portfolio","Assembler tes compétences dans un projet documenté.","Avancé","Le projet final rassemble développement, documentation et bonnes pratiques de sécurité. L'objectif est de produire un projet personnel compréhensible et présentable.","Créer une application ou un site complet et rédiger sa documentation."]
];

const path=document.querySelector("#path"),courses=document.querySelector("#courses");

modules.forEach(([n,t,d,p,l,c,e])=>{
  const card=document.createElement("article");
  card.className="path-card";
  card.tabIndex=0;
  card.setAttribute("role","button");
  card.innerHTML=`<span class="num">${n}</span><h3>${t}</h3><p>${d} — ${p}</p><span class="tag">Ouvrir l'étape →</span>`;
  card.addEventListener("click",()=>openPath(n,t,d,p,l,c,e));
  card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openPath(n,t,d,p,l,c,e)}});
  path.appendChild(card);
});


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
pathModal.innerHTML=`<div class="course-overlay"></div><article class="course-window" role="dialog" aria-modal="true"><button class="course-close" aria-label="Fermer">×</button><span id="pathNum" class="num"></span><h2 id="pathTitle"></h2><p id="pathSubtitle" class="course-subtitle"></p><div class="course-body"><h3>Objectifs</h3><p id="pathText"></p><h3>Exercice / projet</h3><p id="pathExercise"></p><button id="pathToCourse" class="btn">Voir les cours associés →</button></div></article>`;
document.body.appendChild(pathModal);
function openPath(n,t,d,p,l,c,e){document.querySelector("#pathNum").textContent=n+" • "+l;document.querySelector("#pathTitle").textContent=t;document.querySelector("#pathSubtitle").textContent=d+" — "+p;document.querySelector("#pathText").textContent=c;document.querySelector("#pathExercise").textContent=e;pathModal.classList.add("show");document.body.classList.add("modal-open");}
function closePath(){pathModal.classList.remove("show");document.body.classList.remove("modal-open")}
pathModal.querySelector(".course-close").onclick=closePath;
pathModal.querySelector(".course-overlay").onclick=closePath;
pathModal.querySelector("#pathToCourse").onclick=()=>{closePath();document.querySelector("#cours").scrollIntoView({behavior:"smooth"})};
const modal=document.createElement("div");
modal.className="course-modal";
modal.id="courseModal";
modal.innerHTML=`<div class="course-overlay"></div><article class="course-window" role="dialog" aria-modal="true" aria-labelledby="courseTitle"><button class="course-close" aria-label="Fermer">×</button><span id="courseNum" class="num"></span><h2 id="courseTitle"></h2><p id="courseSubtitle" class="course-subtitle"></p><div class="course-body"><h3>Le cours</h3><p id="courseText"></p><h3>À faire</h3><p id="courseExercise"></p></div></article>`;
document.body.appendChild(modal);

function openCourse(n,t,d,p,l,c,e){
  document.querySelector("#courseNum").textContent=n+" • "+l;
  document.querySelector("#courseTitle").textContent=t;
  document.querySelector("#courseSubtitle").textContent=d+" — "+p;
  document.querySelector("#courseText").textContent=c;
  document.querySelector("#courseExercise").textContent=e;
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