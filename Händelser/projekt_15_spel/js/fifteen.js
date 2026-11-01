(function() { // IIFE
    // Variabler som är tillgängliga globalt inom IIFE-funktionen
    // Dessa fylls med innehåll senare i koden
    let overlayEl, sizeInputEl, boardEl, movesTextEl, winModalEl, winMovesEl, titleNumberEl, sizeDisplayEl;

    function init() {
        // Konfigurera användargränssnittet∑
        setupModal();
        setupControls();
        setupBoard();

        // Starta spelet
        startNewGame();
    }

    function startNewGame() {
        // Nollställ antal drag
        movesTextEl.textContent = 0;

        // Töm spelbrädet
        emptyBoard();

        // Hämta storleken på spelplanen från väljaren, siffran anger både antal rader och kolumner
        const size = sizeInputEl.value;

        // Generera spelbrädet
        generateBoard(size);

        // Uppdatera rubriken för spelet
        titleNumberEl.innerText = (size * size) - 1;
    }

    function emptyBoard() {
        // Elegant metod för att tömma brädet, betydligt mycket snabbare än att ta innerHTML = "";
        // https://jsperf.com/innerhtml-vs-removechild/15
        // ----
        // Medan det finns en första barnnod
        while (boardEl.firstChild) {
            // Ta bort den första barnnoden
            boardEl.firstChild.remove();
        }
    }

    function generateBoard(size) {
        let tiles;
        // Fyll variabeln tiles med slumpmässigt utplacerade siffror (do)
        // Gör om proceduren så länge brädet A: inte är lösbart eller B: pusslet redan är löst (while)
        do {
            tiles = generateTiles(size);
        } while (!isSolvable(tiles) || isSolved(tiles));
        
        for (let i = 0; i < size; i++) {
            const outputRowEl = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                const outputTileEl = document.createElement("td");
                if (tiles[i][j] === 0) {
                    // Ge hålcellen klassen "blank" för att ge den rätt utseende
                    outputTileEl.className = "blank";
                } else {
                    outputTileEl.className = "tile";
                    outputTileEl.innerText = tiles[i][j];
                    // Lägg till händelselyssnare för att flytta brickan när användaren klickar på den
                    outputTileEl.addEventListener("click", moveThisTile);
                }
                outputRowEl.appendChild(outputTileEl);
            }
            boardEl.appendChild(outputRowEl);
        }
    }

    function moveThisTile(){
        const column = this.cellIndex;
        const row = this.parentNode.rowIndex;

        const holeEl = document.querySelector(".blank");
        const holeColumn = holeEl.cellIndex;
        const holeRow = holeEl.parentNode.rowIndex;

        // Räkna ut avståndet mellan hålet och brickan
        const diffCols = holeColumn - column;
        const diffRows = holeRow - row;

        // Flytta brickan om avståndet mellan hålet och brickan är 1 i höjd- eller sidled
        if ((Math.abs(diffRows) === 1 && diffCols === 0) || (Math.abs(diffCols) === 1 && diffRows === 0)) {
            // Byt plats på brickan och hålet
            swapElements(this, holeEl);
            incrementMoves();
        } else {
            const errorEvent = new Event("moveError", { "bubbles": true });
            this.dispatchEvent(errorEvent);
        }
    }

    // Hjälpfunktion för att byta plats på två DOM-element
    function swapElements(el1, el2) {
        // Spara positionen för el2
        const parent2 = el2.parentNode;
        const next2 = el2.nextSibling;
        // Specialfall där el1 är nästa syskon till el2
        if (next2 === el1) {
            // Placera el1 före el2
            parent2.insertBefore(el1, el2);
        } else {
            // Placera el2 före el1
            el1.parentNode.insertBefore(el2, el1);

            // Placera el1 där el2 tidigare var
            if (next2) {
                // Om det fanns ett element efter el2, placera el1 före detta element
                parent2.insertBefore(el1, next2);
            } else {
                // I annat fall, lägg till el1 som barn till el2:s tidigare förälder
                parent2.appendChild(el1);
            }
        }
    }

    function incrementMoves() {
        let moves = parseInt(movesTextEl.textContent);

        // Öka antalet drag
        moves++;

        // Uppdatera texten vid "Antal drag:"
        movesTextEl.textContent = moves;

        if (checkIfWinner()) {
            winMovesEl.textContent = moves;
            openModal();
        }
    }

    function checkIfWinner() {
       const size = boardEl.rows.length;

        // Starta räknaren på 1
        let count = 1;

        const tilesEl = boardEl.getElementsByTagName("td");

        while (count < tilesEl.length){
            if(tilesEl[count - 1].textContent != count){
                return false;
            }
            count++;
        }
        // Om vi har tagit oss hela vägen genom brädet utan fel har spelaren vunnit
        return true;
    }

    function generateTiles(size){
        // Skapa en array som ska inrymma våra slumptal
        let randomArray = [];

        // Räkna ut maxvärdet för brickorna genom att multiplicera storleksvariabeln (size) med sig själv
        const max = size * size;

        // Så länge denna array har färre element än maxvärdet,
        // fortsätt att fylla på med slumptal
        while (randomArray.length < max) {
            // Skapa ett slumptal med Math-metoden random() som ger ett värde mellan 0 och 1 (dock aldrig exakt 1)
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            // Multiplicera detta med antalet brickor vi vill skapa och använd avrundning nedåt (Math.floor)
            // för att slutligen få ett slumptal mellan 0 och max (som vi kan återanvända här)
            const randomNumber = Math.floor(Math.random() * max);
            // Kontrollera om det skapade slumptalet redan finns i vår slumptalsarray med array-metoden indexOf, vilken
            // returnerar index för positionen av siffran om den redan existerar och -1 om siffran inte kan hittas.
            if (randomArray.indexOf(randomNumber) === -1) {
                // Om talet inte redan finns – det vill säga att det är unikt – 
                // lägg till det i slutet av arrayen med push-metoden
                randomArray.push(randomNumber);
            }
        }

        // Skapa en tom tvådimensionell array av korrekt storlek
        // för att rymma alla siffror som finns på spelplanen
        const tileArray = new Array(size);
        for (let i = 0; i < size; i++) {
            tileArray[i] = new Array(size);
        }

        // Lägg till slumptalen i den tvådimensionella arrayen
        let tileCount = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                tileArray[i][j] = randomArray[tileCount];
                tileCount++;
            }
        }

        return tileArray;
    }

    function setupBoard() {
        // Hämta tabellen som utgör spelbrädet (Applikationsgemensam variabel)
        boardEl = document.getElementById("board");

        boardEl.addEventListener("moveError", function(){
            const el = this;
            el.className = "wrong-move";
            setTimeout(function() {
                el.className = "";
            }, 200);
        });
    }

    function setupControls() {
        // Hämta knappen som startar ett nytt spel
        const startButtonEl = document.getElementById("startGame");

        // Bind knappens klick-händelse till funktionen startNewGame
        startButtonEl.addEventListener("click", startNewGame);

        // Hämta elementet som visar antal drag (Applikationsgemensam variabel)
        movesTextEl = document.getElementById("moves");

        // Hämta elementet som innehåller siffran i speltiteln (Applikationsgemensam variabel)
        titleNumberEl = document.getElementById("titleNumber");

        // Hämta input-elementet som styr storleken på brädet (Applikationsgemensam variabel)
        sizeInputEl = document.getElementById("boardSize");

        // Hämta span-elementet som ligger bredvid "Storlek:" i gränssnittet (Applikationsgemensam variabel)
        sizeDisplayEl = document.getElementById("currentSize");

        // Skapa en händelselyssnare för ändring av värdet
        sizeInputEl.addEventListener("input", function() {
            // Sätt texten ovanför storleksväljaren till storlek x storlek
            sizeDisplayEl.innerHTML = this.value + " &times " + this.value;
        });
    }

    function setupModal() {
        // Hämta div-elementet som utgör modalfönstret (Applikationsgemensam variabel)
        winModalEl = document.getElementById("winModal");

        // Hämta span-elementet som innehåller antalet drag som krävdes för vinst (Applikationsgemensam variabel)
        winMovesEl = document.getElementById("winMoves");

        // Skapa ett nytt element som ska agera som en
        // bakgrund till modalen, vilken täcker över hela sidan (Applikationsgemensam variabel)
        overlayEl = document.createElement("div");
        overlayEl.className = "overlay";

        // Hämta knappen med texten "Börja om"
        const restartButtonEl = document.getElementById("restartGame");

        // Skapa en händelselyssnare för klick på knappen
        restartButtonEl.addEventListener("click", function() {
            // Stäng modalfönstret
            closeModal();

            // Starta ett nytt spel
            startNewGame();
        });
    }

    function openModal() {
        // Ta bort klassen "off-screen" som lägger modalfönstret
        // utanför webbläsarfönstret     
        winModalEl.classList.remove("off-screen");

        // Lägg till elementet som täcker över sidan bakom modalfönstret
        document.body.appendChild(overlayEl);
    }

    function closeModal() {
        // Lägg till klassen "off-screen" som lägger modalfönstret
        // utanför webbläsarfönstret
        winModalEl.classList.add("off-screen");

        // Ta bort elementet som täcker över sidan bakom modalfönstret
        document.body.removeChild(overlayEl);
    }

    window.addEventListener("load", init); // Anropa init() när sidan har laddats in
})();