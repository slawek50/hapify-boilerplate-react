import { flow, set } from 'lodash/fp';

import { CALL_API } from '../Schemas';

const LOGIN_REQUEST = 'rswa/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'rswa/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'rswa/auth/LOGIN_FAIL';
const LOGOUT_REQUEST = 'rswa/auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'rswa/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'rswa/auth/LOGOUT_FAIL';
const RECOVER_PASSWORD_REQUEST = 'rswa/auth/RECOVER_PASSWORD_REQUEST';
export const RECOVER_PASSWORD_SUCCESS = 'rswa/auth/RECOVER_PASSWORD_SUCCESS';
const RECOVER_PASSWORD_FAILURE = 'rswa/auth/RECOVER_PASSWORD_FAILURE';
const RESET_PASSWORD_REQUEST = 'rswa/auth/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'rswa/auth/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILURE = 'rswa/auth/RESET_PASSWORD_FAILURE';

export default function reducer (state = {}, action = {}) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return flow(
      set('loggingIn', false),
      set('user', action.response),
    )(state);
  case LOGIN_FAIL:
    return flow(
      set('loggingIn', false),
      set('user', null),
    )(state);
  case LOGOUT_REQUEST:
    return flow(
      set('loggingOut', true),
    )(state);
  case LOGOUT_SUCCESS:
    return flow(
      set('loggingOut', false),
      set('user', null),
    )(state);
  case LOGOUT_FAIL:
    return flow(
      set('loggingOut', false),
    )(state);
  default:
    return state;
  }
}

export function login (email, password) {
  return {
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
      method: 'POST',
      endpoint: '/password/login',
      body: {
        email,
        password,
      },
    },
  };
}

export function logout () {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function recoverPassword (email) {
  return {
    [CALL_API]: {
      types: [RECOVER_PASSWORD_REQUEST, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILURE],
      method: 'PUT',
      endpoint: '/auth/password',
      body: {
        email,
      },
    },
  };
}

export function resetPassword (accountId, resetToken, password) {
  return {
    [CALL_API]: {
      types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
      method: 'PUT',
      endpoint: '/auth/reset-password',
      body: {
        accountId,
        resetToken,
        password,
      },
    },
  };
}
