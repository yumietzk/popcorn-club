import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import tvReducer from './tvReducer';
import detailReducer from './detailReducer';
import genreReducer from './genreReducer';

export default combineReducers({
  movies: moviesReducer,
  shows: tvReducer,
  detail: detailReducer,
  genre: genreReducer,
});
