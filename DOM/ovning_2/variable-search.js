const addButton = document.getElementById("add-search-field");
addButton.addEventListener("click", addInput, false);

function addInput(evt) {
    evt.preventDefault();   
    const fieldsetElement = document.getElementById("search-fields");

    const inputGroupElement = document.createElement("div");
    inputGroupElement.className = "input-group mb-3"; 

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "Sökord");
    inputElement.className = "form-control";
    inputGroupElement.appendChild(inputElement);

    const buttonElement = document.createElement("button");
    buttonElement.className = "btn btn-danger";
    buttonElement.textContent = "Ta bort sökfält";
    buttonElement.addEventListener("click", removeInputGroup, false);

    const inputAppendElement = document.createElement("div");
    inputAppendElement.className = "input-group-append";

    inputAppendElement.appendChild(buttonElement);

    inputGroupElement.appendChild(inputAppendElement);

    fieldsetElement.appendChild(inputGroupElement);
}

function removeInputGroup() {
    const inputAppendElement = this.parentNode;
    const inputGroup = inputAppendElement.parentNode;
    const parentElement = inputGroup.parentNode;
    parentElement.removeChild(inputGroup);
}

function search(evt) {
    evt.preventDefault();

    const fieldsetElement = document.getElementById("search-fields");
    const inputs = fieldsetElement.querySelectorAll("input[type='text']");

    let combinedSearch = "";
    inputs.forEach(function(input) {
        combinedSearch += input.value + " ";
    });

    const searchListElement = document.getElementById("search-list");

    const listItemElement = document.createElement("li");
    listItemElement.className = "list-group-item";
    listItemElement.textContent = combinedSearch;

    searchListElement.appendChild(listItemElement);
}

const searchButton = document.getElementById("search");
searchButton.addEventListener("click", search, false);