// Decorative hero artwork: a night solar field under a glowing "G" ring, with
// a transmission line carrying a moving pulse of current. It is placeholder
// art until real project photography is available.
//
// Depth is faked three ways: the towers are drawn as boxes (front and back
// faces joined together, the back one pulled toward the vanishing point), the
// scene is split into far / mid / near layers that drift by different amounts,
// and haze thickens toward the horizon.

const W = 1200;
const VX = 790; // vanishing point x, also the centre of the G ring
const HORIZON = 455;

// Solar panels in perspective: 7 rows from far (small) to near (large).
function buildPanels() {
  const panels = [];
  const rows = 7;
  for (let i = 0; i < rows; i++) {
    const s = 0.16 + (i / (rows - 1)) * 0.84;
    const d = 6 + 250 * Math.pow((s - 0.1) / 0.9, 1.25);
    const y = HORIZON + d;
    const h = 54 * s;
    const w = 118 * s;
    const pitch = 128 * s;
    const ratio = (d - h) / d;
    const kMin = Math.floor((-40 - VX) / pitch) - 1;
    const kMax = Math.ceil((W + 40 - VX) / pitch) + 1;
    for (let k = kMin; k <= kMax; k++) {
      const xl = VX + k * pitch;
      const xr = xl + w;
      const xtl = VX + (xl - VX) * ratio;
      const xtr = VX + (xr - VX) * ratio;
      panels.push({
        key: `${i}-${k}`,
        points: `${xl.toFixed(1)},${y.toFixed(1)} ${xr.toFixed(1)},${y.toFixed(1)} ${xtr.toFixed(1)},${(y - h).toFixed(1)} ${xtl.toFixed(1)},${(y - h).toFixed(1)}`,
        edge: `${xl.toFixed(1)},${y.toFixed(1)} ${xr.toFixed(1)},${y.toFixed(1)} ${xr.toFixed(1)},${(y + 3.5 * s).toFixed(1)} ${xl.toFixed(1)},${(y + 3.5 * s).toFixed(1)}`,
        glint: (k * 3 + i * 5) % 11 === 0,
        sw: 0.5 + s * 0.7,
      });
    }
  }
  return panels;
}

// A lattice transmission tower drawn as a box: a front face and a back face
// (scaled toward the vanishing point by k) joined at every tier. Returns the
// strokes plus the front arm tips, where the conductors attach.
function tower3d(x, base, h, w, k) {
  const n = 7;
  const hw = (f) => w * (1 - 0.86 * f);
  const yAt = (f) => base - h * f;
  const back = (px, py) => [VX + (px - VX) * k, HORIZON + (py - HORIZON) * k];
  const front = (px, py) => [px, py];
  const pt = ([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`;

  const face = (m) => {
    let d = `M${pt(m(x - hw(0), yAt(0)))} L${pt(m(x - hw(1), yAt(1)))} M${pt(m(x + hw(0), yAt(0)))} L${pt(m(x + hw(1), yAt(1)))}`;
    for (let j = 0; j < n; j++) {
      const f0 = j / n;
      const f1 = (j + 1) / n;
      d += ` M${pt(m(x - hw(f1), yAt(f1)))} L${pt(m(x + hw(f1), yAt(f1)))}`;
      d +=
        j % 2 === 0
          ? ` M${pt(m(x - hw(f0), yAt(f0)))} L${pt(m(x + hw(f1), yAt(f1)))}`
          : ` M${pt(m(x + hw(f0), yAt(f0)))} L${pt(m(x - hw(f1), yAt(f1)))}`;
    }
    const a1 = yAt(0.93);
    const a2 = yAt(0.74);
    d += ` M${pt(m(x - w * 1.1, a1))} L${pt(m(x + w * 1.1, a1))} M${pt(m(x - w * 1.6, a2))} L${pt(m(x + w * 1.6, a2))}`;
    return d;
  };

  // Links between the two faces: every tier on both legs, and the arm tips.
  let links = '';
  for (let j = 0; j <= n; j++) {
    const f = j / n;
    links += ` M${pt(front(x - hw(f), yAt(f)))} L${pt(back(x - hw(f), yAt(f)))}`;
    links += ` M${pt(front(x + hw(f), yAt(f)))} L${pt(back(x + hw(f), yAt(f)))}`;
  }
  const a1 = yAt(0.93);
  const a2 = yAt(0.74);
  [[1.1, a1], [1.6, a2]].forEach(([m, ay]) => {
    links += ` M${pt(front(x - w * m, ay))} L${pt(back(x - w * m, ay))} M${pt(front(x + w * m, ay))} L${pt(back(x + w * m, ay))}`;
  });

  // The side that faces the vanishing point is the one we can see: shade it.
  const side = x > VX ? -1 : 1;
  const sx = (f) => x + side * hw(f);
  const shadowBack = back(x, base);

  return {
    front: face(front),
    back: face(back),
    links,
    side: [
      front(sx(0), yAt(0)),
      front(sx(1), yAt(1)),
      back(sx(1), yAt(1)),
      back(sx(0), yAt(0)),
    ]
      .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
      .join(' '),
    leg: `M${pt(front(sx(0), yAt(0)))} L${pt(front(sx(1), yAt(1)))}`,
    foot: { x: (x + shadowBack[0]) / 2, y: (base + shadowBack[1]) / 2, rx: w * 1.9 },
    left: [
      { x: x - w * 1.1, y: a1 },
      { x: x - w * 1.6, y: a2 },
    ],
    right: [
      { x: x + w * 1.1, y: a1 },
      { x: x + w * 1.6, y: a2 },
    ],
  };
}

function sag(p, q, drop = 26) {
  return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${((p.x + q.x) / 2).toFixed(1)} ${(((p.y + q.y) / 2) + drop).toFixed(1)} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`;
}

// Deterministic star field so the artwork never shifts between renders.
function buildStars() {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 42 }, (_, i) => ({
    key: i,
    x: rnd() * W,
    y: rnd() * 380,
    r: 0.5 + rnd() * 0.9,
    o: 0.25 + rnd() * 0.55,
  }));
}

