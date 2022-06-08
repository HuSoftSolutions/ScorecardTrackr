import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useStore } from '../../store';
import * as functions from './functions';
import './index.scss';

const Holes = () => {
  const { state, dispatch } = useStore();

  function setCurrentHole(score) {
    dispatch({
      type: 'set_current_hole',
      hole: score,
    });
  }

  return (
    <div>
      <div className="d-flex">
        <div>
          <FiMinus
            className="p-1 bg-dark text-light rounded"
            size="50"
            onClick={() => {
              const score =
                state.current_hole_index === 0
                  ? state.card.holes.length - 1
                  : state.current_hole_index - 1;
              setCurrentHole(score);
            }}
          />
        </div>
        <div className="d-flex flex-fill bg-white rounded text-dark justify-content-center align-items-center mx-1">
          <h1 className="mb-0 align-font-center">
            Hole {state.card.holes[state.current_hole_index]}
          </h1>
        </div>
        <div>
          <FiPlus
            className="p-1 bg-dark text-light rounded"
            size="50"
            onClick={() => {
              const score =
                state.current_hole_index ===
                state.card.holes.length - 1
                  ? 0
                  : state.current_hole_index + 1;
              setCurrentHole(score);
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-column mt-3 rounded">
        {state.players.map((p, i) => {
          return (
            <div
              key={i}
              className="d-flex text-light p-2 bg-dark my-1 align-items-center rounded"
            >
              <div className="w-50">
                <h1 className="mb-0">{p.name}</h1>
              </div>
              <div>
                <FiMinus
                  className="p-1 bg-dark text-light rounded"
                  size="50"
                  onClick={() =>
                    dispatch({
                      type: 'set-player-score',
                      players: functions.decreaseScore(p.uid, state),
                    })
                  }
                />
              </div>
              <div className="m-0 rounded mx-1 flex-fill text-center h-100 d-flex justify-content-center align-items-center">
                {functions.returnScore(p.uid, state)}
              </div>
              <div>
                <FiPlus
                  className="p-1 bg-dark text-light rounded"
                  size="50"
                  onClick={() =>
                    dispatch({
                      type: 'set-player-score',
                      players: functions.increaseScore(p.uid, state),
                    })
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holes;
