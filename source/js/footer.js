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
