(function() {
  var $searchInput, $searchSubmit;

  $searchSubmit = $('.js-search_submit');

  $searchInput = $('.js-search_input');

  $searchSubmit.on('click', function(e) {
    if (!$searchInput.val()) {
      e.preventDefault();
      return $searchInput.focus();
    }
  });

}).call(this);
