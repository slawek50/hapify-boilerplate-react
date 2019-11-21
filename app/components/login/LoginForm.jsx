import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Field, InputField, validateEmail } from 'react-components';

const LoginForm = ({ handleSubmit, onClickRecoverPassword }) => (
  <div className="box animated">
    <div className="box-header">
      <div className="logo" />
      <div className="separator" />
      <h1>Login</h1>
    </div>
    <div className="box-content">
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <Field name="email" component={InputField} type="email" label="Email" placeholder="Adresse email" fontIcon="far fa-user" className="field" />
        <Field name="password" component={InputField} type="password" label="Mot de passe" placeholder="Mot de passe" fontIcon="far fa-lock" className="field" />
        <button
          className="btn btn-full"
          type="submit"
        >
          Se connecter
        </button>
        <div className="form-separator" />
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-link btn-full"
            onClick={onClickRecoverPassword}
          >
            Mot de passe oublié
          </button>
        </div>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClickRecoverPassword: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'LoginForm',
  validate: (values = {}) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Champ obligatoire';
    } else if (!validateEmail(values.email)) {
      errors.email = 'Veuillez saisir une adresse email';
    }
    return errors;
  },
})(LoginForm);
