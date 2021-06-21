import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
} from 'react-bootstrap';
import Round from '../classes/Round.js';
import './index.css';

export default function NewMatchModal(props) {
  const [players, setPlayers] = useState([]);
  const [type, setType] = useState(0);

  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header>
        <Modal.Title>Start New Match</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup className="w-100">
          <Button onClick={()=>{setType(0)}} variant={type === 0 ? "primary" : "dark"}>Stroke</Button>
          <Button onClick={()=>{setType(1)}} variant={type === 1 ? "primary" : "dark"}>Match</Button>
        </ButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hide}>
          Close
        </Button>
        <Button variant="primary" onClick={props.hide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
