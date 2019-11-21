import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  Field, TextareaField, FileField, ButtonConfirmModal,
} from 'react-components';

import { uploadFiles, removeFile } from '../../store/modules/uploads';

import { UPLOADS_URL } from '../../configs/Constants';

const UploadContentEditForm = ({
  handleSubmit, onClickDelete, upFiles, rmFile,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="grid-equalHeight">
      <div className="col-4_xs-12">
        <Field
          name="fileNames"
          component={FileField}
          label="Fichiers"
          uploadFiles={upFiles}
          removeFile={rmFile}
          getUrl={(item) => `${UPLOADS_URL}/${item}`}
          isMulti
        />
      </div>
      <div className="col-8_xs-12">
        <Field name="message" component={TextareaField} placeholder="Message" label="Message" />
      </div>

    </div>
    <div className="btn-group right">
      {onClickDelete && (
        <ButtonConfirmModal
          onConfirmationButton={() => onClickDelete()}
          message="Voulez-vous vraiment effacer le contenue d'upload ?"
        >
          <button className="btn btn-secondary" type="button">Supprimer</button>
        </ButtonConfirmModal>
      )}
      <button className="btn" type="submit">
        Enregistrer
      </button>
    </div>
  </form>
);

UploadContentEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func,

  upFiles: PropTypes.func.isRequired,
  rmFile: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'UploadContentEditForm',
  validate: (values = {}) => {
    const errors = {};

    if (!values.message) errors.message = 'Merci d\'ajouter un message à votre envoi.';
    if (!values.fileNames || values.fileNames.length <= 0) errors.fileNames = 'Vous devez joindre au moins un fichier à votre envoi.';

    return errors;
  },
})(connect(
  null,
  { upFiles: uploadFiles, rmFile: removeFile },
)(UploadContentEditForm));
