class Guide{
  constructor({tag, footer, pages = []}){

    this._currentPage = -1
    this._tag = tag
    this._dots = new Dots('.progress-dots', pages.length)
    this._pages = []
    // this._footer = new GuideFooter()


  let self = this
    let tagSpy = getTagSpy(self)
    let footerSpy = getFooterSpy(self)


    for(var i = pages.length-1; i >= 0; i--){
      this._pages.push( new GuidePage(pages[i], i, tagSpy))
    }
  }

  next(){
    console.log(this)
    console.log(arguments)
  }
  previous(){

  }
}


/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

let getTagSpy = function(self){
  var tagSpy = function(...args){
    this.next.apply(this, args)
  }
  return tagSpy.bind(self)
}

let getFooterSpy = function(self){
  let footerSpy = function(direction){
    direction == 'next' ? this.next() : this.previous()
  }
}