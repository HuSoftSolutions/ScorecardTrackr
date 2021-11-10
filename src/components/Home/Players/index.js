import React from 'react';
import PlayerIcon from '../../../utils/PlayerIcon';
import RemovePlayerButton from '../../../utils/RemovePlayerButton';
import {
    Button,
    InputGroup, 
    Form
  } from 'react-bootstrap';
  import './index.css';

export default function Players(props) {

    const removePlayerButton = (index) => {
        return props.playerCount > 1 ?
          <RemovePlayerButton onClick={() => props.onRemovePlayer(index)}/>
          : null}

    return (
        <div className="playersDiv">
          <InputGroup.Prepend>
            <InputGroup.Text id="playerNames" style={{ padding: ".375rem" }}>
              {PlayerIcon("")}
            </InputGroup.Text>
          </InputGroup.Prepend>
            <Form.Control
                className="playerInput"
                autoFocus
                onChange={({ target }) => props.onChangePlayerName(target.value, props.pIndex)}
                aria-describedby="playerNames"
                aria-label="Username"
                placeholder="ex: John Doe"
                size="sm"
                value={props.player.name}
            />
            {removePlayerButton(props.pIndex)}
        </div>
    )
}



