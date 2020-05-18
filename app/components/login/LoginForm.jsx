import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import getRules from '../../utils/RulesValidator';

import appLogo from '../../../assets/images/logo-app.png';

const LoginForm = ({ onSubmit, initialValues, onClickRecoverPassword }) => (
  <div className="box animated">
    <div className="box-header">
      <img src={appLogo} alt="Logo" className="logo-login" />
      <div className="separator" />
      <h1>Login</h1>
    </div>
    <div className="box-content">
      <Form
        onFinish={(v) => onSubmit({ ...initialValues, ...v })}
        initialValues={initialValues}
        className="login-form"
        layout="vertical"
        hideRequiredMark
      >
        <Form.Item name="email" label="Email" rules={getRules('email', true)} hasFeedback>
          <Input placeholder="Adresse email" prefix={<UserOutlined />} size="large" />
        </Form.Item>

        <Form.Item name="password" label="Mot de passe" rules={getRules('password', true)} hasFeedback>
          <Input.Password placeholder="Mot de passe" prefix={<LockOutlined />} size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>Se connecter</Button>

        <div className="btn-group">
          <Button type="link" onClick={onClickRecoverPassword} block>Mot de passe oublié</Button>
        </div>
      </Form>
    </div>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape().isRequired,
  onClickRecoverPassword: PropTypes.func.isRequired,
};

export default (LoginForm);
