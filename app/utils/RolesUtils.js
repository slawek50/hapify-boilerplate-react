export function isAdmin (userAccount = {}) {
  return userAccount.role === 'admin';
}

export function isUser (userAccount = {}) {
  return userAccount.role === 'user';
}

export function isReporter (userAccount = {}) {
  return userAccount.role === 'reporter';
}

export function canDoSomething (userAccount = {}) {
  return isAdmin(userAccount) || isUser(userAccount);
}
