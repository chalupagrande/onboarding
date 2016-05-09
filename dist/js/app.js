'use strict';

/*
  Reposition Slideout Container on scroll
*/

var guide = new Guide({
  element: getNode('.guide[data-guide-name="monitoring"]'),
  pages: getNode('.pages').children,
  tag: new GuideTag(getNode('.guide-tag'))
});

var walkthrough = new Walkthrough({
  element: getNode('.walkthrough'),
  guides: [guide]
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