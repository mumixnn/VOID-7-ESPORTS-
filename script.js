const players = document.querySelectorAll(".player");
let topFragger = null;
let mvp = null;

/* ===== ADD V7 PREFIX ===== */
players.forEach(p => {
  const nameEl = p.querySelector(".player-name");
  nameEl.textContent = "V7 " + nameEl.textContent.trim();
});

/* ===== DETERMINE MVP & TOP FRAGGER ===== */
players.forEach(p => {
  const kills = +p.dataset.kills;
  const damage = +p.dataset.damage;

  // Top Fragger: most kills (tie → more damage)
  if (!topFragger || kills > topFragger.kills || (kills === topFragger.kills && damage > topFragger.damage)) {
    topFragger = { player: p, kills, damage };
  }

  // MVP: most damage
  if (!mvp || damage > mvp.damage) {
    mvp = { player: p, damage };
  }
});

/* ===== APPLY BADGES & GLOW ===== */
players.forEach(p => {
  const badgeBox = p.querySelector(".badges");

  if (p === mvp.player) {
    badgeBox.innerHTML += `<div class="badge mvp">👑 MVP</div>`;
    p.classList.add("mvp-card"); // glow effect
  }

  if (p === topFragger.player) {
    badgeBox.innerHTML += `<div class="badge top-fragger">💥 Top Fragger</div>`;
  }
});

/* ===== FLIP CARD + TAP + 4-DIRECTION SWIPE + COUNTER ===== */
players.forEach(player => {
  const card = player.querySelector(".flip-card");
  const counters = player.querySelectorAll(".count");
  let animated = false;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  // TAP
  card.addEventListener("click", flip);

  // TOUCH START
  card.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });

  // TOUCH END
  card.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
  });

  function handleGesture() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx > 30 || absDy > 30) { // swipe threshold
      flip();
    }
  }

  function flip() {
    card.classList.toggle("flipped");

    // Animate counters only on first flip
    if (!animated && card.classList.contains("flipped")) {
      counters.forEach(animateCounter);
      animated = true;
    }

    // Auto-flip back after 3 seconds
    if (card.classList.contains("flipped")) {
      setTimeout(() => card.classList.remove("flipped"), 3000);
    }
  }
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = +el.dataset.value;
  let current = 0;
  const step = Math.ceil(target / 40); // 40 frames

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
