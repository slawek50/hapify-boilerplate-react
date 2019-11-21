import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { keys } from 'lodash';

import { createOrUpdateAccount } from '../../store/modules/accounts';

import BaseLayout from '../shared/BaseLayout';

import AccountDetailView from '../../components/accounts/AccountDetailView';
import AccountEditForm from '../../components/accounts/AccountEditForm';
import AccountsListView from '../../components/accounts/AccountsListView';

const AccountsContainer = ({
  match: { url }, history: { push }, accounts, ...props
}) => (
  <BaseLayout title="AccountsContainer" isBoxContent>
    <Switch>
      <Route
        exact
        path={url}
        render={() => (
          <AccountsListView accounts={accounts} baseUrl={url} />
        )}
      />
      <Route
        exact
        path={`${url}/new`}
        render={() => (
          <AccountEditForm
            initialValues={{}}
            onSubmit={(v) => {
              props.createOrUpdateAccount(v)
              .then(({ response }) => push(`${url}/${keys(response.entities.accounts)[0]}`));
            }}
          />
        )}
      />
      <Route
        exact
        path={`${url}/:accountId/edit`}
        render={({ match }) => (
          <AccountEditForm
            initialValues={accounts[match.params.accountId]}
            onSubmit={(v) => {
              props.createOrUpdateAccount(v)
              .then(() => push(`${url}/${match.params.accountId}`));
            }}
          />
        )}
      />
      <Route
        exact
        path={`${url}/:accountId`}
        render={({ match }) => (
          <AccountDetailView
            account={accounts[match.params.accountId]}
            baseUrl={match.url}
          />
        )}
      />
    </Switch>
  </BaseLayout>
);

AccountsContainer.propTypes = {
  createOrUpdateAccount: PropTypes.func.isRequired,

  accounts: PropTypes.objectOf(PropTypes.shape()).isRequired,

  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  (state) => ({
    accounts: state.data.entities.accounts,
  }),
  { createOrUpdateAccount },
)(withRouter(AccountsContainer));
