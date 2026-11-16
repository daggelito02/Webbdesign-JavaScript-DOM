// Steg 1: Hämta tabellen och spara den i en variabel
const pricetable = document.getElementById("pricetable");
console.log("pricetable", pricetable);

// Steg 2: Lägg till kolumnrubriken "Summa"
const headerRow = pricetable.querySelector("thead tr");
const sumTextHeader = document.createElement("th");
sumTextHeader.textContent = "Summa";
headerRow.appendChild(sumTextHeader);

// Steg 3: Lägg till en tom summacell på varje produktrad
const productRows = pricetable.querySelectorAll("tbody tr");

for (let i = 0; i < productRows.length; i++) {
    const sumProductRawCell = document.createElement("td");
    productRows[i].appendChild(sumProductRawCell);
}

// Steg 4: Skapa summeringsraden (sumrow)
const totalSumRow = document.createElement("tr");
totalSumRow.id = "sumrow";

// Kolla hur många kolumner som finns
const columnCount = headerRow.children.length;

for (let i = 0; i < columnCount; i++) {
    const totalSumRowCell = document.createElement("td");
    totalSumRow.appendChild(totalSumRowCell);
}

pricetable.querySelector("tbody").appendChild(totalSumRow);

// Gör om en rubriktext till ett klassnamn, till exempel "Varumärke" -> "varumarke"
function makeClassName(text) {
    let result = text.toLowerCase();
    result = result.replaceAll(" ", "-");
    result = result.replaceAll("å", "a");
    result = result.replaceAll("ä", "a");
    result = result.replaceAll("ö", "o");
    return result;
}

// Sätt klass på varje cell i en rad, utifrån rubriken i samma kolumn
function addColumnClasses(row) {
    for (let i = 0; i < headerRow.children.length; i++) {
        const className = makeClassName(headerRow.children[i].textContent);
        row.children[i].classList.add(className);
    }
}

// Alla celler finns nu, så vi kan sätta klasserna på produktraderna och sumrow
for (let i = 0; i < productRows.length; i++) {
    addColumnClasses(productRows[i]);
}
addColumnClasses(totalSumRow);

// Steg 5: Skapa knappen "Beräkna pris" och lägg den efter tabellen
const calculateButton = document.createElement("button");
calculateButton.textContent = "Beräkna pris";
calculateButton.className = "btn btn-primary";

pricetable.parentNode.insertBefore(calculateButton, pricetable.nextSibling);

// Steg 6: Beräkningen (görs i delar)
function calculatePrice() {
    // Del 4: Totaler som börjar på 0 varje gång vi räknar
    let totalQuantity = 0;
    let totalSum = 0;

    // Del 3: Gå igenom alla produktrader och räkna ut radens summa
    for (let i = 0; i < productRows.length; i++) {
        const row = productRows[i];

        // Hämta texten i Pris-cellen och gör till tal
        const price = Number(row.querySelector(".pris").textContent);
        // Hämta värdet i input i Antal-cellen och gör till tal
        let quantity = Number(row.querySelector(".antal input").value);

        // Om användaren skrev något som inte är ett tal räknar vi det som 0
        if (Number.isNaN(quantity)) {
            quantity = 0;
        }

        // Räkna ut radens summa
        const rowSum = price * quantity;

        // Skriv summan i radens Summa-cell
        row.querySelector(".summa").textContent = rowSum;

        // Del 4: Lägg till radens värden i totalerna
        totalQuantity = totalQuantity + quantity;
        totalSum = totalSum + rowSum;
    }

    // Del 4: Skriv totalerna i sumrow
    totalSumRow.querySelector(".antal").textContent = totalQuantity;
    totalSumRow.querySelector(".summa").textContent = totalSum;
}

// Steg 7 (tillfälligt redan nu, så att vi kan testa): koppla knappen till funktionen
calculateButton.addEventListener("click", calculatePrice);
