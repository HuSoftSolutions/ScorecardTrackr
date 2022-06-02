import React, { createContext, useContext, useReducer } from 'react';
import frjConfig from './configs/foxrungolfclub.json';
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import {db} from './firebase.js'

const StoreContext = createContext();

const INITIAL_STATE = {

  /* Active Round */
  selected_course: null, // full config

  round_id: null,
  course: "",
  current_hole_index: 0,
  players: [],
  matches: [],
  card: {holes: [], hcdp: [], par: [], yards: []},
  side_games: [],

  /* General */
  showNewRoundModal: false,
  courses: [],
};

async function setRound__FS(round){
  setDoc(doc(db, 'rounds', round.round_id), {
    ...round
  })
}

async function updateRound__FS(value, id){
  updateDoc(doc(db, 'rounds', id), {players: value})
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'start_new_round':
      console.log(action.players)

      setRound__FS(action)

      return {
        ...state,
        ...action
      };

    case 'set_current_hole':
      
      return {
        ...state,
        current_hole_index: action.hole
      }

    case 'open_new_match_modal':
      return {
        ...state,
        showNewRoundModal: true,
        selected_course: null
      }

    case 'close_new_match_modal':
      return {
        ...state,
        showNewRoundModal: false
      }

    case 'set_courses':
      return {
        ...state,
        courses: action.courses
      }

    case 'set_selected_course':
      return {
        ...state,
        selected_course: action.selected_course
      }

    case 'set-player-score':
      console.log(action.players)

      updateRound__FS(action.players, state.round_id)

      return {
        ...state,
        players: action.players
      }
  }
};


export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
