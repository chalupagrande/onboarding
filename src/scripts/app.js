/*
  Reposition Slideout Container on scroll
*/

var guide = new Guide({
  element: getNode('.guide[data-guide-name="monitoring"]'),
  pages: getNode('.pages').children,
  tag: new GuideTag(getNode('.guide-tag'))
});

var guide2 = new Guide({
  element: getNode('.guide[data-guide-name="response"]'),
  pages: getNode('.guide[data-guide-name="response"]').querySelector('.pages').children,
  tag: new GuideTag(getNode('.guide-tag[data-guide-name="response"]'))
})

var walkthrough = new Walkthrough({
  element: getNode('.walkthrough'),
  guides: [guide, guide2],
  helpIcon: document.querySelector('.help')
})

var slideout = document.querySelector('.slideout');
var slideoutNav = slideout.querySelector('.slideout__header__nav')
var toggleSlide;

(()=>{
  window.addEventListener('load',function(){

    /*  add listeners to toggle onboarding in and out.  */

    toggleSlide = getToggleSlideFunc(slideout, -1, 500, resizeContent)
    getNode('.js-guide-trigger').addEventListener('click', toggleSlide)
    slideout.querySelector('.js-guide-trigger').addEventListener('click', function(){
      walkthrough.hideGuide()
      toggleSlide()
    })
    toggleSlide()

    slideout.querySelector('.slideout__header__nav').addEventListener('click', function(){
      walkthrough.hideGuide()
      slideoutNav.style.opacity = 0
      slideoutNav.style.cursor = 'default'
    })

  })
})();

(()=>{
  var buttonNavs = document.querySelectorAll('[role="button"]')
    makeArray(buttonNavs).forEach(function(el){
    el.addEventListener('keydown', function(e){
      var code = e.which
      // 13 = Return, 32 = Space
      if((code == 13) || (code == 32)){
        fireEvent(this, 'click')
      }
    })
  })
})();