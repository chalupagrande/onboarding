class GuideFooter{
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
  }
  */
  constructor(element, page, opts){
    this._element = document.querySelector(element)
    this._defaultText = opts.default || "See How It Works"
    this._prevText = opts.prev || "Previous"
    this._nextText = opts.next || "Ok, Got it"
    this._skipText = opts.skip || "Skip this tutorial"

    this._skip = this._element.querySelector('.js__footer-skip')
    this._buttons = this._element.querySelector('.js__footer-buttons')
  }

  update(pageNum, page, nextPage){
    if(pageNum == 0){
      this._skip.innerText = this._skipText

      //add a button here
    }
  }
}