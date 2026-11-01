/* Validerar formulärets tre inmatningsfält: firstname, lastname och email. Kontrollerar att någon 
 * text har angivits. Om något fält inte har fyllts i returnerar funktionen falskt vilket resulterar i att 
 * forumläret inte skickas. Slutligen upppmanas användaren att ange om de vill skicka väg sin registrering eller inte.
 * Endast om alla fält är ifyllda och användaren har svarat ja kommer funktionen att returerna sant vilket leder till att 
 * formuläret skickas iväg. */

function validate(evt) {
    var firstname = document.getElementById("firstname").value;
    var valid = true;

    if (firstname.length === 0) {
        alert("Du måste ange ett förnamn");
        document.getElementById("firstname");
        evt.preventDefault();
    }

    var lastname = document.getElementById("lastname").value;
    if (lastname.length === 0) {
        alert("Du måste ange ett efternamn");
        evt.preventDefault();
    }

    var email = document.getElementById("email").value;
    if (email.length === 0) {
        alert("Du måste ange en epostadress");
        evt.preventDefault();
    }
}

var registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", validate, false);