import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Field, InputField, validateEmail } from 'react-components';

const PasswordRecoverForm = ({ handleSubmit, onClickCancel }) => (
  <div className="box animated fadeInDown">
    <div className="box-header">
      <div className="logo" />
      <div className="separator" />
      <h1>Mot de passe oublié</h1>
    </div>
    <div className="box-content">
      <p className="text-center">Veillez saisir votre adresse email afin de recevoir un nouveau mot de passe.</p>
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <Field name="email" component={InputField} type="text" label="Email" placeholder="Adresse email" className="field" fontIcon="far fa-user" />
        <button
          className="btn btn-full"
          type="submit"
        >
          Envoyer
        </button>
        <div className="form-separator" />
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-link btn-full"
            onClick={onClickCancel}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
);

PasswordRecoverForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'PasswordRecoverForm',
  validate: (values = {}) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Champ obligatoire';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Veuillez saisir une adresse email';
    }
    return errors;
  },
})(PasswordRecoverForm);
