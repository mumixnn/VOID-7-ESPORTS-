// Select all player cards
const players = document.querySelectorAll(".player");

let topFragger = null;
let mvp = null;

// Decide MVP & Top Fragger
players.forEach(player => {
  const kills = parseInt(player.dataset.kills);
  const damage = parseInt(player.dataset.damage);

  // Top Fragger: highest kills, tie → highest damage
  if (!topFragger ||
      kills > topFragger.kills ||
      (kills === topFragger.kills && damage > topFragger.damage)) {
    topFragger = { player, kills, damage };
  }

  // MVP: highest damage
  if (!mvp || damage > mvp.damage) {
    mvp = { player, damage };
  }
});

// Apply badges to the players
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

// Animated stat counters for kills and damage
const counters = document.querySelectorAll(".count");

counters.forEach(counter => {
  const target = +counter.dataset.value; // final value
  let current = 0;
  const speed = target > 100 ? 25 : 40; // faster for smaller numbers

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
