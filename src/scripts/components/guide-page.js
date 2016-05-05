class GuidePage{
  constructor(element, id){
    this._id = id || 0
    this._element = document.querySelector(element)
    this.title = this._element.getAttribute('data-title')
  }
}