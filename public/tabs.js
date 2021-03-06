(function($){
  "use strict";

  $(function(){
    var tabHeader  = document.getElementById('tab-header').getElementsByTagName('li');
    var tabContent = document.getElementById('tab-content').getElementsByTagName('fieldset');

    function showTab(tabId) {
      for (var i=0,len=tabContent.length; i<len; i++) {
        if (tabContent[i].id === tabId) {
          $(tabHeader[i]).addClass('active').attr({'aria-selected': 'true'});
          $(tabContent[i]).attr('aria-hidden', 'false').show();
        } else {
          $(tabHeader[i]).removeClass('active').attr({'aria-selected': 'false'});
          $(tabContent[i]).attr('aria-hidden', 'true').hide();
        }
      }
    }

    $('#tab-header')
      .on('click', 'a', function(e) {
        showTab( $(this).attr('href').substr(1) );
        e.preventDefault();
      })
      .on('keydown', 'a', function(key){
        var $link;
        switch (key.which) {
          case 37: case 38: // left or up arrow keys
            // if previous tab list item exists, show its tab panel
            // else show last tab panel
            $link = ( $(this).parent().prev().length !== 0 ) ? ($(this).parent().prev().find('a')) : ($(this).parent(':last').find('a'));
            break;
          case 39: case 40: // right and down arrow keys
            // if next tab list item exists, show its tab panel
            //else, show the first tab panel
            $link = ( $(this).parent().next().length !== 0 ) ? ($(this).parent().next().find('a')) : ($(this).parent(':first').find('a'));
            break;
          case 13: // enter
            $link = $(this);
            break;
        }
        if ($link) { $link.focus().click(); }
      });


    $('form').submit(function(e) {
      if ( $('input:first-child, textarea:first-child', this).val() === '' ) { e.preventDefault(); }
    });

    showTab('validate-by-uri');
  });
})(jQuery);