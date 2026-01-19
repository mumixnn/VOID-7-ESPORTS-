const data = SCRIM_HISTORY;

const svg = document.querySelector("svg");
const W = 600, H = 300, P = 40;

const stepX = (W - P * 2) / (data.length - 1);
const scaleY = (H - P * 2) / 23;

// Axis
svg.innerHTML += `
  <line class="axis" x1="${P}" y1="${P}" x2="${P}" y2="${H-P}"/>
  <line class="axis" x1="${P}" y1="${H-P}" x2="${W-P}" y2="${H-P}"/>
`;

// Y labels
[1,6,12,18,24].forEach(v => {
  const y = P + (v - 1) * scaleY;
  svg.innerHTML += `
    <text x="5" y="${y+4}" fill="#ccc" font-size="11">${v}</text>
    <line class="axis" x1="${P-5}" y1="${y}" x2="${W-P}" y2="${y}"/>
  `;
});

// X labels + path
let path = "";
data.forEach((s,i) => {
  const x = P + i * stepX;
  const y = P + (s.standing - 1) * scaleY;
  path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  svg.innerHTML += `
    <text x="${x-20}" y="${H-10}" fill="#ccc" font-size="11">${s.date}</text>
    <circle class="dot" cx="${x}" cy="${y}" r="5">
      <title>${s.date} : Rank ${s.standing}</title>
    </circle>
  `;
});

svg.innerHTML += `<path class="line" d="${path}"/>`;
