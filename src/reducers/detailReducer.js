export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_DETAIL':
      return { ...state, isFetching: true };

    case 'MOVIE_DETAIL':
      return { ...state, isFetching: false, detail: action.payload };

    case 'MOVIE_CREDITS':
      return { ...state, isFetching: false, casts: action.payload };

    case 'MOVIE_REVIEWS':
      return { ...state, isFetching: false, reviews: action.payload };

    case 'MOVIE_RELATED':
      return { ...state, isFetching: false, related: action.payload };

    case 'TV_DETAIL':
      return { ...state, isFetching: false, tvdetail: action.payload };

    case 'TV_CREDITS':
      return { ...state, isFetching: false, tvcasts: action.payload };

    case 'TV_RELATED':
      return { ...state, isFetching: false, tvrelated: action.payload };

    default:
      return state;
  }
};
