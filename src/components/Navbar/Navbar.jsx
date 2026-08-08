import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import {
  FaUserEdit,
  FaUserCircle,
  FaList,
  FaHistory,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCreditCard,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationBell from "../NotificationBell/NotificationBell";

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Profile menu open/close
  const [showMenu, setShowMenu] = useState(false);

  // Navbar show/hide
  const [showNavbar, setShowNavbar] = useState(true);

  // Previous scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef(null);

  // LocalStorage se user ki details lo
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scroll Down
        setShowNavbar(false);
      } else {
        // Scroll Up
        setShowNavbar(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Close the profile menu on outside click or Escape — better keyboard/UX behavior.
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setShowMenu(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "User";

  // Profile dropdown links, per the required Netflix-style menu.
  const menuLinks = [
    { icon: <FaUserEdit aria-hidden="true" />, label: t("profile_manage"), path: "/manage-profile" },
    { icon: <FaUserCircle aria-hidden="true" />, label: t("profile_account"), path: "/account" },
    { icon: <FaList aria-hidden="true" />, label: t("profile_mylist"), path: "/my-list" },
    { icon: <FaHistory aria-hidden="true" />, label: t("profile_history"), path: "/watch-history" },
    { icon: <FaCreditCard aria-hidden="true" />, label: "Plans & Pricing", path: "/plans" },
    { icon: <FaCog aria-hidden="true" />, label: t("profile_settings"), path: "/settings" },
    { icon: <FaQuestionCircle aria-hidden="true" />, label: t("profile_help"), path: "/help-center" },
  ];

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>

      {/* Navbar Left */}
      <div className="navbar-left">

        <h1 className="logo">NETFLIX</h1>

        <div className="nav-links">
          <Link to="/">{t("nav_home")}</Link>
          <Link to="/tv">{t("nav_tv")}</Link>
          <Link to="/movies">{t("nav_movies")}</Link>
          <Link to="/new-popular">{t("nav_new")}</Link>
          <Link to="/my-list">{t("nav_mylist")}</Link>
        </div>

      </div>

      {/* Navbar Right */}
      <div className="navbar-right">

        <button
          className="nav-icon-btn"
          onClick={() => navigate("/search")}
          aria-label={t("search_placeholder")}
        >
          <FaSearch className="nav-icon" />
        </button>

        <NotificationBell />

        <div className="profile" ref={menuRef}>
          <div
            className="profile-trigger"
            onClick={() => setShowMenu(!showMenu)}
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={showMenu}
            aria-label="Open profile menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowMenu(!showMenu);
              }
            }}
          >
            <img
              className="profile-img"
              src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
              alt=""
            />

            <span className="profile-name">{displayName}</span>

            <FiChevronDown className="arrow" />
          </div>

          {showMenu && (
            <div className="profile-menu" role="menu">

              <div className="menu-user">

                <img
                  className="menu-avatar"
                  src={user?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                  alt=""
                />

                <div className="menu-info">
                  <h4>{displayName}</h4>

                  <p className="profile-email">
                    {user?.email}
                  </p>
                </div>

              </div>

              <ul className="menu-links">
                {menuLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      role="menuitem"
                      onClick={() => setShowMenu(false)}
                    >
                      <span className="menu-link-icon">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                className="logout-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
              >
                <FaSignOutAlt aria-hidden="true" style={{ marginRight: 8 }} />
                {t("profile_logout")}
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
