import React from 'react';
import PropTypes from 'prop-types';
import { SwitchField as ASwitchField } from 'redux-form-antd';

const SwitchField = ({ input, ...props }) => (
  <ASwitchField
    {...props}
    input={{
      ...input,
      onBlur: () => input.onBlur(input.value),
    }}
  />
);

SwitchField.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
};

export default SwitchField;
