import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import ProjectRow from '../components/ProjectRow.jsx';
import CTASection from '../components/CTASection.jsx';
import { FEATURED_PROJECTS } from '../content.js';
import { API_BASE } from '../api.js';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/projects/`)
      .then((r) => {
        if (!r.ok) throw new Error('Request failed');
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => console.warn('Could not load project gallery:', err));
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = ['all', ...new Set(items.map((p) => p.category))];
  const shown = filter === 'all' ? items : items.filter((p) => p.category === filter);

  return (
    <>
      <section className="page-hero wrap">
        <h1>Completed projects</h1>
        <p>Real projects. Real systems. Real performance.</p>
      </section>

      <section className="wrap">
        <div className="proj-list">
          {FEATURED_PROJECTS.map((p) => (
            <ProjectRow key={p.name} {...p} />
          ))}
        </div>
      </section>

      {items.length > 0 && (
        <Reveal>
          <section className="section wrap">
            <div className="section-head">
              <h2>Project gallery</h2>
            </div>
            <div className="filter-row">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip${filter === c ? ' active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="project-grid">
              {shown.map((p) => (
                <article className="project-card" key={p.id}>
                  <div className="thumb">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                  <div className="info">
                    <h3>{p.title}</h3>
                    <p className="meta">{p.category}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <CTASection
        heading="Have a power project?"
        body="Tell us what you're building."
        primary={{ label: 'Start your project', to: '/contact' }}
      />
    </>
  );
}
