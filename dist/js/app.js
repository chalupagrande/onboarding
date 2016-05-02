'use strict';

/*
  Reposition Slideout Container on scroll
*/

var slideout = document.querySelector('.slideout');
var headerHeight = document.querySelector('.bluemix-header').getBoundingClientRect().height;

window.onload = function () {
  slideout.style.top = headerHeight - window.scrollY + 'px';
};
window.addEventListener('scroll', function () {
  console.log(headerHeight - window.scrollY);
  slideout.style.top = headerHeight - window.scrollY + 'px';
});

document.querySelector('.title').addEventListener('click', function () {
  window.scrollTo(200, 200);
});