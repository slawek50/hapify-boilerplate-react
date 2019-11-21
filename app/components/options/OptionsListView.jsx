import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { map } from 'lodash';

const OptionsListView = ({ options, baseUrl }) => (
  <div>
    <h1>Liste des Options</h1>
    <ul>
      {map(options, (option, optionName) => (
        <li key={optionName}>
          <NavLink to={`${baseUrl}/${optionName}/edit`}>
            {optionName}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

OptionsListView.propTypes = {
  options: PropTypes.shape().isRequired,

  baseUrl: PropTypes.string.isRequired,
};

export default OptionsListView;
