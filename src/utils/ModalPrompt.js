import React, { useState } from 'react';
import { useStore } from '../store.js';
import { Button, Modal } from 'react-bootstrap';

export default function ModalPrompt(props) {
  const { state, dispatch } = useStore();

  const denialClickHandler = () => {
    props.hide();
  };

  const confirmClickHandler = () => {
    props.continue();
    props.hide();
  };

  return (
    <Modal show={props.show} hide={props.hide}>
      <Modal.Header>
        <Modal.Title>{props.modalDetails.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modalDetails.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={denialClickHandler}>
          {props.modalDetails.denyButton}
        </Button>
        <Button variant="primary" onClick={confirmClickHandler}>
          {props.modalDetails.confirmButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
