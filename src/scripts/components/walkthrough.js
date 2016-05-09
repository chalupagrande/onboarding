class Walkthrough{
  constructor({element, guides = []}){
    let self = this
    this._guides = guides
    this._element = element
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
    this._element.style.display = 'none'
    guide.show()

    this._currentGuide = guide
  }

  hideGuide(){
    if(!this._currentGuide) return;
    this._currentGuide.hide()
    this._element.style.display = 'block'

    this._currentGuide = undefined;
  }
}

function getGuideSpy(self){
  let guideSpy = function(){
    debugger;
    this.hideGuide()
  }
  return guideSpy.bind(self)
}