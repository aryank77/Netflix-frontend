import { Link, useNavigate } from "react-router-dom";
import "./InfoPage.css";
import infoPagesContent from "./infoPagesContent";

/**
 * Generic renderer for the static/legal footer pages (Terms, Privacy,
 * Media Center, Jobs, etc). Content lives in infoPagesContent.js so adding
 * a new footer page only requires a new data entry + one route, instead of
 * a brand new component.
 *
 * @param {{ slug: string }} props - key into infoPagesContent
 */
function InfoPage({ slug }) {
  const navigate = useNavigate();
  const page = infoPagesContent[slug];

  // Defensive fallback in case a slug doesn't exist in the content map.
  if (!page) {
    return (
      <div className="info-page">
        <div className="info-page-container">
          <h1>Page not found</h1>
          <p>We couldn't find the page you were looking for.</p>
          <Link to="/" className="info-back-link">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="info-page">
      <div className="info-page-header">
        <div className="info-page-header-inner">
          <span className="info-logo" onClick={() => navigate("/")} role="link" tabIndex={0}
            aria-label="Go to Netflix home"
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            NETFLIX
          </span>
        </div>
      </div>

      <div className="info-page-container">
        <h1 className="info-title">{page.title}</h1>
        {page.subtitle && <p className="info-subtitle">{page.subtitle}</p>}

        {page.sections?.map((section, idx) => (
          <section className="info-section" key={idx}>
            <h2 className="info-heading">{section.heading}</h2>

            {section.body?.map((paragraph, pIdx) => (
              <p className="info-paragraph" key={pIdx}>
                {paragraph}
              </p>
            ))}

            {section.list && (
              <ul className="info-list">
                {section.list.map((item, lIdx) => (
                  <li key={lIdx}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <Link to="/" className="info-back-link" aria-label="Back to Home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default InfoPage;
