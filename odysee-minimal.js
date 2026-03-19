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
    .claim-grid__wrapper.hide-ribbon,
    .header__navigationItem--balance {
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
    
    /* Odysee Pink entfernen - basis farben */
    :root {
        --color-primary: #333333 !important;
        --color-odysee: #333333 !important;
        --color-primary-dynamic: #333333 !important;
    }
    
    a, .link {
        color: #ffffff !important;
    }
    
    .button.button--primary:not(.button--disabled),
    .subscribeButton {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .button--membership {
        background: linear-gradient(to right, #333333, #ff6600) !important;
        color: #ffffff !important;
    }
    
    .button--membership svg {
        stroke: #ffffff !important;
    }
    
    .button--link,
    .button--no-style {
        color: #ffffff !important;
    }
    
    .comment__author a,
    .comment__author,
    .comment .channel-name {
        color: #ffffff !important;
    }
    
    /* Links hover */
    a:hover {
        color: #cccccc !important;
    }
    
    /* Kommentieren Button */
    .comment-create__btn {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    /* Disabled Button */
    .button.button--primary.button--disabled {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    /* Toggle Active - dunkelgrau mit weißer schrift */
    .button.button--alt.button-toggle.button-toggle--active {
        background-color: #666666 !important;
        color: #ffffff !important;
    }
    
    .button.button--alt.button-toggle.button-toggle--active svg {
        stroke: #ffffff !important;
    }
    
    /* Comment refresh button wenn aktiv */
    .button.button--alt.comment__refresh-button:hover {
        background-color: #666666 !important;
        color: #ffffff !important;
    }
    
    .button.button--alt.comment__refresh-button:hover svg {
        stroke: #ffffff !important;
    }
    
    /* Abonnieren Button - nicht abonniert */
    .button.button--alt.button-following {
        background-color: #333333 !important;
        color: #ffffff !important;
    }
    
    .button.button--alt.button-following svg {
        stroke: #ffffff !important;
    }
    
    /* Channel Selector hover */
    .channel-selector:hover {
        background-color: #444444 !important;
    }
    
    /* Alle Button Hovers auf grau statt weiß */
    .button:hover {
        background-color: #444444 !important;
    }
    
    .button.button--primary:hover {
        background-color: #444444 !important;
    }
    
    .button.button--alt:hover {
        background-color: #444444 !important;
    }
    
    /* File Action Button Hover */
    .button.button--no-style.button--file-action:hover {
        background-color: #444444 !important;
    }
    
    /* Button Label Schrift weiß */
    .button__label {
        color: #ffffff !important;
    }
    
    .button:hover .button__label {
        color: #ffffff !important;
    }
    
    /* Bestimmte Icons weiß lassen */
    .icon--PlaylistAdd,
    .icon--DollarSign,
    .icon--Share2 {
        stroke: #ffffff !important;
    }
    
    /* More Icon - heller beim Hover */
    .icon--More:hover {
        stroke: #aaaaaa !important;
    }
    
    .icon--More {
        stroke: #ffffff !important;
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
