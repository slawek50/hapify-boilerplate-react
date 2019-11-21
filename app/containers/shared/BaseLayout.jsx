import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Modal from 'react-modal';

import MessageBox from './MessageBox';

import Header from '../../components/shared/Header';
import PageHeader from '../../components/shared/PageHeader';

import { isAdmin } from '../../utils/RolesUtils';

Modal.setAppElement('body');

const BaseLayout = ({
  title, hideHeader, className, pageHeaderClassName, children, account,
}) => (
  <div id="wrapper" className={`env-${process.env.NODE_ENV} ${isAdmin(account) ? 'admin' : 'client'}`}>
    <MessageBox />
    <Header />
    <main>
      {!hideHeader && (
        <PageHeader
          title={title}
          className={pageHeaderClassName}
        />
      )}
      <div className={classnames('workspace', className)}>
        <div className="container">
          {children}
        </div>
      </div>
      {process.env.NODE_ENV === 'staging' && (
        <div className="env-banner">
          !!! Environnement de recette !!!
        </div>
      )}
    </main>
    <div className="site-bg-wrapper">
      <div />
    </div>
  </div>
);

BaseLayout.propTypes = {
  children: PropTypes.node,
  hideHeader: PropTypes.bool,

  title: PropTypes.string.isRequired,
  pageHeaderClassName: PropTypes.string,
  className: PropTypes.string,

  account: PropTypes.shape(),
};

export default connect(
  (state) => ({
    account: state.auth.user,
  }),
)(BaseLayout);
