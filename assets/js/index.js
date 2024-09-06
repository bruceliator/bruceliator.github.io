---
---
window.addEventListener("load", () => {

  const thumb_carousel_elems = document.getElementsByClassName('splide-thumb');
  const main_carousel_elems = document.getElementsByClassName('main-carousel');

  for ( var i = 0; i < thumb_carousel_elems.length; i++ ) {
    let main = new Splide( main_carousel_elems[i], {
      type      : 'fade',
      rewind    : true,
      pagination: false,
      arrows    : false,
      fixedHeight: 600,
      breakpoints : {
        600: {
          fixedHeight: 300,
        },
      },
    } );

    let thumbnails = new Splide( thumb_carousel_elems[i], {
      fixedWidth  : 133,
      fixedHeight : 80,
      gap         : 5,
      rewind      : true,
      pagination  : false,
      isNavigation: true,
      arrowPath   : 'M21.708 1.667l-4.745 4.713 10.293 10.293h-27.257v6.653h27.257l-10.293 10.293 4.745 4.713 18.292-18.333z',
      breakpoints : {
        600: {
          fixedWidth : 80,
          fixedHeight: 60,
        },
      },
    } );
    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();

    new SimpleLightbox(`#main-carousel-${i + 1} a`,
        {
          overlayOpacity: '0.92',
          animationSpeed: 200,
          fadeSpeed: 250,
          captionPosition: 'top',
          preloading: false,
          widthRatio: 1,
          heightRatio: 1
        }
    );
  }

  {% include_relative /pages/index/scroll_to_top.js %}
  {% include_relative /shared/burger_menu.js %}
});
