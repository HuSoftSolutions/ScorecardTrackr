import React, { useEffect, useState } from 'react'
import { useStore } from "../../store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

import Scorecard from '../Scorecard';
import Matches from '../Matches';
import Holes from '../Holes';

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

    useEffect(() => {

        async function getRound__FS(id) {
            const ref = doc(db, "rounds", id);
            const round = await getDoc(ref);
            if(round.exists()){
                dispatch(round.data());
            }
        }

        console.log(params?.id)
        if (state.round_id === null && params?.id !== null) {
            getRound__FS(params.id)
        }
    }, [])

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
                  
                </Tab>
                <Tab eventKey="matches" title="Matches" className="">
                    <div className="d-flex text-dark w-100 h-100 bg-warning "> est </div>
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