import { createSelector } from 'reselect';
import { pickBy, toLower } from 'lodash';

export default createSelector(
  [
    (entities1) => entities1,
    (entities1, entities2) => entities2,
    (entities1, entities2, textFilter) => toLower(textFilter),
  ],
  (entities1, entities2, textFilter) => (
    (textFilter)
      ? pickBy(entities1, (e1) => toLower(entities2[e1.entity2_id].title).includes(textFilter)
          || toLower(e1.title).includes(textFilter))
      : entities1
  ),
);
