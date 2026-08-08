// Lightweight, localStorage-backed notifications system. There is no
// backend notifications table/websocket in this project, so notifications
// are generated client-side: seeded once from real TMDB data (new
// releases / trending / upcoming) plus genuine app events (e.g. adding a
// title to My List triggers a real notification, not a fake one).

const NOTIF_PREFIX = "notifications_";
const MAX_NOTIFICATIONS = 30;

function getCurrentUserKey() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return `${NOTIF_PREFIX}${user?.email || "guest"}`;
}

export function getNotifications() {
  try {
    const raw = localStorage.getItem(getCurrentUserKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotifications(list) {
  const trimmed = list.slice(0, MAX_NOTIFICATIONS);
  localStorage.setItem(getCurrentUserKey(), JSON.stringify(trimmed));
  // Let any mounted NotificationBell (in this tab) know to re-read state,
  // since components don't share a store — this keeps the badge in sync
  // immediately after actions like "added to My List" from other pages.
  window.dispatchEvent(new Event("notifications-updated"));
  return trimmed;
}

/**
 * Adds a new notification to the top of the list.
 * @param {{type: string, title: string, message: string, movieId?: number|string}} notif
 */
export function addNotification(notif) {
  const list = getNotifications();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    read: false,
    createdAt: new Date().toISOString(),
    ...notif,
  };
  return saveNotifications([entry, ...list]);
}

export function markAsRead(id) {
  const list = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  return saveNotifications(list);
}

export function markAllAsRead() {
  const list = getNotifications().map((n) => ({ ...n, read: true }));
  return saveNotifications(list);
}

export function getUnreadCount(list = getNotifications()) {
  return list.filter((n) => !n.read).length;
}

/**
 * Seeds the notification list the first time it's empty, using real movie
 * titles passed in from TMDB (trending/upcoming/new releases) plus a
 * couple of static, genuinely-app-relevant reminders. Safe to call on
 * every mount — it's a no-op if notifications already exist.
 */
export function seedNotificationsIfEmpty({ trending = [], upcoming = [] }) {
  const existing = getNotifications();
  if (existing.length > 0) return existing;

  const seeded = [];

  trending.slice(0, 2).forEach((movie) => {
    seeded.push({
      id: `seed-trending-${movie.id}`,
      type: "trending",
      title: "Trending Now",
      message: `${movie.title || movie.name} is trending this week.`,
      movieId: movie.id,
      read: false,
      createdAt: new Date().toISOString(),
    });
  });

  upcoming.slice(0, 2).forEach((movie) => {
    seeded.push({
      id: `seed-upcoming-${movie.id}`,
      type: "upcoming",
      title: "Coming Soon",
      message: `${movie.title || movie.name} arrives soon. Don't miss it.`,
      movieId: movie.id,
      read: false,
      createdAt: new Date().toISOString(),
    });
  });

  seeded.push({
    id: "seed-continue-watching",
    type: "continue_watching",
    title: "Continue Watching",
    message: "You have titles waiting in your Watch History — pick up where you left off.",
    read: false,
    createdAt: new Date().toISOString(),
  });

  return saveNotifications(seeded);
}
