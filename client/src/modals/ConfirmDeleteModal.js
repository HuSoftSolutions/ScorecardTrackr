import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = (props) => {
  return (
    <Modal show={props.show} backdrop="static">
      <Modal.Body>
        <Modal.Title>Confirm Delete?</Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onClose}>
          No
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Yes, delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
