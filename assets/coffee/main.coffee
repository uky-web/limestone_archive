prepNiceVideo = () ->
    console?.log "hi"
    $('.nice-video button').on 'click', () ->
        $wrapper = $(this).parents '.nice-video'
        $wrapper.toggleClass 'nice-video--playing'
        $iframe = $wrapper.find 'iframe'
        closure = () ->
            $iframe.attr {
                'src': $iframe.attr('src').replace "autoplay=0", "autoplay=1"
            }
        setTimeout closure, 300
        return

    $('.nice-video').addClass 'nice-video--ready'

$(document).ready () ->
    # Grid toggle behavior, dev only
    $('.gridToggle').on 'click', () ->
        $('body').toggleClass 'layout-grid--on'

    do prepNiceVideo
