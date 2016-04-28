(function() {
  var require;

  window.$window = $(window);

  window.$document = $(document);

  window.breakpoints = {
    pad: 640,
    desktop: 960
  };

  window.xx = function(a) {
    return console.log(a);
  };

  window.isTouchDevice = function() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  };

  if ($('.js-auto_break_text, .js-auto_break_title').length) {
    $('.js-auto_break_text').macho({
      'length': 5
    });
    $('.js-auto_break_title').macho({
      'length': 3
    });
  }

  require = function(src) {
    var tag;

    tag = document.createElement('script');
    tag.setAttribute('src', "/javascripts/" + src + ".js");
    return document.body.appendChild(tag);
  };

  require('search');

  require('off-canvas');

  require('dropdown');

}).call(this);
