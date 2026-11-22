// Händelsehanterare för DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(event) {
    // Göm livsmedelstabellen vid inladdning, så att inte tabellrubrikerna syns.
    document.querySelector("#search-table").style.display = "none";
});

// Hämta form och tabell elementen
const searchForm = document.querySelector("form");
const searchWord = document.querySelector("#search-word");
const searchTable = document.querySelector("#search-table");
const tableBody = searchTable.querySelector("tbody");

// Hämta data med fetch från webservisen
async function getFoodData(foodName) {
    try {
        // Sätt ihop sökordet med parametren och gör den URL encodad.
        const params = new URLSearchParams({ namn: foodName });
        const url = `https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php?${params}`;

        // Gör en fetch och vänta på svaret
        const response = await fetch(url);

        // Kollar svaret om ok
        if (!response.ok) {
            throw new Error("Nätverksfel: " + response.status);
        }

        // Tar hand om svaret och gör om till ett objekt
        const foodData = await response.json();

        showFoodData(foodData);

    } catch (error) {
        // Skriv ut vad som är fel för lättare felsökning
        console.error("Fel vid hämtning:", error);

        // Nollställer tabellen och gömmer den vid fel
        tableBody.textContent = "";
        searchTable.style.display = "none";
    }
}

// Visa sökresultatet i tabellen
function showFoodData(foodData) {
    const foods = foodData.livsmedel;

    // Nollställ tabellen för varje ny sökning
    tableBody.textContent = "";

    // Lägg till en rad för varje livsmedel i tabellen
    for (let i = 0; i < foods.length; i++) {
        const row = createFoodRow(foods[i]);
        tableBody.appendChild(row);
    }

    // Visa resultatet om sökningen gav någon träff, annars göm tabellen
    if (foods.length > 0) {
        searchTable.style.display = "";
    } else {
        searchTable.style.display = "none";
    }
}

// Skapa alla celler till raden med värdena från fetch svaret
function createFoodRow(food) {
    const row = document.createElement("tr");

    // Skapa en array och arrangera värdena i samma ordning som cellerna i tabellen
    const values = [food.namn, food.energi, food.kolhydrater, food.protein, food.fett];

    for (let i = 0; i < values.length; i++) {
        const cell = document.createElement("td");
        cell.textContent = values[i];
        row.appendChild(cell);
    }

    return row;
}

// Fånga sökordet och hämta data från webservicen
// Använder submit för att även trigga enterknappen
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchWordValue = searchWord.value;

    getFoodData(searchWordValue);
});
