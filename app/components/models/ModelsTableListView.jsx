import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { capitalize } from 'lodash';
import { ButtonConfirmModal } from 'react-components';

import TableListView from '../shared/TableListView';

const ModelsTableListView = ({
  history: { push }, models, baseUrl, onClickDelete,
}) => (
  <TableListView
    title="Table de modèles"
    className=""
    data={models}
    cols={{
      model_id: {
        label: 'Identifiant',
        className: 'col_sm-12 id',
      },
      name: {
        label: 'Nom',
        className: 'col-6_sm-12',
        render: capitalize,
      },
    }}
    buttons={(
      <>
        <NavLink className="btn" to={`${baseUrl}/new`}>
          Créer un modèle
        </NavLink>
      </>
    )}
    rowButtons={(model) => (
      <div className="col-2_sm-12">
        <div className="td td-buttons">
          {model && (
            <NavLink className="btn" to={`${baseUrl}/${model.model_id}/edit`}>
              <i className="far fa-pencil" />
            </NavLink>
          )}
          {model && (
            <ButtonConfirmModal
              onConfirmationButton={() => onClickDelete(model.model_id)}
              message="Voulez-vous vraiment effacer le modèle ?"
            >
              <button className="btn" type="button">
                <i className="far fa-trash" />
              </button>
            </ButtonConfirmModal>
          )}
        </div>
      </div>
    )}
    onClickRow={(model) => push(`${baseUrl}/${model.model_id}`)}
    search="name"
    searchLabel="Rechercher un modèle"
    sortByDefault="name"
    sortOrderDefault="desc"
  />
);

ModelsTableListView.propTypes = {
  models: PropTypes.objectOf(PropTypes.shape({
    model_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,

  baseUrl: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ModelsTableListView);
