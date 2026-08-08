import { useNavigate } from "react-router-dom";
import MovieRow from "../../components/MovieRow/MovieRow";
import requests from "../../services/requests";
import "./InfoPage.css";
import "./OnlyOnNetflix.css";

// Reuses the existing MovieRow component + TMDB request map so this page
// stays consistent with Home/Movies/TVShows instead of introducing a new
// fetching pattern.
function OnlyOnNetflix() {
  const navigate = useNavigate();

  return (
    <div className="info-page only-on-netflix">
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

      <div className="oon-hero">
        <h1 className="info-title">Only on Netflix</h1>
        <p className="info-subtitle">
          Exclusive originals you won't find anywhere else.
        </p>
      </div>

      <div className="oon-rows">
        <MovieRow title="Netflix Originals" fetchUrl={requests.netflixOriginals} />
        <MovieRow title="Trending Now" fetchUrl={requests.trending} />
        <MovieRow title="Top Rated" fetchUrl={requests.topRated} />
      </div>
    </div>
  );
}

export default OnlyOnNetflix;
