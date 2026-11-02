import { useEffect } from 'react';

// Extra motion for the whole page: scroll progress bar, a soft glow that follows
// the pointer, magnetic buttons and the card spotlight. Switched off for people
// who ask their device for reduced motion, and on touch screens where it makes no sense.
export default function MotionFX() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;

    const bar = document.createElement('div');
    bar.className = 'fx-progress';
    document.body.appendChild(bar);

    let glow = null;
    if (fine) {
      glow = document.createElement('div');
      glow.className = 'fx-glow';
      document.body.appendChild(glow);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.setProperty('--p', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
        ticking = false;
      });
    };

    const onMove = (e) => {
      if (glow) {
        glow.style.setProperty('--gx', `${e.clientX}px`);
        glow.style.setProperty('--gy', `${e.clientY}px`);
        glow.classList.add('on');
      }
      const card = e.target.closest ? e.target.closest('.project-card, .cap, .proj-row') : null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const btn = e.target.closest ? e.target.closest('.btn') : null;
      if (btn) {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.setProperty('--tx', `${(x * 8).toFixed(1)}px`);
        btn.style.setProperty('--ty', `${(y * 6).toFixed(1)}px`);
      }
    };

    const onOut = (e) => {
      const btn = e.target.closest ? e.target.closest('.btn') : null;
      if (btn) {
        btn.style.setProperty('--tx', '0px');
        btn.style.setProperty('--ty', '0px');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerout', onOut);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      bar.remove();
      if (glow) glow.remove();
    };
  }, []);

  return null;
}
