/* eslint-disable import/no-anonymous-default-export */
export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_PERSON':
      return { ...state, isFetching: true };

    case 'PERSON_INFO':
      return { ...state, info: action.payload };

    case 'MOVIE_CREDITS':
      return { ...state, movies: action.payload };

    case 'TV_CREDITS':
      return { ...state, tvshows: action.payload };

    case 'FINISH':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
