(function () {
  const burgerInput = document.getElementById('burger');
  const overlayMenu = document.querySelector('.overlay-menu');
  if (!burgerInput || !overlayMenu) return;

  // Keep the overlay at body level so it always covers the full viewport.
  if (overlayMenu.parentElement !== document.body) {
    document.body.appendChild(overlayMenu);
  }

  function adjustOverlayMenuVisibility() {
    const isOpen = burgerInput.checked;
    overlayMenu.classList.toggle('show-overlay-menu', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    overlayMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  }

  function closeOverlayMenu() {
    burgerInput.checked = false;
    adjustOverlayMenuVisibility();
  }

  burgerInput.addEventListener('change', adjustOverlayMenuVisibility);

  overlayMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeOverlayMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeOverlayMenu();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeOverlayMenu();
    }
  });

  closeOverlayMenu();
})();