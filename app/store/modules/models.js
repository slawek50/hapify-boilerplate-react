import { flow, set } from 'lodash/fp';
import { omit } from 'lodash';

import { CALL_API, Schemas } from '../Schemas';

const FETCH_ALL_MODELS_REQUEST = 'rswa/models/FETCH_ALL_MODELS_REQUEST';
export const FETCH_ALL_MODELS_SUCCESS = 'rswa/models/FETCH_ALL_MODELS_SUCCESS';
const FETCH_ALL_MODELS_FAILURE = 'rswa/models/FETCH_ALL_MODELS_FAILURE';
const FETCH_MODEL_REQUEST = 'rswa/models/FETCH_MODEL_REQUEST';
const FETCH_MODEL_SUCCESS = 'rswa/models/FETCH_MODEL_SUCCESS';
const FETCH_MODEL_FAILURE = 'rswa/models/FETCH_MODEL_FAILURE';
const SET_MODEL_REQUEST = 'rswa/models/SET_MODEL_REQUEST';
const SET_MODEL_SUCCESS = 'rswa/models/SET_MODEL_SUCCESS';
const SET_MODEL_FAILURE = 'rswa/models/SET_MODEL_FAILURE';
const DELETE_MODEL_REQUEST = 'rswa/models/DELETE_MODEL_REQUEST';
const DELETE_MODEL_SUCCESS = 'rswa/models/DELETE_MODEL_SUCCESS';
const DELETE_MODEL_FAILURE = 'rswa/models/DELETE_MODEL_FAILURE';

export const modelsActionsHandlers = {
  [FETCH_ALL_MODELS_REQUEST]: (state) => flow(
    set('loaded.models', false),
    set('loading.models', true),
  )(state),
  [FETCH_ALL_MODELS_SUCCESS]: (state, action) => flow(
    set('entities.models', action.response.entities.models || {}),
    set('loaded.models', true),
    set('loading.models', false),
  )(state),
  [FETCH_ALL_MODELS_FAILURE]: (state) => flow(
    set('loaded.models', 'error'),
    set('loading.models', false),
  )(state),
  [FETCH_MODEL_SUCCESS]: (state, action) => flow(
    set(`entities.models.${action.id}`, action.response.entities.models),
  )(state),
  [SET_MODEL_SUCCESS]: (state, action) => flow(
    set('entities.models', {
      ...state.entities.models,
      ...action.response.entities.models,
    }),
  )(state),
  [DELETE_MODEL_SUCCESS]: (state, action) => flow(
    set('entities.models', omit(state.entities.models, action.id)),
  )(state),
};

export function loadModel (id) {
  return {
    id,
    [CALL_API]: {
      types: [FETCH_MODEL_REQUEST, FETCH_MODEL_SUCCESS, FETCH_MODEL_FAILURE],
      method: 'GET',
      endpoint: `/models/${id}`,
      schema: Schemas.MODEL,
    },
  };
}

export function loadModels () {
  return {
    [CALL_API]: {
      types: [FETCH_ALL_MODELS_REQUEST, FETCH_ALL_MODELS_SUCCESS, FETCH_ALL_MODELS_FAILURE],
      method: 'GET',
      endpoint: '/models',
      schema: Schemas.MODEL_ARRAY,
      successMessage: 'Models fetched successfully',
    },
  };
}

export function createOrUpdateModel (model) {
  return {
    [CALL_API]: {
      types: [SET_MODEL_REQUEST, SET_MODEL_SUCCESS, SET_MODEL_FAILURE],
      method: !model || !Number.isInteger(model.model_id) ? 'POST' : 'PUT',
      endpoint: !model || !Number.isInteger(model.model_id) ? '/models' : `/models/${model.model_id}`,
      schema: Schemas.MODEL,
      body: model,
      successMessage: 'Models saved successfully',
    },
  };
}

export function deleteModel (id) {
  return {
    id,
    [CALL_API]: {
      types: [DELETE_MODEL_REQUEST, DELETE_MODEL_SUCCESS, DELETE_MODEL_FAILURE],
      method: 'DELETE',
      endpoint: `/models/${id}`,
      successMessage: 'Models deleted successfully',
    },
  };
}
