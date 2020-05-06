import { flow, set } from 'lodash/fp';

import { LOAD } from 'redux-storage';

import { LOGOUT_SUCCESS } from './auth';
import initialState from '../initialState';

const SET_CONFIG = 'htwp/globals/SET_CONFIG';

export const globalsActionsHandlers = {
  [SET_CONFIG]: (state, action) => flow(
    set(`config.${action.key}`, action.value),
  )(state),
  [LOAD]: (state) => flow(
    set('loaded.appstorage', 'loaded'),
  )(state),
  [LOGOUT_SUCCESS]: (state) => ({
    ...initialState,
    loaded: {
      ...initialState.loaded,
      appstorage: state.loaded.appstorage,
    },
  }),
};

export function setConfig (key, value) {
  return {
    type: SET_CONFIG,
    key,
    value,
  };
}
