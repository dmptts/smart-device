'use strict';

(function () {

  var copyrightOwnerElem = document.querySelector('.page-footer__copyright-text--owner');
  var socialBlock = document.querySelector('.page-footer__social');
  var footerTop = document.querySelector('.page-footer__top-container');
  var copyrightBlock = document.querySelector('.page-footer__copyright');
  var nav = document.querySelector('.page-footer__nav');
  var navHeading = document.querySelector('.page-footer__heading--nav');
  var contacts = document.querySelector('.page-footer__contacts');
  var contactsHeading = document.querySelector('.page-footer__heading--contacts');

  var replaceCopyright = function (currentVersion) {
    if (copyrightOwnerElem && socialBlock && footerTop && copyrightBlock) {
      var copyrightFragment = document.createDocumentFragment();
      copyrightFragment.appendChild(copyrightOwnerElem);

      if (currentVersion === 'mobile' || currentVersion === 'tablet') {
        footerTop.insertBefore(copyrightFragment, socialBlock);
      } else {
        copyrightBlock.appendChild(copyrightFragment);
      }
    }
  };

  var toggleNavAccordion = function () {
    nav.classList.toggle('page-footer__nav--opened');
  };

  var toggleContactsAccordion = function () {
    contacts.classList.toggle('page-footer__contacts--opened');
  };

  var onNavHeadingClick = function () {
    toggleNavAccordion();
  };

  var onContactsHeadingClick = function () {
    toggleContactsAccordion();
  };

  var onNavHeadingEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      toggleNavAccordion(evt);
    }
  };

  var onContactsEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      toggleContactsAccordion(evt);
    }
  };

  var toggleAccordions = function (currentVersion) {
    if (nav && navHeading && contacts && contactsHeading) {
      if (currentVersion === 'mobile') {
        navHeading.tabIndex = 0;
        contactsHeading.tabIndex = 0;
        navHeading.addEventListener('mousedown', onNavHeadingClick);
        navHeading.addEventListener('keydown', onNavHeadingEnterPress);
        contactsHeading.addEventListener('mousedown', onContactsHeadingClick);
        contactsHeading.addEventListener('keydown', onContactsEnterPress);
      } else {
        navHeading.tabIndex = -1;
        contactsHeading.tabIndex = -1;
        navHeading.removeEventListener('mousedown', onNavHeadingClick);
        navHeading.removeEventListener('keydown', onNavHeadingEnterPress);
        contactsHeading.removeEventListener('mousedown', onContactsHeadingClick)
        ;
        contactsHeading.removeEventListener('keydown', onContactsEnterPress);
      }
    }
  };

  window.footer = {
    replaceCopyright: replaceCopyright,
    toggleAccordions: toggleAccordions
  };
})();

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

(function () {
  var MOBILE_WIDTH = 767;
  var TABLET_WIDTH = 1023;

  var pageFooter = document.querySelector('.page-footer');
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
      window.footer.toggleAccordions(currentVersion);
    } else if (currentVersion === 'tablet') {
      window.footer.replaceCopyright(currentVersion);
    }
  };

  var initPage = function () {
    pageFooter.classList.remove('page-footer--no-js');
  };

  window.addEventListener('resize', function (evt) {
    evt.preventDefault();
    var pastVersion = currentVersion;
    getCurrentVersion();

    if (pastVersion !== currentVersion) {
      window.promo.switchPromoBtnText(currentVersion);
      window.footer.replaceCopyright(currentVersion);
      window.footer.toggleAccordions(currentVersion);
    }
  });

  initPage();
  getCurrentVersion();
  checkNeedToChangeElems();
})();
