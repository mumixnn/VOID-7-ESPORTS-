// Select all player cards
const players = document.querySelectorAll(".player");

let topFragger = null;
let mvp = null;

// Force strict V7 | Name
players.forEach(player => {
  const nameEl = player.querySelector(".player-name");
  if (nameEl) {
    let name = nameEl.textContent.trim();

    // Remove existing V7 prefix if already present
    name = name.replace(/^V7\s*\|\s*/i, "");

    // Apply strict format
    nameEl.textContent = `V7 | ${name}`;
  }
});

// Decide MVP & Top Fragger
players.forEach(player => {
  const kills = parseInt(player.dataset.kills);
  const damage = parseInt(player.dataset.damage);

  // Top Fragger: highest kills, tie → highest damage
  if (
    !topFragger ||
    kills > topFragger.kills ||
    (kills === topFragger.kills && damage > topFragger.damage)
  ) {
    topFragger = { player, kills, damage };
  }

  // MVP: highest damage
  if (!mvp || damage > mvp.damage) {
    mvp = { player, damage };
  }
});

// Apply badges
if (topFragger) {
  const badge = topFragger.player.querySelector(".badge");
  badge.textContent = "TOP FRAGGER";
  badge.classList.add("top-fragger");
}

if (mvp) {
  const badge = mvp.player.querySelector(".badge");
  badge.textContent = "MVP";
  badge.classList.add("mvp");
  mvp.player.classList.add("mvp-card");
}

// Animated stat counters
const counters = document.querySelectorAll(".count");

counters.forEach(counter => {
  const target = +counter.dataset.value;
  let current = 0;
  const speed = target > 100 ? 25 : 40;

  const update = () => {
    const increment = Math.ceil(target / speed);
    if (current < target) {
      current += increment;
      if (current > target) current = target;
      counter.textContent = current;
      requestAnimationFrame(update);
    }
  };
  update();
});
