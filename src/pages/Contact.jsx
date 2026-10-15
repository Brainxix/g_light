import { useState } from 'react';
import { API_BASE } from '../api.js';

// Values must match ContactSubmission.SERVICE_CHOICES in the backend
// until the backend is updated for the new capability list.
const SERVICE_OPTIONS = [
  { value: 'appliance', label: 'Home appliance installation' },
  { value: 'interior', label: 'Interior decoration' },
  { value: 'solar', label: 'Solar installation & maintenance' },
  { value: 'conduit_full', label: 'Full conduit wiring' },
  { value: 'conduit_half', label: 'Half conduit wiring' },
  { value: 'maintenance', label: 'Maintenance / other' },
];

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });

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
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }}>
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
                <label htmlFor="message">Project details</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send request'}
              </button>
            </form>
          )}

          <aside className="contact-aside">
            <h2>What to include</h2>
            <ul>
              <li>Where the project is located</li>
              <li>The type and rough size of the building or system</li>
              <li>What you want to achieve</li>
              <li>Your preferred timeline</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
