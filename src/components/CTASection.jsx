import { Link } from 'react-router-dom';

export default function CTASection({ heading, body, buttonLabel = 'Contact us', to = '/contact' }) {
  return (
    <section className="cta-banner">
      <h2>{heading}</h2>
      <p>{body}</p>
      <Link to={to} className="btn-primary">{buttonLabel}</Link>
    </section>
  );
}