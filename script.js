}
/* ===== MAIN JS FOR V7 PLAYERS ===== */
const players = document.querySelectorAll(".player");
let topFragger = null;
let mvp = null;

/* ===== ADD V7 PREFIX TO NAMES ===== */
players.forEach(p => {
  const nameEl = p.querySelector(".player-name");
  nameEl.textContent = "V7 " + nameEl.textContent.trim();
});

/* ===== DETERMINE MVP & TOP FRAGGER ===== */
players.forEach(p => {
  const kills = +p.dataset.kills;
  const damage = +p.dataset.damage;

  // Top Fragger: highest kills (tie → more damage)
  if (!topFragger || kills > topFragger.kills || (kills === topFragger.kills && damage > topFragger.damage)) {
    topFragger = { player: p, kills, damage };
  }

  // MVP: highest damage
  if (!mvp || damage > mvp.damage) {
    mvp = { player: p, damage };
  }
});

/* ===== APPLY BADGES & GLOW ===== */
players.forEach(p => {
  const badgeBox = p.querySelector(".badges");

  if (p === mvp.player) {
    badgeBox.innerHTML += `<div class="badge mvp">👑 MVP</div>`;
    p.querySelector(".flip-card").classList.add("mvp-card"); // glow effect
  }

  if (p === topFragger.player) {
    badgeBox.innerHTML += `<div class="badge top-fragger">💥 Top Fragger</div>`;
  }
});

/* ===== TAP + 4-DIRECTION SWIPE + COUNTER + AUTO FLIP ===== */
players.forEach(player => {
  const card = player.querySelector(".flip-card");
  const counters = player.querySelectorAll(".count");
  let animated = false;
  let flipTimeout;

  let touchStartX = 0;
  let touchStartY = 0;

  // TAP
  card.addEventListener("click", flipCard);

  // TOUCH START
  card.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });

  // TOUCH END
  card.addEventListener("touchend", e => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    // Only flip if swipe distance > 50px to avoid accidental touches
    if (Math.abs(dx) > 50 || Math.abs(dy) > 50) {
      flipCard();
    }
  });

  function flipCard() {
    // Clear any previous timeout
    if (flipTimeout) clearTimeout(flipTimeout);

    // Flip card
    card.classList.add("flipped");

    // Animate counters only on first flip
    if (!animated) {
      counters.forEach(animateCounter);
      animated = true;
    }

    // Auto-flip back after 4 seconds
    flipTimeout = setTimeout(() => {
      card.classList.remove("flipped");
    }, 4000);
  }
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = +el.dataset.value;
  let current = 0;
  const step = Math.ceil(target / 40); // 40 frames animation

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
