const MENU={
 "Fast food":[
  ["🥟","Fataya simple","Frites, mayonnaise, 1 œuf","600 F"],
  ["🥟","Fataya fromage","Fromage, frites, mayonnaise","700 F"],
  ["🥟","Fataya fromage 2 œufs","Fromage, 2 œufs, frites, mayonnaise","1 000 F"],
  ["🍔","Local œufs","Pain burger, frites, mayonnaise, œufs","500 F"],
  ["🍔","Local saucisson","Pain burger, frites, mayonnaise, saucisson","700 F"],
  ["🍔","Local saucisson fromage","Pain burger, frites, mayonnaise, saucisson, fromage","800 F"],
  ["🍔","Burger","Pain burger, steak, frites, mayonnaise, œuf","1 000 F"],
  ["🍔","Burger fromage 2 œufs","Pain burger, steak, 2 œufs, frites, mayonnaise, fromage","1 500 F"],
  ["🌮","Tacos","","2 500 F"],
  ["🌮","Tacos","","3 000 F"],
  ["🌯","Shawarma","","1 500 F"],
  ["🥖","Sandwich petit pain","Petit pain, viande, sauce, frites, mayonnaise","800 F"],
  ["🥖","Sandwich grand pain","Grand pain, viande, sauce, frites, mayonnaise","1 000 F"],
  ["🥖","Sandwich complet","Grand pain, viande, sauce, frites, mayonnaise, œuf, fromage","1 500 F"]
 ],
 "Plats":[
  ["🍗","Vermicelle poulet sauce","Vermicelles, poulet, sauce","2 300 F"],
  ["🍗","Vermicelle poulet sauce jus","Vermicelles, poulet, sauce, jus","2 500 F"],
  ["🍝","Macaroni viande","Macaroni, viande, sauce, frites, mayonnaise","2 000 F"],
  ["🍝","Macaroni viande fromage jus","Macaroni, viande, sauce, frites, mayonnaise, fromage, jus au choix","2 500 F"]
 ]
};
const PICS=[["Fataya","Fataya-emirka.jpg"],
["Local","local-emirka.jpg"],["Burger","Burger-emirka.jpg"],["Tacos","Tacos-emirka.jpg"],["Shawarma","shawarma-emirka.jpg"],["Sandwich","Sandwich-emirka.jpg"],["Vermi","Vermicelle-emirka.jpeg"],["Macaroni viande fromage","Macaronie-emirka.jpg"],["Macaroni","Fritte-emirka.jpg"]];
const pic=n=>(PICS.find(([k])=>n.toLowerCase().startsWith(k.toLowerCase()))||[])[1];
const tabs=document.getElementById("tabs"),box=document.getElementById("grid");
const slug=k=>"cat-"+k.toLowerCase().replace(/\s+/g,"-");
const card=([e,n,d,p])=>{const i=pic(n);return `<div class="item"><div class="vis">${i?`<img src="${i}" alt="${n}" loading="lazy">`:`<span class="em" aria-hidden="true">${e}</span>`}<span class="price">${p}</span></div><div class="tx"><h3>${n}</h3><p>${d}</p></div></div>`};
box.innerHTML=Object.keys(MENU).map(k=>`<h3 class="cat" id="${slug(k)}">${k}</h3><div class="grid">${MENU[k].map(card).join("")}</div>`).join("");
Object.keys(MENU).forEach(k=>{const a=document.createElement("a");a.className="tab";a.href="#"+slug(k);a.textContent=k;tabs.appendChild(a)});

