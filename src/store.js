import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

/*
 Active Round: 
    Start (Date)

    Players (Array[Object])
        Name (String)
        Handicap (Int)
        Scorecard (Array[Object]) // Scorecard[HOLE_INDEX] = 4 (score)

      //ex: player 1,
            player 2, 
            player 3
    
    Matches [Object] // Every player mapped to each other 
        
     //ex: Match1
           Match2
           Match3
        
 */

 /* 
 Scorecard:
 */

const INITIAL_STATE = {
  roundHistory: [],
  activeRound: null,
  activeRoundLength: 9
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'round-history--set':
      console.log(action.type, action.roundHistory);
      return {
        ...state,
        roundHistory: action.roundHistory,
      };
      case 'update-active-round':
        console.log(action.type, action.roundInfo);
        return {
          ...state,
          activeRound: action.roundInfo,
        };
        case 'update-active-round-length':
        console.log(action.type, action.roundLength);
        return {
          ...state,
          activeRoundLength: action.roundLength,
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
