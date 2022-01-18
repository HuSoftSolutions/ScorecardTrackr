import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../../store';
import AddNewPlayerButton from '../../../utils/AddNewPlayerButton';
import Edit_AddPlayerModal from '../../../utils/PlayerHandlerModal';
import ModalPrompt from '../../../utils/ModalPrompt';
import ScoreTable from './ScoreTable';
import MatchTable from './MatchTable';
import './scoretracker.css';
import * as CONSTANTS from '../../../constants/misc';

export default function Scoretracker(props) {
  const { state, dispatch } = useStore();
  const [showPlayerModal, togglePlayerModal] = useState(false);
  const [showModalPrompt, toggleModalPrompt] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [holeArray, setHoleArray] = useState([]);
  const [selectedPlayer, setPlayerToEdit] = useState({
    name: '',
    index: null,
  });
  const [add_edit, setAdd_Edit] = useState('');
  const [modalPromptAction, setmodalPromptTitle] = useState('end');

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

  const validateScorecard = () => {
    let validated = true,
      players = [...state.activeRound.players];

    players.map((player) => {
      for (let i = 1; i <= state.activeRoundLength; i++) {
        if (!player.scorecard[i] || player.scorecard[i] == 0) {
          validated = false;
        }
      }
    });
    return validated;
  };

  const endRoundHandler = () => {
    let modalPrompt = {},
      validated = validateScorecard();

    if (validated) {
      modalPrompt.message =
        'Are you sure you want to complete your round?';
      modalPrompt.denyButton = 'Cancel';
    } else {
      modalPrompt.message =
        'All scores have not been recorded for this round.  Are you sure you want to end incomplete round?';
      modalPrompt.denyButton = 'Cancel';
    }
    modalPrompt.confirmButton = 'Yes';
    modalPrompt.title = 'End Round';
    setmodalPromptTitle('end');
    setModalDetails(modalPrompt);
    toggleModalPrompt(true);
  };

  const continueRoundHandler = () => {
    let modalPrompt = {};
    modalPrompt.message =
      'Would you like to add another 9 holes to your round?';
    modalPrompt.denyButton = 'Cancel';
    modalPrompt.confirmButton = 'Yes';
    modalPrompt.title = 'Continue Round';

    setmodalPromptTitle('new');
    setModalDetails(modalPrompt);
    toggleModalPrompt(true);
  };

  const addNineHoles = () => {
    const pressArray = [...CONSTANTS.defaultPressArray];
    let activeRoundCopy = state.activeRound;
    if (activeRoundCopy.matchType != 0) {
      let matchesCopy = [...state.activeRound.matches];
      state.activeRound.matches.map((match, index) => {
        matchesCopy[index].presses.push(pressArray);
      });
      activeRoundCopy.matches = matchesCopy;
    }
    dispatch({
      type: 'update-active-round-length',
      roundLength: state.activeRoundLength + 9,
    });
    dispatch({
      type: 'update-active-round',
      roundInfo: activeRoundCopy,
    });
  };

  const endCurrentRound = () => {
    let activeRound = state.activeRound;
    activeRound.activeRoundLength = state.activeRoundLength;

    props.firebase.doRoundHistoryUpdate(
      activeRound,
      props.firebase.auth.currentUser.uid,
    );

    // dispatch({
    //   type: 'round-history--set',
    //   roundHistory: currentRoundHistory,
    // });
    dispatch({
      type: 'update-active-round',
      roundInfo: null,
    });
    dispatch({
      type: 'update-active-round-length',
      roundLength: 9,
    });
    props.endRound();
  };

  return (
    <div>
      <div className="scoretrackerButtonDiv buttonMarginBottom5">
        <Button
          size="sm"
          variant="secondary"
          className="buttonMarginBottom5 endRoundButton"
          onClick={endRoundHandler}
        >
          End Round
        </Button>
        <div
          className={`displayFlex ${
            validateScorecard()
              ? 'justifyContent_spaceBetween'
              : 'justifyContent_flexEnd'
          }`}
        >
          {validateScorecard() ? (
            <Button
              size="sm"
              // className=""
              onClick={continueRoundHandler}
            >
              Continue
            </Button>
          ) : null}
          <AddNewPlayerButton onClick={() => addNewPlayer()} />
        </div>
      </div>

      <ScoreTable holeArray={holeArray} editPlayer={editPlayer} />
      {state.activeRound.matchType != 0 && (
        <MatchTable holeArray={holeArray} />
      )}
      <Edit_AddPlayerModal
        show={showPlayerModal}
        hide={() => togglePlayerModal(false)}
        addOrEdit={add_edit}
        playerToEdit={selectedPlayer}
      />

      <ModalPrompt
        show={showModalPrompt}
        hide={() => toggleModalPrompt(false)}
        modalDetails={modalDetails}
        continue={
          modalPromptAction === 'end' ? endCurrentRound : addNineHoles
        }
      />
    </div>
  );
}
