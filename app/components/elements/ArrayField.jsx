import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import classNames from 'classnames';

const ArrayField = ({
  name, className, component, removable, addLabel, ...props
}) => (
  <FieldArray
    name={name}
    component={({ fields, meta: { error, submitFailed } }) => (
      <div className={classNames(className)}>
        { Array.isArray(fields) && fields.map((field, index) => (
          <Fragment key={field}>
            <Field
              name={field}
              component={component}
              {...props}
            />
            {removable && (
              <div className="btn-group">
                <button type="button" className="btn btn-primary btn-small" onClick={() => fields.remove(index)}>
                  <i className="far fa-times" />
                </button>
              </div>
            )}
          </Fragment>
        ))}
        {addLabel && (
          <div className="btn-group">
            <button type="button" className="btn btn-primary btn-small" onClick={() => fields.push()}>
              {addLabel}
              <i className="far fa-plus" />
            </button>
          </div>
        )}
        {submitFailed && error && (
          <div className="ant-form-item-control has-error">
            <div className="ant-form-explain show-help-enter show-help-enter-active">
              {error}
            </div>
          </div>
        )}
      </div>
    )}
  />
);

ArrayField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,

  component: PropTypes.func.isRequired,
  removable: PropTypes.bool,
  addLabel: PropTypes.string.isRequired,
};

export default ArrayField;
