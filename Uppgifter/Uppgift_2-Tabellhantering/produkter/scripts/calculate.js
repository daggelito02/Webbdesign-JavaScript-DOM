// Räkna ut summor och hantera tabellen
// Jag har tagit höjd för om tabbellen får färre eller fler rader 
// eller om kolumer tas bort eller läggs till så länge dessa finns, Pris Antal Summa.

// Hämta pricetable tabellen och spara i en constant
const pricetable = document.getElementById("pricetable");
console.log("pricetable", pricetable);

// Lägg till header-rubriken "Summa"
const headerRow = pricetable.querySelector("thead tr");
const sumTextHeader = document.createElement("th");
sumTextHeader.textContent = "Summa";
headerRow.appendChild(sumTextHeader);

// Lägg till cell med summan för varje produktrad
const productRows = pricetable.querySelectorAll("tbody tr"); // Hämta alla rader i tbody

for (let i = 0; i < productRows.length; i++) {
    const sumProductRawCell = document.createElement("td");
    productRows[i].appendChild(sumProductRawCell);
}

// Skapa raden totalsummor (sumrow)
const totalSumRow = document.createElement("tr");
totalSumRow.id = "sumrow";

// Kolla hur många kolumner som finns (mer generell) ...
const columnCount = headerRow.children.length;
for (let i = 0; i < columnCount; i++) {
    const totalSumRowCell = document.createElement("td");
    totalSumRow.appendChild(totalSumRowCell);
}
// ... för att appenda rätt antal celler till tabellen
pricetable.querySelector("tbody").appendChild(totalSumRow);


// Låt alla celler i tbody få ett classnamn för att enkare hitta i domen.
// Hämta namnen från headern (headerRow)
function addColumnClasses(row) {
    for (let i = 0; i < headerRow.children.length; i++) {
        const className = utilityFirstClassName(headerRow.children[i].textContent);
        row.children[i].classList.add(className);
    }
}

// Gör om till "utility first" namnstandard
function utilityFirstClassName(text) {
    let result = text.toLowerCase();
    result = result.replaceAll(" ", "-");
    result = result.replaceAll("å", "a");
    result = result.replaceAll("ä", "a");
    result = result.replaceAll("ö", "o");
    return result;
}

// När alla celler finns sätt classer på produktraderna och sumrow
for (let i = 0; i < productRows.length; i++) {
    addColumnClasses(productRows[i]);
}
addColumnClasses(totalSumRow);

// Skapa knappen enligt uppgiften
const calculateButton = document.createElement("button");
calculateButton.textContent = "Beräkna pris";
calculateButton.className = "btn btn-primary";
// Lägg knappen efter tabellen
pricetable.parentNode.insertBefore(calculateButton, pricetable.nextSibling);

// Summera pris och antal 
function calculatePrice() {
    // Defaultvärden
    let totalQuantity = 0;
    let totalSum = 0;

    for (let i = 0; i < productRows.length; i++) {
        const row = productRows[i];

        // Gör om stängenar till nummer
        const price = Number(row.querySelector(".pris").textContent); // const för att det redan finns i markup
        let quantity = Number(row.querySelector(".antal input").value); // let för att det hämtas från input och kan ändras

        // Lite enkel validering. Om man skriver t.ex x i input ändras det till 0
        if (Number.isNaN(quantity)) {
            quantity = 0;
        }

        // Radens summa
        const rowSum = price * quantity;
        row.querySelector(".summa").textContent = rowSum;

        // räkna ut totalsumman och totalantalet
        totalQuantity = totalQuantity + quantity;
        totalSum = totalSum + rowSum;
    }

    // Tilldela totalantal och totalsumma till sumrow
    totalSumRow.querySelector(".antal").textContent = totalQuantity;
    totalSumRow.querySelector(".summa").textContent = totalSum;
}

// Koppla knappen till funktionen
calculateButton.addEventListener("click", calculatePrice); 