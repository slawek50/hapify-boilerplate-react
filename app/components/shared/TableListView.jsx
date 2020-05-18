import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  get, isString, isArray, isFunction, map, orderBy,
} from 'lodash';
import { Input, Select } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import sharedSelector from '../../selectors/SharedSelector';

const TableListView = ({
  title, className, data, cols, buttons, rowButtons, onClickRow, hideTableHeader,
  search, searchLabel = 'Rechercher',
  sortOptions, sortByDefault, sortOrderDefault = 'asc', sortLabel,
}) => {
  const [searchText, setSearchText] = useState();
  const [searchedData, setSearchedData] = useState(data);
  useEffect(() => {
    if (isString(search) || isArray(search)) {
      return setSearchedData(sharedSelector(data, searchText, search, cols));
    }
    return setSearchedData(data);
  }, [data, searchText, search, cols]);

  const [sort, setSort] = useState({ by: sortByDefault, order: sortOrderDefault });
  const [sortedData, setData] = useState(searchedData);
  useEffect(() => setData(orderBy(
    searchedData,
    (entity) => {
      // Order by the result of value() function in cols object if exists
      const value = get(entity, sort.by);
      const colValue = get(cols, `${sort.by}.value`);
      if (colValue) {
        return colValue(value, entity);
      }
      return value;
    },
    sort.order,
  )), [searchedData, sort]);

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
      <div className="table">
        {!hideTableHeader && (
          <div className="thead">
            <div className="tr">
              <div className="grid">
                {map(cols, (col, colKey) => col && (
                  <div
                    key={colKey}
                    className={col.className + (sort.by === colKey ? ' cln-sorted' : '')}
                    onClick={() => setOrder(colKey)}
                  >
                    <div className={`th${sort.by === colKey && ' sorted'}`}>
                      {col.label}
                      {sort.by === colKey && (
                        sort.order === 'asc' ? <UpOutlined /> : <DownOutlined />
                      )}
                    </div>
                  </div>
                ))}
                {rowButtons && rowButtons()}
              </div>
            </div>
          </div>
        )}
        <div className="tbody">
          {map(sortedData, (row, rowKey) => row && (
            <div className="tr" key={rowKey}>
              <div className="grid">
                {map(cols, (col, colKey) => col && (
                  <div
                    key={colKey}
                    className={col.className}
                    onClick={onClickRow ? () => onClickRow(row) : null}
                  >
                    <div className="td">
                      {
                        (col.render && col.render(row[colKey], row))
                        || (col.value && col.value(row[colKey], row))
                        || row[colKey]
                      }
                    </div>
                  </div>
                ))}
                {rowButtons && rowButtons(row)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TableListView.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.shape()).isRequired,
  cols: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string,
    className: PropTypes.string,
    render: PropTypes.func,
    value: PropTypes.func,
  })).isRequired,
  hideTableHeader: PropTypes.bool,
  buttons: PropTypes.element,
  rowButtons: PropTypes.func,
  onClickRow: PropTypes.func,
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

export default TableListView;
