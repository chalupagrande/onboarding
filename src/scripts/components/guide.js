class Guide{
  constructor({element, tag, pages = [], spy}){

    let self = this
    let pageSpy = getPageSpy(self)
    let footerSpy = getFooterSpy(self)

    this._spy = spy
    this._element = element
    this._currentPage = -1
    this._tag = tag
    this._dots = new Dots(this._element.querySelector('.progress-dots'), pages.length)
    this._pages = []
    this._footer = new GuideFooter(this._element.querySelector('.guide-footer'), {}, footerSpy)
    this.name = this._element.getAttribute('data-guide-name')

    for(var i = 0; i < pages.length; i++){
      this._pages.push( new GuidePage(pages[i], i, pageSpy))
    }

    this.next()
  }

  next(){
    if(this._currentPage == this._pages.length -1 ){
      this._spy()
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
      this._spy()
      return
    }
    if(this._currentPage > 0){
      var page = this._pages[this._currentPage]
      page.remove()
    }

    this._currentPage -=1

    var nextPage = this._pages[this._currentPage]
    var nextTitle = nextPage ? nextPage.title : ''

    nextPage.render()
    this._footer.render(this._currentPage, nextTitle)
    this._dots.previous()
  }
  hide(){
    if(this._currentPage == this._pages.length -1 ){
      this._tag.updateStatus(2)
    }else{
      this._tag.updateStatus(1)
    }
    this._element.style.display = 'none'
  }
  show(){
    this._element.style.display = 'block'
  }
  setSpy(spy){
    this._spy = spy;
  }
}


/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

function getPageSpy(self){
  var pageSpy = function(...args){
    this.next.apply(this, args)
  }
  return pageSpy.bind(self)
}

function getFooterSpy(self){
  let footerSpy = function(direction){
    direction == 'next' ? this.next() : this.previous()
  }
  return footerSpy.bind(self)
}