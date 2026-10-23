import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import ProjectRow from '../components/ProjectRow.jsx';
import CTASection from '../components/CTASection.jsx';
import { FEATURED_PROJECTS } from '../content.js';
import { useApi } from '../api.js';

export default function Projects() {
  const { data: items } = useApi('/api/projects/');
  const [filter, setFilter] = useState('all');

  // Filter chips come from whatever capabilities the projects actually use.
  const labels = {};
  items.forEach((p) => {
    labels[p.category] = p.category_label || p.category;
  });
  const categories = ['all', ...Object.keys(labels)];
  const shown = filter === 'all' ? items : items.filter((p) => p.category === filter);

  return (
    <>
      <section className="page-hero wrap">
        <h1>Completed projects</h1>
        <p>Real systems. Real performance.</p>
        <span className="pulse-line" aria-hidden="true" />
      </section>

      {items.length === 0 ? (
        // Until projects are added in the admin (or if the backend is offline), show the written list.
        <Reveal>
          <section className="wrap">
            <div className="proj-list">
              {FEATURED_PROJECTS.map((p) => (
                <ProjectRow key={p.name} {...p} />
              ))}
            </div>
          </section>
        </Reveal>
      ) : (
        <section className="wrap">
          <div className="filter-row">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${filter === c ? ' active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c === 'all' ? 'All' : labels[c]}
              </button>
            ))}
          </div>

          <Reveal key={filter}>
            <div className="project-grid">
              {shown.map((p) => (
                <article className="project-card" key={p.id}>
                  <div className="thumb">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                  <div className="info">
                    <h3>{p.title}</h3>
                    <p className="meta">
                      {[p.location, p.year].filter(Boolean).join(' · ')}
                      {p.sector_label ? <span>{p.sector_label}</span> : null}
                    </p>
                    {p.capacity ? <p className="capacity">{p.capacity}</p> : null}
                    {p.description ? <p className="desc">{p.description}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <CTASection
        heading="Have a power project?"
        body="Tell us what you're building."
        primary={{ label: 'Start your project', to: '/contact' }}
      />
    </>
  );
}
