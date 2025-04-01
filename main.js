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
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        console.log("✅ Touch End:", touchEndX, touchEndY);

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchStartY - touchEndY; // Negative = swipe up

        console.log("📌 Delta X:", deltaX, "📌 Delta Y:", deltaY);

        // 🔹 Handle Right Swipe
        const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
        
        if (isHorizontal) {
            handleSwipe(deltaX);
        } else if (deltaY > 60) { 
            console.log("⬆️ Swipe Up Detected!");
            showKeyboard();
        }
    }
    catch (error) {
      console.error("Touchend Error:", error);
    }
  });

  console.log("✅ Swipe Listeners Attached!");
}, {passive: true});

function handleSwipe(deltaX) {
    const swipeThreshold = 60; // Minimum 60px swipe
    const absDelta = Math.abs(deltaX);

    if (deltaX > swipeThreshold) {
        document.body.clientWidth; // Force browser to acknowledge transitions
        document.body.classList.add('theme-changing');

         // Toggle theme based on direction
        isBlueTheme = deltaX > 0 ? !isBlueTheme : isBlueTheme; 

        pinkStyle.disabled = isBlueTheme;
        blueStyle.disabled = !isBlueTheme;

        document.body.classList.add('theme-changing');
        setTimeout(() => {
            document.body.classList.remove('theme-changing');
        }, 500);
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
    if (keyboard) {
        keyboard.classList.remove('visible');
    }
}

// Keyword Detection
document.addEventListener("DOMContentLoaded", () => {
  const magicInput = document.getElementById('magicInput');

  if (magicInput) { // Check if element exists
      magicInput.addEventListener('input', (e) => {
          if (KEYWORD.some(keyword => 
              e.target.value.toLowerCase() === keyword.toLowerCase())) {
              isMagicActive = true;
              hideKeyboard();
              document.body.style.cursor = 'pointer';
          }
      });
  } else {
      console.error("❌ Error: Element with ID 'magicInput' not found.");
  }
});

// Heart Particles
document.addEventListener('click', (e) => {
    if (!isMagicActive) return;
    
    const heartCount = 8;
    const colors = ['#ff4081', '#ff79b0', '#ff1493', '#ff6ec4'];
    
    for (let i = 0; i < heartCount; i++) {
        createHeart(e.clientX, e.clientY, colors);
    }
});

function createHeart(x, y, colors) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'heart-particle';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = `${20 + Math.random() * 20}px`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
}
