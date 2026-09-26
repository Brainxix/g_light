import CTASection from '../components/CTASection.jsx';

const INCLUDED = [
  { title: 'Installation', description: 'Panel setup, mounting, and wiring sized to your property and power needs, installed to code.' },
  { title: 'Maintenance', description: 'Ongoing servicing to keep your system performing — inspections, cleaning, and fault repairs.' },
];

const PROCESS = [
  { step: '1', title: 'Site assessment', description: 'We look at your roof, power usage, and budget to size the right system.' },
  { step: '2', title: 'Proposal & quote', description: 'A flat, written quote covering equipment, installation, and timeline.' },
  { step: '3', title: 'Installation', description: 'Panels, inverter, and wiring installed by licensed electricians.' },
  { step: '4', title: 'Inspection & handover', description: 'System tested, signed off, and explained before we leave.' },
];

const FAQS = [
  { q: 'How long does installation take?', a: 'Most residential systems are installed within 1–3 days, depending on system size and roof access.' },
  { q: 'Do you handle maintenance after installation?', a: 'Yes — ongoing maintenance is part of what we offer, not a separate provider.' },
  { q: 'What happens if something goes wrong with the system?', a: 'Call us directly — as the installer, we handle fault diagnosis and repairs for systems we\u2019ve put in.' },
];

export default function Solar() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Solar</div>
        <h1>Solar installation & maintenance</h1>
        <p>From first assessment to a system that just keeps running — installed and maintained by the same team.</p>
      </section>

      <section className="included-grid">
        {INCLUDED.map((item) => (
          <div className="included-card" key={item.title}>
            <div className="icon" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-head wrap"><h2>How it works</h2></div>
        <div className="process-list">
          {PROCESS.map((p) => (
            <div className="process-item" key={p.step}>
              <div className="step">{p.step}</div>
              <div>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head wrap"><h2>Common questions</h2></div>
        <div className="faq-list">
          {FAQS.map((item) => (
            <div className="faq-item" key={item.q}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Thinking about going solar?"
        body="Tell us about your property and we'll put together a quote."
        buttonLabel="Request a quote"
        to="/contact"
      />
    </>
  );
}