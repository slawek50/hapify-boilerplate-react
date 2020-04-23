import React from 'react';
import PropTypes from 'prop-types';
import { NumberField as ANumberField } from 'redux-form-antd';

const NumberField = ({ input, ...props }) => (
  <ANumberField
    {...props}
    input={{
      ...input,
      onBlur: () => input.onBlur(input.value),
    }}
  />
);

NumberField.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
};

export default NumberField;
