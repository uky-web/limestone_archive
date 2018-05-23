const carousel_single = {
    cssEase: 'ease-in-out',
    dots: true,
    lazyLoad: 'progressive'
}

const carousel_center = {
    cssEase: 'ease-in-out',
    dots: true,
    lazyLoad: 'progressive',
    centerMode: true,
    centerPadding: '100px',
    sidesToShow: 3,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: false,
                slidesToShow: 3
            }
        }
    ]        
}

const carousel = () => {
    const $carousels = $('.carousel');
    let config = carousel_single; // default configuration
    if ($carousels.length < 1) return;

    const positionArrows = (slick) => {
        let buttonTop = slick.slideWidth * .4;
        let buttons = slick.$nextArrow.add(slick.$prevArrow);
        buttons.css({ top: buttonTop });
        //arrows should be positioned at 40% of the width of the slide track
    }

    $carousels.on('init', (e, slick) => {
        if ($(e.currentTarget).has('.carousel--single')) {
            positionArrows(slick);
        }
    });
    $carousels.on('lazyLoaded', (e, slick,image,imageSource) => {
        
    });
    $carousels.on('afterChange', (e,slick,currentSlide) => {
        
    });
    $carousels.on('setPosition', (e,slick) => {
        if ($(e.currentTarget).has('.carousel--single')) {
            positionArrows(slick);
        }
    });
    $carousels.map((index,elem) => {
        // override configuration based on class name
        if (elem.classList.contains('carousel--center')) {
            config = carousel_center;
        }
        $(elem).slick(config);
    });
}
