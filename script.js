const ajoute=document.getElementById("ajoute");
const noom=document.getElementById("noom");
const email=document.getElementById("email");
const selact=document.getElementById("select");
const regexnom=/^[A-Za-zÀ-ÿ ']{3,30}$/;
const regexemail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const paranoom=document.getElementById("paranoom");
const paraselect=document.getElementById("paraselect");
const paraemail=document.getElementById("paraemail");
const form=document.querySelector("form");
const ul=document.querySelector("ul");
// const sala=document.getElementById("sala");
const aucun=document.querySelector(".aucun");
const supprime=document.getElementById("supprime");
const search=document.getElementById("search");
const Langues=document.getElementById("Langues")
const Web=document.getElementById("Web");
const Bureautique=document.getElementById("Bureautique");
const Tous=document.getElementById("Tous");
const contt=document.getElementById("contt");
const contP=document.getElementById("contP");

function saveData(data){
    localStorage.setItem("datastorage",JSON.stringify(data))
}
function getData(){
    return JSON.parse(localStorage.getItem("datastorage"))||[];
}
const data=getData();

function nom(){
    if(regexnom.test(noom.value.trim())){
        paranoom.textContent="✅";
        return true ;
    }else{
        paranoom.textContent="❌ entre un nom complet ";
        return false ;
    }
}

function selec(){
    if(selact.value!=""){
        paraselect.textContent="✅";
        return true;
    }else{
        paraselect.textContent="❌ choise un formation pour le selection    ";
        return false;
    }
}

// function emaill(){
//     data.forEach((p)=>{
//         if(!p.email.includes(email.value.trim())){
//             paraemail.textContent="❌ email exete deja entre un noutre email ";
//             return false;
//         }
//     })
//     if(regexemail.test(email.value.trim())){
//         paraemail.textContent="✅";
//         return true ;
//     }else{
//         paraemail.textContent="❌ entre un cractire ";
//         return false;
//     }
// }
function emaill(){
    const existe = data.some((p)=>{
        return p.email.toLowerCase() === email.value.trim().toLowerCase();
    });

    if(existe){
        paraemail.textContent = "❌ Email existe déjà";
        return false;
    }

    if(regexemail.test(email.value.trim())){
        paraemail.textContent = "✅";
        return true;
    }else{
        paraemail.textContent = "❌ Entre un email valide";
        return false;
    }
}
function valid(){
    if(nom()&&selec()&&emaill()){
        return true ;
    }else{
        return false ;
    }
}
noom.addEventListener("input",()=>{
    nom();
})
selact.addEventListener("change",()=>{
    selec();
})
email.addEventListener("input",()=>{
    emaill();
})

ajoute.addEventListener("click",(e)=>{
    e.preventDefault();
    if(valid()){
        let op={nom:noom.value,email:email.value,formation:selact.value};
        data.push(op);
        afichag(data);
        saveData(data);
        change(data);
        form.reset();
    }else{
        return ;
    }
})
// function afichage(){
//     const li=document.createElement("li");
//     li.innerHTML=`
//         <input type="checkbox" class="selection">
//         <div>
//         <p>${noom.value}</p>
//         <p class="email">${email.value}</p>
//         </div>
//         <div class="sup">
//         <p>${selact.value}</p>
//         <p id="sala">🚮</p>
//         </div>
//     `
//     ul.appendChild(li);
// }

function afichag(data){
    ul.innerHTML="";
    data.forEach((p) => { 
        const li=document.createElement("li");
    li.innerHTML=`
        <input type="checkbox" class="selection">
        <div>
        <p>${p.nom}</p>
        <p class="email">${p.email}</p>
        </div>
        <div class="sup">
        <p class="namee">${p.formation}</p>
        <p class="sala">🚮</p>
        </div>
    `
    ul.appendChild(li);
    });
    change(data);
    contt.textContent=data.length;
}
afichag(data);
function change(data){
    if(data.length>0){
        aucun.classList.add("hidden");
        supprime.classList.remove("hidden");
    }else{
        aucun.classList.remove("hidden");
        supprime.classList.add("hidden");
    }
}
change(data);

function suprime(e){
    data.forEach((p,i)=>{
        if(p.email===e){
            data.splice(i, 1);
             
        }
    })
}
ul.addEventListener("click",(e)=>{
    if(e.target.classList.contains("sala")){
        const li = e.target.closest("li");
        const emai=li.querySelector(".email").textContent;
        suprime(emai);
        saveData(data);
        afichag(data);
    }
})


search.addEventListener("input",()=>{
    const liste=document.querySelectorAll("li");
    const put=search.value.trim().toLowerCase();
    liste.forEach((cart)=>{
        const text=cart.textContent.toLowerCase();
        cart.classList.toggle("hidden",!text.includes(put));
    })
})

Bureautique.addEventListener("click",()=>{
    feltrege("Bureautique")
})
Web.addEventListener("click",()=>{
    feltrege("Web")
})
Langues.addEventListener("click",()=>{
    feltrege("Langues")
})
Tous.addEventListener("click",()=>{
    afichag(data)
})
function feltrege(a){
    const result=data.filter((p)=>{
       return p.formation===a;
    });
    afichag(result);
    change(result);
}
function supselect(){
const tchek=ul.querySelectorAll(".selection:checked");
contP.textContent=tchek.length;
tchek.forEach((p)=>{
const li = p.closest("li");
const emai=li.querySelector(".email").textContent;
    suprime(emai);
    

})
saveData(data);
afichag(data);
}
supprime.addEventListener("click",()=>{
    supselect();
    contP.textContent=0;
})

ul.addEventListener("change", (e)=>{
    if(e.target.classList.contains("selection")){
        const tchek = ul.querySelectorAll(".selection:checked");
        contP.textContent = tchek.length;
    }
});

const boutons = [Tous, Web, Langues, Bureautique];

boutons.forEach((btn) => {
    Tous.classList.add("active");
    btn.addEventListener("click", () => {

        boutons.forEach((b) => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

    });
});