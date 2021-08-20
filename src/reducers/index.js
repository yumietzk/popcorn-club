import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import tvReducer from './tvReducer';
import detailReducer from './detailReducer';
import genreReducer from './genreReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  movies: movieReducer,
  shows: tvReducer,
  detail: detailReducer,
  genre: genreReducer,
  error: errorReducer,
});
