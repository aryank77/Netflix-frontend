const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  // Home
  trending: `/trending/all/week?api_key=${API_KEY}`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  topRated: `/movie/top_rated?api_key=${API_KEY}`,
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  // TV Shows
  trendingTV: `/trending/tv/week?api_key=${API_KEY}`,
  popularTV: `/tv/popular?api_key=${API_KEY}`,
  topRatedTV: `/tv/top_rated?api_key=${API_KEY}`,
  actionAdventureTV: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  comedyTV: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  crimeTV: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
  dramaTV: `/discover/tv?api_key=${API_KEY}&with_genres=18`,


  nowPlaying: `/movie/now_playing?api_key=${API_KEY}`,
  upcoming: `/movie/upcoming?api_key=${API_KEY}`,
  popularMovies: `/movie/popular?api_key=${API_KEY}`,

  // Search
  searchMovies: (query) =>
    `/search/movie?api_key=${API_KEY}&query=${query}`,

  // Movie Details
  movieDetails: (id) =>
    `/movie/${id}?api_key=${API_KEY}`,
};

export default requests;