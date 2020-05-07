import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Input, Select,
} from 'antd';
import { map } from 'lodash';

import getRules from '../../utils/RulesValidator';

import { ACCOUNTS_ROLES } from '../../configs/Properties';

const AccountEditForm = ({ onSubmit, initialValues, isMyAccount }) => (
  <Form onFinish={(v) => onSubmit({ ...initialValues, ...v })} initialValues={initialValues}>
    <div>
      <Form.Item name="name" label="Identifiant" rules={getRules('string', true)} hasFeedback>
        <Input placeholder="Identifiant" disabled={isMyAccount} />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={getRules('email', true)} hasFeedback>
        <Input placeholder="Email" />
      </Form.Item>
      {!isMyAccount && (
        <Form.Item name="role" label="Rôle" rules={getRules('entity', true)} hasFeedback>
          <Select placeholder="Rôle">
            {map(ACCOUNTS_ROLES, (role, value) => (
              <Select.Option key={value} value={value}>{role}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {isMyAccount && (
        <Form.Item name="password" label="Mot de passe" rules={getRules('password', true)} hasFeedback>
          <Input.Password placeholder="Mot de passe" />
        </Form.Item>
      )}
    </div>

    <div className="btn-group right">
      <Button type="primary" htmlType="submit">Enregistrer</Button>
    </div>
  </Form>
);

AccountEditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape().isRequired,
  isMyAccount: PropTypes.bool.isRequired,
};

export default (AccountEditForm);
