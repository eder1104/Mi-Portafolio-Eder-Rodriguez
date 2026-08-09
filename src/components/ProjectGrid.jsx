import { useState, useCallback } from 'react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './ProjectGrid.css';

const GITHUB_USERNAME = 'eder1104';

function SkeletonCard() {
  return (
    <div className="project-skeleton glass-card" aria-hidden="true">
      <div className="project-skeleton__header">
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 8 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          <div className="skeleton" style={{ width: 32, height: 32, borderRadius: 6 }} />
          <div className="skeleton" style={{ width: 32, height: 32, borderRadius: 6 }} />
        </div>
      </div>
      <div className="skeleton" style={{ height: 20, width: '70%' }} />
      <div className="skeleton" style={{ height: 14, width: '90%' }} />
      <div className="skeleton" style={{ height: 14, width: '60%' }} />
      <div className="project-skeleton__footer">
        <div className="skeleton" style={{ height: 20, width: 60, borderRadius: 99 }} />
        <div className="skeleton" style={{ height: 14, width: 50 }} />
      </div>
    </div>
  );
}

function EmptyState({ onRefresh }) {
  return (
    <div className="project-grid__empty" role="status" aria-live="polite">
      <div className="project-grid__empty-icon" aria-hidden="true">🗂️</div>
      <h3 className="project-grid__empty-title">Sin proyectos en el portafolio aún</h3>
      <p className="project-grid__empty-desc">
        Para que un repositorio aparezca aquí, agrega el topic{' '}
        <code>portfolio</code> en GitHub.
      </p>
      <div className="project-grid__empty-steps">
        <p className="project-grid__empty-step-title">¿Cómo hacerlo? 👇</p>
        <ol>
          <li>Abre tu repo en <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="link-hover">github.com/{GITHUB_USERNAME}</a></li>
          <li>Haz clic en ⚙️ (ícono junto a <em>About</em>) → <strong>Topics</strong></li>
          <li>Escribe <code>portfolio</code> y guarda</li>
          <li>Recarga este portafolio y aparecerá automáticamente 🎉</li>
        </ol>
      </div>
      <button
        className="btn btn-secondary"
        onClick={onRefresh}
        id="projects-refresh-btn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
        </svg>
        Verificar ahora
      </button>
    </div>
  );
}

function ErrorState({ error, onRefresh }) {
  return (
    <div className="project-grid__error" role="alert">
      <span aria-hidden="true">⚠️</span>
      <p>{error}</p>
      <button className="btn btn-secondary" onClick={onRefresh} id="projects-retry-btn">
        Reintentar
      </button>
    </div>
  );
}

export default function ProjectGrid() {
  const { repos, loading, error, refresh, lastFetched } = useGitHubRepos();
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [modalOpen, setModalOpen]       = useState(false);
  const [filter, setFilter]             = useState('all');

  const handleOpenModal = useCallback((repo) => {
    setSelectedRepo(repo);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    // Mantén selectedRepo para la animación de salida del modal
    setTimeout(() => setSelectedRepo(null), 350);
  }, []);

  // Extraer todos los lenguajes presentes
  const availableLangs = ['all', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = filter === 'all'
    ? repos
    : repos.filter((r) => r.language === filter);

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// mis_proyectos</span>
          <h2 className="section-title" id="projects-title">Proyectos</h2>
          <p className="section-subtitle">
            Sincronizado con GitHub API — repos con topic{' '}
            <code className="projects__topic-code">portfolio</code>{' '}o{' '}
            <code className="projects__topic-code">portafolio</code>
          </p>
        </div>

        {/* Filter Bar + Actions */}
        <div className="projects__toolbar">
          <div className="projects__filters" role="group" aria-label="Filtrar por lenguaje">
            {availableLangs.map((lang) => (
              <button
                key={lang}
                className={`projects__filter-btn ${filter === lang ? 'projects__filter-btn--active' : ''}`}
                onClick={() => setFilter(lang)}
                id={`filter-${lang}`}
              >
                {lang === 'all' ? 'Todos' : lang}
              </button>
            ))}
          </div>

          <div className="projects__actions">
            {lastFetched && (
              <span className="projects__last-fetched" aria-live="polite">
                Actualizado {lastFetched.toLocaleTimeString()}
              </span>
            )}
            <button
              className="btn btn-ghost projects__refresh-btn"
              onClick={refresh}
              id="projects-force-refresh-btn"
              aria-label="Forzar recarga desde GitHub"
              title="Refrescar desde GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              Sincronizar
            </button>
          </div>
        </div>

        {/* Repo Count */}
        {!loading && !error && repos.length > 0 && (
          <p className="projects__count" aria-live="polite">
            {filteredRepos.length} proyecto{filteredRepos.length !== 1 ? 's' : ''} encontrado{filteredRepos.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="project-grid project-grid--loading" aria-label="Cargando proyectos..." role="status">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && error && <ErrorState error={error} onRefresh={refresh} />}

        {!loading && !error && repos.length === 0 && <EmptyState onRefresh={refresh} />}

        {!loading && !error && repos.length > 0 && filteredRepos.length === 0 && (
          <div className="project-grid__empty" role="status">
            <p>No hay proyectos en <strong>{filter}</strong> aún.</p>
            <button className="btn btn-ghost" onClick={() => setFilter('all')}>Ver todos</button>
          </div>
        )}

        {!loading && !error && filteredRepos.length > 0 && (
          <div className="project-grid" role="list" aria-label="Lista de proyectos">
            {filteredRepos.map((repo, i) => (
              <div key={repo.id} role="listitem" style={{ animationDelay: `${i * 0.08}s` }} className="project-grid__item">
                <ProjectCard repo={repo} onOpenModal={handleOpenModal} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal — portado fuera del grid para no interferir con el layout */}
      <ProjectModal
        repo={selectedRepo}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
