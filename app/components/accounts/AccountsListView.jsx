import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { map } from 'lodash';

const AccountsListView = ({ accounts, baseUrl }) => (
  <div>
    <div className="toolbar">
      <div className="toolbar-title">Liste des utilisateurs</div>
      <div className="toolbar-actions">
        <NavLink className="btn" to={`${baseUrl}/new`}>
          Créer un utilisateur
        </NavLink>
      </div>
    </div>
    <ul>
      {map(accounts, (account) => (
        <li key={account.account_id}>
          <NavLink to={`${baseUrl}/${account.account_id}`}>
            {account.username}
            &nbsp;
            (
            {account.email}
            )
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

AccountsListView.propTypes = {
  accounts: PropTypes.objectOf(PropTypes.shape({
    account_id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,

  baseUrl: PropTypes.string.isRequired,
};

export default AccountsListView;
