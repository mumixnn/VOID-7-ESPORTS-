const players = document.querySelectorAll(".player");
let topFragger = null;
let mvp = null;

players.forEach(p => {
  const nameEl = p.querySelector(".player-name");
  nameEl.textContent = "V7 " + nameEl.textContent.trim();
});

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

players.forEach(p => {
  const badgeBox = p.querySelector(".badges");
  if (p === mvp.player) {
    badgeBox.innerHTML += `<div class="badge mvp">👑 MVP</div>`;
    p.querySelector(".flip-card").classList.add("mvp-card");
  }
  if (p === topFragger.player) {
    badgeBox.innerHTML += `<div class="badge top-fragger">💥 Top Fragger</div>`;
  }
});

players.forEach(player => {
  const card = player.querySelector(".flip-card");
  const counters = player.querySelectorAll(".count");
  let animated = false;
  let flipTimeout;
  let touchStartX = 0, touchStartY = 0;

  card.addEventListener("click", flipCard);
  card.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; touchStartY = e.changedTouches[0].screenY; });
  card.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    if(Math.abs(dx)>50||Math.abs(dy)>50){flipCard();}
  });

  function flipCard(){
    if(flipTimeout) clearTimeout(flipTimeout);
    card.classList.add("flipped");
    if(!animated){counters.forEach(animateCounter);animated=true;}
    flipTimeout=setTimeout(()=>{card.classList.remove("flipped");},4000);
  }
});

function animateCounter(el){
  const target=+el.dataset.value;
  let current=0;
  const step=Math.ceil(target/40);
  function run(){current+=step;if(current>=target){el.textContent=target;return;}el.textContent=current;requestAnimationFrame(run);}
  run();
}
