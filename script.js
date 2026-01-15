const players = document.querySelectorAll(".player");

let topFragger = null;
let mvp = null;

players.forEach(player => {
  const kills = Number(player.dataset.kills);
  const damage = Number(player.dataset.damage);

  if (
    !topFragger ||
    kills > topFragger.kills ||
    (kills === topFragger.kills && damage > topFragger.damage)
  ) {
    topFragger = { player, kills, damage };
  }

  if (!mvp || damage > mvp.damage) {
    mvp = { player, damage };
  }
});

if (topFragger) {
  const badge = topFragger.player.querySelector(".badge");
  badge.textContent = "TOP FRAGGER";
  badge.classList.add("top-fragger");
}

if (mvp) {
  const badge = mvp.player.querySelector(".badge");
  badge.textContent = "MVP";
  badge.classList.add("mvp");
}
