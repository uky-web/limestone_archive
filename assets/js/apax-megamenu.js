
const apax_megamenu = () => {
    const largeScreenSize = 927;
    $('.mega-menu__nav-item').each(function() {
        $(this).on('click', function() {
            var $slabEl = $(this).next('.mega-menu__slab');

            if ($slabEl.hasClass('open')) {
                $slabEl.removeClass('open');

            } else {
                $(this).parents('.mega-menu').children('.mega-menu__slab').removeClass('open');
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

    $('.mega-menu--mobile .mega-menu__nav-item').on('click', function(e){
        $(this).parents('.mega-menu--mobile').addClass('open');
        $(this).next('.mega-menu__mobile-slab').addClass('open');
    });

    $('.mega-menu--mobile .link--fancy-reverse').on('click', function(e){
        console.log('click');
        $(this).parents('.mega-menu--mobile').removeClass('open').children('.mega-menu__mobile-slab').removeClass('open');
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
}