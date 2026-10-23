import Reveal from '../components/Reveal.jsx';
import CapIcon from '../components/CapIcon.jsx';
import CTASection from '../components/CTASection.jsx';
import { CAPABILITIES } from '../content.js';

export default function Capabilities() {
  return (
    <>
      <section className="page-hero wrap">
        <h1>What we engineer</h1>
        <p>Electrical engineering, solar energy and power systems, designed to keep homes, businesses and critical infrastructure running.</p>
      </section>

      <section className="wrap cap-detail-list">
        {CAPABILITIES.map((c) => (
          <Reveal key={c.slug}>
            <article id={c.slug} className={`cap-detail${c.accent === 'amber' ? ' is-solar' : ''}`}>
              <div>
                <CapIcon slug={c.slug} />
                <h2>{c.title}</h2>
              </div>
              <div>
                <p>{c.long}</p>
                <ul className="cap-items">
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <CTASection
        heading="Not sure what you need?"
        body="Describe the project and we'll help work out the right system."
        primary={{ label: 'Start a project', to: '/contact' }}
      />
    </>
  );
}
