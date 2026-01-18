// ===== SELECT ALL PLAYER CARDS =====
const players = document.querySelectorAll(".player");
let topFragger = null;
let mvp = null;

// Add "V7" prefix to all player names
players.forEach(player => {
  const nameEl = player.querySelector(".player-name");
  nameEl.textContent = "V7 " + nameEl.textContent.trim();
});

// Determine Top Fragger and MVP
players.forEach(player => {
  const kills = +player.dataset.kills;
  const damage = +player.dataset.damage;

  // Top Fragger: highest kills, tie → highest damage
  if (!topFragger || kills > topFragger.kills || (kills === topFragger.kills && damage > topFragger.damage)) {
    topFragger = { player, kills, damage };
  }

  // MVP: highest damage
  if (!mvp || damage > mvp.damage) {
    mvp = { player, damage };
  }
});

// Apply badges and MVP glow
players.forEach(player => {
  const badgeContainer = player.querySelector(".badges");

  if (player === mvp.player) {
    badgeContainer.innerHTML += `<div class="badge mvp">MVP 👑</div>`;
    player.classList.add("mvp-card");
  }

  if (player === topFragger.player) {
    badgeContainer.innerHTML += `<div class="badge top-fragger">Top Fragger 💥</div>`;
  }
});

// Flip card + swipe + counter animation
players.forEach(player => {
  const card = player.querySelector(".flip-card");
  const counters = player.querySelectorAll(".count");
  let animated = false; // Animate counters only once
  let timer = null;
  let startX = 0;

  // Click to flip
  card.addEventListener("click", flip);

  // Swipe detection (mobile)
  card.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  card.addEventListener("touchend", e => {
    if (Math.abs(e.changedTouches[0].clientX - startX) > 50) flip();
  });

  function flip() {
    card.classList.toggle("flipped");

    // Animate counters once
    if (!animated && card.classList.contains("flipped")) {
      counters.forEach(c => animateCounter(c));
      animated = true;
    }

    // Auto flip back after 3 seconds
    clearTimeout(timer);
    if (card.classList.contains("flipped")) {
      timer = setTimeout(() => card.classList.remove("flipped"), 3000);
    }
  }
});

// Counter animation function
function animateCounter(el) {
  const target = +el.dataset.value;
  let current = 0;
  const step = Math.ceil(target / 40);

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
