// Lightweight, localStorage-backed "watch history" tracker.
// The project doesn't have a backend viewing-history table, so this keeps
// a per-user history client-side, keyed by the logged-in user's email.
// It's used to power: the Watch History page, "Continue Watching" and
// "Recently Watched" on the Profile Dashboard, and favorite-genre stats.

const HISTORY_PREFIX = "watch_history_";
const MAX_HISTORY_ITEMS = 50;

function getCurrentUserKey() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return `${HISTORY_PREFIX}${user?.email || "guest"}`;
}

/** Returns the full watch history, most recent first. */
export function getWatchHistory() {
  try {
    const raw = localStorage.getItem(getCurrentUserKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Records that a movie/show was viewed (called when MovieDetails loads).
 * De-duplicates by moving an existing entry to the front instead of
 * creating a second record, and caps the list length.
 */
export function logWatch(movie) {
  if (!movie?.id) return;

  const history = getWatchHistory();
  const existingIndex = history.findIndex((m) => m.id === movie.id);

  const entry = {
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    genres: movie.genres?.map((g) => g.name) || [],
    watchedAt: new Date().toISOString(),
  };

  if (existingIndex !== -1) history.splice(existingIndex, 1);
  history.unshift(entry);

  const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(getCurrentUserKey(), JSON.stringify(trimmed));
  return trimmed;
}

/** Clears the current user's watch history. */
export function clearWatchHistory() {
  localStorage.removeItem(getCurrentUserKey());
}

/**
 * Aggregates genre names across watch history into counts, sorted
 * descending, for the "Favorite Genres" dashboard section.
 */
export function getFavoriteGenres(history = getWatchHistory()) {
  const counts = {};
  history.forEach((item) => {
    (item.genres || []).forEach((genre) => {
      counts[genre] = (counts[genre] || 0) + 1;
    });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([genre, count]) => ({ genre, count }));
}
