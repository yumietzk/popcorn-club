export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_TVDATA':
      return { ...state, isFetching: true };

    case 'TV_ONAIR':
      return { ...state, isFetching: false, onair: action.payload };

    case 'TV_POPULAR':
      return { ...state, isFetching: false, popular: action.payload };

    case 'TV_TOPRATED':
      return { ...state, isFetching: false, toprated: action.payload };

    case 'SEARCH_TVS':
      return { ...state, isFetching: false, search: action.payload };

    case 'SAVE_TV':
    case 'FAVORITE_TVS':
      return { ...state, isFetching: false, favorite: action.payload };

    case 'DELETE_TV':
      const data = state.favorite.filter((item) => item.id !== action.payload);
      return { ...state, isFetching: false, favorite: data };

    default:
      return state;
  }
};
