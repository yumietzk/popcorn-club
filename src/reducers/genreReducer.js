export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_BYGENRE':
      return { ...state, isFetching: true };

    // movie
    case 'FETCH_ACTION':
      return { ...state, isFetching: false, action: action.payload };

    case 'FETCH_ADVENTURE':
      return { ...state, isFetching: false, adventure: action.payload };

    case 'FETCH_ANIMATION':
      return { ...state, isFetching: false, animation: action.payload };

    case 'FETCH_COMEDY':
      return { ...state, isFetching: false, comedy: action.payload };

    case 'FETCH_DOCUMENTARY':
      return { ...state, isFetching: false, documentary: action.payload };

    case 'FETCH_DRAMA':
      return { ...state, isFetching: false, drama: action.payload };

    case 'FETCH_FANTASY':
      return { ...state, isFetching: false, fantasy: action.payload };

    case 'FETCH_HORROR':
      return { ...state, isFetching: false, horror: action.payload };

    case 'FETCH_ROMANCE':
      return { ...state, isFetching: false, romance: action.payload };

    case 'FETCH_SCIFI':
      return { ...state, isFetching: false, scifi: action.payload };

    // tv
    case 'FETCH_ACTIONADVENTURESHOW':
      return {
        ...state,
        isFetching: false,
        actionadventureshow: action.payload,
      };

    case 'FETCH_ANIMATIONSHOW':
      return { ...state, isFetching: false, animationshow: action.payload };

    case 'FETCH_COMEDYSHOW':
      return { ...state, isFetching: false, comedyshow: action.payload };

    case 'FETCH_CRIMESHOW':
      return { ...state, isFetching: false, crimeshow: action.payload };

    case 'FETCH_DOCUMENTARYSHOW':
      return { ...state, isFetching: false, documentaryshow: action.payload };

    case 'FETCH_DRAMASHOW':
      return { ...state, isFetching: false, dramashow: action.payload };

    case 'FETCH_KIDSSHOW':
      return { ...state, isFetching: false, kidsshow: action.payload };

    case 'FETCH_MYSTERYSHOW':
      return { ...state, isFetching: false, mysteryshow: action.payload };

    case 'FETCH_REALITYSHOW':
      return { ...state, isFetching: false, realityshow: action.payload };

    default:
      return state;
  }
};
