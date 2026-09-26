import CTASection from '../components/CTASection.jsx';

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">About us</div>
        <h1>Who we are</h1>
        <p>Licensed electricians who've been keeping homes and businesses powered for years.</p>
      </section>

      <section className="about-grid">
        <div>
          <h2>Our story</h2>
          <p>
            G-Light Electrical started as a small team of licensed electricians and has
            grown into a full-service electrical contractor — handling everything from a
            single appliance install to full property rewires and solar systems.
          </p>
          <p>
            We still run the business the way we started it: flat quotes before any work
            begins, no upselling, and a job that's genuinely finished — inspected, tested,
            and cleaned up — before we call it done.
          </p>
        </div>
        <div className="credential-list">
          <h3>Licensing & credentials</h3>
          <ul>
            <li>Fully licensed & insured electricians</li>
            <li>Code-compliant installations, inspected and signed off</li>
            <li>18+ years combined field experience</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-head wrap">
          <h2>Service area</h2>
          <p>We take on residential and commercial jobs across the local area — get in touch to confirm we cover your location.</p>
        </div>
      </section>

      <CTASection
        heading="Want to work with us?"
        body="Reach out and tell us what you need — we'll take it from there."
        buttonLabel="Contact us"
        to="/contact"
      />
    </>
  );
}