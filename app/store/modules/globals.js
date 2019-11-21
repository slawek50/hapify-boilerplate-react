import { flow, set } from 'lodash/fp';

import { LOAD } from 'redux-storage';

import { LOGOUT_SUCCESS } from './auth';
import initialState from '../initialState';

const SET_MESSAGE = 'htwp/globals/SET_MESSAGE';
const SET_CONFIG = 'htwp/globals/SET_CONFIG';

export const globalsActionsHandlers = {
  [SET_MESSAGE]: (state, action) => flow(
    set('message', {
      text: action.text,
      messageType: action.messageType,
      delay: action.delay,
    }),
  )(state),
  [SET_CONFIG]: (state, action) => flow(
    set(`config.${action.key}`, action.value),
  )(state),
  [LOAD]: (state) => flow(
    set('loaded.appstorage', true),
  )(state),
  [LOGOUT_SUCCESS]: () => ({
    ...initialState,
    loaded: {
      ...initialState.loaded,
      appstorage: true,
    },
  }),
};

export function setMessage (text = '', messageType = 'error', delay = 0) {
  return {
    type: SET_MESSAGE,
    text,
    messageType,
    delay,
  };
}

export function setConfig (key, value) {
  return {
    type: SET_CONFIG,
    key,
    value,
  };
}
