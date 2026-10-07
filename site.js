(function(){
const COURSES=[
["01","HTML","Structure du web","cours/html.html"],["02","CSS","Style & responsive","cours/css.html"],["03","JavaScript","Logique & interaction","cours/javascript.html"],["04","Python","Programmer","cours/python.html"],["05","Git & GitHub","Versionner","cours/git-github.html"],["06","SQL","Données","cours/sql.html"],["07","Réseaux","Internet","cours/reseaux.html"],["08","Linux","Système","cours/linux.html"],["09","Cybersécurité","Défense","cours/cybersecurite.html"],["10","Cryptographie","Secrets","cours/cryptographie.html"],["11","Sécurité web","Applications","cours/securite-web.html"],["12","OSINT","Information","cours/osint.html"],["13","Analyse d'incidents","Incidents","cours/analyse-incidents.html"],["14","Projet final","Portfolio","cours/projet-final.html"]
];
const PROJECTS=[...document.querySelectorAll(".project-card-integrated")].map((el,i)=>({id:String(i+1).padStart(2,"0"),name:el.querySelector("p")?.textContent||"Projet "+(i+1),href:el.querySelector("a")?.getAttribute("href")||"projets.html"}));
window.AZ=window.AZ||{};
AZ.getProgress=function(){try{return JSON.parse(localStorage.getItem("azProgressV1"))||{courses:{},projects:{},favorites:[],xp:0,badges:[]}}catch{return{courses:{},projects:{},favorites:[],xp:0,badges:[]}}};
AZ.saveProgress=function(s){localStorage.setItem("azProgressV1",JSON.stringify(s));};
AZ.favorite=function(key){const s=AZ.getProgress();s.favorites=s.favorites||[];const i=s.favorites.indexOf(key);i>=0?s.favorites.splice(i,1):s.favorites.push(key);AZ.saveProgress(s);return i<0;};
AZ.courseProgress=function(id,pct){const s=AZ.getProgress();s.courses[id]=Math.max(s.courses[id]||0,Math.round(pct));if(pct>=90&&!s.badges.includes("course-"+id))s.badges.push("course-"+id);s.xp=Math.max(s.xp||0,Object.values(s.courses).reduce((a,b)=>a+b,0)*2);AZ.saveProgress(s);};
AZ.renderProgression=function(){
 const s=AZ.getProgress(),answered=Number(localStorage.getItem("quizAnswered")||0),correct=Number(localStorage.getItem("quizCorrect")||0);
 const total=Math.round(Object.values(s.courses).reduce((a,b)=>a+b,0)/(14*100));
 document.querySelector("#dashboard").innerHTML='<div class="cards"><article><span class="tag">PROGRESSION</span><h3>'+total+' %</h3><p>Progression moyenne des 14 cours.</p></article><article><span class="tag">QUIZ</span><h3>'+answered+' questions</h3><p>'+correct+' bonnes réponses.</p></article><article><span class="tag">XP</span><h3>'+Number(s.xp||0)+'</h3><p>Points gagnés dans le parcours.</p></article><article><span class="tag">BADGES</span><h3>'+((s.badges||[]).length)+'</h3><p>Cours validés et objectifs atteints.</p></article></div>';
 document.querySelector("#coursesProgress").innerHTML=COURSES.map(c=>{const p=s.courses[c[0]]||0;return '<article><span class="num">'+c[0]+'</span><h3>'+c[1]+'</h3><p>'+c[2]+'</p><div class="progress-mini"><span style="width:'+p+'%"></span></div><small>'+p+' %</small><p><a class="btn" href="'+c[3]+'">Continuer →</a></p></article>'}).join("");
 const fav=(s.favorites||[]);document.querySelector("#favorites").innerHTML=fav.length?fav.map(k=>'<article><h3>'+k+'</h3><button class="btn ghost" onclick="AZ.favorite(\''+k+'\');location.reload()">Retirer</button></article>').join(""):'<p class="muted">Aucun favori pour le moment.</p>';
};
AZ.initSearch=function(){
 const box=document.querySelector("#searchBox"),out=document.querySelector("#searchResults");
 const items=COURSES.map(c=>({name:c[1],type:"Cours",text:c[2],href:c[3]}));
 function render(){const q=(box.value||"").trim().toLowerCase();const results=q?items.filter(x=>(x.name+" "+x.text).toLowerCase().includes(q)):items;out.innerHTML=results.map(x=>'<article><span class="tag">'+x.type+'</span><h3>'+x.name+'</h3><p>'+x.text+'</p><a class="btn" href="'+x.href+'">Ouvrir →</a></article>').join("")||'<p class="muted">Aucun résultat.</p>';}
 box.addEventListener("input",render);render();
};
window.AZ=AZ;
})();