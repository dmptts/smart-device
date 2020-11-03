'use strict';

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
