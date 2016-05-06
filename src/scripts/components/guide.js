class Guide{
  constructor({tag, footer, pages = []}){

    let self = this
    let tagSpy = getTagSpy(self)
    let footerSpy = getFooterSpy(self)


    this._currentPage = -1
    this._tag = tag
    this._dots = new Dots('.progress-dots', pages.length)
    this._pages = []
    this._footer = new GuideFooter('.guide-footer', {}, footerSpy)

    for(var i = 0; i < pages.length; i++){
      this._pages.push( new GuidePage(pages[i], i, tagSpy))
    }

    this.next()
  }

  next(){
    if(this._currentPage == this._pages.length -1 ){
      toggleSlide()
      return
    }
    if(this._currentPage >= 0){
      var page = this._pages[this._currentPage]
      page.remove()
    }

    this._currentPage +=1

    var nextPage = this._pages[this._currentPage]
    var nextTitle = nextPage ? nextPage.title : ''

    nextPage.render()
    this._footer.render(this._currentPage, nextTitle)
    this._dots.next()
  }
  previous(){
    if(this._currentPage == 0 ){
      toggleSlide()
      return
    }
    if(this._currentPage >= 0){
      var page = this._pages[this._currentPage]
      page.remove()
    }

    this._currentPage +=1

    var nextPage = this._pages[this._currentPage]
    var nextTitle = nextPage ? nextPage.title : ''

    nextPage.render()
    this._footer.render(this._currentPage, nextTitle)
    this._dots.next()
  }
}


/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

function getTagSpy(self){
  var tagSpy = function(...args){
    this.next.apply(this, args)
  }
  return tagSpy.bind(self)
}

function getFooterSpy(self){
  let footerSpy = function(direction){
    console.log(this)
    direction == 'next' ? this.next() : this.previous()
  }
  return footerSpy.bind(self)
}