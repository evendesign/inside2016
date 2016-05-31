(function() {
  var $postShareToolbox, authorBlock, checkShareToolBoxPosition, currentStatus, getStatus, postHeader, postShareToolboxHeight;

  if (isTouchDevice() || CSS.supports('(position: -webkit-sticky)')) {
    return;
  }

  $postShareToolbox = $('.post_toolbox-sticky');

  if (!$postShareToolbox.length) {
    return;
  }

  postHeader = document.querySelectorAll('.js-post_header')[0];

  authorBlock = document.querySelectorAll('.js-post_footer')[0];

  postShareToolboxHeight = $postShareToolbox.height();

  currentStatus = '';

  getStatus = function() {
    if (postHeader.getBoundingClientRect().bottom < 0) {
      if (authorBlock.getBoundingClientRect().top < postShareToolboxHeight + 48 + 36) {
        return 'bottom';
      }
      return 'sticky';
    }
    return 'top';
  };

  checkShareToolBoxPosition = function() {
    var status;

    status = getStatus();
    if (currentStatus === status) {
      return;
    }
    currentStatus = status;
    return $postShareToolbox.removeClass('is-sticky is-bottom is-top').addClass("is-" + currentStatus);
  };

  $window.on('scroll', checkShareToolBoxPosition);

  checkShareToolBoxPosition();

}).call(this);
