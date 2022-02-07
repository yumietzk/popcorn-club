export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_DETAIL':
      return { ...state, isFetching: true };

    case 'MOVIE_DETAIL':
      return { ...state, isFetching: false, detail: action.payload };

    case 'MOVIE_CASTS':
      return { ...state, isFetching: false, casts: action.payload };

    case 'MOVIE_REVIEWS':
      return { ...state, isFetching: false, reviews: action.payload };

    case 'MOVIE_RELATED':
      return { ...state, isFetching: false, related: action.payload };

    case 'TV_DETAIL':
      return { ...state, isFetching: false, tvdetail: action.payload };

    case 'TV_CASTS':
      return { ...state, isFetching: false, tvcasts: action.payload };

    case 'TV_RELATED':
      return { ...state, isFetching: false, tvrelated: action.payload };

    case 'TV_SEASONS':
      return { ...state, isFetching: false, tvseasons: action.payload };

    default:
      return state;
  }
};
