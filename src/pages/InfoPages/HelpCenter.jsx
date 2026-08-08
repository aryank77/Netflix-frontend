import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InfoPage.css";
import "./HelpCenter.css";

// Categorised help topics as requested: Account Issues, Payments,
// Streaming Problems, Device Setup. Each has a short set of real tips.
const helpCategories = [
  {
    id: "account",
    title: "Account Issues",
    icon: "👤",
    topics: [
      "Reset a forgotten password from the Login page",
      "Update your email address from Account settings",
      "Manage or remove profiles from your account",
      "Deactivate or permanently delete your account",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: "💳",
    topics: [
      "Update or change your payment method",
      "Understand a charge on your statement",
      "Apply a gift card or promotional code",
      "View your billing history and past invoices",
    ],
  },
  {
    id: "streaming",
    title: "Streaming Problems",
    icon: "📶",
    topics: [
      "Fix buffering or slow-loading videos",
      "Resolve playback errors or black screens",
      "Improve streaming quality on a slow connection",
      "Troubleshoot audio and subtitle issues",
    ],
  },
  {
    id: "devices",
    title: "Device Setup",
    icon: "📺",
    topics: [
      "Activate Netflix on your smart TV",
      "Sign in on a game console or streaming stick",
      "Pair your phone as a remote control",
      "Download the app on mobile and tablet",
    ],
  },
];

function HelpCenter() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Simple client-side filter across all topics — keeps the page useful
  // without needing a backend search endpoint just for static help text.
  const filteredCategories = helpCategories
    .map((cat) => ({
      ...cat,
      topics: cat.topics.filter((t) =>
        t.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => !query || cat.topics.length > 0);

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

      <div className="help-hero">
        <h1 className="info-title">How can we help?</h1>
        <input
          type="text"
          className="help-search-input"
          placeholder="Search for help topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search help topics"
        />
      </div>

      <div className="info-page-container">
        <div className="help-grid">
          {filteredCategories.map((cat) => (
            <div className="help-card" key={cat.id}>
              <h2 className="help-card-title">
                <span aria-hidden="true">{cat.icon}</span> {cat.title}
              </h2>
              <ul className="help-card-list">
                {cat.topics.map((topic, idx) => (
                  <li key={idx}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}

          {query && filteredCategories.length === 0 && (
            <p className="help-no-results">
              No help topics found for "{query}".
            </p>
          )}
        </div>

        <p className="faq-contact-hint">
          Can't find what you're looking for? Check the{" "}
          <Link to="/faq" className="info-back-link">
            FAQ
          </Link>{" "}
          or{" "}
          <Link to="/contact-us" className="info-back-link">
            Contact Us
          </Link>
          .
        </p>

        <Link to="/" className="info-back-link" aria-label="Back to Home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default HelpCenter;
