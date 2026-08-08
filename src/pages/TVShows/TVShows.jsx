import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import MovieRow from "../../components/MovieRow/MovieRow";
import Footer from "../../components/Footer/Footer";
import requests from "../../services/requests";

import "./TVShows.css";

function TVShows() {
  return (
    <div className="tvshows">
      <Navbar />

      <Hero fetchUrl={requests.trendingTV} />

      <MovieRow
        title="Trending TV Shows"
        fetchUrl={requests.trendingTV}
      />

      <MovieRow
        title="Popular TV Shows"
        fetchUrl={requests.popularTV}
      />

      <MovieRow
        title="Top Rated TV Shows"
        fetchUrl={requests.topRatedTV}
      />

      <MovieRow
        title="Action & Adventure"
        fetchUrl={requests.actionAdventureTV}
      />

      <MovieRow
        title="Comedy TV Shows"
        fetchUrl={requests.comedyTV}
      />

      <MovieRow
        title="Crime TV Shows"
        fetchUrl={requests.crimeTV}
      />

      <MovieRow
        title="Drama TV Shows"
        fetchUrl={requests.dramaTV}
      />

      <Footer />
    </div>
  );
}

export default TVShows;