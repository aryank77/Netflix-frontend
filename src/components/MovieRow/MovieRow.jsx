import { useEffect, useRef, useState } from "react";
import "./MovieRow.css";
import MovieCard from "../MovieCard/MovieCard";
import PosterSkeleton from "../Skeletons/PosterSkeleton";
import api from "../../services/api";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const rowRef = useRef(null);
  const moviesRef = useRef(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || hasFetched.current) return;

    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const response = await api.get(fetchUrl);
        setMovies(response.data.results);
        hasFetched.current = true;
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchUrl, isVisible]);

  // Netflix-like scrolling
  const handleWheel = (e) => {
    const slider = moviesRef.current;

    if (!slider) return;

    // Shift + Wheel = Horizontal scroll
    if (e.shiftKey) {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
      return;
    }

    // Agar row horizontal scroll nahi kar rahi,
    // to page normal scroll karegi.
    // Isliye yahan preventDefault() nahi lagaya.
  };

  return (
    <div className="movie-row" ref={rowRef}>
      <h2>{title}</h2>

      <div
        className="movies"
        ref={moviesRef}
        onWheel={handleWheel}
      >
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <PosterSkeleton key={i} />)}

        {!loading && error && (
          <p className="movie-row-error">
            Couldn't load "{title}" right now. Please try again later.
          </p>
        )}

        {!loading &&
          !error &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default MovieRow;