// Configuration object: Map keys to CSS selectors
const keyMap = {
    'A': 'img[src="/static/img/test/A.jpg"]',
    'S': 'img[src="/static/img/test/B.jpg"]',
    'D': 'img[src="/static/img/test/C.jpg"]',
    'J': 'img[src="/static/img/test/back.png"]',
    'K': 'img[src="/static/img/test/next.png"]',
    'Q': 'button.help-button-1', // Ayuda
    'W': 'button.btn-success', // Lamina
    'E': 'div.sweet-content', // to exit Ayuda - nah doesn't work
    'R': 'button.btn-danger', // Audioexplicacion
    'T': 'button.btn-info', // Videoexplicacion
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
    if (keyMap[key]) {
        const element = document.querySelector(keyMap[key]);
        simulateClick(element);
    }
});

alert('Keyboard accessibility enabled! Press configured keys to simulate clicks.');
