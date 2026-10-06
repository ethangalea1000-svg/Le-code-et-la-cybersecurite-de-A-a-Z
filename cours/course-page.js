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
function render(data){
 const sections=Array.isArray(data.sections)?data.sections:[];
 const exercises=Array.isArray(data.exercises)?data.exercises:[];
 root.innerHTML=`<header class="hero"><div class="eyebrow">COURS ${id} • ${esc(meta.level)}</div><h1>${esc(meta.title)}</h1><p class="lead">${esc(data.intro||meta.subtitle)}</p><div class="meta"><span class="pill">${esc(meta.subtitle)}</span><span class="pill">${esc(meta.level)}</span><span class="pill">Environnement autorisé</span></div></header><div class="course-content"><h2>Sommaire du cours</h2><p>Ce cours est organisé en étapes progressives. Lis les notions, reproduis les exemples dans un environnement autorisé, puis réalise les exercices.</p>${sections.map((s,i)=>`<section class="lesson"><h3>${i+1}. ${esc(s[0]||"Notion")}</h3><p>${esc(s[1]||s)}</p></section>`).join("")}<h2>Exercices</h2>${exercises.map((x,i)=>`<div class="exercise"><strong>Exercice ${i+1}</strong><p>${esc(x)}</p></div>`).join("")}</div>${nav(id)}`;
}
function nav(id){const n=Number(id),prev=String(n-1).padStart(2,"0"),next=String(n+1).padStart(2,"0");return `<div class="nav-course">${n>1?`<a class="btn secondary" href="${COURSES[prev].slug}.html">← ${esc(COURSES[prev].title)}</a>`:"<span></span>"}<a class="btn secondary" href="../index.html#cours">Sommaire</a>${n<14?`<a class="btn" href="${COURSES[next].slug}.html">${esc(COURSES[next].title)} →</a>`:"<span></span>"}</div>`}
document.querySelector("#courseTitle").textContent=meta.title;
const s=document.createElement("script");s.src=meta.file;s.onload=()=>render(window.courseData?.[id]||{});document.body.appendChild(s);