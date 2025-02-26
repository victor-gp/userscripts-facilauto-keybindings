// ==UserScript==
// @name        FacilAuto Block Keys
// @namespace   Violentmonkey Scripts
// @match       https://alumno.examentrafico.com/
// @grant       none
// @version     1.0
// @author      victor-gp
// @description Adds keyboard a11y to the FacilAuto block (tests list) page.
// ==/UserScript==

(function() {
    ("use strict");

    const script_id = "facilauto-block-keys";

    // Configuration: Map keys to CSS selectors _to focus_
    const keySelectorMap = {
        'H': 'div.tests-block-item > .fail ~ .has-tooltip', // First failed test
        'J': 'img[src="/static/img/test/back.png"]', //todo: Next test
        'K': 'img[src="/static/img/test/next.png"]', //todo: Previous test
        'L': 'div.tests-block-item > div:first-child:not(.fail):not(.success) ~ .has-tooltip', // First not-taken test
        // 'Tab': next button (implicit)
    };

    // Configuration: Map keys to functions
    const keyFunctionMap = {
        'A': makeButtonsNavigable,
        'Enter': () => simulateClick(document.activeElement),
    };

    function isTargetPage() {
        const urlHashRegex = new RegExp("^#/test/block/");
        const urlMatch = window.location.hash.match(urlHashRegex);
        if (!urlMatch) return false;
        const contentMatch = document.querySelector("div.tests-index") !== null;
        return contentMatch;
    }

    function makeButtonsNavigable() {
        // heuristic: elements with a tooltip seem to be buttons
        const tooltipElements = document.querySelectorAll(".has-tooltip");
        tooltipElements.forEach((element) => {
            if (!element.checkVisibility()) return;
            element.setAttribute("tabindex", "0");
            // element.style.border = "1px solid red";
        });
        const firstNavigableElement = document.querySelector('[tabindex="0"]');
        firstNavigableElement.focus();
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

    function handlePageChange() {
        if (isTargetPage()) {
            //todo: fix
            // doesn't work on page load, because the app hasn't spawned them yet.
            // not even with a setTimeout of 2s.
            // alt: manual activation with the 'A' key.
            // makeButtonsNavigable();
            document.addEventListener("keydown", handleKeydown);
            console.debug(`${script_id}: load`);
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
