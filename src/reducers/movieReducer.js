export default (state = {}, action) => {
  switch (action.type) {
    case 'MOVIE_POPULAR':
      return { ...state, popular: action.payload };

    case 'MOVIE_NOWPLAYING':
      return { ...state, nowplaying: action.payload };

    case 'MOVIE_UPCOMING':
      return { ...state, upcoming: action.payload };

    case 'MOVIE_TOPRATED':
      return { ...state, toprated: action.payload };

    case 'SEARCH_MOVIES':
      return { ...state, search: action.payload };

    case 'SAVE_MOVIE':
    case 'FAVORITE_MOVIES':
      return { ...state, favorite: action.payload };

    case 'DELETE_MOVIE':
      const data = state.favorite.filter((item) => item.id !== action.payload);
      return { ...state, favorite: data };

    default:
      return state;
  }
};
