import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import notification from 'antd/lib/notification';

import { getJSONFromUrlParams } from '../../utils/URLParser';

import { resetPassword, RESET_PASSWORD_SUCCESS } from '../../store/modules/auth';

import ResetPasswordForm from '../../components/login/ResetPasswordForm';

const ResetPassword = ({ doResetPassword, history }) => {
  const { accountId, resetToken } = getJSONFromUrlParams();

  const recoverPassword = (values) => {
    doResetPassword(accountId, resetToken, values.password).then((action) => {
      if (action.type === RESET_PASSWORD_SUCCESS) {
        notification.success({ message: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.' });
        return history.push('/session/sign-in');
      }
      return null;
    });
  };

  return (
    <main className="login">
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  { doResetPassword: resetPassword },
)(withRouter(ResetPassword));