const slides=[...document.querySelectorAll(".slide")],dots=document.getElementById("dots");let cur=0,timer;
/* ===== Commande : fenêtre de choix + envoi WhatsApp ===== */
const WA="221785379494";
const OPTS={"Fast food":[["Mayonnaise","Avec"],["Piment","Sans"],["Ketchup","Avec"]],"Plats":[["Piment","Sans"]]};
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" F";
const $=id=>document.getElementById(id);
document.body.insertAdjacentHTML("beforeend",`<dialog id="dlg" aria-labelledby="dn"><div class="dl">
<button type="button" class="x" id="dx" aria-label="Fermer">×</button>
<div class="dh"><div class="dv" id="dv"></div><div><h3 id="dn"></h3><p id="dp"></p></div></div>
<div class="row"><span class="lb">Quantité</span><div class="qty"><button type="button" id="qm" aria-label="Moins">−</button><output id="qn">1</output><button type="button" id="qp" aria-label="Plus">+</button></div></div>
<div id="ops"></div>
<fieldset><legend>Mode</legend><div class="seg"><label><input type="radio" name="mode" value="Livraison" checked><span>Livraison</span></label><label><input type="radio" name="mode" value="Sur place ou à emporter"><span>Sur place / à emporter</span></label></div></fieldset>
<label class="f" id="adl">Adresse de livraison<input type="text" id="ad" placeholder="Quartier, rue, repère…"></label>
<label class="f">Votre nom<input type="text" id="cn" placeholder="Ex : Awa"></label>
<label class="f">Remarque (facultatif)<textarea id="rm" rows="2" placeholder="Ex : bien cuit, sans oignons"></textarea></label>
<div class="tot"><span>Total</span><b id="tt"></b></div>
<button type="button" class="btn red send" id="sd">Envoyer sur WhatsApp</button>
<p class="hint" id="er" role="alert"></p></div></dialog>`);
const dlg=$("dlg");let ord;
const mode=()=>document.querySelector('input[name="mode"]:checked').value;
function refresh(){$("qn").textContent=ord.q;$("tt").textContent=fmt(ord.q*ord.unit);$("adl").hidden=mode()!=="Livraison"}
function openOrder(item){
  const cat=(item.parentElement.previousElementSibling||{}).textContent||"Fast food";
  const img=item.querySelector(".vis img"),emo=item.querySelector(".em"),price=item.querySelector(".price").textContent;
  ord={name:item.querySelector("h3").textContent,price,unit:+price.replace(/\D/g,""),q:1,cat};
  $("dv").innerHTML=img?`<img src="${img.src}" alt="">`:`<span>${emo?emo.textContent:"🍽️"}</span>`;
  $("dn").textContent=ord.name;$("dp").textContent=price+" l’unité";
  $("ops").innerHTML=(OPTS[cat]||OPTS["Fast food"]).map(([t,def],i)=>`<fieldset class="op"><legend>${t}</legend><div class="seg">${["Avec","Sans"].map(v=>`<label><input type="radio" name="o${i}" value="${v}"${v===def?" checked":""}><span>${v}</span></label>`).join("")}</div></fieldset>`).join("");
  $("er").textContent="";refresh();dlg.showModal();
}
$("qm").onclick=()=>{if(ord.q>1){ord.q--;refresh()}};
$("qp").onclick=()=>{if(ord.q<50){ord.q++;refresh()}};
dlg.addEventListener("change",refresh);
$("dx").onclick=()=>dlg.close();
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
$("sd").onclick=()=>{
  const m=mode(),ad=$("ad").value.trim();
  if(m==="Livraison"&&!ad){$("er").textContent="Merci d’indiquer votre adresse de livraison.";$("ad").focus();return}
  const L=["Bonjour Emirka, je voudrais commander :","",`• ${ord.q} × ${ord.name} (${ord.price}) = ${fmt(ord.q*ord.unit)}`];
  (OPTS[ord.cat]||OPTS["Fast food"]).forEach(([t],i)=>L.push(`   - ${t} : ${document.querySelector(`input[name="o${i}"]:checked`).value}`));
  const rm=$("rm").value.trim(),cn=$("cn").value.trim();
  if(rm)L.push(`   - Remarque : ${rm}`);
  L.push("",`Mode : ${m}`);if(m==="Livraison")L.push(`Adresse : ${ad}`);
  if(cn)L.push(`Nom : ${cn}`);
  L.push(`Total : ${fmt(ord.q*ord.unit)}`);
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(L.join("\n"))}`,"_blank","noopener");
  dlg.close();
};
document.querySelectorAll(".item").forEach(it=>{
  const b=document.createElement("button");b.type="button";b.className="cmd";b.textContent="🛒 Commander";
  it.querySelector(".tx").appendChild(b);it.addEventListener("click",()=>openOrder(it));
});
function go(n){cur=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle("on",i===cur));[...dots.children].forEach((b,i)=>b.setAttribute("aria-current",i===cur))}
function auto(){clearInterval(timer);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)timer=setInterval(()=>go(cur+1),4500)}
slides.forEach((s,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Photo "+(i+1));b.onclick=()=>{go(i);auto()};dots.appendChild(b)});
go(0);auto();
