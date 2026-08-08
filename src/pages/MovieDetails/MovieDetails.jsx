import "./MovieDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import backendApi from "../../services/backendApi";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { logWatch } from "../../utils/watchHistory";
import { addNotification } from "../../utils/notifications";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        // Movie Details
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);

        // Record this view in watch history (powers Watch History page +
        // Profile Dashboard's Continue Watching / Recently Watched / Favorite Genres).
        logWatch(response.data);

        // Check Favorites
        try {
          const fav = await backendApi.get("/favorites");
          setSaved(fav.data.includes(Number(id)));
        } catch (err) {
          console.log("Favorite check failed:", err);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  const handlePlay = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        movie.title || movie.name
      )} trailer`,
      "_blank"
    );
  };

  const handleMyList = async () => {
    try {
      if (saved) {
        await backendApi.delete(`/favorites/${id}`);
        setSaved(false);
      } else {
        await backendApi.post(`/favorites/${id}`);
        setSaved(true);

        // Real, event-driven notification — fired only when the user
        // actually adds a title, not a fabricated/simulated one.
        addNotification({
          type: "added_to_list",
          title: "Added to My List",
          message: `${movie.title || movie.name} was added to your list.`,
          movieId: movie.id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );

  if (!movie)
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "100px" }}>
        Movie Not Found
      </h2>
    );

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: `url(${backdrop})`,
      }}
    >
      <div className="details-content">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <h1>{movie.title || movie.name}</h1>

        <div className="info">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>{movie.runtime} min</span>
          <span>HD</span>
        </div>

        <div className="genres">
          {movie.genres?.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>

        <p className="movie-overview">
          {movie.overview?.length > 220
            ? movie.overview.substring(0, 220) + "..."
            : movie.overview}
        </p>

        <div className="details-buttons">

          <button
            className="details-play-btn"
            onClick={handlePlay}
          >
            <FaPlay />
            <span>Play</span>
          </button>

          <button
            className="mylist-btn"
            onClick={handleMyList}
          >
            {saved ? <FaCheck /> : <FaPlus />}
            <span>{saved ? "Added" : "My List"}</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default MovieDetails;