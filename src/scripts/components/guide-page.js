class GuidePage{
  constructor(element, id, spy){
    this._id = id || 0
    this._element = getNode(element)
    this.title = this._element.getAttribute('data-title')
    spy('jamie',true,12)
  }
}