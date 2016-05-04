class Guide{
  constructor({tag, footer, pages = []}){

    this._currentPage = 0
    this._pages      = pages

    this.tag    = tag
    this.footer = new GuideFooter('.page__footer')
    this.dots   = new Dots('.progress-dots', this._pages.length)

    this.footer.update(this._currentPage, this._pages[this._currentPage])
  }

  next(){
    if(this._crrentPage == this._pages.length) return
    this._currentPage += 1

    this.footer.update(this.currentPage, this._pages[this._currentPage],this._pages[this._currentPage+1])
    this.dots.next()
    this._pages[this._currentPage].render()
  }


}