'use strict';

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
