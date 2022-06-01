import React, { useEffect, useState } from 'react'
import { useStore } from "../../store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

import Scorecard from '../Scorecard';
import "./index.scss";

import { FiMinus, FiPlus } from 'react-icons/fi'

const HOLE_SCORE_LIMIT = 9;

const ActiveRound = () => {

    const { state, dispatch } = useStore();

    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();

    const returnScore = (i) => {
        let currentPlayer = (state.players.filter(p => p.id = i + 1))[i];
        console.log(currentPlayer)
        let score = currentPlayer?.score?.[state.current_hole_index] || 0;

        return (
            <h1 className="mb-0">
                {score}
            </h1>
        );
    }

    function decreaseScore(playerIndex) {
        let currentPlayer = (state.players.filter(p => p.id = playerIndex + 1))?.[playerIndex];
        console.log(currentPlayer)
        let curScore = currentPlayer?.score?.[state.current_hole_index];
        let isValid = curScore > 0;

        currentPlayer.score[state.current_hole_index] = isValid ? curScore - 1 : curScore;

        let players = [...state.players]
        players[playerIndex] = currentPlayer;

        return players;
    }


    function increaseScore(playerIndex) {
        let currentPlayer = (state.players.filter(p => p.id = playerIndex + 1))?.[playerIndex];
        let curScore = currentPlayer?.score?.[state.current_hole_index];
        let isValid = curScore + 1 < HOLE_SCORE_LIMIT;

        currentPlayer.score[state.current_hole_index] = isValid ? curScore + 1 : curScore;

        let players = [...state.players]
        players[playerIndex] = currentPlayer;

        return players;
    }

    function ControlledTabs() {
        const [key, setKey] = useState('profile');
        return (
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Scorecard">
                    <Scorecard />
                </Tab>
                <Tab eventKey="profile" title="Hole" className="hole-container d-flex flex-column h-100 p-3">
                    <div className="d-flex">
                        <div>
                            <FiMinus className="p-1 bg-dark text-light rounded" size="50"
                                onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole_index === 0 ? (state.card.holes.length - 1) : state.current_hole_index - 1 })}
                            />
                        </div>
                        <div className="m-0 text-dark bg-light rounded mx-1 text-center h-100 w-100 d-flex justify-content-center align-items-center">
                            <h1 className="mb-0">Hole {state.card.holes[state.current_hole_index]}</h1></div>
                        <div>
                            <FiPlus className="p-1 bg-dark text-light rounded" size="50"
                                onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole_index === state.card.holes.length - 1 ? 0 : state.current_hole_index + 1 })}
                            />
                        </div>
                    </div>
                    <div className="d-flex flex-column mt-3 rounded">
                        {state.players.map((p, i) => {
                            return (
                                <div key={i} className="d-flex text-light p-2 bg-dark my-1 align-items-center rounded">
                                    <div className="w-50"><h1 className="mb-0">{p.name}</h1></div>
                                    <div><FiMinus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set-player-score', players: decreaseScore(i) })} /></div>
                                    <div className="m-0 rounded mx-1 flex-fill text-center h-100 d-flex justify-content-center align-items-center">
                                        {returnScore(i)}
                                    </div>
                                    <div><FiPlus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set-player-score', players: increaseScore(i) })} /></div>
                                </div>
                            )
                        })}
                    </div>
                </Tab>
                <Tab eventKey="contact" title="Matches">
                    <div className="d-flex w-100 h-100">Test</div>
                </Tab>
            </Tabs>
        );
    }

    return (
        <div className="round-page">
            {/* <p>Round ID:{params.id}</p> */}
            <ControlledTabs className="" />
        </div>
    )
}

export default ActiveRound