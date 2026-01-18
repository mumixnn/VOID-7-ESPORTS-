// ======================
// SELECT PLAYERS
// ======================
const players = document.querySelectorAll(".player");

let topFragger = null;
let mvp = null;

// ======================
// FORCE V7 NAME FORMAT
// ======================
players.forEach(player => {
  const nameEl = player.querySelector(".player-name");
  if (!nameEl) return;

  let name = nameEl.textContent.trim();
  name = name.replace(/^V7\s*/i, ""); // avoid double V7
  nameEl.textContent = `V7 ${name}`;
});

// ======================
// AUTO MVP & TOP FRAGGER
// ======================
players.forEach(player => {
  const kills = parseInt(player.dataset.kills);
  const damage = parseInt(player.dataset.damage);

  // Top Fragger (kills → damage tie breaker)
  if (
    !topFragger ||
    kills > topFragger.kills ||
    (kills === topFragger.kills && damage > topFragger.damage)
  ) {
    topFragger = { player, kills, damage };
  }

  // MVP (highest damage)
  if (!mvp || damage > mvp.damage) {
    mvp = { player, damage };
  }
});

// Apply badges
players.forEach(player => {
  const badgeBox = player.querySelector(".badges");

  if (player === mvp.player) {
    badgeBox.innerHTML += `<div class="badge mvp">MVP 👑</div>`;
    player.classList.add("mvp-card");
  }

  if (player === topFragger.player) {
    badgeBox.innerHTML += `<div class="badge top-fragger">Top Fragger 💥</div>`;
  }
});

// ======================
// FLIP + TAP + SWIPE + AUTO BACK
// ======================
players.forEach(player => {
  const card = player.querySelector(".flip-card");
  const counters = player.querySelectorAll(".count");

  let animated = false;
  let autoFlipTimer = null;
  let startX = 0;

  // TAP TO FLIP
  card.addEventListener("click", handleFlip);

  // SWIPE TO FLIP (MOBILE)
  card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  card.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 50) {
      handleFlip();
    }
  });

  function handleFlip() {
    card.classList.toggle("flipped");

    // Animate stats only once
    if (!animated && card.classList.contains("flipped")) {
      counters.forEach(counter => animateCounter(counter));
      animated = true;
    }

    // Auto flip back
    clearTimeout(autoFlipTimer);
    if (card.classList.contains("flipped")) {
      autoFlipTimer = setTimeout(() => {
        card.classList.remove("flipped");
      }, 3000); // ⏱ delay
    }
  }
});

// ======================
// COUNTER ANIMATION
// ======================
function animateCounter(counter) {
  const target = +counter.dataset.value;
  let current = 0;
  const step = Math.ceil(target / 40);

  function update() {
    current += step;
    if (current >= target) {
      counter.textContent = target;
      return;
    }
    counter.textContent = current;
    requestAnimationFrame(update);
  }
  update();
}
