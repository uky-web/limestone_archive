const largeScreenSize = 927;

$('.mega-menu__nav-item').each(function() {

    $(this).on('click', function() {
        var $slabEl = $(this).next('.mega-menu__slab');
       // var navElement = document.getElementById('MainNav');
       //var submenuMargin = Math.ceil((window.innerWidth - navElement.offsetWidth) / 2);

        if ($slabEl.hasClass('open')) {
            $slabEl.removeClass('open');
        } else {
            $slabEl.addClass('open');
        }
    });

    $(this).on('keydown', function() {
        var $slabEl = $(this).next('.mega-menu__slab');
        if (!$slabEl.hasClass('open')) {
          $(this).click();
        }
    });

});

$('.mega-menu--mobile .link--fancy-reverse').each(function() {
    $(this).parent();
});


$(window).on('click', function(e) {
  if (!$(e.target).hasClass('mega-menu__nav-item')) {
    $('.mega-menu__slab').each(function() {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
      };
    });
  };
});