let taxSwitch = document.getElementById("flexSwitchCheckChecked");
taxSwitch.addEventListener("click" , () => {
let taxInfo = document.getElementsByClassName("tax-info");
for(info of taxInfo){
    if(info.style.display != "none"){
        info.style.display = "none";
    }
    else{
        info.style.display = "inline";
    }
}
});