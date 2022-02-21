import tmdb from '../apis/tmdb';
import requests from '../apis/requests';
import favorites from '../apis/favorites';

const API_KEY = process.env.REACT_APP_API_KEY;

// SIGNIN
export const signIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId,
  };
};

// SIGNOUT
export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

// ⚠️ Consider about configuration later

// Initialization
export const init = () => async (dispatch) => {
  await dispatch(getMovieGenres());
  await dispatch(getTVGenres());
};

// Get movie genres
const getMovieGenres = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(requests.getMovieGenres);
    dispatch({ type: 'MOVIE_GENRES', payload: response.data.genres });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// Get tv show genres
const getTVGenres = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(requests.getTVGenres);
    dispatch({ type: 'TV_GENRES', payload: response.data.genres });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// HOME
export const fetchMoviePopular = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(requests.fetchMoviePopular);
    dispatch({ type: 'MOVIE_POPULAR', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchMovieUpcoming = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(requests.fetchMovieUpcoming);
    dispatch({ type: 'MOVIE_UPCOMING', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchTVPopular = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_TVDATA' });

    const response = await tmdb.get(requests.fetchTVPopular);
    dispatch({ type: 'TV_POPULAR', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchTVTopRated = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_TVDATA' });

    const response = await tmdb.get(requests.fetchTVTopRated);
    dispatch({ type: 'TV_TOPRATED', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

const makeRequest = (count, url) => {
  const pages = count / 20;
  let request = [];
  for (let i = 1; i <= pages; i++) {
    request.push(tmdb.get(`${url}&page=${i}`));
  }
  return request;
};

// MOVIES
// all
export const fetchAllMovies =
  (count = 60) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'REQUEST_DATA' });

      const response = await Promise.all(
        makeRequest(count, requests.fetchAllMovies)
      );

      let data = [];
      response.map((res) => data.push(...res.data.results));

      dispatch({
        type: 'MOVIE_ALL',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'FAIL_RECEIVE_DATA',
        payload: {
          message:
            'Something went wrong. Could not get data. Please try again!',
        },
      });
    }
  };

// by genre
export const fetchMoviesByGenre =
  (selectedGenre, count = 60) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'REQUEST_DATA_BYGENRE' });

      const genres = getState().conf.movieGenres;
      const genre = genres.find((genre) => genre.name === selectedGenre);

      const response = await Promise.all(
        makeRequest(
          count,
          `/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
        )
      );

      let data = [];
      response.map((res) => data.push(...res.data.results));

      dispatch({
        type: 'MOVIE_BYGENRE',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'FAIL_RECEIVE_DATA',
        payload: {
          message:
            'Something went wrong. Could not get data. Please try again!',
        },
      });
    }
  };

// TV SHOWS
// all
export const fetchAllTVShows =
  (count = 60) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'REQUEST_DATA' });

      const response = await Promise.all(
        makeRequest(count, requests.fetchAllTVShows)
      );

      let data = []; // [{}, {}]
      response.map((res) => data.push(...res.data.results));

      dispatch({
        type: 'TV_ALL',
        payload: data,
      });

      // const dataID = data.map((item) => item.id); // [id, id, id]

      // fetchTVDetail
    } catch (err) {
      dispatch({
        type: 'FAIL_RECEIVE_DATA',
        payload: {
          message:
            'Something went wrong. Could not get data. Please try again!',
        },
      });
    }
  };

// by genre
export const fetchTVShowsByGenre =
  (selectedGenre, count = 60) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: 'REQUEST_DATA_BYGENRE' });

      const genres = getState().conf.tvGenres;
      const genre = genres.find((genre) => genre.name === selectedGenre);

      const response = await Promise.all(
        makeRequest(
          count,
          `/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}`
        )
      );

      let data = [];
      response.map((res) => data.push(...res.data.results));

      dispatch({
        type: 'TV_BYGENRE',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'FAIL_RECEIVE_DATA',
        payload: {
          message:
            'Something went wrong. Could not get data. Please try again!',
        },
      });
    }
  };

// DETAIL
// detail
export const fetchMovieDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/movie/${id}?api_key=${API_KEY}`);
    dispatch({ type: 'MOVIE_DETAIL', payload: response.data });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// casts
export const fetchMovieCasts = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/movie/${id}/credits?api_key=${API_KEY}`);
    dispatch({
      type: 'MOVIE_CASTS',
      payload: response.data.cast,
      // payload: response.data.cast.slice(0, 15),
    });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// reviews
export const fetchMovieReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
    dispatch({
      type: 'MOVIE_REVIEWS',
      payload: response.data.results,
      // payload: response.data.results.slice(0, 10),
    });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// related
export const fetchMovieRelated = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/movie/${id}/similar?api_key=${API_KEY}`);
    dispatch({ type: 'MOVIE_RELATED', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// TV DETAIL
// detail
export const fetchTVDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/tv/${id}?api_key=${API_KEY}`);
    dispatch({ type: 'TV_DETAIL', payload: response.data });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// casts
export const fetchTVCasts = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/tv/${id}/credits?api_key=${API_KEY}`);
    dispatch({ type: 'TV_CASTS', payload: response.data.cast.slice(0, 15) });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// related
export const fetchTVRelated = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/tv/${id}/similar?api_key=${API_KEY}`);
    dispatch({ type: 'TV_RELATED', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// TV SEASONS
export const fetchTVSeasons = (id, number) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(
      `/tv/${id}/season/${number}?api_key=${API_KEY}`
    );
    dispatch({ type: 'TV_SEASONS', payload: response.data });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// PERSON
// info
export const fetchPersonInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_PERSON' });

    const response = await tmdb.get(`/person/${id}?api_key=${API_KEY}`);
    dispatch({ type: 'PERSON_INFO', payload: response.data });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// movie credits
export const fetchPersonMovies = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_PERSON' });

    const response = await tmdb.get(
      `/person/${id}/movie_credits?api_key=${API_KEY}`
    );
    dispatch({ type: 'MOVIE_CREDITS', payload: response.data.cast });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// tv credits
export const fetchPersonTVShows = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_PERSON' });

    const response = await tmdb.get(
      `/person/${id}/tv_credits?api_key=${API_KEY}`
    );
    dispatch({ type: 'TV_CREDITS', payload: response.data.cast });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// SEARCH
// movies
export const searchMovies = (term) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(
      `${requests.searchMovies}&language=en-US&query=${term}`
    );
    dispatch({
      type: 'SEARCH_MOVIES',
      payload: { data: response.data.results },
    });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message:
          'Something went wrong. Could not get data. Please search again!',
      },
    });
  }
};

// tvshows
export const searchTVShows = (term) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_TVDATA' });

    const response = await tmdb.get(
      `${requests.searchTvShows}&language=en-US&query=${term}`
    );

    dispatch({
      type: 'SEARCH_TVS',
      payload: response.data.results,
    });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message:
          'Something went wrong. Could not get data. Please search again!',
      },
    });
  }
};

// FAVORITE
// get movies
export const fetchFavoriteMovies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const { userId } = getState().auth;

    const response = await favorites.get('/movies');
    dispatch({
      type: 'FAVORITE_MOVIES',
      payload: { data: response.data, userId: userId },
    });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// get tvshows
export const fetchFavoriteTVShows = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'REQUEST_TVDATA' });

    const { userId } = getState().auth;

    const response = await favorites.get('/tvs');
    dispatch({
      type: 'FAVORITE_TVS',
      payload: { data: response.data, userId: userId },
    });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// save movie
export const saveMovie =
  (id, poster_path, original_title, release_date) =>
  async (dispatch, getState) => {
    const { userId } = getState().auth;

    const response = await favorites.post('/movies', {
      id,
      poster_path,
      original_title,
      release_date,
      userId,
    });

    dispatch({
      type: 'SAVE_MOVIE',
      payload: response.data,
    });
  };

// save tvshow
export const saveTVShow =
  (id, poster_path, original_name, first_air_date) =>
  async (dispatch, getState) => {
    const { userId } = getState().auth;

    const response = await favorites.post('/tvs', {
      id,
      poster_path,
      original_name,
      first_air_date,
      userId,
    });

    dispatch({
      type: 'SAVE_TV',
      payload: response.data,
    });
  };

// delete movie
export const deleteMovie = (id) => async (dispatch) => {
  await favorites.delete(`/movies/${id}`);

  dispatch({ type: 'DELETE_MOVIE', payload: id });
};

// delete tvshow
export const deleteTVShow = (id) => async (dispatch) => {
  await favorites.delete(`/tvs/${id}`);

  dispatch({ type: 'DELETE_TV', payload: id });
};
