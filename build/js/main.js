'use strict';

(function () {
  var PARAGRAPH_LENGTH = 205;
  var about = document.querySelector('.about');
  var aboutParagraphs = about.querySelectorAll('p');
  var uncutParagraphs = [];

  var checkParagraphs = function (currentVersion) {
    if (about && aboutParagraphs) {
      for (var i = 0; i < aboutParagraphs.length; i++) {
        if (currentVersion !== 'desktop' && checkLength(aboutParagraphs[i])) {
          cutString(aboutParagraphs[i]);
        } else if (currentVersion === 'desktop') {
          returnUncutParagraphs(aboutParagraphs[i], i);
        }
      }
    }
  };

  var checkLength = function (paragraph) {
    if (paragraph.innerText.length > PARAGRAPH_LENGTH) {
      return true;
    } else {
      return false;
    }
  };

  var cutString = function (paragraph) {
    paragraph.innerText = paragraph.innerText.substr(0, PARAGRAPH_LENGTH);
    paragraph.innerText = paragraph.innerText.slice(0, paragraph.innerText.lastIndexOf(' '));
    paragraph.innerText = paragraph.innerText += '..';
  };

  var returnUncutParagraphs = function (paragraph, i) {
    paragraph.innerText = uncutParagraphs[i];
  };

  var saveUncutParagraphs = function () {
    for (var i = 0; i < aboutParagraphs.length; i++) {
      uncutParagraphs.push(aboutParagraphs[i].innerText);
    }
  };

  if (about && aboutParagraphs) {
    saveUncutParagraphs();
  }

  window.about = {
    checkParagraphs: checkParagraphs
  };
})();

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
  var isStorageSupport = true;
  var callbackForm = document.querySelector('.callback__form');
  var callbackPhoneInput = callbackForm.querySelector('input[name="phone-field"');
  var callbackAgreementCheckbox = callbackForm.querySelector('input[name="agreement-field"');
  var callbackAgreementCheckboxLabel = callbackForm.querySelector('label[for="agreement"]');

  var checkLocalStorage = function () {
    try {
      localStorage.getItem('login');
    } catch (err) {
      isStorageSupport = false;
    }
  };

  var saveToLocalStorage = function (form) {
    if (isStorageSupport) {
      localStorage.setItem('name', form.querySelector('input[name="name-field"]').value);
      localStorage.setItem('phone', form.querySelector('input[name="phone-field"]').value);
      localStorage.setItem('question', form.querySelector('textarea[name="question-field"]').value);
    }
  };

  var fillInputs = function (form) {
    if (isStorageSupport) {
      form.querySelector('input[name="name-field"]').value = localStorage.getItem('name');
      form.querySelector('input[name="phone-field"]').value = localStorage.getItem('phone');
      form.querySelector('textarea[name="question-field"]').value = localStorage.getItem('question');
    }
  };

  var addPhonePrefix = function (phoneInput) {
    if (phoneInput.value === '') {
      phoneInput.value = '+7(';
    }
  };

  var removePhonePrefix = function (phoneInput) {
    if (phoneInput.value === '+7(') {
      phoneInput.value = '';
    }
  };

  var addClosingBracket = function (phoneInput) {
    if (phoneInput.value.length === 6) {
      phoneInput.value += ')';
    }
  };

  var validatePhoneInput = function (phoneInput) {
    phoneInput.setCustomValidity('');

    if (!phoneInput.checkValidity()) {
      phoneInput.setCustomValidity('Номер телефона должен состоять из 11 цифр, в формате +7(999)9999999');
    }
  };

  var onPhoneInputFocus = function () {
    addPhonePrefix(callbackPhoneInput);
    callbackPhoneInput.addEventListener('blur', onPhoneInputBlur);
    callbackPhoneInput.addEventListener('keydown', onPhoneInputKeydown);
    callbackPhoneInput.addEventListener('change', onPhoneInputChange);
    callbackPhoneInput.removeEventListener('focus', onPhoneInputFocus);
  };

  var onPhoneInputBlur = function () {
    removePhonePrefix(callbackPhoneInput);
    callbackPhoneInput.addEventListener('focus', onPhoneInputFocus);
    callbackPhoneInput.removeEventListener('blur', onPhoneInputBlur);
    callbackPhoneInput.removeEventListener('keydown', onPhoneInputKeydown);
    callbackPhoneInput.removeEventListener('change', onPhoneInputChange);
  };

  var onPhoneInputKeydown = function (evt) {
    if (evt.key !== 'Backspace') {
      addPhonePrefix(callbackPhoneInput);
      addClosingBracket(callbackPhoneInput);
    }
  };

  var onPhoneInputChange = function () {
    validatePhoneInput(callbackPhoneInput);
  };

  var toggleCheckboxState = function (checkbox) {
    if (!checkbox.checked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  };

  var onCallbackFormSubmit = function () {
    saveToLocalStorage(callbackForm);
  };

  var onAgreementCheckboxLabelEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      toggleCheckboxState(callbackAgreementCheckbox);
    }
  };

  if (callbackForm) {
    callbackForm.addEventListener('submit', onCallbackFormSubmit);
    fillInputs(callbackForm);
  }

  if (callbackPhoneInput) {
    callbackPhoneInput.addEventListener('focus', onPhoneInputFocus);
  }

  if (callbackAgreementCheckbox && callbackAgreementCheckboxLabel) {
    callbackAgreementCheckboxLabel.addEventListener('keydown', onAgreementCheckboxLabelEnterPress);
  }

  checkLocalStorage();

  window.form = {
    fillInputs: fillInputs,
    saveToLocalStorage: saveToLocalStorage,
    addPhonePrefix: addPhonePrefix,
    removePhonePrefix: removePhonePrefix,
    addClosingBracket: addClosingBracket,
    validatePhoneInput: validatePhoneInput,
    toggleCheckboxState: toggleCheckboxState
  };
})();

