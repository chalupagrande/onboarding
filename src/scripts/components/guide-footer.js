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
                   next : opts.next || "Next",
                   default: opts.default || "See How It Works",
                   skip: opts.skip || "Skip this guide",
                   finished: opts.finished || "Get Started!"
                 }
    this._skipListener = function(){
      self._spy('done')
    }
  }

  render(pageNum, totalPages, nextTitle){
    this._skip.innerHTML = ''
    //PANEL 0 - Description on how to get to page
    if( pageNum == -1){
      this._buttons.innerHTML = ''
      this._skip.innerText = this._opts.skip
      this._skip.addEventListener('click', this._skipListener)
    }
    //FIRST PAGE - Welcome Page
    else if(pageNum == 0){
      this._buttons.innerHTML = ''
      this._skip.innerText = this._opts.skip
      this.buildButtons(0)
      if(hasClass(this._skip, 'next')) toggleClass(this._skip, 'next')
      this._skip.addEventListener('click', this._skipListener)
    //ON LAST PAGE - draw finished buttons
    } else if(pageNum == totalPages -1){
      this._buttons.innerHTML = ''
      this.buildButtons(1)
      this._buttons.querySelector('.btn').innerText = this._opts.finished
      this._skip.innerHTML = ""
    //ON FIRST MIDDLE PAGE -- draw next buttons
    } else if(pageNum == 1){
      this._buttons.innerHTML = ''
      this.buildButtons(1)
      this._skip.innerHTML = "<span class='bold'>Next:</span> "+ nextTitle
      if(!hasClass(this._skip, 'next')) toggleClass(this._skip, 'next')
      this._skip.removeEventListener('click', this._skipListener)
    // ON MIDDLE PAGE - update next
    } else {
      this._buttons.querySelector('.btn').innerText = this._opts.next
      this._skip.innerHTML = "<span class='bold'>Next:</span> "+ nextTitle
    }
  }

  buildButtons(style){
    var self = this
    var btn, btn2;

    //first page
    if(style == 0){
      btn = document.createElement('button')
      btn.setAttribute('class','btn')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.default
      btn.addEventListener('click', function(){
        self._spy('next')
      })
      self._buttons.appendChild(btn)

    //middle pages
    }else if(style == 1){
      btn = document.createElement('button')
      btn.setAttribute('class','btn--secondary btn--previous')
      btn.setAttribute('type','button')
      btn.innerText = self._opts.prev

      btn.addEventListener('click', function(){
        self._spy('previous')
      })

      self._buttons.appendChild(btn)

      btn2 = document.createElement('button')
      btn2.setAttribute('class','btn btn--next')
      btn2.setAttribute('type','button')
      btn2.innerText = self._opts.next

      btn2.addEventListener('click', function(){
        self._spy('next')
      })

      self._buttons.appendChild(btn2)

    }
  }
}