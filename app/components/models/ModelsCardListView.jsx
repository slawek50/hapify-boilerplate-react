import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ButtonConfirmModal } from 'react-components';

import CardListView from '../shared/CardListView';
import { UPLOADS_URL } from '../../configs/Constants';


const ModelsCardListView = ({
  models, baseUrl, onClickDelete,
}) => (
  <CardListView
    title="Modèles Card Display"
    className="card-list-models"
    data={models}
    cardComponent={(model) => (
      <div className="col-3_xs-12_sm-6_md-4">
        <div className="card box picture-bg">
          <div className="card-header-picture">
            <img src={`${UPLOADS_URL}/${model.picture}`} alt={model.picture} />
          </div>
          <div className="box-content">
            <div className="card-overlay">
              <div className="grid">
                {model.model_id && (
                  <div className="col-12">
                    {model.model_id}
                  </div>
                )}
                {model.name && (
                  <div className="col-12">
                    {model.name}
                  </div>
                )}
                {model.adress && (
                  <div className="col-12">
                    {model.adress}
                  </div>
                )}
                {model.mail && (
                  <div className="col-12">
                    {model.mail}
                  </div>
                )}
                {model.number && (
                  <div className="col-12">
                    {model.number}
                  </div>
                )}
              </div>
              <div className="card-overlay-mask">
                <div />
              </div>
            </div>
            <div className="card-actions btn-group">
              <NavLink to={`${baseUrl}/${model.model_id}/edit`} className="btn">
                <i className="far fa-pencil" />
                <span>Modifier</span>
              </NavLink>
              {onClickDelete && (
                <ButtonConfirmModal
                  onConfirmationButton={() => onClickDelete(model.model_id)}
                  message="Voulez-vous vraiment effacer le modèle ?"
                >
                  <button className="btn" type="button">
                    <i className="far fa-trash" />
                    <span>Supprimer</span>
                  </button>
                </ButtonConfirmModal>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    buttons={(
      <div>
        <NavLink className="btn" to={`${baseUrl}/new`}>
          Créer un modèle
        </NavLink>
      </div>
    )}
    search="name"
    searchLabel="Rechercher un modèle"
    sortOptions={[{ value: 'name', label: 'Name' }, { value: 'model_id', label: 'ID' }]}
    sortLabel="Sort Order"
    sortByDefault="name"
    sortOrderDefault="desc"
  />
);

ModelsCardListView.propTypes = {
  models: PropTypes.objectOf(PropTypes.shape({
    model_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,

  baseUrl: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
};

export default (ModelsCardListView);
