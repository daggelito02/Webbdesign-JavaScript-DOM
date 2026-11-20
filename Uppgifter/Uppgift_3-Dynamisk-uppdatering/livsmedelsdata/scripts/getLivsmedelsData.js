// Händelsehanterare för DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(event) {
    // Göm livsmedelstabellen vid inladdning, så att inte tabellrubrikerna syns.
    document.querySelector("#search-table").style.display = "none";
});

// Steg 1: Hämta elementen vi behöver
const searchForm = document.querySelector("form");
const searchWord = document.querySelector("#search-word");
const searchTable = document.querySelector("#search-table");
const tableBody = searchTable.querySelector("tbody");

console.log(searchForm, searchWord, searchTable, tableBody);

// Steg 3: Hämta livsmedel från webbtjänsten
async function getFoodData(foodName) {
    try {
        // Bygg upp adressen, till exempel ...getlivsmedel.php?namn=bacon
        const params = new URLSearchParams({ namn: foodName });
        const url = `https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php?${params}`;

        // Vänta på att fetch-anropet ska slutföras
        const response = await fetch(url);

        // Kontrollera om anropet lyckades
        if (!response.ok) {
            throw new Error("Nätverksfel: " + response.status);
        }

        // Vänta på att JSON-parsningen ska slutföras
        const foodData = await response.json();

        // Visa resultatet
        showFoodData(foodData);

    } catch (error) {
        // Hantera fel
        console.error("Fel vid hämtning:", error);

        // Ta bort gamla resultat och göm tabellen, så att inget föråldrat visas
        tableBody.textContent = "";
        searchTable.style.display = "none";
    }
}

// Steg 4: Skapa en tabellrad av ett livsmedel
function createFoodRow(food) {
    const row = document.createElement("tr");

    // Värdena läggs i samma ordning som kolumnerna i tabellen,
    // inte i den ordning som de kommer från webbtjänsten
    const values = [food.namn, food.energi, food.kolhydrater, food.protein, food.fett];

    for (let i = 0; i < values.length; i++) {
        const cell = document.createElement("td");
        cell.textContent = values[i];
        row.appendChild(cell);
    }

    return row;
}

// Steg 5: Visa livsmedlen i tabellen
function showFoodData(foodData) {
    const foods = foodData.livsmedel;

    // Ta bort resultatet från förra sökningen
    tableBody.textContent = "";

    // Skapa en rad för varje livsmedel och lägg i tbody
    for (let i = 0; i < foods.length; i++) {
        const row = createFoodRow(foods[i]);
        tableBody.appendChild(row);
    }

    // Steg 6: Visa tabellen om det finns träffar, annars göm den
    if (foods.length > 0) {
        searchTable.style.display = "";
    } else {
        searchTable.style.display = "none";
    }
}

// Steg 2: Lyssna på när formuläret skickas (klick på Sök eller Enter)
searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Stoppa att sidan laddas om
    const searchWordValue = searchWord.value;
    console.log("Sökord:", searchWordValue);

    getFoodData(searchWordValue);
});
