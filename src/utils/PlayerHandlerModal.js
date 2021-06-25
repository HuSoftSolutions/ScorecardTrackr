import React, { useState } from 'react';
import { useStore } from '../store.js';
import {
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
} from 'react-bootstrap';
import PlayerComponent from '../components/Home/Players/index';

export default function Edit_AddPlayerModal(props) {
  const { state, dispatch } = useStore();
  const [newPlayer, setNewPlayerName] = useState({ name: null });

  const playerNameChange = (value, playerIndex) => {
    setNewPlayerName({ name: value });
  };

  const removePlayer = () => {
    let activeRoundCopy = state.activeRound,
      newPlayerArray = state.activeRound.players.filter(
        (player, index) => index != props.playerToEdit.index,
      );
    activeRoundCopy.players = newPlayerArray;
    dispatch({
      type: 'update-active-round',
      roundInfo: activeRoundCopy,
    });
    props.hide();
  };

  const savePlayer = () => {
    let playersArray = [...state.activeRound.players],
      updatedActiveRound = state.activeRound;
    if (playersArray.length === props.playerToEdit.index) {
      playersArray.push({ name: newPlayer.name, scorecard: [] });
    } else {
      playersArray[props.playerToEdit.index].name = newPlayer.name;
    }
    updatedActiveRound.players = playersArray;

    if (state.activeRound.matchType === 1) {
      const pressArray = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      let matches = [];
      for (let i = 0; i < playersArray.length; i++) {
        for (let j = i + 1; j < playersArray.length; j++) {
          matches.push({
            name: `${playersArray[i].name} vs. ${playersArray[j].name}`,
            presses: pressArray,
            firstPlayerIndex: i,
            secondPlayerIndex: j,
          });
        }
      }
      updatedActiveRound.matches = matches;
    }
    dispatch({
      type: 'update-active-round',
      roundInfo: updatedActiveRound,
    });
    setNewPlayerName({ name: null });
    props.hide();
  };

  const cancelChanges = () => {
    setNewPlayerName({ name: null });
    props.hide();
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>{props.addOrEdit} Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlayerComponent
          player={newPlayer.name ? newPlayer : props.playerToEdit}
          pIndex={props.playerToEdit.index}
          playerCount={1}
          onChangePlayerName={playerNameChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelChanges}>
          Cancel
        </Button>
        {props.addOrEdit !== 'Add' ? (
          <Button variant="secondary" onClick={removePlayer}>
            Remove Player
          </Button>
        ) : null}
        <Button
          variant="primary"
          disabled={newPlayer.name ? false : true}
          onClick={savePlayer}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
