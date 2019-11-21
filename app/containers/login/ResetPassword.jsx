import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getJSONFromUrlParams } from 'react-components';

import { resetPassword, RESET_PASSWORD_SUCCESS } from '../../store/modules/auth';
import { setMessage } from '../../store/modules/globals';

import ResetPasswordForm from '../../components/login/ResetPasswordForm';
import MessageBox from '../shared/MessageBox';

const ResetPassword = ({ doResetPassword, setMsg, history }) => {
  const { accountId, resetToken } = getJSONFromUrlParams();

  const recoverPassword = (values) => {
    doResetPassword(accountId, resetToken, values.password).then((action) => {
      if (action.type === RESET_PASSWORD_SUCCESS) {
        setMsg('Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.', 'info', 5000);
        return history.push('/session/sign-in');
      }
      return null;
    });
  };

  return (
    <main className="login">
      <MessageBox />
      <div className="login-overflow">
        <ResetPasswordForm
          onSubmit={(v) => recoverPassword(v)}
        />
      </div>
    </main>
  );
};

ResetPassword.propTypes = {
  doResetPassword: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { doResetPassword: resetPassword, setMsg: setMessage },
)(withRouter(ResetPassword));
