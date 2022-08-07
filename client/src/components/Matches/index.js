import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { BsFillTrashFill } from "react-icons/bs";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal";
import * as functions from "../../helpers/functions";
import useWindowSize from "../../hooks/useWindowSize";
import "./index.scss";
import { RESET } from "../../constants/routes";
import { v4 as uuidv4 } from "uuid";

/* CONSTANTS */

const MATCH_DATA = [
  {
    label: "Skins Team Match",
    value: ["skins", "team"],
  },
  {
    label: "Skins Individual Match",
    value: ["skins", "individual"],
  },
  {
    label: "Nassau Team Stroke Play",
    value: ["nassau", "team", "stroke"],
  },
  {
    label: "Nassau Individual Stroke Play",
    value: ["nassau", "individual", "stroke"],
  },
  {
    label: "Nassau Team Match Play",
    value: ["nassau", "team", "match"],
  },
  {
    label: "Nassau Individual Match Play",
    value: ["nassau", "individual", "match"],
  },
  {
    label: "Best Ball Team Stroke Play",
    value: ["bestball", "team", "stroke"],
  },
  {
    label: "Best Ball Team Match Play",
    value: ["bestball", "team", "match"],
  },
];

const INIT_TEAMS = { "Team 1": [], "Team 2": [] };

