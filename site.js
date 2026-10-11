(function(){
const COURSES=[
["01","HTML","Structure du web","cours/html.html"],["02","CSS","Style & responsive","cours/css.html"],["03","JavaScript","Logique & interaction","cours/javascript.html"],["04","Python","Programmer","cours/python.html"],["05","Git & GitHub","Versionner","cours/git-github.html"],["06","SQL","Données","cours/sql.html"],["07","Réseaux","Internet","cours/reseaux.html"],["08","Linux","Système","cours/linux.html"],["09","Cybersécurité","Défense","cours/cybersecurite.html"],["10","Cryptographie","Secrets","cours/cryptographie.html"],["11","Sécurité web","Applications","cours/securite-web.html"],["12","OSINT","Information","cours/osint.html"],["13","Analyse d'incidents","Incidents","cours/analyse-incidents.html"],["14","Projet final","Portfolio","cours/projet-final.html"]
];
const PROJECTS=[...document.querySelectorAll(".project-card-integrated")].map((el,i)=>({id:String(i+1).padStart(2,"0"),name:el.querySelector("p")?.textContent||"Projet "+(i+1),href:el.querySelector("a")?.getAttribute("href")||"projets.html"}));
const AZ=window.AZ=window.AZ||{};
AZ.getProgress=function(){try{return JSON.parse(localStorage.getItem("azProgressV1"))||{courses:{},projects:{},favorites:[],xp:0,badges:[]}}catch{return{courses:{},projects:{},favorites:[],xp:0,badges:[]}}};
AZ.saveProgress=function(s){localStorage.setItem("azProgressV1",JSON.stringify(s));};
AZ.favorite=function(key){const s=AZ.getProgress();s.favorites=s.favorites||[];const i=s.favorites.indexOf(key);i>=0?s.favorites.splice(i,1):s.favorites.push(key);AZ.saveProgress(s);return i<0;};
AZ.courseProgress=function(id,pct){const s=AZ.getProgress();s.courses[id]=Math.max(s.courses[id]||0,Math.round(pct));if(pct>=90&&!s.badges.includes("course-"+id))s.badges.push("course-"+id);s.xp=Math.max(s.xp||0,Object.values(s.courses).reduce((a,b)=>a+b,0)*2);AZ.saveProgress(s);};
AZ.renderProgression=function(){
 const s=AZ.getProgress(),answered=Number(localStorage.getItem("quizAnswered")||0),correct=Number(localStorage.getItem("quizCorrect")||0);
 const total=Math.round(Object.values(s.courses).reduce((a,b)=>a+b,0)/(14*100));
 document.querySelector("#dashboard").innerHTML='<div class="cards"><article><span class="tag">PROGRESSION</span><h3>'+total+' %</h3><p>Progression moyenne des 14 cours.</p></article><article><span class="tag">QUIZ</span><h3>'+answered+' questions</h3><p>'+correct+' bonnes réponses.</p></article><article><span class="tag">XP</span><h3>'+Number(s.xp||0)+'</h3><p>Points gagnés dans le parcours.</p></article><article><span class="tag">BADGES</span><h3>'+((s.badges||[]).length)+'</h3><p>Cours validés et objectifs atteints.</p></article></div>';
 document.querySelector("#coursesProgress").innerHTML=COURSES.map(c=>{const p=s.courses[c[0]]||0;return '<article><span class="num">'+c[0]+'</span><h3>'+c[1]+'</h3><p>'+c[2]+'</p><div class="progress-mini"><span style="width:'+p+'%"></span></div><small>'+p+' %</small><p><a class="btn" href="'+c[3]+'">Continuer →</a></p></article>'}).join("");
 const fav=(s.favorites||[]).filter(k=>typeof k==="string").slice(0,100),favRoot=document.querySelector("#favorites");favRoot.replaceChildren();if(!fav.length){const empty=document.createElement("p");empty.className="muted";empty.textContent="Aucun favori pour le moment.";favRoot.appendChild(empty)}else fav.forEach(function(k){const article=document.createElement("article"),title=document.createElement("h3"),button=document.createElement("button");title.textContent=k;button.className="btn ghost";button.type="button";button.textContent="Retirer";button.addEventListener("click",function(){AZ.favorite(k);location.reload()});article.append(title,button);favRoot.appendChild(article)});
};
AZ.initSearch=function(){
 const box=document.querySelector("#searchBox"),out=document.querySelector("#searchResults"),filter=document.querySelector("#searchType"),status=document.querySelector("#searchStatus");
 if(!box||!out)return;
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
function syncGlobalNav(){const base="/Le-code-et-la-cybersecurite-de-A-a-Z/";const links=[["Accueil","index.html"],["Parcours","parcours.html"],["Cours","cours.html"],["Projets","projets.html"],["Quiz","quiz.html"],["Progression","progression.html"],["Recherche","recherche.html"]];const h=document.querySelector("header");if(!h)return;let n=h.querySelector("nav");if(!n){n=document.createElement("nav");n.setAttribute("aria-label","Navigation principale");h.appendChild(n)}n.innerHTML=links.map(x=>'<a href="'+base+x[1]+'">'+x[0]+"</a>").join("");const b=h.querySelector(".brand")||h.querySelector("a");if(b){b.className="brand";b.href=base+"index.html";b.innerHTML="<span>&lt;/&gt;</span> LE CODE <b>&amp;</b> LA CYBERSÉCURITÉ";}}
syncGlobalNav();