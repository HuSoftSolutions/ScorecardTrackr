import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../../store';
import AddNewPlayerButton from '../../../utils/AddNewPlayerButton';
import Edit_AddPlayerModal from '../../../utils/PlayerHandlerModal';
import ScoreTable from './ScoreTable';
import MatchTable from './MatchTable';
import './scoretracker.css';

export default function Scoretracker(props) {
  const { state, dispatch } = useStore();
  const [showPlayerModal, togglePlayerModal] = useState(false);
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
      index: playerIndex
    });
    togglePlayerModal(true);
  }

  return (
    <div>
      <div className="buttonDiv">
        <Button variant="secondary" className="buttonPadding">End Round</Button>
        <AddNewPlayerButton onClick={() => addNewPlayer()} />
      </div>
      <ScoreTable holeArray={holeArray} editPlayer={editPlayer}/>
      <MatchTable holeArray={holeArray}/>
      <Edit_AddPlayerModal
        show={showPlayerModal}
        hide={() => togglePlayerModal(false)}
        addOrEdit={add_edit}
        playerToEdit={selectedPlayer}
      />
    </div>
  );
}
