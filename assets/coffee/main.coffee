prepMobileMenu = () ->
	$('nav .menu-toggle').map (idx,item) ->
		$toggle = $ item
		$controls = $toggle.parents('nav').find '.link-group'
		$toggle.on 'click', (e) ->
			do e.preventDefault
			$controls.toggleClass 'link-group--collapsed'
		$controls.addClass 'link-group--collapsed'

prepSearchBar = () ->
	# When the toggle is clicked, hide the toggle and display the form.
	$('.search-bar__toggle a').on 'click', (e) ->
		do e.preventDefault;
		$searchBar = $(this).parents '.search-bar'
		parentNav = $searchBar.parents('nav').toggleClass 'search-bar--active'
		$searchBar.toggleClass('search-bar--exposed').toggleClass 'search-bar--initialized'
		do $searchBar.find('input[type=text]').focus
		return

	# When the search field is exited, hide the search and re-show the label
	$('.search-bar input[type=text]').on 'blur',(e) ->
		$searchBar = $(this).parents '.search-bar'
		parentNav = $searchBar.parents('nav').toggleClass 'search-bar--active'
		$searchBar.toggleClass('search-bar--exposed').toggleClass 'search-bar--initialized'
		return

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

$(document).ready () ->
	do $(document).foundation
	do prepMobileMenu
	do prepSearchBar
	do prepNiceVideo

# TODO: Equalizer needs to re-run on window resize
