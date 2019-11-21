import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ButtonConfirmModal } from 'react-components';

const ModelDetailView = ({
  model = {}, baseUrl, onClickDelete,
}) => (
  <div>
    <div>
      Name:&nbsp;
      {model.name}
    </div>
    <div>
      Description:&nbsp;
      {model.description}
    </div>
    <div>
      Date:&nbsp;
      {model.date}
    </div>

    <div className="btn-group right">
      <NavLink className="btn" to={`${baseUrl}/${model.model_id}/edit`}>
        Modifier
      </NavLink>

      {onClickDelete && (
        <ButtonConfirmModal
          onConfirmationButton={() => onClickDelete()}
          message="Voulez-vous vraiment effacer le modèle ?"
        >
          <button className="btn" type="button">Supprimer</button>
        </ButtonConfirmModal>
      )}
    </div>
  </div>
);

ModelDetailView.propTypes = {
  model: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,

  baseUrl: PropTypes.string.isRequired,
  onClickDelete: PropTypes.func,
};

export default ModelDetailView;
