import React from 'react';
import PropTypes from 'prop-types';
import { Field, InputField } from 'react-components';

const ModelRepeatableFields = ({ field, onClickRemove }) => (
  <div className="grid">
    <Field name={`${field}.type`} component={InputField} placeholder="Sélectionner" className="col-4" />
    <Field name={`${field}.value`} component={InputField} type="tel" placeholder="n°" className="col-4" />
    <div className="col-4">
      <button type="button" onClick={onClickRemove} aria-label="Remove"><i className="fa fa-times" /></button>
    </div>
  </div>
);

ModelRepeatableFields.propTypes = {
  field: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func,
};

export default (ModelRepeatableFields);
