/**
 * portfolioController.js
 * Capa de lógica de negocio — orquesta servicios y aplica reglas de filtrado.
 * No contiene lógica de UI ni llamadas directas a la API.
 */

import { fetchUserRepos } from '../services/githubService';
import { getCache, setCache } from '../services/cacheService';

const PORTFOLIO_TOPICS = ['portfolio', 'portafolio']; // acepta español e inglés
const EXCLUDE_TOPICS  = ['draft', 'ignore', 'wip'];
const CACHE_KEY_PREFIX = 'portfolio_repos_';
const CACHE_TTL_MS     = 5 * 60 * 1000; // 5 minutos

/**
 * Lenguajes con colores para los badges de tecnología.
 */
export const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  PHP:        '#8892bf',
  Python:     '#3776ab',
  Blade:      '#f05340',
  Vue:        '#42b883',
  React:      '#61dafb',
  HTML:       '#e34f26',
  CSS:        '#264de4',
  Java:       '#007396',
  default:    '#8b949e',
};

/**
 * Determina si un repositorio debe mostrarse en el portafolio.
 * Reglas:
 *   ✅ No es fork
 *   ✅ Tiene el topic 'portfolio'
 *   ❌ No tiene topics de exclusión (draft, ignore, wip)
 *
 * @param {Object} repo  Objeto raw de la GitHub API
 * @returns {boolean}
 */
export function shouldShowRepo(repo) {
  if (repo.fork) return false;
  const topics = repo.topics || [];
  if (!PORTFOLIO_TOPICS.some((t) => topics.includes(t))) return false;
  if (EXCLUDE_TOPICS.some((t) => topics.includes(t))) return false;
  return true;
}

/**
 * Verifica si un repositorio tiene una demo en vivo disponible.
 * @param {Object} repo
 * @returns {boolean}
 */
export function hasLiveDemo(repo) {
  return Boolean(repo.homepage && repo.homepage.trim().length > 0);
}

/**
 * Normaliza y extrae los campos necesarios de un repo crudo de la API.
 * @param {Object} repo
 * @returns {Object}
 */
export function formatRepoData(repo) {
  return {
    id:          repo.id,
    name:        repo.name,
    fullName:    repo.full_name,
    description: repo.description || 'Sin descripción disponible.',
    url:         repo.html_url,
    homepage:    repo.homepage?.trim() || null,
    topics:      repo.topics || [],
    language:    repo.language || null,
    stars:       repo.stargazers_count,
    forks:       repo.forks_count,
    updatedAt:   repo.updated_at,
    createdAt:   repo.created_at,
    hasDemo:     hasLiveDemo(repo),
    langColor:   LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default,
  };
}

/**
 * Obtiene los repositorios filtrados para mostrar en el portafolio.
 * Aplica cache para evitar requests repetidos en la misma sesión.
 *
 * @param {string} username  GitHub username
 * @returns {Promise<Object[]>}  Array de repos formateados
 */
export async function getPortfolioRepos(username) {
  const cacheKey = `${CACHE_KEY_PREFIX}${username}`;

  // Intentar desde cache
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch desde la API
  const rawRepos = await fetchUserRepos(username);

  // Filtrar y formatear
  const portfolioRepos = rawRepos
    .filter(shouldShowRepo)
    .map(formatRepoData);

  // Guardar en cache
  setCache(cacheKey, portfolioRepos, CACHE_TTL_MS);

  return portfolioRepos;
}

/**
 * Obtiene todos los repositorios públicos del usuario (sin filtrar por topic).
 * Útil para mostrar el conteo total en el perfil.
 * @param {string} username
 * @returns {Promise<number>}
 */
export async function getTotalPublicRepos(username) {
  const cacheKey = `portfolio_total_${username}`;
  const cached = getCache(cacheKey);
  if (cached !== null) return cached;

  const rawRepos = await fetchUserRepos(username);
  const total = rawRepos.filter((r) => !r.fork).length;

  setCache(cacheKey, total, CACHE_TTL_MS);
  return total;
}
