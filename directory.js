(function(){
const P=window.AZ=window.AZ||{};
function cards(){
 return Array.from(document.querySelectorAll(".path-card,.course-card,.project-card-integrated"));
}
function addTools(){
 const section=document.querySelector(".section"); if(!section) return;
 if(document.querySelector("#directoryTools")) return;
 const box=document.createElement("div"); box.id="directoryTools"; box.className="directory-tools";
 box.innerHTML='<label for="directorySearch">Rechercher</label><input id="directorySearch" class="search-box" type="search" placeholder="Rechercher dans cette page..."><div class="filter-row"><button type="button" class="btn ghost" data-filter="all">Tout</button><button type="button" class="btn ghost" data-filter="Débutant">Débutant</button><button type="button" class="btn ghost" data-filter="Intermédiaire">Intermédiaire</button><button type="button" class="btn ghost" data-filter="Avancé">Avancé</button></div>';
 const h=section.querySelector("h1"); h&&h.insertAdjacentElement("afterend",box);
 const input=box.querySelector("#directorySearch");
 function apply(){
  const q=input.value.toLowerCase().trim(), f=box.dataset.filter||"all";
  cards().forEach((c)=>{
   const txt=c.textContent.toLowerCase();
   const level=(c.querySelector(".tag")?.textContent||"").trim();
   c.hidden=!!((q&&!txt.includes(q))||(f!=="all"&&level!==f));
  });
 }
 input.addEventListener("input",apply);
 box.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{box.dataset.filter=b.dataset.filter;apply()}));
}
function addFavorites(){
 cards().forEach((c,i)=>{
  if(c.querySelector(".favorite-toggle")) return;
  const num=c.querySelector(".num")?.textContent?.trim()||String(i+1).padStart(2,"0");
  const type=c.classList.contains("project-card-integrated")?"project":"course";
  const key=type+"-"+num;
  const btn=document.createElement("button"); btn.type="button"; btn.className="favorite-toggle btn ghost";
  function paint(){const on=P.getProgress().favorites?.includes(key);btn.textContent=on?"★ Favori":"☆ Ajouter aux favoris";btn.setAttribute("aria-pressed",on?"true":"false");}
  btn.addEventListener("click",()=>{P.favorite(key);paint()}); paint();
  c.appendChild(btn);
 });
}
function init(){addTools();addFavorites();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();