import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaTimes } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./Hero.css";
import api from "../../services/api";

function Hero() {
  // Hero movie
  const [movie, setMovie] = useState(null);

  // Trailer
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // Mobile Screen Detect
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  // Detect Screen Size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const response = await api.get("/trending/all/week");

        const movies = response.data.results.filter(
          (item) => item.media_type !== "person"
        );

        setMovie(
          movies[Math.floor(Math.random() * movies.length)]
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchHeroMovie();

    if (showTrailer) return;

    const interval = setInterval(fetchHeroMovie, 50000);

    return () => clearInterval(interval);

  }, [showTrailer]);

  const handlePlay = async () => {

    if (!movie) return;

    try {

      const type = movie.media_type === "tv" ? "tv" : "movie";

      const res = await api.get(`/${type}/${movie.id}/videos`);

      const trailer =
        res.data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        ) ||
        res.data.results.find(
          (video) => video.site === "YouTube"
        );

      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert("Trailer not available.");
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleMoreInfo = () => {

    if (!movie) return;

    navigate(`/movie/${movie.id}`);
  };

  if (!movie) return null;

  // Background Image
  const heroImage = isMobile
    ? (movie.poster_path || movie.backdrop_path)
    : (movie.backdrop_path || movie.poster_path);

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${heroImage})`,
        }}
      >
        <div className="hero-content">

          <h1>{movie.title || movie.name}</h1>

          <p>
            {movie.overview?.length > 180
              ? movie.overview.substring(0, 180) + "..."
              : movie.overview}
          </p>

          <div className="hero-buttons">

            <button
              className="hero-play-btn"
              onClick={handlePlay}
            >
              <FaPlay />
              <span>Play</span>
            </button>

            <button
              className="hero-info-btn"
              onClick={handleMoreInfo}
            >
              <AiOutlineInfoCircle />
              <span>More Info</span>
            </button>

          </div>
        </div>
      </section>

      {showTrailer && (
        <div className="trailer-overlay">

          <div className="trailer-modal">

            <button
              className="close-trailer"
              onClick={() => {
                setShowTrailer(false);
                setTrailerKey(null);
              }}
            >
              <FaTimes />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

          </div>

        </div>
      )}
    </>
  );
}

export default Hero;