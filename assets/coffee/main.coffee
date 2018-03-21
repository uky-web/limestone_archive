
$(document).ready () ->
    # Grid toggle behavior, dev only
    $('.gridToggle').on 'click', () ->
        $('body').toggleClass 'layout-grid--on'