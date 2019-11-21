import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { map } from 'lodash';

const ModelsListView = ({ models, baseUrl }) => (
  <div>
    <div className="toolbar">
      <div className="toolbar-title">
        Liste des Modèles
      </div>
      <div className="toobar-actions">
        <NavLink className="btn" to={`${baseUrl}/new`}>
          Créer un modèle
        </NavLink>
      </div>
    </div>
    <ul>
      {map(models, (model) => (
        <li key={model.model_id}>
          <NavLink to={`${baseUrl}/${model.model_id}`}>
            {model.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

ModelsListView.propTypes = {
  models: PropTypes.objectOf(PropTypes.shape({
    model_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,

  baseUrl: PropTypes.string.isRequired,
};

export default ModelsListView;
