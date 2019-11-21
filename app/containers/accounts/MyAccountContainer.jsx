import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createOrUpdateAccount } from '../../store/modules/accounts';

import BaseLayout from '../shared/BaseLayout';

import AccountEditForm from '../../components/accounts/AccountEditForm';

const AccountsContainer = ({
  user, ...props
}) => (
  <BaseLayout title="AccountsContainer" isBoxContent>
    <AccountEditForm
      initialValues={{
        account_id: user.account_id,
        role: user.role,
        name: user.name,
        email: user.email,
      }}
      onSubmit={(v) => {
        props.createOrUpdateAccount(v, true);
      }}
      isMyAccount
    />
  </BaseLayout>
);

AccountsContainer.propTypes = {
  createOrUpdateAccount: PropTypes.func.isRequired,

  user: PropTypes.shape().isRequired,
};

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  { createOrUpdateAccount },
)(AccountsContainer);
