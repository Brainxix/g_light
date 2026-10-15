import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import mark from '../assets/g-light-mark.png';
import { BRAND, NAV_ITEMS } from '../content.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
          <img className="brand-mark" src={mark} alt="" />
          <span className="brand-text">
            <span className="brand-name">{BRAND.name}</span>
            <span className="brand-sub">{BRAND.descriptor}</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary btn-sm header-cta">
          Start a project
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav id="mobile-menu" className={`mobile-menu${open ? ' open' : ''}`} aria-label="Mobile">
        {NAV_ITEMS.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
        <Link to="/contact" className="btn btn-primary" style={{ marginTop: 16 }}>
          Start a project
        </Link>
      </nav>
    </header>
  );
}
