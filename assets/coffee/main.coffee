prepNiceVideo = () ->
    $('.nice-video--control').magnificPopup {
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    }

# Start the ambient video loading and prep the play/pause button behavior

prepAmbientVideo = () -> 
	av = $ '.ambient-video video'
	return if av.length < 1
	sources = av.find 'source'

	if window.matchMedia("(min-width: 64rem)").matches
		av.attr('autoplay',true)
		do av[0].play

		# Since the video is working, enable the play/pause control
		control = $ '.ambient-video button'
		control.show();
		control.click (e) ->
			button = $(e.currentTarget)
			video = button.siblings('video')[0]
			button.toggleClass('video-button--paused')
			if video.paused 
				do video.play 
				button.attr('aria-label',button.data('pressed-label'))
			else 
				do video.pause
				button.attr('aria-label',button.data('unpressed-label'))
	else 
		do av[0].stop
	return
    

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
    do prepAmbientVideo
