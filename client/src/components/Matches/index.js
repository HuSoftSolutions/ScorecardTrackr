import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { BsFillTrashFill } from 'react-icons/bs';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';
import * as functions from '../../helpers/functions';
import useWindowSize from '../../hooks/useWindowSize';
import './index.scss';
import { RESET } from '../../constants/routes';
import { v4 as uuidv4 } from 'uuid';

/* CONSTANTS */

const MATCH_DATA = [
  {
    label: 'Skins Team Match',
    value: ['skins', 'team'],
  },
  {
    label: 'Skins Individual Match',
    value: ['skins', 'individual'],
  },
  {
    label: 'Nassau Team Stroke Play',
    value: ['nassau', 'team', 'stroke'],
  },
  {
    label: 'Nassau Individual Stroke Play',
    value: ['nassau', 'individual', 'stroke'],
  },
  {
    label: 'Nassau Team Match Play',
    value: ['nassau', 'team', 'match'],
  },
  {
    label: 'Nassau Individual Match Play',
    value: ['nassau', 'individual', 'match'],
  },
  {
    label: 'Best Ball Team Stroke Play',
    value: ['bestball', 'team', 'stroke'],
  },
  {
    label: 'Best Ball Team Match Play',
    value: ['bestball', 'team', 'match'],
  },
];

const INIT_TEAMS = { 'Team 1': [], 'Team 2': [] };

/* MATCHES COMPONENT */

