// ===== SELECT PLAYERS =====
const players = document.querySelectorAll(".player");
let topFragger = null;
let mvp = null;

// Prefix names with V7
players.forEach(p => {
  const nameEl = p.querySelector(".player-name");
  nameEl.textContent = "V7 " + nameEl.textContent.trim();
});

// Determine Top Fragger & MVP
players.forEach(p => {
  const kills = +p.dataset.kills;
  const damage = +p.dataset.damage;

  if (!topFragger || kills > topFragger.kills || (kills === topFragger.kills && damage > topFragger.damage)) {
    topFragger = { player: p, kills, damage };
  }

  if (!mvp || damage > mvp.damage) {
    mvp = { player: p, damage };
  }
});

// Apply badges
players.forEach(p => {
  const badgeContainer = p.querySelector(".badges");
  if (p === mvp.player) {
    badgeContainer.innerHTML += `<div class="badge mvp">MVP 👑</div>`;
    p.classList.add("mvp-card");
  }
  if (p === topFragger.player) {
    badgeContainer.innerHTML += `<div class="badge top-fragger">Top Fragger 💥</div>`;
  }
});

// Flip + swipe + auto back + counter animation
players.forEach(p => {
  const card = p.querySelector(".flip-card");
  const counters = p.querySelectorAll(".count");
  let animated = false;
  let timer = null;
  let startX = 0;

  card.addEventListener("click", flip);
  card.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  card.addEventListener("touchend", e => {
    if (Math.abs(e.changedTouches[0].clientX - startX) > 50) flip();
  });

  function flip() {
    card.classList.toggle("flipped");

    if (!animated && card.classList.contains("flipped")) {
      counters.forEach(c => animateCounter(c));
      animated = true;
    }

    clearTimeout(timer);
    if (card.classList.contains("flipped")) {
      timer = setTimeout(() => card.classList.remove("flipped"), 3000);
    }
  }
});

// Counter animation function
function animateCounter(el) {
  const target = +el.dataset.value;
  let cur = 0;
  const step = Math.ceil(target / 40);

  function run() {
    cur += step;
    if (cur >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = cur;
    requestAnimationFrame(run);
  }
  run();
}
