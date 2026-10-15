// Decorative hero artwork: a night solar field under a glowing "G" ring, with
// a transmission line carrying a moving pulse of current. It is placeholder
// art until real project photography is available.

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
        glint: (k * 3 + i * 5) % 11 === 0,
        sw: 0.5 + s * 0.7,
      });
    }
  }
  return panels;
}

// A simple lattice transmission tower. Returns the path plus its arm tips.
function tower(x, base, h, w) {
  const hw = (f) => w * (1 - 0.86 * f);
  const yAt = (f) => base - h * f;
  const n = 7;
  let d = `M${x - hw(0)} ${yAt(0)} L${x - hw(1)} ${yAt(1)} M${x + hw(0)} ${yAt(0)} L${x + hw(1)} ${yAt(1)}`;
  for (let j = 0; j < n; j++) {
    const f0 = j / n;
    const f1 = (j + 1) / n;
    d += ` M${x - hw(f1)} ${yAt(f1)} L${x + hw(f1)} ${yAt(f1)}`;
    d +=
      j % 2 === 0
        ? ` M${x - hw(f0)} ${yAt(f0)} L${x + hw(f1)} ${yAt(f1)}`
        : ` M${x + hw(f0)} ${yAt(f0)} L${x - hw(f1)} ${yAt(f1)}`;
  }
  const a1 = yAt(0.93);
  const a2 = yAt(0.74);
  d += ` M${x - w * 1.1} ${a1} L${x + w * 1.1} ${a1} M${x - w * 1.6} ${a2} L${x + w * 1.6} ${a2}`;
  return {
    d,
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

const PANELS = buildPanels();
const STARS = buildStars();
const TOWER_A = tower(1090, 500, 380, 46);
const TOWER_B = tower(620, 466, 170, 21);

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
        <filter id="hs-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="hs-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <rect width={W} height="700" fill="url(#hs-sky)" />

      {STARS.map((s) => (
        <circle key={s.key} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(2)} fill="#cfe0ff" opacity={s.o.toFixed(2)} />
      ))}

      {/* The G ring, rising over the horizon */}
      <circle cx={VX} cy="265" r="218" fill="none" stroke="#2f7bff" strokeOpacity="0.22" strokeWidth="1.2" />
      <path
        d="M941.5 158.9 A185 185 0 1 0 975 265 L860 265"
        fill="none"
        stroke="url(#hs-ring)"
        strokeWidth="26"
        opacity="0.55"
        filter="url(#hs-blur)"
      />
      <path d="M941.5 158.9 A185 185 0 1 0 975 265 L860 265" fill="none" stroke="url(#hs-ring)" strokeWidth="14" opacity="0.95" />

      <rect x="0" y="0" width={W} height={HORIZON} fill="url(#hs-horizon)" />
      <rect x="0" y={HORIZON} width={W} height={700 - HORIZON} fill="url(#hs-ground)" />
      <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="#7aaaff" strokeOpacity="0.5" strokeWidth="1" />

      {PANELS.map((p) => (
        <polygon
          key={p.key}
          points={p.points}
          fill={p.glint ? '#16397f' : '#0c1f4b'}
          stroke="#5aa0ff"
          strokeOpacity="0.45"
          strokeWidth={p.sw.toFixed(2)}
        />
      ))}

      {/* Transmission line */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={TOWER_B.d} stroke="#a9c4f2" strokeOpacity="0.7" strokeWidth="1.1" />
        <path d={TOWER_A.d} stroke="#a9c4f2" strokeOpacity="0.8" strokeWidth="1.6" />
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
    </svg>
  );
}
