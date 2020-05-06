import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import getRules from '../../utils/RulesValidator';

const PasswordRecoverForm = ({ onSubmit, initialValues, onClickCancel }) => (
  <div className="box animated fadeInDown">
    <div className="box-header">
      <div className="logo" />
      <div className="separator" />
      <h1>Mot de passe oublié</h1>
    </div>
    <div className="box-content">
      <p className="text-center">Veillez saisir votre adresse email afin de recevoir un nouveau mot de passe.</p>
      <Form
        onFinish={(v) => onSubmit({ ...initialValues, ...v })}
        initialValues={initialValues}
        className="login-form"
      >
        <Form.Item name="email" label="Email" rules={getRules('email', true)} hasFeedback>
          <Input placeholder="Adresse email" prefix={<UserOutlined />} />
        </Form.Item>

        <Button type="primary" htmlType="submit">Envoyer</Button>

        <div className="form-separator" />

        <div className="btn-group">
          <Button type="link" block onClick={onClickCancel}>Annuler</Button>
        </div>
      </Form>
    </div>
  </div>
);

PasswordRecoverForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape().isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default (PasswordRecoverForm);
