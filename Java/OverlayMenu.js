// Zorgt voor fade-in/fade-out overlay menu
function adjustOverlayMenuVisibility() {
  const burgerInput = document.getElementById('burger');
  const overlayMenu = document.querySelector('.overlay-menu');

  if (burgerInput.checked) {
    overlayMenu.classList.add('show-overlay-menu');
    document.body.classList.add('no-scroll');
  } else {
    overlayMenu.classList.remove('show-overlay-menu');
    document.body.classList.remove('no-scroll');
  }
}

// Event listeners
document.getElementById('burger').addEventListener('change', adjustOverlayMenuVisibility);

// Initial state
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.overlay-menu').classList.remove('show-overlay-menu');
});