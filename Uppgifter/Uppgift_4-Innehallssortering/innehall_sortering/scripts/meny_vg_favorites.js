// Händelsehanterare för DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(event) {
    generateMenu();
});

function generateMenu() {
    // Hämtar containern där alla recept finns.
    const primaryContent = document.getElementById("primarycontent");

    // Hämta ut alla poster (containers) med recept från primaryContent.
    const posts = primaryContent.querySelectorAll(".post");

    // Gör om posts till en array istället för nodelist
    // för att kunna använda sort() funktionen för sorteringen.
    const postsToSort = Array.from(posts);

    // Sortera alla recepttitlar med svensk locale "sv" för att till
    // exempel åäö ska gå att sortera. Gör på samma sätt som i övningen
    // "Övning 4 – Sortering med Array.sort()"
    postsToSort.sort(function (a, b) {
        const title_a = a.querySelector("h4").textContent.trim();
        const title_b = b.querySelector("h4").textContent.trim();
        return title_a.localeCompare(title_b, "sv");
    });

    // Hämtar elementet där länkmenyn kommer ligga.
    const receptMeny = document.querySelector("#receptmeny .contentarea");

    // Skapa menylistan för att kunna lägga in receptlänkarna i
    // menycontainern senare när list- och länkelementen är skapade.
    const menuList = document.createElement("ul");

    // VG: Skapa avsnittet för favoriter (rubrik, lista och avskiljare)
    // som läggs ovanför menylistan.
    const favoriteSection = document.createElement("div");
    const favoriteTitle = document.createElement("h5");
    favoriteTitle.textContent = "Favoriter";
    const favoriteList = document.createElement("ul");
    const favoriteDivider = document.createElement("hr");
    favoriteSection.appendChild(favoriteTitle);
    favoriteSection.appendChild(favoriteList);
    favoriteSection.appendChild(favoriteDivider);

    // Spara alla menyval (li) i sorterad ordning, så att vi kan flytta dom
    // mellan listorna och ändå behålla bokstavsordningen.
    const menuItems = [];

    // Lägger varje menyval i favoritlistan eller menylistan, beroende på
    // om receptet är en sparad favorit. Går igenom i sorterad ordning och
    // appendChild flyttar elementet, så båda listorna blir sorterade.
    function arrangeMenu() {
        const favorites = getFavorites();

        for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];
            const itemTitle = item.textContent.trim();

            if (favorites.includes(itemTitle)) {
                favoriteList.appendChild(item);
            } else {
                menuList.appendChild(item);
            }
        }

        // Visa avsnittet bara om det finns minst en favorit
        if (favoriteList.children.length > 0) {
            favoriteSection.style.display = "";
        } else {
            favoriteSection.style.display = "none";
        }
    }

    // Loopa över de sorterade posterna och rendera ut dom i rätt ordning
    for (let i = 0; i < postsToSort.length; i++) {
        const post = postsToSort[i];

        // Ge varje post (recept) ett id, som ankarlänkarna kan gå till
        post.id = "recept-" + i;

        // Sortera in recepten i rätt ordning, index 0 appendas först
        // sedan 1. För varje varv läggs nästa post in sist i markupen vilket
        // gör att den 0 kommer högst upp.
        primaryContent.appendChild(post);

        // Skapa listelement med receptlänkar (läggs sedan in i menuList).
        const listMenuItem = document.createElement("li");
        const listMenuLink = document.createElement("a");

        // Använd receptrubriken som länknamn från post i receptmenyn.
        // id:t blir ankarlänk.
        listMenuLink.textContent = post.querySelector("h4").textContent.trim();
        listMenuLink.href = "#" + post.id;

        // Skapa alla länkar och appenda till menylistan.
        listMenuItem.appendChild(listMenuLink);
        menuList.appendChild(listMenuItem);
        menuItems.push(listMenuItem);

        // Markera klickad receptlänk och sätt css-klassen .active på a-elementet
        listMenuLink.addEventListener("click", function () {
            // Fråga om det finns en aktiv länk i hela receptmenyn (både favoriter och övriga)
            const currentActiveLink = receptMeny.querySelector("a.active");

            // Ta bort css-klassen .active om den redan är satt.
            if (currentActiveLink !== null) {
                currentActiveLink.classList.remove("active");
            }

            // Lägg till klassen .active till länken så den ser aktiv ut.
            listMenuLink.classList.add("active");
        });

        // Funktion för VG-uppgiften (Favoritmarkering) som körs efter grunduppgiften.
        // Skicka med dom fördiga posterna för att sedan lägg till hjärtikon.
        addFavoriteHeart(post, arrangeMenu);
    }

    // Lägg in favoritavsnittet och länklistan "menuList" i receptMeny elementet
    // och rendera ut dom på sidan. Favoriterna hamnar överst.
    receptMeny.appendChild(favoriteSection);
    receptMeny.appendChild(menuList);

    // Flytta sparade favoriter till favoritlistan direkt när sidan laddas.
    arrangeMenu();
}

