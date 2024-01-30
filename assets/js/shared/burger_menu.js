const menuContent = document.getElementsByClassName('toggle__content')[0]
const overlay = document.getElementsByClassName('overlay')[0]
const burgerButton = document.getElementById('burger-menu')
const toggleWrapper = document.getElementsByClassName('toggle-wrapper')[0]

burgerButton.onclick = function() {
  toggleMenuElements()
}
overlay.onclick = function() {
  toggleMenuElements()
}
menuContent.onclick = function() {
  toggleMenuElements()
}

function toggleMenuElements() {
  menuContent.classList.toggle('content-visible');
  overlay.classList.toggle('overlay-visible');
  burgerButton.classList.toggle('toggle-btn-style');
}

window.addEventListener("scroll", (event) => {
  if (this.scrollY > 0) {
    toggleWrapper.classList.add('scrolled')
  } else {
    toggleWrapper.classList.remove('scrolled')
  }
});