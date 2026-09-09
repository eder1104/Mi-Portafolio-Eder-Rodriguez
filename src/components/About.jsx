import { useTranslation, Trans } from 'react-i18next';
import './About.css';



export default function About() {
  const { t } = useTranslation();
  const EXPERIENCE = t('about.experience.jobs', { returnObjects: true });
  const EDUCATION = t('about.education.items', { returnObjects: true });
  // Add icons that are not translatable directly to the objects
  const educationWithIcons = EDUCATION.map((edu, i) => ({
    ...edu,
    icon: i === 0 ? '🎓' : '🏫'
  }));

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('about.tag')}</span>
          <h2 className="section-title" id="about-title">{t('about.title')}</h2>
          <p className="section-subtitle">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="about__grid">
          {/* Bio Card */}
          <div className="glass-card about__bio-card">
            <div className="about__avatar-wrapper">
              <div className="about__avatar">
                <span className="about__avatar-initials">ER</span>
                <span className="about__avatar-ring" aria-hidden="true" />
              </div>
              <div className="about__available-badge">
                <span className="about__available-dot" aria-hidden="true" />
                {t('about.available')}
              </div>
            </div>

            <div className="about__bio-text">
              <h3 className="about__name">Eder Rodriguez</h3>
              <p className="about__role">{t('about.role')}</p>
              <p className="about__description">
                <Trans i18nKey="about.desc1">
                  Ingeniero de Software graduado con experiencia demostrable en producción.
                  Especializado en arquitectura backend con <strong>PHP/Laravel</strong>, construcción de <strong>APIs RESTful</strong> seguras (Passport &amp; Sanctum),
                  y desarrollo frontend moderno con <strong>React</strong> y <strong>Vue.js</strong>.
                </Trans>
              </p>
              <p className="about__description">
                <Trans i18nKey="about.desc2">
                  Actualmente enfocado en estándares de <strong>calidad de software, auditoría e ISO</strong>.
                  Nivel de inglés <strong>B2</strong> — capacidad de comunicación efectiva en entornos técnicos globales.
                </Trans>
              </p>

              <div className="about__info-pills">
                <span className="about__pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  San Gil, Santander, Colombia
                </span>
                <span className="about__pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ederyairdev@gmail.com
                </span>
                <span className="about__pill">
                  🇬🇧 {t('about.englishLevel')}
                </span>
              </div>
            </div>
          </div>

          {/* Experience & Education */}
          <div className="about__timeline-col">
            {/* Experience */}
            <div className="about__timeline-section">
              <h3 className="about__timeline-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                {t('about.experience.title')}
              </h3>
              <div className="about__timeline">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className={`about__timeline-item ${exp.type === 'current' ? 'about__timeline-item--current' : ''}`}>
                    <div className="about__timeline-dot" aria-hidden="true" />
                    <div className="about__timeline-content">
                      <div className="about__timeline-header">
                        <h4 className="about__timeline-role">{exp.role}</h4>
                        {i === 0 && (
                          <span className="badge badge-primary">{t('about.experience.current')}</span>
                        )}
                      </div>
                      <p className="about__timeline-company">{exp.company}</p>
                      <p className="about__timeline-period">{exp.period}</p>
                      <p className="about__timeline-desc">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="about__timeline-section">
              <h3 className="about__timeline-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                {t('about.education.title')}
              </h3>
              <div className="about__edu-list">
                {educationWithIcons.map((edu, i) => (
                  <div key={i} className="about__edu-item glass-card">
                    <span className="about__edu-icon" aria-hidden="true">{edu.icon}</span>
                    <div>
                      <h4 className="about__edu-degree">{edu.degree}</h4>
                      <p className="about__edu-institution">{edu.institution}</p>
                      <p className="about__edu-period">{edu.period}</p>
                      <p className="about__edu-detail">{edu.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
