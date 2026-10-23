import { useEffect, useRef } from 'react';
import { startSparks } from '../electricSparks.js';

// Full-page layer of tiny electrical sparks. Skipped for reduced-motion users.
export default function Sparks() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    return startSparks(ref.current);
  }, []);

  return <canvas ref={ref} className="sparks" aria-hidden="true" />;
}
