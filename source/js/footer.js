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
