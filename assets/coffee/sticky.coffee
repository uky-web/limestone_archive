$ = jQuery

# --------------------
#  option to smoothscroll to anchor links
# --------------------
if $('.smoothscroll').length
    $('.smoothscroll').each (index) ->
        $(this).find('a[href*="#"]:not([href="#"])').click (event) ->
            event.preventDefault()

            stickyOffset = $('.sticky-wrapper.ukr-fixed').height()

            target = $(this.hash)
            target = if target.length then target else $('[name=' + @hash.slice(1) + ']')

            if target.length
                $('html, body').animate { scrollTop: target.offset().top - stickyOffset }, 500



# --------------------
#  sticky elements
# --------------------
# using .ukr-fixed to avoid conflict with foundation's .fixed sticky nav
stickyEngage = ->

	if $('.sticky-wrapper').length

		# begin sticky when user scrolls to top of element
		if ($(window).scrollTop() + $('body').offset().top) > $('.sticky-wrapper.original').offset().top

			# show clone
			$('.sticky-wrapper.ukr-fixed').show()

		else
		  # hide clone when scroll position is higher than top of original
		  $('.sticky-wrapper.ukr-fixed').hide()
          

if not $('.sticky-wrapper.ukr-fixed').length
    $('.sticky-wrapper').clone(true, true).addClass('ukr-fixed').hide().insertAfter('.sticky-wrapper')
    $('.sticky-wrapper').first().addClass('original')
$(window).scroll ->
    stickyEngage()
