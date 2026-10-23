import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { API_BASE } from '../api.js';
import { CONTACT } from '../content.js';

// Values must match ContactSubmission.SERVICE_CHOICES in the backend
// until the backend is updated for the new capability list.
// Values must match the choices in the backend (contact/models.py).
const SERVICE_OPTIONS = [
  { value: 'electrical', label: 'Electrical Engineering' },
  { value: 'solar', label: 'Solar Energy' },
  { value: 'power-systems', label: 'Power Systems' },
  { value: 'commercial-industrial', label: 'Commercial & Industrial' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'consulting', label: 'Energy Consulting' },
  { value: 'other', label: 'Other / not sure' },
];

const BUDGET_OPTIONS = [
  { value: 'under_1m', label: 'Under ₦1 million' },
  { value: '1_5m', label: '₦1 – 5 million' },
  { value: '5_20m', label: '₦5 – 20 million' },
  { value: '20m_plus', label: 'Over ₦20 million' },
  { value: 'unsure', label: 'Not sure yet' },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1_3_months', label: 'Within 1–3 months' },
  { value: '3_6_months', label: 'In 3–6 months' },
  { value: 'planning', label: 'Still planning' },
];

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  size: '',
  budget: '',
  timeline: '',
  message: '',
  website: '', // honeypot: real visitors never see this field
};

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState(EMPTY);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="page-hero wrap">
        <h1>Start a project</h1>
        <p>Tell us what you're building and we'll get back to you.</p>
        <span className="pulse-line" aria-hidden="true" />
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }}>
        <Reveal>
        <div className="contact-grid">
          {status === 'sent' ? (
            <div className="notice">Thanks — your request has been sent. We'll be in touch shortly.</div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="notice error">Something went wrong sending your request. Please try again.</div>
              )}
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="service">Type of project</label>
                <select id="service" name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Select…</option>
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="location">Project location</label>
                <input id="location" name="location" type="text" placeholder="e.g. Yenagoa, Bayelsa" value={form.location} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label htmlFor="size">Rough size</label>
                <input id="size" name="size" type="text" placeholder="e.g. 4-bedroom house, 10 kW solar, 3-floor hotel" value={form.size} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label htmlFor="budget">Budget (optional)</label>
                <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                  <option value="">Select…</option>
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="timeline">When do you need it?</label>
                <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange}>
                  <option value="">Select…</option>
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="message">Project details</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} required />
              </div>
              <input
                className="hp-field"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send request'}
              </button>
            </form>
          )}

          <aside className="contact-aside">
            <h2>Talk to us directly</h2>
            <ul className="contact-methods">
              <li>
                <span>WhatsApp</span>
                <a className="btn btn-whatsapp" href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <span>Phone</span>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
            </ul>
            <h2 className="aside-sub">What to include</h2>
            <ul>
              <li>Where the project is located</li>
              <li>The type and rough size of the building or system</li>
              <li>What you want to achieve</li>
              <li>Your preferred timeline</li>
            </ul>
          </aside>
        </div>
        </Reveal>
      </section>
    </>
  );
}
