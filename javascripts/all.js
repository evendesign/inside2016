// Global Variables
// ------------------------------------------------------

$window = $(window);


// Menu
// ------------------------------------------------------

var $menuSwitch = $('.js-menu_btn, .js-off_canvas_mask');
var $menuIcon = $('.js-menu_icon');
var $offCanvasTarget = $('.js-off_canvas');

var isMenuOpen = false;

var toggleMenu = function() {
  $menuIcon.toggleClass('is-active', isMenuOpen);
  $offCanvasTarget.toggleClass('is-menu_open', isMenuOpen);
}

var menu = {
  close: function() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    toggleMenu();
  },
  toggle: function() {
    isMenuOpen = !isMenuOpen;
    toggleMenu();
  }
}

$menuSwitch.on('click', menu.toggle);
$window.on('resize', menu.close);
