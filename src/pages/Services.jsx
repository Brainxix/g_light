import CTASection from '../components/CTASection.jsx';

const SERVICES = [
  {
    tag: '01',
    title: 'Home appliance installation',
    description: 'Safe, code-compliant hookup for the appliances that draw the most power in a home.',
    items: ['Cookers, ovens & hobs', 'Water heaters', 'Air conditioning units', 'Washing machines & dryers'],
  },
  {
    tag: '02',
    title: 'Interior decoration',
    description: 'Lighting and electrical work planned alongside your interior design, not bolted on after the fact.',
    items: ['Recessed & accent lighting', 'Switch and outlet placement for a finished look', 'Coordinating with your designer or contractor'],
  },
  {
    tag: '03',
    title: 'Full conduit wiring',
    description: 'Complete conduit runs for new builds — fully concealed, built to last, and inspected before sign-off.',
    items: ['New construction wiring', 'Whole-property rewires', 'Concealed runs through walls and ceilings'],
  },
  {
    tag: '04',
    title: 'Half conduit wiring',
    description: 'Partial conduit wiring for renovations and rooms being upgraded in stages, without disturbing the rest of the property.',
    items: ['Single-room or single-floor upgrades', 'Staged renovations', 'Extensions to existing conduit runs'],
  },
  {
    tag: '05',
    title: 'Maintenance & more',
    description: 'Routine electrical maintenance, repairs, and anything else electrical that comes up.',
    items: ['Fault finding & repairs', 'Scheduled maintenance visits', 'Any other electrical work — just ask'],
  },
];

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">What we do</div>
        <h1>Services</h1>
        <p>From a single appliance hookup to a full conduit rewire, every job is quoted upfront and finished to code.</p>
      </section>

      <section className="service-detail-list">
        {SERVICES.map((service) => (
          <div className="service-detail" key={service.tag}>
            <div className="tag">{service.tag}</div>
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <CTASection
        heading="Need one of these done?"
        body="Tell us what you need and we'll get back to you with a quote."
        buttonLabel="Request a quote"
        to="/contact"
      />
    </>
  );
}