import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import getRules from '../../utils/RulesValidator';

import appLogo from '../../../assets/images/logo-app.png';

const PasswordRecoverForm = ({ onSubmit, onClickCancel }) => (
  <div className="box animated fadeInDown">
    <div className="box-header">
      <img src={appLogo} alt="Logo" className="logo-login" />
      <div className="separator" />
      <h1>Mot de passe oublié</h1>
    </div>
    <div className="box-content">
      <p className="text-center">Veillez saisir votre adresse email afin de recevoir un nouveau mot de passe.</p>
      <Form
        onFinish={(v) => onSubmit(v)}
        className="login-form"
        layout="vertical"
        hideRequiredMark
      >
        <Form.Item name="email" label="Email" rules={getRules('email', true)} hasFeedback>
          <Input placeholder="Adresse email" prefix={<UserOutlined />} size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>Envoyer</Button>

        <div className="btn-group">
          <Button type="link" onClick={onClickCancel} block>Annuler</Button>
        </div>
      </Form>
    </div>
  </div>
);

PasswordRecoverForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

export default (PasswordRecoverForm);
