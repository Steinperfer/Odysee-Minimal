(function(){
  'use strict';

  const css = `
    html, body,
    .sidebar--pusher, 
    .sidebar--pusher--filepage, 
    .main-wrapper--filepage, 
    .main-wrapper,
    .page__page,
    .page__content,
    .file-page {

      width: 100% !important;
      max-width: 100% !important;
    }

    .content__viewer.content__viewer--inline{
       height: 80vh !important;
       max-height: none !important;
       display: block !important;
     }

    .file-render.file-render--video,
    .file-viewer,
    .video-js-parent,
    .video-js {
      height: 100% !important;
    }

    .video-js video,
    .vjs-poster {
      height: 100% !important;
      object-fit: cover;
    }

    .section.card-stack.file-page__video {
      margin-left: 0 !important;
      padding-left: 0 !important;
    }

    .card-stack--spacing-m,
    .card__body.card__body--list {
      margin-right: 0 !important;
      padding-right: 0 !important;
    }

    .footer,
    .navigation__tertiary.footer__links {
      margin-left: 0 !important;
      padding-left: 0 !important;
      text-align: left !important;
      clear: both !important;
      display: block !important;
      float: none !important;
      position: relative !important;
    }
  `;

  // GM_addStyle ersetzt für normalen Browser
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function layout() {
    const mainContainer = document.querySelector('.sidebar--pusher--filepage');
    if (!mainContainer) return false;

    const footer = document.querySelector('.navigation__tertiary.footer__links, .footer');
    if (footer && footer.parentNode) {
      footer.parentNode.removeChild(footer);
      document.body.appendChild(footer);
    }

    return true;
  }

  if (layout()) console.log('[Odysee Layout V2] Applied');

  const observer = new MutationObserver((mutations) => {
    let needsUpdate = false;
    for (const m of mutations) {
      if (m.type === 'childList') {
        needsUpdate = true;
        break;
      }
    }
    if (needsUpdate) {
      clearTimeout(window.odyseeLayoutV2Timeout);
      window.odyseeLayoutV2Timeout = setTimeout(() => {
        if (layout()) console.log('[Odysee Layout V2] Updated');
      }, 200);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    layout();
  }, 500);

})();