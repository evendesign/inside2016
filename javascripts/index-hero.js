(function() {
  var $root, ACTIVE_CLASS, Hero, MenuItem, PANNING_CLASS, Page, Pagedot, Slide, THRESHOLD, translateX,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $root = $('.js-hero');

  if (!$root.length) {
    return;
  }

  PANNING_CLASS = 'is-panning';

  ACTIVE_CLASS = 'is-active';

  THRESHOLD = .3;

  translateX = function(el, x) {
    var value;

    value = x != null ? "translateX(" + x + "px)" : '';
    el.style.transform = value;
    return el.style.msTransform = value;
  };

  Page = (function() {
    function Page() {}

    Page.prototype._isCurrent = function() {
      return this.index === this.parent.currentIndex;
    };

    Page.prototype._updateClass = function() {
      return this.root.toggleClass('is-active', this._isCurrent());
    };

    return Page;

  })();

  Slide = (function(_super) {
    __extends(Slide, _super);

    function Slide(root, index, parent) {
      this.root = root;
      this.index = index;
      this.parent = parent;
    }

    Slide.prototype._pan = function(delta) {
      var moveX;

      if (!this.isPanning) {
        this.root.addClass('is-panning');
        this.isPanning = true;
      }
      if (this._isCurrent()) {
        if (this.index === 0 || (this.index === this.parent.max && delta * this.parent.dir < 0)) {
          moveX = delta * 0.5;
        } else {
          moveX = delta;
        }
      } else {
        moveX = (this.parent.width + delta * this.parent.dir) * this.parent.dir;
      }
      return translateX(this.root[0], moveX);
    };

    Slide.prototype._panend = function() {
      this.isPanning = false;
      this.root.removeClass('is-panning');
      return translateX(this.root[0]);
    };

    return Slide;

  })(Page);

  Pagedot = (function(_super) {
    __extends(Pagedot, _super);

    function Pagedot(index, parent) {
      var _this = this;

      this.index = index;
      this.parent = parent;
      this.root = $('.js-hero_pagination_item').eq(this.index);
      this.root.on('click', function() {
        return _this.parent.setIndex(_this.index);
      });
    }

    return Pagedot;

  })(Page);

  MenuItem = (function(_super) {
    __extends(MenuItem, _super);

    function MenuItem(index, parent) {
      var _this = this;

      this.index = index;
      this.parent = parent;
      this.root = $('.js-hero_menu_item').eq(this.index);
      this.root.on('mouseover', function() {
        return _this.parent.setIndex(_this.parent.max - _this.index);
      });
    }

    MenuItem.prototype._isCurrent = function() {
      return this.index === this.parent.max - this.parent.currentIndex;
    };

    return MenuItem;

  })(Page);

  Hero = (function() {
    function Hero() {
      this._arrayDo = __bind(this._arrayDo, this);
      this._panend = __bind(this._panend, this);
      this._pan = __bind(this._pan, this);
      this._updateDimension = __bind(this._updateDimension, this);      this.window = $(window);
      this.root = $root;
      this.children = this.root.find('.js-hero_slide');
      this.loadingIndicator = this.root.find('.js_loading_indicator');
      this.length = this.children.length;
      this.max = this.length - 1;
      this.currentIndex = this.max;
      this.slides = [];
      this.pagedots = [];
      this.menuItems = [];
      this._load();
    }

    Hero.prototype._load = function() {
      var loadedImageLength,
        _this = this;

      loadedImageLength = 0;
      return this.children.each(function(index, el) {
        var url;

        _this.slides.push(new Slide($(el), index, _this));
        _this.pagedots.push(new Pagedot(index, _this));
        _this.menuItems.push(new MenuItem(index, _this));
        url = el.style.backgroundImage.replace(/["']/g, '').match(/\((.*)\)/)[1];
        return $('<img>').on('load', function() {
          loadedImageLength++;
          if (loadedImageLength === _this.length) {
            return _this._loaded();
          }
        }).attr('src', url);
      });
    };

    Hero.prototype._loaded = function() {
      var _this = this;

      this.root.toggleClass('is-loading is-entering');
      this._init();
      return setTimeout(function() {
        _this.root.removeClass('is-entering');
        return _this.loadingIndicator.remove();
      }, 2250);
    };

    Hero.prototype._init = function() {
      this._bindEventHandler();
      this._updateDimension();
      return this._updateClass();
    };

    Hero.prototype._updateDimension = function() {
      this.width = this.children.width();
      return this.dir = this.window.width() < parseInt(breakpoints.desktop, 10) && -1 || 1;
    };

    Hero.prototype._bindEventHandler = function() {
      this.window.on('resize', this._updateDimension);
      if (!isTouchDevice()) {
        return;
      }
      this.mc = new Hammer(this.root[0]);
      this.mc.on('panleft panright', this._pan);
      return this.mc.on('panend', this._panend);
    };

    Hero.prototype._getPanningSlide = function() {
      var index;

      if (this.delta * this.dir > 0) {
        index = this.currentIndex;
      } else {
        if (index === this.max) {
          return false;
        }
        index = Math.min(this.currentIndex + 1, this.max);
      }
      return this.slides[index];
    };

    Hero.prototype._pan = function(e) {
      this.delta = e.deltaX;
      this.panningSlide || (this.panningSlide = this._getPanningSlide());
      if (this.panningSlide == null) {
        return;
      }
      return this.panningSlide._pan(this.delta);
    };

    Hero.prototype._panend = function() {
      if (this.panningSlide == null) {
        return;
      }
      this.panningSlide._panend();
      this.panningSlide = null;
      if (!(Math.abs(this.delta) > this.width * THRESHOLD)) {
        return;
      }
      if (this.delta * this.dir > 0) {
        return this.prev();
      } else {
        return this.next();
      }
    };

    Hero.prototype._arrayDo = function(array, func, e) {
      var obj, _i, _len, _results;

      if (e == null) {
        e = null;
      }
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        obj = array[_i];
        _results.push(obj[func](e));
      }
      return _results;
    };

    Hero.prototype._updateClass = function() {
      this._arrayDo(this.slides, '_updateClass');
      this._arrayDo(this.pagedots, '_updateClass');
      return this._arrayDo(this.menuItems, '_updateClass');
    };

    Hero.prototype.prev = function() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      return this._updateClass();
    };

    Hero.prototype.next = function() {
      this.currentIndex = Math.min(this.currentIndex + 1, this.max);
      return this._updateClass();
    };

    Hero.prototype.setIndex = function(currentIndex) {
      this.currentIndex = currentIndex;
      return this._updateClass();
    };

    return Hero;

  })();

  window.hero = new Hero();

}).call(this);
