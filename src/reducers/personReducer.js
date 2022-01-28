export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_PERSON':
      return { ...state, isFetching: true };

    case 'PERSON_INFO':
      return { ...state, isFetching: false, info: action.payload };

    case 'MOVIE_CREDITS':
      return { ...state, isFetching: false, movies: action.payload };

    case 'TV_CREDITS':
      return { ...state, isFetching: false, tvshows: action.payload };

    default:
      return state;
  }
};
