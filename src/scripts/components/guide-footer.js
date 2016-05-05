class GuideFooter{
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
  }

  element = wrapper to inject footer styles.
  */
  constructor(element, page, opts){
    this._element = document.querySelector(element)

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