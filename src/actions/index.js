import tmdb from '../apis/tmdb';
import requests from '../apis/requests';
import favorites from '../apis/favorites';
import { API_KEY } from '../apis/config';
import history from '../history';

// HOME
export const fetchMovieNowPlaying = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchMovieNowPlaying);

  dispatch({ type: 'MOVIE_NOWPLAYING', payload: response.data.results });
};

export const fetchTvOnAir = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchTvOnAir);

  dispatch({ type: 'TV_ONAIR', payload: response.data.results });
};

// MOVIE
export const fetchMoviePopular = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchMoviePopular);

  dispatch({ type: 'MOVIE_POPULAR', payload: response.data.results });
};

export const fetchMovieUpcoming = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchMovieUpcoming);

  dispatch({ type: 'MOVIE_UPCOMING', payload: response.data.results });
};

export const fetchMovieTopRated = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchMovieTopRated);

  dispatch({ type: 'MOVIE_TOPRATED', payload: response.data.results });
};

// TV
export const fetchTvPopular = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchTvPopular);

  dispatch({ type: 'TV_POPULAR', payload: response.data.results });
};

export const fetchTvTopRated = () => async (dispatch) => {
  const response = await tmdb.get(requests.fetchTvTopRated);

  dispatch({ type: 'TV_TOPRATED', payload: response.data.results });
};

// DETAIL
// movie
export const fetchMovieDetail = (id) => async (dispatch) => {
  const response = await tmdb.get(`/movie/${id}?api_key=${API_KEY}`);

  dispatch({ type: 'MOVIE_DETAIL', payload: response.data });
};

export const fetchMovieCredits = (id) => async (dispatch) => {
  const response = await tmdb.get(`/movie/${id}/credits?api_key=${API_KEY}`);

  dispatch({ type: 'MOVIE_CREDITS', payload: response.data.cast.slice(0, 15) });
};

export const fetchMovieReviews = (id) => async (dispatch) => {
  const response = await tmdb.get(`/movie/${id}/reviews?api_key=${API_KEY}`);

  dispatch({
    type: 'MOVIE_REVIEWS',
    payload: response.data.results.slice(0, 10),
  });
};

export const fetchMovieRelated = (id) => async (dispatch) => {
  const response = await tmdb.get(`/movie/${id}/similar?api_key=${API_KEY}`);

  dispatch({ type: 'MOVIE_RELATED', payload: response.data.results });
};

// tv
export const fetchTvDetail = (id) => async (dispatch) => {
  const response = await tmdb.get(`/tv/${id}?api_key=${API_KEY}`);

  dispatch({ type: 'TV_DETAIL', payload: response.data });
};

export const fetchTvCredits = (id) => async (dispatch) => {
  const response = await tmdb.get(`/tv/${id}/credits?api_key=${API_KEY}`);

  dispatch({ type: 'TV_CREDITS', payload: response.data.cast.slice(0, 15) });
};

export const fetchTvRelated = (id) => async (dispatch) => {
  const response = await tmdb.get(`/tv/${id}/similar?api_key=${API_KEY}`);

  dispatch({ type: 'TV_RELATED', payload: response.data.results });
};

// SEARCH
export const searchMovies = (term) => async (dispatch) => {
  const response = await tmdb.get(
    `${requests.searchMovies}&language=en-US&query=${term}`
  );

  dispatch({ type: 'SEARCH_MOVIES', payload: response.data.results });

  history.push('/search');
};

export const searchTvShows = (term) => async (dispatch) => {
  const response = await tmdb.get(
    `${requests.searchTvShows}&language=en-US&query=${term}`
  );

  dispatch({ type: 'SEARCH_TVS', payload: response.data.results });

  history.push('/search');
};

