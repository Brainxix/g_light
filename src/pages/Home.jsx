import ServiceCard from '../components/ServiceCard.jsx';
import StatBar from '../components/StatBar.jsx';
import TestimonialCard from '../components/TestimonialCard.jsx';
import CTASection from '../components/CTASection.jsx';
import logo from '../assets/g-light-logo.png';

const SERVICES = [
  { title: 'Home appliance installation', description: 'Safe hookup and wiring for cookers, water heaters, AC units, and more.', to: '/services' },
  { title: 'Interior decoration', description: 'Lighting and electrical planned alongside your interior design.', to: '/services' },
  { title: 'Conduit wiring', description: 'Full or half conduit runs for new builds and renovations.', to: '/services' },
  { title: 'Maintenance & more', description: 'Routine electrical maintenance, repairs, and any other job.', to: '/services' },
  { title: 'Solar installation & maintenance', description: 'Solar panel setup, wiring, and ongoing servicing.', to: '/solar', highlight: true },
];

const STATS = [
  { value: '18+ yrs', label: 'in the field' },
  { value: '2,400+', label: 'jobs completed' },
  { value: '4.9★', label: 'average rating' },
  { value: '<2 hrs', label: 'emergency response' },
];

const TESTIMONIALS = [
  { quote: 'They rewired our whole kitchen in a day and left it spotless.', name: 'Amaka O.' },
  { quote: 'Solar install was smooth from quote to sign-off. No surprises.', name: 'Tunde F.' },
  { quote: 'Fast response on an emergency call — showed up within the hour.', name: 'Grace E.' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="eyebrow">Licensed &amp; insured electricians</div>
            <h1>Wiring done right, <span className="glow">power</span> you can trust.</h1>
            <p className="lead">
              G-Light Electrical handles everything from appliance installs and interior
              lighting to full conduit wiring and solar — scheduled fast, finished clean.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn-primary">Request a callback</a>
              <a href="#services" className="btn-ghost">See our services</a>
            </div>
            <div className="trust-row">
              <div><strong>18+ yrs</strong>in the field</div>
              <div><strong>4.9★</strong>average rating</div>
              <div><strong>24/7</strong>emergency line</div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="bulb-card">
              <img src={logo} alt="G-Light Electrical" className="bulb-card-logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <h2>What we handle</h2>
            <p>From single-room fixes to full solar installs, every job is inspected and left tidy.</p>
          </div>
          <div className="service-grid">
            {SERVICES.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <StatBar stats={STATS} />
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>What clients say</h2></div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to get your power sorted?"
        body="Call or send a request — we'll get back to you within the hour."
        buttonLabel="Contact us"
        to="/contact"
      />
    </>
  );
}