// A jagged lightning path between two points. Deterministic, so the artwork
// is identical on every render.
function bolt(a, b, seed, segments = 6, amp = 9) {
  let r = seed;
  const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  let d = `M${a[0]} ${a[1]}`;
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const off = (rnd() - 0.5) * 2 * amp;
    d += ` L${(a[0] + dx * t + nx * off).toFixed(1)} ${(a[1] + dy * t + ny * off).toFixed(1)}`;
  }
  return d + ` L${b[0]} ${b[1]}`;
}

const G_PATH = 'M941.5 158.9 A185 185 0 1 0 975 265 L860 265';
// Arc 1 jumps the gap in the G. Arc 2 runs from the tip of the crossbar to the ring.
const ZAP_A = bolt([941.5, 158.9], [975, 262], 11, 6, 8);
const ZAP_A_FORK = bolt([958, 205], [992, 214], 29, 3, 5);
const ZAP_B = bolt([860, 265], [868, 432], 5, 8, 10);

const PANELS = buildPanels();
const STARS = buildStars();
const TOWER_A = tower3d(1090, 500, 380, 46, 0.88);
const TOWER_B = tower3d(620, 466, 170, 21, 0.92);
const TOWERS = [TOWER_B, TOWER_A];

const CONDUCTORS = [
  sag(TOWER_A.left[0], TOWER_B.right[0], 30),
  sag(TOWER_A.left[1], TOWER_B.right[1], 34),
  sag(TOWER_B.left[0], { x: -40, y: 360 }, 22),
  sag(TOWER_B.left[1], { x: -40, y: 395 }, 22),
  sag(TOWER_A.right[0], { x: 1260, y: 205 }, 24),
  sag(TOWER_A.right[1], { x: 1260, y: 290 }, 24),
];

