---
---
window.addEventListener("load", () => {
  new SimpleLightbox('.image-gallery a',
      {
        overlayOpacity: '0.92',
        animationSpeed: 200,
        fadeSpeed: 250,
        preloading: false
      }
  );
  {% include_relative /pages/index/scroll_to_top.js %}
});
