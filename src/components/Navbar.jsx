import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/g-light-logo.png';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Solar', to: '/solar' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-logo">
            <img src={logo} alt="G-Light Electrical" />
          </span>
        </Link>
        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={pathname === item.to ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="nav-cta">
          Get a quote
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`mobile-menu${open ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link to="/contact" onClick={() => setOpen(false)}>
          Get a quote
        </Link>
      </nav>
    </header>
  );
}
