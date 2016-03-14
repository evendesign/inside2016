function xx(a) {
  console.log(a);
}

var $window = $(window);
var $postShareToolbox = $('.js-post_share_toolbox');

var postHeader = document.querySelectorAll('.js-post_header')[0];
var authorBlock = document.querySelectorAll('.js-author_block')[0];

var postShareToolboxHeight = $postShareToolbox.height();
var authorBlockHeight = authorBlock.offsetHeight;

var currentStatus = '';

var isMobile = function() {
  return window.innerWidth < 640;
}

var getStatus = function () {
  var status;
  if (postHeader.getBoundingClientRect().bottom < 0) {
    if (authorBlock.getBoundingClientRect().top < postShareToolboxHeight + 100) {
      return status = 'bottom';
    }
    return status = 'sticky';
  }
  return status = 'top';
}

var checkShareToolBoxPosition = function() {
  if (isMobile()) return;
  var status = getStatus();

  if (currentStatus == status) return;

  currentStatus = status;
  marginBottom = status == 'bottom' ? authorBlockHeight + 'px' : 0;

  $postShareToolbox
    .removeClass('is-sticky is-bottom is-top')
    .addClass('is-' + currentStatus)
    .css('margin-bottom', marginBottom);
}

var updateAuthorBlockHeight = function() {
  authorBlockHeight = authorBlock.offsetHeight;
  currentStatus = '';
  checkShareToolBoxPosition();
}


$window.on('resize', updateAuthorBlockHeight);
$window.on('scroll', checkShareToolBoxPosition);

checkShareToolBoxPosition();