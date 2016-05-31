return if isTouchDevice() || CSS.supports('(position: -webkit-sticky)')

$postShareToolbox = $('.post_toolbox-sticky')
return unless $postShareToolbox.length

postHeader = document.querySelectorAll('.js-post_header')[0]
authorBlock = document.querySelectorAll('.js-post_footer')[0]

postShareToolboxHeight = $postShareToolbox.height()

currentStatus = ''

getStatus = ->
  if postHeader.getBoundingClientRect().bottom < 0
    if authorBlock.getBoundingClientRect().top < postShareToolboxHeight + 48 + 36
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
