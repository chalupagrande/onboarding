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

function createEvent(){
  var event

  if(window.CustomEvent){
    event = new window.CustomEvent('click')
  }

  return event
}


//copied from Stack Overflow.....
function fireEvent(node, eventName) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9){
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
    }
    var event;
    if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.

        switch (eventName) {
            // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "click":
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;

            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;

            default:
                throw Error("fireEvent: Couldn't find an event class for event '" + eventName + "'.");
                break;
        }
        event = doc.createEvent(eventClass);

        var bubbles = eventName == "change"
        // All events created as bubbling and cancelable.
        event.initEvent(eventName, bubbles, true);

        // allow detection of synthetic events
        event.synthetic = true;
        node.dispatchEvent(event, true);
    } else  if (node.fireEvent) {
        // IE-old school style
        event = doc.createEventObject();
        // allow detection of synthetic events
        event.synthetic = true;
        node.fireEvent("on" + eventName, event);
    }
}
