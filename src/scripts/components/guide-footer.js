class GuideFooter{
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
  }
  */
  constructor(element, opts = {}, spy){
    this._spy = spy
    this._element = getNode(element)
    this._skip = this._element.querySelector('.js__footer-skip')
    this._buttons = this._element.querySelector('.js__footer-buttons')
    this._opts = {
                   prev : opts.prev || "Previous",
                   next : opts.next || "Next",
                   default: opts.default || "See How It Works",
                   skip: opts.skip || "Skip this tutorial"
                 }

  }

  render(pageNum, nextTitle){
    this._buttons.innerHTML = ''
    this._skip.innerHTML = ''

    if(pageNum == 0){
      this._skip.innerText = this._opts.skip
    } else {
      this._skip.innerText = "NEXT: "+ nextTitle
    }
    this.buildButtons(pageNum)
  }

  buildButtons(pageNum){
    var self = this
    if(pageNum == 0){
      var btn = document.createElement('button')
      btn.setAttribute('class','btn')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.default
      btn.addEventListener('click', function(){
        self._spy('next')
      })
      self._buttons.appendChild(btn)
    }else{
      var btn = document.createElement('button')
      btn.setAttribute('class','btn--secondary')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.prev

      btn.addEventListener('click', function(){
        self._spy('previous')
      })

      self._buttons.appendChild(btn)

      var btn2 = document.createElement('button')
      btn2.setAttribute('class','btn')
      btn2.setAttribute('type','button')
      btn2.innerText = self._opts.next

      btn2.addEventListener('click', function(){
        self._spy('next')
      })

      self._buttons.appendChild(btn2)
    }
  }
}

