export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_TVDATA':
      return { ...state, isFetching: true };

    case 'TV_ALL':
      return { ...state, isFetching: false, all: action.payload };

    case 'TV_BYGENRE':
      return { ...state, isFetching: false, byGenre: action.payload };

    case 'TV_ONAIR':
      return { ...state, isFetching: false, onair: action.payload };

    case 'TV_POPULAR':
      return { ...state, isFetching: false, popular: action.payload };

    case 'TV_TOPRATED':
      return { ...state, isFetching: false, toprated: action.payload };

    case 'SEARCH_TVS':
      return {
        ...state,
        isFetching: false,
        search: action.payload,
      };

    case 'SAVE_TV':
      const org = state.favorite;
      return {
        ...state,
        isFetching: false,
        favorite: [...org, action.payload],
      };

    case 'FAVORITE_TVS':
      const favorites = action.payload.data?.filter(
        (data) => data.userId === action.payload.userId
      );
      return { ...state, isFetching: false, favorite: favorites };

    case 'DELETE_TV':
      const data = state.favorite.filter((item) => item.id !== action.payload);
      return { ...state, isFetching: false, favorite: data };

    default:
      return state;
  }
};
