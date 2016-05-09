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
        self.showGuide(guideName)
      })
    })

    //hide pages & set spy
    let guideSpy = getGuideSpy(self)
    this._guides.forEach(function(el){
      el._element.style.display = 'none'
      el.setSpy(guideSpy)
    })


  }

  showGuide(guideName){
    this._element.style.display = 'none'
    var el = getNode('.guide[data-guide-name="'+guideName+'"]')
    el.style.display = 'block'

    this._currentGuide = guideName
  }

  hideGuide(){
    if(!this._currentGuide) return;
    this._element.style.display = 'block'
    var el = getNode('.guide[data-guide-name="'+this._currentGuide+'"]')
    el.style.display = 'none'

    this._currentGuide = undefined;
  }
}

function getGuideSpy(self){
  let guideSpy = function(){
    this.hideGuide()
  }
  return guideSpy.bind(self)
}