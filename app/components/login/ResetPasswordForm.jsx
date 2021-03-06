import React from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { LockOutlined } from '@ant-design/icons';

import getRules from '../../utils/RulesValidator';

import appLogo from '../../../assets/images/logo-app.png';

const ResetPasswordForm = ({ onSubmit }) => (
  <div className="box animated fadeInDown">
    <div className="box-header">
      <img src={appLogo} alt="Logo" className="logo-login" />
      <div className="separator" />
      <h1>Réinitialisation du mot de passe</h1>
    </div>
    <div className="box-content">
      <p className="text-center">Veillez saisir votre nouveau mot de passe.</p>
      <Form
        onFinish={(v) => onSubmit(v)}
        className="login-form"
        layout="vertical"
        hideRequiredMark
      >
        <Form.Item name="password" label="Mot de passe" rules={getRules('password', true)} hasFeedback>
          <Input.Password placeholder="Mot de passe" prefix={<LockOutlined />} size="large" />
        </Form.Item>

        <Form.Item
          name="verification"
          label="Vérification"
          rules={[
            ...getRules('password', true),
            ({ getFieldValue }) => ({
              validator: (r, v) => {
                if (!v || getFieldValue('password') === v) return Promise.resolve();
                return Promise.reject(new Error('Not same password'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Vérification" prefix={<LockOutlined />} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>Enregistrer</Button>
      </Form>
    </div>
  </div>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default (ResetPasswordForm);
