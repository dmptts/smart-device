'use strict';

(function () {
  var isStorageSupport = true;
  var callbackForm = document.querySelector('.callback__form');
  var nameInput = document.getElementById('name');
  var phoneInput = document.getElementById('phone');
  var questionInput = callbackForm.querySelector('textarea');

  var checkLocalStorage = function () {
    try {
      localStorage.getItem('login');
    } catch (err) {
      isStorageSupport = false;
    }
  };

  var saveToLocalStorage = function () {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('question', questionInput.value);
    }
  };

  var fillInputs = function () {
    if (isStorageSupport) {
      nameInput.value = localStorage.getItem('name');
      phoneInput.value = localStorage.getItem('phone');
      questionInput.value = localStorage.getItem('question');
    }
  };

  var onPhoneInputFocus = function () {
    if (phoneInput.value === '') {
      phoneInput.value = '+7(';
    }
    phoneInput.addEventListener('blur', onPhoneInputBlur);
    phoneInput.addEventListener('keydown', onPhoneInputKeydown);
    phoneInput.addEventListener('change', onPhoneInputChange);
    phoneInput.removeEventListener('focus', onPhoneInputFocus);
  };

  var onPhoneInputBlur = function () {
    if (phoneInput.value === '+7(') {
      phoneInput.value = '';
    }
    phoneInput.addEventListener('focus', onPhoneInputFocus);
    phoneInput.removeEventListener('blur', onPhoneInputBlur);
    phoneInput.removeEventListener('keydown', onPhoneInputKeydown);
    phoneInput.removeEventListener('change', onPhoneInputChange);
  };

  var onPhoneInputKeydown = function () {
    if (phoneInput.value === '') {
      phoneInput.value = '+7(';
    } else if (phoneInput.value.length === 6) {
      phoneInput.value += ')';
    }
  };

  var onPhoneInputChange = function () {
    phoneInput.setCustomValidity('');

    if (!phoneInput.checkValidity()) {
      phoneInput.setCustomValidity('Номер телефона должен состоять из 11 цифр, в формате +7(999)9999999');
    }
  };

  if (phoneInput) {
    phoneInput.addEventListener('focus', onPhoneInputFocus);
  }

  if (callbackForm) {
    callbackForm.addEventListener('submit', saveToLocalStorage);
    fillInputs();
  }

  checkLocalStorage();
})();
