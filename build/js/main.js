'use strict';

(function () {
  var copyrightOwnerElem = document.querySelector('.page-footer__copyright-text--owner');
  var socialBlock = document.querySelector('.page-footer__social');
  var footerTop = document.querySelector('.page-footer__top-container');
  var copyrightBlock = document.querySelector('.page-footer__copyright');

  var replaceCopyright = function (currentVersion) {
    var copyrightFragment = document.createDocumentFragment();
    copyrightFragment.appendChild(copyrightOwnerElem);

    if (currentVersion === 'mobile' || currentVersion === 'tablet') {
      footerTop.insertBefore(copyrightFragment, socialBlock);
    } else {
      copyrightBlock.appendChild(copyrightFragment);
    }
  };

  window.footer = {
    replaceCopyright: replaceCopyright
  };
})();

(function () {
  var promoBtn = document.querySelector('.promo__btn');
  var promoBtnDesktopText = 'Получить бесплатную консультацию';
  var promoBtnMobileText = 'Бесплатная консультация';

  var switchPromoBtnText = function (currentVersion) {
    if (currentVersion === 'mobile') {
      promoBtn.textContent = promoBtnMobileText;
    } else {
      promoBtn.textContent = promoBtnDesktopText;
    }
  };

  window.promo = {
    switchPromoBtnText: switchPromoBtnText
  };
})();

(function () {
  var MOBILE_WIDTH = 767;
  var TABLET_WIDTH = 1023;

  var currentVersion;

  var getCurrentVersion = function () {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      currentVersion = 'mobile';
    } else if (document.body.clientWidth > MOBILE_WIDTH && document.body.clientWidth <= TABLET_WIDTH) {
      currentVersion = 'tablet';
    } else {
      currentVersion = 'desktop';
    }
  };

  var checkNeedToChangeElems = function () {
    if (currentVersion === 'mobile') {
      window.promo.switchPromoBtnText(currentVersion);
      window.footer.replaceCopyright(currentVersion);
    } else if (currentVersion === 'tablet') {
      window.footer.replaceCopyright(currentVersion);
    }
  };

  window.addEventListener('resize', function (evt) {
    evt.preventDefault();
    var pastVersion = currentVersion;
    getCurrentVersion();

    if (pastVersion !== currentVersion) {
      window.promo.switchPromoBtnText(currentVersion);
      window.footer.replaceCopyright(currentVersion);
    }
  });

  getCurrentVersion();
  checkNeedToChangeElems();
})();
