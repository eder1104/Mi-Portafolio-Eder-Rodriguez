import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Hero.css';

// Typewriter strings are now fetched from i18n
// we will load them dynamically in the component

function useTypewriter(strings, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx]             = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = strings[idx % strings.length];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (!deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }

    if (!deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % strings.length);
    }
  }, [charIdx, deleting, idx, strings, speed, pause]);

  useEffect(() => {
    setDisplayed(strings[idx % strings.length].slice(0, charIdx));
  }, [charIdx, idx, strings]);

  return displayed;
}

export default function Hero() {
  const { t } = useTranslation();
  const typedStrings = t('hero.typed', { returnObjects: true });
  const typed = useTypewriter(typedStrings);

  return (
    <section id="hero" className="hero" aria-label="Presentación">
      {/* Decorative particles */}
      <div className="hero__particles" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`particle particle--${i + 1}`} />
        ))}
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <p className="hero__greeting animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <span>⚡</span> {t('hero.greeting')}
          </p>

          <h1 className="hero__name animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Eder
            <span className="hero__name-accent"> Rodriguez</span>
          </h1>

          <div className="hero__typewriter animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <span className="hero__typed">{typed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </div>

          <p className="hero__bio animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Trans i18nKey="hero.bio">
              {t('hero.bio1')}<strong>PHP/Laravel</strong>{t('hero.bio2')}<strong>APIs REST</strong>{t('hero.bio3')}<strong>React</strong>{t('hero.bio4')}<strong>Vue.js</strong>{t('hero.bio5')}<span className="hero__location">📍 San Gil, Colombia</span>.
            </Trans>
          </p>

          <div className="hero__actions animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <a href="#projects" className="btn btn-primary" id="hero-cta-projects">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>
              </svg>
              {t('hero.exploreProjects')}
            </a>
            <a href="#contact" className="btn btn-secondary" id="hero-cta-contact">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {t('hero.professionalContact')}
            </a>
            <a
              href="https://github.com/eder1104"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              id="hero-cta-github"
              aria-label="Perfil de GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>

          {/* Stats Row */}
          <div className="hero__stats animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="hero__stat">
              <span className="hero__stat-number">2+</span>
              <span className="hero__stat-label">{t('hero.stats.yearsExp')}</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-number">10+</span>
              <span className="hero__stat-label">{t('hero.stats.projects')}</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-number">B2</span>
              <span className="hero__stat-label">{t('hero.stats.english')}</span>
            </div>
          </div>
        </div>

        {/* Avatar / Code Window */}
        <div className="hero__visual animate-fadeInUp animate-float" style={{ animationDelay: '0.4s' }}>
          <div className="hero__code-window">
            <div className="hero__code-header">
              <span className="hero__dot hero__dot--red" />
              <span className="hero__dot hero__dot--yellow" />
              <span className="hero__dot hero__dot--green" />
              <span className="hero__code-filename">eder.dev</span>
            </div>
            <pre className="hero__code-body"><code>{`const developer = {
  name: "Eder Rodriguez",
  role: ${t('hero.code.role')},
  location: ${t('hero.code.location')},
  stack: {
    backend:  ["PHP", "Laravel", "Python"],
    frontend: ["React", "Vue.js", "JS"],
    database: ["MySQL", "MongoDB"],
    cloud:    ["Render", "Railway"]
  },
  openToWork: true,
  english: "B2"
};`}</code></pre>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="hero__scroll-indicator" aria-label="Ir a Sobre Mí">
        <span className="hero__scroll-text">{t('hero.scroll')}</span>
        <span className="hero__scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
