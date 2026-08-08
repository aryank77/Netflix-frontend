import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import "./Settings.css";

const STORAGE_KEY = "app_settings";

const defaultSettings = {
  autoplayNext: true,
  autoplayPreviews: true,
  emailNotifications: true,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function Settings() {
  const [settings, setSettings] = useState(loadSettings);

  const toggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    toast.success("Setting saved.");
  };

  const settingItems = [
    {
      key: "autoplayNext",
      title: "Autoplay next episode",
      description: "Automatically play the next episode in a series.",
    },
    {
      key: "autoplayPreviews",
      title: "Autoplay previews",
      description: "Play previews while browsing on this device.",
    },
    {
      key: "emailNotifications",
      title: "Email notifications",
      description: "Receive emails about new releases and recommendations.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="settings-page">
        <h1>Settings</h1>

        <div className="settings-list">
          {settingItems.map((item) => (
            <div className="settings-item" key={item.key}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <button
                className={`settings-toggle ${settings[item.key] ? "on" : ""}`}
                role="switch"
                aria-checked={settings[item.key]}
                aria-label={`Toggle ${item.title}`}
                onClick={() => toggle(item.key)}
              >
                <span className="settings-toggle-knob" />
              </button>
            </div>
          ))}
        </div>

        <p className="settings-language-hint">
          Want to change your display language? You can do that from the{" "}
          <Link to="/">language selector in the footer</Link>.
        </p>
      </div>
    </>
  );
}

export default Settings;
