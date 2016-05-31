return if isTouchDevice() || CSS.supports('(position: -webkit-sticky)')

$postShareToolbox = $('.post_toolbox-sticky')
return unless $postShareToolbox.length

postHeader = document.querySelectorAll('.js-post_header')[0]
authorBlock = document.querySelectorAll('.js-post_footer')[0]

postShareToolboxHeight = $postShareToolbox.height()
postShareToolboxOffsetTop = 36

currentStatus = ''

getStatus = ->
  if postHeader.getBoundingClientRect().bottom - postShareToolboxOffsetTop < 0
    if authorBlock.getBoundingClientRect().top < postShareToolboxHeight + postShareToolboxOffsetTop + 36
      return 'bottom'
    return 'sticky'
  return 'top'

checkShareToolBoxPosition = ->
  status = getStatus()
  return if currentStatus == status
  currentStatus = status

  $postShareToolbox
    .removeClass('is-sticky is-bottom is-top')
    .addClass("is-#{currentStatus}")

$window.on('scroll', checkShareToolBoxPosition)

checkShareToolBoxPosition()
