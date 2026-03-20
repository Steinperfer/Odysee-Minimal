// ==UserScript==
// @name         Odysee Layout + Minimal Combined
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Beide Scripts kombiniert, GM_addStyle Problem behoben
// @match        *://odysee.com/*
// @match        *://*.odysee.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- Minimal Script CSS ---
    const styleMinimal = document.createElement('style');
    styleMinimal.textContent = `
    [class*="wanderButton"],
    .wanderButton,
    .wanderButton--connected,
    .featured-banner-wrapper,
    .featured-banner-image,
    .claim-grid__wrapper.hide-ribbon,
    .header__navigationItem--balance {
        display: none !important;
    }

    .claim-preview--tile { width: calc(25% - 18px) !important; }
    .claim-grid ul { display: flex !important; flex-wrap: wrap !important; gap: 16px !important; padding: 0 !important; width: 100% !important; justify-content: flex-start !important; }
    .claim-grid ul li { width: calc(25% - 12px) !important; }

    @media (max-width: 1600px) { .claim-grid ul li, .claim-preview--tile { width: calc(33.333% - 11px) !important; } }
    @media (max-width: 1200px) { .claim-grid ul li, .claim-preview--tile { width: calc(50% - 8px) !important; } }
    @media (max-width: 700px) { .claim-grid ul li, .claim-preview--tile { width: calc(100% - 16px) !important; } }

    :root { --color-primary: #333333 !important; --color-odysee: #333333 !important; --color-primary-dynamic: #333333 !important; }

    a, .link { color: #ffffff !important; }
    .button.button--primary:not(.button--disabled),
    .subscribeButton { background-color: #333333 !important; color: #ffffff !important; }
    .button--membership { background: linear-gradient(to right, #333333, #ff6600) !important; color: #ffffff !important; }
    .button--membership svg { stroke: #ffffff !important; }
    .button--link, .button--no-style { color: #ffffff !important; }
    .comment__author a, .comment__author, .comment .channel-name { color: #ffffff !important; }
    a:hover { color: #cccccc !important; }
    .comment-create__btn { background-color: #333333 !important; color: #ffffff !important; }
    .button.button--primary.button--disabled { background-color: #333333 !important; color: #ffffff !important; }
    .button.button--alt.button-toggle.button-toggle--active { background-color: #666666 !important; color: #ffffff !important; }
    .button.button--alt.button-toggle.button-toggle--active svg { stroke: #ffffff !important; }
    .button.button--alt.comment__refresh-button:hover { background-color: #666666 !important; color: #ffffff !important; }
    .button.button--alt.comment__refresh-button:hover svg { stroke: #ffffff !important; }
    .button.button--alt.button-following { background-color: #333333 !important; color: #ffffff !important; }
    .button.button--alt.button-following svg { stroke: #ffffff !important; }
    .channel-selector:hover { background-color: #444444 !important; }
    .button:hover, .button.button--primary:hover, .button.button--alt:hover, .button.button--no-style.button--file-action:hover { background-color: #444444 !important; }
    .button__label, .button:hover .button__label { color: #ffffff !important; }
    .icon--PlaylistAdd, .icon--DollarSign, .icon--Share2 { stroke: #ffffff !important; }
    .icon--More:hover { stroke: #aaaaaa !important; }
    .icon--More { stroke: #ffffff !important; }
    .tab, .tab:hover, .truncated-text, .truncated-text:hover { color: #ffffff !important; }
    `;
    document.head.appendChild(styleMinimal);

    // --- Layout V2 Script CSS ---
    const styleLayout = document.createElement('style');
    styleLayout.textContent = `
    html, body,
    .sidebar--pusher, 
    .sidebar--pusher--filepage, 
    .main-wrapper--filepage, 
    .main-wrapper,
    .page__page,
    .page__content,
    .file-page {
      margin-left: 45 !important;
      padding-left: 50 !important;
      width: 100% !important;
      max-width: 100% !important;
    }

    .content__viewer.content__viewer--inline { height: 80vh !important; max-height: none !important; display: block !important; }

    .file-render.file-render--video,
    .file-viewer,
    .video-js-parent,
    .video-js { height: 100% !important; }

    .video-js video,
    .vjs-poster { height: 100% !important; object-fit: cover; }

    .section.card-stack.file-page__video { margin-left: 0 !important; padding-left: 0 !important; }
    .card-stack--spacing-m, .card__body.card__body--list { margin-right: 0 !important; padding-right: 0 !important; }

    .footer, .navigation__tertiary.footer__links {
      margin-left: 0 !important;
      padding-left: 0 !important;
      text-align: left !important;
      clear: both !important;
      display: block !important;
      float: none !important;
      position: relative !important;
    }
    `;
    document.head.appendChild(styleLayout);

    // --- Thumbs Replacement ---
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

    setTimeout(replaceThumbs, 500);
    setTimeout(replaceThumbs, 1500);
    setTimeout(replaceThumbs, 3000);

    const observerThumbs = new MutationObserver(replaceThumbs);
    observerThumbs.observe(document.body, { childList: true, subtree: true });

    // --- Footer/Layout Fix ---
    function layoutFix() {
        const footer = document.querySelector('.navigation__tertiary.footer__links, .footer');
        if (footer && footer.parentNode) {
            footer.parentNode.removeChild(footer);
            document.body.appendChild(footer);
        }
    }

    if (layoutFix()) console.log('[Layout Fix] Applied');

    const observerLayout = new MutationObserver(() => {
        clearTimeout(window.odyseeLayoutV2Timeout);
        window.odyseeLayoutV2Timeout = setTimeout(layoutFix, 200);
    });
    observerLayout.observe(document.body, { childList: true, subtree: true });
    setTimeout(layoutFix, 500);

    console.log('[Odysee Combined Script] Activated');

})();