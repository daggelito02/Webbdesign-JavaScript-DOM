document.addEventListener('DOMContentLoaded', function() {
    const filterknappar = document.getElementById('filterknappar');
    filterknappar.addEventListener('click', hanteraFilter);
});

function hanteraFilter(evt) {
    const knapp = evt.target;
    if (knapp.tagName !== 'BUTTON') return;

    const valtFilter = knapp.dataset.filter;

    // Flytta klassen "aktiv" till den klickade knappen
    document.querySelectorAll('#filterknappar button').forEach(function(k) {
        k.classList.remove('aktiv');
    });
    knapp.classList.add('aktiv');

        // Visa eller dölj varje råvara beroende på valt filter
    document.querySelectorAll('#produkter li').forEach(function(produkt) {
        if (valtFilter === 'alla' || produkt.dataset.kategori === valtFilter) {
            produkt.classList.remove('dold');
        } else {
            produkt.classList.add('dold');
        }
    });
}

