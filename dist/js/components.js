'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dots = function () {
  /*
     element must have a `data-count` attribute of the number of
     dots you would like.
  */

  function Dots(element, numSteps) {
    _classCallCheck(this, Dots);

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

  _createClass(Dots, [{
    key: 'next',
    value: function next() {
      if (this._current == this._count) return this._current;
      toggleClass(this._dots[this._current], 'fill');
      this._current < this._count ? this._current += 1 : 1;
      return this._current;
    }
  }, {
    key: 'previous',
    value: function previous() {
      if (this._current == 0) return this._current;
      this._current -= 1;
      toggleClass(this._dots[this._current], 'fill');
      return this._current;
    }
  }, {
    key: 'set',
    value: function set(num) {
      this._current = num;
      for (var i = 0; i < this._dots.length; i++) {
        if (!hasClass(this._dots[i], 'fill') && i < num) {
          toggleClass(this._dots[i], 'fill');
        } else if (hasClass(this._dots[i], 'fill') && i >= num) {
          toggleClass(this._dots[i], 'fill');
        }
      }
    }
  }, {
    key: 'current',
    value: function current() {
      return this._current;
    }
  }]);

  return Dots;
}();

var GuideFooter = function () {
  /*
  opts = {
    prev = STRING: text of previous button
    next = STRING: text of next button
    default = STRING: text for the default overview button
    skip = STRING: text to skip the tutorial
    finished = STRING: text for the last next button
  }
  */

  function GuideFooter(element) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var spy = arguments[2];

    _classCallCheck(this, GuideFooter);

    var self = this;
    this._spy = spy;
    this._element = getNode(element);
    this._skip = this._element.querySelector('.js-footer-skip');
    this._buttons = this._element.querySelector('.js-footer-buttons');
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

  _createClass(GuideFooter, [{
    key: 'render',
    value: function render(pageNum, totalPages, nextTitle) {
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
  }, {
    key: 'buildButtons',
    value: function buildButtons(style) {
      var self = this;
      var btn, btn2;

      //first page
      if (style == 0) {
        btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.setAttribute('type', 'button');
        btn.innerText = self._opts.default;
        btn.addEventListener('click', function () {
          self._spy('next');
        });
        self._buttons.appendChild(btn);

        //middle pages
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

          //last page
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
  }]);

  return GuideFooter;
}();

var GuidePage = function () {
  function GuidePage(element, id, spy) {
    _classCallCheck(this, GuidePage);

    this._id = id || 0;
    this._element = getNode(element);
    this.title = this._element.querySelector('[data-title]').getAttribute('data-title');

    this._element.style.display = 'none';
  }

  _createClass(GuidePage, [{
    key: 'render',
    value: function render() {
      this._element.style.display = 'block';
    }
  }, {
    key: 'remove',
    value: function remove() {
      this._element.style.display = 'none';
    }
  }]);

  return GuidePage;
}();

var GuideTag = function () {
  /*
   Status should be a number between 0-2
    0 = new
   1 = In Progress
   2 = Completed
  */

  function GuideTag(element, status, spy) {
    _classCallCheck(this, GuideTag);

    var self = this;
    this._spy = spy;
    this._element = getNode(element);
    this._status = status || 0;
    this._statusElement = this._element.querySelector('.js-status');

    this.updateStatus();

    this._element.addEventListener('click', function () {
      self._spy();
    });
  }

  // status is a number 0-2


  _createClass(GuideTag, [{
    key: 'updateStatus',
    value: function updateStatus(status) {
      //set status
      if (status < 0 || status > 2) {
        return this._status;
      }

      var stati = ['New', 'In Progress', 'Completed'];
      this._status = status || 0;
      switchClass(this._element, stati, removeSpaceMakeLowercase(stati[this._status]));
      this._statusElement.innerHTML = '<span class="guide-tag__status__' + removeSpaceMakeLowercase(stati[this._status]) + '">' + stati[this._status] + '</span>';
    }
  }]);

  return GuideTag;
}();

var Guide = function () {
  function Guide(_ref) {
    var element = _ref.element;
    var _ref$pages = _ref.pages;
    var pages = _ref$pages === undefined ? [] : _ref$pages;
    var spy = _ref.spy;

    _classCallCheck(this, Guide);

    var self = this;
    var pageSpy = getPageSpy(self);
    var footerSpy = getFooterSpy(self);
    var tagSpy = getTagSpy(self);

    this._spy = spy;
    this._element = element;
    this._status = 0;
    this._currentPage = -1;
    this.name = this._element.getAttribute('data-guide-name');
    this._tag = new GuideTag(getNode('.guide-tag[data-guide-name="' + this.name + '"]'), null, tagSpy);

    this._dots = new Dots(this._element.querySelector('.progress-dots'), pages.length);
    this._pages = [];
    this._footer = new GuideFooter(this._element.querySelector('.guide-footer'), {}, footerSpy);

    for (var i = 0; i < pages.length; i++) {
      this._pages.push(new GuidePage(pages[i], i, pageSpy));
    }

    this.next();
  }

  _createClass(Guide, [{
    key: 'next',
    value: function next() {
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
      var nextTitle = this._pages[this._currentPage + 1] ? this._pages[this._currentPage + 1].title : '';

      nextPage.render();
      this._footer.render(this._currentPage, this._pages.length, nextTitle);
      this._dots.next();
    }
  }, {
    key: 'previous',
    value: function previous() {
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
  }, {
    key: 'hide',
    value: function hide() {
      if (this._currentPage == this._pages.length - 1) {
        this.status(2);
      } else {
        this.status(1);
      }
      this._element.style.display = 'none';
    }
  }, {
    key: 'show',
    value: function show() {
      this._element.style.display = 'block';
    }
  }, {
    key: 'setSpy',
    value: function setSpy(spy) {
      this._spy = spy;
    }
  }, {
    key: 'status',
    value: function status(num) {
      if (!num) return this._status;
      this._tag.updateStatus(num);
      this._status = num;
    }
  }]);

  return Guide;
}();

/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

function getPageSpy(self) {
  var pageSpy = function pageSpy() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.next.apply(this, args);
  };
  return pageSpy.bind(self);
}

function getFooterSpy(self) {
  var footerSpy = function footerSpy(direction) {
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

function getTagSpy(self) {
  var tagSpy = function tagSpy() {
    self._spy(self.name);
  };
  return tagSpy.bind(self);
}

var Walkthrough = function () {
  function Walkthrough(_ref2) {
    var element = _ref2.element;
    var _ref2$guides = _ref2.guides;
    var guides = _ref2$guides === undefined ? [] : _ref2$guides;
    var helpIcon = _ref2.helpIcon;

    _classCallCheck(this, Walkthrough);

    var self = this;
    this._element = element;
    this._guides = guides;
    this._helpIcon = helpIcon;
    this._currentGuide;
    this._guideList = makeArray(this._element.querySelector('.walkthrough__guides').children);

    //hide pages & set spy
    var guideSpy = getGuideSpy(self);
    this._guides.forEach(function (el) {
      el._element.style.display = 'none';
      el.setSpy(guideSpy);
    });
  }

  _createClass(Walkthrough, [{
    key: 'showGuide',
    value: function showGuide(guide) {
      if (typeof guide == 'string') {
        guide = getGuide(this._guides, guide);
      }
      slideoutNav.style.opacity = 1;
      slideoutNav.style.cursor = 'pointer';
      this._element.style.display = 'none';
      guide.show();

      this._currentGuide = guide;

      this.findStatus();
    }
  }, {
    key: 'hideGuide',
    value: function hideGuide() {
      if (!this._currentGuide) return;
      slideoutNav.style.opacity = 0;
      slideoutNav.style.cursor = 'pointer';

      this._currentGuide.hide();
      this._element.style.display = 'block';

      this._currentGuide = undefined;
    }
  }, {
    key: 'findStatus',
    value: function findStatus() {
      for (var i = 0; i < this._guides.length; i++) {
        if (this._guides[i].status() == 0) {
          toggleClass(this._helpIcon, 'highlight');
        }
      }
    }
  }]);

  return Walkthrough;
}();

function getGuideSpy(self) {
  var guideSpy = function guideSpy(action) {
    if (action) {
      self.showGuide(action);
    } else {
      self.hideGuide();
    }
  };
  return guideSpy.bind(self);
}