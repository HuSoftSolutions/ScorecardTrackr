import React, { useState } from 'react';
import { useStore } from '../store.js';
import { Button, Modal } from 'react-bootstrap';
import PlayerComponent from '../components/Home/Players/index';
import * as CONSTANTS from '../constants/misc';

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
    if (state.activeRound.matchType == 1) {
      let matchCopy = activeRoundCopy.matches.filter(
        (match) =>
          match.firstPlayerIndex != props.playerToEdit.index &&
          match.secondPlayerIndex != props.playerToEdit.index,
      );
      matchCopy.map((match, index) => {
        if (match.firstPlayerIndex > props.playerToEdit.index)
          matchCopy[index].firstPlayerIndex -= 1;
        if (match.secondPlayerIndex > props.playerToEdit.index)
          matchCopy[index].secondPlayerIndex -= 1;
      });
      activeRoundCopy.matches = matchCopy;
    }

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
      let defaultPressArray = [[...CONSTANTS.defaultPressArray]],
       matchesArray = [...state.activeRound.matches],
       matches = [];
      for (let i = 0; i < playersArray.length; i++) {
        for (let j = i + 1; j < playersArray.length; j++) {
          let existingPresses = matchesArray.find(
            (m) =>
              m.firstPlayerIndex === i && m.secondPlayerIndex === j,
          );
          matches.push({
            name: `${playersArray[i].name} vs. ${playersArray[j].name}`,
            presses: existingPresses
              ? existingPresses.presses
              : defaultPressArray,
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
    <Modal show={props.show} hide={props.hide}>
      <Modal.Header>
        <Modal.Title>{props.addOrEdit} Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlayerComponent
          player={
            newPlayer.name != null ? newPlayer : props.playerToEdit
          }
          pIndex={props.playerToEdit.index}
          playerCount={1}
          onChangePlayerName={playerNameChange}
        />
      </Modal.Body>
      <Modal.Footer className="addEditPlayerModal_Footer">
        {props.addOrEdit !== 'Add' ? (
          <Button variant="danger" size="sm" className='removePlayerButton' onClick={removePlayer}>
            Remove Player
          </Button>
        ) : null}
        <div className='justifyContent_spaceBetween displayFlex'>
          <Button variant="secondary" size="sm" onClick={cancelChanges}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={newPlayer.name != null ? false : true}
            onClick={savePlayer}
          >
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
