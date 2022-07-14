import React, { createContext, useContext, useReducer } from 'react';
import frjConfig from './configs/foxrungolfclub.json';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase.js';

const StoreContext = createContext();

const INITIAL_STATE = {
  /* Active Round */
  round_id: null,
  course: '',
  current_hole_index: 0,
  players: [], // { name: '', handicap: 0, uid: uuidv4(), score: [], hdcpHoles: [] }
  matches: [], // { matchFormat: [], teams?: [], participants?: []}
  card: { holes: [], hdcp: [], par: [], yards: [], teeboxes: {} },
  side_games: [], // TODO: build out

  /* General */
  showNewRoundModal: false,
  courses: [],
  selected_course: null, // full config
};

async function setRound__FS(round) {
  setDoc(doc(db, 'rounds', round.round_id), {
    ...round,
  });
}

async function updateRound__FS(value, id) {
  // console.log(`updating round db ${value}`);
  updateDoc(doc(db, 'rounds', id), value);
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset_active_round':
      return {
        ...INITIAL_STATE,
      };

    case 'start_new_round':
      setRound__FS(action);

      return {
        ...state,
        ...action,
      };

    case 'load_round':

      return {
        ...INITIAL_STATE,
        ...action,
      };

    case 'set_current_hole':
      return {
        ...state,
        current_hole_index: action.hole,
      };

    case 'open_new_match_modal':
      return {
        ...state,
        showNewRoundModal: true,
        selected_course: null,
      };

    case 'close_new_match_modal':
      return {
        ...state,
        showNewRoundModal: false,
      };

    case 'set_courses':
      return {
        ...state,
        courses: action.courses,
      };

    case 'set_selected_course':
      return {
        ...state,
        selected_course: action.selected_course,
      };

    case 'update-matches':
      updateRound__FS({ matches: action.matches }, state.round_id);

      return {
        ...state,
        matches: action.matches,
      };

    case 'set-player-score':
      updateRound__FS({ players: action.players }, state.round_id);

      return {
        ...state,
        players: action.players,
      };
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
