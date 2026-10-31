(function () { // IIFE 

    const commentField = document.getElementById("comment");
    const numCharsEl = document.getElementById("num-chars");

    commentField.addEventListener("input", updateChars, false);

    function updateChars(evt) {
       const chars = this.value.length;
       numCharsEl.textContent = chars;
        if (chars > 200) {
            numCharsEl.className = "warning";
        } else {
            numCharsEl.className = "";
        }
    }

    const form = document.getElementById("comment-form");
    form.addEventListener("submit", sendForm, false);

    function sendForm(evt) {
        if (commentField.value.length === 0) {
            evt.preventDefault();
            alert("Du har inte fyllt i någon kommentar.");
       }
   }

})();