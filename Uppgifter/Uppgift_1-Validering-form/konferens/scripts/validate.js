/* Validerar formulärets xxxx */

var conferenceRegForm = document.getElementById("registration_form");
conferenceRegForm.addEventListener("submit", validate, false);

function validate(e) {
    let valid = true;

    const inputFirstname = document.getElementById("field_firstname");
    const firstnameFalse = validateName(inputFirstname.value, "förnamn");

    showError(inputFirstname, firstnameFalse);

    if (firstnameFalse) {
        valid = false;
        inputFirstname.focus();
    }

    const inputLastname = document.getElementById("field_lastname");
    const lastnameFalse = validateName(inputLastname.value, "efternamn");

    showError(inputLastname, lastnameFalse);

    if (lastnameFalse) {
        valid = false;
        inputLastname.focus();
    }

    const inputEmail =document.getElementById("field_email");
    const emailFalse = validateName(inputEmail.value, "epostadress");

    showError(inputEmail, emailFalse);

    if (emailFalse) {
        valid = false;
        inputEmail.focus();
    }

    if (!valid) {
        e.preventDefault();
    }
}

function validateName(value, fieldName) {
    const name = value.trim();

    if (name.length === 0) {
        return `Du behöver skriva ett ${fieldName}`;
    }

    if (name.length < 2) {
        return `${fieldName} måste ha minst två bokstäver`;
    }

    if (!/^[A-Za-zÅÄÖåäö]+$/.test(name)) { 
        return `${fieldName} får bara innehålla bokstäverna A–Ö`;
    }

    return "";
}

function showError(inputElement, message) {
    // Hitta label som hör till fältet
    const label = document.querySelector(`label[for="${inputElement.id}"]`);

    // Ta bort ett tidigare felmeddelande så att de inte staplas
    const old = label.nextElementSibling;
    if (old && old.classList.contains("error-message")) {
        old.remove();
    }

    // Inget fel: avsluta här
    if (!message) {
        return;
    }

    // Skapa span och lägg den direkt efter label
    const span = document.createElement("span");
    span.className = "error-message";
    span.textContent = message;
    label.insertAdjacentElement("afterend", span);
}
