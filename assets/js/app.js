window.onload = function() {
  new SimpleLightbox('.image-gallery a',
      {
        overlayOpacity: '0.92',
        animationSpeed: 200,
        fadeSpeed: 250,
        preloading: false
      }
  );

  let elementsArray = document.querySelectorAll(".btn.copy");

  elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
      let copyValue = elem.dataset.copyValue
      let copyHint =  elem.querySelector(".copy-text")

      navigator.clipboard.writeText(copyValue);
      copyHint.textContent = "Скопійовано"
      setTimeout(function () {
        copyHint.textContent = "Скопіювати"
      }, 1500);

    });
  });
};
