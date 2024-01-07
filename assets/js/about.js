---
---
window.addEventListener("load", () => {
  {% include_relative /pages/about/copy_text.js %}
  {% include_relative /pages/about/gsheets_info.js %}

  let splide = new Splide('.splide', {
    perPage    : 3,
    focus      : 0,
    type       : 'loop',
    pagination : true,
    arrows     : true,
    lazyLoad   : 'nearby',
    preload    : false,
    height     : '20vw',
    gap        : '1rem',
    breakpoints : {
      '767': {
        perPage  : 1,
        height   : '50vw',
      },
      '990': {
        perPage   : 2,
        height    : '30vw',
        focus     : 1,
      },
    }
  });

  splide.on( 'mounted', function () {
    new SimpleLightbox('.splide__list a',
        {
          overlayOpacity: '0.92',
          animationSpeed: 200,
          fadeSpeed: 250,
          preloading: false
        }
    );
  });

  splide.mount();
});
