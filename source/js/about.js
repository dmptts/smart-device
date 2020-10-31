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
