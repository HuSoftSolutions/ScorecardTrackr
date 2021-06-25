import React, { useState } from 'react';
import { useStore } from '../store.js';
import {
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
} from 'react-bootstrap';
import Round from '../classes/Round.js';
import PlayerComponent from '../components/Home/Players/index';
import AddNewPlayerButton from './AddNewPlayerButton.js';
import './index.css';

export default function NewMatchModal(props) {
  const { state, dispatch } = useStore();

  const [players, setPlayers] = useState([{ name: '' }]);
  const [type, setType] = useState(0); //0=stroke, 1=match

  const addPlayer = () => {
    let playerArray = [...players];
    playerArray.push({ name: '' });
    setPlayers(playerArray);
  };

  const removePlayer = (playerIndex) => {
    let playerArray = [...players],
      newPlayerArray = playerArray.filter(
        (player, index) => index != playerIndex,
      );
      if (newPlayerArray.length < 2) setType(0);
    setPlayers(newPlayerArray);
  };

  const playerNameChange = (value, playerIndex) => {
    let playerArray = [...players];
    playerArray[playerIndex].name = value;
    setPlayers(playerArray);
  };

  const onCancel = () => {
    setPlayers([{ name: '' }]);
    setType(0);
    props.hide();
  };

  const startActiveRound = () => {
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
    let playerArray = [...players],
      matches = [];

    if (type === 1) {
      for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
          matches.push({
            name: `${players[i].name} vs. ${players[j].name}`,
            presses: pressArray,
            firstPlayerIndex: i,
            secondPlayerIndex: j
          });
        }
      }
    }
    players.map((player, index) => {
      playerArray[index]['scorecard'] = [];
    });

    let activeRound = {
      startDate: new Date(),
      players: playerArray,
      matchType: type,
      matches: matches
    };
    dispatch({
      type: 'update-active-round',
      roundInfo: activeRound,
    });
    props.startRound();
  };

  const validateMatchDetails = () => {
    let playerArray = [...players],
      validated = true;

    playerArray.map((player) => {
      if (player.name.trim().length < 1) {
        validated = false;
      }
    });
    return validated;
  };

  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Start New Match</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup className="w-100">
          <Button
            onClick={() => {
              setType(0);
            }}
            variant={type === 0 ? 'primary' : 'dark'}
          >
            Stroke
          </Button>
          <Button
            onClick={() => {
              setType(1);
            }}
            variant={type === 1 ? 'primary' : 'dark'}
            disabled={players.length > 1 ? false : true}
          >
            Match
          </Button>
        </ButtonGroup>
        {players.map((player, index) => (
          <PlayerComponent
            player={player}
            pIndex={index}
            playerCount={players.length}
            onChangePlayerName={playerNameChange}
            onRemovePlayer={removePlayer}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
      <AddNewPlayerButton onClick={() => addPlayer()} />
        <Button variant="secondary" size='sm' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size='sm'
          disabled={!validateMatchDetails()}
          onClick={startActiveRound}
        >
          Start Round
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
}
