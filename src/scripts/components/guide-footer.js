class GuideFooter{
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
    finished = STRING: text for the last next button
  }
  */
  constructor(element, opts = {}, spy){
    let self = this
    this._spy = spy
    this._element = getNode(element)
    this._skip = this._element.querySelector('.js-footer-skip')
    this._buttons = this._element.querySelector('.js-footer-buttons')
    this._opts = {
                   prev : opts.prev || "Previous",
                   next : opts.next || "OK, got it!",
                   default: opts.default || "See How It Works",
                   skip: opts.skip || "Skip this tutorial",
                   finished: opts.finished || "Get Started!"
                 }
    this._skipListener = function(){
      self._spy('done')
    }
  }

  render(pageNum, totalPages, nextTitle){
    this._buttons.innerHTML = ''
    this._skip.innerHTML = ''

    if(pageNum == 0){
      this._skip.innerText = this._opts.skip
      this.buildButtons(0)
      this._skip.addEventListener('click', this._skipListener)
    } else if(pageNum == totalPages -1){
      this._skip.innerHTML = ""
      this.buildButtons(2)
    } else {
      this._skip.innerText = "NEXT: "+ nextTitle
      this.buildButtons(1)
      this._skip.removeEventListener('click', this._skipListener)
    }
  }

  buildButtons(style){
    var self = this
    var btn, btn2;
    if(style == 0){
      btn = document.createElement('button')
      btn.setAttribute('class','btn')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.default
      btn.addEventListener('click', function(){
        self._spy('next')
      })
      self._buttons.appendChild(btn)
    }else if(style == 1){
      btn = document.createElement('button')
      btn.setAttribute('class','btn--secondary')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.prev

      btn.addEventListener('click', function(){
        self._spy('previous')
      })

      self._buttons.appendChild(btn)

      btn2 = document.createElement('button')
      btn2.setAttribute('class','btn')
      btn2.setAttribute('type','button')
      btn2.innerText = self._opts.next

      btn2.addEventListener('click', function(){
        self._spy('next')
      })

      self._buttons.appendChild(btn2)
    } else if(style == 2){
      btn = document.createElement('button')
      btn.setAttribute('class','btn--secondary')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.prev

      btn.addEventListener('click', function(){
        self._spy('previous')
      })

      self._buttons.appendChild(btn)

      btn2 = document.createElement('button')
      btn2.setAttribute('class','btn')
      btn2.setAttribute('type','button')
      btn2.innerText = self._opts.finished

      btn2.addEventListener('click', function(){
        self._spy('next')
      })

      self._buttons.appendChild(btn2)

    }
  }
}

