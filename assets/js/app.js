window.addEventListener("load", () => {
  new SimpleLightbox('.image-gallery a',
      {
        overlayOpacity: '0.92',
        animationSpeed: 200,
        fadeSpeed: 250,
        preloading: false
      }
  );

  let elementsArray = document.querySelectorAll(".btn.copy");

  let copiedPath = "<path stroke=\"#fff\" stroke-linejoin=\"round\" stroke-width=\"2px\" d=\"M17.297 6.504l-9.02 10.863-6.49-7.247M22.533 6.523l-9.02 10.863\"></path>"
  let copyPath = "<path d=\"M18 5.086L12.914 0H5a3 3 0 00-3 3v17h16V5.086zM4 18V3a1 1 0 011-1h7v4h4v12H4zm18-9v15H7v-2h13V7l2 2z\" fill=\"currentColor\"></path>"

  function emulateVibration() {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }

  elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function() {
      let copyValue = elem.dataset.copyValue
      let copyHint =  elem.querySelector(".copy-text")
      let svgElement =  elem.querySelector(".icon-copy")

      navigator.clipboard.writeText(copyValue);
      copyHint.textContent = "Скопійовано"
      svgElement.innerHTML = copiedPath

      emulateVibration()

      setTimeout(function () {
        copyHint.textContent = "Скопіювати"
        svgElement.innerHTML = copyPath
      }, 1500);

    });
  });


  //Get the button:
  let mybutton = document.getElementById("goToTop");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 1400 || document.documentElement.scrollTop > 1400) {
      mybutton.style.display = "inline-block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction(duration) {

    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step (newTimestamp) {
      if (oldTimestamp !== null) {
        // if duration is 0 scrollCount will be Infinity
        scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
        if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

  }

  mybutton.addEventListener("click", function() {
    topFunction(100);
  });
});
