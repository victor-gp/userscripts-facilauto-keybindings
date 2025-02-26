// ==UserScript==
// @name        FacilAuto Keys
// @namespace   Violentmonkey Scripts
// @match       https://alumno.examentrafico.com/
// @grant       none
// @version     1.0
// @author      victor-gp
// @description Adds keyboard a11y to the FacilAuto tests page.
// ==/UserScript==

const script_id = 'facilauto-keys'

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

function isTargetPage() {
    const urlMatch = window.location.hash !== '#/test/block/test/exam/174/0'
    if (!urlMatch) return false;
    const contentMatch = document.querySelector('div.test-box-top') !== null;
    return contentMatch;
}

function handleKeydown(event) {
    const key = event.key.toUpperCase();

    if (keyFunctionMap[key]) {
        keyFunctionMap[key]();
    }
    else if (keySelectorMap[key]) {
        const element = document.querySelector(keySelectorMap[key]);
        simulateClick(element);
    }
};

function simulateClick(element) {
    if (element) {
        element.click();
    }
}

function handlePageChange() {
    if (isTargetPage()) {
        document.addEventListener('keydown', handleKeydown);
        console.debug(`${script_id}: load`);
    } else {
        document.removeEventListener('keydown', handleKeydown);
        console.debug(`${script_id}: remove`);
    }
}

let lastUrl = window.location.href;
function checkUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        handlePageChange();
    }
}

handlePageChange();

const observer = new MutationObserver(checkUrlChange);
const config = { childList: true, subtree: true };
observer.observe(document.body, config);
