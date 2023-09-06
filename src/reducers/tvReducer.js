/* eslint-disable import/no-anonymous-default-export */
export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_TVDATA':
      return { ...state, isFetching: true };

    case 'TV_ALL':
      return { ...state, all: action.payload };

    case 'TV_BYGENRE':
      return { ...state, byGenre: action.payload };

    case 'TV_ONAIR':
      return { ...state, onair: action.payload };

    case 'TV_POPULAR':
      return { ...state, popular: action.payload };

    case 'TV_TOPRATED':
      return { ...state, toprated: action.payload };

    case 'SEARCH_TVS':
      return {
        ...state,
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
      return { ...state, favorite: favorites };

    case 'DELETE_TV':
      const data = state.favorite.filter((item) => item.id !== action.payload);
      return { ...state, isFetching: false, favorite: data };

    case 'FINISH':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
