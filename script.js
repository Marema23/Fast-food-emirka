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
function go(n){cur=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle("on",i===cur));[...dots.children].forEach((b,i)=>b.setAttribute("aria-current",i===cur))}
function auto(){clearInterval(timer);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)timer=setInterval(()=>go(cur+1),4500)}
slides.forEach((s,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Photo "+(i+1));b.onclick=()=>{go(i);auto()};dots.appendChild(b)});
go(0);auto();
