import React from 'react';
import { Button } from 'react-bootstrap';

export default function AddNewPlayerButton(props) {
  return (
    <Button
    size="sm"
    variant="success"
    onClick={() => props.onClick()}
  >
    Add Player
  </Button>
  );
}