import React, { useState } from 'react';
import { useStore } from '../store';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { HiUserRemove, HiUserAdd } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';
import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as FUNCTIONS from '../helpers/functions.js';
import './newRoundModal.scss';
import { db, auth } from '../firebase.js';

/* Static Text */
const DATA = {
  TITLE: 'New Round',
  SUBTITLE: 'Click each button to toggle selection',
  PLAYER_ADD: 'Add Players to Continue',
  SELECT_NINES: 'Choose Course and Select Nines to Continue',
};

const NewRoundModal = (props) => {
  /* Hooks */
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [nines, setNines] = useState([]);

  /* Functions */
  function isValid() {
    let errors = [];

    if (!state.selected_course) errors.push('Please select a course');
    if (!players?.length)
      errors.push('Please add players to begin the round');
    if (players?.filter((p) => p.name === '').length)
      errors.push('Please add players to begin the round');

    return !errors.length;
  }

  function handleClose() {
    dispatch({ type: 'close_new_match_modal' });
    setPlayers([]);
  }

  function initializePlayerScorecards(players, card) {
    let p = [...players];

    players.forEach((player, playerIndex) => {
      const blankCard = FUNCTIONS.generateBlankScorecard(nines);
      player.score = [...blankCard];
      player.hdcpHoles = FUNCTIONS.assignPlayerHandicap(player, card, [...blankCard])
    });

    return p;
  }

  function createNewRound() {}

  function handleStartRound() {
    const ID = uuidv4();
    const card = combineNines();
    const p = initializePlayerScorecards(players, card);
    const { name } = state?.selected_course;
    dispatch({
      type: 'start_new_round',
      round_id: ID,
      created_at: new Date(),
      owner: auth?.currentUser?.uid,
      players: p,
      card,
      course: name,
    });
    navigate(ROUTES.ROUND + `/${ID}`);
    handleClose();
  }

  function handleCourseSelection(course) {
    dispatch({
      type: 'set_selected_course',
      selected_course: course,
    });
  }

  function removePlayer(p) {
    setPlayers(players.filter((el) => el.uid !== p.uid));
  }

  function updatePlayer(uid, key, value) {
    // console.log(`updating player ${uid} ${key} ${value}`);
    let index = players.findIndex((p) => p.uid === uid);
    let players_ = [...players];
    players_[index][key] = value;
    setPlayers(players_);
  }

  function updateSelectedNines(nine) {
    let selectedNines = [...nines];

    let nineFoundIndex = isNineSelected(nine); // returns -1 if not found

    let newNines = [];

    if (nineFoundIndex !== -1) {
      // nine was previously selected, remove
      selectedNines.forEach((n) => {
        if (n.name !== nine.name) newNines.push(n);
      });
    } else {
      newNines = [...selectedNines, nine];
    }

    setNines(newNines);
  }

  function combineNines() {
    let holes = { holes: [], hdcp: [], par: [], yards: [] };
    nines.forEach((nine) => {
      holes.holes = [...holes.holes, ...nine.holes];
      holes.hdcp = [...holes.hdcp, ...nine.hdcp];
      holes.par = [...holes.par, ...nine.par];
      holes.yards = [...holes.yards, ...nine.yards];
    });
    console.log(holes);
    return holes;
  }

  function isNineSelected(nine) {
    // let index = nines.findIndex(n => n.name === nine.name)

    let found = -1;
    nines.forEach((n, i) => {
      if (nine.name === n.name) found = i;
    });

    return found;
  }

  /* Components */
  const CourseSelection = () => {
    return (
      <div className="d-flex flex-column justify-content-between my-2">
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            variant={state.selected_course ? 'dark' : 'light'}
            id="dropdown-basic"
          >
            {state?.selected_course?.name || 'Please select a course'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {state.courses.map((c, i) => (
              <Dropdown.Item
                key={i}
                onClick={() => handleCourseSelection(c)}
              >
                {c.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const NinesSelection = () => {
    /* Ryan's great idea */
    return state.selected_course ? (
      <div className="d-flex flex-row justify-content-end pb-3">
        {state.selected_course.nines.map((nine, nineIndex) => (
          <div key={nineIndex} className="form-check mx-2">
            <input
              type="checkbox"
              checked={isNineSelected(nine) !== -1}
              className="form-check-input"
              id={nine.name}
              onChange={() => {
                updateSelectedNines(nine);
              }}
            />
            <label className="form-check-label">{nine.name}</label>
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <Modal
      centered
      backdrop="static"
      show={props.show}
      onHide={handleClose}
    >
      <Modal.Header className="bg-dark text-white d-flex flex-row m-0 header">
        <Modal.Title>{DATA.TITLE}</Modal.Title>
        <CourseSelection />
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <NinesSelection />

        {nines.length ? (
          <div>
            <div className="d-flex justify-content-end w-100">
              <div className="d-flex w-100 justify-content-between align-items-center">
                {players?.length ? (
                  <p className="mb-0">Players</p>
                ) : (
                  <p className="mb-0">{DATA.PLAYER_ADD}</p>
                )}
                <HiUserAdd
                  size={35}
                  className="text-success"
                  onClick={() =>
                    setPlayers([
                      ...players,
                      {
                        name: '',
                        handicap: 0,
                        uid: uuidv4(),
                        score: [],
                        hdcpHoles: [],
                      },
                    ])
                  }
                />
              </div>
            </div>
            {players?.map((p, i) => {
              return (
                <div key={i} className="d-flex flex-fill mt-2 align-items-end">
                  <div className="mx-1 d-flex flex-column flex-fill">
                  <label style={{fontSize: 13}}>name</label>
                    <input
                      className="d-flex border-0 rounded p-1 px-4 small flex-fill"
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        updatePlayer(p.uid, 'name', e.target.value);
                      }}
                    />
                  </div>
                  <div className="mx-1 d-flex flex-column w-25">
                    <label style={{fontSize: 13}}>handicap</label>
                    <input
                      className=" text-dark border-0 rounded p-1 px-4 d-flex small text-center"
                      type="number"
                      value={p.handicap}
                      onChange={(e) => {
                        updatePlayer(
                          p.uid,
                          'handicap',
                          parseInt(e.target.value),
                        );
                      }}
                    />
                  </div> 
                  <div>
                    <HiUserRemove
                      size={35}
                      className="text-danger"
                      onClick={() => {
                        removePlayer(p);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>{DATA.SELECT_NINES}</p>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white d-flex justify-content-between footer">
        <Button variant="outline-danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={!isValid() ? 'outline-light' : 'outline-success'}
          disabled={!isValid()}
          onClick={handleStartRound}
        >
          Start Playing
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewRoundModal;
