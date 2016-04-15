class Menu
  constructor: ->
    $('.menu').clone().appendTo('.js-off_canvas_menu_container')

    @offCanvas = $('.js-off_canvas')
    @menuSwitch = $('.js-menu_switch')
    @mask = $('.js-off_canvas_mask')

    @isMenuOpen = false
    @_bind()

  _bind: ->
    @menuSwitch.on('click', @toggle)

    if isTouchDevice()
      $window.on('orientationchange', @close)
      @mask.on('touchstart', @close)
    else
      $window.on('resize', @close)

  _toggleClass: ->
    @offCanvas.toggleClass('is-menu_open', @isMenuOpen)

  close: =>
    return unless @isMenuOpen
    @isMenuOpen = false
    @_toggleClass()
    document.activeElement.blur()

  toggle: =>
    @isMenuOpen = !@isMenuOpen
    @_toggleClass()

new Menu()
