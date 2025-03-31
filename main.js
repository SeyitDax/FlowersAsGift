onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

  // Toggle logic
  let isBlueTheme = false;
  const pinkStyle = document.getElementById("pinkStyle");
  const blueStyle = document.getElementById("blueStyle");
  blueStyle.disabled;

  // Swipe detection for touch devices
  let touchStartX = 0;

  document.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", e=> {
    const touchEndX = e.changedTouches[0].clientX;
    handleSwipe(touchEndX - touchStartX);
  });

  // Mouse drag detection for desktop
  let mouseDownX = 0;

  document.addEventListener('mousedown', e => {
    mouseDownX = e.clientX;
  });
  
  document.addEventListener('mouseup', e => {
    const deltaX = e.clientX - mouseDownX;
    handleSwipe(deltaX);
  });

  function handleSwipe(deltaX) {
    const swipeThreshold = 60; // Minimum 6px swipe

    if(deltaX > swipeThreshold) {
      isBlueTheme = !isBlueTheme;
      pinkStyle.disabled = isBlueTheme;
      blueStyle.disabled = !isBlueTheme;
    }
  }