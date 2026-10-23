import { Link } from 'react-router-dom';
import mark from '../assets/g-light-mark.png';
import { BRAND, NAV_ITEMS, CAPABILITIES, CONTACT } from '../content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
              <img className="brand-mark" src={mark} alt="" />
              <span className="brand-text">
                <span className="brand-name">{BRAND.name}</span>
                <span className="brand-sub">{BRAND.descriptor}</span>
              </span>
            </Link>
            <p className="footer-tag">{BRAND.tagline}</p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {NAV_ITEMS.filter((i) => i.to !== '/').map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">Start a project</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Capabilities</h4>
            <ul>
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <Link to={`/capabilities#${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>Email us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>&copy; {new Date().getFullYear()} {BRAND.name}</span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
