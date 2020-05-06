import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';

import { getJSONFromUrlParams } from '../../utils/URLParser';

import { login, recoverPassword, RECOVER_PASSWORD_SUCCESS } from '../../store/modules/auth';

import LoginForm from '../../components/login/LoginForm';
import PasswordRecoverForm from '../../components/login/PasswordRecoverForm';

const Login = ({
  history, doLogin, doRecoverPassword,
}) => {
  const [forgottenPassword, setForgottenPassword] = useState(false);

  const submitLogin = (values) => doLogin(values.email, values.password)
  .then(() => {
    const params = getJSONFromUrlParams();
    return history.push(params.next || '/');
  });

  const submitRecoverPassword = (values) => doRecoverPassword(values.email)
  .then((action) => {
    if (action.type === RECOVER_PASSWORD_SUCCESS) {
      setForgottenPassword(false);
      notification.success({ message: 'Un lien de réinitialisation du mot de passe vous a été envoyé par email.' });
    }
  });

  return (
    <main className="login">
      <div className="login-overflow">
        { !forgottenPassword
          ? (
            <LoginForm
              onSubmit={(v) => submitLogin(v)}
              onClickRecoverPassword={() => setForgottenPassword(true)}
            />
          ) : (
            <PasswordRecoverForm
              onSubmit={(v) => submitRecoverPassword(v)}
              onClickCancel={() => setForgottenPassword(false)}
            />
          )}
      </div>
    </main>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

  doLogin: PropTypes.func.isRequired,
  doRecoverPassword: PropTypes.func.isRequired,
};

export default connect(
  null,
  { doLogin: login, doRecoverPassword: recoverPassword },
)(withRouter(Login));
