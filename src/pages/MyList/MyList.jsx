import "./MyList.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PosterSkeleton from "../../components/Skeletons/PosterSkeleton";

import api from "../../services/api";
import backendApi from "../../services/backendApi";

function MyList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favRes = await backendApi.get("/favorites");

        const ids = favRes.data;

        if (ids.length === 0) {
          setMovies([]);
          setLoading(false);
          return;
        }

        const moviePromises = ids.map((id) =>
          api.get(`/movie/${id}`).then((res) => res.data)
        );

        const movieData = await Promise.all(moviePromises);

        setMovies(movieData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  const goToMovie = (id) => navigate(`/movie/${id}`);

  return (
    <>
      <Navbar />

      <div className="my-list-page">

        <h1>My List</h1>

        {loading ? (
          <div className="my-list-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <PosterSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p>Couldn't load your list right now. Please try again later.</p>
        ) : movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          <div className="my-list-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="my-list-card"
                onClick={() => goToMovie(movie.id)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${movie.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToMovie(movie.id);
                  }
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                />

                <h3>{movie.title}</h3>

                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default MyList;