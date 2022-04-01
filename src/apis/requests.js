const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
  // Home
  fetchMoviePopular: `/movie/popular?api_key=${API_KEY}`,
  fetchMovieUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
  fetchTVPopular: `/tv/popular?api_key=${API_KEY}`,
  fetchTVTopRated: `/tv/top_rated?api_key=${API_KEY}`,

  // Movies
  // all
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}`,
  // get movie genres
  getMovieGenres: `genre/movie/list?api_key=${API_KEY}`,

  // TV Shows
  // all
  fetchAllTVShows: `/discover/tv?api_key=${API_KEY}`,
  // get tv show genres
  getTVGenres: `genre/tv/list?api_key=${API_KEY}`,

  // Search
  searchMovies: `/search/movie?api_key=${API_KEY}`,
  searchTvShows: `/search/tv?api_key=${API_KEY}`,
};

export default requests;
