class Walkthrough{
  constructor({element, guides = [], helpIcon}){
    let self = this
    this._element = element
    this._guides = guides
    this._helpIcon = helpIcon
    this._currentGuide;
    this._guideList = makeArray(this._element.querySelector('.walkthrough__guides').children)

    //hide pages & set spy
    let guideSpy = getGuideSpy(self)
    this._guides.forEach(function(el){
      el._element.style.display = 'none'
      el.setSpy(guideSpy)
    })
  }

  showGuide(guide){
    if(typeof guide == 'string'){
      guide = getGuide(this._guides, guide)
    }
    slideoutNav.style.opacity = 1
    slideoutNav.style.cursor = 'pointer'
    this._element.style.display = 'none'
    guide.show()

    this._currentGuide = guide

    this.findStatus()
  }

  hideGuide(){
    if(!this._currentGuide) return;
    slideoutNav.style.opacity = 0
    slideoutNav.style.cursor = 'pointer'

    this._currentGuide.hide()
    this._element.style.display = 'block'

    this._currentGuide = undefined;
  }
  findStatus(){
    for(var i = 0; i < this._guides.length; i++){
      if(this._guides[i].status() == 0){
        toggleClass(this._helpIcon,'is-highlighted')
      }
    }
  }
}

function getGuideSpy(self){
  let guideSpy = function(action){
    if(action){
      self.showGuide(action)
    } else {
      self.hideGuide()
    }
  }
  return guideSpy.bind(self)
}