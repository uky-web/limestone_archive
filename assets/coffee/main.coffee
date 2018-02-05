$ = jQuery

prepSearchBar = () ->
	# When the toggle is clicked, hide the toggle and display the form.
	$('.search-bar .visibility-toggle').on 'click', (e) ->
		do e.preventDefault;
		$searchBar = $(this).closest '.search-bar'
		parentNav = $searchBar.parents('nav').toggleClass 'search-bar--active'
		$searchBar.toggleClass('search-bar--exposed').toggleClass 'search-bar--initialized'
		do $searchBar.find('input[type=text]').focus
		return

	# When the search field is exited, hide the search and re-show the label
	# $('.search-bar input[type=text]').on 'blur',(e) ->
	# 	$searchBar = $(this).parents '.search-bar'
	# 	parentNav = $searchBar.parents('nav').toggleClass 'search-bar--active'
	# 	$searchBar.toggleClass('search-bar--exposed').toggleClass 'search-bar--initialized'
	# 	return

	# Mark the search bar as initialized so it can have the right presentation
	$('.search-bar').addClass 'search-bar--initialized'

prepNiceVideo = () ->
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



mainNavDropdowns = ->
	$('li.has-dropdown').click (event) ->
		$(this).toggleClass('open')
		$(this).find('.dropdown').slideToggle('200')


mobileNavToggle = ->
	$('.mobile__toggle .visibility-toggle').click (event) ->
		$mobileMenu = $(this).parents '.main-header'

		$(this).parent().toggleClass('open')

		#collapse only the nav items if the menu is a unit header
		if $mobileMenu.hasClass('unit-header') or $mobileMenu.hasClass('center-header')
			$mobileMenu.find('.unit-nav').slideToggle('200')
			$mobileMenu.find('.utility-nav').slideToggle('200')
		else
			$mobileMenu.find('.navigation').slideToggle('200')


accordion = () ->
	$('a.accordion-header').on 'click', (e) ->
		do e.preventDefault;
		$(this).siblings('.accordion-content').slideToggle()
		$(this).toggleClass('active')


toggleContent = ->
	$('.toggle-content button').on 'click', (e) ->
		do e.preventDefault;
		$toggleArea = $(this).parents('.toggle-content')
		$toggleArea.find('.to-toggle').slideToggle()
		$(this).children('span').toggle()

$(document).ready () ->
	do mainNavDropdowns
	do prepSearchBar
	do prepNiceVideo
	do mobileNavToggle
	do toggleContent
