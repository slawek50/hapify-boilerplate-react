import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';

import getRules from '../../utils/RulesValidator';

const ResetPasswordForm = ({ onSubmit, initialValues }) => (
  <div className="box animated fadeInDown">
    <div className="box-header">
      <div className="logo" />
      <div className="separator" />
      <h1>Réinitialisation du mot de passe</h1>
    </div>
    <div className="box-content">
      <p className="text-center">Veillez saisir votre nouveau mot de passe.</p>
      <Form
        onFinish={(v) => onSubmit({ ...initialValues, ...v })}
        initialValues={initialValues}
        className="login-form"
      >
        <Form.Item name="password" label="Mot de passe" rules={getRules('password', true)} hasFeedback>
          <Input.Password placeholder="Mot de passe" prefix={<LockOutlined />} />
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

        <Button type="primary" htmlType="submit">Enregistrer</Button>
      </Form>
    </div>
  </div>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape().isRequired,
};

export default (ResetPasswordForm);
