import { useTranslation } from 'react-i18next';
import './Skills.css';

// SKILL_CATEGORIES will be localized inside the component

const TECH_BADGES = [
  { name: 'PHP', emoji: '🐘' },
  { name: 'Laravel', emoji: '🔴' },
  { name: 'React', emoji: '⚛️' },
  { name: 'Vue.js', emoji: '💚' },
  { name: 'JavaScript', emoji: '🟡' },
  { name: 'Python', emoji: '🐍' },
  { name: 'MySQL', emoji: '🐬' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'Git', emoji: '📦' },
  { name: 'REST APIs', emoji: '🔗' },
  { name: 'HTML5', emoji: '🧱' },
  { name: 'CSS3', emoji: '🎨' },
];

export default function Skills() {
  const { t } = useTranslation();

  const SKILL_CATEGORIES = [
    {
      title: t('skills.categories.backend'),
      icon: '⚙️',
      color: 'primary',
      skills: [
        { name: 'PHP', level: 90 },
        { name: 'Laravel', level: 88 },
        { name: 'Python', level: 65 },
        { name: 'API REST', level: 92 },
        { name: 'Sanctum / Passport', level: 80 },
      ],
    },
    {
      title: t('skills.categories.frontend'),
      icon: '🎨',
      color: 'accent',
      skills: [
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 78 },
        { name: 'Vue.js', level: 75 },
        { name: 'HTML5 & CSS3', level: 90 },
      ],
    },
    {
      title: t('skills.categories.database'),
      icon: '🗄️',
      color: 'primary',
      skills: [
        { name: 'MySQL', level: 85 },
        { name: 'SQLite', level: 72 },
        { name: 'MongoDB', level: 60 },
      ],
    },
    {
      title: t('skills.categories.tools'),
      icon: '🛠️',
      color: 'accent',
      skills: [
        { name: 'Git & GitHub', level: 82 },
        { name: 'Render / Railway', level: 70 },
        { name: 'Inglés B2', level: 75 },
        { name: 'ISO / Auditoría', level: 60 },
      ],
    },
  ];

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('skills.tag')}</span>
          <h2 className="section-title" id="skills-title">{t('skills.title')}</h2>
          <p className="section-subtitle">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Tech Badge Wall */}
        <div className="skills__badge-wall" aria-label="Tecnologías">
          {TECH_BADGES.map((tech) => (
            <span key={tech.name} className="skills__tech-badge">
              <span aria-hidden="true">{tech.emoji}</span>
              {tech.name}
            </span>
          ))}
        </div>

        {/* Skill Categories */}
        <div className="skills__grid">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className={`glass-card skills__category skills__category--${cat.color}`}>
              <div className="skills__category-header">
                <span className="skills__category-icon" aria-hidden="true">{cat.icon}</span>
                <h3 className="skills__category-title">{cat.title}</h3>
              </div>
              <ul className="skills__list" role="list">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="skills__item">
                    <div className="skills__item-header">
                      <span className="skills__item-name">{skill.name}</span>
                      <span className="skills__item-level">{skill.level}%</span>
                    </div>
                    <div className="skills__bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100" aria-label={`${skill.name}: ${skill.level}%`}>
                      <div
                        className="skills__bar-fill"
                        style={{ '--target-width': `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
