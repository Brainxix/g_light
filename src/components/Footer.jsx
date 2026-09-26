import { Link } from 'react-router-dom';
import logo from '../assets/g-light-logo.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="brand">
          <span className="brand-logo">
            <img src={logo} alt="G-Light Electrical" />
          </span>
        </Link>
        <div className="footer-links">
          <span>Licensed &amp; insured</span>
          <span>Mon–Sat, 7am–7pm</span>
          <Link to="/contact">Contact us</Link>
          <span>© 2026 G-Light Electrical</span>
        </div>
      </div>
    </footer>
  );
}