$menuSwitch = $('.js-menu_btn, .js-off_canvas_mask')
$menuIcon = $('.js-menu_icon')
$offCanvas = $('.js-off_canvas')

isMenuOpen = false

toggleMenu = ->
  $menuIcon.toggleClass('is-active', isMenuOpen)
  $offCanvas.toggleClass('is-menu_open', isMenuOpen)

menuActions =
  close: ->
    return unless isMenuOpen
    isMenuOpen = false
    toggleMenu()
  toggle: ->
    isMenuOpen = !isMenuOpen
    toggleMenu()

$menuSwitch.on('click', menuActions.toggle)
$window.on('resize', menuActions.close) if !isTouchDevice()
