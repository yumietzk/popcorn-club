/* eslint-disable import/no-anonymous-default-export */
export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_DETAIL':
      return { ...state, isFetching: true };

    case 'MOVIE_DETAIL':
      return { ...state, detail: action.payload };

    case 'MOVIE_CASTS':
      return { ...state, casts: action.payload };

    case 'MOVIE_REVIEWS':
      return { ...state, reviews: action.payload };

    case 'MOVIE_RELATED':
      return { ...state, related: action.payload };

    case 'TV_DETAIL':
      return { ...state, tvdetail: action.payload };

    case 'TV_CASTS':
      return { ...state, tvcasts: action.payload };

    case 'TV_RELATED':
      return { ...state, tvrelated: action.payload };

    case 'TV_SEASONS':
      return { ...state, tvseasons: action.payload };

    case 'FINISH':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
