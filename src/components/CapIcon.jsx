// Line icons for the six capabilities. They draw themselves in when the card
// scrolls into view and redraw on hover.
const ICONS = {
  electrical: ['M13 2 4 14h7l-1 8 9-12h-7z'],
  solar: ['M12 1v2 M4.5 4.5 6 6 M19.5 4.5 18 6 M9 8a3 3 0 0 1 6 0', 'M4 21l2.5-9h11L20 21z', 'M12 12v9 M5.2 17h13.6'],
  'power-systems': ['M3 7h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z M22 11v2', 'M11 9l-2 3h4l-2 3'],
  'commercial-industrial': ['M4 21V5l8-3v19 M12 8h8v13 M2 21h20', 'M7 9h2 M7 13h2 M7 17h2 M15 12h2 M15 16h2'],
  maintenance: ['M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z'],
  consulting: ['M3 3v18h18', 'M7 15l4-5 3 3 5-7'],
};

export default function CapIcon({ slug }) {
  const paths = ICONS[slug] || ICONS.electrical;
  return (
    <svg className="cap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength="1" style={{ '--i': i }} />
      ))}
    </svg>
  );
}
