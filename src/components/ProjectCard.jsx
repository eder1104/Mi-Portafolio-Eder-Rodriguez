import { useState, useCallback, useRef } from 'react';
import './ProjectCard.css';

const HOVER_DEBOUNCE_MS = 600;

/**
 * ProjectCard — tarjeta de proyecto con:
 *  - Click para abrir el modal con iFrame
 *  - Hover sostenido (debounce) como alternativa al clic
 *  - Datos extraídos del controlador (formatRepoData)
 */
export default function ProjectCard({ repo, onOpenModal }) {
  const [hovered, setHovered] = useState(false);
  const hoverTimer = useRef(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    // Hover sostenido: abre el modal tras HOVER_DEBOUNCE_MS sin mover el cursor
    hoverTimer.current = setTimeout(() => {
      onOpenModal(repo);
    }, HOVER_DEBOUNCE_MS);
  }, [repo, onOpenModal]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    clearTimeout(hoverTimer.current);
  }, []);

  const handleClick = useCallback(() => {
    clearTimeout(hoverTimer.current);
    onOpenModal(repo);
  }, [repo, onOpenModal]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenModal(repo);
    }
  }, [repo, onOpenModal]);

  const visibleTopics = repo.topics
    .filter((t) => t !== 'portfolio')
    .slice(0, 4);

  return (
    <article
      className={`project-card glass-card ${hovered ? 'project-card--hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver proyecto: ${repo.name}`}
      id={`project-card-${repo.id}`}
    >
      {/* Header */}
      <div className="project-card__header">
        <div className="project-card__header-left">
          <div className="project-card__icon-wrapper">
            <svg className="project-card__folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>

          {/* Demo indicator */}
          <div className={`project-card__demo-badge ${repo.hasDemo ? 'project-card__demo-badge--active' : ''}`}>
            {repo.hasDemo ? (
              <>
                <span className="project-card__demo-dot" aria-hidden="true" />
                Live Demo
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Sin demo
              </>
            )}
          </div>
        </div>

        <div className="project-card__actions">
          {/* GitHub link */}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__action-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Ver código de ${repo.name} en GitHub`}
            title="Ver en GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>

          {/* External link */}
          {repo.hasDemo && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__action-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Abrir demo de ${repo.name}`}
              title="Abrir demo"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="project-card__body">
        <h3 className="project-card__name">{repo.name}</h3>
        <p className="project-card__description">{repo.description}</p>
      </div>

      {/* Footer */}
      <div className="project-card__footer">
        {/* Topics */}
        <div className="project-card__topics">
          {visibleTopics.map((topic) => (
            <span key={topic} className="badge badge-neutral">{topic}</span>
          ))}
        </div>

        {/* Language */}
        <div className="project-card__meta">
          {repo.language && (
            <span className="project-card__lang">
              <span
                className="project-card__lang-dot"
                style={{ background: repo.langColor }}
                aria-hidden="true"
              />
              {repo.language}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="project-card__stars" aria-label={`${repo.stars} estrellas`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              {repo.stars}
            </span>
          )}
        </div>
      </div>

      {/* Hover hint */}
      <div className="project-card__hint" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        Click para preview
      </div>
    </article>
  );
}
