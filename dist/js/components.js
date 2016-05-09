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
  }
  */

  function GuideFooter(element) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var spy = arguments[2];

    _classCallCheck(this, GuideFooter);

    this._spy = spy;
    this._element = getNode(element);
    this._skip = this._element.querySelector('.js__footer-skip');
    this._buttons = this._element.querySelector('.js__footer-buttons');
    this._opts = {
      prev: opts.prev || "Previous",
      next: opts.next || "Next",
      default: opts.default || "See How It Works",
      skip: opts.skip || "Skip this tutorial"
    };
  }

  _createClass(GuideFooter, [{
    key: 'render',
    value: function render(pageNum, nextTitle) {
      this._buttons.innerHTML = '';
      this._skip.innerHTML = '';

      if (pageNum == 0) {
        this._skip.innerText = this._opts.skip;
      } else {
        this._skip.innerText = "NEXT: " + nextTitle;
      }
      this.buildButtons(pageNum);
    }
  }, {
    key: 'buildButtons',
    value: function buildButtons(pageNum) {
      var self = this;
      if (pageNum == 0) {
        var btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.setAttribute('type', 'button');
        btn.innerText = self._opts.default;
        btn.addEventListener('click', function () {
          self._spy('next');
        });
        self._buttons.appendChild(btn);
      } else {
        var btn = document.createElement('button');
        btn.setAttribute('class', 'btn--secondary');
        btn.setAttribute('type', 'button');
        btn.innerText = self._opts.prev;

        btn.addEventListener('click', function () {
          self._spy('previous');
        });

        self._buttons.appendChild(btn);

        var btn2 = document.createElement('button');
        btn2.setAttribute('class', 'btn');
        btn2.setAttribute('type', 'button');
        btn2.innerText = self._opts.next;

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

  function GuideTag(element, status) {
    _classCallCheck(this, GuideTag);

    this._element = getNode(element);
    this._status = status || 0;
    this._statusElement = this._element.querySelector('.js__status');
    this._page = 0;

    this.updateStatus();
  }

  // status is a number 0-2


  _createClass(GuideTag, [{
    key: 'updateStatus',
    value: function updateStatus(status) {
      //set status
      if (status < 0 || status > 2) {
        return this._status;
      }

      var stati = ['new', 'in progress', 'completed'];
      this._status = status || 0;
      this._element.classList;
      this._statusElement.innerHTML = '<span class="guide-tag__status__' + removeSpaceMakeLowercase(stati[this._status]) + '">' + stati[this._status].toUpperCase() + '</span>';
    }
  }, {
    key: 'nextPage',
    value: function nextPage() {
      this._page += 1;
      return this._page;
    }
  }, {
    key: 'previousPage',
    value: function previousPage() {
      this._page -= 1;
      return this._page;
    }
  }]);

  return GuideTag;
}();

var Guide = function () {
  function Guide(_ref) {
    var tag = _ref.tag;
    var footer = _ref.footer;
    var _ref$pages = _ref.pages;
    var pages = _ref$pages === undefined ? [] : _ref$pages;

    _classCallCheck(this, Guide);

    var self = this;
    var tagSpy = getTagSpy(self);
    var footerSpy = getFooterSpy(self);

    this._currentPage = -1;
    this._tag = tag;
    this._dots = new Dots('.progress-dots', pages.length);
    this._pages = [];
    this._footer = new GuideFooter('.guide-footer', {}, footerSpy);

    for (var i = 0; i < pages.length; i++) {
      this._pages.push(new GuidePage(pages[i], i, tagSpy));
    }

    this.next();
  }

  _createClass(Guide, [{
    key: 'next',
    value: function next() {
      if (this._currentPage == this._pages.length - 1) {
        toggleSlide();
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
      this._footer.render(this._currentPage, nextTitle);
      this._dots.next();
    }
  }, {
    key: 'previous',
    value: function previous() {
      if (this._currentPage == 0) {
        toggleSlide();
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
      this._footer.render(this._currentPage, nextTitle);
      this._dots.previous();
    }
  }]);

  return Guide;
}();

/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

function getTagSpy(self) {
  var tagSpy = function tagSpy() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.next.apply(this, args);
  };
  return tagSpy.bind(self);
}

function getFooterSpy(self) {
  var footerSpy = function footerSpy(direction) {
    console.log(this);
    direction == 'next' ? this.next() : this.previous();
  };
  return footerSpy.bind(self);
}

var Walkthrough = function Walkthrough() {
  var guides = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  _classCallCheck(this, Walkthrough);

  this._guides = guides;
};