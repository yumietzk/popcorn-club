export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, isFetching: true };

    case 'MOVIE_GENRES':
      return { ...state, isFetching: false, movieGenres: action.payload };

    case 'TV_GENRES':
      return { ...state, isFetching: false, tvGenres: action.payload };

    default:
      return state;
  }
};
