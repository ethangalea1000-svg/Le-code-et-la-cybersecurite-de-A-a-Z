const courses={"01":"html","02":"css","03":"javascript","04":"python","05":"git-github","06":"sql","07":"reseaux","08":"linux","09":"cybersecurite","10":"cryptographie","11":"securite-web","12":"osint","13":"analyse-incidents","14":"projet-final"};
const q=new URLSearchParams(location.search),id=q.get("id")||"01",n=Math.max(1,Number(q.get("lesson")||1)),slug=courses[id]||"html";
function esc(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function getState(){try{return JSON.parse(localStorage.getItem("azProgressV1")||"{}")}catch(e){return {}}}
function saveState(s){localStorage.setItem("azProgressV1",JSON.stringify(s))}
function addXP(amount){const s=getState();s.xp=Number(s.xp||0)+amount;s.lessonXP=s.lessonXP||{};s.lessonXP[id+"-"+n]=Math.max(Number(s.lessonXP[id+"-"+n]||0),amount);saveState(s)}
const starters={
"01":"<h1>Mon premier titre</h1>\n<p>Mon premier paragraphe.</p>",
"02":"body {\n  font-family: system-ui;\n}\n\nh1 {\n  /* change cette couleur */\n}",
"03":'const nom = "Ethan";\nconsole.log("Bonjour " + nom);',
"04":'nom = "Ethan"\nprint("Bonjour", nom)',
"05":"git status",
"06":"SELECT * FROM utilisateurs;",
"07":"GET / HTTP/1.1\nHost: exemple.test",
"08":"pwd\nls",
"09":'mot_de_passe = "..."\n# Ne stocke jamais un vrai mot de passe ici.',
"10":'message = "Bonjour"\n# Une transformation cryptographique doit avoir une méthode clairement définie.',
"11":'<input type="email" required>',
"12":"Source : exemple.test\nDate : 2026-10-08\nIndice : information publique",
"13":"[LOG] 10:42 connexion utilisateur\n[LOG] 10:43 erreur d'authentification",
"14":"README.md\nindex.html\nprojet/\n  src/\n  tests/"
};
function splitBody(body){const parts=String(body).split(/(?<=[.!?])\s+/).filter(Boolean);if(parts.length<3)return [body,"Teste l'idée principale dans un exemple.","Explique ensuite ce que tu observes."];return [parts.slice(0,2).join(" "),parts.slice(2,4).join(" "),parts.slice(4,7).join(" ")||parts.slice(2,4).join(" ")]}
function render(data){
 window.mentorContext={type:"lesson",id:id,n:n,title:""};
 const sections=Array.isArray(data.sections)?data.sections:[], exercises=Array.isArray(data.exercises)?data.exercises:[], quizzes=Array.isArray(data.quiz)?data.quiz:[];
 const raw=sections[n-1]; if(!raw){location.href=slug+".html";return}
 const title=Array.isArray(raw)?raw[0]:"Leçon "+n, body=Array.isArray(raw)?raw[1]:"", chunks=splitBody(body);
 const quiz=quizzes[n-1]||"Question : qu'as-tu retenu de cette leçon ? — Explique la notion avec tes propres mots.";
 const qi=quiz.indexOf("—"), question=qi>=0?quiz.slice(0,qi).trim():quiz, answer=qi>=0?quiz.slice(qi+1).trim():"";
 const exercise=exercises[n-1]||"Modifie l'exemple et explique ce que tu as changé.";
 const starter=starters[id]||"// Écris ici un exemple lié à cette leçon.";
 const prev=n>1?'lecon.html?id='+id+'&lesson='+(n-1):slug+'.html', next=n<sections.length?'lecon.html?id='+id+'&lesson='+(n+1):slug+'.html';
 document.title=title+" — Le Code & la Cybersécurité";
 document.querySelector("#app").innerHTML=
 '<div class="crumb"><a href="'+slug+'.html">← '+slug.toUpperCase()+'</a> · Leçon '+n+' / '+sections.length+'</div>'+
 '<section class="hero"><div class="eyebrow">LEÇON '+String(n).padStart(2,"0")+' / '+sections.length+'</div><h1>'+esc(title)+'</h1><p>Une notion à la fois. Comprends, réponds, manipule et valide.</p><div class="step-track"><span class="active" data-step="1">1 Comprendre</span><span data-step="2">2 Question</span><span data-step="3">3 Coder</span><span data-step="4">4 Défi</span></div></section>'+
 '<div class="lesson-step active" data-panel="1"><article class="card lesson-card"><div class="step-label">ÉTAPE 1 · COMPRENDRE</div><h2>La notion essentielle</h2><p class="chunk">'+esc(chunks[0])+'</p><div class="box"><strong>À retenir</strong><p>'+esc(chunks[1])+'</p></div><button class="btn next-step" data-next="2">J’ai compris →</button></article></div>'+
 '<div class="lesson-step" data-panel="2"><article class="card lesson-card"><div class="step-label">ÉTAPE 2 · VÉRIFIER</div><h2>Question express</h2><p>'+esc(question)+'</p><div class="answer-row"><input id="answer" placeholder="Écris ta réponse..." autocomplete="off"><button class="btn" id="checkAnswer">Vérifier</button></div><div id="answerFeedback" class="feedback" aria-live="polite"></div><button class="btn next-step" id="continueQuestion" data-next="3" disabled>Continuer →</button></article></div>'+
 '<div class="lesson-step" data-panel="3"><article class="card lesson-card"><div class="step-label">ÉTAPE 3 · LABORATOIRE</div><h2>Manipule le code</h2><p>'+esc(chunks[2])+'</p><div class="code-workshop"><textarea id="lessonCode" spellcheck="false">'+esc(starter)+'</textarea><div class="workshop-actions"><button class="btn" id="runLessonCode">▶ Exécuter</button><button class="btn alt" id="resetLessonCode">Réinitialiser</button><span id="codeFeedback">Prêt.</span></div><iframe id="lessonPreview" sandbox="allow-scripts" title="Aperçu du code"></iframe></div><button class="btn next-step" data-next="4">Passer au défi →</button></article></div>'+
 '<div class="lesson-step" data-panel="4"><article class="card lesson-card"><div class="step-label">ÉTAPE 4 · MINI-DÉFI</div><h2>À toi de jouer</h2><div class="challenge-text">'+esc(exercise)+'</div><label class="check-line"><input type="checkbox" id="challengeCheck"> J’ai réalisé le défi.</label><div class="box"><strong>Mentor</strong><p>Ne cherche pas la perfection du premier coup : teste, observe, corrige.</p></div><button class="btn" id="finishLesson" disabled>✓ Valider la leçon · +20 XP</button></article></div>'+
 '<div class="pager"><a class="btn alt" href="'+prev+'">← '+(n>1?"Leçon précédente":"Sommaire")+'</a><a class="btn alt" href="'+next+'">'+(n<sections.length?"Leçon suivante →":"Terminer le cours ✓")+'</a></div>';
 initSteps(); initQuestion(answer); initCode(starter); initFinish(); if(window.Mentor) window.Mentor.init();
}
function initSteps(){
 document.querySelectorAll(".next-step").forEach(b=>b.onclick=()=>showStep(Number(b.dataset.next)));
}
function showStep(num){
 document.querySelectorAll(".lesson-step").forEach(x=>x.classList.toggle("active",Number(x.dataset.panel)===num));
 document.querySelectorAll(".step-track span").forEach(x=>x.classList.toggle("active",Number(x.dataset.step)===num));
 window.scrollTo({top:0,behavior:"smooth"});
}
function initQuestion(answer){
 const input=document.querySelector("#answer"),check=document.querySelector("#checkAnswer"),feedback=document.querySelector("#answerFeedback"),cont=document.querySelector("#continueQuestion");
 check.onclick=()=>{
   const value=input.value.trim().toLowerCase(), expected=String(answer).toLowerCase();
   const ok=expected&&value.length>1&&(expected.split(/[,.]/)[0].split(/\s+/).slice(0,3).some(w=>value.includes(w))||value.length>Math.min(12,expected.length*.55));
   if(ok){feedback.className="feedback good";feedback.textContent="✓ Bonne piste. "+(answer?"Réponse attendue : "+answer:"Tu as formulé une réponse cohérente.");cont.disabled=false;addXP(5)}
   else{feedback.className="feedback retry";feedback.textContent="Pas encore. Relis la notion et essaie de formuler l’idée principale.";input.focus()}
 };
}
function initCode(starter){
 const editor=document.querySelector("#lessonCode"),preview=document.querySelector("#lessonPreview"),run=document.querySelector("#runLessonCode"),reset=document.querySelector("#resetLessonCode"),status=document.querySelector("#codeFeedback");
 function execute(){
   const code=editor.value;
   if(id==="01"||id==="02"||id==="11"){preview.srcdoc=code;status.textContent="Aperçu mis à jour."}
   else{preview.srcdoc="<pre style='font:15px system-ui;padding:20px;white-space:pre-wrap'>"+esc(code)+"</pre>";status.textContent="Code envoyé au laboratoire."}
   addXP(5);
 }
 run.onclick=execute;reset.onclick=()=>{editor.value=starter;execute()};editor.addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();const p=editor.selectionStart;editor.value=editor.value.slice(0,p)+"  "+editor.value.slice(editor.selectionEnd);editor.selectionStart=editor.selectionEnd=p+2}});
 execute();
}
function initFinish(){
 const check=document.querySelector("#challengeCheck"),finish=document.querySelector("#finishLesson");
 check.onchange=()=>finish.disabled=!check.checked;
 finish.onclick=()=>{
   const s=getState();s.lessons=s.lessons||{};const key=id+"-"+n;
   if(!s.lessons[key]){s.lessons[key]=true;saveState(s);addXP(10)}
   finish.textContent="✓ Leçon validée · +20 XP";
   finish.disabled=true;
 };
}
function loadCourseData(){
 const script=document.createElement("script");
 script.src="../courses-"+encodeURIComponent(id)+".js?v="+Date.now();
 script.onload=()=>{
   const data=window.courseData&&window.courseData[id];
   if(data) render(data);
   else showLoadError("Le contenu de ce cours n’a pas été trouvé.");
 };
 script.onerror=()=>showLoadError("Impossible de charger le fichier du cours. Vérifie que GitHub Pages a bien publié la dernière version.");
 document.body.appendChild(script);
}
function showLoadError(message){
 document.querySelector("#app").innerHTML='<section class="card lesson-card"><div class="step-label">ERREUR DE CHARGEMENT</div><h1>Leçon indisponible</h1><p>'+esc(message)+'</p><p>Recharge la page avec Ctrl + F5 après le déploiement GitHub Pages.</p><a class="btn" href="'+slug+'.html">Retour au cours</a></section>';
}
loadCourseData();
function syncGlobalNav(){const base="/Le-code-et-la-cybersecurite-de-A-a-Z/";const links=[["Accueil","index.html"],["Parcours","parcours.html"],["Cours","cours.html"],["Projets","projets.html"],["Quiz","quiz.html"],["Progression","progression.html"],["Recherche","recherche.html"]];const h=document.querySelector("header");if(!h)return;let nav=h.querySelector("nav");if(!nav){nav=document.createElement("nav");nav.setAttribute("aria-label","Navigation principale");h.appendChild(nav)}nav.innerHTML=links.map(x=>'<a href="'+base+x[1]+'">'+x[0]+"</a>").join("");const brand=h.querySelector(".brand")||h.querySelector("a");if(brand){brand.className="brand";brand.href=base+"index.html";brand.innerHTML="<span>&lt;/&gt;</span> LE CODE <b>&amp;</b> LA CYBERSÉCURITÉ";}}
syncGlobalNav();