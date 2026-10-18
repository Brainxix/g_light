import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import HeroScene from '../components/HeroScene.jsx';
import ProjectRow from '../components/ProjectRow.jsx';
import Principles from '../components/Principles.jsx';
import CountUp from '../components/CountUp.jsx';
import Circuit from '../components/Circuit.jsx';
import CapIcon from '../components/CapIcon.jsx';
import CTASection from '../components/CTASection.jsx';
import { HERO, STATEMENT, CAPABILITIES, FEATURED_PROJECTS, METRICS, HOME_CTA } from '../content.js';

export default function Home() {
  // Hero artwork drifts slightly against the pointer.
  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--px', x.toFixed(3));
    e.currentTarget.style.setProperty('--py', y.toFixed(3));
  };

  return (
    <>
      <section className="hero" onPointerMove={onHeroMove}>
        <HeroScene />
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>
              {HERO.headline.map((line, i) => (
                <span className="line" key={line}>
                  <span style={{ animationDelay: `${0.25 + i * 0.18}s` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="lead">{HERO.lead}</p>
            <div className="hero-actions">
              <Link to={HERO.primary.to} className="btn btn-primary">{HERO.primary.label}</Link>
              <Link to={HERO.secondary.to} className="btn btn-outline">{HERO.secondary.label}</Link>
            </div>
            <ul className="hero-areas">
              {HERO.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="statement">
          <div className="wrap statement-grid">
            <div>
              <h2>{STATEMENT.heading}</h2>
              <p className="statement-close">{STATEMENT.close}</p>
              <p className="statement-body">{STATEMENT.body}</p>
            </div>
            <ul className="statement-lines">
              {STATEMENT.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Circuit />

      <Reveal>
        <section className="section wrap">
          <div className="section-head">
            <h2>What we engineer</h2>
          </div>
          <div className="cap-grid">
            {CAPABILITIES.map((c) => (
              <Link
                key={c.slug}
                to={`/capabilities#${c.slug}`}
                className={`cap${c.accent === 'amber' ? ' is-solar' : ''}`}
              >
                <CapIcon slug={c.slug} />
                <h3>{c.title}</h3>
                <p>{c.short}</p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section wrap">
          <div className="section-head">
            <h2>Engineered in the field</h2>
            <p>Real projects. Real systems. Real performance.</p>
          </div>
          <div className="proj-list">
            {FEATURED_PROJECTS.map((p) => (
              <ProjectRow key={p.name} {...p} />
            ))}
          </div>
          <div className="proj-foot">
            <Link to="/projects" className="text-link">View all projects →</Link>
          </div>
        </section>
      </Reveal>

      <Circuit />

      <Reveal>
        <section className="metrics">
          <div className="wrap metrics-inner">
            <div className="section-head">
              <h2>{METRICS.heading}</h2>
            </div>
            <div className="metric-grid">
              {METRICS.items.map((m) => (
                <div className="metric" key={m.label}>
                  <strong><CountUp value={m.value} /></strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section wrap">
          <div className="section-head">
            <h2>Why G-LIGHT</h2>
          </div>
          <Principles />
        </section>
      </Reveal>

      <Reveal>
        <CTASection {...HOME_CTA} />
      </Reveal>
    </>
  );
}
