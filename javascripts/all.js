var $window = $(window);
var breakpoints = {
  pad: 640,
  desktop: 960
};

function xx(a) {
  console.log(a);
}

function require(src) {
  var tag = document.createElement('script');
  tag.setAttribute('src', '/javascripts/' + src + '.js');
  document.body.appendChild(tag);
}

require('_search')
require('_sticky')
require('_menu')
require('_hero')
