---
---
window.addEventListener("load", () => {
  {% include_relative /pages/about/copy_text.js %}
  {% include_relative /pages/about/gsheets_info.js %}
  {% include_relative /shared/burger_menu.js %}

  let splide = new Splide('.splide', {
    perPage    : 3,
    focus      : 0,
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

  function getMeta(url, callback) {
    var img = new Image;
    img.src = url;
    img.onload = function () {
      callback(this.width, this.height);
    }
  }

  function setImageSizes() {
    document.querySelectorAll('.splide a').forEach(function (item) {
      getMeta(item.href, function (w, h) {
        let imgW, imgH;
        let ratio = w / h;
        let winH = window.innerHeight;
        let winW = window.innerWidth;
        let deltaH = Math.abs(winH - h);
        let deltaW = Math.abs(winW - w);

        if (deltaW < deltaH) {
          imgW = winW;
          imgH = winW / ratio;
          if (imgH > winH) {
            imgH = winH;
            imgW = winH * ratio;
          }
        } else {
          imgH = winH;
          imgW = winH * ratio;
          if (imgW > winW) {
            imgW = winW;
            imgH = winW / ratio;
          }
        }
        item.dataset.pswpWidth = imgW
        item.dataset.pswpHeight = imgH
      });
    });
  }
  setImageSizes();

  splide.on( 'mounted', setImageSizes)
  splide.mount();
  window.addEventListener("resize", setImageSizes);
});
