import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { NavLink } from 'react-router-dom';
import {
  Field, ArrayField, InputField, TextareaField, DateField,
} from 'react-components';

import ModelRepeatableFields from './ModelRepeatableFields';

const ModelEditForm = ({ handleSubmit, baseUrl }) => (
  <form onSubmit={handleSubmit}>
    <div className="grid">
      <Field name="name" component={InputField} placeholder="Nom" label="Nom" className="col-12" />
      <Field name="description" component={TextareaField} placeholder="Description" label="Description" className="col-12" />
      <Field name="date" component={DateField} placeholder="Date" label="Date" className="col-12" />
      <ArrayField
        name="array"
        component={ModelRepeatableFields}
        label="Repeater"
        className="col-12"
        addLabel="Ajouter un élément (+)"
        removable
      />
    </div>

    <div className="btn-group right">
      <button className="btn" type="submit">
        Enregistrer
      </button>

      <NavLink className="btn" to={baseUrl}>
        Annuler
      </NavLink>
    </div>
  </form>
);

ModelEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'ModelEditForm',
  validate: (values = {}) => {
    const errors = {};

    if (!values.name) errors.name = 'Must be set';
    if (!values.description) errors.description = 'Must be set';
    if (!values.date) errors.date = 'Must be set';

    return errors;
  },
})(ModelEditForm);
