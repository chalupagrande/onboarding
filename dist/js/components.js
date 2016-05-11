class Dots {
  /*
     element must have a `data-count` attribute of the number of
     dots you would like.
  */
  constructor(element, numSteps) {
    this._element = getNode(element);
    this._count = numSteps || this._element.getAttribute('data-count');
    this._current = 0;
    this._dots = [];

    var list = document.createElement('ul');
    list.setAttribute('class', 'progress-dots__list');
    for (var i = 0; i < this._count; i++) {
      var li = document.createElement('li');
      li.setAttribute('class', 'progress-dots__list__item');
      var dot = document.createElement('div');
      dot.setAttribute('class', 'nav-dot');
      this._dots.push(dot);
      li.appendChild(dot);
      list.appendChild(li);

      if (i != this._count - 1) {
        var d = document.createElement('li');
        var divider = document.createElement('div');
        divider.setAttribute('class', 'nav-dot-divider');
        d.appendChild(divider);
        list.appendChild(d);
      }
    }
    this._element.appendChild(list);
  }

  next() {
    if (this._current == this._count) return this._current;
    toggleClass(this._dots[this._current], 'fill');
    this._current < this._count ? this._current += 1 : 1;
    return this._current;
  }

  previous() {
    if (this._current == 0) return this._current;
    this._current -= 1;
    toggleClass(this._dots[this._current], 'fill');
    return this._current;
  }

  set(num) {
    this._current = num;
    for (var i = 0; i < this._dots.length; i++) {
      if (!hasClass(this._dots[i], 'fill') && i < num) {
        toggleClass(this._dots[i], 'fill');
      } else if (hasClass(this._dots[i], 'fill') && i >= num) {
        toggleClass(this._dots[i], 'fill');
      }
    }
  }

  current() {
    return this._current;
  }
}
class GuideFooter {
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
    finished = STRING: text for the last next button
  }
  */
  constructor(element, opts = {}, spy) {
    let self = this;
    this._spy = spy;
    this._element = getNode(element);
    this._skip = this._element.querySelector('.js__footer-skip');
    this._buttons = this._element.querySelector('.js__footer-buttons');
    this._opts = {
      prev: opts.prev || "Previous",
      next: opts.next || "OK, got it!",
      default: opts.default || "See How It Works",
      skip: opts.skip || "Skip this tutorial",
      finished: opts.finished || "Get Started!"
    };
    this._skipListener = function () {
      self._spy('done');
    };
  }

  render(pageNum, totalPages, nextTitle) {
    this._buttons.innerHTML = '';
    this._skip.innerHTML = '';

    if (pageNum == 0) {
      this._skip.innerText = this._opts.skip;
      this.buildButtons(0);
      this._skip.addEventListener('click', this._skipListener);
    } else if (pageNum == totalPages - 1) {
      this._skip.innerHTML = "";
      this.buildButtons(2);
    } else {
      this._skip.innerText = "NEXT: " + nextTitle;
      this.buildButtons(1);
      this._skip.removeEventListener('click', this._skipListener);
    }
  }

  buildButtons(style) {
    var self = this;
    var btn, btn2;
    if (style == 0) {
      btn = document.createElement('button');
      btn.setAttribute('class', 'btn');
      btn.setAttribute('type', 'button');
      btn.innerText = self._opts.default;
      btn.addEventListener('click', function () {
        self._spy('next');
      });
      self._buttons.appendChild(btn);
    } else if (style == 1) {
      btn = document.createElement('button');
      btn.setAttribute('class', 'btn--secondary');
      btn.setAttribute('type', 'button');
      btn.innerText = self._opts.prev;

      btn.addEventListener('click', function () {
        self._spy('previous');
      });

      self._buttons.appendChild(btn);

      btn2 = document.createElement('button');
      btn2.setAttribute('class', 'btn');
      btn2.setAttribute('type', 'button');
      btn2.innerText = self._opts.next;

      btn2.addEventListener('click', function () {
        self._spy('next');
      });

      self._buttons.appendChild(btn2);
    } else if (style == 2) {
      btn = document.createElement('button');
      btn.setAttribute('class', 'btn--secondary');
      btn.setAttribute('type', 'button');
      btn.innerText = self._opts.prev;

      btn.addEventListener('click', function () {
        self._spy('previous');
      });

      self._buttons.appendChild(btn);

      btn2 = document.createElement('button');
      btn2.setAttribute('class', 'btn');
      btn2.setAttribute('type', 'button');
      btn2.innerText = self._opts.finished;

      btn2.addEventListener('click', function () {
        self._spy('next');
      });

      self._buttons.appendChild(btn2);
    }
  }
}

class GuidePage {
  constructor(element, id, spy) {
    this._id = id || 0;
    this._element = getNode(element);
    this.title = this._element.querySelector('[data-title]').getAttribute('data-title');

    this._element.style.display = 'none';
  }

