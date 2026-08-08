import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import MovieRow from "../../components/MovieRow/MovieRow";
import Footer from "../../components/Footer/Footer";
import requests from "../../services/requests";

import "./NewPopular.css";

function NewPopular() {
  return (
    <div className="newpopular-page">
      <Navbar />

      <Hero fetchUrl={requests.trending} />

      <MovieRow title="Trending This Week" fetchUrl={requests.trending} />
      <MovieRow title="Top Rated" fetchUrl={requests.topRated} />
      <MovieRow title="Action Movies" fetchUrl={requests.actionMovies} />
      <MovieRow title="Comedy Movies" fetchUrl={requests.comedyMovies} />
      <MovieRow title="Horror Movies" fetchUrl={requests.horrorMovies} />
      <MovieRow title="Romance Movies" fetchUrl={requests.romanceMovies} />

      <Footer />
    </div>
  );
}

export default NewPopular;