class Dropdown
  constructor: (@root) ->
    @trigger = @root.find('> .dropdown_trigger')
    @trigger.on 'click', @toggle
    @open()

  open: ->
    return if @isOpen
    @isOpen = true
    @_render()

  close: (e) =>
    return if !@isOpen
    @isOpen = false
    @_render()

  toggle: (e) =>
    e.preventDefault()
    @isOpen = !@isOpen
    @_render()

  _render: ->
    setTimeout =>
      @root.toggleClass('is-active', @isOpen)
    , 0

lazyCreateDropdown = (e) ->
  e.preventDefault()
  $el = $(@).closest('.dropdown')
  return if $el.data('dropdown')
  $el.data('dropdown', new Dropdown($el))

closeAllDropdown = (e) ->
  return if $(e.target).closest('.dropdown.is-active').length
  $('.dropdown.is-active').each (i, el) -> $(el).data('dropdown').close()

$document = $(document)
$document.on 'click', '.dropdown_trigger', lazyCreateDropdown
$document.on 'click', closeAllDropdown
