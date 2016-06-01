$postToolbox = $('.post_toolbox-sticky')
return unless $postToolbox.length

postHeader = document.querySelectorAll('.js-post_header')[0]

checkLogoStatus = -> $postToolbox.toggleClass('is-logo-revealed', postHeader.getBoundingClientRect().bottom < 0)

$window.on('scroll', checkLogoStatus)
checkLogoStatus()

return if isTouchDevice() || CSS.supports('(position: -webkit-sticky)')

authorBlock = document.querySelectorAll('.js-post_footer')[0]

postToolboxDims =
  height: $postToolbox.height()
  margin:
    top: 36
    bottom: 48

currentStatus = ''

getStatus = ->
  if postHeader.getBoundingClientRect().bottom < 0
    if authorBlock.getBoundingClientRect().top < postToolboxDims.margin.top + postToolboxDims.height + postToolboxDims.margin.bottom
      return 'bottom'
    return 'sticky'
  return 'top'

checkShareToolBoxStatus = ->
  status = getStatus()
  return if currentStatus == status
  currentStatus = status

  $postToolbox
    .removeClass('is-sticky is-bottom is-top')
    .addClass("is-#{currentStatus}")

$window.on('scroll', checkShareToolBoxStatus)
checkShareToolBoxStatus()
