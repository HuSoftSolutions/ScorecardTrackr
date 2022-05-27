import React, { createContext, useContext, useReducer } from 'react';
import frjConfig from './configs/foxrungolfclub.json';

const StoreContext = createContext();

const INITIAL_STATE = {

  /* Active Round */
  round_id: null,
  current_hole_index: 0,
  selected_course: null,
  players: [],
  matches: [],
  nines: [],
  side_games: [],

  /* General */
  showNewRoundModal: false,
  courses: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start_new_round':
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
