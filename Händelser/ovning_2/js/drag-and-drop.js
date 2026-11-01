document.addEventListener('DOMContentLoaded', function() {

    const draggables = document.querySelectorAll('.draggable');
    const dragTargets = document.querySelectorAll('.drag-target');
    let currentlyDragged = null;

    draggables.forEach(function(el) {
        el.addEventListener('dragstart', dragStart);
        el.addEventListener('dragend', dragEnd);
    });

    dragTargets.forEach(function(el) {
        el.addEventListener('dragover', dragOver);
        el.addEventListener('dragenter', dragEnter);
        el.addEventListener('dragleave', dragLeave);
        el.addEventListener('drop', dragDrop);
    });
    
    function dragStart() {
        currentlyDragged = this;
        setTimeout(function() {
            currentlyDragged.classList.add('invisible');
        }, 0);
    }

    function dragOver(evt) {
        evt.preventDefault();
    }

    function dragEnter(evt) {
        evt.preventDefault();
        this.classList.add('hovered');
    }

    function dragLeave() {
        this.classList.remove('hovered');
    }

    function dragDrop() {
        this.classList.remove('hovered');

        const existing = this.querySelector('.draggable');
        if (existing) {
            currentlyDragged.parentNode.append(existing);
        }
        this.append(currentlyDragged);
    }

    function dragEnd() {
        this.classList.remove('invisible');
    }
});
