import { flow, set } from 'lodash/fp';

import { CALL_API } from '../Schemas';

const FETCH_OPTION_REQUEST = 'rswa/options/FETCH_OPTION_REQUEST';
const FETCH_OPTION_SUCCESS = 'rswa/options/FETCH_OPTION_SUCCESS';
const FETCH_OPTION_FAILURE = 'rswa/options/FETCH_OPTION_FAILURE';
const UPDATE_OPTION_REQUEST = 'rswa/options/UPDATE_OPTION_REQUEST';
const UPDATE_OPTION_SUCCESS = 'rswa/options/UPDATE_OPTION_SUCCESS';
const UPDATE_OPTION_FAILURE = 'rswa/options/UPDATE_OPTION_FAILURE';

export const optionsActionsHandlers = {
  [FETCH_OPTION_REQUEST]: (state) => flow(
    set('loaded.options', 'loading'),
  )(state),
  [FETCH_OPTION_SUCCESS]: (state, action) => flow(
    set(`entities.options.${action.optionName}`, action.response.data),
    set('loaded.options', 'loaded'),
  )(state),
  [FETCH_OPTION_FAILURE]: (state) => flow(
    set('loaded.options', 'error'),
  )(state),
  [UPDATE_OPTION_SUCCESS]: (state, action) => flow(
    set(`entities.options.${action.optionName}`, action.response.data),
  )(state),
};

export function loadOption (optionName) {
  return {
    optionName,
    [CALL_API]: {
      types: [FETCH_OPTION_REQUEST, FETCH_OPTION_SUCCESS, FETCH_OPTION_FAILURE],
      method: 'GET',
      endpoint: `/options/${optionName}`,
    },
  };
}

export function updateOption (optionName, optionData) {
  return {
    optionName,
    [CALL_API]: {
      types: [UPDATE_OPTION_REQUEST, UPDATE_OPTION_SUCCESS, UPDATE_OPTION_FAILURE],
      method: 'PUT',
      endpoint: `/options/${optionName}`,
      body: { data: optionData },
    },
  };
}
