import { combineReducers } from 'redux';
import authReducer from './authReducer';
import configReducer from './configReducer';
import movieReducer from './movieReducer';
import tvReducer from './tvReducer';
import detailReducer from './detailReducer';
import genreReducer from './genreReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  conf: configReducer,
  movies: movieReducer,
  shows: tvReducer,
  detail: detailReducer,
  genre: genreReducer,
  error: errorReducer,
});