// Eftrauppgift "Favoritmarkering"
// arrangeMenu skickas med så att menyn kan ordnas om vid klick.
function addFavoriteHeart(post, arrangeMenu) {
    // Skapa markup och style för favoritmarkeringen, en hjärt-ikon
    const favoriteHeart = document.createElement("span");
    favoriteHeart.textContent = "♡";
    favoriteHeart.title = "Lägg till favorit"; // Text för hover och skärmläsare.
    favoriteHeart.style.cursor = "pointer";

    // Plasera hjärt-ikonen snyggt till höger om H4:an i en ny rad.
    const favHeadingRow = document.createElement("div");
    favHeadingRow.style.display = "flex";
    favHeadingRow.style.alignItems = "center";
    favHeadingRow.style.columnGap = "0.5rem";

    // Flytta sedna in h4 och hjärt-ikonen i raden.
    const postHeading = post.querySelector("h4");
    post.insertBefore(favHeadingRow, postHeading);
    favHeadingRow.appendChild(postHeading);
    favHeadingRow.appendChild(favoriteHeart);

    // Använder receptrubriken som referensnyckel isället för id som skulle kunna 
    // ändras om t.ex fler recept tillkommer.
    const recipeTitle = postHeading.textContent.trim();

    // Hämtar det sparade "statet" från localStorage om något är satt. 
    setFavorite(favoriteHeart, getFavorites().includes(recipeTitle));

    // Lyssna på klick på hjärt-ikonen och växlar mellan 
    // lägg till och ta bort favorit, och sparar ändringen.
    favoriteHeart.addEventListener("click", function () {
        const favorites = getFavorites();
        // Kollar om receptet har ett index, annars -1 
        const index = favorites.indexOf(recipeTitle); 

        if (index === -1) {
            favorites.push(recipeTitle); // Lägger till
            setFavorite(favoriteHeart, true);
        } else {
            favorites.splice(index, 1); // Tar bort
            setFavorite(favoriteHeart, false);
        }

        // Kör save-funktionen med favoriten.
        saveFavorites(favorites);

        // Flytta receptets menyval till rätt lista (favoriter eller övriga).
        arrangeMenu();
    });
}

// Sätter hjärt-ikonens utseende och hovertext
function setFavorite(heart, isFavorite) {
    if (isFavorite) {
        heart.textContent = "♥";
        heart.title = "Ta bort favorit";
    } else {
        heart.textContent = "♡";
        heart.title = "Lägg till favorit";
    }
}

// Hämtar favoriterna från localStorage om det finn någon. 
// Annars tom lista
function getFavorites() {
    const saved = localStorage.getItem("favorites");

    if (saved === null) {
        return [];
    }

    // localStorage sparar bara text, så JSON.parse gör om texten till en array
    return JSON.parse(saved);
}

// Sparar status för favoriten till localStorage
function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
