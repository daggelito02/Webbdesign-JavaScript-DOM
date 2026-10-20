function add() {
    const headingText = document.getElementById("headingInput").value;
    const newHeading = document.createElement("h2");
    newHeading.setAttribute("style", "color: orange;");
    const textNode = document.createTextNode(headingText);

    newHeading.appendChild(textNode);
    const bodyElement = document.body;

    bodyElement.appendChild(newHeading);
}

function add_textContent() {
    const headingText = document.getElementById("headingInput").value;
    const newHeading = document.createElement("h2");
    
    // Enklare sätt att sätta text direkt
    newHeading.textContent = headingText;
    newHeading.setAttribute("style", "color: orange;");

    document.body.appendChild(newHeading);
}
const addButton = document.getElementById("add-heading");
addButton.addEventListener("click", add_textContent, false);