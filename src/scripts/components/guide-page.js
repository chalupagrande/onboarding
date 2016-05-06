class GuidePage{
  constructor(element, id, spy){
    this._id = id || 0
    this._element = getNode(element)
    this.title = this._element.querySelector('[data-title]').getAttribute('data-title')

    this._element.style.display = 'none'
  }

  render(){
    this._element.style.display = 'block'
  }
  remove(){
    this._element.style.display = 'none'
  }
}