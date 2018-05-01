prepNiceVideo = () ->
    $('.nice-video--control').magnificPopup {
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    }

$(document).ready () ->
    # Grid toggle behavior, dev only
    $('.gridToggle').on 'click', () ->
        $('body').toggleClass 'layout-grid--on'

    # Include labels
    $('.includeToggle').on 'click', () ->
        $('body').toggleClass 'twig-includes--on'

    ###
    $('img').baseline () ->
        size = parseFloat(getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));
        return size / 2
    ###

    do prepNiceVideo
