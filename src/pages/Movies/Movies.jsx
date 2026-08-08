import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import MovieRow from "../../components/MovieRow/MovieRow";
import Footer from "../../components/Footer/Footer";
import requests from "../../services/requests";

import "./Movies.css";

function Movies() {
  return (
    <div className="movies-page">
      <Navbar />

      <Hero fetchUrl={requests.trending} />

      <MovieRow
        title="Trending Movies"
        fetchUrl={requests.trending}
      />

      <MovieRow
        title="Top Rated"
        fetchUrl={requests.topRated}
      />

      <MovieRow
        title="Action Movies"
        fetchUrl={requests.actionMovies}
      />

      <MovieRow
        title="Comedy Movies"
        fetchUrl={requests.comedyMovies}
      />

      <MovieRow
        title="Horror Movies"
        fetchUrl={requests.horrorMovies}
      />

      <MovieRow
        title="Romance Movies"
        fetchUrl={requests.romanceMovies}
      />

      <MovieRow
        title="Documentaries"
        fetchUrl={requests.documentaries}
      />

      <Footer />
    </div>
  );
}

export default Movies;