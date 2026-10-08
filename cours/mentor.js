(function(){
const KEY="azMentorV1";
const presets={
 alex:{name:"Alex",avatar:"🧑‍💻",color:"#635bff",style:"calme",encouragement:"normal"},
 lina:{name:"Lina",avatar:"👩‍💻",color:"#e4578a",style:"pédagogique",encouragement:"fort"},
 nox:{name:"Nox",avatar:"🕵️",color:"#26324a",style:"enquête",encouragement:"normal"},
 byte:{name:"Byte",avatar:"🤖",color:"#168c78",style:"direct",encouragement:"léger"}
};
let state=load(),lastCtx="";
function load(){try{return JSON.parse(localStorage.getItem(KEY))||null}catch(e){return null}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function esc(v){return String(v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function ctx(){return window.mentorContext||{type:"other"}}
function baseMessage(c){
 if(c.type==="lesson"){
  if(c.n===1)return "On commence. Je vais intervenir pendant la leçon : je t’explique, je réagis à tes réponses et je te donne un indice si tu bloques.";
  if(state.style==="enquête")return "Observe les détails. Je vais te signaler les indices importants et te pousser à vérifier tes hypothèses.";
  if(state.style==="direct")return "On ne regarde pas passivement : tu testes, je réagis, puis tu corriges.";
  if(state.style==="pédagogique")return "Je vais avancer avec toi étape par étape et t’aider au moment où tu en as besoin.";
  return "Je reste avec toi pendant la leçon. Teste, réponds et je réagis à ce que tu fais.";
 }
 return "Je serai ton mentor pour ce cours. Commence par la première leçon : on va apprendre une notion à la fois, puis la mettre en pratique.";
}
function intervention(type,extra){
 const c=ctx();
 const sets={
  start:["Lis cette première partie. Je te donne l’idée essentielle avant de te demander d’agir.","Regarde la notion, puis avance : je reviendrai juste après pour vérifier ta compréhension."],
  understand:["Bien. Maintenant, ne te contente pas de lire : montre-moi que tu as compris.","Cette notion est posée. Passons à une vérification rapide."],
  wrong:["Pas encore. Relis le passage clé et cherche le mot qui décrit précisément la notion.","Tu es proche, mais il manque l’idée essentielle. Essaie encore, sans te précipiter."],
  right:["Oui. Ta réponse va dans le bon sens. On peut passer à la manipulation.","Correct. Maintenant, vérifie cette idée dans le laboratoire."],
  code:["Observe le résultat. Si quelque chose ne correspond pas à ton intention, modifie le code et relance.","Le laboratoire vient de répondre. C’est en testant que la notion devient concrète."],
  challenge:["Dernière étape : applique la notion sans recopier mécaniquement l’exemple.","À toi de construire la solution. Je te laisse chercher avant de valider."],
  finish:["Leçon validée. Tu viens de transformer la notion en pratique. Passe à la suivante quand tu es prêt.","Bien joué. Cette leçon est enregistrée dans ta progression."]
 };
 let msg=(sets[type]||sets.start)[0];
 if(state.style==="pédagogique"&&type==="wrong")msg="Ce n’est pas grave. Reviens à l’idée principale, puis reformule avec tes propres mots.";
 if(state.style==="direct"&&type==="wrong")msg="Incorrect. Relis, corrige et retente.";
 if(state.style==="enquête"&&type==="wrong")msg="Indice : cherche le terme qui répond directement à la question. Vérifie ton hypothèse.";
 if(state.encouragement==="fort"&&type==="right")msg="Oui, exactement. Très bon réflexe. Maintenant, passe au laboratoire et vérifie-le.";
 if(extra)msg+=" "+extra;
 speak(msg);
}
function speak(msg){
 const b=document.querySelector("#mentorBubble"); if(!b)return;
 b.classList.remove("mentor-pop"); void b.offsetWidth; b.classList.add("mentor-pop");
 b.textContent=msg;
}
function openEditor(){
 document.querySelector(".mentor-modal")?.remove();
 const p=state||presets.alex;
 document.body.insertAdjacentHTML("beforeend",'<div class="mentor-modal"><div class="mentor-dialog"><h2>Qui veux-tu pour t’accompagner ?</h2><p>Choisis un mentor. Tu pourras le modifier plus tard.</p><div class="mentor-grid">'+Object.entries(presets).map(([id,x])=>'<button class="mentor-option '+(p.preset===id?"selected":"")+'" data-preset="'+id+'" style="--mentor-color:'+x.color+'"><span class="avatar">'+x.avatar+'</span><strong>'+x.name+'</strong><small>'+x.style+'</small></button>').join("")+'</div><div class="mentor-fields"><div class="mentor-field"><label>Prénom du mentor</label><input id="mentorName" value="'+esc(p.name||"Alex")+'"></div><div class="mentor-field"><label>Couleur principale</label><input id="mentorColor" type="color" value="'+(p.color||"#635bff")+'"></div><div class="mentor-field"><label>Avatar</label><input id="mentorAvatar" value="'+esc(p.avatar||"🧑‍💻")+'" maxlength="4"></div><div class="mentor-field"><label>Façon de parler</label><select id="mentorStyle"><option>calme</option><option>pédagogique</option><option>enquête</option><option>direct</option></select></div><div class="mentor-field"><label>Encouragement</label><select id="mentorEnc"><option>léger</option><option>normal</option><option>fort</option></select></div></div><button class="mentor-save" id="mentorSave">Enregistrer mon mentor</button></div></div>');
 document.querySelector("#mentorStyle").value=p.style||"calme";document.querySelector("#mentorEnc").value=p.encouragement||"normal";
 document.querySelectorAll(".mentor-option").forEach(b=>b.onclick=()=>{const x=presets[b.dataset.preset];document.querySelectorAll(".mentor-option").forEach(z=>z.classList.remove("selected"));b.classList.add("selected");document.querySelector("#mentorName").value=x.name;document.querySelector("#mentorColor").value=x.color;document.querySelector("#mentorAvatar").value=x.avatar;document.querySelector("#mentorStyle").value=x.style;document.querySelector("#mentorEnc").value=x.encouragement;state={...x,preset:b.dataset.preset}});
 document.querySelector("#mentorSave").onclick=()=>{state={name:document.querySelector("#mentorName").value.trim()||"Alex",color:document.querySelector("#mentorColor").value,avatar:document.querySelector("#mentorAvatar").value||"🧑‍💻",style:document.querySelector("#mentorStyle").value,encouragement:document.querySelector("#mentorEnc").value,preset:state?.preset||"custom"};save();document.querySelector(".mentor-modal").remove();render()};
}
function render(){
 if(!state){openEditor();return}
 document.querySelector("#mentorUI")?.remove();
 const c=ctx(),key=JSON.stringify(c);
 document.body.insertAdjacentHTML("beforeend",'<aside class="mentor" id="mentorUI" style="--mentor-color:'+state.color+'"><button class="mentor-avatar" id="mentorAvatarBtn" title="Personnaliser le mentor">'+esc(state.avatar)+'</button><div class="mentor-panel"><div class="mentor-name">'+esc(state.name)+'</div><div class="mentor-bubble" id="mentorBubble">'+esc(baseMessage(c))+'</div><div class="mentor-actions"><button class="mentor-btn" id="mentorNext">'+(c.type==="lesson"?"Je suis prêt →":"Commencer →")+'</button><button class="mentor-btn secondary" id="mentorEdit">Personnaliser</button></div></div></aside>');
 document.querySelector("#mentorEdit").onclick=openEditor;document.querySelector("#mentorAvatarBtn").onclick=openEditor;
 document.querySelector("#mentorNext").onclick=()=>{if(c.type==="lesson"){intervention("understand")}else{location.href="/Le-code-et-la-cybersecurite-de-A-a-Z/cours/lecon.html?id="+encodeURIComponent(c.id||"01")+"&lesson=1"}};
 lastCtx=key;
}
window.Mentor={
 init:render,
 edit:openEditor,
 intervene:intervention,
 setContext:function(c){window.mentorContext=c;render()},
 onStep:function(n){if(n===2)intervention("understand");else if(n===3)intervention("right");else if(n===4)intervention("challenge")},
 onAnswer:function(ok){intervention(ok?"right":"wrong")},
 onCode:function(){intervention("code")},
 onFinish:function(){intervention("finish")}
};
document.addEventListener("DOMContentLoaded",render);
})();