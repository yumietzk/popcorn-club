export default (state = {}, action) => {
  switch (action.type) {
    // case 'TV_ONAIR':
    //   return [...state, ...action.payload];

    case 'TV_ONAIR':
      return { ...state, onair: action.payload };

    case 'TV_POPULAR':
      return { ...state, popular: action.payload };

    case 'TV_TOPRATED':
      return { ...state, toprated: action.payload };

    case 'SEARCH_TVS':
      return { ...state, search: action.payload };

    case 'SAVE_TV':
    case 'FAVORITE_TVS':
      return { ...state, favorite: action.payload };

    default:
      return state;
  }
};
