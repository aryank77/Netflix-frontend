// Recent searches, capped and de-duplicated, stored per browser (not
// per-user, matching how most streaming apps keep search history local
// to the device rather than syncing it server-side).

const STORAGE_KEY = "recent_searches";
const MAX_RECENT = 10;

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return getRecentSearches();

  const existing = getRecentSearches().filter(
    (q) => q.toLowerCase() !== trimmedQuery.toLowerCase()
  );

  const updated = [trimmedQuery, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearRecentSearches() {
  localStorage.removeItem(STORAGE_KEY);
}
