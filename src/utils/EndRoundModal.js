import React, { useState } from 'react';
import { useStore } from '../store.js';
import { Button, Modal } from 'react-bootstrap';
import * as CONSTANTS from '../constants/misc';

export default function EndRoundModal(props) {
  const { state, dispatch } = useStore();

  const denialClickHandler = () => {
    if (props.modalDetails.roundValid) {
      props.endRound();
      props.hide();
    } else {
      props.hide();
    }
  };

  const confirmClickHandler = () => {
    if (props.modalDetails.roundValid) {
      addNineHoles();
        props.hide();
      } else {
        props.endRound();
        props.hide();
      }
  };

  const addNineHoles = () => {
    const pressArray = [...CONSTANTS.defaultPressArray];
    let activeRoundCopy = state.activeRound;
    let matchesCopy = [...state.activeRound.matches];
    debugger;
    state.activeRound.matches.map((match, index)=> {
      matchesCopy[index].presses.push(pressArray);
    })
    activeRoundCopy.matches = matchesCopy;
    dispatch({
      type: 'update-active-round-length',
      roundLength: state.activeRoundLength + 9,
    });
    dispatch({
      type: 'update-active-round',
      roundInfo: activeRoundCopy,
    });
  }

  return (
    <Modal show={props.show} hide={props.hide}>
      <Modal.Header>
        <Modal.Title>End Round</Modal.Title>
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
