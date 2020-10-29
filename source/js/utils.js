'use strict';

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
