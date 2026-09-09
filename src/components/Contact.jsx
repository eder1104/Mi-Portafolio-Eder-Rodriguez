import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

// CONTACT_LINKS moved inside the component to use translations

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const CONTACT_LINKS = [
    {
      id: 'contact-email',
      label: t('contact.links.email'),
      value: 'ederyairdev@gmail.com',
      href: 'mailto:ederyairdev@gmail.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      color: 'primary',
    },
    {
      id: 'contact-github',
      label: t('contact.links.github'),
      value: 'github.com/eder1104',
      href: 'https://github.com/eder1104',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      color: 'accent',
    },
    {
      id: 'contact-location',
      label: t('contact.links.location'),
      value: 'San Gil, Santander, Colombia',
      href: 'https://maps.google.com/?q=San+Gil+Santander+Colombia',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      color: 'primary',
    },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ederyairdev@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback sin soporte clipboard
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="section-title" id="contact-title">{t('contact.title')}</h2>
          <p className="section-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="contact__grid">
          {/* CTA Card */}
          <div className="glass-card contact__cta-card">
            <div className="contact__cta-glow" aria-hidden="true" />
            <div className="contact__cta-content">
              <span className="contact__cta-emoji" aria-hidden="true">💼</span>
              <h3 className="contact__cta-title">{t('contact.cta.title')}</h3>
              <p className="contact__cta-desc">
                {t('contact.cta.desc')}
              </p>
              <div className="contact__cta-actions">
                <a
                  href="mailto:ederyairdev@gmail.com"
                  className="btn btn-primary"
                  id="contact-email-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {t('contact.cta.sendMessage')}
                </a>
                <button
                  className="btn btn-secondary"
                  onClick={handleCopyEmail}
                  id="contact-copy-btn"
                  aria-label={copied ? 'Email copiado' : 'Copiar email'}
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {t('contact.cta.copied')}
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      {t('contact.cta.copyEmail')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Links */}
          <div className="contact__links">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`glass-card contact__link-card contact__link-card--${link.color}`}
                id={link.id}
                aria-label={`${link.label}: ${link.value}`}
              >
                <span className="contact__link-icon">{link.icon}</span>
                <div className="contact__link-text">
                  <span className="contact__link-label">{link.label}</span>
                  <span className="contact__link-value">{link.value}</span>
                </div>
                <svg className="contact__link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <p className="contact__footer-text">
          {t('contact.footer.designedBy')}{' '}
          <a href="https://github.com/eder1104" target="_blank" rel="noopener noreferrer" className="link-hover">
            Eder Rodriguez
          </a>{' '}
          · {t('contact.footer.role')}
        </p>
        <p className="contact__footer-copy">
          © {new Date().getFullYear()} Eder Rodriguez. {t('contact.footer.rights')}
        </p>
      </div>
    </section>
  );
}
