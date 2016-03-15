// Global Variables
// ------------------------------------------------------

var $window = $(window);
var breakpoints = {
  pad: 640,
  desktop: 960
};

function xx(a) {
  console.log(a);
}


// Menu
// ------------------------------------------------------

var $menuSwitch = $('.js-menu_btn, .js-off_canvas_mask');
var $menuIcon = $('.js-menu_icon');
var $offCanvasTarget = $('.js-off_canvas');

var isMenuOpen = false;

var toggleMenu = function() {
  $menuIcon.toggleClass('is-active', isMenuOpen);
  $offCanvasTarget.toggleClass('is-menu_open', isMenuOpen);
};

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
};

$menuSwitch.on('click', menu.toggle);
$window.on('resize', menu.close);


// Sticky share toolblox
// -----------------------------------------------------

var $postShareToolbox = $('.js-post_share_toolbox');

(function(){
  if (!$postShareToolbox.length) return;

  var postHeader = document.querySelectorAll('.js-post_header')[0];
  var authorBlock = document.querySelectorAll('.js-author_block')[0];

  var postShareToolboxHeight = $postShareToolbox.height();
  var postShareToolboxMargin = parseInt($postShareToolbox.css('margin-top'), 10)
  var authorBlockHeight = authorBlock.offsetHeight;

  var currentStatus = '';

  var isMobile = function() {
    return window.innerWidth < breakpoints.pad;
  };

  var getStatus = function () {
    var status;
    if (postHeader.getBoundingClientRect().bottom - postShareToolboxMargin < 0) {
      if (authorBlock.getBoundingClientRect().top < postShareToolboxHeight + postShareToolboxMargin) {
        return status = 'bottom';
      }
      return status = 'sticky';
    }
    return status = 'top';
  };

  var checkShareToolBoxPosition = function() {
    if (isMobile()) {
      $postShareToolbox[0].style.marginBottom = '';
      return;
    }
    var status = getStatus();

    if (currentStatus == status) return;

    currentStatus = status;
    marginBottom = status == 'bottom' ? authorBlockHeight + 'px' : 0;

    $postShareToolbox
      .removeClass('is-sticky is-bottom is-top')
      .addClass('is-' + currentStatus)
      .css('margin-bottom', marginBottom);
  };

  var updateAuthorBlockHeight = function() {
    authorBlockHeight = authorBlock.offsetHeight;
    currentStatus = '';
    checkShareToolBoxPosition();
  };


  $window.on('resize', updateAuthorBlockHeight);
  $window.on('scroll', checkShareToolBoxPosition);

  checkShareToolBoxPosition();
})()