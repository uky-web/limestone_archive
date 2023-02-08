const carousel_single = {
  cssEase: 'ease-in-out',
  dots: true,
  lazyLoad: 'progressive'
};

const carousel_center = {
  cssEase: 'ease-in-out',
  lazyLoad: 'progressive',
  centerMode: true,
  dots: true,
  centerPadding: '110px',
  sidesToShow: 3,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: false,
        slidesToShow: 1
      }
    }
  ]
};

const carousel = () => {
  const $carousels = $('.carousel');
  let config = carousel_single; // default configuration
  if ($carousels.length < 1) return; 

  const positionArrowsSingle = (slick) => {
    const $currentSlide = $(slick.$slides[slick.currentSlide]);
    const $currentImage = $currentSlide.find('img');
    const imgHeight = $currentImage.height();
    const buttonTop = imgHeight / 2;
    const buttons = slick.$nextArrow.add(slick.$prevArrow);
    buttons.css({
      top: buttonTop
    });
  };

  const positionArrowsCentered = (slick) => {
    console.log("PosArrowCenter");
    const $currentSlide = $(slick.$slides[slick.currentSlide]);
    const $currentImage = $currentSlide.find('img');
    const $currentTrack = slick.$slideTrack;
    const imgHeight = $currentImage.height();
    const containerHeight = imgHeight * 1.105; // magic number matches the scale factor from the scss

    if (imgHeight > 0) {
      const padding = (containerHeight - imgHeight) / 2;
      const buttonTop = (containerHeight * .5);
      const buttons = slick.$nextArrow.add(slick.$prevArrow);
      buttons.css({
        top: buttonTop
      });
      $currentTrack.css({
        paddingTop: padding
      });
      
    }
  };
  

  $carousels.on('init setPosition afterChange', (e, slick) => {
    const cl = e.currentTarget.classList;
    if (cl.contains('carousel--single')) {
      positionArrowsSingle(slick);
    } else if (cl.contains('carousel--center')) {
      positionArrowsCentered(slick);
    }
  });

  $carousels.map((index, elem) => {
    if (elem.classList.contains('carousel--center')) {
      config = carousel_center;
    } else {
      config = carousel_single;
    }
    $(elem).slick(config);
  });
};
