import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const ConfirmationModal = ({
  isOpen, onRequestClose, onConfirmationButton, message,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={{
      base: 'modal-content',
      afterOpen: 'confirm-modal',
      beforeClose: 'confirm-modal',
    }}
    overlayClassName={{
      base: 'modal-overlay',
      afterOpen: 'modal-overlay',
      beforeClose: 'modal-overlay',
    }}
  >
    <div>
      <div className="text-center">
        {message}
      </div>
      <div className="btn-group center">
        <button className="btn btn-secondary" type="button" onClick={onRequestClose}>Non</button>
        <button className="btn btn-primary" type="button" onClick={onConfirmationButton}>Oui</button>
      </div>
    </div>
  </Modal>
);

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  onConfirmationButton: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationModal;
