var navItems = document.getElementsByClassName('mega-menu-nav-item');

$('.mega-menu-nav-item').each(function(){
  $(this).on('click', function() {
    var $slabEl = $(this).next('.mega-menu__slab');
    var navElement = document.getElementById('MainNav');
    var submenuMargin = Math.ceil((window.innerWidth - navElement.offsetWidth) / 2);

    if ( $slabEl.hasClass('open') ) {
      $slabEl.removeClass('open');
    } else {
      $slabEl.addClass('open');
      $('.mega-menu__slab').not($slabEl).removeClass('open');
      $slabEl.css({'padding': `0 ${submenuMargin}px`, 'left': `-${submenuMargin}px`});
    }
  });
});


$(window).on('click', function(e){
  if( !$(e.target).hasClass('mega-menu-nav-item') ) {
    $('.mega-menu__slab').each(function(){
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
      };
    });
  };
});