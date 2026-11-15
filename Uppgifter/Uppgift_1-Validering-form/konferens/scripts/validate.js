/* Validera formulär */

var conferenceRegForm = document.getElementById("registration_form");
conferenceRegForm.addEventListener("submit", validate, false);

function validate(e) {

    //Skapa en lista med alla fält som ska valideras.
    const validateFields = [
        { id: "field_firstname", name: "förnamn",  validate: validateName },
        { id: "field_lastname",  name: "efternamn", validate: validateName },
        { id: "field_organisation", name: "organisationsnamn", validate: validateName },
        { id: "field_email", name: "epostadress", validate: validateEmail },
    ];

    // Om användaren har valt ”Föreläsning” eller ”Seminarium” som presentationstyp
    // måste även fältet ”Titel på föreläsning/seminarium” vara ifyllt. 
    // Lägg till det titel-valideringen till listan validateFields.
    const presentationType = document.querySelector('input[name="pres_type"]:checked').value;
    if (presentationType === "lecture" || presentationType === "seminar") {
        validateFields.push({ id: "field_pres_title", name: "titel på föreläsning/seminarium", validate: validateRequired });
    }

    // Meddelandet läggs sist i validateFields-listan, efter titeln, så att det följer ordningen i formuläret
    validateFields.push({ id: "field_message", name: "meddelande", validate: validateMessage });

    // Samla alla valideringsfel i en ny lista "messageList"
    const messageList = [];
    let setFocusFirstElement= false;

    // Lopa över felen
    for (const field of validateFields) {
        const inputElement = document.getElementById(field.id);
        const validateMessage = field.validate(inputElement.value, field.name);

        // Ge första valideringsfelet focus efter alert-medelandet.
        if (validateMessage) {
            messageList.push(validateMessage);
            if (setFocusFirstElement === false) {
                setFocusFirstElement = inputElement;
            }
        }
    }

    if (messageList.length > 0) {
        const txt1 = "Innan du kan skicka konferensanmälan behöver ";
        const txt2 = "du rätta till följande fel. Se informationen nedan:";
        const message = txt1 + txt2
        e.preventDefault();
        alert(message + "\n\n" + messageList.join("\n"));
        console.log("Fokus på första elementet med fel: " + setFocusFirstElement);
        setFocusFirstElement.focus();
    }
}

function validateName(value, fieldName) {

    // Ta bort mellanslag, tab mm
    const name = value.trim();

    // Ändra första bokstaven till stor om ordert kommer först i meningen
    const fieldNameFirst = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    if (name.length === 0) {
        return `Du behöver skriva ett ${fieldName}`;
    }

    if (name.length < 2) {
        return `${fieldNameFirst} måste ha minst två bokstäver`;
    }
    // Hittade denna regex på https://stackoverflow.com/questions/12018245/regex-to-allow-only-letters-a-z-and-space
    // Godkänner både stora och små bokstäver och även ÅÄÖåäö
    if (!/^[A-Za-zÅÄÖåäö]+$/.test(name)) { 
        return `${fieldNameFirst} får bara innehålla bokstäverna A–Ö`;
    }

    return "";
}

function validateEmail(value, fieldName) {

    // Ta bort mellanslag, tab mm
    const email = value.trim();

    // Ändra första bokstaven till stor om ordert kommer först i meningen
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
    const message = value.trim();

    if (message.length > maxLength) {
        return `Ditt ${fieldName} får vara högst ${maxLength} tecken (nu ${message.length})`;
    }

    return "";
}
