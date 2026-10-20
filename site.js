(function(){
const COURSES=[
["01","HTML","Structure du web","cours/html.html"],["02","CSS","Style & responsive","cours/css.html"],["03","JavaScript","Logique & interaction","cours/javascript.html"],["04","Python","Programmer","cours/python.html"],["05","Git & GitHub","Versionner","cours/git-github.html"],["06","SQL","Données","cours/sql.html"],["07","Réseaux","Internet","cours/reseaux.html"],["08","Linux","Système","cours/linux.html"],["09","Cybersécurité","Défense","cours/cybersecurite.html"],["10","Cryptographie","Secrets","cours/cryptographie.html"],["11","Sécurité web","Applications","cours/securite-web.html"],["12","OSINT","Information","cours/osint.html"],["13","Analyse d'incidents","Incidents","cours/analyse-incidents.html"],["14","Projet final","Portfolio","cours/projet-final.html"]
];
const PROJECTS=[...document.querySelectorAll(".project-card-integrated")].map((el,i)=>({id:String(i+1).padStart(2,"0"),name:el.querySelector("p")?.textContent||"Projet "+(i+1),href:el.querySelector("a")?.getAttribute("href")||"projets.html"}));
const AZ=window.AZ=window.AZ||{};
AZ.getProgress=function(){const empty={courses:{},projects:{},favorites:[],xp:0,badges:[],courseLessons:{}};try{const raw=JSON.parse(localStorage.getItem("azProgressV1"));if(!raw||typeof raw!=="object"||Array.isArray(raw))return empty;return{...raw,courses:raw.courses&&typeof raw.courses==="object"&&!Array.isArray(raw.courses)?raw.courses:{},projects:raw.projects&&typeof raw.projects==="object"&&!Array.isArray(raw.projects)?raw.projects:{},favorites:Array.isArray(raw.favorites)?raw.favorites.filter(x=>typeof x==="string").slice(0,100):[],xp:Number.isFinite(Number(raw.xp))?Math.max(0,Math.min(10000000,Number(raw.xp))):0,badges:Array.isArray(raw.badges)?raw.badges.filter(x=>typeof x==="string").slice(0,100):[],courseLessons:raw.courseLessons&&typeof raw.courseLessons==="object"&&!Array.isArray(raw.courseLessons)?raw.courseLessons:{}}}catch(e){return empty}};
AZ.saveProgress=function(s){try{localStorage.setItem("azProgressV1",JSON.stringify(s));return true}catch(e){return false}};
AZ.exportProgress=function(){try{const data=JSON.stringify(AZ.getProgress(),null,2),blob=new Blob([data],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="code-cybersecurite-progression.json";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000)}catch(e){alert("L’export a échoué. Vérifie les autorisations de téléchargement du navigateur.")}};
AZ.importProgress=function(file,callback){function done(ok){if(typeof callback==="function")callback(ok)}if(!file||typeof file.text!=="function"){done(false);return}file.text().then(function(raw){let parsed;try{parsed=JSON.parse(raw)}catch(e){done(false);return}if(!parsed||typeof parsed!=="object"||Array.isArray(parsed)){done(false);return}const clean={courses:{},projects:{},favorites:[],xp:0,badges:[],courseLessons:{}};["courses","projects"].forEach(function(group){const source=parsed[group];if(source&&typeof source==="object"&&!Array.isArray(source))Object.entries(source).slice(0,200).forEach(function(pair){const key=pair[0],value=Number(pair[1]);if(/^[a-zA-Z0-9_-]{1,80}$/.test(key)&&Number.isFinite(value))clean[group][key]=Math.max(0,Math.min(100,Math.round(value)))})});clean.favorites=Array.isArray(parsed.favorites)?parsed.favorites.filter(x=>typeof x==="string").map(x=>x.slice(0,120)).slice(0,100):[];clean.badges=Array.isArray(parsed.badges)?parsed.badges.filter(x=>typeof x==="string"&&/^[a-zA-Z0-9_-]{1,100}$/.test(x)).slice(0,100):[];clean.xp=Math.max(0,Math.min(10000000,Math.round(Number(parsed.xp)||0)));if(parsed.courseLessons&&typeof parsed.courseLessons==="object"&&!Array.isArray(parsed.courseLessons))Object.entries(parsed.courseLessons).slice(0,300).forEach(function(pair){if(/^[0-9]{2}-[0-9]{1,3}$/.test(pair[0])&&pair[1]===true)clean.courseLessons[pair[0]]=true});const ok=AZ.saveProgress(clean);done(ok)}).catch(function(){done(false)})};
AZ.favorite=function(key){const s=AZ.getProgress();s.favorites=s.favorites||[];const i=s.favorites.indexOf(key);i>=0?s.favorites.splice(i,1):s.favorites.push(key);AZ.saveProgress(s);return i<0;};
AZ.courseProgress=function(id,pct){const s=AZ.getProgress();s.courses=s.courses||{};s.badges=s.badges||[];const value=Math.max(0,Math.min(100,Math.round(Number(pct)||0)));s.courses[id]=Math.max(s.courses[id]||0,value);if(s.courses[id]>=100&&!s.badges.includes("course-"+id))s.badges.push("course-"+id);s.xp=Math.max(s.xp||0,Object.values(s.courses).reduce((a,b)=>a+b,0)*2);AZ.saveProgress(s);};
AZ.renderProgression=function(){
 const s=AZ.getProgress(),dash=document.querySelector("#dashboard"),coursesRoot=document.querySelector("#coursesProgress");if(!dash||!coursesRoot)return;
 let quiz={answered:0,correct:0,streak:0,best:0,byDomain:{}};
 try{const raw=JSON.parse(localStorage.getItem("quizAZProgressV3")||"null");if(raw&&typeof raw==="object"){quiz.answered=Math.max(0,Number(raw.answered)||0);quiz.correct=Math.max(0,Math.min(quiz.answered,Number(raw.correct)||0));quiz.streak=Math.max(0,Number(raw.streak)||0);quiz.best=Math.max(0,Number(raw.best)||0);quiz.byDomain=raw.byDomain&&typeof raw.byDomain==="object"&&!Array.isArray(raw.byDomain)?raw.byDomain:{}}}catch(e){}
 const values=COURSES.map(c=>Math.max(0,Math.min(100,Number(s.courses[c[0]])||0))),completed=values.filter(p=>p>=100).length,started=values.filter(p=>p>0&&p<100).length,average=Math.round(values.reduce((a,b)=>a+b,0)/COURSES.length),lessons=s.courseLessons&&typeof s.courseLessons==="object"?Object.values(s.courseLessons).filter(v=>v===true).length:0,accuracy=quiz.answered?Math.round(quiz.correct/quiz.answered*100):0;
 let exerciseCount=0;try{const ex=JSON.parse(localStorage.getItem("azExercisesV1")||"{}");exerciseCount=Object.values(ex).filter(v=>v&&v.passed===true).length}catch(e){};let guidedCount=0;try{const g=JSON.parse(localStorage.getItem("azGuidedChallengesV1")||"{}");if(g&&g.passed&&typeof g.passed==="object"&&!Array.isArray(g.passed))guidedCount=Object.values(g.passed).filter(v=>v===true).length}catch(e){}; const cards=[["COURS TERMINÉS",completed+" / "+COURSES.length,"cours terminés"],["PROGRESSION MOYENNE",average+" %","moyenne des cours"],["QUIZ",quiz.answered+"","questions répondues · "+accuracy+" % de réussite"],["EXERCICES VALIDÉS",exerciseCount+"","défis réussis · page Exercices"],["CHALLENGES GUIDÉS",guidedCount+" / 6","missions de cybersécurité validées"],["SÉRIE ACTUELLE",quiz.streak+"","meilleure série : "+quiz.best],["LEÇONS VALIDÉES",lessons+"","leçons marquées comme terminées"],["XP ENREGISTRÉS",String(Number(s.xp)||0),"points stockés sur cet appareil"]];
 dash.replaceChildren();const grid=document.createElement("div");grid.className="cards progress-stats-grid";
 cards.forEach(function(item){const card=document.createElement("article"),tag=document.createElement("span"),value=document.createElement("h3"),desc=document.createElement("p");tag.className="tag";tag.textContent=item[0];value.textContent=item[1];desc.textContent=item[2];card.append(tag,value,desc);grid.appendChild(card)});
 const overview=document.createElement("article");overview.className="progress-overview";const title=document.createElement("h2"),intro=document.createElement("p"),track=document.createElement("div"),fill=document.createElement("span"),summary=document.createElement("p");title.textContent="Vue d’ensemble";intro.className="muted";intro.textContent=completed===COURSES.length?"Tous les cours sont terminés. Tu peux consolider tes acquis avec les quiz et les projets.":started?"Tu as commencé "+started+" cours. Continue l’un d’eux ou démarre le suivant.":"Ta progression apparaîtra après tes premières leçons.";track.className="progress-overview-track";track.setAttribute("role","progressbar");track.setAttribute("aria-label","Progression moyenne des cours");track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax","100");track.setAttribute("aria-valuenow",String(average));track.setAttribute("aria-valuetext",average+" % de progression moyenne");fill.style.width=average+"%";track.appendChild(fill);summary.className="progress-overview-label";summary.textContent=average+" % en moyenne · "+completed+" cours terminés · "+started+" cours en cours";overview.append(title,intro,track,summary);grid.appendChild(overview);dash.appendChild(grid);
 const domainSection=document.createElement("section");domainSection.className="domain-stats";const domainTitle=document.createElement("h2");domainTitle.textContent="Résultats par matière";domainSection.appendChild(domainTitle);const domains=Object.entries(quiz.byDomain).filter(e=>e[1]&&typeof e[1]==="object"&&Number(e[1].a)>0).sort((a,b)=>(Number(a[1].c)||0)/Number(a[1].a)-(Number(b[1].c)||0)/Number(b[1].a));
 if(!domains.length){const empty=document.createElement("p");empty.className="muted";empty.textContent="Pas encore de résultats par matière. Réponds à quelques questions dans le quiz pour les afficher ici.";domainSection.appendChild(empty)}
 else{const list=document.createElement("div");list.className="domain-stats-list";domains.forEach(function(e){const name=e[0],d=e[1],attempts=Math.max(0,Number(d.a)||0),correct=Math.max(0,Math.min(attempts,Number(d.c)||0)),pct=attempts?Math.round(correct/attempts*100):0,row=document.createElement("article"),head=document.createElement("div"),label=document.createElement("strong"),score=document.createElement("span"),bar=document.createElement("div"),barFill=document.createElement("span"),caption=document.createElement("p");row.className="domain-stat";head.className="domain-stat-head";label.textContent=name;score.textContent=pct+" %";bar.className="domain-stat-track";bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Réussite en "+name);bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(pct));bar.setAttribute("aria-valuetext",pct+" % de bonnes réponses");barFill.style.width=pct+"%";bar.appendChild(barFill);caption.className="muted";caption.textContent=correct+" bonne"+(correct>1?"s":"")+" réponse"+(correct>1?"s":"")+" sur "+attempts;head.append(label,score);row.append(head,bar,caption);list.appendChild(row)});domainSection.appendChild(list)}dash.appendChild(domainSection);
 coursesRoot.replaceChildren();COURSES.forEach(function(c,i){const p=values[i],article=document.createElement("article"),tag=document.createElement("span"),title=document.createElement("h3"),desc=document.createElement("p"),bar=document.createElement("div"),fill=document.createElement("span"),pct=document.createElement("p"),link=document.createElement("a");tag.className="num";tag.textContent=c[0];title.textContent=c[1];desc.textContent=c[2];bar.className="progress-mini";bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Progression du cours "+c[1]);bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(p));bar.setAttribute("aria-valuetext",p+" % terminé");fill.style.width=p+"%";bar.appendChild(fill);pct.className="progress-course-percent";pct.textContent=p+" % terminé";link.className="btn";link.href=c[3];link.textContent=p>=100?"Revoir le cours →":p>0?"Continuer →":"Commencer →";article.append(tag,title,desc,bar,pct,link);coursesRoot.appendChild(article)});
 const fav=(s.favorites||[]).filter(k=>typeof k==="string").slice(0,100),favRoot=document.querySelector("#favorites");if(!favRoot)return;favRoot.replaceChildren();if(!fav.length){const empty=document.createElement("p");empty.className="muted";empty.textContent="Aucun favori pour le moment.";favRoot.appendChild(empty)}else fav.forEach(function(k){const article=document.createElement("article"),title=document.createElement("h3"),button=document.createElement("button");title.textContent=k;button.className="btn ghost";button.type="button";button.textContent="Retirer "+k+" des favoris";button.addEventListener("click",function(){AZ.favorite(k);AZ.renderProgression()});article.append(title,button);favRoot.appendChild(article)});
};
AZ.initSearch=function(){
 const box=document.querySelector("#searchBox"),out=document.querySelector("#searchResults"),filter=document.querySelector("#searchType"),status=document.querySelector("#searchStatus");
 if(!box||!out)return;
 try{const params=new URLSearchParams(location.search);const initial=params.get("q");if(initial!==null)box.value=initial.slice(0,200)}catch(e){}
 const items=COURSES.map(c=>({name:c[1],type:"Cours",text:c[2],href:c[3]}));
 out.setAttribute("aria-live","polite");
 function render(){
  const q=(box.value||"").trim().toLocaleLowerCase("fr"),kind=filter?filter.value:"all";
  const results=items.filter(x=>(kind==="all"||kind===x.type)&&(!q||(x.name+" "+x.text).toLocaleLowerCase("fr").includes(q)));
  out.replaceChildren();
  if(!results.length){const empty=document.createElement("p");empty.className="muted";empty.textContent="Aucun résultat pour cette recherche.";out.appendChild(empty)}
  results.slice(0,100).forEach(function(x){const card=document.createElement("article"),tag=document.createElement("span"),title=document.createElement("h3"),desc=document.createElement("p"),link=document.createElement("a");tag.className="tag";tag.textContent=x.type;title.textContent=x.name;desc.textContent=x.text;link.className="btn";link.href=x.href;link.textContent="Ouvrir →";card.append(tag,title,desc,link);out.appendChild(card)});
  if(status)status.textContent=results.length+" résultat"+(results.length>1?"s":"")+" affiché"+(results.length>1?"s":"")+".";
 }
 box.addEventListener("input",render);if(filter)filter.addEventListener("change",render);render();
 fetch(new URL("projets.html",location.href)).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.text()}).then(function(markup){const doc=new DOMParser().parseFromString(markup,"text/html");doc.querySelectorAll(".project-card-integrated").forEach(function(card){const name=card.querySelector("h3")?.textContent?.trim();if(!name)return;items.push({name:name,type:"Projets",text:card.querySelector("p")?.textContent?.trim()||"Projet pratique",href:card.querySelector("a")?.getAttribute("href")||"projets.html"})});render()}).catch(function(){if(status)status.textContent="Recherche des cours disponible ; les projets n’ont pas pu être chargés."});
};
window.AZ=AZ;
})();
function syncGlobalNav(){
 const main=document.querySelector("main");
 if(main&&!main.id)main.id="mainContent";
 if(!document.querySelector(".skip-link")&&main){const skip=document.createElement("a");skip.className="skip-link";skip.href="#"+main.id;skip.textContent="Aller directement au contenu";document.body.insertBefore(skip,main)}
 const base="/Le-code-et-la-cybersecurite-de-A-a-Z/";
 const primary=[["Accueil","index.html"],["Parcours","parcours.html"],["Cours","cours.html"],["Projets","projets.html"],["Quiz","quiz.html"],["Progression","progression.html"]];
 const more=[["Exercices","exercices.html"],["Challenges","exercices.html#guidedChallengeLab"],["Atelier de code","atelier.html"],["Python & SQL","laboratoire-python-sql.html"],["Recherche","recherche.html"],["Examens","examens.html"],["Certificats","certificats.html"],["Bibliothèque","bibliotheque.html"],["Ressources","ressources.html"],["Donner un avis","retour.html"]];
 const h=document.querySelector("header");if(!h)return;
 let n=h.querySelector("nav");if(!n){n=document.createElement("nav");h.appendChild(n)}
 n.id="nav";n.setAttribute("aria-label","Navigation principale");
 n.innerHTML=primary.map(x=>'<a href="'+base+x[1]+'">'+x[0]+'</a>').join("")+
 '<details class="nav-more"><summary>Plus <span aria-hidden="true">⌄</span></summary><div class="nav-more-menu">'+more.map(x=>'<a href="'+base+x[1]+'">'+x[0]+'</a>').join("")+'</div></details>';
 const current=location.pathname.split("/").pop()||"index.html";
 n.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===base+current||a.getAttribute("href")===base+current+location.hash)a.setAttribute("aria-current","page")});
 const b=h.querySelector(".brand")||h.querySelector("a");if(b){b.className="brand";b.href=base+"index.html";b.innerHTML="<span>&lt;/&gt;</span> LE CODE <b>&amp;</b> LA CYBERSÉCURITÉ"}
 let menu=h.querySelector("#menuBtn");if(!menu){menu=document.createElement("button");menu.id="menuBtn";menu.type="button";menu.textContent="☰";h.appendChild(menu)}
 menu.setAttribute("aria-label","Afficher ou masquer le menu");menu.setAttribute("aria-expanded","false");
 menu.onclick=function(){const open=n.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Fermer le menu":"Afficher ou masquer le menu")};
 n.addEventListener("click",function(e){if(e.target.closest("a")&&window.matchMedia("(max-width: 900px)").matches){n.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
}
syncGlobalNav();

/* Reprise personnalisée : une prochaine étape claire, sans pression ni compte à rebours. */
(function(){
 if(!document.querySelector(".hero")||!document.querySelector("#mainContent")||document.querySelector(".quick-start-card"))return;
 const courses=[["01","HTML","cours/html.html"],["02","CSS","cours/css.html"],["03","JavaScript","cours/javascript.html"],["04","Python","cours/python.html"],["05","Git & GitHub","cours/git-github.html"],["06","SQL","cours/sql.html"],["07","Réseaux","cours/reseaux.html"],["08","Linux","cours/linux.html"],["09","Cybersécurité","cours/cybersecurite.html"],["10","Cryptographie","cours/cryptographie.html"],["11","Sécurité web","cours/securite-web.html"],["12","OSINT","cours/osint.html"],["13","Analyse d'incidents","cours/analyse-incidents.html"],["14","Projet final","cours/projet-final.html"]];
 let saved={courses:{}};try{const v=JSON.parse(localStorage.getItem("azProgressV1")||"{}");if(v&&typeof v==="object")saved=v}catch(e){}
 const vals=courses.map(c=>Math.max(0,Math.min(100,Number(saved.courses&&saved.courses[c[0]])||0)));
 let idx=vals.findIndex(v=>v>0&&v<100);if(idx<0)idx=vals.findIndex(v=>v<100);
 const done=idx<0,course=courses[Math.max(0,idx)],pct=done?100:vals[Math.max(0,idx)];
 const section=document.createElement("section");section.className="progress-starter";section.setAttribute("aria-label","Prochaine étape conseillée");
 const card=document.createElement("div");card.className="quick-start-card";const copy=document.createElement("div"),k=document.createElement("div"),h=document.createElement("h2"),p=document.createElement("p"),bar=document.createElement("div"),fill=document.createElement("span"),a=document.createElement("a");
 k.className="quick-kicker";k.textContent=done?"PARCOURS ACCOMPLI":"TA PROCHAINE ÉTAPE";
 h.textContent=done?"Tu as terminé le parcours de base.":pct>0?"Reprends "+course[1]+".":"Commence par "+course[1]+".";
 p.textContent=done?"Passe aux quiz et aux projets pour consolider tes acquis.":pct>0?"Tu as déjà commencé : continue là où tu en es, à ton rythme.":"Une petite séance suffit pour lancer ta progression. Tu pourras reprendre plus tard.";
 bar.className="quick-meter";bar.setAttribute("role","progressbar");bar.setAttribute("aria-label","Progression du cours "+course[1]);bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow",String(pct));bar.setAttribute("aria-valuetext",pct+" % terminé");fill.style.width=pct+"%";bar.appendChild(fill);
 a.className="btn";a.href=done?"quiz.html":course[2];a.textContent=done?"Faire un quiz →":pct>0?"Continuer le cours →":"Commencer le cours →";
 copy.append(k,h,p);if(!done)copy.appendChild(bar);card.append(copy,a);section.appendChild(card);
 const hero=document.querySelector(".hero");hero.parentNode.insertBefore(section,hero.nextSibling);
})();

/* Accueil : montrer d'abord les destinations essentielles, puis les outils facultatifs. */
(function(){
 const home=document.body.classList.contains("home-page");
 if(!home)return;
 const grid=document.querySelector(".home-page .section .cards");
 if(!grid||grid.dataset.simplified==="true")return;
 const cards=Array.from(grid.children);
 if(cards.length<=4)return;
 const extra=document.createElement("details");
 extra.className="extra-tools-disclosure";
 const summary=document.createElement("summary");
 summary.textContent="Autres outils et ressources ("+(cards.length-4)+")";
 const extras=document.createElement("div");
 extras.className="cards";
 cards.slice(4).forEach(card=>extras.appendChild(card));
 extra.append(summary,extras);
 grid.dataset.simplified="true";
 grid.after(extra);
})();

/* PWA : installation facultative et cache hors ligne limité à ce site. */
(function(){
  const base = "/Le-code-et-la-cybersecurite-de-A-a-Z/";
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest = document.createElement("link");
    manifest.rel = "manifest";
    manifest.href = base + "manifest.webmanifest";
    document.head.appendChild(manifest);
  }
  if (!document.querySelector('meta[name="theme-color"]')) {
    const theme = document.createElement("meta");
    theme.name = "theme-color";
    theme.content = "#101923";
    document.head.appendChild(theme);
  }
  if ("serviceWorker" in navigator && location.protocol === "https:" && location.pathname.startsWith(base)) {
    window.addEventListener("load", function(){
      navigator.serviceWorker.register(base + "sw.js", {scope: base}).catch(function(error){
        console.warn("Le mode hors ligne n’a pas pu être activé.", error);
      });
    }, {once:true});
  }
})();


/* Mode Focus : chargé uniquement sur la page des projets. */
(function(){
  if (!document.querySelector(".project-directory")) return;
  const script = document.createElement("script");
  script.src = "/Le-code-et-la-cybersecurite-de-A-a-Z/learning-focus.js";
  script.defer = true;
  document.head.appendChild(script);
})();

/* Challenges guidés : chargés uniquement sur la page des exercices. */
(function(){
  if (!document.querySelector('#exerciseChoices')) return;
  const script = document.createElement('script');
  script.src = '/Le-code-et-la-cybersecurite-de-A-a-Z/guided-challenges.js';
  script.defer = true;
  document.head.appendChild(script);
})();


/* UX globale : thème système + choix mémorisé, progression de lecture et contrôles clavier. */
(function(){
  "use strict";
  const KEY="azThemePreference";
  let preference="system";
  try {
    const saved=localStorage.getItem(KEY);
    if(saved==="light"||saved==="dark"||saved==="system") preference=saved;
  } catch (_) {}
  const media=window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function applyTheme(){
    const resolved=preference==="system"?(media&&media.matches?"dark":"light"):preference;
    document.documentElement.dataset.theme=resolved;
    document.documentElement.style.colorScheme=resolved;
    const button=document.getElementById("azThemeToggle");
    if(button){
      button.setAttribute("aria-pressed",String(preference!=="system"));
      button.setAttribute("aria-label",preference==="system"?"Thème automatique (cliquer pour changer)":resolved==="dark"?"Passer au thème clair":"Passer au thème sombre");
      button.title=preference==="system"?"Thème automatique":resolved==="dark"?"Thème sombre":"Thème clair";
      button.textContent=resolved==="dark"?"☀ Mode clair":"☾ Mode sombre";
    }
  }
  function toggleTheme(){
    const current=document.documentElement.dataset.theme || (media&&media.matches?"dark":"light");
    preference=current==="dark"?"light":"dark";
    try{localStorage.setItem(KEY,preference)}catch(_){}
    applyTheme();
  }
  function setup(){
    applyTheme();
    if(media){
      const changed=()=>{if(preference==="system")applyTheme()};
      if(media.addEventListener)media.addEventListener("change",changed);
      else if(media.addListener)media.addListener(changed);
    }
    if(!document.getElementById("azThemeToggle")){
      const header=document.querySelector("body > header");
      if(header){
        const button=document.createElement("button");
        button.id="azThemeToggle";button.type="button";button.className="az-theme-toggle";
        button.addEventListener("click",toggleTheme);
        header.appendChild(button);applyTheme();
      }
    }
    if(!document.getElementById("azReadingProgress")){
      const bar=document.createElement("div");bar.id="azReadingProgress";bar.setAttribute("role","progressbar");
      bar.setAttribute("aria-label","Progression de lecture");bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");bar.setAttribute("aria-valuenow","0");
      document.body.prepend(bar);
      let scheduled=false;
      function update(){
        scheduled=false;
        const root=document.documentElement,range=root.scrollHeight-window.innerHeight;
        const value=range>0?Math.round(Math.max(0,Math.min(1,window.scrollY/range))*100):0;
        bar.style.setProperty("--reading-progress",value+"%");
        bar.setAttribute("aria-valuenow",String(value));
      }
      window.addEventListener("scroll",()=>{if(!scheduled){scheduled=true;window.requestAnimationFrame(update)}},{passive:true});
      window.addEventListener("resize",update,{passive:true});update();
    }
    /* Chargement différé sans retarder les images visibles dès l'arrivée. */
    document.querySelectorAll("img:not([loading])").forEach(img=>{
      const rect=img.getBoundingClientRect();
      const initiallyVisible=rect.top < window.innerHeight && rect.bottom > 0;
      if(!img.hasAttribute("fetchpriority"))img.loading=initiallyVisible?"eager":"lazy";
      if(!img.hasAttribute("decoding"))img.decoding="async";
    });
    /* Nettoyage prudent : seules les clés de cache explicitement temporaires sont supprimées. */
    try{
      for(let i=localStorage.length-1;i>=0;i--){
        const key=localStorage.key(i);
        if(key&&/^azTempCache:/i.test(key)){
          const item=localStorage.getItem(key);
          try{const record=JSON.parse(item);if(record&&record.expiresAt&&record.expiresAt<Date.now())localStorage.removeItem(key)}catch(_){}
        }
      }
    }catch(_){}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();


/* Préchargement léger des pages internes au survol ou au focus clavier. */
(function(){
  "use strict";
  const base="/Le-code-et-la-cybersecurite-de-A-a-Z/";
  const prefetched=new Set();
  const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  if(connection&&connection.saveData)return;
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-data: reduce)").matches)return;
  function prefetchFrom(event){
    const link=event.target&&event.target.closest?event.target.closest("a[href]"):null;
    if(!link||link.hasAttribute("download")||link.target&&link.target!=="_self")return;
    if(event.type==="pointerover"&&event.relatedTarget&&link.contains(event.relatedTarget))return;
    let url;
    try{url=new URL(link.href,location.href)}catch(_){return}
    if(url.origin!==location.origin||!url.pathname.startsWith(base))return;
    if(url.pathname===location.pathname&&url.search===location.search)return;
    if(!(/\.html$/.test(url.pathname)||url.pathname.endsWith("/")))return;
    url.hash="";
    const href=url.href;
    if(prefetched.has(href))return;
    prefetched.add(href);
    const hint=document.createElement("link");
    hint.rel="prefetch";
    hint.href=href;
    hint.as="document";
    document.head.appendChild(hint);
  }
  document.addEventListener("pointerover",prefetchFrom,{passive:true});
  document.addEventListener("focusin",prefetchFrom);
})();
