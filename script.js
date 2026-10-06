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
  card.innerHTML=`<span class="num">${n}</span><h3>${t}</h3><p>${p}</p><a class="tag course-link" href="cours/${{"01":"html","02":"css","03":"javascript","04":"python","05":"git-github","06":"sql","07":"reseaux","08":"linux","09":"cybersecurite","10":"cryptographie","11":"securite-web","12":"osint","13":"analyse-incidents","14":"projet-final"}[n]}.html">Ouvrir la page du cours →</a>`;
  card.addEventListener("click",()=>{location.href="cours/"+({"01":"html","02":"css","03":"javascript","04":"python","05":"git-github","06":"sql","07":"reseaux","08":"linux","09":"cybersecurite","10":"cryptographie","11":"securite-web","12":"osint","13":"analyse-incidents","14":"projet-final"}[n])+".html"});
  card.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();location.href="cours/"+({"01":"html","02":"css","03":"javascript","04":"python","05":"git-github","06":"sql","07":"reseaux","08":"linux","09":"cybersecurite","10":"cryptographie","11":"securite-web","12":"osint","13":"analyse-incidents","14":"projet-final"}[n])+".html"}});
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
pathModal.querySelector("#pathFull").onclick=()=>{location.href="cours/"+({"01":"html","02":"css","03":"javascript","04":"python","05":"git-github","06":"sql","07":"reseaux","08":"linux","09":"cybersecurite","10":"cryptographie","11":"securite-web","12":"osint","13":"analyse-incidents","14":"projet-final"}[modules[currentPathIndex][0]])+".html"};

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


