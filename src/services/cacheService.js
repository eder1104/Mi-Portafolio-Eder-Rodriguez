/**
 * cacheService.js
 * Cache en localStorage con TTL configurable.
 * Evita requests repetidos a la GitHub API.
 */

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * Guarda un valor en cache.
 * @param {string} key
 * @param {*} value
 * @param {number} ttl  Time-to-live en milisegundos
 */
export function setCache(key, value, ttl = DEFAULT_TTL_MS) {
  const entry = {
    value,
    expiresAt: Date.now() + ttl,
  };
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (err) {
    // localStorage puede estar lleno o deshabilitado — no bloquear la app
    console.warn('[cacheService] No se pudo guardar en cache:', err.message);
  }
}

/**
 * Lee un valor del cache si no ha expirado.
 * @param {string} key
 * @returns {*|null}  null si expiró o no existe
 */
export function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const entry = JSON.parse(raw);

    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.value;
  } catch {
    return null;
  }
}

/**
 * Invalida una entrada de cache.
 * @param {string} key
 */
export function clearCache(key) {
  localStorage.removeItem(key);
}

/**
 * Limpia todo el cache del portafolio (prefijado con 'portfolio_').
 */
export function clearAllPortfolioCache() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith('portfolio_'))
    .forEach((k) => localStorage.removeItem(k));
}
