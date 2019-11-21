import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getJSONFromUrlParams } from 'react-components';

import { login, recoverPassword, RECOVER_PASSWORD_SUCCESS } from '../../store/modules/auth';
import { setMessage } from '../../store/modules/globals';

import LoginForm from '../../components/login/LoginForm';
import PasswordRecoverForm from '../../components/login/PasswordRecoverForm';
import MessageBox from '../shared/MessageBox';

const Login = ({
  history, doLogin, doRecoverPassword, setMsg,
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
      setMsg('Un lien de réinitialisation du mot de passe vous a été envoyé par email.', 'info', 5000);
    }
  });

  return (
    <main className="login">
      <MessageBox />
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
  setMsg: PropTypes.func.isRequired,
};

export default connect(
  null,
  { doLogin: login, doRecoverPassword: recoverPassword, setMsg: setMessage },
)(withRouter(Login));
