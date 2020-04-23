import { flow, set } from 'lodash/fp';
import { omit } from 'lodash';

import { CALL_API, Schemas } from '../Schemas';

const FETCH_ALL_ACCOUNTS_REQUEST = 'rswa/accounts/FETCH_ALL_ACCOUNTS_REQUEST';
export const FETCH_ALL_ACCOUNTS_SUCCESS = 'rswa/accounts/FETCH_ALL_ACCOUNTS_SUCCESS';
const FETCH_ALL_ACCOUNTS_FAILURE = 'rswa/accounts/FETCH_ALL_ACCOUNTS_FAILURE';
const FETCH_ACCOUNT_REQUEST = 'rswa/accounts/FETCH_ACCOUNT_REQUEST';
const FETCH_ACCOUNT_SUCCESS = 'rswa/accounts/FETCH_ACCOUNT_SUCCESS';
const FETCH_ACCOUNT_FAILURE = 'rswa/accounts/FETCH_ACCOUNT_FAILURE';
const SET_ACCOUNT_REQUEST = 'rswa/accounts/SET_ACCOUNT_REQUEST';
const SET_ACCOUNT_SUCCESS = 'rswa/accounts/SET_ACCOUNT_SUCCESS';
const SET_ACCOUNT_FAILURE = 'rswa/accounts/SET_ACCOUNT_FAILURE';
const DELETE_ACCOUNT_REQUEST = 'rswa/accounts/DELETE_ACCOUNT_REQUEST';
const DELETE_ACCOUNT_SUCCESS = 'rswa/accounts/DELETE_ACCOUNT_SUCCESS';
const DELETE_ACCOUNT_FAILURE = 'rswa/accounts/DELETE_ACCOUNT_FAILURE';

export const accountsActionsHandlers = {
  [FETCH_ALL_ACCOUNTS_REQUEST]: (state) => flow(
    set('loaded.accounts', 'loading'),
  )(state),
  [FETCH_ALL_ACCOUNTS_SUCCESS]: (state, action) => flow(
    set('entities.accounts', action.response.entities.accounts || {}),
    set('loaded.accounts', 'loaded'),
  )(state),
  [FETCH_ALL_ACCOUNTS_FAILURE]: (state) => flow(
    set('loaded.accounts', 'error'),
  )(state),
  [FETCH_ACCOUNT_SUCCESS]: (state, action) => flow(
    set(`entities.accounts.${action.id}`, action.response.entities.accounts),
  )(state),
  [SET_ACCOUNT_SUCCESS]: (state, action) => flow(
    set('entities.accounts', {
      ...state.entities.accounts,
      ...action.response.entities.accounts,
    }),
  )(state),
  [DELETE_ACCOUNT_SUCCESS]: (state, action) => flow(
    set('entities.accounts', omit(state.entities.accounts, action.id)),
  )(state),
};

export function loadAccount (id) {
  return {
    id,
    [CALL_API]: {
      types: [
        FETCH_ACCOUNT_REQUEST,
        FETCH_ACCOUNT_SUCCESS,
        FETCH_ACCOUNT_FAILURE,
      ],
      method: 'GET',
      endpoint: `/accounts/${id}`,
      schema: Schemas.ACCOUNT,
    },
  };
}

export function loadAccounts () {
  return {
    [CALL_API]: {
      types: [
        FETCH_ALL_ACCOUNTS_REQUEST,
        FETCH_ALL_ACCOUNTS_SUCCESS,
        FETCH_ALL_ACCOUNTS_FAILURE,
      ],
      method: 'GET',
      endpoint: '/accounts',
      schema: Schemas.ACCOUNT_ARRAY,
      successMessage: 'Accounts fetched successfully',
    },
  };
}

export function createOrUpdateAccount (account, isMyAccount = false) {
  return {
    [CALL_API]: {
      types: [
        SET_ACCOUNT_REQUEST,
        SET_ACCOUNT_SUCCESS,
        SET_ACCOUNT_FAILURE,
      ],
      method: !account || !Number.isInteger(account.account_id) ? 'POST' : 'PUT',
      endpoint: !account || !Number.isInteger(account.account_id) ? '/accounts' : `/accounts/${account.account_id}`,
      schema: Schemas.ACCOUNT,
      body: account,
      successMessage: isMyAccount ? 'Votre compte a été mis à jour' : null,
    },
  };
}

export function deleteAccount (id) {
  return {
    id,
    [CALL_API]: {
      types: [
        DELETE_ACCOUNT_REQUEST,
        DELETE_ACCOUNT_SUCCESS,
        DELETE_ACCOUNT_FAILURE,
      ],
      method: 'DELETE',
      endpoint: `/accounts/${id}`,
      successMessage: 'Accounts deleted successfully',
    },
  };
}
