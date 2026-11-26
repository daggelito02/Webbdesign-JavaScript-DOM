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

    // Skapa menylistan för att kunna lägga in receptlänkarna i
    // menycontainern senare när list- och länkelementen är skapade.
    const menuList = document.createElement("ul");

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

        // Markera klickad receptlänk och sätt css-klassen .active på a-elementet
        listMenuLink.addEventListener("click", function () {
            // Fråga om det finns en aktiv länk
            const currentActiveLink = menuList.querySelector("a.active");

            // Ta bort css-klassen .active om den redan är satt.
            if (currentActiveLink !== null) {
                currentActiveLink.classList.remove("active");
            }

            // Lägg till klassen .active till länken så den ser aktiv ut.
            listMenuLink.classList.add("active");
        });
    }

    // Hämtar elementet där länkmenyn kommer ligga.
    const receptMeny = document.querySelector("#receptmeny .contentarea");

    // Lägg in länklistan "menuList" i receptMeny elementet
    // och rendera ut den på sidan.
    receptMeny.appendChild(menuList);
}
