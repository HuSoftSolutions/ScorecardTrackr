import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { BsFillTrashFill } from 'react-icons/bs';
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';
import * as functions from '../../helpers/functions';
import useWindowSize from '../../hooks/useWindowSize';
import "./index.scss";
/* CONSTANTS */

const DATA = {
  MATCH_TYPE_OPTIONS: [
    { label: 'Nassau', value: 'nassau' },
    { label: 'Best Ball', value: 'bestball' },
    { label: 'Skins', value: 'skins' },
  ],
  MATCH_FORMAT_OPTIONS: [
    { label: 'Individual Play', value: 'individual' },
    { label: 'Team Play', value: 'teams' },
  ],
  SCORING_OPTIONS: [
    { label: 'Stroke', value: 'stroke' },
    { label: 'Match', value: 'match' },
  ],
  INIT_MATCH_FORMAT: {
    label: 'Individual Play',
    value: 'individual',
  },
  INIT_TEAMS: { 'Team 1': [], 'Team 2': [] },
};

/* MATCHES COMPONENT */

const Matches = () => {
  const { state, dispatch } = useStore();
  const { width, height } = useWindowSize();

  const [showNewMatchModal, setShowNewMatchModal] = useState(false);
  const [matchToDelete, setMatchToDelete] = useState(null);
  const [matchFormat, setMatchFormat] = useState(
    DATA.INIT_MATCH_FORMAT,
  );
  const [matchType, setMatchType] = useState(null);
  const [scoringType, setScoringType] = useState(null);
  const [teams, setTeams] = useState(DATA.INIT_TEAMS);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!state.players) return;
    else setParticipants(getPlayerOptions());
  }, [state.players]);

  /* HELLPER FUNCTIONS */

  function closeModal() {
    setShowNewMatchModal(false);
    setMatchFormat(DATA.INIT_MATCH_FORMAT);
    setMatchType(null);
    setScoringType(null);
    setTeams(DATA.INIT_TEAMS);
    setParticipants(getPlayerOptions());
  }

  function saveMatch() {
    const matches = [...state.matches];
    const newMatch = getMatchDetails();
    if (!newMatch.matchType || !newMatch.scoringType) return;
    matches.push(newMatch);
    dispatch({ type: 'update-matches', matches: matches });
    closeModal();
  }

  function getMatchDetails() {
    return {
      matchFormat,
      matchType,
      scoringType,
      teams,
      participants,
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
      let m = [...state.matches];
      m.splice(index, 1);
      dispatch({ type: 'update-matches', matches: m });
    }
  }

  /* HELPER COMPONENTS */

  const MatchTypeDropdown = (props) => {

    return (
      <div className="p-1 w-100">
        <strong>Match Type</strong>
        <Select
          value={props.matchType}
          onChange={props.setMatchType}
          options={DATA.MATCH_TYPE_OPTIONS}
        />
      </div>
    );
  };

  const ScoringDropdown = () => {
    return (
      <div className="p-1 w-100">
        <strong>Scoring Type</strong>
        <Select
          value={scoringType}
          onChange={setScoringType}
          options={DATA.SCORING_OPTIONS}
        />
      </div>
    );
  };

  const Teams = () => {
    return (
      <div>
        {Object.keys(teams).map((t, i) => (
          <div key={i}>
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

  const Matches = () => {
    return (
      <div className="d-flex flex-wrap">
        {state.matches.map((match, i) => {
          return <Match index={i} key={i} match={match} />;
        })}
      </div>
    );
  };

  const Match = (props) => {
    const {
      matchFormat,
      matchType,
      participants,
      scoringType,
      teams,
    } = props.match;

    const SkinsMatch = () => {
      let res = [];
      if (matchFormat.value === 'individual') {
        res = functions.calculateSkinsIndividual(state, participants);
      } else if (matchFormat.value === 'teams') {
        res = functions.calculateSkinsTeams(state, teams);
      }

      return (
        <div>
          {res.map((p, i) => {
            return (
              <div key={i} className=" p-1 d-flex">
                <div className="d-flex w-100 font-monospace" style={{ fontSize: '13px' }}>
                  <span className="fw-bold">{p.player}</span> <span className="text-danger mx-2">({p.score})</span> <span>Hole {p.hole}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const NassauMatch = () => {

      let res = [];
      if (matchFormat.value === 'individual') {
        res = functions.calculateNassauIndividual(state, participants);
      } else if (matchFormat.value === 'teams') {
        res = functions.calculateNassauTeams(state, teams);
      }
 
      return(
        <div></div>
      )
    }

    const BestBallMatch = () => {

      let res = [];
      if (matchFormat.value === 'individual') {
        res = functions.calculateBestBallIndividual(state, participants);
      } else if (matchFormat.value === 'teams') {
        res = functions.calculateBestBallTeams(state, teams);
      }
 
      return(
        <div></div>
      )
    }

    const CalculateMatchTotal = () => {
      let res = <div>Match not found</div>;

      switch (matchType.value) {
        case 'skins':
          res = SkinsMatch();
          break;

        case 'nassau':
          res = NassauMatch();
          break;

        case 'bestball':
          res = BestBallMatch();
          break;

        default:
          break;
      }

      return res;
    };

    const IndividualMatch = (props) => {
      return (
        <div className="d-flex">
          {props.match.participants.map((p, i) => {
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

    const TeamMatch = (props) => {
      const { teams } = props.match;

      const Team = (props) => {
        const { players } = props;
        return (
          <div className="" style={{ fontSize: '13px' }}>
            {players.map((p, i) => {
              return (
                <p key={i} className="m-0 mx-2">
                  {p.label}
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
              <div key={i} className="d-flex align-items-center">
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

    return (
      <div className="bg-light d-flex flex-column p-2 rounded m-1 flex-grow flex-fill col-12 col-lg-3">
        <div className="d-flex justify-content-between">
          <p className="m-0">
            <strong className="m-0">{matchType.label}</strong>
            {' | '}
            {matchFormat.label}
          </p>
          <BsFillTrashFill
            size="18"
            onClick={() => deleteMatch(props.index)}
            style={{ color: 'grey' }}
          />
        </div>
        <div className="bg-dark text-light rounded p-1 my-1">
          {matchFormat.value === 'individual' ? (
            <IndividualMatch {...props} />
          ) : (
            <TeamMatch {...props} />
          )}
        </div>
        <div>
          <CalculateMatchTotal match={props.match} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="p-3 d-flex flex-column matches-container"
      style={{ height: (height || 120) - 120, overflowX: 'auto' }}
    >
      <div className="d-flex justify-content-between align-items-center text-dark">
        <h3 className="m-0">Current Matches</h3>
        <Button
          onClick={() => {
            setShowNewMatchModal(true);
          }}
        >
          New Match
        </Button>
      </div>
      <hr />
      <Matches />
      <Modal show={showNewMatchModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>Create New Match</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-1">
            <strong>Format</strong>
            <Select
              className="flex-fill"
              value={matchFormat}
              onChange={setMatchFormat}
              options={DATA.MATCH_FORMAT_OPTIONS}
            />
          </div>
          <div className="d-flex">
            <MatchTypeDropdown
              matchType={matchType}
              setMatchType={setMatchType}
            />
            <ScoringDropdown />
          </div>
          {matchFormat?.value === 'individual' ? (
            <ParticipantSelection />
          ) : (
            <Teams />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            disabled={!matchType || !scoringType}
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
