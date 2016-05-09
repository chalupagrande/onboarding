/* Page Specific Helpers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function resizeContent(){
  var n = getNode('.content')
  if(n.style.width && (n.style.width.slice(0,-1)*1) < 100){
    n.style.width = '100%'
    return
  }
  var contentWidth = n.getBoundingClientRect().width
  var slideoutWidth = slideout.getBoundingClientRect().width
  n.style.width = (1 - slideoutWidth / contentWidth)*100 +'%'
}

function getGuide(list, name){
  for(var i = 0; i < list.length; i++){
    if(list[i].name == name) return list[i]
  }
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
  if(!el){
    debugger
    throw Error('No arguments were provided')
  }
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
  element.style.transition = 'transforwqm '+ durationInSecs
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

function makeArray(arraLikeObject){
  return Array.prototype.slice.call(arraLikeObject)
}

function addClass(el, className){
  if (el.classList){
    el.classList.add(className);
  }
  else{
    el.className += ' ' + className;
  }
}
function switchClass(element, possibleClasses, desiredClass){
  possibleClasses.forEach(function(klass){
    if(hasClass(element, removeSpaceMakeLowercase(klass))){
      toggleClass(element, removeSpaceMakeLowercase(klass))
    }
  })
  addClass(element, desiredClass)
}