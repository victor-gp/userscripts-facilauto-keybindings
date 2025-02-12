// Function to simulate a click on an element
function simulateClick(element) {
    if (element) {
        element.click();
    }
}

// Function to find the image element by its src attribute
function findImageBySrc(src) {
    return document.querySelector(`img[src="${src}"]`);
}

// Add a keydown event listener to the document
document.addEventListener('keydown', function(event) {
    switch (event.key.toUpperCase()) {
        case 'A':
            simulateClick(findImageBySrc('/static/img/test/A.jpg'));
            break;
        case 'S':
            simulateClick(findImageBySrc('/static/img/test/B.jpg'));
            break;
        case 'D':
            simulateClick(findImageBySrc('/static/img/test/C.jpg'));
            break;
        case 'J':
            simulateClick(findImageBySrc('/static/img/test/back.png'));
            break;
        case 'K':
            simulateClick(findImageBySrc('/static/img/test/next.png'));
            break;
    }
});

alert('Keyboard accessibility enabled! Press A, S, D, J, or K to simulate clicks.');
