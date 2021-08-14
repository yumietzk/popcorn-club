export default (state = {}, action) => {
  switch (action.type) {
    // case 'MOVIE_NOWPLAYING':
    //   return [...state, ...action.payload];

    case 'MOVIE_NOWPLAYING':
      return { ...state, nowplaying: action.payload };

    case 'MOVIE_POPULAR':
      return { ...state, popular: action.payload };

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
      return state;

    // case 'FETCH_ACTION':
    //   // return { ...state, action: action.payload };
    //   if (!state.action) {
    //     return { ...state, action: action.payload };
    //   } else {
    //     return [...state.action, ...action.payload];
    //   }

    default:
      return state;
  }
};