export default function HeroScene() {
  return (
    <svg
      className="hero-scene"
      viewBox={`0 0 ${W} 700`}
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#04060b" />
          <stop offset="0.7" stopColor="#0a1430" />
          <stop offset="1" stopColor="#10224f" />
        </linearGradient>
        <radialGradient
          id="hs-horizon"
          cx={VX}
          cy={HORIZON}
          r="560"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${VX} ${HORIZON}) scale(1 0.24) translate(${-VX} ${-HORIZON})`}
        >
          <stop offset="0" stopColor="#2f7bff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#2f7bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#09142e" />
          <stop offset="1" stopColor="#04070f" />
        </linearGradient>
        <linearGradient id="hs-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#45d4ff" />
          <stop offset="1" stopColor="#2f7bff" />
        </linearGradient>
        <linearGradient id="hs-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#173a80" />
          <stop offset="1" stopColor="#091a44" />
        </linearGradient>
        <linearGradient id="hs-panel-lit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a62c4" />
          <stop offset="1" stopColor="#123073" />
        </linearGradient>
        <linearGradient id="hs-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a3a85" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1a3a85" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#45d4ff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#2f7bff" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="hs-pool" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#45d4ff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#2f7bff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2f7bff" stopOpacity="0" />
        </radialGradient>
        <filter id="hs-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="hs-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Static backdrop: never moves, so the edges stay covered */}
      <rect width={W} height="700" fill="url(#hs-sky)" />
      <rect x="0" y="0" width={W} height={HORIZON} fill="url(#hs-horizon)" />
      <rect x="0" y={HORIZON} width={W} height={700 - HORIZON} fill="url(#hs-ground)" />

      {/* Far layer: stars and the G ring */}
      <g className="depth depth-far">
        {STARS.map((s) => (
          <circle key={s.key} className="hero-star" style={{ animationDelay: `${(s.key % 9) * 0.55}s` }} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} fill="#cfe0ff" opacity={s.o.toFixed(2)} />
        ))}

        {/* Instrument dials around the G */}
        <circle className="dial dial-ticks" cx={VX} cy="265" r="240" fill="none" stroke="#7faeff" strokeOpacity="0.5" strokeWidth="6" strokeDasharray="1.2 10.2" />
        <circle className="dial dial-arc" cx={VX} cy="265" r="204" fill="none" stroke="#45d4ff" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="46 16 6 16" />
        <circle className="hero-ring-outer" cx={VX} cy="265" r="218" fill="none" stroke="#2f7bff" strokeOpacity="0.22" strokeWidth="1.2" />

        {/* Expanding pulses */}
        <circle className="hero-wave" cx={VX} cy="265" r="185" fill="none" stroke="#45d4ff" strokeWidth="1.4" />
        <circle className="hero-wave hero-wave-2" cx={VX} cy="265" r="185" fill="none" stroke="#45d4ff" strokeWidth="1.4" />

        <path className="hero-ring-glow" d={G_PATH} fill="none" stroke="url(#hs-ring)" strokeWidth="26" opacity="0.55" filter="url(#hs-blur)" />
        <path className="hero-ring-draw" pathLength="1" d={G_PATH} fill="none" stroke="url(#hs-ring)" strokeWidth="14" strokeLinecap="round" opacity="0.95" />

        {/* Current racing around the G */}
        <path className="hero-comet" pathLength="1" d={G_PATH} fill="none" stroke="#e8fbff" strokeWidth="6" strokeLinecap="round" filter="url(#hs-soft)" />
        <path className="hero-comet hero-comet-2" pathLength="1" d={G_PATH} fill="none" stroke="#9fe8ff" strokeWidth="4" strokeLinecap="round" filter="url(#hs-soft)" />

        {/* Terminals pulse where the G is open */}
        <circle className="hero-terminal" cx="941.5" cy="158.9" r="9" fill="#bff3ff" filter="url(#hs-soft)" />
        <circle className="hero-terminal hero-terminal-2" cx="975" cy="262" r="9" fill="#bff3ff" filter="url(#hs-soft)" />

        {/* Arcs of electricity */}
        <g className="hero-zap" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={ZAP_A} stroke="#45d4ff" strokeWidth="7" opacity="0.7" filter="url(#hs-soft)" />
          <path d={ZAP_A} stroke="#ffffff" strokeWidth="1.8" />
          <path d={ZAP_A_FORK} stroke="#e8fbff" strokeWidth="1.1" />
        </g>
        <g className="hero-zap hero-zap-2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={ZAP_B} stroke="#45d4ff" strokeWidth="7" opacity="0.7" filter="url(#hs-soft)" />
          <path d={ZAP_B} stroke="#ffffff" strokeWidth="1.8" />
        </g>
      </g>

      <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="#7aaaff" strokeOpacity="0.5" strokeWidth="1" />

      {/* Mid layer: the solar field, with a little thickness on each panel */}
      <g className="depth depth-mid">
        <g className="sway sway-mid">
          {PANELS.map((p) => (
            <g key={p.key}>
              <polygon points={p.edge} fill="#050c20" />
              <polygon
                points={p.points}
                fill={p.glint ? 'url(#hs-panel-lit)' : 'url(#hs-panel)'}
                stroke="#5aa0ff"
                strokeOpacity="0.45"
                strokeWidth={p.sw.toFixed(2)}
              />
            </g>
          ))}
        </g>
        <ellipse className="hero-pool" cx={VX} cy={HORIZON + 46} rx="360" ry="44" fill="url(#hs-pool)" />
      </g>

      {/* Haze: far rows fade into the horizon glow */}
      <rect x="0" y={HORIZON} width={W} height="120" fill="url(#hs-haze)" />

      {/* Near layer: towers and conductors */}
      <g className="depth depth-near">
        <g className="sway sway-near">
          {TOWERS.map((t, i) => (
            <ellipse key={`sh${i}`} cx={t.foot.x.toFixed(1)} cy={(t.foot.y + 2).toFixed(1)} rx={t.foot.rx.toFixed(1)} ry={(t.foot.rx * 0.13).toFixed(1)} fill="#000" opacity="0.55" filter="url(#hs-soft)" />
          ))}

          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {TOWERS.map((t, i) => (
              <g key={`t${i}`}>
                <polygon points={t.side} fill="url(#hs-side)" stroke="none" />
                <path d={t.back} stroke="#7f9fd8" strokeOpacity="0.4" strokeWidth={i === 1 ? 1.1 : 0.8} />
                <path d={t.links} stroke="#8fb0e8" strokeOpacity="0.5" strokeWidth={i === 1 ? 1.1 : 0.8} />
                <path d={t.front} stroke="#b9d0fb" strokeOpacity="0.9" strokeWidth={i === 1 ? 1.7 : 1.15} />
                <path d={t.leg} stroke="#e6f0ff" strokeOpacity="0.95" strokeWidth={i === 1 ? 2.6 : 1.7} />
              </g>
            ))}
            {CONDUCTORS.map((d, i) => (
              <path key={`c${i}`} d={d} stroke="#8fb4f5" strokeOpacity="0.55" strokeWidth="1.2" />
            ))}
            {CONDUCTORS.map((d, i) => (
              <path
                key={`f${i}`}
                className="hero-flow"
                d={d}
                stroke="#45d4ff"
                strokeWidth="2.4"
                filter="url(#hs-soft)"
                style={{ strokeDashoffset: i * 11 }}
              />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
