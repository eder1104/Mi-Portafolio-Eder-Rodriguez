/**
 * useGitHubRepos.js
 * Custom hook — gestiona estado de carga, error y datos de repos del portafolio.
 */

import { useState, useEffect, useCallback } from 'react';
import { getPortfolioRepos } from '../controllers/portfolioController';
import { clearAllPortfolioCache } from '../services/cacheService';

const GITHUB_USERNAME = 'eder1104';

/**
 * @returns {{
 *   repos: Object[],
 *   loading: boolean,
 *   error: string|null,
 *   refresh: () => void,
 *   lastFetched: Date|null
 * }}
 */
export function useGitHubRepos() {
  const [repos, setRepos]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const load = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      if (forceRefresh) {
        clearAllPortfolioCache();
      }

      const data = await getPortfolioRepos(GITHUB_USERNAME);
      setRepos(data);
      setLastFetched(new Date());
    } catch (err) {
      console.error('[useGitHubRepos]', err);
      setError(err.message || 'Error al cargar los repositorios.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(() => load(true), [load]);

  return { repos, loading, error, refresh, lastFetched };
}
