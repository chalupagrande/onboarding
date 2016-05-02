class Dots{
  /*
     element must have a `data-count` attribute of the number of
     dots you would like.
  */
  constructor(element){
    this._count = element.getAttribute('data-count')
    this._current = 0
    this._element = element
    this._dots = []

    var list = document.createElement('ul')
    for(var i = 0; i < this._count; i++ ){
      var li = document.createElement('li')
      var dot = document.createElement('div')
      dot.setAttribute('class', 'nav-dot')
      this._dots.push(dot)
      li.appendChild(dot)
      list.appendChild(li)

      if(i != this._count-1) {
        var d = document.createElement('li')
        var divider = document.createElement('div')
        divider.setAttribute('class', 'nav-dot-divider')
        d.appendChild(divider)
        list.appendChild(d)

      }
    }
    element.appendChild(list)
  }

  next(){
    this._dots[this._current].classList.add('fill')
    this._current < this._count ? this._current += 1 : 1;
    return this._current
  }

  previous(){
    this._current > 0 ? this._current -= 1 : 1;
    this._dots[this._current].classList.remove('fill')
    return this._current
  }

  current(){
    return this._current
  }
}