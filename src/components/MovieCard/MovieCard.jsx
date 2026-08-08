import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { memo } from "react";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  if (!movie || !movie.poster_path) return null;

  const movieName = movie.title || movie.name;

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        `${movieName} official trailer`
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="movie-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${movieName}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movieName}
        loading="lazy"
        decoding="async"
      />

      <button
        className="play-btn"
        onClick={handlePlay}
        aria-label={`Play trailer for ${movieName}`}
        tabIndex={-1}
      >
        <FaPlay />
      </button>
    </div>
  );
}

// Movie rows can render dozens of cards at once; memoizing avoids
// re-rendering every card when an unrelated sibling/parent re-renders.
export default memo(MovieCard);