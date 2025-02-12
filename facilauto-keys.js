// Configuration: Map keys to CSS selectors
const keySelectorMap = {
    'A': 'img[src="/static/img/test/A.jpg"]',
    'S': 'img[src="/static/img/test/B.jpg"]',
    'D': 'img[src="/static/img/test/C.jpg"]',
    'J': 'img[src="/static/img/test/back.png"]',
    'K': 'img[src="/static/img/test/next.png"]',
    'W': 'button.help-button-1', // Ayuda
    'E': 'button.btn-success', // Lamina
    'R': 'button.btn-danger', // Audioexplicacion
    'T': 'button.btn-info', // Videoexplicacion
};

// Configuration: Map keys to functions
const keyFunctionMap = {
    'Q': () => simulateClick(document.elementFromPoint(0, 0)), // Exit modal
};

// Function to simulate a click on an element
function simulateClick(element) {
    if (element) {
        element.click();
    }
}

// Add a keydown event listener to the document
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();

    // Check if the key is in the keyFunctionMap
    if (keyFunctionMap[key]) {
        keyFunctionMap[key]();
    }
    // Otherwise, check if the key is in the keyMap
    else if (keySelectorMap[key]) {
        const element = document.querySelector(keySelectorMap[key]);
        simulateClick(element);
    }
});

alert('Keyboard accessibility enabled! Press configured keys to simulate clicks.');
