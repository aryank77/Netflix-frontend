import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./InfoPage.css";
import "./CookiePreferences.css";

const STORAGE_KEY = "cookie_preferences";

const defaultPrefs = {
  essential: true, // always on, cannot be disabled
  performance: true,
  functional: true,
  targeting: false,
};

// Read any saved preferences synchronously so the UI reflects the user's
// last choice on the very first render, instead of updating state inside
// a useEffect (which would cause an extra re-render).
function loadSavedPrefs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultPrefs;
  try {
    return { ...defaultPrefs, ...JSON.parse(saved) };
  } catch {
    // Ignore malformed saved data and fall back to defaults.
    return defaultPrefs;
  }
}

function CookiePreferences() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState(loadSavedPrefs);

  const toggle = (key) => {
    if (key === "essential") return; // essential cookies can't be turned off
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    toast.success("Cookie preferences saved.");
  };

  const cookieCategories = [
    {
      key: "essential",
      title: "Essential",
      description:
        "Required for the site to function, such as keeping you signed in. These cannot be disabled.",
    },
    {
      key: "performance",
      title: "Performance",
      description:
        "Help us understand how the app is used so we can improve loading times and reliability.",
    },
    {
      key: "functional",
      title: "Functional",
      description:
        "Remember choices you make, like your preferred language, to personalize your experience.",
    },
    {
      key: "targeting",
      title: "Targeting",
      description:
        "Used to show more relevant recommendations based on your viewing activity.",
    },
  ];

  return (
    <div className="info-page">
      <div className="info-page-header">
        <div className="info-page-header-inner">
          <span
            className="info-logo"
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            aria-label="Go to Netflix home"
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            NETFLIX
          </span>
        </div>
      </div>

      <div className="info-page-container">
        <h1 className="info-title">Cookie Preferences</h1>
        <p className="info-subtitle">
          Manage how we use cookies to improve your experience. Your choices
          are saved on this device.
        </p>

        <div className="cookie-list">
          {cookieCategories.map((cat) => (
            <div className="cookie-item" key={cat.key}>
              <div className="cookie-item-text">
                <h2 className="info-heading">{cat.title}</h2>
                <p className="info-paragraph">{cat.description}</p>
              </div>

              <button
                className={`cookie-toggle ${prefs[cat.key] ? "on" : "off"} ${
                  cat.key === "essential" ? "disabled" : ""
                }`}
                role="switch"
                aria-checked={prefs[cat.key]}
                aria-label={`Toggle ${cat.title} cookies`}
                onClick={() => toggle(cat.key)}
                disabled={cat.key === "essential"}
              >
                <span className="cookie-toggle-knob" />
              </button>
            </div>
          ))}
        </div>

        <button className="contact-submit-btn cookie-save-btn" onClick={savePreferences}>
          Save Preferences
        </button>

        <div style={{ marginTop: 20 }}>
          <Link to="/" className="info-back-link" aria-label="Back to Home">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CookiePreferences;
