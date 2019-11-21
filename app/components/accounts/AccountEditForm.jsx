import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {
  Field, InputField, SelectField,
} from 'react-components';

import { ACCOUNTS_ROLES } from '../../configs/Properties';

const AccountEditForm = ({ handleSubmit, isMyAccount }) => (
  <form onSubmit={handleSubmit}>
    <div className="grid">
      <div className="col-12">
        <Field name="name" component={InputField} placeholder="Identifiant" label="Identifiant" disabled={isMyAccount} />
      </div>
      <div className="col-12">
        <Field name="email" component={InputField} placeholder="Email" label="Email" type="email" />
      </div>
      {!isMyAccount && (
        <div className="col-12">
          <Field name="role" component={SelectField} placeholder="Rôle" label="Rôle" options={ACCOUNTS_ROLES} />
        </div>
      )}
      {isMyAccount && (
        <div className="col-12">
          <Field name="password" component={InputField} placeholder="Mot de passe" label="Mot de passe" type="password" />
        </div>
      )}
    </div>
    <div className="btn-group right">
      <button className="btn" type="submit">
        Enregistrer
      </button>
    </div>
  </form>
);

AccountEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,

  isMyAccount: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'AccountEditForm',
  validate: (values = {}) => {
    const errors = {};

    if (!values.name) errors.name = 'Must be set';
    if (!values.email) errors.email = 'Must be set';

    return errors;
  },
})(AccountEditForm);
