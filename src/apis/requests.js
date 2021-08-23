const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
  // Home
  fetchMovieNowPlaying: `/movie/now_playing?api_key=${API_KEY}`,
  fetchTvOnAir: `/tv/on_the_air?api_key=${API_KEY}`,

  // Movie top
  fetchMoviePopular: `/movie/popular?api_key=${API_KEY}`,
  fetchMovieUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
  fetchMovieTopRated: `/movie/top_rated?api_key=${API_KEY}`,
  // TV top
  fetchTvPopular: `/tv/popular?api_key=${API_KEY}`,
  fetchTvTopRated: `/tv/top_rated?api_key=${API_KEY}`,

  // Search term
  searchMovies: `/search/movie?api_key=${API_KEY}`,
  searchTvShows: `/search/tv?api_key=${API_KEY}`,

  // Genre
  // movie
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchDocumentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchFantasyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchSciFiMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  // tv
  fetchActionAdventureTv: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  fetchAnimationTv: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
  fetchComedyTv: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchCrimeTv: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
  fetchDocumentaryTv: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
  fetchDramaTv: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchKidsTv: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
  fetchMysteryTv: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
  fetchRealityTv: `/discover/tv?api_key=${API_KEY}&with_genres=10764`,
};

export default requests;