// Genre
// movie
export const fetchActionMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchActionMovies}&page=1`),
    tmdb.get(`${requests.fetchActionMovies}&page=2`),
    tmdb.get(`${requests.fetchActionMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_ACTION',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchAdventureMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchAdventureMovies}&page=1`),
    tmdb.get(`${requests.fetchAdventureMovies}&page=2`),
    tmdb.get(`${requests.fetchAdventureMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_ADVENTURE',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchAnimationMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchAnimationMovies}&page=1`),
    tmdb.get(`${requests.fetchAnimationMovies}&page=2`),
    tmdb.get(`${requests.fetchAnimationMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_ANIMATION',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchComedyMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchComedyMovies}&page=1`),
    tmdb.get(`${requests.fetchComedyMovies}&page=2`),
    tmdb.get(`${requests.fetchComedyMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_COMEDY',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchDocumentaryMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchDocumentaryMovies}&page=1`),
    tmdb.get(`${requests.fetchDocumentaryMovies}&page=2`),
    tmdb.get(`${requests.fetchDocumentaryMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_DOCUMENTARY',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchDramaMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchDramaMovies}&page=1`),
    tmdb.get(`${requests.fetchDramaMovies}&page=2`),
    tmdb.get(`${requests.fetchDramaMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_DRAMA',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchFantasyMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchFantasyMovies}&page=1`),
    tmdb.get(`${requests.fetchFantasyMovies}&page=2`),
    tmdb.get(`${requests.fetchFantasyMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_FANTASY',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchHorrorMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchHorrorMovies}&page=1`),
    tmdb.get(`${requests.fetchHorrorMovies}&page=2`),
    tmdb.get(`${requests.fetchHorrorMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_HORROR',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchRomanceMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchRomanceMovies}&page=1`),
    tmdb.get(`${requests.fetchRomanceMovies}&page=2`),
    tmdb.get(`${requests.fetchRomanceMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_ROMANCE',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchSciFiMovies = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchSciFiMovies}&page=1`),
    tmdb.get(`${requests.fetchSciFiMovies}&page=2`),
    tmdb.get(`${requests.fetchSciFiMovies}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_SCIFI',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

// tv
export const fetchActionAdventureTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchActionAdventureTv}&page=1`),
    tmdb.get(`${requests.fetchActionAdventureTv}&page=2`),
    tmdb.get(`${requests.fetchActionAdventureTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_ACTIONADVENTURESHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchAnimationTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchAnimationTv}&page=1`),
    tmdb.get(`${requests.fetchAnimationTv}&page=2`),
    tmdb.get(`${requests.fetchAnimationTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_ANIMATIONSHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchComedyTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchComedyTv}&page=1`),
    tmdb.get(`${requests.fetchComedyTv}&page=2`),
    tmdb.get(`${requests.fetchComedyTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_COMEDYSHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchCrimeTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchCrimeTv}&page=1`),
    tmdb.get(`${requests.fetchCrimeTv}&page=2`),
    tmdb.get(`${requests.fetchCrimeTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_CRIMESHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchDocumentaryTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchDocumentaryTv}&page=1`),
    tmdb.get(`${requests.fetchDocumentaryTv}&page=2`),
    tmdb.get(`${requests.fetchDocumentaryTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_DOCUMENTARYSHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchDramaTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchDramaTv}&page=1`),
    tmdb.get(`${requests.fetchDramaTv}&page=2`),
    tmdb.get(`${requests.fetchDramaTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_DRAMASHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchKidsTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchKidsTv}&page=1`),
    tmdb.get(`${requests.fetchKidsTv}&page=2`),
    tmdb.get(`${requests.fetchKidsTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_KIDSSHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchMysteryTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchMysteryTv}&page=1`),
    tmdb.get(`${requests.fetchMysteryTv}&page=2`),
    tmdb.get(`${requests.fetchMysteryTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_MYSTERYSHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

export const fetchRealityTv = () => async (dispatch) => {
  const response = await Promise.all([
    tmdb.get(`${requests.fetchRealityTv}&page=1`),
    tmdb.get(`${requests.fetchRealityTv}&page=2`),
    tmdb.get(`${requests.fetchRealityTv}&page=3`),
  ]);

  const data = response.map((res) => res.data.results);

  dispatch({
    type: 'FETCH_REALITYSHOW',
    payload: [...data[0], ...data[1], ...data[2]],
  });
};

// FAVORITE
export const saveMovie =
  (id, poster_path, original_title, release_date) => async (dispatch) => {
    const response = await favorites.post('/movies', {
      id,
      poster_path,
      original_title,
      release_date,
    });

    dispatch({ type: 'SAVE_MOVIE', payload: response.data });
  };

export const saveTVShow =
  (id, poster_path, original_name, first_air_date) => async (dispatch) => {
    const response = await favorites.post('/tvs', {
      id,
      poster_path,
      original_name,
      first_air_date,
    });

    dispatch({ type: 'SAVE_TV', payload: response.data });
  };

export const deleteMovie = (id) => async (dispatch) => {
  await favorites.delete(`/movies/${id}`);

  dispatch({ type: 'DELETE_MOVIE', payload: id });
};

export const deleteTVShow = (id) => async (dispatch) => {
  await favorites.delete(`/tvs/${id}`);

  dispatch({ type: 'DELETE_TV', payload: id });
};

export const fetchFavoriteMovies = () => async (dispatch) => {
  const response = await favorites.get('/movies');

  dispatch({ type: 'FAVORITE_MOVIES', payload: response.data });
};

export const fetchFavoriteTVs = () => async (dispatch) => {
  const response = await favorites.get('/tvs');

  dispatch({ type: 'FAVORITE_TVS', payload: response.data });
};
