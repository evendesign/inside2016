window.$window = $(window)
window.$document = $(document)

window.breakpoints =
  pad: 640
  desktop: 960

window.xx = (a) -> console.log(a)
window.isTouchDevice = -> `'ontouchstart' in window` || navigator.maxTouchPoints

# macho
if $('.js-auto_break_text, .js-auto_break_title').length
  $('.js-auto_break_text').macho 'length': 5
  $('.js-auto_break_title').macho 'length': 3

require = (src) ->
  tag = document.createElement('script')
  tag.setAttribute('src', "/javascripts/#{src}.js")
  document.body.appendChild(tag)

require('search')
require('off-canvas')
require('dropdown')

