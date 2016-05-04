
/* HELPERS
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