import React from 'react';
import { Button } from 'react-bootstrap';

export default function RemovePlayerButton(props) {
  return (
    <div className="removePlayer">
      <Button
        onClick={props.onClick}
        size='sm'
      >
        X
      </Button>
    </div>
  );
}
