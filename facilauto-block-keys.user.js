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
