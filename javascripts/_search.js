var $searchSubmit = $('.js-search_submit');
var $searchInput = $('.js-search_input');

$searchSubmit.on('click', function(e){
  if(!$searchInput.val()) {
    e.preventDefault();
    $searchInput.focus();
  }
})
