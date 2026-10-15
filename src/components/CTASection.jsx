import { Link } from 'react-router-dom';

export default function CTASection({ heading, body, primary, secondary }) {
  return (
    <section className="wrap cta-wrap">
      <div className="cta">
        <h2>{heading}</h2>
        <p>{body}</p>
        <div className="cta-actions">
          <Link to={primary.to} className="btn btn-primary">
            {primary.label}
          </Link>
          {secondary && (
            <Link to={secondary.to} className="btn btn-outline">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
