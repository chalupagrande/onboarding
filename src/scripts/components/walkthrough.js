class Walkthrough{
  constructor({element, guides = [], helpIcon}){
    let self = this
    this._element = element
    this._guides = guides
    this._helpIcon = helpIcon
    this._currentGuide;
    this._guideList = makeArray(this._element.querySelector('.walkthrough__guides').children)

    //add listeners to GuideTags
    this._guideList.forEach(function(el){
      el.addEventListener('click', function(){
        var targetGuide = this.querySelector('.guide-tag[data-guide-name]')
        var guideName = targetGuide.getAttribute('data-guide-name')
        var g = getGuide(self._guides, guideName)
        self.showGuide(g)
      })
    })

    //hide pages & set spy
    let guideSpy = getGuideSpy(self)
    this._guides.forEach(function(el){
      el._element.style.display = 'none'
      el.setSpy(guideSpy)
    })
  }

  showGuide(guide){
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
        toggleClass(this._helpIcon,'highlight')
      }
    }
  }
}

function getGuideSpy(self){
  let guideSpy = function(){
    this.hideGuide()
  }
  return guideSpy.bind(self)
}