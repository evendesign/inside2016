window.$window = $(window)
window.$document = $(document)

window.breakpoints =
  pad: 640
  desktop: 960

window.xx = (a) -> console.log(a)
window.isTouchDevice = -> `'ontouchstart' in window` || navigator.maxTouchPoints

require = (src) ->
  tag = document.createElement('script')
  tag.setAttribute('src', "/javascripts/#{src}.js")
  document.body.appendChild(tag)

require('search')
require('off-canvas')
require('dropdown')
