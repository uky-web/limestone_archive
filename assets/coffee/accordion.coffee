$ = jQuery

$('a.accordion-header').on 'click', (e) ->
    do e.preventDefault
    $(this).siblings('.accordion-content').slideToggle()
    $(this).toggleClass('active')
