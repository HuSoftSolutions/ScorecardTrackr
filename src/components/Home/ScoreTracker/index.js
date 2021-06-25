import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../../store';
import AddNewPlayerButton from '../../../utils/AddNewPlayerButton';
import Edit_AddPlayerModal from '../../../utils/PlayerHandlerModal';
import EndRoundModal from '../../../utils/EndRoundModal';
import ScoreTable from './ScoreTable';
import MatchTable from './MatchTable';
import './scoretracker.css';

export default function Scoretracker(props) {
  const { state, dispatch } = useStore();
  const [showPlayerModal, togglePlayerModal] = useState(false);
  const [showEndRoundModal, toggleEndRoundModal] = useState(false);
  const [endRoundModalDetails, setEndRoundModalDetails] = useState({});
  const [holeArray, setHoleArray] = useState([]);
  const [selectedPlayer, setPlayerToEdit] = useState({
    name: '',
    index: null,
  });
  const [add_edit, setAdd_Edit] = useState('');

  useEffect(function () {
    let holeCount = state.activeRoundLength,
      holes = [],
      nineHoleArray = [];

    for (let i = 1; i <= holeCount; i++) {
      holes.push({ hole: i });
      if (i % 9 === 0) {
        nineHoleArray.push(holes);
        holes = [];
      }
    }
    if (nineHoleArray.length !== holeArray.length)
      setHoleArray(nineHoleArray);
  });

  const addNewPlayer = () => {
    setAdd_Edit('Add');
    setPlayerToEdit({
      name: '',
      index: state.activeRound.players.length,
    });
    togglePlayerModal(true);
  };

  const editPlayer = (playerIndex) => {
    let playerName = state.activeRound.players[playerIndex].name;
    setAdd_Edit('Edit');
    setPlayerToEdit({
      name: playerName,
      index: playerIndex,
    });
    togglePlayerModal(true);
  };

  const endRoundHandler = () => {
    let validated = true,
      players = [...state.activeRound.players],
      endRoundModal = {};

    players.map((player) => {
      for (let i = 1; i <= state.activeRoundLength; i++) {
        if (!player.scorecard[i] || player.scorecard[i] == 0) {
          validated = false;
        }
      }
    });
    if (validated) {
      endRoundModal.message =
        'Round is complete.  Would you like to play another nine holes?';
      endRoundModal.denyButton = 'End Round';
    } else {
      endRoundModal.message =
        'All scores have not been recorded for this round.  Are you sure you want to end incomplete round?';
      endRoundModal.denyButton = 'Cancel';
    }
    endRoundModal.confirmButton = 'Yes';
    endRoundModal.roundValid = validated;
    setEndRoundModalDetails(endRoundModal);
    toggleEndRoundModal(true);
  };

  const endCurrentRound = () => {
    let currentRound = state.activeRound;
    dispatch({
      type: 'round-history--set',
      roundHistory: currentRound,
    });
    dispatch({
      type: 'update-active-round',
      roundInfo: null,
    });
    dispatch({
      type: 'update-active-round-length',
      roundLength: 9,
    });
    props.endRound();
  }

  return (
    <div>
      <div className="buttonDiv">
        <Button
          variant="secondary"
          className="buttonPadding"
          onClick={endRoundHandler}
        >
          End Round
        </Button>
        <AddNewPlayerButton onClick={() => addNewPlayer()} />
      </div>
      <ScoreTable holeArray={holeArray} editPlayer={editPlayer} />
      <MatchTable holeArray={holeArray} />
      <Edit_AddPlayerModal
        show={showPlayerModal}
        hide={() => togglePlayerModal(false)}
        addOrEdit={add_edit}
        playerToEdit={selectedPlayer}
      />
        
      <EndRoundModal show={showEndRoundModal} hide={() => toggleEndRoundModal(false)} modalDetails={endRoundModalDetails} endRound={endCurrentRound}/>
    </div>
  );
}
