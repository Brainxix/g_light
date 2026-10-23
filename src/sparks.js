// Tiny electrical sparks drawn on a full-page canvas.
//  - Ambient: now and then a small spark jumps off the edge of a card, button
//    or number, like a contact arcing.
//  - Interactive: a faint trail follows the cursor, and a click throws a burst.
// The canvas ignores the pointer, pauses when the tab is hidden, and is not
// started at all for visitors who ask for reduced motion.

const COLORS = ['207,244,255', '69,212,255', '127,174,255', '242,169,59']; // white-cyan, cyan, blue, amber
const MAX = 140;
const TARGETS = '.cap, .why-item, .proj-row, .metric, .cta, .btn-primary, .project-card, .contact-form';

export function startSparks(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let w = 0;
  let h = 0;
  let dpr = 1;
  let raf = 0;
  let last = 0;
  let nextAmbient = 1200;
  let lastTrail = { x: -99, y: -99 };
  const sparks = [];

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const pick = () => {
    // amber is rare, so it reads as a flash of heat rather than a theme
    const r = Math.random();
    return r < 0.08 ? COLORS[3] : r < 0.4 ? COLORS[0] : r < 0.75 ? COLORS[1] : COLORS[2];
  };

  // angle: direction of travel in radians, spread: how wide the fan is
  const emit = (x, y, count, angle, spread, speed = 1) => {
    for (let i = 0; i < count && sparks.length < MAX; i++) {
      const a = angle + (Math.random() - 0.5) * spread;
      const v = (55 + Math.random() * 140) * speed;
      sparks.push({
        x,
        y,
        px: x,
        py: y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        life: 0,
        max: 0.45 + Math.random() * 0.65,
        size: 1 + Math.random() * 1.3,
        color: pick(),
      });
    }
  };

  // A spark leaves a random point on the edge of a visible component.
  const ambient = () => {
    const els = document.querySelectorAll(TARGETS);
    const visible = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width > 40 && r.height > 24 && r.bottom > 0 && r.top < h && r.right > 0 && r.left < w) visible.push(r);
    }
    let x;
    let y;
    let out;
    if (visible.length) {
      const r = visible[Math.floor(Math.random() * visible.length)];
      const side = Math.floor(Math.random() * 4);
      if (side === 0) { x = r.left + Math.random() * r.width; y = r.top; out = -Math.PI / 2; }
      else if (side === 1) { x = r.right; y = r.top + Math.random() * r.height; out = 0; }
      else if (side === 2) { x = r.left + Math.random() * r.width; y = r.bottom; out = Math.PI / 2; }
      else { x = r.left; y = r.top + Math.random() * r.height; out = Math.PI; }
      x = Math.min(Math.max(x, 0), w);
      y = Math.min(Math.max(y, 0), h);
    } else {
      x = Math.random() * w;
      y = Math.random() * h;
      out = Math.random() * Math.PI * 2;
    }
    emit(x, y, 3 + Math.floor(Math.random() * 5), out, 1.6);
  };

  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    const dx = e.clientX - lastTrail.x;
    const dy = e.clientY - lastTrail.y;
    if (dx * dx + dy * dy < 26 * 26) return;
    lastTrail = { x: e.clientX, y: e.clientY };
    if (Math.random() < 0.55) emit(e.clientX, e.clientY, 1 + Math.floor(Math.random() * 2), Math.atan2(-dy, -dx), 1.2, 0.7);
  };

  const onDown = (e) => emit(e.clientX, e.clientY, 9, 0, Math.PI * 2, 1.1);

  const frame = (t) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((t - last) / 1000 || 0.016, 0.05);
    last = t;

    nextAmbient -= dt * 1000;
    if (nextAmbient <= 0) {
      ambient();
      nextAmbient = 700 + Math.random() * 1700;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life += dt;
      if (s.life >= s.max) {
        sparks.splice(i, 1);
        continue;
      }
      s.px = s.x;
      s.py = s.y;
      s.vx *= 1 - 2.2 * dt;
      s.vy = s.vy * (1 - 2.2 * dt) + 120 * dt; // a little gravity
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      const k = 1 - s.life / s.max;
      const flicker = 0.65 + Math.random() * 0.35;
      const a = k * flicker;

      // soft halo, then a hot core
      ctx.strokeStyle = `rgba(${s.color},${(a * 0.22).toFixed(3)})`;
      ctx.lineWidth = s.size * 4;
      ctx.beginPath();
      ctx.moveTo(s.px, s.py);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();

      ctx.strokeStyle = `rgba(${s.color},${a.toFixed(3)})`;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(s.px, s.py);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
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
