import { useEffect, useCallback } from 'react';
import IFrameViewer from './IFrameViewer';
import './ProjectModal.css';

/**
 * ProjectModal — overlay con IFrameViewer para preview del proyecto.
 * El IFrame se monta SOLO cuando isOpen=true (lazy loading).
 */
export default function ProjectModal({ repo, isOpen, onClose }) {
  // Cerrar con Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!repo) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`modal-overlay ${isOpen ? 'modal-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`modal ${isOpen ? 'modal--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Vista previa: ${repo.name}`}
      >
        {/* Header */}
        <div className="modal__header">
          <div className="modal__header-left">
            {/* Dots decoration */}
            <span className="modal__dot modal__dot--red" aria-hidden="true" />
            <span className="modal__dot modal__dot--yellow" aria-hidden="true" />
            <span className="modal__dot modal__dot--green" aria-hidden="true" />
            <div className="modal__title-group">
              <h2 className="modal__title">{repo.name}</h2>
              {repo.language && (
                <span
                  className="modal__lang-badge"
                  style={{ '--lang-color': repo.langColor }}
                >
                  <span className="modal__lang-dot" aria-hidden="true" />
                  {repo.language}
                </span>
              )}
            </div>
          </div>

          <div className="modal__header-actions">
            {/* Open in new tab */}
            {repo.hasDemo && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary modal__open-btn"
                id={`modal-open-${repo.id}`}
                aria-label="Abrir demo en nueva pestaña"
                title="Abrir en nueva pestaña"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Abrir ↗
              </a>
            )}

            {/* GitHub link */}
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost modal__github-btn"
              id={`modal-github-${repo.id}`}
              aria-label="Ver código en GitHub"
              title="Ver en GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>

            {/* Close */}
            <button
              className="modal__close-btn"
              onClick={onClose}
              id={`modal-close-${repo.id}`}
              aria-label="Cerrar modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Description & Topics */}
        <div className="modal__meta">
          <p className="modal__description">{repo.description}</p>
          <div className="modal__topics">
            {repo.topics.filter(t => t !== 'portfolio').map((topic) => (
              <span key={topic} className="badge badge-neutral">{topic}</span>
            ))}
          </div>
        </div>

        {/* IFrame — lazy mounted */}
        <div className="modal__iframe-container">
          <IFrameViewer
            src={repo.homepage}
            isActive={isOpen}
            title={repo.name}
          />
        </div>
      </div>
    </>
  );
}
