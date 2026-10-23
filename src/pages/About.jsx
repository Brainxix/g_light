import Reveal from '../components/Reveal.jsx';
import Principles from '../components/Principles.jsx';
import CTASection from '../components/CTASection.jsx';
import { BRAND } from '../content.js';

export default function About() {
  return (
    <>
      <section className="page-hero wrap">
        <h1>{BRAND.tagline}</h1>
        <p>G-LIGHT is an electrical and energy solutions company combining engineering, renewable energy and technical expertise.</p>
      </section>

      <Reveal>
        <section className="section wrap about-grid">
          <div>
            <h2>Who we are</h2>
            <div className="prose">
              <p>G-LIGHT delivers electrical engineering, solar energy and power solutions for homes, businesses and critical infrastructure.</p>
              <p>We approach every installation as an engineering problem: understand the load, design the system, build it properly and keep it performing.</p>
            </div>
          </div>
          <div>
            <h2>Where we're going</h2>
            <div className="prose">
              <p>From Nigeria, we are starting at home, with the ambition to serve more markets as we grow.</p>
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

      <CTASection
        heading="Let's engineer it."
        body="Tell us about your project."
        primary={{ label: 'Start your project', to: '/contact' }}
      />
    </>
  );
}
