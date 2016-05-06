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

  function GuideFooter(element, page) {
    _classCallCheck(this, GuideFooter);

    this._element = getNode(element);

    this._skip = this._element.querySelector('.js__footer-skip');
    this._buttons = this._element.querySelector('.js__footer-buttons');
  }

  _createClass(GuideFooter, [{
    key: 'update',
    value: function update(pageNum, page, nextPage) {
      if (pageNum == 0) {
        this._skip.innerText = this._skipText;

        //add a button here
      }
    }
  }]);

  return GuideFooter;
}();

var GuidePage = function GuidePage(element, id, spy) {
  _classCallCheck(this, GuidePage);

  this._id = id || 0;
  this._element = getNode(element);
  this.title = this._element.getAttribute('data-title');
  spy('jamie', true, 12);
};

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

    this._currentPage = -1;
    this._tag = tag;
    this._dots = new Dots('.progress-dots', pages.length);
    this._pages = [];
    // this._footer = new GuideFooter()

    var self = this;
    var tagSpy = getTagSpy(self);
    var footerSpy = getFooterSpy(self);

    for (var i = pages.length - 1; i >= 0; i--) {
      this._pages.push(new GuidePage(pages[i], i, tagSpy));
    }
  }

  _createClass(Guide, [{
    key: 'next',
    value: function next() {
      console.log(this);
      console.log(arguments);
    }
  }, {
    key: 'previous',
    value: function previous() {}
  }]);

  return Guide;
}();

/*
  Guide Helpers / Listeners
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
//spies will be bound to self

var getTagSpy = function getTagSpy(self) {
  var tagSpy = function tagSpy() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.next.apply(this, args);
  };
  return tagSpy.bind(self);
};

var getFooterSpy = function getFooterSpy(self) {
  var footerSpy = function footerSpy(direction) {
    direction == 'next' ? this.next() : this.previous();
  };
};