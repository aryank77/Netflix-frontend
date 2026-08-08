import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { getWatchHistory, clearWatchHistory } from "../../utils/watchHistory";
import "./WatchHistory.css";

function WatchHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(getWatchHistory());

  const handleClear = () => {
    clearWatchHistory();
    setHistory([]);
  };

  return (
    <>
      <Navbar />

      <div className="watch-history-page">
        <div className="watch-history-header">
          <h1>Watch History</h1>
          {history.length > 0 && (
            <button className="wh-clear-btn" onClick={handleClear}>
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="wh-empty">
            You haven't watched anything yet. Titles you view will show up here.
          </p>
        ) : (
          <div className="wh-grid">
            {history.map((item) => (
              <div
                key={item.id}
                className="wh-card"
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
                <div className="wh-card-info">
                  <h3>{item.title}</h3>
                  <span className="wh-date">
                    Watched {new Date(item.watchedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default WatchHistory;
