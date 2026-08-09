import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Inicio',     href: '#hero' },
  { label: 'Sobre Mí',  href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#hero" className="navbar__logo" onClick={closeMenu} aria-label="Inicio">
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-name">Eder</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary navbar__cta"
          aria-label="Ir a sección de contacto"
        >
          Contactar
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} role="dialog" aria-modal="true">
        <ul role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.slice(1) ? 'navbar__mobile-link--active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={closeMenu}>
              Contactar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
