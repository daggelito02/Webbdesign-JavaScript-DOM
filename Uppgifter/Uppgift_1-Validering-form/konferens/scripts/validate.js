// Validera formulär 
// Jag la till lite extra validering till uppgiften för att lära mig.
// Den extra valideringen kollar att förnamn och efternamn bara innehåller
// bokstäver, mellanslag och bindestreck samt är minst 2 tecken långa.

const conferenceRegForm = document.getElementById("registration_form");
conferenceRegForm.addEventListener("submit", validate, false);

function validate(e) {

    //Skapa en lista med alla fält som ska valideras.
    const validateFields = [
        { id: "field_firstname", name: "förnamn",  validate: validateName },
        { id: "field_lastname",  name: "efternamn", validate: validateName },
        { id: "field_email", name: "epostadress", validate: validateEmail },
        { id: "field_organisation", name: "organisationsnamn", validate: validateRequired },
    ];

    // Om användaren har valt ”Föreläsning” eller ”Seminarium” som presentationstyp
    // måste även fältet ”Titel på föreläsning/seminarium” vara ifyllt. 
    // Lägg till titel-valideringen till listan validateFields.
    const presentationType = document.querySelector('input[name="pres_type"]:checked').value;
    if (presentationType === "lecture" || presentationType === "seminar") {
        validateFields.push({ id: "field_pres_title", name: "titel på föreläsning/seminarium", validate: validateRequired });
    }

    // Meddelandet läggs sist i validateFields-listan, efter titeln, så att det följer ordningen i formuläret
    validateFields.push({ id: "field_message", name: "meddelande", validate: validateMessage });

    // Samla alla valideringsfel i en ny lista "messageList"
    const messageList = [];
    let firstInvalidField = null;

    // Loopa över fälten
    for (const field of validateFields) {
        const inputElement = document.getElementById(field.id);
        const errorMessage = field.validate(inputElement.value, field.name);

        // Ge första valideringsfelet fokus efter alert-meddelandet.
        if (errorMessage) {
            messageList.push(errorMessage);
            if (firstInvalidField === null) {
                firstInvalidField = inputElement;
            }
        }
    }
    // Om valideringsfel, visa felet med alert.
    if (messageList.length > 0) { 
        e.preventDefault();
        const txt1 = "Innan du kan skicka konferensanmälan behöver ";
        const txt2 = "du rätta till följande fel. Se informationen nedan:";
        const message = txt1 + txt2; // två const för att inte få så lång rad
        alert(message + "\n\n" + messageList.join("\n"));
        firstInvalidField.focus();
    }
}

function validateName(value, fieldName) {

    // Ta bort mellanslag, tab mm
    const name = value.trim();

    // Ändra första bokstaven till stor om ordet kommer först i meningen
    const fieldNameFirst = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    if (name.length === 0) {
        return `Du behöver skriva ett ${fieldName}`;
    }

    if (name.length < 2) {
        return `${fieldNameFirst} måste ha minst två bokstäver`;
    }

    // Ville testa att validera lite exta med regex även om det inte var med i kravet.
    // Kollar dom vanligaste latinska bokstäverna och bildesträck + mellanslag.
    // Testead mig fram och prövade med https://regex101.com/ till detta :-)
    if (!/^[a-zA-ZÀ-ÿ -]+$/.test(name)) {
        return `${fieldNameFirst} får bara innehålla bokstäver, mellanslag och bindestreck`;
    }

    return "";
}

function validateEmail(value, fieldName) {

    // Ta bort mellanslag (före och efter), tab mm
    const email = value.trim();

    // Ändra första bokstaven till stor om ordet kommer först i meningen
    const fieldNameFirst = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    if (email.length === 0) {
        return `Du behöver skriva en ${fieldName}`;
    }

    const pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,}$/;

    if (!pattern.test(email)) {
        return `${fieldNameFirst} är inte giltig, till exempel "namn@exempel.se"`;
    }

    return "";
}

function validateRequired(value, fieldName) {

    // Ta bort mellanslag, tab mm
    const titel = value.trim();

    if (titel.length === 0) {
        return `Du behöver fylla i ${fieldName}`;
    }

    return "";
}
// Meddelandet är frivilligt, max 200 tecken
function validateMessage(value, fieldName) {
    
    const maxLength = 200;
    // Räkna alla tecken som skrivits, även mellanslag i början och slutet
    if (value.length > maxLength) {
        return `Ditt ${fieldName} får högst vara ${maxLength} tecken (nu ${value.length})`;
    }

    return "";
}
