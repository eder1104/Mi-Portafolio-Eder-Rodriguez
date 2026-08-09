import { useState, useCallback } from 'react';
import './IFrameViewer.css';

/**
 * IFrameViewer — monta el iframe SOLO cuando `isActive` es true (lazy loading).
 * Muestra spinner mientras carga y maneja el estado de error/sin-demo.
 *
 * @param {string|null} src     URL del homepage del repo
 * @param {boolean}     isActive  true cuando el modal está abierto
 * @param {string}      title   Nombre del repo (para accesibilidad)
 */
export default function IFrameViewer({ src, isActive, title }) {
  const [loaded, setLoaded]   = useState(false);
  const [errored, setErrored] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => {
    setLoaded(true);
    setErrored(true);
  }, []);

  // No hay demo disponible
  if (!src) {
    return (
      <div className="iframe-viewer iframe-viewer--no-demo" role="status">
        <div className="iframe-viewer__no-demo-content">
          <span className="iframe-viewer__no-demo-icon" aria-hidden="true">🚀</span>
          <h3 className="iframe-viewer__no-demo-title">Demo no disponible aún</h3>
          <p className="iframe-viewer__no-demo-desc">
            Este proyecto aún no está desplegado en producción.<br />
            Puedes ver el código fuente en GitHub.
          </p>
          <div className="iframe-viewer__no-demo-steps">
            <p className="iframe-viewer__no-demo-steps-title">Para activar la demo:</p>
            <ol>
              <li>Despliega el proyecto en <strong>Render</strong> u otro proveedor</li>
              <li>Agrega la URL en <code>About → Website</code> en tu repo de GitHub</li>
              <li>El portafolio la detectará automáticamente 🎉</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="iframe-viewer" role="region" aria-label={`Vista previa de ${title}`}>
      {/* Spinner — visible mientras carga */}
      {isActive && !loaded && (
        <div className="iframe-viewer__loader" aria-live="polite" aria-label="Cargando aplicación...">
          <div className="spinner" aria-hidden="true" />
          <p className="iframe-viewer__loader-text">Cargando aplicación...</p>
          <p className="iframe-viewer__loader-note">
            Si el servidor estaba inactivo, puede tardar hasta 30 segundos
          </p>
        </div>
      )}

      {/* Error fallback */}
      {errored && (
        <div className="iframe-viewer__error" role="alert">
          <span aria-hidden="true">⚠️</span>
          <p>No se pudo cargar la vista previa.</p>
          <p className="iframe-viewer__error-note">
            Puede que el sitio no permita incrustación (X-Frame-Options).
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Abrir en nueva pestaña ↗
          </a>
        </div>
      )}

      {/* IFRAME — se monta SOLO cuando isActive=true (lazy) */}
      {isActive && !errored && (
        <iframe
          src={src}
          title={`Vista previa: ${title}`}
          className={`iframe-viewer__frame ${loaded ? 'iframe-viewer__frame--loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}
