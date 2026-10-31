window.addEventListener("DOMContentLoaded", function(){
    const params = new URLSearchParams(window.location.search);
    const comment = params.get("comment");
    const commentEl = document.getElementById("comment-display");
    commentEl.textContent = comment;
}, false);