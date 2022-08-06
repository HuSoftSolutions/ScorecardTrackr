import React, { createContext, useContext, useReducer } from "react";
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const StoreContext = createContext();

const INITIAL_STATE = {
  /* Active Round */
  round_id: null,
  course: "",
  current_hole_index: 0,
  players: [], // { name: '', handicap: 0, uid: uuidv4(), score: [], hdcpHoles: [] }
  matches: [], // { matchFormat: [], teams?: [], participants?: []}
  card: { holes: [], hdcp: [], par: [], yards: [], teeboxes: {} },
  side_games: [], // TODO: build out
  nines: [],
  selected_course: null, // full config

  /* General */
  showNewRoundModal: false,
  courses: [],
};

async function setRound__FS(round) {
  setDoc(doc(db, "rounds", round.round_id), {
    ...round,
  });
}

async function updateRound__FS(value, id) {
  // console.log(`updating round db ${value}`);
  updateDoc(doc(db, "rounds", id), value);
}

const reducer = (state, action) => {
  switch (action.type) {
    case "remove-player-matches":

      let matchesCopy = [...state.matches];
      matchesCopy.forEach((match, matchIndex) => {
        if (match.matchFormat.value.includes("individual")) {
          matchesCopy[matchIndex].participants = match.participants.filter(
            (p) => p.value !== action.uid
          );
        } else {
        }
      });
      updateRound__FS({ matches: matchesCopy }, state.round_id);

      return {
        ...state,
        matches: matchesCopy,
      };

    case "reset_active_round":
      console.log("resseting active round", state);
      return {
        ...state,
        players: [],
        selected_course: null,
        matches: [],
        card: [],
        course: "",
      };

    case "start_new_round":
      console.log("starting new round");

      setRound__FS(action);

      return {
        ...state,
        ...action,
      };

    case "load_round":
      console.log("loading round", action);

      return {
        ...state,
        ...action,
      };

    case "set_current_hole":
      return {
        ...state,
        current_hole_index: action.hole,
      };

    case "open_new_match_modal":
      console.log("opening new match modal");
      return {
        ...INITIAL_STATE,
        courses: state.courses,
        showNewRoundModal: true,
      };

    case "edit_match_modal":
      console.log("edit match modal");

      return {
        ...state,
        showNewRoundModal: true,
      };

    case "close_new_match_modal":
      console.log("close new match modal");

      return {
        ...state,
        showNewRoundModal: false,
      };

    case "set_courses":
      console.log(`setting courses`, action.courses);
      return {
        ...state,
        courses: action.courses,
      };

    case "set_selected_course":
      console.log("setting selected course", action.selected_course);
      return {
        ...state,
        selected_course: action.selected_course,
      };

    case "update-matches":
      updateRound__FS({ matches: action.matches }, state.round_id);

      return {
        ...state,
        matches: action.matches,
      };

    case "set-player-score":
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
