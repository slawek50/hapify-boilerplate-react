import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { setMessage } from '../../store/modules/globals';

const MessageBox = ({ message, setMsg }) => {
  if (message.delay && message.delay > 0) {
    setTimeout(setMsg, message.delay);
  }
  return (
    <div id="message-box" className={classNames('message-box', message.messageType)}>
      { message && message.text && message.messageType && (
        <div className="message-content">
          <div className="text-message">
            {message.messageType === 'info' && (
              <i className="fas fa-check" />
            )}
            {message.messageType === 'error' && (
              <i className="fas fa-exclamation" />
            )}
            <span>
              {message.text}
            </span>
          </div>
          <button type="button" onClick={() => setMsg()} aria-label="Close"><i className="fas fa-times" /></button>
        </div>
      )}
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
    delay: PropTypes.number,
  }),
  setMsg: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    message: state.data.message,
  }),
  { setMsg: setMessage },
)(MessageBox);