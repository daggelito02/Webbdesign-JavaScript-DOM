// OBS! Ändra inte i denna fil, skriv din egen valideringskod i validate.js

(function(){ // IIFE

    // Parse data from query string
    const url_string = window.location.href;
    const url = new URL(url_string);

    // Read data from query string
    let name = url.searchParams.get("field_firstname") + " " + url.searchParams.get("field_lastname");
    let email = url.searchParams.get("field_email");
    let organisation = url.searchParams.get("field_organisation");

    let presentation_types = {
        "lecture": "Föreläsning",
        "seminar": "Seminarium",
        "discussion": "Diskussion"
    }
    let pres_type = url.searchParams.get("pres_type");
    if (pres_type in presentation_types) {
        pres_type_display = presentation_types[pres_type];
    }
    let title = url.searchParams.get("field_pres_title");
    let message = url.searchParams.get("field_message");

    // Display data
    document.getElementById("name_display").textContent = name;
    document.getElementById("email_display").textContent = email;
    document.getElementById("organisation_display").textContent = organisation;
    document.getElementById("pres_type_display").textContent = pres_type_display;

    if (pres_type === "discussion") {
        document.getElementById("title_opt").style = "display: none;";
    } else {
        document.getElementById("title_display").textContent = title;
    }

    if (message !== "") {
        document.getElementById("message_display").textContent = message;
    } else {
        document.getElementById("message_opt").style = "display: none";
    }

})();