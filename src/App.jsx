import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Sparks from './components/Sparks.jsx';
import Home from './pages/Home.jsx';
import Capabilities from './pages/Capabilities.jsx';
import Projects from './pages/Projects.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

// Cursor-following glow on cards: sets --mx / --my on the hovered element.
function useSpotlight() {
  useEffect(() => {
    const sel = '.cap, .proj-row, .project-card, .why-item';
    const onMove = (e) => {
      const el = e.target.closest && e.target.closest(sel);
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}

// Fades each page in when the route changes.
function Page({ children }) {
  const { pathname } = useLocation();
  return (
    <main key={pathname} className="page">
      {children}
    </main>
  );
}

export default function App() {
  useSpotlight();
  return (
    <BrowserRouter>
      <ScrollProgress />
      <Sparks />
      <ScrollToTop />
      <Navbar />
      <Page>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Navigate to="/capabilities" replace />} />
          <Route path="/solar" element={<Navigate to="/capabilities#solar" replace />} />
          <Route path="/gallery" element={<Navigate to="/projects" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Page>
      <Footer />
    </BrowserRouter>
  );
}