  render() {
    this._element.style.display = 'block';
  }
  remove() {
    this._element.style.display = 'none';
  }
}
class GuideTag {
  /*
   Status should be a number between 0-2
    0 = new
   1 = In Progress
   2 = Completed
  */
  constructor(element, status) {
    this._element = getNode(element);
    this._status = status || 0;
    this._statusElement = this._element.querySelector('.js__status');

    this.updateStatus();
  }

  // status is a number 0-2
  updateStatus(status) {
    //set status
    if (status < 0 || status > 2) {
      return this._status;
    }

    const stati = ['New', 'In Progress', 'Completed'];
    this._status = status || 0;
    switchClass(this._element, stati, removeSpaceMakeLowercase(stati[this._status]));
    this._statusElement.innerHTML = '<span class="guide-tag__status__' + removeSpaceMakeLowercase(stati[this._status]) + '">' + stati[this._status] + '</span>';
  }
}
class Guide {
  constructor({ element, tag, pages = [], spy }) {

    let self = this;
    let pageSpy = getPageSpy(self);
    let footerSpy = getFooterSpy(self);

    this._spy = spy;
    this._element = element;
    this._status = 0;
    this._currentPage = -1;
    this._tag = tag;
    this._dots = new Dots(this._element.querySelector('.progress-dots'), pages.length);
    this._pages = [];
    this._footer = new GuideFooter(this._element.querySelector('.guide-footer'), {}, footerSpy);
    this.name = this._element.getAttribute('data-guide-name');

    for (var i = 0; i < pages.length; i++) {
      this._pages.push(new GuidePage(pages[i], i, pageSpy));
    }

    this.next();
  }

  next() {
    if (this._currentPage == this._pages.length - 1) {
      this._spy();
      return;
    }
    if (this._currentPage >= 0) {
      var page = this._pages[this._currentPage];
      page.remove();
    }
    this._currentPage += 1;

    var nextPage = this._pages[this._currentPage];
    var nextTitle = nextPage ? nextPage.title : '';

    nextPage.render();
    this._footer.render(this._currentPage, this._pages.length, nextTitle);
    this._dots.next();
  }
  previous() {
    if (this._currentPage == 0) {
      this._spy();
      return;
    }
    if (this._currentPage > 0) {
      var page = this._pages[this._currentPage];
      page.remove();
    }

    this._currentPage -= 1;

    var nextPage = this._pages[this._currentPage];
    var nextTitle = nextPage ? nextPage.title : '';

    nextPage.render();
    this._footer.render(this._currentPage, this._pages.length, nextTitle);
    this._dots.previous();
  }
  hide() {
    if (this._currentPage == this._pages.length - 1) {
      this.status(2);
    } else {
      this.status(1);
    }
    this._element.style.display = 'none';
  }
  show() {
    this._element.style.display = 'block';
  }
  setSpy(spy) {
    this._spy = spy;
  }
  status(num) {
    if (!num) return this._status;
    this._tag.updateStatus(num);
    this._status = num;
  }
}

/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

function getPageSpy(self) {
  let pageSpy = function (...args) {
    this.next.apply(this, args);
  };
  return pageSpy.bind(self);
}

function getFooterSpy(self) {
  let footerSpy = function (direction) {
    // direction == 'next' ? this.next() : this.previous()
    if (direction == 'next') {
      this.next();
    } else if (direction == 'previous') {
      this.previous();
    } else if (direction == 'done') {
      this._spy();
    }
  };
  return footerSpy.bind(self);
}
class Walkthrough {
  constructor({ element, guides = [], helpIcon }) {
    let self = this;
    this._element = element;
    this._guides = guides;
    this._helpIcon = helpIcon;
    this._currentGuide;
    this._guideList = makeArray(this._element.querySelector('.walkthrough__guides').children);

    //add listeners to GuideTags
    this._guideList.forEach(function (el) {
      el.addEventListener('click', function () {
        var targetGuide = this.querySelector('.guide-tag[data-guide-name]');
        var guideName = targetGuide.getAttribute('data-guide-name');
        var g = getGuide(self._guides, guideName);
        self.showGuide(g);
      });
    });

    //hide pages & set spy
    let guideSpy = getGuideSpy(self);
    this._guides.forEach(function (el) {
      el._element.style.display = 'none';
      el.setSpy(guideSpy);
    });
  }

  showGuide(guide) {
    slideoutNav.style.opacity = 1;
    slideoutNav.style.cursor = 'pointer';
    this._element.style.display = 'none';
    guide.show();

    this._currentGuide = guide;

    this.findStatus();
  }

  hideGuide() {
    if (!this._currentGuide) return;
    slideoutNav.style.opacity = 0;
    slideoutNav.style.cursor = 'pointer';

    this._currentGuide.hide();
    this._element.style.display = 'block';

    this._currentGuide = undefined;
  }
  findStatus() {
    for (var i = 0; i < this._guides.length; i++) {
      if (this._guides[i].status() == 0) {
        toggleClass(this._helpIcon, 'highlight');
      }
    }
  }
}

function getGuideSpy(self) {
  let guideSpy = function () {
    this.hideGuide();
  };
  return guideSpy.bind(self);
}