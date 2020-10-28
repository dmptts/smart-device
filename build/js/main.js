'use strict';

(function () {
  var MOBILE_WIDTH = 767;

  var promoBtn = document.querySelector('.promo__btn');
  var promoBtnDesktopText = 'Получить бесплатную консультацию';
  var promoBtnMobileText = 'Бесплатная консультация';
  var currentVersion;

  var getCurrentVersion = function () {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      currentVersion = 'mobile';
    } else {
      currentVersion = 'desktop';
    }
  };

  var switchText = function () {
    if (currentVersion === 'mobile') {
      promoBtn.textContent = promoBtnMobileText;
    } else {
      promoBtn.textContent = promoBtnDesktopText;
    }
  };

  window.addEventListener('resize', function (evt) {
    evt.preventDefault();
    var pastVersion = currentVersion;
    getCurrentVersion();

    if (pastVersion !== currentVersion) {
      switchText();
    }
  });

  getCurrentVersion();
  switchText();
})();
