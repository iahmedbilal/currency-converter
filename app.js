const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdown=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
       

for (let select of dropdown){
    for ( let currCode in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=currCode
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected=true;
        } else if(select.name==="to" && currCode==="INR"){
            newOption.selected=true;
        }

        select.appendChild(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFLag(event.target);
    })

    
    };
 
function updateFLag(selectElement){
    const currCode =selectElement.value;
    const countryCode= countryList[currCode];
    const newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`
    const img=selectElement.parentElement.querySelector("img");
    img.src= newSrc;
 };


 

 button.addEventListener("click" ,  (event)=> {
    event.preventDefault();
    updateExchangeRate();

 });

 const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountValue= amount.value;
    let numAmount=parseFloat(amountValue)
    
    if(amountValue===""  || isNaN(numAmount) || amountValue <0 ){
        const invalid =msg.innerText="Plese enter a valid amount";
        return invalid;

    }
     const URL =`${base_url}/${fromCurr.value.toLowerCase()}.json`;
     console.log(URL);
    const response =await fetch(URL);
    
    const data =await response.json();

    const rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    

    const finalAmount= amountValue * rate;
    msg.innerText=`${amountValue}${fromCurr.value}=${finalAmount}${toCurr.value}`



 }


window.addEventListener("load", () => {
    updateExchangeRate();
})
 


