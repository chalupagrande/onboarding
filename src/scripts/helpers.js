/* Page Specific Helpers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function resizeContent(){
  console.log('start')
  var n = getNode('.content')
  if(n.style.width && (n.style.width.slice(0,-1)*1) < 100){
    n.style.width = '100%'
    console.log('in')
    return
  }
  console.log('out')
  var contentWidth = n.getBoundingClientRect().width
  var slideoutWidth = slideout.getBoundingClientRect().width
  n.style.width = (1 - slideoutWidth / contentWidth)*100 +'%'
}


/* Generic HELPERS
~~~~~~~~~~~~~~~~~~~~~*/
function removeSpaceMakeLowercase(s) {
  return s.split(' ').join('_').toLowerCase();
}

function toggleClass(el, className){
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
}

function hasClass(el, className){
  if (el.classList)
    return el.classList.contains(className);
  else{
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

function getNode(el){
  if(typeof el == 'string'){
    return document.querySelector(el)
  } else if (el.nodeType){
    return el
  }
}

//direction = -1 (slides left) || 1 (slides right)
function slide(element, direction, duration =500, callback){
  var durationInSecs = duration/1000 +'s'
  var width = element.getBoundingClientRect().width
  element.style.transition = 'transform '+ durationInSecs
  element.style.transform = 'translate('+(width*direction)+'px ,0)'
  setTimeout(callback, duration)
}

function getToggleSlideFunc(element, direction, duration, callback){
  var originalDirection = direction
  return function(){
    slide.apply(this, [element, direction, duration, callback])
    direction = direction ? 0 : originalDirection
  }
}

Function.prototype.papp = function () {
  var slice = Array.prototype.slice
  var fn = this
  var args = slice.call(arguments)
  return function () {
    return fn.apply(this, args.concat(slice.call(arguments)))
  }
}