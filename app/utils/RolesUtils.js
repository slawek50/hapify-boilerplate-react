import { size } from 'lodash';

import { ACCOUNTS_ROLES } from '../configs/Properties';

export function isAdmin (userAccount = {}, uniqRole = false) {
  return (!uniqRole || size(userAccount.role) === 1)
    && userAccount.role === ACCOUNTS_ROLES.ADMIN;
}

export function isUser (userAccount = {}, uniqRole = false) {
  return (!uniqRole || size(userAccount.role) === 1)
    && userAccount.role === ACCOUNTS_ROLES.USER;
}

export function isReporter (userAccount = {}, uniqRole = false) {
  return (!uniqRole || size(userAccount.role) === 1)
    && userAccount.role === ACCOUNTS_ROLES.REPORTER;
}

export function canDoSomething (userAccount = {}) {
  return isAdmin(userAccount) || isUser(userAccount);
}
