import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { IconButton, upperFirst } from 'react-components';

import { setConfig } from '../../store/modules/globals';
import { sendSocket } from '../../store/modules/socket';

const PageHeader = ({
  title, pageHeaderComponent, className, /* history: { push },*/ menuIsTiny, setConf,
}) => {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const dateInterval = setInterval(() => {
      setDate(moment());
    }, 1000);

    return () => clearInterval(dateInterval);
  }, []);

  return (
    <div className={classNames('page-header', className)}>
      <div className="container">
        <div className="page-header-left">
          <IconButton onClick={() => setConf('menuIsTiny', !menuIsTiny)} fontIcon="far fa-bars" className="menu-button btn" />
          <div className="page-header-title">
            {title}
          </div>
          {pageHeaderComponent}
        </div>
        <div className="page-header-right">
          <div className="page-header-date">{upperFirst(date.format('dddd Do MMMM, HH:mm:ss'))}</div>
        </div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  pageHeaderComponent: PropTypes.element,
  className: PropTypes.string,

  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,

  menuIsTiny: PropTypes.bool,

  setConf: PropTypes.func.isRequired,
  // sendSocket: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    menuIsTiny: state.data.config.menuIsTiny,
  }),
  { setConf: setConfig, sendSocket },
)(withRouter(PageHeader));
