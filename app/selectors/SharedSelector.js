import { createSelector } from 'reselect';
import {
  pickBy, find, toLower, isArray,
} from 'lodash';
import removeAccents from 'remove-accents';
import striptags from 'striptags';

const getValue = (entity, property, cols) => {
  const displayedValue = cols && cols[property] && cols[property].value
    ? cols[property].value(entity[property], entity)
    : entity[property];
  return striptags(removeAccents(toLower(displayedValue)));
};

export default createSelector(
  [
    (data) => data,
    (data, textFilter) => removeAccents(toLower(textFilter)),
    (data, textFilter, propertyName) => propertyName,
    (data, textFilter, propertyName, cols) => cols,
  ],
  (data, textFilter, propertyName, cols) => {
    if (!textFilter || !propertyName) {
      return data;
    }
    if (isArray(propertyName)) {
      return pickBy(data, (entity) => find(
        propertyName,
        (prop) => getValue(entity, prop, cols).includes(textFilter),
      ) !== undefined);
    }
    return pickBy(data, (entity) => getValue(entity, propertyName, cols).includes(textFilter));
  },
);
