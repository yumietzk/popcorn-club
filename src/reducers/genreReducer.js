export default (state = {}, action) => {
  switch (action.type) {
    // movie
    case 'FETCH_ACTION':
      return { ...state, action: action.payload };

    case 'FETCH_ADVENTURE':
      return { ...state, adventure: action.payload };

    case 'FETCH_ANIMATION':
      return { ...state, animation: action.payload };

    case 'FETCH_COMEDY':
      return { ...state, comedy: action.payload };

    case 'FETCH_DOCUMENTARY':
      return { ...state, documentary: action.payload };

    case 'FETCH_DRAMA':
      return { ...state, drama: action.payload };

    case 'FETCH_FANTASY':
      return { ...state, fantasy: action.payload };

    case 'FETCH_HORROR':
      return { ...state, horror: action.payload };

    case 'FETCH_ROMANCE':
      return { ...state, romance: action.payload };

    case 'FETCH_SCIFI':
      return { ...state, scifi: action.payload };

    // tv
    case 'FETCH_ACTIONADVENTURESHOW':
      return { ...state, actionadventureshow: action.payload };

    case 'FETCH_ANIMATIONSHOW':
      return { ...state, animationshow: action.payload };

    case 'FETCH_COMEDYSHOW':
      return { ...state, comedyshow: action.payload };

    case 'FETCH_CRIMESHOW':
      return { ...state, crimeshow: action.payload };

    case 'FETCH_DOCUMENTARYSHOW':
      return { ...state, documentaryshow: action.payload };

    case 'FETCH_DRAMASHOW':
      return { ...state, dramashow: action.payload };

    case 'FETCH_KIDSSHOW':
      return { ...state, kidsshow: action.payload };

    case 'FETCH_MYSTERYSHOW':
      return { ...state, mysteryshow: action.payload };

    case 'FETCH_REALITYSHOW':
      return { ...state, realityshow: action.payload };

    default:
      return state;
  }
};
