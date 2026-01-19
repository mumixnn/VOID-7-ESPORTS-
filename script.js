// ===== SELECT PLAYERS =====
const players = document.querySelectorAll('.player');

// ===== TAP / SWIPE TO FLIP =====
players.forEach(player => {
  const card = player.querySelector('.flip-card');
  const counters = player.querySelectorAll('.count');

  let animated = false;
  let startX = 0;

  // TAP (CLICK)
  card.addEventListener('click', flip);

  // SWIPE START
  card.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  // SWIPE END
  card.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 50) {
      flip();
    }
  });

  function flip() {
    card.classList.toggle('flipped');

    // Animate counters only first time
    if (!animated && card.classList.contains('flipped')) {
      counters.forEach(counter => animateCounter(counter));
      animated = true;
    }
  }
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = +el.dataset.value;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));

  function run() {
    current += step;
    if (current >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = current;
    requestAnimationFrame(run);
  }

  run();
}
