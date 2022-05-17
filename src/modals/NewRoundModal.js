import React, { useState } from 'react'
import { useStore } from "../store";
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { HiUserRemove, HiUserAdd } from "react-icons/hi"
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from '../constants/routes';
import "./newRoundModal.scss";

/* Static Text */
const DATA = {
    TITLE: "New Round",
    SUBTITLE: "Click each button to toggle selection",
    PLAYER_ADD: "Please add players"
}

const NewRoundModal = (props) => {

    /* Hooks */
    const { state, dispatch } = useStore();
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);

    /* Components */
    function isValid() {

        let errors = [];

        if (!state.selected_course) errors.push("Please select a course")
        if (!players?.length) errors.push("Please add players to begin the round")
        if (players?.filter(p => p.name === "").length) errors.push("Please add players to begin the round")

        return !errors.length;
    }

    function handleClose() {
        dispatch({ type: 'close_new_match_modal' });
        setPlayers([])
    }

    function handleStartRound() {
        const ID = uuidv4();
        navigate(ROUTES.ROUND + `/${ID}`)
        handleClose();
        dispatch({ type: 'start_new_round', round_id: ID, players, nines: ["front", "back"] });
    }

    function handleCourseSelection(course) {
        dispatch({ type: 'set_selected_course', selected_course: course });
    }

    function generateScorecard() {
        
    }

    function newPlayer() { return { name: "", hdcp: 0, id: uuidv4(), scorecard: generateScorecard() }; };

    function removePlayer(p) { setPlayers(players.filter((el) => el.id !== p.id)); };

    function updatePlayer(id, key, value) {
        let index = players.findIndex(p => p.id === id);
        let players_ = [...players]
        players_[index][key] = value;
        setPlayers(players_);
    };

    /* Components */
    const CourseSelection = () => {

        return (
            <div className="d-flex flex-column justify-content-between my-2">
                <Dropdown>
                    <Dropdown.Toggle size="sm" variant={state.selected_course ? "dark" : "light"} id="dropdown-basic">
                        {state?.selected_course?.name || "Please select a course"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {state.courses.map((c, i) => <Dropdown.Item key={i} onClick={() => handleCourseSelection(c)}>{c.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }



    return (
        <Modal centered backdrop="static" show={props.show} onHide={handleClose}>
            <Modal.Header className="bg-dark text-white d-flex flex-row m-0 header">
                <Modal.Title>{DATA.TITLE}</Modal.Title>
                <CourseSelection />
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <div>
                    <div className="d-flex justify-content-end w-100">
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            {players?.length ? <p className="mb-0">Players</p> : <p className="mb-0">{DATA.PLAYER_ADD}</p>}
                            <HiUserAdd size={35} className="text-success" onClick={() => setPlayers([...players, newPlayer()])} /></div>
                    </div>
                    {players?.map((p, i) => {

                        return (
                            <div key={i} className="d-flex flex-fill w-100 mt-2">
                                <input className="w-50 mx-1 border-0 rounded p-1 px-4 small flex-fill" placeholder='Player Name' type="text" value={p.name} onChange={(e) => { updatePlayer(p.id, 'name', e.target.value) }} />
                                <input className="mx-1 text-dark border-0 rounded p-1 px-4 w-25 small text-center" placeholder='Player Handicap' type="number" value={p.hdcp} onChange={(e) => { updatePlayer(p.id, 'hdcp', e.target.value) }} />
                                <div><HiUserRemove size={35} className="text-danger" onClick={() => { removePlayer(p) }} /></div>
                            </div>
                        )
                    })}

                </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white d-flex justify-content-between footer">
                <Button variant="outline-danger" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant={!isValid() ? "outline-light" : "outline-success"} disabled={!isValid()} onClick={handleStartRound}>
                    Start Playing
                </Button>
            </Modal.Footer>
        </Modal>)
}

export default NewRoundModal