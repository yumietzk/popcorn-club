export default (state = {}, action) => {
  switch (action.type) {
    case 'MOVIE_DETAIL':
      return { ...state, detail: action.payload };

    case 'MOVIE_CREDITS':
      return { ...state, cast: action.payload };

    case 'MOVIE_REVIEWS':
      return { ...state, reviews: action.payload };

    case 'MOVIE_RELATED':
      return { ...state, related: action.payload };

    case 'TV_DETAIL':
      return { ...state, tvdetail: action.payload };

    case 'TV_CREDITS':
      return { ...state, tvcast: action.payload };

    case 'TV_RELATED':
      return { ...state, tvrelated: action.payload };

    default:
      return state;
  }
};
