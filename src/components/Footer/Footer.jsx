import { useState } from "react";
import "./Footer.css";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "../../i18n";

// Each footer link now points to a real route instead of "#".
// "Gift Card Terms" has no dedicated feature in this project, so it's
// pointed at Terms of Use (the closest real page) rather than left dead.
const exploreLinks = [
  { label: "Plans & Pricing", path: "/plans" },
  { label: "Help Center", path: "/help-center" },
  { label: "Account", path: "/account" },
  { label: "Ways to Watch", path: "/ways-to-watch" },
  { label: "Only on Netflix", path: "/only-on-netflix" },
];
const legalLinks = [
  { label: "Cookie Preferences", path: "/cookie-preferences" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Use", path: "/terms-of-use" },
  { label: "Gift Card Terms", path: "/terms-of-use" },
  { label: "Legal Notices", path: "/legal-notices" },
  { label: "Corporate Information", path: "/corporate-information" },
];
const supportLinks = [
  { label: "FAQ", path: "/faq" },
  { label: "Speed Test", path: "/speed-test" },
  { label: "Contact Us", path: "/contact-us" },
  { label: "Jobs", path: "/jobs" },
  { label: "Media Center", path: "/media-center" },
  { label: "Investor Relations", path: "/investor-relations" },
];

// All 20 languages requested, shown with their native names — same pattern
// Netflix uses in its own language picker.
const supportedLanguages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "ml", label: "മലയാളം" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
];

export default function NetflixLanding() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleGetStarted = () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    navigate("/plans", { state: { email } });
  };

  // Changing the language updates the UI immediately via i18next and is
  // persisted to localStorage (through the configured language detector)
  // so it's restored automatically on the next visit/refresh.
  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    i18n.changeLanguage(langCode);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
  };

  return (
    <div className="nf-page">
      {/* Hero Section */}
      <section className="nf-hero">
        <div className="nf-hero-content">
          <h1 className="nf-hero-title">
            Gain Access to unlimited movies, TV shows, and more.
          </h1>

          <div className="nf-signup">
            <div className="nf-email-wrapper">
              <span className="nf-email-icon" aria-hidden="true">
                ✉
              </span>
              <input
                type="email"
                className="nf-email-input"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Your Email Address"
              />
            </div>
            <button className="nf-cta-btn" onClick={handleGetStarted}>
              GET STARTED
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="nf-footer">
        <div className="nf-footer-top">
          <div className="nf-footer-brand">
            <div className="nf-logo">NETFLIX</div>
            <div className="nf-location">
              <span className="nf-pin" aria-hidden="true">
                📍
              </span>
              Netflix India
            </div>
          </div>

          <FooterColumn title={t("footer_explore")} links={exploreLinks} />
          <FooterColumn title={t("footer_legal")} links={legalLinks} />
          <FooterColumn title={t("footer_support")} links={supportLinks} />
        </div>

        <div className="nf-language-select">
          <span className="nf-globe-icon" aria-hidden="true">
            🌐
          </span>
          <select
            value={i18n.language?.split("-")[0] || "en"}
            onChange={handleLanguageChange}
            aria-label={t("footer_language")}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="nf-footer-col">
      <h4 className="nf-footer-heading">{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.path} aria-label={link.label}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}