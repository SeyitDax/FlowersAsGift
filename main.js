function random(max) {
  return Math.random() * max;
}
let touchStartX = 0, touchStartY = 0;

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
blueStyle.disabled = true;

let isMagicActive = false;
const KEYWORD = ["Merve Beyza", "Beyza", "Merve Beyza Yanbaz"];

document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 DOM fully loaded. Attaching swipe listeners...");

  // TouchScreen Event Listeners

  document.addEventListener("touchstart", (e) => {
    try {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      console.log("✅ Touch Start:", touchStartX, touchStartY);
    } catch (error) {
      console.error("Touchstart Error:", error);
    }
  }, {passive: true});

  document.addEventListener("touchend", (e) => {
    try {
      e.preventDefault();
      const touchEndX = e.changedTouches[0].clientX; // Get end coordinates
      const touchEndY = e.changedTouches[0].clientY;
  
      // Calculate deltas using original start positions
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY; // Now positive = swipe down
  
      // Determine primary swipe direction
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      const isVertical = Math.abs(deltaY) > Math.abs(deltaX);
  
      // Horizontal swipe (theme change)
      if (isHorizontal && Math.abs(deltaX) > 60) {
        handleSwipe(deltaX);
      }
      // Vertical swipe (keyboard toggle)
      else if (isVertical && Math.abs(deltaY) > 60) {
        if (deltaY < 0) { // Negative deltaY = swipe up
          showKeyboard();
        } else {
          hideKeyboard();
        }
      }
    } catch (error) {
      console.error("Touchend Error:", error);
    }
  });
  console.log("✅ Swipe Listeners Attached!");

  // Mouse Event Listeners

  let mouseDown = false;
  let mouseStartX = 0, mouseStartY =0;

  document.addEventListener("mousedown", (e) =>{
    mouseDown = true;
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
  });

  document.addEventListener("mouseup", (e) =>{
    if(!mouseDown) return;
    mouseDown = false;

    const deltaX = e.clientX - mouseStartX;
    const deltaY = e.clientY - mouseStartY;

    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    const isVertical = Math.abs(deltaY) > Math.abs(deltaX);

    if (isHorizontal && Math.abs(deltaX) > 60){
      handleSwipe(deltaX);
    } else if (isVertical && Math.abs(deltaY) > 60) {
      if(deltaY < 0) showKeyboard();
      else hideKeyboard();
    }
  });

  console.log("✅ Mouse Listeners Attached!");
  
}, {passive: true});

function handleSwipe(deltaX) {
    const swipeThreshold = 60; // Minimum 60px swipe
    const absDelta = Math.abs(deltaX);
    const overlay = document.getElementById("themeChangeOverlay");

    if (deltaX > swipeThreshold) {
        document.body.clientWidth; // Force browser to acknowledge transitions
        document.body.classList.add('theme-changing');

         // Toggle theme based on direction
        isBlueTheme = deltaX > 0 ? !isBlueTheme : isBlueTheme; 
        overlay.style.opacity = "1";

        pinkStyle.disabled = isBlueTheme;
        blueStyle.disabled = !isBlueTheme;

        document.body.classList.add('theme-changing');
        setTimeout(() => {
            document.body.classList.remove('theme-changing');
        }, 500);

        overlay.style.opacity = "0";
        localStorage.setItem('isBlueTheme', isBlueTheme);
        document.querySelectorAll('.heart-particle').forEach(heart => heart.remove());
    }
}

// Keyboard Toggle
function showKeyboard() {
    const keyboard = document.getElementById('keyboardOverlay');
    if (keyboard) {
        keyboard.classList.add('visible');
        document.getElementById('magicInput').focus();
    }
}

function hideKeyboard() {
    const keyboard = document.getElementById('keyboardOverlay');
    const input = document.getElementById('magicInput');
    if (keyboard) {
      keyboard.classList.remove('visible');
      input.blur(); // Remove focus
      input.value = ''; // Clear input
      // Force layout recalc to prevent strange scroll behavior
      void keyboard.offsetHeight;
    }
}

// Keyword Detection
document.addEventListener("DOMContentLoaded", () => {
  isBlueTheme = localStorage.getItem('isBlueTheme') === 'true';

  document.body.clientWidth; // Force browser to acknowledge transitions
  document.body.classList.add('theme-changing');

  pinkStyle.disabled = isBlueTheme;
  blueStyle.disabled = !isBlueTheme;

  document.body.classList.add('theme-changing');
  setTimeout(() => {
      document.body.classList.remove('theme-changing');
  }, 500);

  const magicInput = document.getElementById('magicInput');
  if (magicInput) {
    magicInput.addEventListener('input', (e) => {
      const inputValue = e.target.value.trim();
      if (KEYWORD.some(keyword => inputValue.toLowerCase() === keyword.toLowerCase())) {
        isMagicActive = true;
        hideKeyboard();
        document.body.style.cursor = 'pointer';
        e.target.value = ''; // Clear input
      }
    });
  } else {
    console.error("Magic input element not found");
  }
});

// Heart Particles
 const handleHeartCreate = (e) => {
  if (!isMagicActive) return;

  // Get coordinates for both mouse and touch events
  let x, y;
  if (e.type === 'touchend') {
    const touch = e.changedTouches[0];
    x = touch.clientX;
    y = touch.clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  const heartCount = 8;
  const colors = ['#ff4081', '#ff79b0', '#ff1493', '#ff6ec4'];
  
  for (let i = 0; i < heartCount; i++) {
    createHeart(x, y, colors);
  }
};

document.addEventListener('click', handleHeartCreate);
document.addEventListener('touchend', handleHeartCreate);

function createHeart(x, y, colors) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'heart-particle';
    heart.style.setProperty("--dx", random(2)- 1);
    heart.style.setProperty("--dy", random(2)- 1);
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = `${20 + Math.random() * 20}px`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
}
