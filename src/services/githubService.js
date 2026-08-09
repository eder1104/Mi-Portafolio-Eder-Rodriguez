/**
 * githubService.js
 * Capa de acceso a datos — GitHub REST API
 * Maneja fetch de repositorios y topics del usuario.
 */

const BASE_URL = 'https://api.github.com';

/**
 * Fetch de repositorios públicos del usuario.
 * @param {string} username
 * @param {number} perPage
 * @returns {Promise<Array>}
 */
export async function fetchUserRepos(username, perPage = 100) {
  const url = `${BASE_URL}/users/${username}/repos?sort=updated&per_page=${perPage}&type=public`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `GitHub API error: ${response.status} — ${errorData.message || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Fetch de los topics de un repositorio específico.
 * Usa la API de previews de GitHub que devuelve topics actualizados.
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<string[]>}
 */
export async function fetchRepoTopics(owner, repo) {
  const url = `${BASE_URL}/repos/${owner}/${repo}/topics`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.mercy-preview+json',
    },
  });

  if (!response.ok) {
    console.warn(`No se pudieron obtener topics para ${owner}/${repo}`);
    return [];
  }

  const data = await response.json();
  return data.names || [];
}

/**
 * Fetch del perfil público del usuario.
 * @param {string} username
 * @returns {Promise<Object>}
 */
export async function fetchUserProfile(username) {
  const url = `${BASE_URL}/users/${username}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo obtener el perfil de ${username}`);
  }

  return response.json();
}
