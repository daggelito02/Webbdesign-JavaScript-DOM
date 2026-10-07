// alert("Palindromtestaren kan avgöra om ett namn är en palindrom");
// let nameString = prompt("Skriv in ett namn");
// while (nameString != null) {  
//     nameString = nameString.toLowerCase();  
//     let reverse = "";

//     for (let i = nameString.length - 1; i >= 0; i--) {    
//         reverse = reverse + nameString.charAt(i);  
//     }

//     alert(nameString + " baklänges blir " + reverse);  
//     if (nameString == reverse) {    
//         alert(nameString + " är en palindrom");  
//     } else {    
//         alert(nameString + " är inte en palindrom");  
//     }  
//     nameString = prompt("Skriv in ett nameString");
// }
// alert("Tack för att du har använt palindromtestaren");

alert("Palindromtestaren kan avgöra om ett namn är en palindrom");

let nameString = prompt("Skriv in ett namn");

while (nameString !== null) {
    nameString = nameString.toLowerCase();
    let forward = 0;
    let back = nameString.length - 1;
    let palindrom = true;

    while (forward <= back && palindrom) {
        if (nameString.charAt(forward) != nameString.charAt(back)) {
            palindrom = false;
        }
        forward++;
        back--;
    }

    if (palindrom) {
        alert(nameString + " är en palindrom");
    } else {
        alert(nameString + " är inte en palindrom");
    }

    nameString = prompt("Skriv in ett namn");
}

alert("Tack för att du har använt palindromtestaren");