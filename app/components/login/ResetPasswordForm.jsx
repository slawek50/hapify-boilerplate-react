import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Field, InputField } from 'react-components';

const ResetPasswordForm = ({ handleSubmit }) => (
  <div className="box animated fadeInDown">
    <div className="box-header">
      <div className="logo" />
      <div className="separator" />
      <h1>Réinitialisation du mot de passe</h1>
    </div>
    <div className="box-content">
      <p className="text-center">Veillez saisir votre nouveau mot de passe.</p>
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <Field name="password" component={InputField} type="password" label="Mot de passe" placeholder="Mot de passe" fontIcon="far fa-lock" className="field" />
        <Field name="verification" component={InputField} type="password" label="Vérification" placeholder="Vérification" fontIcon="far fa-lock" className="field" />
        <button
          className="btn btn-full"
          type="submit"
        >
          Enregistrer
        </button>
      </form>
    </div>
  </div>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ResetPasswordForm',
  validate: (values = {}) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Champ obligatoire';
    } else if (values.password !== values.verification) {
      errors.verification = 'Les deux champs ne sont pas identiques';
    }
    return errors;
  },
})(ResetPasswordForm);
