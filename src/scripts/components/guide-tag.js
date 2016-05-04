class GuideTag{
  /*
   Status should be a number between 0-2

   0 = new
   1 = In Progress
   2 = Completed
  */
  constructor(element, status){
    this._element       = document.querySelector(element)
    this._status        = status || 0
    this._statusElement = this._element.querySelector('.js__status')
    this._page          = 0

    this.updateStatus()
  }

  // status is a number 0-2
  updateStatus(status){
    //set status
    if(status < 0 || status > 2){
      return this._status
    }

    const stati = ['new', 'in progress', 'completed']
    this._status = status || 0
    this._element.classList
    this._statusElement.innerHTML = '<span class="guide-tag__status__'+
                 removeSpaceMakeLowercase(stati[this._status])+'">'+stati[this._status].toUpperCase()+'</span>'
  }

  nextPage(){
    this._page += 1
    return this._page
  }
  previousPage(){
    this._page -= 1
    return this._page
  }
}