const Matches = (props) => {
  const { state, dispatch } = useStore();
  // const { width, height } = useWindowSize();

  const [showNewMatchModal, setShowNewMatchModal] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState(null);

  const [matchFormat, setMatchFormat] = useState(null);

  const [teams, setTeams] = useState(INIT_TEAMS);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!state.players) return;
    else setParticipants(getPlayerOptions());
  }, [state.players]);

  /* HELLPER FUNCTIONS */

  function closeModal() {
    setShowNewMatchModal(false);
    setMatchFormat(null);
    setTeams(INIT_TEAMS);
    setParticipants(getPlayerOptions());
  }

  function saveMatch() {
    const matches = [...props.matches];
    const newMatch = getMatchDetails();

    const matchFormat = newMatch.matchFormat;

    if (!matchFormat) return;
    matches.push(newMatch);
    dispatch({ type: 'update-matches', matches: matches });
    closeModal();
  }

  function getMatchDetails() {
    return {
      matchFormat,
      teams,
      participants,
      presses: {}, // key: match.name (Cody vs Tom : [4, 6]) press on holes 4 and 6
      id: uuidv4(),
    };
  }

  function getPlayerOptions() {
    const { players } = state;
    let p = [];
    players.forEach((ply) => {
      p.push({ value: ply.uid, label: ply.name });
    });
    return p;
  }

  function deleteMatch(index) {
    if (matchToDelete === null) {
      setMatchToDelete(index);
    } else {
      setMatchToDelete(null);
      let m = [...props.matches];
      m.splice(index, 1);
      dispatch({ type: 'update-matches', matches: m });
    }
  }

  /* HELPER COMPONENTS */

  const Teams = () => {
    return (
      <div>
        {Object.keys(teams).map((t, i) => (
          <div key={i} style={{ fontSize: '13px' }}>
            <TeamSelection name={t} />
            {i < Object.keys(teams).length - 1 ? (
              <span>vs.</span>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const TeamSelection = (props) => {
    return (
      <div className="p-1">
        <strong>{props.name}</strong>
        <Select
          isMulti
          value={teams[props.name]}
          onChange={(option) => {
            const t = { ...teams };
            t[props.name] = option;
            setTeams(t);
          }}
          options={getPlayerOptions()}
        />
      </div>
    );
  };

  const ParticipantSelection = () => {
    return (
      <div className="p-1">
        <strong>Participants</strong>
        <Select
          isMulti
          value={participants}
          onChange={(option) => setParticipants(option)}
          options={getPlayerOptions()}
        />
      </div>
    );
  };

  const Matches = (props) => {
    return (
      <div className="d-flex flex-column">
        {props.matches.map((match, i) => {
          return <Match index={i} key={i} match={match} {...props} />;
        })}
      </div>
    );
  };

  const ListParticipants = (props) => {
    const { participants } = props;

    return (
      <div className="d-flex flex-row">
        {participants.map((p, i) => {
          return (
            <div
              key={i}
              className="d-flex"
              style={{ fontSize: '13px' }}
            >
              <div className="mx-2">{p.label}</div>
              {i + 1 < participants.length ? (
                <span className="text-light-dark">vs.</span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const ListTeams = (props) => {
    const { teams } = props;

    const Team = (props) => {
      const { players } = props;

      return (
        <div className="d-flex" style={{ fontSize: '13px' }}>
          {players.map((p, i) => {
            return (
              <p key={i} className="m-0 mx-2">
                {p.label}
                {players.length > 1 && i + i < players.length
                  ? ', '
                  : null}
              </p>
            );
          })}
        </div>
      );
    };

    return (
      <div className="d-flex flex-row">
        {Object.keys(teams).map((t, i) => {
          return (
            <div
              key={i}
              className="d-flex align-items-center"
              style={{ fontSize: '13px' }}
            >
              <Team players={teams[t]} />
              {i + 1 < Object.keys(teams).length ? (
                <span className="text-light-dark">vs.</span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const Match = (props) => {
    const { matchFormat, participants, teams } = props.match;
    const [canPress, setCanPress] = useState(false);

    const SkinsMatch = () => {
      let res = [];
      if (matchFormat.value.includes('individual')) {
        res = functions.calculateSkinsIndividual(state, participants);
      } else if (matchFormat.value.includes('team')) {
        res = functions.calculateSkinsTeams(state, teams);
      }

      return (
        <div
          className="w-100 font-monospace"
          style={{ fontSize: '13px' }}
        >
          {res.length === 0 ? (
            <div className="p-2">No skins have been made.</div>
          ) : null}
          {res.map((p, i) => {
            return (
              <div key={i} className="p-2">
                <div>
                  <span className="fw-bold">{p.player}</span>{' '}
                  <span className="text-danger mx-2">
                    (skin {p.score})
                  </span>{' '}
                  <span>Hole {p.hole}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    // function canPress(){
    //   let res = false;

    //   const playerScoresForHole = functions.getAllPlayerScoresForHole(state.current_hole_index, state.players)

    //   return res;
    // }

    const NassauMatch = () => {
      let res = [];
      const { match } = props;
      console.log(props)
      if (matchFormat.value.includes('individual')) {
        res = functions.calculateNassauIndividual(state, match);
      } else if (matchFormat.value.includes('team')) {
        res = functions.calculateNassauTeams(state, match);
      }

      // const canPress = props.match.presses?.includes(state.current_hole_index)

      return (
        <div className="font-monospace" style={{ fontSize: '13px' }}>
          {res.map((m, i) => {
            const { f, b, t } = m.status;

            let fSign =
              f > 0 ? (
                <VscTriangleDown className="text-danger" size={20} />
              ) : f < 0 ? (
                <VscTriangleUp className="text-success" size={20} />
              ) : (
                <span className="mb-0 fw-bold">AS</span>
              );
            let bSign =
              b > 0 ? (
                <VscTriangleDown className="text-danger" size={20} />
              ) : b < 0 ? (
                <VscTriangleUp className="text-success" size={20} />
              ) : (
                <span className="mb-0 fw-bold">AS</span>
              );
            let tSign =
              t > 0 ? (
                <VscTriangleDown className="text-danger" size={20} />
              ) : t < 0 ? (
                <VscTriangleUp className="text-success" size={20} />
              ) : (
                <span className="mb-0 fw-bold">AS</span>
              );

            return (
              <div
                key={i}
                className="d-flex justify-content-between p-2 "
              >
                <div>
                  <span className="fw-bold">{m.name}</span>
                  <span className="d-flex align-items-center">
                    Front:
                    <span className="mx-2">{fSign}</span>
                    {f === 0 ? '' : Math.abs(f)}
                  </span>
                  <span className="d-flex align-items-center">
                    Back:
                    <span className="mx-2">{bSign}</span>
                    {b === 0 ? '' : Math.abs(b)}{' '}
                  </span>
                  <span className="d-flex align-items-center">
                    Total:
                    <span className="mx-2">{tSign}</span>
                    {t === 0 ? '' : Math.abs(t)}{' '}
                  </span>
                </div>
                <div>
                  <Button
                    className="bg-light-dark border-light-dark text-dark"
                    size="sm"
                    disabled={false}
                    onClick={() => {
                      const presses = {...match?.presses}
                      const playerPresses = presses[m.name] || {}
                      console.log('presses', presses, playerPresses)
                      if (playerPresses[state.current_hole_index]) {
                        console.log(
                          `Already pressed hole ${
                            state.current_hole_index + 1
                          }`,
                        );
                      } else {
                        console.log(
                          `pressing ${m.name} hole ${
                            state.current_hole_index + 1
                          }`,
                        );
                        playerPresses[state.current_hole_index] = true;

                        let matchIndex = props.matches.findIndex(
                          (m) => m.id === match.id,
                        );
                        const matches = [...props.matches];
                        matches[matchIndex].presses[m.name] = playerPresses;

                        dispatch({ type: 'update-matches', matches:matches });
                      }
                    }}
                  >
                    Press Hole {state.current_hole_index + 1}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const BestBallMatch = () => {
      let res = [];
      if (matchFormat.value.includes('team')) {
        res = functions.calculateBestBallTeams(state, props.match);
      }

      return (
        <div className="font-monospace" style={{ fontSize: '13px' }}>
          {res.map((match, i) => {
            const { t } = match.status;

            let tSign =
              t > 0 ? (
                <VscTriangleDown className="text-danger" size={20} />
              ) : t < 0 ? (
                <VscTriangleUp className="text-success" size={20} />
              ) : (
                <span className="mb-0 fw-bold">AS</span>
              );

            return (
              <div key={i} className="d-flex flex-column p-2 ">
                <span className="fw-bold">{match.name}</span>
                <span className="d-flex align-items-center">
                  Total:
                  <span className="mx-2">{tSign}</span>
                  {t === 0 ? '' : Math.abs(t)}{' '}
                </span>
              </div>
            );
          })}
        </div>
      );
    };

    const CalculateMatchTotal = () => {
      let res = <div>Match not found</div>;

      if (matchFormat.value.includes('skins')) res = SkinsMatch();

      if (matchFormat.value.includes('nassau')) res = NassauMatch();

      if (matchFormat.value.includes('bestball'))
        res = BestBallMatch();

      return res;
    };

    return (
      <div className="bg-light d-flex flex-column p-2 rounded my-1">
        <div className="d-flex justify-content-between">
          <div className="m-0">
            <strong className="m-0">{matchFormat.label}</strong>
            {matchFormat.value.includes('individual') ? (
              <ListParticipants participants={participants} />
            ) : (
              <ListTeams teams={teams} />
            )}
          </div>
          <BsFillTrashFill
            size="18"
            onClick={() => deleteMatch(props.index)}
            style={{ color: 'grey' }}
          />
        </div>
        <hr className="m-0 mt-1 mb-2" />
        <div>
          <CalculateMatchTotal match={props.match} />
        </div>
      </div>
    );
  };

  return (
    <div
    // className="p-3 d-flex flex-column matches-container"
    // style={{ height: (height || 140) - 140, overflowX: 'auto' }}
    >
      {/* <div className="d-flex justify-content-end align-items-center text-dark"> */}
      {/* <h3 className="m-0">Current Matches</h3> */}
      <Button
        className="d-flex w-100"
        onClick={() => {
          setShowNewMatchModal(true);
        }}
      >
        New Match
      </Button>
      {/* </div> */}
      {/* <hr /> */}
      <Matches {...props}/>
      <Modal show={showNewMatchModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>Create New Match</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-1 mb-3">
            <strong>Select Match Format</strong>
            <Select
              className="flex-fill"
              value={matchFormat}
              onChange={setMatchFormat}
              options={MATCH_DATA}
            />
          </div>
          {matchFormat !== null ? (
            matchFormat.value.includes('individual') ? (
              <ParticipantSelection />
            ) : (
              <Teams />
            )
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            disabled={!matchFormat}
            onClick={saveMatch}
          >
            Save Match
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmDeleteModal
        show={matchToDelete !== null}
        onConfirm={() => deleteMatch(matchToDelete)}
        onClose={() => setMatchToDelete(null)}
      />
    </div>
  );
};

export default Matches;
