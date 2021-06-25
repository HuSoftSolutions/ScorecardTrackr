import React from 'react';
import { Button } from 'react-bootstrap';

export default function RemovePlayerButton(props) {
  return (
    <div className="new-match-container">
      <Button
        onClick={props.onClick}
      >
        X
      </Button>
    </div>
  );
}
