const ajoute=document.getElementById("ajoute");
const noom=document.getElementById("noom");
const email=document.getElementById("email");
const selact=document.getElementById("select");
const regexnom=/^[A-Za-zÀ-ÿ ']{3,30}$/;
const regexemail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$/;
const paranoom=document.getElementById("paranoom");
const paraselect=document.getElementById("paraselect");
const paraemail=document.getElementById("paraemail");
const form=document.querySelector("form");

function saveData(){
    localStorage
}
function getData(){

}
let data=getData();

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
        paraselect.textContent="❌ choise un formation ";
        return false;
    }
}

function emaill(){
    if(regexemail.test(email.value.trim())){
        paraemail.textContent="✅";
        return true ;
    }else{
        paraemail.textContent="❌ entre un cractire ";
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
        console.log(op);
        // data.push(op);
        // saveData(data);
        form.reset();
    }else{
        return ;
    }
})