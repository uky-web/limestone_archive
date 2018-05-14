#
# Image gallery has dependencies on jquery, slick, accessible-modal-window
#

prepImageGallery = () ->
	$gallery = $ '.image-gallery'

    # Fire up the masonry layout
	$grid = $gallery.masonry
		columnWidth: '.image-gallery__block-sizer',
		itemSelector: '.image-gallery__block',

    # Reflow content in the layout as each image
    # is loaded
    ###
    $grid.imagesLoaded().progress ()->
        $grid.masonry 'layout'
    ### 
    # Create the carousel
    ###
    $gallery.map (item) ->
        console?.log item
    ### 
    ###
	fitCaption = ($c) ->
		$image = $c.find('img');
		$caption = $c.find('figcaption');
		w = do $image.width
		h = do $image.height
		r = w/h

		captionWidth = if w < 300 then "50vw" else w

		$caption.css 
			maxWidth: captionWidth;

		if r < 1
			$c.addClass 'mfp-portrait'
			$c.removeClass 'mfp-landscape'
		else 
			$c.addClass 'mfp-landscape'
			$c.removeClass 'mfp-portrait'
    ###

	###
	modals = gallery.magnificPopup
		delegate: 'a'
		type: 'image'
		mainClass: 'mfp-fade'
		tLoading: 'Loading image #%curr%...'
		gallery:
			enabled: true
			navigateByImgClick: true
			preload: [0,1]
		image: 
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			verticalFit: false,
			titleSrc: (item) ->
				$(item.el).find('figcaption').html()
		callbacks: 
			resize: () ->
				fitCaption $(this.content)
			imageLoadComplete: () ->
				fitCaption $(this.content)
    ###

    

$(document).ready () ->
    do prepImageGallery