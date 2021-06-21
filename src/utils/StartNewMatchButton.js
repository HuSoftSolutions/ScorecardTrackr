import React from 'react';
import { Button } from 'react-bootstrap';

export default function StartNewMatch(props) {
  return (
    <div className="new-match-container">
      <Button
        onClick={props.toggle}
      >
        Start New Match
      </Button>
    </div>
  );
}
