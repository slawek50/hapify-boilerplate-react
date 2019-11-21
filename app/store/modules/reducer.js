import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import auth from './auth';

export default combineReducers({
  data: app,
  auth,
  form: formReducer,
});
