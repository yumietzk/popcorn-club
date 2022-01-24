export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA':
      return { ...state, isFetching: true };

    case 'MOVIE_ALL':
      return { ...state, isFetching: false, all: action.payload };

    case 'MOVIE_BYGENRE':
      return { ...state, isFetching: false, byGenre: action.payload };

    case 'MOVIE_POPULAR':
      return { ...state, isFetching: false, popular: action.payload };

    case 'MOVIE_NOWPLAYING':
      return { ...state, isFetching: false, nowplaying: action.payload };

    case 'MOVIE_UPCOMING':
      return { ...state, isFetching: false, upcoming: action.payload };

    case 'MOVIE_TOPRATED':
      return { ...state, isFetching: false, toprated: action.payload };

    case 'SEARCH_MOVIES':
      return {
        ...state,
        isFetching: false,
        search: action.payload.data,
        searchTerm: action.payload.term,
      };

    case 'SAVE_MOVIE':
      const org = state.favorite;
      return {
        ...state,
        isFetching: false,
        favorite: [...org, action.payload],
      };

    case 'FAVORITE_MOVIES':
      const favorites = action.payload.data?.filter(
        (data) => data.userId === action.payload.userId
      );
      return { ...state, isFetching: false, favorite: favorites };

    case 'DELETE_MOVIE':
      const data = state.favorite.filter((item) => item.id !== action.payload);
      return { ...state, isFetching: false, favorite: data };

    default:
      return state;
  }
};
