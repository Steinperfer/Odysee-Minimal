// ==UserScript==
// @name         Odysee Layout + Minimal Combined (Scroll Fix)
// @namespace    http://tampermonkey.net
// @version      1.4
// @description  Full Width Layout - Footer nur auf Videoseiten verschieben (Scroll Fix)
// @match        *://://odysee.com*
// @match        *://*.://odysee.com*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. CSS Styles ---
    const style = document.createElement('style');
    style.textContent = `
    /* Minimal UI Fixes */
    [class*="wanderButton"], .wanderButton, .featured-banner-wrapper, .header__navigationItem--balance {
        display: none !important;
    }

    /* Full Width & Reset: Verhindert das Links-Kleben */
    .main-wrapper, .main-wrapper--filepage, .page__page, .page__content {
        margin: 0 auto !important;
        max-width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    /* Video-Kacheln */
    .claim-preview--tile { width: calc(25% - 18px) !important; }
    .claim-grid ul { display: flex !important; flex-wrap: wrap !important; gap: 16px !important; width: 100% !important; justify-content: center !important; }

    /* Footer Styling */
    .footer, .navigation__tertiary.footer__links {
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
        margin: 50px 0 20px 0 !important;
        padding: 20px 0 !important;
        float: none !important;
        clear: both !important;
        position: relative !important;
    }
    
    .footer ul, .navigation__tertiary.footer__links ul {
        display: flex !important;
        flex-direction: row !important;
        gap: 20px !important;
        justify-content: center !important;
        list-style: none !important;
    }

    /* Dark Theme & Colors */
    :root { --color-primary: #333333 !important; --color-odysee: #333333 !important; }
    a, .link, .button__label, .tab, .truncated-text { color: #ffffff !important; }
    `;
    document.head.appendChild(style);

    // --- 2. Footer-Logik: Nur auf Videoseiten nach unten schieben ---
    function moveFooterToBottom() {
        const footer = document.querySelector('.navigation__tertiary.footer__links, .footer');
        if (!footer) return;

        // Prüfen: Wenn Videoseite, dann ans Ende vom Body schieben
        const isVideoPage = window.location.pathname.includes('/$/') || document.querySelector('.file-page');
        
        if (isVideoPage) {
            if (footer.parentNode !== document.body) {
                document.body.appendChild(footer);
            }
            footer.style.display = 'flex';
        } else {
            // Auf Homepage/Trending Footer nicht verschieben, um Infinite Scroll zu erlauben
            // Optional: Auf Homepage verstecken, falls er trotzdem oben klebt
            footer.style.display = 'none'; 
        }
    }

    // --- 3. Thumbs Replacement ---
    const THUMB_UP_PATH = 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3';
    const THUMB_DOWN_PATH = 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17';

    function replaceThumbs() {
        document.querySelectorAll('.button-like svg path').forEach(path => {
            if (!path.dataset.thumbReplaced) { path.setAttribute('d', THUMB_UP_PATH); path.dataset.thumbReplaced = 'true'; }
        });
        document.querySelectorAll('.button-dislike svg path').forEach(path => {
            if (!path.dataset.thumbReplaced) { path.setAttribute('d', THUMB_DOWN_PATH); path.dataset.thumbReplaced = 'true'; }
        });
    }

    // --- 4. Observer & Init ---
    const observer = new MutationObserver(() => {
        replaceThumbs();
        moveFooterToBottom();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    setTimeout(() => {
        replaceThumbs();
        moveFooterToBottom();
    }, 1000);
})();
