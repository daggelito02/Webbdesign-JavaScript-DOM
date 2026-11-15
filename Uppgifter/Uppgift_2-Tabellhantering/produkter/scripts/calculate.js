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

// Steg 5: Skapa knappen "Beräkna pris" och lägg den efter tabellen
const calculateButton = document.createElement("button");
calculateButton.textContent = "Beräkna pris";
calculateButton.className = "btn btn-primary";

pricetable.parentNode.insertBefore(calculateButton, pricetable.nextSibling);

// Steg 6: Beräkningen (görs i delar)
function calculatePrice() {
    // Del 3: Gå igenom alla produktrader och räkna ut radens summa
    for (let i = 0; i < productRows.length; i++) {
        const row = productRows[i];

        // Hitta input-elementet i raden, oavsett vilken kolumn det står i
        const quantityInput = row.querySelector("input");
        // Antal-cellen är föräldern till input, och Pris-cellen står precis före den
        const priceCell = quantityInput.parentNode.previousElementSibling;

        // Hämta texten i Pris och gör till tal
        const price = Number(priceCell.textContent);
        // Hämta värdet i Antal och gör till tal
        const quantity = Number(quantityInput.value);

        // Räkna ut radens summa
        const rowSum = price * quantity;

        // Skriv summan i radens sista cell
        const lastCell = row.children[row.children.length - 1];
        lastCell.textContent = rowSum;
    }
}

// Steg 7 (tillfälligt redan nu, så att vi kan testa): koppla knappen till funktionen
calculateButton.addEventListener("click", calculatePrice);
