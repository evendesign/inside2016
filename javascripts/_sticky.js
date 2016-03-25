var $postShareToolbox = $('.js-post_toolbox');

(function(){
  if (!$postShareToolbox.length) return;

  var postHeader = document.querySelectorAll('.js-post_header')[0];
  var authorBlock = document.querySelectorAll('.js-post_footer')[0];

  var postShareToolboxHeight = $postShareToolbox.height();
  var postShareToolboxOffsetTop = 48
  var authorBlockHeight = authorBlock.offsetHeight + 48;

  var currentStatus = '';

  var isMobile = function() {
    return window.innerWidth < breakpoints.pad;
  };

  var getStatus = function () {
    var status;
    if (postHeader.getBoundingClientRect().bottom - postShareToolboxOffsetTop < 0) {
      if (authorBlock.getBoundingClientRect().top < postShareToolboxHeight + postShareToolboxOffsetTop + 48) {
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
