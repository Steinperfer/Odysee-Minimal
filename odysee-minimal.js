// ==UserScript==
// @name         Odysee Minimal
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Odysee YouTube Style - Daumen Icons, Grau, Banner weg, 4 Videos
// @match        *://odysee.com/*
// @match        *://*.odysee.com/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // ============================================================
    // CSS STYLES
    // ============================================================
    
    const css = `
    [class*="wanderButton"],
    .wanderButton,
    .wanderButton--connected,
    .featured-banner-wrapper,
    .featured-banner-image,
    .claim-grid__wrapper.hide-ribbon {
        display: none !important;
    }
    
    .claim-preview--tile {
        width: calc(25% - 18px) !important;
    }
    
    .claim-grid ul {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 16px !important;
        padding: 0 !important;
        width: 100% !important;
        justify-content: flex-start !important;
    }
    
    .claim-grid ul li {
        width: calc(25% - 12px) !important;
    }
    
    @media (max-width: 1600px) {
        .claim-grid ul li,
        .claim-preview--tile {
            width: calc(33.333% - 11px) !important;
        }
    }
    
    @media (max-width: 1200px) {
        .claim-grid ul li,
        .claim-preview--tile {
            width: calc(50% - 8px) !important;
        }
    }
    
    @media (max-width: 700px) {
        .claim-grid ul li,
        .claim-preview--tile {
            width: calc(100% - 16px) !important;
        }
    }
    
    .navigation,
    .navigation--micro,
    .navigation--push,
    .navigation__wrapper {
        background-color: #1a1a1a !important;
    }
    
    .navigation-link--active {
        background-color: #333333 !important;
    }
    
    .subscribeButton {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .button-following {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .button--membership {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .button--alt {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .button--primary {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .comment__sort .button {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .claim-preview__progress-bar {
        background-color: #666666 !important;
    }
    
    .claim-preview__wrapper--live .claim-preview__file-property-overlay {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .tag {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    :root {
        --color-primary: #333333 !important;
        --color-primary-dynamic: #333333 !important;
        --color-odysee: #333333 !important;
    }
    `;

    GM_addStyle(css);
    
    // ============================================================
    // DAUMEN ICONS ERSETZEN
    // ============================================================
    
    const THUMB_UP_PATH = 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3';
    
    const THUMB_DOWN_PATH = 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17';

    function replaceThumbs() {
        document.querySelectorAll('.button-like svg path').forEach(function(path) {
            if (!path.dataset.thumbReplaced) {
                path.setAttribute('d', THUMB_UP_PATH);
                path.dataset.thumbReplaced = 'true';
            }
        });
        
        document.querySelectorAll('.button-dislike svg path').forEach(function(path) {
            if (!path.dataset.thumbReplaced) {
                path.setAttribute('d', THUMB_DOWN_PATH);
                path.dataset.thumbReplaced = 'true';
            }
        });
    }
    
    setTimeout(replaceThumbs, 500);
    setTimeout(replaceThumbs, 1500);
    setTimeout(replaceThumbs, 3000);
    
    const observer = new MutationObserver(function() {
        replaceThumbs();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('[Odysee Minimal] Geladen');
})();
