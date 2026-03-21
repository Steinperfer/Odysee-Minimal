(function() {
  'use strict';

  // 1. Dein Original-Layout (unverändert)
  const css = `
    html, body, .sidebar--pusher, .sidebar--pusher--filepage, 
    .main-wrapper--filepage, .main-wrapper, .page__page, 
    .page__content, .file-page {
      width: 100% !important;
      max-width: 100% !important;
    }
    .content__viewer.content__viewer--inline {
       height: 80vh !important;
       max-height: none !important;
       display: block !important;
    }
    .file-render.file-render--video, .file-viewer, .video-js-parent, .video-js {
      height: 100% !important;
    }
    .video-js video, .vjs-poster {
      height: 130% !important;
      object-fit: contain;
    }
    .section.card-stack.file-page__video {
      margin-left: 0 !important;
      padding-left: 0 !important;
    }
    .card-stack--spacing-m, .card__body.card__body--list {
      margin-right: 0 !important;
      padding-right: 0 !important;
    }
    .footer {
      margin-left: 0 !important;
      padding-top: 40px !important;
      text-align: left !important;
      display: block !important;
      clear: both !important;
      width: 100% !important;
    }
    /* Das hier killt den zweiten Footer sofort per CSS, falls er auftaucht */
    .footer ~ .footer { display: none !important; }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // 2. Footer direkt unter die gewünschte Klasse klatschen
  const target = document.querySelector('.main-wrapper__inner--filepage');
  const footer = document.querySelector('.footer');
  if (target && footer) {
    target.appendChild(footer);
  }

})();
