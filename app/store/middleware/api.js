import { normalize } from 'normalizr';
import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import { map } from 'lodash';
import notification from 'antd/lib/notification';

import { CALL_API } from '../Schemas';
import { API_URL } from '../../configs/Constants';
import { logout } from '../modules/auth';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi (endpoint, schema, method, data, upload = false) {
  const fullUrl = (endpoint.indexOf(API_URL) === -1) ? API_URL + endpoint : endpoint;
  const options = {
    method,
    credentials: 'include',
  };
  if (data !== undefined) {
    Object.assign(options, {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  if (upload === true && data.files && data.files.length > 0) {
    const formData = new FormData();
    data.files.forEach((file) => formData.append('attachment', file, file.name));
    map(data, (value, key) => key !== 'files' && formData.append(key, value));
    Object.assign(options, {
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  return fetch(fullUrl, options)
  .then((response) => response.json()
    .then((json) => ({ json, response }))
    .catch(() => ({ json: {}, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    const responseData = json.items || json;
    if (schema) {
      return {
        entities: normalize(responseData, schema).entities,
      };
    }
    return responseData;
  });
}

function executeAllActions (actions, store) {
  let nextActions;
  if (Array.isArray(actions)) {
    nextActions = actions.map((action) => store.dispatch(action(store.getState())));
  } else {
    nextActions = [store.dispatch(actions(store.getState()))];
  }
  return Promise.all(nextActions);
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    // Check if action is an array of actions to execute
    if (action && Array.isArray(action)) {
      return action.forEach((singleAction) => next(singleAction));
    }
    return next(action);
  }
  let { endpoint, body } = callAPI;
  const {
    schema,
    types,
    method,
    upload,
    successNext,
    errorNext,
    successMessage,
  } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (typeof method !== 'string') {
    throw new Error('Specify a string method.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  if (typeof body === 'function') {
    body = body(store.getState());
  }

  function actionWith (data) {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({
    type: requestType,
  }));
  return callApi(endpoint, schema, method, body, upload)
  .then((response) => {
    const successResponse = next(actionWith({
      response,
      type: successType,
    }));
    if (successNext) {
      return executeAllActions(successNext, store)
      .then((successNextResponse) => {
        if (successMessage) {
          notification.success({ message: successMessage });
        }
        return {
          ...successResponse,
          successNextResponse,
        };
      });
    }
    if (successMessage) {
      notification.success({ message: successMessage });
    }
    return successResponse;
  })
  .catch((error) => {
    if (error && error.message) {
      if (error.message === 'Failed to fetch') {
        notification.error({ message: 'Impossible de se connecter au serveur', duration: 0 });
      } else {
        notification.error({ message: error.message, duration: 0 });
      }
    }
    if (error && error.statusCode === 401) {
      return next(logout());
    }
    next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
      code: error.code,
      data: error.data,
    }));
    if (errorNext) {
      return executeAllActions(errorNext, store);
    }
    throw error.message;
  });
};
