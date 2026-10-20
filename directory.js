(function(){
"use strict";
const P=window.AZ=window.AZ||{};
const SELECTOR=".path-card,.course-card,.project-card-integrated";
function cards(){return Array.from(document.querySelectorAll(SELECTOR));}
function progress(){try{return typeof P.getProgress==="function"?P.getProgress():{favorites:[]};}catch(_){return{favorites:[]};}}
function keyFor(card,index){
 const number=(card.querySelector(".num")?.textContent||String(index+1).padStart(2,"0")).trim().split(/[\s•]/)[0];
 return (card.classList.contains("project-card-integrated")?"project-":"course-")+number;
}
function addTools(){
 const section=document.querySelector(".section");
 if(!section||document.querySelector("#directoryTools"))return;
 const box=document.createElement("section");
 box.id="directoryTools";box.className="directory-tools";box.setAttribute("aria-label","Rechercher et filtrer les éléments");
 box.innerHTML='<label class="directory-search-label" for="directorySearch">Rechercher dans cette page</label><input id="directorySearch" class="search-box" type="search" autocomplete="off" placeholder="Ex. Python, réseau, débutant…"><div class="filter-row" role="group" aria-label="Filtrer par niveau"><button type="button" class="btn ghost" data-filter="all" aria-pressed="true">Tout</button><button type="button" class="btn ghost" data-filter="Débutant" aria-pressed="false">Débutant</button><button type="button" class="btn ghost" data-filter="Intermédiaire" aria-pressed="false">Intermédiaire</button><button type="button" class="btn ghost" data-filter="Avancé" aria-pressed="false">Avancé</button><button type="button" class="btn ghost" id="favoritesOnly" aria-pressed="false">☆ Favoris uniquement</button><button type="button" class="btn ghost" id="clearDirectoryFilters">Réinitialiser</button></div><p class="directory-result-count" id="directoryResultCount" role="status" aria-live="polite"></p>';
 const h=section.querySelector("h1");if(h)h.insertAdjacentElement("afterend",box);else section.prepend(box);
 const input=box.querySelector("#directorySearch"),count=box.querySelector("#directoryResultCount");
 function apply(){
  const q=input.value.toLocaleLowerCase("fr").trim(),filter=box.dataset.filter||"all",onlyFavorites=box.dataset.favorites==="true",saved=progress().favorites||[];
  let visible=0;
  cards().forEach((card,index)=>{
   const text=card.textContent.toLocaleLowerCase("fr"),level=(card.querySelector(".tag")?.textContent||"").trim(),fav=saved.includes(keyFor(card,index));
   const show=(!q||text.includes(q))&&(filter==="all"||level===filter)&&(!onlyFavorites||fav);
   card.hidden=!show;if(show)visible++;
  });
  count.textContent=visible+" résultat"+(visible>1?"s":"")+" sur "+cards().length;
 }
 input.addEventListener("input",apply);
 box.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
  box.dataset.filter=button.dataset.filter;
  box.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
  apply();
 }));
 box.querySelector("#favoritesOnly").addEventListener("click",event=>{
  const on=box.dataset.favorites!=="true";box.dataset.favorites=String(on);
  event.currentTarget.setAttribute("aria-pressed",String(on));
  event.currentTarget.textContent=on?"★ Favoris uniquement":"☆ Favoris uniquement";apply();
 });
 box.querySelector("#clearDirectoryFilters").addEventListener("click",()=>{
  input.value="";box.dataset.filter="all";box.dataset.favorites="false";
  box.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter==="all")));
  const fav=box.querySelector("#favoritesOnly");fav.setAttribute("aria-pressed","false");fav.textContent="☆ Favoris uniquement";apply();input.focus();
 });
 box._apply=apply;apply();
 return box;
}
function addFavorites(){
 cards().forEach((card,index)=>{
  if(card.querySelector(".favorite-toggle"))return;
  const key=keyFor(card,index),button=document.createElement("button");
  button.type="button";button.className="favorite-toggle btn ghost";
  function paint(){
   const on=(progress().favorites||[]).includes(key);
   button.textContent=on?"★ Retirer des favoris":"☆ Ajouter aux favoris";
   button.setAttribute("aria-pressed",String(on));
   button.setAttribute("aria-label",(on?"Retirer ":"Ajouter ")+(card.querySelector("h3")?.textContent||"cet élément")+" "+(on?"des favoris":"aux favoris"));
  }
  button.addEventListener("click",()=>{
   if(typeof P.favorite==="function")P.favorite(key);
   paint();const tools=document.querySelector("#directoryTools");if(tools?._apply)tools._apply();
  });
  paint();card.appendChild(button);
 });
}
function init(){addTools();addFavorites();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();