function setupListTree() {
    if (!document.getElementById || !document.createElement) return false;

    const tree_root = document.getElementById("expand-list-tree");
    if (!tree_root) return false;
    
    const branches = tree_root.getElementsByTagName("ul");
    for (let i = 0; i < branches.length; i++) {
        const branch = branches[i].parentNode;
        branch.className = "closed";
        
        const expander = document.createElement("a");
        expander.setAttribute("href", "#");
        expander.className = "expander-closed";
        expander.setAttribute("title", "Öppna");
        expander.setAttribute("aria-expanded", "false");
        
        branch.insertBefore(expander, branch.firstChild);

        const toggleBranch = function(evt) {
            evt.preventDefault();
            if (branch.classList.contains("closed")) {
                branch.classList.remove("closed");
                branch.classList.add("opened");
                expander.className = "expander-opened";
                expander.setAttribute("title", "Stäng");
                expander.setAttribute("aria-expanded", "true");
            } else {
                branch.classList.remove("opened");
                branch.classList.add("closed");
                expander.className = "expander-closed";
                expander.setAttribute("title", "Öppna");
                expander.setAttribute("aria-expanded", "false");
            }
        };

        expander.addEventListener("click", toggleBranch, false);
        expander.nextElementSibling.addEventListener("click", toggleBranch, false);
    }
}

setupListTree();