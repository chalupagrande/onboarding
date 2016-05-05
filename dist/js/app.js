'use strict';

/*
  Reposition Slideout Container on scroll
*/

var guideTag = new GuideTag('.monitoring');
var page = new GuidePage('.guide-page');

var guide = new Guide({
  tag: guideTag,
  pages: [page, page, page, page, page]
});