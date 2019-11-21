import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AccountDetailView = ({ account = {}, baseUrl }) => (
  <div>
    <div>
      Name:&nbsp;
      {account.name}
    </div>
    <div>
      Email:&nbsp;
      {account.email}
    </div>
    <div>
      Rôle:&nbsp;
      {account.role.join(', ')}
    </div>
    <NavLink to={`${baseUrl}/edit`}>
      Editer
    </NavLink>
  </div>
);

AccountDetailView.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,

  baseUrl: PropTypes.string.isRequired,
};

export default AccountDetailView;
