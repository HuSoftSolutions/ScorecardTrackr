import React, { useEffect, useState } from 'react'
import { useStore } from "../../store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Scorecard from '../Scorecard';
import "./index.scss";

import { FiMinus, FiPlus } from 'react-icons/fi'

const ActiveRound = () => {

    const { state, dispatch } = useStore();

    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();

    // load 
    useEffect(() => {
    }, [])

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
                        <div><FiMinus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole === 0 ? (state.nines.length * 9) : state.current_hole - 1 })} /></div>
                        <div className="m-0 text-dark bg-light rounded mx-1 text-center h-100 w-100 d-flex justify-content-center align-items-center"><h1 className="mb-0">Hole {state.current_hole}</h1></div>
                        <div><FiPlus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole === state.nines.length * 9 ? 1 : state.current_hole + 1 })} /></div>
                    </div>
                    <div className="d-flex flex-column mt-3 rounded">
                        {state.players.map((p, i) => {
                            return (
                                <div key={i} className="d-flex text-light p-2 bg-dark my-1 align-items-center rounded">
                                    <div className="w-50"><h1 className="mb-0">{p.name}</h1></div>
                                    <div><FiMinus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole === 0 ? (state.nines.length * 9) : state.current_hole - 1 })} /></div>
                                    <div className="m-0 rounded mx-1 flex-fill text-center h-100 d-flex justify-content-center align-items-center"><h1 className="mb-0">Hole {state.current_hole}</h1></div>
                                    <div><FiPlus className="p-1 bg-dark text-light rounded" size="50" onClick={() => dispatch({ type: 'set_current_hole', hole: state.current_hole === state.nines.length * 9 ? 1 : state.current_hole + 1 })} /></div>
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