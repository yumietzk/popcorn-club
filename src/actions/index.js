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

      let data = [];
      response.map((res) => data.push(...res.data.results));

      dispatch({
        type: 'TV_ALL',
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

// Detail
// movie
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

// export const fetchActionMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchActionMovies}&page=1`),
//       tmdb.get(`${requests.fetchActionMovies}&page=2`),
//       tmdb.get(`${requests.fetchActionMovies}&page=3`),
//     ]);
//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_ACTION',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchAdventureMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchAdventureMovies}&page=1`),
//       tmdb.get(`${requests.fetchAdventureMovies}&page=2`),
//       tmdb.get(`${requests.fetchAdventureMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_ADVENTURE',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchAnimationMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchAnimationMovies}&page=1`),
//       tmdb.get(`${requests.fetchAnimationMovies}&page=2`),
//       tmdb.get(`${requests.fetchAnimationMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_ANIMATION',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchComedyMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchComedyMovies}&page=1`),
//       tmdb.get(`${requests.fetchComedyMovies}&page=2`),
//       tmdb.get(`${requests.fetchComedyMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_COMEDY',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchDocumentaryMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchDocumentaryMovies}&page=1`),
//       tmdb.get(`${requests.fetchDocumentaryMovies}&page=2`),
//       tmdb.get(`${requests.fetchDocumentaryMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_DOCUMENTARY',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchDramaMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchDramaMovies}&page=1`),
//       tmdb.get(`${requests.fetchDramaMovies}&page=2`),
//       tmdb.get(`${requests.fetchDramaMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_DRAMA',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchFantasyMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchFantasyMovies}&page=1`),
//       tmdb.get(`${requests.fetchFantasyMovies}&page=2`),
//       tmdb.get(`${requests.fetchFantasyMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_FANTASY',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchHorrorMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchHorrorMovies}&page=1`),
//       tmdb.get(`${requests.fetchHorrorMovies}&page=2`),
//       tmdb.get(`${requests.fetchHorrorMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_HORROR',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchRomanceMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchRomanceMovies}&page=1`),
//       tmdb.get(`${requests.fetchRomanceMovies}&page=2`),
//       tmdb.get(`${requests.fetchRomanceMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_ROMANCE',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// export const fetchSciFiMovies = () => async (dispatch) => {
//   try {
//     dispatch({ type: 'REQUEST_DATA_BYGENRE' });

//     const response = await Promise.all([
//       tmdb.get(`${requests.fetchSciFiMovies}&page=1`),
//       tmdb.get(`${requests.fetchSciFiMovies}&page=2`),
//       tmdb.get(`${requests.fetchSciFiMovies}&page=3`),
//     ]);

//     const data = response.map((res) => res.data.results);

//     dispatch({
//       type: 'FETCH_SCIFI',
//       payload: [...data[0], ...data[1], ...data[2]],
//     });
//   } catch (err) {
//     dispatch({
//       type: 'FAIL_RECEIVE_DATA',
//       payload: {
//         message: 'Something went wrong. Could not get data. Please try again!',
//       },
//     });
//   }
// };

// all

export const fetchMovieNowPlaying = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(requests.fetchMovieNowPlaying);
    dispatch({ type: 'MOVIE_NOWPLAYING', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchTvOnAir = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_TVDATA' });

    const response = await tmdb.get(requests.fetchTvOnAir);
    dispatch({ type: 'TV_ONAIR', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchMovieTopRated = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(requests.fetchMovieTopRated);
    dispatch({ type: 'MOVIE_TOPRATED', payload: response.data.results });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// DETAIL
// movie

export const fetchMovieCredits = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/movie/${id}/credits?api_key=${API_KEY}`);
    dispatch({
      type: 'MOVIE_CREDITS',
      payload: response.data.cast.slice(0, 15),
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

export const fetchMovieReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
    dispatch({
      type: 'MOVIE_REVIEWS',
      payload: response.data.results.slice(0, 10),
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

// tv
export const fetchTvDetail = (id) => async (dispatch) => {
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

export const fetchTvCredits = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_DETAIL' });

    const response = await tmdb.get(`/tv/${id}/credits?api_key=${API_KEY}`);
    dispatch({ type: 'TV_CREDITS', payload: response.data.cast.slice(0, 15) });
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchTvRelated = (id) => async (dispatch) => {
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

// SEARCH
export const searchMovies = (term) => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA' });

    const response = await tmdb.get(
      `${requests.searchMovies}&language=en-US&query=${term}`
    );
    dispatch({
      type: 'SEARCH_MOVIES',
      payload: { data: response.data.results, term: term },
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

export const searchTvShows = (term) => async (dispatch) => {
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

// Genre
// movie

// tv
export const fetchActionAdventureTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchAnimationTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchComedyTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchCrimeTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchDocumentaryTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchDramaTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchKidsTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchMysteryTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

export const fetchRealityTv = () => async (dispatch) => {
  try {
    dispatch({ type: 'REQUEST_DATA_BYGENRE' });

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
  } catch (err) {
    dispatch({
      type: 'FAIL_RECEIVE_DATA',
      payload: {
        message: 'Something went wrong. Could not get data. Please try again!',
      },
    });
  }
};

// FAVORITE
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

export const deleteMovie = (id) => async (dispatch) => {
  await favorites.delete(`/movies/${id}`);

  dispatch({ type: 'DELETE_MOVIE', payload: id });
};

export const deleteTVShow = (id) => async (dispatch) => {
  await favorites.delete(`/tvs/${id}`);

  dispatch({ type: 'DELETE_TV', payload: id });
};

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

export const fetchFavoriteTVs = () => async (dispatch, getState) => {
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
