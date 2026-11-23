// Händelsehanterare för DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(event) {
    generateMenu();
});

function generateMenu() {
    // Hämta recepten
    const primaryContent = document.getElementById("primarycontent");

    // Alla recept poster
    const posts = primaryContent.querySelectorAll(".post");

    // Platsen där menyn ska läggas
    const receptMeny = document.querySelector("#receptmeny .contentarea");

    // Tillfällig kontroll, ska bli 40
    console.log(posts.length);

    // Spara posts som en array
    const postsToSort = Array.from(posts);

    // Sortera titlarna med stöd för svenska alfabetet
    postsToSort.sort(function (a, b) {
        const title_a = a.querySelector("h4").textContent.trim();
        const title_b = b.querySelector("h4").textContent.trim();
        return title_a.localeCompare(title_b, "sv");
    });

    // Skapa listan menylistan med receptlänkar
    const menuList = document.createElement("ul");

    // Loppa över de soterade posterna och rendera ut dom i rätt ordning
    for (let i = 0; i < postsToSort.length; i++) {
        const post = postsToSort[i];

        // Ge varje post (recept) ett id, som ankarlänkarna kan gå till
        post.id = "recept-" + i;

        // Sortera in recepten i rätt ordning
        primaryContent.appendChild(post);

        // Skapa listelement med receptlänkar och lägg in i listan 
        const listMenuItem = document.createElement("li");
        const listMenuLink = document.createElement("a");

        // Använd receptrubriken som länknamn i menyn och skapa en ankarlänk 
        // med id:et från recept posterna 
        listMenuLink.textContent = post.querySelector("h4").textContent.trim();
        listMenuLink.href = "#" + post.id;

        // Skapa alla länkar till listan 
        listMenuItem.appendChild(listMenuLink);
        menuList.appendChild(listMenuItem);

        // Markera klickat menyval som aktivt
        listMenuLink.addEventListener("click", function () {
            // Kollar om det finns en länk med classen active
            const currentActiveLink = menuList.querySelector("a.active");

            // Ta bort active om den redan är satt
            if (currentActiveLink !== null) {
                currentActiveLink.classList.remove("active");
            }

            // Gör länken aktiv vid klick med classen active 
            listMenuLink.classList.add("active");
        });
    }

    // Lägg in länklistan i recept-menyn-elementet
    receptMeny.appendChild(menuList);
}
