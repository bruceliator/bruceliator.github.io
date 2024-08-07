---
---
window.addEventListener("load", () => {
  new SimpleLightbox('.image-gallery a',
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
  {% include_relative /pages/index/scroll_to_top.js %}
  {% include_relative /shared/burger_menu.js %}
});
