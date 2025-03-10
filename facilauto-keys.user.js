// ==UserScript==
// @name            FacilAuto Keys
// @namespace       victor-gp.dev
// @description     Añade navegación por teclado en algunas páginas de la aplicación web de FacilAuto (test, selección de test).
// @match           https://alumno.examentrafico.com/
// @grant           none
// @author          victor-gp
// @license         MIT
// @homepageURL     https://github.com/victor-gp/userscripts-facilauto-keybindings
// @supportURL      https://github.com/victor-gp/userscripts-facilauto-keybindings/issues
// @contributionURL
// @version         1.0.1
// ==/UserScript==

(function testKeys() {
    'use strict';

    const script_id = 'facilauto-test-keys'

    // Configuration: Map keys to CSS selectors
    const keySelectorMap = {
        'A': 'img[src="/static/img/test/A.jpg"]',
        'S': 'img[src="/static/img/test/B.jpg"]',
        'D': 'img[src="/static/img/test/C.jpg"]',
        'J': 'img[src="/static/img/test/back.png"]',
        'K': 'img[src="/static/img/test/next.png"]',
        'L': 'img[src="/static/img/test/end.png"]',
        'W': 'button.help-button-1', // Ayuda
        'E': 'button:has(svg.fa-images)', // Lamina
        'R': 'button:has(svg.fa-volume-down)', // Audioexplicacion
        'T': 'button:has(svg.fa-play)', // Videoexplicacion
        'Enter': '.sweet-modal.is-visible button.btn-default', // Modal - White button
        'Backspace': '.sweet-modal.is-visible button.btn-danger', // Modal - Red button
    };

    // Configuration: Map keys to functions
    const keyFunctionMap = {
        'Q': () => simulateClick(document.elementFromPoint(0, 0)), // Exit modal
    };

    function isTargetPage() {
        const urlMatch = window.location.hash !== '#/test/block/test/exam/174/0';
        if (!urlMatch) return false;
        const contentMatch = document.querySelector('div.test-box-top') !== null;
        return contentMatch;
    }

    function handleKeydown(event) {
        let key = event.key;
        // normalize letter keys
        if (/^[A-Za-z]$/.test(key)) {
            key = key.toUpperCase();
        }

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
})();

(function blockKeys() {
    "use strict";

    const script_id = "facilauto-block-keys";

    // Configuration: Map keys to CSS selectors _to focus_
    const keySelectorMap = {
        'H': 'div.tests-block-item > .fail ~ .has-tooltip', // First failed test
        'L': 'div.tests-block-item > div:first-child:not(.fail):not(.success) ~ .has-tooltip', // First not-taken test
    };

    // Configuration: Map keys to functions
    const keyFunctionMap = {
        'A': makeButtonsTabbable,
        'Enter': () => simulateClick(document.activeElement),
        'J': focusNextTest,
        'K': focusPreviousTest,
        // 'Tab': next button (implicit)
    };

    function isTargetPage() {
        const urlHashRegex = new RegExp("^#/test/block/");
        const urlMatch = window.location.hash.match(urlHashRegex);
        if (!urlMatch) return false;
        const contentMatch = document.querySelector("div.tests-index") !== null;
        return contentMatch;
    }

    let tabbableElements;
    function makeButtonsTabbable() {
        // heuristic: elements with a tooltip seem to be buttons
        const tooltipElements = document.querySelectorAll(".has-tooltip");
        tabbableElements = Array.from(tooltipElements).filter(el => el.checkVisibility());
        tabbableElements.forEach((element) => {
            element.setAttribute("tabindex", "0");
            // element.style.border = "1px solid red";
        });
        tabbableElements[0].focus();
    }

    function focusNextTest() {
        const currentIndex = tabbableElements.indexOf(document.activeElement);
        if (currentIndex !== -1) {
            tabbableElements[currentIndex + 4]?.focus();
        } else {
            tabbableElements[0].focus();
        }
        document.activeElement.scrollIntoView({ behavior: 'smooth', block: "center" });
    }

    function focusPreviousTest() {
        const currentIndex = tabbableElements.indexOf(document.activeElement);
        if (currentIndex !== -1) {
            tabbableElements[currentIndex - 4]?.focus();
        } else {
            tabbableElements[0].focus();
        }
        document.activeElement.scrollIntoView({ behavior: 'smooth', block: "center" });
    }

    function handleKeydown(event) {
        let key = event.key;
        // normalize letter keys
        if (/^[A-Za-z]$/.test(key)) {
            key = key.toUpperCase();
        }

        if (keyFunctionMap[key]) {
            keyFunctionMap[key]();
        } else if (keySelectorMap[key]) {
            document.querySelector(keySelectorMap[key]).focus();
        }
    }

    function simulateClick(element) {
        if (element) {
            element.click();
        }
    }

    function waitUntil(condFn, execFn) {
        setTimeout(() => {
            if (condFn()) {
                execFn();
            } else {
                waitUntil(condFn, execFn)
            }
        }, 50)
    }

    function handlePageChange() {
        if (isTargetPage()) {
            const isPageLoaded = () => {
                const tooltipElements = document.querySelectorAll(".has-tooltip");
                return tooltipElements.length !== 0;
            };
            const setUp = () => {
                makeButtonsTabbable();
                document.addEventListener("keydown", handleKeydown);
                console.debug(`${script_id}: load`);
            };
            waitUntil(isPageLoaded, setUp);
        } else {
            document.removeEventListener("keydown", handleKeydown);
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
})();