(function () {
  var pageBody = document.body;
  var popup = document.querySelector('.popup');
  var popupOverlay = document.querySelector('.popup-overlay');
  var popupOpenBtn = document.querySelector('.page-header__btn');
  var popupCloseBtn = popup.querySelector('.popup__close-btn');
  var popupForm = popup.querySelector('.popup__form');
  var popupNameInput = popupForm.querySelector('input[name="name-field"');
  var popupPhoneInput = popupForm.querySelector('input[name="phone-field"');
  var popupQuestionInput = popupForm.querySelector('textarea[name="question-field"');
  var popupAgreementCheckbox = popupForm.querySelector('input[name="agreement-field"');
  var popupAgreementCheckboxLabel = popupForm.querySelector('label[for="popup-agreement"]');

  var openPopup = function () {
    popup.classList.add('popup--opened');
    popupOverlay.classList.add('popup-overlay--opened');
    pageBody.classList.add('no-scroll');
    popupOpenBtn.removeEventListener('click', onPopupOpenBtnClick);
    popupCloseBtn.addEventListener('click', onPopupCloseBtnClick);
    popupCloseBtn.addEventListener('keydown', onPopupCloseBtnEnterPress);
    popupOverlay.addEventListener('click', onPopupOverlayClick);
    popupForm.addEventListener('submit', onPopupFormSubmit);
    popupPhoneInput.addEventListener('focus', onPopupPhoneInputFocus);
    document.addEventListener('keydown', onDocumentEscPress);
    window.form.fillInputs(popupForm);
    popupAgreementCheckboxLabel.addEventListener('keydown', onPopupAgreementCheckboxLabelEnterPress);
    placeFocus();
  };

  var closePopup = function () {
    popup.classList.remove('popup--opened');
    popupOverlay.classList.remove('popup-overlay--opened');
    pageBody.classList.remove('no-scroll');
    popupOpenBtn.addEventListener('click', onPopupOpenBtnClick);
    popupCloseBtn.removeEventListener('click', onPopupCloseBtnClick);
    popupCloseBtn.removeEventListener('keydown', onPopupCloseBtnEnterPress);
    window.removeEventListener('keydown', onDocumentEscPress);
    popupForm.removeEventListener('submit', onPopupFormSubmit);
    popupPhoneInput.removeEventListener('focus', onPopupPhoneInputFocus);
    popupAgreementCheckboxLabel.removeEventListener('keydown', onPopupAgreementCheckboxLabelEnterPress);
  };

  var onPopupOpenBtnClick = function () {
    openPopup();
  };

  var onPopupOpenBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  };

  var onPopupCloseBtnClick = function () {
    closePopup();
  };

  var onPopupCloseBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  };

  var onPopupOverlayClick = function () {
    closePopup();
  };

  var onDocumentEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var onPopupPhoneInputFocus = function () {
    window.form.addPhonePrefix(popupPhoneInput);
    popupPhoneInput.addEventListener('blur', onPopupPhoneInputBlur);
    popupPhoneInput.addEventListener('keydown', onPopupPhoneInputKeydown);
    popupPhoneInput.addEventListener('change', onPopupPhoneInputChange);
    popupPhoneInput.removeEventListener('focus', onPopupPhoneInputFocus);
  };

  var onPopupPhoneInputBlur = function () {
    window.form.removePhonePrefix(popupPhoneInput);
    popupPhoneInput.addEventListener('focus', onPopupPhoneInputFocus);
    popupPhoneInput.removeEventListener('blur', onPopupPhoneInputBlur);
    popupPhoneInput.removeEventListener('keydown', onPopupPhoneInputKeydown);
    popupPhoneInput.removeEventListener('change', onPopupPhoneInputChange);
  };

  var onPopupPhoneInputKeydown = function (evt) {
    if (evt.key !== 'Backspace') {
      window.form.addPhonePrefix(popupPhoneInput);
      window.form.addClosingBracket(popupPhoneInput);
    }
  };

  var onPopupPhoneInputChange = function () {
    window.form.validatePhoneInput(popupPhoneInput);
  };

  var onPopupAgreementCheckboxLabelEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      window.form.toggleCheckboxState(popupAgreementCheckbox);
    }
  };

  var onPopupFormSubmit = function () {
    window.form.saveToLocalStorage(popupForm);
  };

  var placeFocus = function () {
    if (popupNameInput.value === '') {
      popupNameInput.focus();
    } else if (popupPhoneInput.value.length !== 14) {
      popupPhoneInput.focus();
    } else if (popupQuestionInput === '') {
      popupQuestionInput.focus();
    } else {
      popupAgreementCheckboxLabel.focus();
    }
  };

  if (popupOpenBtn && popup) {
    popupOpenBtn.addEventListener('click', onPopupOpenBtnClick);
    popupOpenBtn.addEventListener('keydown', onPopupOpenBtnEnterPress);
  }
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
    switch (currentVersion) {
      case 'mobile':
        window.promo.switchPromoBtnText(currentVersion);
        window.footer.replaceCopyright(currentVersion);
        window.footer.toggleAccordions(currentVersion);
        window.about.checkParagraphs(currentVersion);
        break;
      case 'tablet':
        window.footer.replaceCopyright(currentVersion);
        window.about.checkParagraphs(currentVersion);
        break;
      default:
        break;
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
      window.about.checkParagraphs(currentVersion);
    }
  });

  initPage();
  getCurrentVersion();
  checkNeedToChangeElems();
})();
