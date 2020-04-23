import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxGroupField as ACheckboxGroupField } from 'redux-form-antd';

const CheckboxGroupField = ({ input, ...props }) => (
  <ACheckboxGroupField
    {...props}
    input={{
      ...input,
      onBlur: () => input.onBlur(input.value),
    }}
  />
);

CheckboxGroupField.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.any,
  }).isRequired,
};

export default CheckboxGroupField;
