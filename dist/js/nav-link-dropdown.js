'use strict';

var largeScreenSize = 927;

$('.mega-menu__nav-item').each(function () {

    $(this).on('click', function () {
        var $slabEl = $(this).next('.mega-menu__slab');
        // var navElement = document.getElementById('MainNav');
        //var submenuMargin = Math.ceil((window.innerWidth - navElement.offsetWidth) / 2);

        if ($slabEl.hasClass('open')) {
            $slabEl.removeClass('open');
            // if (window.innerWidth > largeScreenSize) {
            //     $slabEl.css({
            //         'padding': '0',
            //         'left': `-${submenuMargin}px`
            //     });
            // }
        } else {
            $slabEl.addClass('open');
            // if (window.innerWidth > largeScreenSize) {
            //     $('.mega-menu__slab').not($slabEl).removeClass('open').css({
            //         'padding': '0',
            //         'left': `-${submenuMargin}px`
            //     });
            //     $slabEl.css({
            //         'padding': `1.5rem ${submenuMargin}px`,
            //         'left': `-${submenuMargin}px`
            //     });
            // }
        }
    });

    $(this).on('keydown', function () {
        var $slabEl = $(this).next('.mega-menu__slab');
        if (!$slabEl.hasClass('open')) {
            $(this).click();
        }
    });
});

$('.mega-menu--mobile .link--fancy-reverse').each(function () {
    $(this).parent();
});

$(window).on('click', function (e) {
    if (!$(e.target).hasClass('mega-menu__nav-item')) {
        $('.mega-menu__slab').each(function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
            };
        });
    };
});
//# sourceMappingURL=nav-link-dropdown.js.map
