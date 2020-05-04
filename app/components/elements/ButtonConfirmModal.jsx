import React from 'react';
import PropTypes from 'prop-types';

import ConfirmationModal from './ConfirmationModal';

export default class ButtonConfirmModal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onConfirmationButton: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
  };

  constructor () {
    super();
    this.state = {
      confirmationBox: null,
    };
  }

  onConfirmationButton () {
    const { onConfirmationButton } = this.props;
    this.setState({ confirmationBox: null });
    onConfirmationButton();
  }

  render () {
    const { children, message } = this.props;
    const { confirmationBox } = this.state;

    const newChildren = React.cloneElement(children, {
      onClick: () => this.setState({ confirmationBox: true }),
    });
    return (
      <div>
        {newChildren}
        <ConfirmationModal
          isOpen={confirmationBox !== null}
          onRequestClose={() => this.setState({ confirmationBox: null })}
          onConfirmationButton={() => this.onConfirmationButton()}
          message={message}
        />
      </div>
    );
  }
}
