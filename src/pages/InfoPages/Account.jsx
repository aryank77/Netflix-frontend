import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import backendApi from "../../services/backendApi";
import api from "../../services/api";
import { getSavedPlan } from "../../data/plans";
import {
  getWatchHistory,
  getFavoriteGenres,
} from "../../utils/watchHistory";
import "./InfoPage.css";
import "./Account.css";

/**
 * Account / Profile Dashboard page.
 * Combines real account info with a Netflix-style dashboard: banner,
 * avatar, Continue Watching, My List preview, Recently Watched,
 * Favorite Genres, and Viewing Statistics — all built from genuine data
 * (backend favorites + the client-side watch-history tracker), not
 * fabricated placeholders.
 */
function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [myList, setMyList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const history = getWatchHistory();
  const continueWatching = history.slice(0, 6);
  const recentlyWatched = history.slice(0, 8);
  const favoriteGenres = getFavoriteGenres(history).slice(0, 6);

  useEffect(() => {
    async function fetchMyList() {
      try {
        const favRes = await backendApi.get("/favorites");
        const ids = (favRes.data || []).slice(0, 6);

        if (ids.length === 0) {
          setMyList([]);
          return;
        }

        const movies = await Promise.all(
          ids.map((movieId) =>
            api.get(`/movie/${movieId}`).then((res) => res.data).catch(() => null)
          )
        );
        setMyList(movies.filter(Boolean));
      } catch (err) {
        console.log("Failed to load My List preview:", err);
      } finally {
        setLoadingList(false);
      }
    }

    fetchMyList();
  }, []);

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const totalWatched = history.length;
  const topGenre = favoriteGenres[0]?.genre || "—";
  const plan = getSavedPlan();

  return (
    <div className="account-page">
      <Navbar />

      {/* Large profile banner */}
      <div className="account-banner">
        <div className="account-banner-overlay" />
        <div className="account-banner-content">
          <img
            className="account-banner-avatar"
            src={
              user?.profilePic ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            alt=""
            aria-hidden="true"
          />
          <div>
            <h1 className="account-banner-name">{user?.name || "Guest"}</h1>
            <p className="account-banner-email">{user?.email || "Not signed in"}</p>
          </div>
          <button
            className="account-edit-btn"
            onClick={() => navigate("/manage-profile")}
          >
            Manage Profile
          </button>
        </div>
      </div>

      <div className="account-body">
        {/* Viewing Statistics */}
        <section className="dash-section">
          <h2 className="info-heading">Viewing Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{totalWatched}</span>
              <span className="stat-label">Titles Watched</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{myList.length}</span>
              <span className="stat-label">In My List</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{topGenre}</span>
              <span className="stat-label">Top Genre</span>
            </div>
          </div>
        </section>

        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <section className="dash-section">
            <h2 className="info-heading">Continue Watching</h2>
            <div className="dash-row">
              {continueWatching.map((item) => (
                <div
                  key={item.id}
                  className="dash-card"
                  onClick={() => navigate(`/movie/${item.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${item.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="dash-card-progress" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My List preview */}
        <section className="dash-section">
          <div className="dash-section-header">
            <h2 className="info-heading">My List</h2>
            <Link to="/my-list" className="dash-see-all">
              See all
            </Link>
          </div>
          {loadingList ? (
            <p className="dash-empty">Loading...</p>
          ) : myList.length === 0 ? (
            <p className="dash-empty">You haven't added any titles yet.</p>
          ) : (
            <div className="dash-row">
              {myList.map((movie) => (
                <div
                  key={movie.id}
                  className="dash-card"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${movie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recently Watched */}
        <section className="dash-section">
          <div className="dash-section-header">
            <h2 className="info-heading">Recently Watched</h2>
            <Link to="/watch-history" className="dash-see-all">
              See all
            </Link>
          </div>
          {recentlyWatched.length === 0 ? (
            <p className="dash-empty">No viewing activity yet.</p>
          ) : (
            <div className="dash-row">
              {recentlyWatched.map((item) => (
                <div
                  key={item.id}
                  className="dash-card"
                  onClick={() => navigate(`/movie/${item.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/movie/${item.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Favorite Genres */}
        <section className="dash-section">
          <h2 className="info-heading">Favorite Genres</h2>
          {favoriteGenres.length === 0 ? (
            <p className="dash-empty">
              Watch a few titles and your favorite genres will show up here.
            </p>
          ) : (
            <div className="genre-chips">
              {favoriteGenres.map((g) => (
                <span className="genre-chip" key={g.genre}>
                  {g.genre} <span className="genre-count">{g.count}</span>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Account Information */}
        <section className="dash-section">
          <h2 className="info-heading">Account Information</h2>
          <div className="account-info-card">
            <p>
              <strong>Name:</strong> {user?.name || "—"}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || "—"}
            </p>
            <p>
              <strong>Member since:</strong> {memberSince}
            </p>
            <p>
              <strong>Plan:</strong>{" "}
              {plan ? `${plan.name} — ₹${plan.price}/month` : "No plan selected"}
            </p>
          </div>

          <div className="account-links">
            <Link to="/manage-profile" className="account-link">
              Manage Profile
            </Link>
            <Link to="/plans" className="account-link">
              {plan ? "Change Plan" : "Choose a Plan"}
            </Link>
            <Link to="/settings" className="account-link">
              Settings
            </Link>
            <Link to="/help-center" className="account-link">
              Help Center
            </Link>
            <Link to="/cookie-preferences" className="account-link">
              Cookie Preferences
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Account;
