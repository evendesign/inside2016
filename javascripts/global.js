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

  require = function(src) {
    var tag;

    tag = document.createElement('script');
    tag.setAttribute('src', "/javascripts/" + src + ".js");
    return document.body.appendChild(tag);
  };

  require('_search');

  require('_off-canvas');

  require('_dropdown');

}).call(this);
