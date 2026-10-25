function averageValue(cells) {
    let sum = 0;
    for (let i = 1; i < cells.length - 1; i++) {
        const currentValue = cells[i].textContent;
        sum = sum + parseInt(currentValue);
    }
    
    const average = sum / (cells.length - 2);
    return average;
}

function calculateAverage() {
    const table = document.getElementById("temperature-table");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        const averageTemp = averageValue(cells);
        const averageCell = cells[cells.length - 1];
        averageCell.textContent = averageTemp;
    }
}

function findTemperatures() {
    clearFormatting();
    const minTemp = parseInt(document.getElementById("min-temp").value);
    const table = document.getElementById("temperature-table");
    const rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        if (matchesTemp(minTemp, cells)) {
            rows[i].className = "markedRow";
        }
    }
}

function matchesTemp(minTemp, cells) {
   let hasValue = false;
    for (let i = 1; i < cells.length - 1; i++) {
        const currentValue = parseInt(cells[i].textContent);
        if (currentValue >= minTemp) {
            hasValue = true;
            cells[i].className = "markedCell";
        }
    }
    return hasValue;
}

function clearFormatting() {
    const table = document.getElementById("temperature-table");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        rows[i].className = "";
        const cells = rows[i].getElementsByTagName("td");
        for (let j = 1; j < cells.length - 1; j++) {
            cells[j].className = "";
        }
    }
}

calculateAverage();

const searchButton = document.getElementById("show-value");
searchButton.addEventListener("click", findTemperatures, false);

const clearButton = document.getElementById("clear-formatting");
clearButton.addEventListener("click", clearFormatting, false);