import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import tvReducer from './tvReducer';
import detailReducer from './detailReducer';
import genreReducer from './genreReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  movies: movieReducer,
  shows: tvReducer,
  detail: detailReducer,
  genre: genreReducer,
  error: errorReducer,
});
