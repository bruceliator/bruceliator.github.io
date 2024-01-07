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
