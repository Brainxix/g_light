import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal.jsx';

const API_BASE = 'http://127.0.0.1:8000';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Appliance', value: 'appliance' },
  { label: 'Interior', value: 'interior' },
  { label: 'Solar', value: 'solar' },
  { label: 'Conduit', value: 'conduit' },
];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    setStatus('loading');
    const url =
      active === 'all'
        ? `${API_BASE}/api/projects/`
        : `${API_BASE}/api/projects/?category=${active}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => {
        setStatus('error');
      });
  }, [active]);

  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Our work</div>
        <h1>Gallery</h1>
        <p>A look at recent jobs across appliance installs, interior work, solar, and conduit wiring.</p>
      </section>

      <div className="gallery-filter">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={active === f.value ? 'active' : ''}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <p className="wrap" style={{ padding: '0 24px 40px', color: 'rgba(20,25,43,0.6)' }}>
          Loading photos…
        </p>
      )}

      {status === 'error' && (
        <p className="wrap" style={{ padding: '0 24px 40px', color: 'rgba(20,25,43,0.6)' }}>
          Couldn't load the gallery right now. Make sure the backend server is running.
        </p>
      )}

      {status === 'ready' && projects.length === 0 && (
        <p className="wrap" style={{ padding: '0 24px 40px', color: 'rgba(20,25,43,0.6)' }}>
          No photos in this category yet.
        </p>
      )}

      {status === 'ready' && projects.length > 0 && (
        <div className="gallery-grid" key={active}>
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 40}>
              <div className={`gallery-card${project.category === 'solar' ? ' solar' : ''}`}>
                <div className="thumb" style={{ background: 'none' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="info">
                  <h4>{project.title}</h4>
                  <span>{project.category}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
