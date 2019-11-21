import { createSelector } from 'reselect';
import { pickBy, toLower } from 'lodash';

export default createSelector(
  [
    (accounts) => accounts,
    (accounts, textFilter) => toLower(textFilter),
  ],
  (accounts, textFilter) => (
    textFilter
      ? pickBy(accounts, (a) => toLower(a.username).includes(textFilter)
        || toLower(a.email).includes(textFilter)
        || toLower(a.lastname).includes(textFilter)
        || toLower(a.firstname).includes(textFilter))
      : accounts
  ),
);