/* MATCHES COMPONENT */
const Matches = (props) => {
  const { state, dispatch } = useStore();

  const [matches, setMatches] = useState([]);
  const [showNewMatchModal, setShowNewMatchModal] = useState(false);
  const [showPressTypeModal, setShowPressTypeModal] = useState(null);
  const [matchToDelete, setMatchToDelete] = useState(null);
  const [matchFormat, setMatchFormat] = useState(null);
  const [teams, setTeams] = useState(INIT_TEAMS);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!state.players) return;
    else setParticipants(getPlayerOptions());
  }, [state.players]);

  useEffect(() => {
    if (!state.matches) return;
    else setMatches(state.matches);
  }, [state.matches]);

  /* HELLPER FUNCTIONS */

  function closeNewMatchModal() {
    setShowNewMatchModal(false);
    setMatchFormat(null);
    setTeams(INIT_TEAMS);
    setParticipants(getPlayerOptions());
  }

  function saveMatch() {
    const matches_ = [...matches];
    const newMatch = getMatchDetails();

    const matchFormat = newMatch.matchFormat;

    if (!matchFormat) return;
    matches_.push(newMatch);
    dispatch({ type: "update-matches", matches: matches_ });
    closeNewMatchModal();
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
      let m = [...matches];
      m.splice(index, 1);
      dispatch({ type: "update-matches", matches: m });
    }
  }

  function assignPressTypeForMatch(type, match) {
    console.log(
      `pressing ${showPressTypeModal} hole ${state.current_hole_index + 1}`
    );
    const presses = { ...match?.presses };
    const playerPresses = presses[showPressTypeModal] || {};
    playerPresses[state.current_hole_index] = type;
    if (type === null) delete playerPresses[state.current_hole_index];

    let matchIndex = matches.findIndex((m) => m.id === match.id);
    matches[matchIndex].presses[showPressTypeModal] = playerPresses;

    dispatch({ type: "update-matches", matches });
    setShowPressTypeModal(null);
  }

  /* HELPER COMPONENTS */

  const Teams = () => {
    return (
      <div>
        {Object.keys(teams).map((t, i) => (
          <div key={i} style={{ fontSize: "13px" }}>
            <TeamSelection name={t} />
            {i < Object.keys(teams).length - 1 ? <span>vs.</span> : null}
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
        {matches.map((match, i) => {
          // console.log("match", i, match?.matchFormat?.label, match);
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
            <div key={i} className="d-flex" style={{ fontSize: "13px" }}>
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
        <div className="d-flex" style={{ fontSize: "13px" }}>
          {players.map((p, i) => {
            return (
              <p key={i} className="m-0 mx-2">
                {p.label}
                {players.length > 1 && i + i < players.length ? ", " : null}
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
              style={{ fontSize: "13px" }}
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

    const SkinsMatch = () => {
      let res = [];
      if (matchFormat.value.includes("individual")) {
        res = functions.calculateSkinsIndividual(state, participants);
      } else if (matchFormat.value.includes("team")) {
        res = functions.calculateSkinsTeams(state, teams);
      }

      return (
        <div className="w-100 font-monospace" style={{ fontSize: "13px" }}>
          {res.length === 0 ? (
            <div className="p-2">No skins have been made.</div>
          ) : null}
          {res.map((p, i) => {
            return (
              <div key={i} className="p-2">
                <div>
                  <span className="fw-bold">{p.player}</span>{" "}
                  <span className="text-danger mx-2">(skin {p.score})</span>{" "}
                  <span>Hole {p.hole}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const NassauMatch = () => {
      let res = [];
      const { match } = props;
      if (matchFormat.value.includes("individual")) {
        res = functions.calculateNassauIndividual(state, match);
      } else if (matchFormat.value.includes("team")) {
        res = functions.calculateNassauTeams(state, match);
      }

      function calculateNassauMatchSign(value) {
        const sign =
          value > 0 ? (
            <VscTriangleDown className="text-danger" size={20} />
          ) : value < 0 ? (
            <VscTriangleUp className="text-success" size={20} />
          ) : (
            <span className="mb-0 fw-bold">AS</span>
          );
        return sign;
      }

      return (
        <div className="font-monospace" style={{ fontSize: "13px" }}>
          {res.map((m, i) => {
            const { f, b, t } = m.status;

            let bSign = calculateNassauMatchSign(b);

            let tSign = calculateNassauMatchSign(t);

            const presses = { ...match?.presses };
            const playerPresses = presses[m.name] || {};
            const pressType = playerPresses[state.current_hole_index] || "";

            return (
              <div key={i} className="d-flex justify-content-between p-2 w-100">
                <div
                  className="flex-fill me-2"
                  style={{ overflowX: "auto", width: "120px" }}
                >
                  <span className="fw-bold">{m.name}</span>
                  <span className="d-flex align-items-center my-1" >
                    Front:
                    {f.map((m, i) => {
                      let fSign = calculateNassauMatchSign(m);

                      return (
                        <div key={i} className="d-flex align-items-center px-1 mx-1 rounded" style={{border: '1px solid gray'}}>
                          <span className="">{fSign}</span>
                          {m === 0 ? "" : Math.abs(m)}
                        </div>
                      );
                    })}
                  </span>
                  <span className="d-flex align-items-center my-1">
                    Back:
                    {b.map((m, i) => {
                      let fSign = calculateNassauMatchSign(m);

                      return (
                        <div key={i} className="d-flex align-items-center px-1 mx-1 rounded" style={{border: '1px solid gray'}}>
                          <span className="">{fSign}</span>
                          {m === 0 ? "" : Math.abs(m)}
                        </div>
                      );
                    })}
                  </span>
                  <span className="d-flex align-items-center my-1">
                    Total:
                    {t.map((m, i) => {
                      let fSign = calculateNassauMatchSign(m);

                      return (
                        <div key={i} className="d-flex align-items-center px-1 mx-1 rounded" style={{border: '1px solid gray'}}>
                          <span className="">{fSign}</span>
                          {m === 0 ? "" : Math.abs(m)}
                        </div>
                      );
                    })}
                  </span>
                </div>
                <div>
                  <Button
                    className={
                      pressType === ""
                        ? "bg-success text-light border-success"
                        : "bg-light text-success border-success"
                    }
                    size="sm"
                    disabled={false}
                    onClick={() => {
                      setShowPressTypeModal(m.name);
                    }}
                  >
                    {pressType === "" ? (
                      <>PRESS</>
                    ) : (
                      <>Pressed {pressType.toUpperCase()}</>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
          {/* PRESS TYPE MODAL */}
          <Modal show={showPressTypeModal !== null} backdrop="static">
            <Modal.Header>
              <Modal.Title className="d-flex w-100">
                <div className="d-flex justify-content-between w-100">
                  <span>{showPressTypeModal}</span>
                  <span>Press Hole #{state.current_hole_index + 1}</span>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className="d-flex flex-column justify-content-around"
                style={{ height: "200px " }}
              >
                <Button
                  className=""
                  size="lg"
                  onClick={() => {
                    assignPressTypeForMatch(nineType, props.match);
                  }}
                >
                  {nineType === "f" ? "Press Front" : "Press Back"}
                </Button>
                <Button
                  onClick={() => assignPressTypeForMatch("t", props.match)}
                  className=""
                  size="lg"
                >
                  Press Total
                </Button>
                <Button
                  size="lg"
                  className="bg-danger border-danger text-white"
                  onClick={() => {
                    assignPressTypeForMatch(null, props.match);
                    setShowPressTypeModal(null);
                  }}
                >
                  Remove Press
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="lg"
                className="bg-light border-light text-dark"
                onClick={() => setShowPressTypeModal(null)}
              >
                Back
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    };

    const BestBallMatch = () => {
      let res = [];
      if (matchFormat.value.includes("team")) {
        res = functions.calculateBestBallTeams(state, props.match);
      }

      return (
        <div className="font-monospace" style={{ fontSize: "13px" }}>
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
                  {t === 0 ? "" : Math.abs(t)}{" "}
                </span>
              </div>
            );
          })}
        </div>
      );
    };

    const CalculateMatchTotal = () => {
      let res = <div>Match not found</div>;

      if (matchFormat.value.includes("skins")) res = SkinsMatch();

      if (matchFormat.value.includes("nassau")) res = NassauMatch();

      if (matchFormat.value.includes("bestball")) res = BestBallMatch();

      return res;
    };

    return (
      <div className="bg-light d-flex flex-column p-2 rounded my-1">
        <div className="d-flex justify-content-between">
          <div className="m-0">
            <strong className="m-0">{matchFormat.label}</strong>
            {matchFormat.value.includes("individual") ? (
              <ListParticipants participants={participants} />
            ) : (
              <ListTeams teams={teams} />
            )}
          </div>
          <BsFillTrashFill
            size="18"
            onClick={() => deleteMatch(props.index)}
            style={{ color: "grey" }}
          />
        </div>
        <hr className="m-0 mt-1 mb-2" />
        <div>
          <CalculateMatchTotal match={props.match} />
        </div>
      </div>
    );
  };

  const nineType = state.current_hole_index < 9 ? "f" : "b";

  return (
    <>
      {/* SHOW NEW MATCH BUTTON */}
      <Button
        className="d-flex w-100 justify-content-center"
        onClick={() => {
          setShowNewMatchModal(true);
        }}
      >
        Start New Match
      </Button>

      {/* MATCHES */}
      <Matches {...props} />

      {/* NEW MATCH MODAL */}
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
            matchFormat.value.includes("individual") ? (
              <ParticipantSelection />
            ) : (
              <Teams />
            )
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeNewMatchModal}>
            Cancel
          </Button>
          <Button variant="success" disabled={!matchFormat} onClick={saveMatch}>
            Save Match
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CONFIRM DELETE MATCH MODAL */}
      <ConfirmDeleteModal
        show={matchToDelete !== null}
        onConfirm={() => deleteMatch(matchToDelete)}
        onClose={() => setMatchToDelete(null)}
      />
    </>
  );
};

export default Matches;
