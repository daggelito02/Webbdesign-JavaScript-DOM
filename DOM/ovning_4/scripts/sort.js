document.addEventListener('DOMContentLoaded', function() {
    //Hämta ut knappen för namnlistan och bind sorteringsfunktionen
    const knapp = document.getElementById('sortera');
    knapp.addEventListener('click', sortera);

    //Hämta ut knappen för kontaktlistan och bind sorteringsfunktionen
    const kontaktKnapp = document.getElementById('sortera-kontakter');
    kontaktKnapp.addEventListener('click', sorteraKontakter);
});

function sortera() {
    const lista = document.getElementById('namnlista');
    const poster = Array.from(lista.querySelectorAll('li'));

    poster.sort(function(a, b) {
        return a.textContent.localeCompare(b.textContent, 'sv');
    });

    // Flytta varje li-element till slutet av ul-elementet i den sorterade ordningen.
    // appendChild() tar bort elementet från dess nuvarande plats och lägger det sist.
    poster.forEach(function(li) {
        lista.appendChild(li);
    });
}

function sorteraKontakter() {
    const kontaktlista = document.getElementById('kontaktlista');
    const kontakter = Array.from(kontaktlista.querySelectorAll('li'));

    kontakter.sort(function(a, b) {
        const efternamn_a = a.querySelector('.efternamn').textContent.trim();
        const efternamn_b = b.querySelector('.efternamn').textContent.trim();
        return efternamn_a.localeCompare(efternamn_b, 'sv');
    });

    // Flytta varje li-element till slutet av ul-elementet i den sorterade ordningen.
    // appendChild() tar bort elementet från dess nuvarande plats och lägger det sist.
    kontakter.forEach(function(li) {
        kontaktlista.appendChild(li);
    });
}