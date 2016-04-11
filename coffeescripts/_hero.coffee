$root = $('.js-hero')
return unless $root.length

PANNING_CLASS = 'is-panning'
ACTIVE_CLASS = 'is-active'
THRESHOLD = .3

translateX = (el, x) ->
  value = if x? then "translateX(#{x}px)" else ''
  el.style.transform = value
  el.style.msTransform = value

isTouchDevice = ->
  `'ontouchstart' in window` || navigator.maxTouchPoints

class Page
  _isCurrent: ->
    @index == @parent.currentIndex
  _updateClass: ->
    @root.toggleClass('is-active', @_isCurrent())

class Slide extends Page
  constructor: (@root, @index, @parent) ->
  _pan: (delta) ->
    if !@isPanning
      @root.addClass('is-panning')
      @isPanning = true
    if @_isCurrent()
      if @index == 0 || (@index == @parent.max && delta * @parent.dir < 0)
        moveX = 0
      else
        moveX = delta
    else
      moveX = (@parent.width + delta * @parent.dir) * @parent.dir

    translateX(@root[0], moveX)

  _panend: ->
    @isPanning = false
    @root.removeClass('is-panning')
    translateX(@root[0])

class Pagedot extends Page
  constructor: (@index, @parent) ->
    @root = $('.js-hero_pagination_item').eq(@index)
    @root.on 'click', => @parent.setIndex(@index)

class MenuItem extends Page
  constructor: (@index, @parent) ->
    @root = $('.js-hero_menu_item').eq(@index)
    @root.on 'mouseover', => @parent.setIndex(@parent.max - @index)

  _isCurrent: ->
    @index == @parent.max - @parent.currentIndex

class Hero
  constructor: ->
    @window = $(window)
    @root = $root
    @children = @root.find('.js-hero_slide')
    @loadingIndicator = @root.find('.js_loading_indicator')
    @length = @children.length
    @max = @length - 1
    @currentIndex = @max

    @slides = []
    @pagedots = []
    @menuItems = []

    @_load()

  _load: ->
    loadedImageLength = 0
    @children.each (index, el) =>
      @slides.push new Slide($(el), index, @)
      @pagedots.push new Pagedot(index, @)
      @menuItems.push new MenuItem(index, @)

      url = el.style.backgroundImage.replace(/["']/g, '').match(/\((.*)\)/)[1]

      $('<img>')
        .on 'load', =>
          loadedImageLength++
          @_loaded() if loadedImageLength == @length
        .attr('src', url)

  _loaded: ->
    @root.toggleClass('is-loading is-entering')
    @_init()

    setTimeout =>
      @root.removeClass('is-entering')
      @loadingIndicator.remove()
    , 2250

  _init: ->
    @_bindEventHandler()
    @_updateDimension()
    @_updateClass()

  _updateDimension: =>
    @width = @children.width()
    @dir = @window.width() < parseInt(breakpoints.desktop, 10) && -1 || 1

  _bindEventHandler: ->
    @window.on 'resize', @_updateDimension
    return unless isTouchDevice()

    @mc = new Hammer(@root[0])
    @mc.on 'panleft panright', @_pan
    @mc.on 'panend', @_panend

  _getPanningSlide: ->
    if @delta * @dir > 0
      index = @currentIndex
    else
      return false if index == @max
      index = Math.min(@currentIndex + 1, @max)
    @slides[index]

  _pan: (e) =>
    @delta = e.deltaX
    @panningSlide ||= @_getPanningSlide()

    return unless @panningSlide?
    @panningSlide._pan(@delta)

  _panend: =>
    return unless @panningSlide?
    @panningSlide._panend()
    @panningSlide = null

    return unless Math.abs(@delta) > @width * THRESHOLD
    if @delta * @dir > 0 then @prev() else @next()

  _arrayDo: (array, func, e = null) =>
    obj[func](e) for obj in array

  _updateClass: ->
    @_arrayDo(@slides, '_updateClass')
    @_arrayDo(@pagedots, '_updateClass')
    @_arrayDo(@menuItems, '_updateClass')

  prev: ->
    @currentIndex = Math.max(@currentIndex - 1, 0)
    @_updateClass()

  next: ->
    @currentIndex = Math.min(@currentIndex + 1, @max)
    @_updateClass()

  setIndex: (@currentIndex) -> @_updateClass()

window.hero = new Hero()
