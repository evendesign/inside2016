(function() {
  var Dropdown, closeAllDropdown, lazyCreateDropdown,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Dropdown = (function() {
    function Dropdown(root) {
      this.root = root;
      this.toggle = __bind(this.toggle, this);
      this.close = __bind(this.close, this);
      this.trigger = this.root.find('> .dropdown_trigger');
      this.trigger.on('click', this.toggle);
      this.open();
    }

    Dropdown.prototype.open = function() {
      if (this.isOpen) {
        return;
      }
      this.isOpen = true;
      return this._render();
    };

    Dropdown.prototype.close = function(e) {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;
      return this._render();
    };

    Dropdown.prototype.toggle = function(e) {
      e.preventDefault();
      this.isOpen = !this.isOpen;
      return this._render();
    };

    Dropdown.prototype._render = function() {
      var _this = this;

      return setTimeout(function() {
        return _this.root.toggleClass('is-active', _this.isOpen);
      }, 0);
    };

    return Dropdown;

  })();

  lazyCreateDropdown = function(e) {
    var $el;

    e.preventDefault();
    $el = $(this).closest('.dropdown');
    if ($el.data('dropdown')) {
      return;
    }
    return $el.data('dropdown', new Dropdown($el));
  };

  closeAllDropdown = function(e) {
    if ($(e.target).closest('.dropdown.is-active').length) {
      return;
    }
    return $('.dropdown.is-active').each(function(i, el) {
      return $(el).data('dropdown').close();
    });
  };

  $document.on('click', '.dropdown_trigger', lazyCreateDropdown);

  $document.on('click', closeAllDropdown);

}).call(this);
