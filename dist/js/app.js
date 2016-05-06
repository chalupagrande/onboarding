'use strict';

/*
  Reposition Slideout Container on scroll
*/

// var guideTag = new GuideTag('.monitoring')
// var page = new GuidePage('.page')
// var page = new GuidePage('.page.page2')

var guide = new Guide({
  pages: ['.page', '.page', '.page', '.page', '.page', '.page']
});

var slideout = document.querySelector('.slideout');
var toggleSlide;

(function () {
  window.addEventListener('load', function () {

    /*  add listeners to toggle onboarding in and out.  */

    toggleSlide = getToggleSlideFunc(slideout, -1, 500, resizeContent);
    getNode('.js__guide-trigger').addEventListener('click', toggleSlide);
    slideout.querySelector('.js__guide-trigger').addEventListener('click', toggleSlide);
    toggleSlide();
  });
})();