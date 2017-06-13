$(document).ready(function() {
  // with minimal configuration and default setting
  var slides = [];
  for (var i = 0; i < 5; i++) {
    slides.push({
      src: 'https://unsplash.it/' + (1366 + i) + '/' + (768 + i)
    })
  }
  $('.jR3DCarouselGalleryDefault').jR3DCarousel({
    slides: slides
  });

  // Or with options
  $('.jR3DCarouselGalleryCustom').jR3DCarousel({
    width: 500,
    /* largest allowed width */
    height: 400,
    /* largest allowed height */
    slideLayout: 'fill',
    /* "contain" (fit according to aspect ratio), "fill" (stretches object to fill) and "cover" (overflows box but maintains ratio) */
    animation: 'slide3D',
    /* slide | scroll | fade | zoomInSlide | zoomInScroll */
    animationCurve: 'ease',
    animationDuration: 700,
    animationInterval: 1000,
    slideClass: 'jR3DCarouselCustomSlide',
    autoplay: true,
    onSlideShow: shown,
    /* callback when Slide show event occurs */
    navigation: 'circles' /* circles | squares */ ,
    perspective: 1200
  });

  function shown(slide) {
    console.log("Slide shown: ", slide.find('img').attr('src'));
  }
});
