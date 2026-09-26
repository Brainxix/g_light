import { useState } from 'react';

const SERVICE_OPTIONS = [
  'Home appliance installation',
  'Interior decoration',
  'Solar installation & maintenance',
  'Full conduit wiring',
  'Half conduit wiring',
  'Maintenance / other',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // No backend yet — replace with a real fetch/POST (Formspree or Django)
    // before calling setSubmitted(true).
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-hero">
        <div className="eyebrow">Get in touch</div>
        <h1>Contact</h1>
        <p>Tell us what you need and we'll get back to you with a quote.</p>
      </section>

      <div className="contact-grid">
        {submitted ? (
          <div className="contact-success">
            Thanks — your request has been noted. We'll get back to you shortly.
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="form-row">
              <label htmlFor="service">Service needed</label>
              <select id="service" name="service" defaultValue="">
                <option value="" disabled>Select a service</option>
                {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button type="submit" className="btn-primary">Send request</button>
          </form>
        )}

        <div className="contact-info">
          <div className="contact-info-block">
            <h3>Phone</h3>
            <p>(555) 016-4420</p>
          </div>
          <div className="contact-info-block">
            <h3>Hours</h3>
            <p>Mon–Sat, 7am–7pm</p>
          </div>
          <div className="contact-info-block">
            <h3>Service area</h3>
            <p>Residential and commercial jobs across the local area.</p>
          </div>
        </div>
      </div>
    </>
  );
}