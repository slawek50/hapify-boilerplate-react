import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateUser } from '../../store/modules/entities/users';

import BaseLayout from '../shared/BaseLayout';

import AccountEditForm from '../../components/accounts/AccountEditForm';

const AccountsContainer = ({
  user, ...props
}) => (
  <BaseLayout title="AccountsContainer" isBoxContent>
    <AccountEditForm
      initialValues={{
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      }}
      onSubmit={(v) => props.updateUser(v)}
      isMyAccount
    />
  </BaseLayout>
);

AccountsContainer.propTypes = {
  updateUser: PropTypes.func.isRequired,

  user: PropTypes.shape().isRequired,
};

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  { updateUser },
)(AccountsContainer);
