import { combineReducers } from 'redux';
import authReducer from './authReducer';
import configReducer from './configReducer';
import movieReducer from './movieReducer';
import tvReducer from './tvReducer';
import detailReducer from './detailReducer';
import personReducer from './personReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  conf: configReducer,
  movies: movieReducer,
  shows: tvReducer,
  detail: detailReducer,
  person: personReducer,
  error: errorReducer,
});
