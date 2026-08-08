import { useEffect, useRef, useState, useCallback } from "react";
import { FaBell, FaFire, FaClock, FaPlus, FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../services/api";
import requests from "../../services/requests";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  seedNotificationsIfEmpty,
} from "../../utils/notifications";
import "./NotificationBell.css";

// Small icon per notification type — purely visual, keeps the dropdown
// scannable at a glance.
const TYPE_ICONS = {
  trending: <FaFire aria-hidden="true" />,
  upcoming: <FaFilm aria-hidden="true" />,
  new_release: <FaFilm aria-hidden="true" />,
  added_to_list: <FaPlus aria-hidden="true" />,
  continue_watching: <FaClock aria-hidden="true" />,
};

function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NotificationBell() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => getNotifications());
  const containerRef = useRef(null);

  const refresh = useCallback(() => {
    setNotifications(getNotifications());
  }, []);

  // Seed real content once (trending + upcoming from TMDB) if the user has
  // no notifications yet, then keep in sync with any changes fired from
  // elsewhere in the app (e.g. MovieDetails adding to My List).
  useEffect(() => {
    async function seed() {
      if (getNotifications().length > 0) return;
      try {
        const [trendingRes, upcomingRes] = await Promise.all([
          api.get(requests.trending),
          api.get(requests.upcoming),
        ]);
        seedNotificationsIfEmpty({
          trending: trendingRes.data.results || [],
          upcoming: upcomingRes.data.results || [],
        });
        refresh();
      } catch (err) {
        console.error("Failed to seed notifications:", err);
      }
    }

    seed();
    window.addEventListener("notifications-updated", refresh);
    return () => window.removeEventListener("notifications-updated", refresh);
  }, [refresh]);

  // Close the dropdown on outside click or Escape for good keyboard/UX behavior.
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const unreadCount = getUnreadCount(notifications);

  const handleItemClick = (notif) => {
    markAsRead(notif.id);
    refresh();
    if (notif.movieId) {
      navigate(`/movie/${notif.movieId}`);
      setOpen(false);
    }
  };

  const handleMarkAllRead = (e) => {
    e.stopPropagation();
    markAllAsRead();
    refresh();
  };

  return (
    <div className="notif-container" ref={containerRef}>
      <button
        className="nav-icon-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`${t("notif_title")}${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <FaBell className="nav-icon" />
        {unreadCount > 0 && (
          <span className="notif-badge" aria-hidden="true">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown" role="menu" aria-label={t("notif_title")}>
          <div className="notif-header">
            <h3>{t("notif_title")}</h3>
            {notifications.length > 0 && (
              <button className="notif-mark-all" onClick={handleMarkAllRead}>
                {t("notif_mark_all")}
              </button>
            )}
          </div>

          <div className="notif-list">
            {notifications.length === 0 ? (
              <p className="notif-empty">{t("notif_empty")}</p>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  className={`notif-item ${notif.read ? "" : "unread"}`}
                  onClick={() => handleItemClick(notif)}
                  role="menuitem"
                >
                  <span className="notif-icon">
                    {TYPE_ICONS[notif.type] || <FaBell aria-hidden="true" />}
                  </span>
                  <span className="notif-text">
                    <span className="notif-title-text">{notif.title}</span>
                    <span className="notif-message">{notif.message}</span>
                    <span className="notif-time">{timeAgo(notif.createdAt)}</span>
                  </span>
                  {!notif.read && <span className="notif-dot" aria-hidden="true" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
