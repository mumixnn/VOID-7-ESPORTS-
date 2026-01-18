<script>
const players = document.querySelectorAll(".player");

// ===== MVP & TOP FRAGGER (UNCHANGED LOGIC) =====
let topFragger = null;
let mvp = null;

players.forEach(p => {
  const kills = +p.dataset.kills;
  const damage = +p.dataset.damage;

  if (!topFragger ||
      kills > topFragger.k ||
      (kills === topFragger.k && damage > topFragger.d)) {
    topFragger = { player: p, k: kills, d: damage };
  }

  if (!mvp || damage > mvp.d) {
    mvp = { player: p, d: damage };
  }
});

players.forEach(p => {
  const badgeBox = p.querySelector(".badges");

  if (p === mvp.player) {
    badgeBox.innerHTML += `<div class="badge mvp">MVP 👑</div>`;
    p.classList.add("mvp-card");
  }
  if (p === topFragger.player) {
    badgeBox.innerHTML += `<div class="badge top-fragger">Top Fragger 💥</div>`;
  }
});

// ===== IMPROVED FLIP UX =====
players.forEach(player => {
  const card = player.querySelector(".flip-card");
  const counters = player.querySelectorAll(".count");

  let flipped = false;
  let animPlayed = false;
  let lock = false;
  let autoBackTimer = null;

  let startX = 0;
  let startY = 0;

  // TAP
  card.addEventListener("click", () => {
    triggerFlip();
  });

  // SWIPE START
  card.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
  }, { passive: true });

  // SWIPE END
  card.addEventListener("touchend", e => {
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - startX);
    const dy = Math.abs(t.clientY - startY);

    // Swipe threshold (accurate, no accidental flip)
    if (dx > 50 && dx > dy) {
      triggerFlip();
    }
  });

  function triggerFlip() {
    if (lock) return;
    lock = true;

    flipped = !flipped;
    card.classList.toggle("flipped", flipped);

    // Animate counters once
    if (flipped && !animPlayed) {
      counters.forEach(c => animateCounter(c));
      animPlayed = true;
