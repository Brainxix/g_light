// Electric sparks: short, jagged arcs that snap on, crackle and vanish, like
// a live contact arcing. No flying embers and no gravity.
//  - Ambient: an arc snaps off the edge of a card, button or number.
//  - Interactive: small arcs crackle around the cursor, and a click makes a
//    brief crackle at that spot.
// The canvas ignores the pointer, pauses when the tab is hidden, and is not
// started at all for visitors who ask for reduced motion.

const TARGETS = '.cap, .why-item, .proj-row, .metric, .cta, .btn-primary, .project-card, .contact-form';
const MAX = 36;

export function startSparks(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let w = 0;
  let h = 0;
  let raf = 0;
  let last = 0;
  let nextAmbient = 1200;
  let lastTrail = { x: -99, y: -99 };
  const arcs = [];

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const rnd = (a, b) => a + Math.random() * (b - a);

  // Build a fresh jagged path. Called again every few frames so the arc crackles.
  const jag = (arc) => {
    const n = arc.segs;
    const pts = [[arc.x, arc.y]];
    const dx = Math.cos(arc.angle);
    const dy = Math.sin(arc.angle);
    const nx = -dy;
    const ny = dx;
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const off = i === n ? rnd(-0.1, 0.1) * arc.len : rnd(-0.24, 0.24) * arc.len;
      pts.push([arc.x + dx * arc.len * t + nx * off, arc.y + dy * arc.len * t + ny * off]);
    }
    arc.pts = pts;
    arc.fork = null;
    if (arc.forks && n > 2) {
      const at = pts[Math.floor(rnd(1, n - 1))];
      const fa = arc.angle + (Math.random() < 0.5 ? -1 : 1) * rnd(0.5, 0.9);
      const fl = arc.len * rnd(0.35, 0.55);
      arc.fork = [at, [at[0] + Math.cos(fa) * fl * 0.5 + nx * rnd(-3, 3), at[1] + Math.sin(fa) * fl * 0.5 + ny * rnd(-3, 3)], [at[0] + Math.cos(fa) * fl, at[1] + Math.sin(fa) * fl]];
    }
  };

  const arc = (x, y, angle, len, opts = {}) => {
    if (arcs.length >= MAX) return;
    const a = {
      x,
      y,
      angle,
      len,
      segs: opts.segs || Math.round(rnd(4, 7)),
      forks: opts.forks ?? len > 22,
      born: 0,
      life: opts.life || rnd(0.1, 0.22),
      glow: opts.glow ?? 1,
      nextJag: 0,
      pts: null,
      fork: null,
    };
    jag(a);
    arcs.push(a);
  };

  // An arc snaps off the edge of a visible component, pointing outward.
  const ambient = () => {
    const visible = [];
    for (const el of document.querySelectorAll(TARGETS)) {
      const r = el.getBoundingClientRect();
      if (r.width > 40 && r.height > 24 && r.bottom > 0 && r.top < h && r.right > 0 && r.left < w) visible.push(r);
    }
    if (!visible.length) return;
    const r = visible[Math.floor(Math.random() * visible.length)];
    const side = Math.floor(Math.random() * 4);
    let x;
    let y;
    let out;
    if (side === 0) { x = r.left + Math.random() * r.width; y = r.top; out = -Math.PI / 2; }
    else if (side === 1) { x = r.right; y = r.top + Math.random() * r.height; out = 0; }
    else if (side === 2) { x = r.left + Math.random() * r.width; y = r.bottom; out = Math.PI / 2; }
    else { x = r.left; y = r.top + Math.random() * r.height; out = Math.PI; }
    x = Math.min(Math.max(x, 0), w);
    y = Math.min(Math.max(y, 0), h);
    arc(x, y, out + rnd(-0.6, 0.6), rnd(16, 46));
    // sometimes a second arc follows it a beat later, from the same contact
    if (Math.random() < 0.35) arc(x, y, out + rnd(-0.9, 0.9), rnd(10, 28));
  };

  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    const dx = e.clientX - lastTrail.x;
    const dy = e.clientY - lastTrail.y;
    if (dx * dx + dy * dy < 34 * 34) return;
    lastTrail = { x: e.clientX, y: e.clientY };
    if (Math.random() < 0.6) arc(e.clientX, e.clientY, rnd(0, Math.PI * 2), rnd(7, 17), { segs: 3, forks: false, life: rnd(0.08, 0.15), glow: 0.7 });
  };

  const onDown = (e) => {
    const n = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) arc(e.clientX, e.clientY, (i / n) * Math.PI * 2 + rnd(-0.4, 0.4), rnd(12, 30), { life: rnd(0.12, 0.24) });
  };

  const strokePath = (pts) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
  };

  const frame = (t) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((t - last) / 1000 || 0.016, 0.05);
    last = t;

    nextAmbient -= dt * 1000;
    if (nextAmbient <= 0) {
      ambient();
      nextAmbient = 600 + Math.random() * 1500;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = arcs.length - 1; i >= 0; i--) {
      const a = arcs[i];
      a.born += dt;
      if (a.born >= a.life) {
        arcs.splice(i, 1);
        continue;
      }
      // re-roll the shape every ~40ms so the arc crackles instead of sitting still
      a.nextJag -= dt;
      if (a.nextJag <= 0) {
        jag(a);
        a.nextJag = 0.035 + Math.random() * 0.025;
      }
      // hard on / off flicker, brighter at the start
      if (Math.random() < 0.18) continue;
      const k = 1 - a.born / a.life;
      const a1 = Math.min(1, 0.45 + k);

      ctx.strokeStyle = `rgba(69,212,255,${(0.28 * a1 * a.glow).toFixed(3)})`;
      ctx.lineWidth = 5;
      strokePath(a.pts);
      if (a.fork) {
        ctx.lineWidth = 3.5;
        strokePath(a.fork);
      }

      ctx.strokeStyle = `rgba(214,246,255,${a1.toFixed(3)})`;
      ctx.lineWidth = 1.3;
      strokePath(a.pts);
      if (a.fork) {
        ctx.lineWidth = 0.9;
        strokePath(a.fork);
      }

      // bright flash where the arc starts
      ctx.fillStyle = `rgba(255,255,255,${(0.9 * k * a.glow).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.6 + k, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  last = performance.now();
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onDown);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
