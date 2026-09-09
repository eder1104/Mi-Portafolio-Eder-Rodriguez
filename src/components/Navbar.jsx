import { useState, useEffect } from 'react';
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
                {t(`navbar.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

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
