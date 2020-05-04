import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  isString, isArray, isFunction, map, orderBy,
} from 'lodash';
import { Input, Select } from 'antd';

import sharedSelector from '../../selectors/SharedSelector';

const CardListView = ({
  title, className, data, cardComponent, buttons,
  search, searchLabel = 'Rechercher',
  sortOptions, sortByDefault, sortOrderDefault = 'asc', sortLabel,
}) => {
  const [searchText, setSearchText] = useState();
  const [searchedData, setSearchedData] = useState(data);
  useEffect(() => {
    if (isString(search) || isArray(search)) {
      return setSearchedData(sharedSelector(data, searchText, search));
    }
    return setSearchedData(data);
  }, [data, searchText, search]);

  const [sort, setSort] = useState({ by: sortByDefault, order: sortOrderDefault });
  const [sortedData, setSortedData] = useState(searchedData);
  useEffect(() => setSortedData(orderBy(searchedData, sort.by, sort.order)), [searchedData, sort]);

  const setOrder = (by) => setSort({ by, order: (sort.by !== by || sort.order !== 'asc') ? 'asc' : 'desc' });

  return (
    <div className={className}>
      <div className="toolbar">
        {title && (
          <div className="toolbar-title">
            {title}
          </div>
        )}
        {(search || buttons) && (
          <div className="toolbar-actions">
            {(search) && (
              <div className="toolbar-search">
                <Input
                  placeholder={searchLabel}
                  value={searchText}
                  onChange={(e) => {
                    if (isFunction(search)) {
                      return search(e.target.value);
                    }
                    return setSearchText(e.target.value);
                  }}
                />
              </div>
            )}
            {isArray(sortOptions) && (
              <Select
                placeholder={sortLabel}
                value={sort.by}
                onChange={setOrder}
              >
                {map(sortOptions, (value) => (
                  <Select.Option key={value} value={value}>{value}</Select.Option>
                ))}
              </Select>
            )}
            {buttons && (
              <div className="toolbar-buttons">
                {buttons}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="grid-equalHeight">
        {map(sortedData, (item, itemKey) => item && (
          <Fragment key={itemKey}>
            {cardComponent && cardComponent(item, itemKey)}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

CardListView.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.shape()).isRequired,
  cardComponent: PropTypes.func.isRequired,
  buttons: PropTypes.element,
  search: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  searchLabel: PropTypes.string,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  sortLabel: PropTypes.string,
  sortByDefault: PropTypes.string,
  sortOrderDefault: PropTypes.string,
};

export default CardListView;
