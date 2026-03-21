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


.section.card-stack.file-page__video {
    display: flex !important;
    flex-direction: column !important;
}

/* Video zuerst (order: 1) */
.content__viewer--inline {
    order: 1 !important;
    margin: 0 auto !important;
}

/* Secondary-content danach (order: 2) */
.file-page__secondary-content {
    order: 2 !important;
}


    .section.card-stack.file-page__video {
      margin-left: 0 !important;
      padding-left: 0 !important;
    }
.file-page__secondary-content {
    margin: 0 auto !important;  /* Genau wie secondary-content */
    width: 100% !important;
    max-width: 100% !important;  /* Optional: Begrenzung */
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
