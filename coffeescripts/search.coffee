$searchSubmit = $('.js-search_submit')
$searchInput = $('.js-search_input')

$searchSubmit.on 'click', (e) ->
  if !$searchInput.val()
    e.preventDefault()
    $searchInput.focus()