// ===== LABORATOIRE : 50 PROJETS ORIGINAUX INTÉGRÉS =====
const projectIdeas=[["01","Page personnelle","HTML","Créer une page personnelle sémantique avec navigation, sections, liste et formulaire."],["02","Carte de profil","HTML + CSS","Construire une carte de profil responsive avec avatar, compétences et boutons."],["03","Landing page","HTML + CSS","Créer une page d’accueil professionnelle avec hero, statistiques et appel à l’action."],["04","Portfolio","HTML + CSS","Construire un portfolio complet avec projets, compétences et contact."],["05","CV web","HTML + CSS","Transformer un CV en page web accessible et responsive."],["06","Galerie responsive","CSS Grid","Créer une galerie qui s’adapte aux écrans mobiles et desktop."],["07","Dashboard","CSS Grid","Créer un tableau de bord avec cartes statistiques, menu et activité récente."],["08","Page sombre","CSS","Créer une interface moderne avec variables CSS et états de boutons."],["09","Formulaire accessible","HTML + CSS","Construire un formulaire avec labels, aide, validation et focus."],["10","Mini design system","CSS","Créer des boutons, cartes, badges et alertes réutilisables."],["11","Compteur","JavaScript","Créer un compteur avec +1, -1 et remise à zéro."],["12","To-do list","JavaScript","Ajouter, terminer et supprimer des tâches."],["13","Quiz","JavaScript","Créer un quiz avec réponses, score et question suivante."],["14","Chronomètre","JavaScript","Construire un chronomètre avec démarrage, pause et remise à zéro."],["15","Calculatrice","JavaScript","Créer une calculatrice sans exécuter directement une chaîne utilisateur."],["16","Convertisseur","JavaScript","Convertir température, distance et durée."],["17","Recherche locale","JavaScript","Filtrer une collection de cartes en temps réel."],["18","Notes locales","JavaScript","Créer un bloc-notes sauvegardé dans localStorage."],["19","Générateur de mot de passe","JavaScript","Créer un générateur pédagogique avec longueur et options."],["20","Analyseur de texte","JavaScript","Compter mots, caractères, lignes et fréquences."],["21","Gestionnaire de contacts","JavaScript","Créer et rechercher des contacts fictifs côté navigateur."],["22","Tableau de dépenses","JavaScript","Ajouter des dépenses fictives et calculer le total."],["23","Kanban","JavaScript","Créer les colonnes À faire, En cours et Terminé."],["24","Lecteur JSON","JavaScript","Afficher un jeu de données local sous forme de cartes."],["25","Mini moteur de recherche","JavaScript","Indexer des fiches locales et classer les résultats."],["26","Script Python calcul","Python","Créer un programme avec fonctions, validation et menu texte."],["27","Carnet Python","Python","Gérer des entrées fictives dans une liste de dictionnaires."],["28","Analyseur CSV","Python","Lire un CSV local et produire des statistiques."],["29","Gestionnaire JSON","Python","Créer, lire, modifier et valider du JSON."],["30","Tests unitaires","Python","Écrire des fonctions puis vérifier leur comportement."],["31","API locale simulée","Python","Construire une petite API pédagogique avec données fictives."],["32","Détecteur de doublons","Python","Repérer les doublons dans des données fictives."],["33","Analyse de logs","Python","Lire des journaux fictifs et compter les événements."],["34","Inventaire","Python + JSON","Créer un inventaire local avec recherche et modifications."],["35","Rapport automatique","Python","Transformer des données fictives en rapport structuré."],["36","Base de livres","SQL","Créer une base de livres, auteurs et catégories."],["37","Base de tâches","SQL","Modéliser utilisateurs fictifs, tâches et états."],["38","Requêtes statistiques","SQL","Utiliser COUNT, AVG, GROUP BY et ORDER BY."],["39","JOIN pédagogique","SQL","Relier plusieurs tables avec des clés étrangères."],["40","Journal d’événements","SQL","Concevoir une table de logs et rechercher des événements."],["41","Lab réseau","Réseaux","Modéliser navigateur, DNS et serveur dans un schéma pédagogique."],["42","Diagnostic réseau","Réseaux","Créer une fiche de diagnostic IP, DNS, passerelle, ports et HTTP."],["43","Mini terminal","Linux","Simuler un terminal pédagogique avec commandes autorisées."],["44","Permissions","Linux","Comprendre propriétaires, groupes et permissions avec exemples fictifs."],["45","Défense en profondeur","Cybersécurité","Analyser une application fictive et proposer plusieurs couches de défense."],["46","Analyse de logs sécurité","Cybersécurité","Classer des événements fictifs en information, alerte et incident."],["47","Hash pédagogique","Cryptographie","Comprendre le rôle du hachage et celui du chiffrement."],["48","Audit web fictif","Sécurité web","Repérer des mauvaises pratiques dans une application fictive."],["49","Rapport d’incident","Analyse","Construire chronologie, hypothèses et mesures correctives."],["50","CyberLab final","Projet complet","Assembler web, données locales, journalisation et documentation."]];
function starterCode(project){
  const title=project[1], stack=project[2];
  if(stack.indexOf("Python")>=0) return "# "+title+"\n# Projet pédagogique — données fictives\n\ndef main():\n    print(\"Projet : "+title+"\")\n    # Ajoute ton code ici\n\nif __name__ == \"__main__\":\n    main()";
  if(stack.indexOf("SQL")>=0) return "-- "+title+"\nCREATE TABLE exemple (id INTEGER PRIMARY KEY, nom TEXT NOT NULL);\nSELECT * FROM exemple;";
  if(stack.indexOf("Linux")>=0) return "# "+title+"\npwd\nls\nmkdir laboratoire\ncd laboratoire";
  if(stack.indexOf("Réseaux")>=0) return "// "+title+"\nconst etapes=[\"Navigateur\",\"DNS\",\"Serveur\"];\nconsole.log(etapes.join(\" -> \"));";
  return "<!doctype html>\n<html lang=\"fr\">\n<head><meta charset=\"utf-8\"><title>"+title+"</title><style>body{font-family:system-ui;padding:24px}button{padding:10px 14px}</style></head>\n<body><h1>"+title+"</h1><p>Projet pédagogique intégré.</p><button id=\"action\">Tester</button><script>document.querySelector(\"#action\").onclick=()=>alert(\"Le projet fonctionne !\");<\\/script></body></html>";
}
const projectGrid=document.querySelector("#projectGrid");
if(projectGrid){ projectIdeas.forEach(function(project){
  const card=document.createElement("article"); card.className="project-card-integrated";
  card.innerHTML="<span class=\"num\">"+project[0]+"</span><h3>"+project[1]+"</h3><span class=\"tag\">"+project[2]+"</span><p>"+project[3]+"</p><button class=\"project-open btn\" data-project=\""+project[0]+"\">Ouvrir le projet →</button>";
  projectGrid.appendChild(card);
}); }
const projectModal=document.createElement("div");
projectModal.className="course-modal";
projectModal.innerHTML="<div class=\"course-overlay\"></div><article class=\"course-window project-window\" role=\"dialog\" aria-modal=\"true\"><button class=\"course-close\" aria-label=\"Fermer\">×</button><span id=\"projectNum\" class=\"num\"></span><h2 id=\"projectTitle\"></h2><p id=\"projectStack\" class=\"course-subtitle\"></p><div class=\"course-body\"><h3>Objectif</h3><p id=\"projectDescription\"></p><h3>Code de départ</h3><pre id=\"projectCode\" class=\"project-code\"></pre><p class=\"muted\">Code original créé pour ce site : tu peux le modifier et le tester dans l’atelier.</p></div></article></div>";
document.body.appendChild(projectModal);
function openProject(id){
  const p=projectIdeas.find(function(x){return x[0]===id;}); if(!p)return;
  document.querySelector("#projectNum").textContent=p[0]; document.querySelector("#projectTitle").textContent=p[1];
  document.querySelector("#projectStack").textContent=p[2]; document.querySelector("#projectDescription").textContent=p[3];
  document.querySelector("#projectCode").textContent=starterCode(p); projectModal.classList.add("show"); document.body.classList.add("modal-open");
}
document.addEventListener("click",function(event){const button=event.target.closest(".project-open"); if(button)openProject(button.dataset.project);});
projectModal.querySelector(".course-close").onclick=function(){projectModal.classList.remove("show");document.body.classList.remove("modal-open")};
projectModal.querySelector(".course-overlay").onclick=function(){projectModal.classList.remove("show");document.body.classList.remove("modal-open")};
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