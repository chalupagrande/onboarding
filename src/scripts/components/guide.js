class Guide{
  constructor({element, pages = [], spy}){

    let self = this
    let pageSpy = getPageSpy(self)
    let footerSpy = getFooterSpy(self)
    let tagSpy = getTagSpy(self)

    this._spy = spy
    this._element = element
    this._status = 0
    this._currentPage = -1
    this.name = this._element.getAttribute('data-guide-name')
    this._tag = new GuideTag(getNode('.guide-tag[data-guide-name="'+this.name+'"]'), null, tagSpy)

    //check to see if guide has '.intro' page
    var pagesWOIntro = makeArray(pages).filter((el)=>{
      return !hasClass(el.querySelector('.page'), 'intro')
    })

    this._dots = new Dots(this._element.querySelector('.progress-dots'), pagesWOIntro.length)
    this._pages = []
    this._intro;
    this._footer = new GuideFooter(this._element.querySelector('.guide-footer'), {}, footerSpy)

    for(var i = 0; i < pages.length; i++){
      if(pages[i].querySelector('.intro')){
        this._intro = new GuidePage(pages[i], -1, pageSpy)
      } else {
        this._pages.push( new GuidePage(pages[i], i, pageSpy))
      }
    }
    this.next()
  }
  intro(){
    this._pages[this._currentPage].remove()
    this._intro.render()
    this._footer.render(-1)
    this._dots.set(0)
    this.status(1)

    //toggle correctPage for demonstration
    window.correctPage = true
  }

  next(){

    //last page -> close guide
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
    var nextTitle = this._pages[this._currentPage +1] ? this._pages[this._currentPage+1].title : '';


    nextPage.render()

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    YOU WERE HERE
    */

    this._footer.render(this._currentPage, this._pages.length, nextTitle)
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
    this._footer.render(this._currentPage, this._pages.length, nextTitle)
    this._dots.previous()
  }
  hide(){
    if(this._currentPage == this._pages.length -1){
      this.status(2)
    }else{
      this.status(1)
    }
    this._element.style.display = 'none'
  }
  show(){
    this._element.style.display = 'block'
    if(!window.correctPage && this._intro){
      this.intro()
    } else {
      //show the next page
      if(this._intro) this._intro.remove()
      var nextPage = this._pages[this._currentPage]
      var nextTitle = this._pages[this._currentPage +1] ? this._pages[this._currentPage+1].title : '';
      nextPage.render()
      this._footer.render(this._currentPage, this._pages.length, nextTitle)
      this._dots.set(this._currentPage+1)
    }
  }
  setSpy(spy){
    this._spy = spy;
  }
  status(num){
    if(!num) return this._status
    this._tag.updateStatus(num)
    this._status = num
  }
}


/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

function getPageSpy(self){
  let pageSpy = function(...args){
    this.next.apply(this, args)
  }
  return pageSpy.bind(self)
}

function getFooterSpy(self){
  let footerSpy = function(direction){
    // direction == 'next' ? this.next() : this.previous()
    if(direction == 'next'){
      this.next()
    } else if(direction == 'previous'){
      this.previous()
    } else if(direction == 'done'){
      this._spy()
    }
  }
  return footerSpy.bind(self)
}

function getTagSpy(self){
  let tagSpy = function(){
    self._spy(self.name)
  }
  return tagSpy.bind(self)
}