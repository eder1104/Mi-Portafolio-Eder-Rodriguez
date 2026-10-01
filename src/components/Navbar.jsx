import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const NAV_LINKS = [
  { key: 'inicio',     href: '#hero' },
  { key: 'sobreMi',  href: '#about' },
  { key: 'skills',    href: '#skills' },
  { key: 'proyectos', href: '#projects' },
  { key: 'contacto',  href: '#contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [cvOpen, setCvOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const cvDropdownRef = useRef(null);

  const isEn = i18n.language && i18n.language.startsWith('en');

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(e.target)) {
        setCvOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setCvOpen(false);
  };

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
                {t(`navbar.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        {/* CV Download Dropdown */}
        <div className="navbar__cv-dropdown" ref={cvDropdownRef}>
          <button
            type="button"
            className="btn btn-secondary navbar__cv-btn"
            onClick={() => setCvOpen((prev) => !prev)}
            aria-expanded={cvOpen}
            aria-haspopup="true"
            aria-label={isEn ? 'Download CV' : 'Descargar CV'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{isEn ? 'Download CV' : 'Descargar CV'}</span>
            <svg
              className={`navbar__cv-chevron ${cvOpen ? 'navbar__cv-chevron--open' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {cvOpen && (
            <div className="navbar__cv-menu glass-card" role="menu">
              <a
                href="/Eder_Rodriguez_CV_Profesional_ES_30-09-2026.pdf"
                download="Eder_Rodriguez_CV_ES.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__cv-item"
                role="menuitem"
                onClick={() => setCvOpen(false)}
              >
                <img src="https://flagcdn.com/es.svg" alt="Español" className="navbar__cv-flag" />
                <div className="navbar__cv-item-text">
                  <span className="navbar__cv-item-title">Español</span>
                  <span className="navbar__cv-item-sub">PDF · ES</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
              <a
                href="/Eder_Rodriguez_CV_Professional_30-09-2026.pdf"
                download="Eder_Rodriguez_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__cv-item"
                role="menuitem"
                onClick={() => setCvOpen(false)}
              >
                <img src="https://flagcdn.com/us.svg" alt="English" className="navbar__cv-flag" />
                <div className="navbar__cv-item-text">
                  <span className="navbar__cv-item-title">English</span>
                  <span className="navbar__cv-item-sub">PDF · EN</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <button
          className="btn btn-ghost navbar__lang-btn"
          onClick={() => i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')}
          aria-label="Cambiar idioma"
          title="Cambiar idioma"
          style={{ padding: '0.4rem', marginRight: '0.8rem', background: 'transparent', display: 'flex', alignItems: 'center' }}
        >
          <img 
            src={i18n.language.startsWith('es') ? 'https://flagcdn.com/us.svg' : 'https://flagcdn.com/es.svg'} 
            alt={i18n.language.startsWith('es') ? 'English' : 'Español'}
            style={{ width: '24px', borderRadius: '2px', boxShadow: '0 0 3px rgba(0,0,0,0.3)' }}
          />
        </button>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary navbar__cta"
          aria-label="Ir a sección de contacto"
        >
          {t('navbar.contactar')}
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
                {t(`navbar.${link.key}`)}
              </a>
            </li>
          ))}
          {/* Mobile CV Download */}
          <li className="navbar__mobile-cv-section">
            <span className="navbar__mobile-cv-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {isEn ? 'Download CV' : 'Descargar CV'}
            </span>
            <div className="navbar__mobile-cv-grid">
              <a
                href="/Eder_Rodriguez_CV_Profesional_ES_30-09-2026.pdf"
                download="Eder_Rodriguez_CV_ES.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary navbar__mobile-cv-btn"
                onClick={closeMenu}
              >
                <img src="https://flagcdn.com/es.svg" alt="Español" style={{ width: '18px', borderRadius: '2px' }} />
                <span>Español</span>
              </a>
              <a
                href="/Eder_Rodriguez_CV_Professional_30-09-2026.pdf"
                download="Eder_Rodriguez_CV_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary navbar__mobile-cv-btn"
                onClick={closeMenu}
              >
                <img src="https://flagcdn.com/us.svg" alt="English" style={{ width: '18px', borderRadius: '2px' }} />
                <span>English</span>
              </a>
            </div>
          </li>

          <li>
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es');
                  closeMenu();
                }}
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <img 
                  src={i18n.language.startsWith('es') ? 'https://flagcdn.com/us.svg' : 'https://flagcdn.com/es.svg'} 
                  alt={i18n.language.startsWith('es') ? 'English' : 'Español'}
                  style={{ width: '24px', borderRadius: '2px' }}
                />
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  {i18n.language.startsWith('es') ? 'EN' : 'ES'}
                </span>
              </button>
              <a href="#contact" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={closeMenu}>
                {t('navbar.contactar')}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
