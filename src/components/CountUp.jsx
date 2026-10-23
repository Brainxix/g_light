import { useEffect, useRef, useState } from 'react';

// Counts a number up when it scrolls into view. Values that are not a plain
// number with an optional suffix (for example "24/7") are shown as written.
export default function CountUp({ value, duration = 1400 }) {
  const match = /^(\d+)(\D*)$/.exec(value);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const ref = useRef(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setN(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (target === null) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
