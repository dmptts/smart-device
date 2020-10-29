'use strict';

(function () {
  var promoBtn = document.querySelector('.promo__btn');
  var promoBtnDesktopText = 'Получить бесплатную консультацию';
  var promoBtnMobileText = 'Бесплатная консультация';

  var switchPromoBtnText = function (currentVersion) {
    if (promoBtn) {
      if (currentVersion === 'mobile') {
        promoBtn.textContent = promoBtnMobileText;
      } else {
        promoBtn.textContent = promoBtnDesktopText;
      }
    }
  };

  window.promo = {
    switchPromoBtnText: switchPromoBtnText
  };
})();
