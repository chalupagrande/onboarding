'use strict';

/*
  Reposition Slideout Container on scroll
*/

var monitoringGuide = new GuideTag('.monitoring');
var page = new GuidePage('.guide__page', 'Welcome To Monitoring');

var guide = new Guide({
  tag: monitoringGuide,
  pages: [page, page, page, page, page]
});