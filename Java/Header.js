// Add an event listener for scrolling
window.addEventListener('scroll', function () {
  const header = document.querySelector('header'); // Select the header element
  if (window.scrollY > 50) {
    header.classList.add('shrink'); // Add the 'shrink' class when scrolled down
  } else {
    header.classList.remove('shrink'); // Remove the 'shrink' class when at the top
  }
});
