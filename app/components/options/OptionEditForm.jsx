import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Field, InputField, TextareaField } from 'react-components';

const OptionEditForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="grid">
      <div className="col-12">
        <Field name="name" component={InputField} placeholder="Nom" label="Nom" disabled />
      </div>
      <div className="col-12">
        <Field name="data" component={TextareaField} placeholder="Données" />
      </div>
    </div>
    <div className="btn-group right">
      <button className="btn" type="submit">
        Enregistrer
      </button>
    </div>
  </form>
);

OptionEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'OptionEditForm',
  validate: (values = {}) => {
    const errors = {};

    if (!values.name) errors.data = 'Must be set';

    return errors;
  },
})(OptionEditForm);
