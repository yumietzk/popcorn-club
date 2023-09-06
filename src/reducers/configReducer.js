/* eslint-disable import/no-anonymous-default-export */
export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, isFetching: true };

    case 'MOVIE_GENRES':
      return { ...state, movieGenres: action.payload };

    case 'TV_GENRES':
      return { ...state, tvGenres: action.payload };

    case 'FINISH':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
