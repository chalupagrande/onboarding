class GuideFooter{
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
  }
  */
  constructor(element, page){
    this._element = getNode(element)

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