(function() {
  var Menu,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Menu = (function() {
    function Menu() {
      this.toggle = __bind(this.toggle, this);
      this.close = __bind(this.close, this);      $('.menu').clone().appendTo('.js-off_canvas_menu_container');
      this.offCanvas = $('.js-off_canvas');
      this.menuSwitch = $('.js-menu_switch');
      this.mask = $('.js-off_canvas_mask');
      this.isMenuOpen = false;
      this._bind();
    }

    Menu.prototype._bind = function() {
      this.menuSwitch.on('click', this.toggle);
      if (isTouchDevice()) {
        $window.on('orientationchange', this.close);
        return this.mask.on('touchstart', this.close);
      } else {
        $window.on('resize', this.close);
        return this.mask.on('click', this.close);
      }
    };

    Menu.prototype._toggleClass = function() {
      return this.offCanvas.toggleClass('is-menu_open', this.isMenuOpen);
    };

    Menu.prototype.close = function() {
      if (!this.isMenuOpen) {
        return;
      }
      this.isMenuOpen = false;
      this._toggleClass();
      return document.activeElement.blur();
    };

    Menu.prototype.toggle = function() {
      this.isMenuOpen = !this.isMenuOpen;
      return this._toggleClass();
    };

    return Menu;

  })();

  new Menu();

}).call(this);
