(function () {
  const header = document.querySelector('header');
  if (!header) return;

  function updateHeaderState() {
    if (window.scrollY > 44) {
      header.classList.add('shrink');
      return;
    }
    header.classList.remove('shrink');
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('load', updateHeaderState);
  updateHeaderState();
})();
