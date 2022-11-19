import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import {
  Button,
  Col,
  Row,
  Dropdown,
  Modal,
  InputGroup,
  Form,
} from "react-bootstrap";
import { HiUserRemove, HiUserAdd } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import * as FUNCTIONS from "../helpers/functions.js";
import "./newRoundModal.scss";
import { db, auth } from "../firebase.js";
import Select from "react-select";

/* Static Text */
const DATA = {
  SUBTITLE: "Click each button to toggle selection",
  PLAYER_ADD: "Add Players to Continue",
  SELECT_NINES: "Choose Course and Select Nines to Continue",
};

const INIT_PLAYERS = [
  {
    name: "",
    handicap: "",
    uid: uuidv4(),
    score: [],
    hdcpHoles: [],
    teebox: "",
  },
  {
    name: "",
    handicap: "",
    uid: uuidv4(),
    score: [],
    hdcpHoles: [],
    teebox: "",
  },
  {
    name: "",
    handicap: "",
    uid: uuidv4(),
    score: [],
    hdcpHoles: [],
    teebox: "",
  },
  {
    name: "",
    handicap: "",
    uid: uuidv4(),
    score: [],
    hdcpHoles: [],
    teebox: "",
  },
];

const NewRoundModal = (props) => {
  /* Hooks */
  const { state, dispatch } = useStore();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);

  const [nines, setNines] = useState([]);

  const [selected_course, set_selected_course] = useState(null);

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    refreshState();
  }, [state.showNewRoundModal]);

  /* Functions */
  function isValid() {
    let errors = [];

    if (!selected_course) errors.push("Please select a course");
    if (!players?.length) errors.push("Please add players to begin the round");
    if (players?.filter((p) => p.name === "" || p.teebox === "").length)
      errors.push("Please add players to begin the round");
    if (!nines.length) errors.push("");

    return !errors.length;
  }

  function refreshState() {
    const stateCopy = JSON.parse(JSON.stringify(state));

    if (stateCopy.nines.length) setNines([...stateCopy.nines]);
    else setNines([]);

    if (stateCopy.players.length) setPlayers([...stateCopy.players]);
    else setPlayers([...INIT_PLAYERS]);

    if (stateCopy.selected_course)
      set_selected_course(stateCopy.selected_course);
    else set_selected_course(null);

    if (stateCopy.matches) setMatches([...stateCopy.matches]);
    else setMatches([]);
  }

  function handleClose() {
    dispatch({ type: "close_new_match_modal" });
  }

  function initializePlayerScorecards(players, card) {
    let p = [...players].filter((p) => p.name.replace(/\s/g, "") !== "");

    p.forEach((player, playerIndex) => {
      const blankCard = FUNCTIONS.generateBlankScorecard(nines);

      p[playerIndex].score = p[playerIndex].startedRound
        ? p[playerIndex].score
        : [...blankCard];

      const handicap_data = FUNCTIONS.assignPlayerHandicap(player, card, [
        ...blankCard,
      ]);
      p[playerIndex].hdcpHoles = handicap_data.hdcpHoles;
      p[playerIndex].handicapAdjusted = handicap_data.hcap;
      p[playerIndex].startedRound = true;
    });

    return p;
  }

  function handleStartRound() {
    const ID = uuidv4();
    const card = combineNines();
    const players_ = initializePlayerScorecards(players, card);
    const { name } = selected_course;

    dispatch({
      type: "start_new_round",
      round_id: state.round_id || ID,
      created_at: new Date(),
      owner: auth?.currentUser?.uid,
      players: [...players_].map((p) => {
        return { ...p, handicap: p.handicap == "" ? 0 : p.handicap };
      }),
      card,
      course: name,
      nines,
      selected_course: selected_course,
      matches,
      showNewRoundModal: false,
    });
    navigate(ROUTES.ROUND + `/${ID}`);
  }

  function handleCourseSelection(course) {
    players.forEach((p) => {
      updatePlayer(p.uid, "teebox", null);
    });

    set_selected_course(course);
  }

  function removePlayer(p) {
    setPlayers(players.filter((el) => el.uid !== p.uid));
  }

  function updatePlayer(uid, key, value) {
    let index = players.findIndex((p) => p.uid === uid);
    let players_ = [...players];
    players_[index][key] = value;
    setPlayers([...players_]);
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

  function initializeTeeBoxes(tees) {
    let teeboxes = {};
    tees.forEach((tee) => {
      teeboxes[tee.value] = {
        yards: [],
        hdcp: [],
        par: [],
      };
    });
    // console.log(teeboxes)
    return teeboxes;
  }

  function combineNines() {
    const { tees } = selected_course;
    let holes = {
      holes: [],
      teeboxes: initializeTeeBoxes(tees),
      slope: 0,
      rating: 0,
      allTees: tees,
    };
    nines.forEach((nine) => {
      holes.holes = [...holes.holes, ...nine.holes];
      const tees = Object.keys(nine?.tees);
      tees?.forEach((teebox) => {
        holes.teeboxes[teebox]["yards"] = [
          ...holes.teeboxes[teebox]["yards"],
          ...nine.tees[teebox].yards,
        ];
        holes.teeboxes[teebox]["par"] = [
          ...holes.teeboxes[teebox]["par"],
          ...nine.tees[teebox].par,
        ];
        holes.teeboxes[teebox]["hdcp"] = [
          ...holes.teeboxes[teebox]["hdcp"],
          ...nine.tees[teebox].hdcp,
        ];
      });
    });
    // console.log(holes);
    return holes;
  }

  function isNineSelected(nine) {
    let found = -1;
    nines.forEach((n, i) => {
      if (nine.name === n.name) found = i;
    });

    return found;
  }

  /* Components */
  const CourseSelection = () => {
    return (
      <div className="d-flex justify-content-between align-items-center my-2">
        <label>Select Course</label>

        <Dropdown className="">
          <Dropdown.Toggle
            disabled={state.round_id !== null}
            size="sm"
            variant={selected_course ? "dark" : "light"}
            id="dropdown-basic"
            style={{ width: 200 }}
          >
            {selected_course?.name || "No Selection"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {state?.courses.map((c, i) => (
              <Dropdown.Item key={i} onClick={() => handleCourseSelection(c)}>
                {c.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const NinesSelection = () => {
    return selected_course ? (
      <div className="d-flex flex-row justify-content-end pb-3">
        {selected_course.nines.map((nine, nineIndex) => (
          <div key={nineIndex} className="form-check mx-2">
            <input
              disabled={state.round_id !== null}
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
    <Modal centered backdrop="static" show={props.show}>
      <Modal.Body className="">
        <CourseSelection />

        <NinesSelection />

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
                      name: "",
                      handicap: null,
                      uid: uuidv4(),
                      score: [],
                      hdcpHoles: [],
                      teebox: "",
                    },
                  ])
                }
              />
            </div>
          </div>
          <Form>
            {players?.map((p, i) => {
              return (
                <div
                  key={i}
                  className=" p-1 rounded my-2 border-1"
                  style={{ border: "1px #ccc solid" }}
                >
                  <div className="px-1 d-flex">
                    <Form.Group
                      size="sm"
                      className="d-flex flex-column flex-fill"
                    >
                      <Form.Control
                        className="w-100 flex-fill"
                        style={{
                          borderRadius: 0,
                          border: "0px",
                          borderBottom: "1px solid #ccc",
                        }}
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          updatePlayer(p.uid, "name", e.target.value);
                        }}
                        value={p.name}
                      />
                      <Form.Text
                        id="passwordHelpBlock"
                        style={{ fontSize: "10px" }}
                        className="m-0"
                        muted
                      >
                        Player Name
                      </Form.Text>
                    </Form.Group>
                    <div className="px-1 d-flex ">
                      <Form.Group className="m-0 d-flex" size="sm">
                        <MdOutlineClose
                          size={25}
                          className="text-dark m-0"
                          onClick={() => {
                            removePlayer(p);
                          }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="px-1">
                      <Form.Group className="d-flex flex-column" size="sm">
                        <Form.Control
                          className="w-100"
                          style={{
                            borderRadius: 0,
                            border: "0px",
                            borderBottom: "1px solid #ccc",
                          }}
                          type="number"
                          placeholder="0"
                          aria-label="Handicap"
                          aria-describedby="basic-addon1"
                          step={0.1}
                          precision={1}
                          value={p.handicap || ""}
                          onChange={(e) => {
                            updatePlayer(
                              p.uid,
                              "handicap",
                              e.target.value
                                ? Math.round(parseFloat(e.target.value) * 10) /
                                    10
                                : e.target.value
                            );
                          }}
                        />
                        <Form.Text
                          id="passwordHelpBlock"
                          className="m-0"
                          style={{ fontSize: "10px" }}
                          muted
                        >
                          GHIN Handicap
                        </Form.Text>
                      </Form.Group>
                    </div>
                    <div className="px-1 w-100">
                      {/* <Form.Group className="m-1" size="sm"> */}
                      <Select
                        placeholder="Tee Box"
                        options={selected_course?.tees}
                        value={p?.teebox}
                        onChange={(e) => {
                          updatePlayer(p.uid, "teebox", e);
                        }}
                      />
                      {/* </Form.Group> */}
                    </div>
                  </div>

                  {/* <hr className="m-0" /> */}
                </div>
              );
            })}
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className=" d-flex justify-content-between footer">
        <Button variant="outline-danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={!isValid() ? "outline-dark" : "outline-success"}
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
