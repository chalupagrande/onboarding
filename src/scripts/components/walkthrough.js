class Walkthrough{
  constructor({element, guides = [], helpIcon}){
    let self = this
    this._element = element
    this._guides = guides
    this._helpIcon = helpIcon
    this._currentGuide;
    this._guideList = makeArray(this._element.querySelector('.walkthrough__guides').children)
    this._order = this._guideList

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

    //check if you're on the right page
    guide.show()

    this._currentGuide = guide

    this.findStatus()
  }

  hideGuide(){
    if(!this._currentGuide) return;
    slideoutNav.style.opacity = 0
    slideoutNav.style.cursor = 'pointer'
    this._currentGuide.hide()

    this.rearrangeGuideTags()
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

  rearrangeGuideTags(){
    var inProgress = []
    var complete = []
    this._guides.forEach(function(guide){
      if(guide._status == 1){ inProgress.push(guide)}
      else if(guide._status == 2) {complete.push(guide)}
    })

    var DOMGuideList = this._element.querySelector('.walkthrough__guides')
    var combined = inProgress.concat(complete)
    combined.forEach(function(guide){

      //remove the tag then append to the bottom
      var li = guide._tag._element.parentNode
      var temp = li
      li.parentNode.removeChild(li)
      DOMGuideList.appendChild(temp)
    })
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