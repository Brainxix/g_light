import { useEffect, useState } from 'react';

export const API_BASE = (import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000').replace(/\/$/, '');

// Fetches a list from the backend. While loading, or if the backend can't be
// reached, `data` stays as the fallback, so the site never shows an error.
export function useApi(path, fallback = []) {
  const [state, setState] = useState({ data: fallback, loaded: false, ok: false });

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}${path}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        return r.json();
      })
      .then((json) => {
        const data = Array.isArray(json) ? json : json.results || [];
        if (!cancelled) setState({ data, loaded: true, ok: true });
      })
      .catch((err) => {
        console.warn(`Could not load ${path}:`, err.message);
        if (!cancelled) setState((s) => ({ ...s, loaded: true, ok: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}
