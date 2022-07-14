import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useStore } from '../../store';
import * as functions from './functions';
import './index.scss';
import { BsCircleFill } from 'react-icons/bs';


const Holes = () => {
  const { state, dispatch } = useStore();

  function setCurrentHole(score) {
    dispatch({
      type: 'set_current_hole',
      hole: score,
    });
  }

  return (
    <div className="bg-dark p-1">
      <div className="d-flex">
        <div>
          <BsArrowLeft
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
        <div className="d-flex flex-fill rounded text-light justify-content-center align-items-center mx-1">
          <h1 className="mb-0 align-font-center">
            Hole {state.card.holes[state.current_hole_index]}
          </h1>
        </div>
        <div>
          <BsArrowRight
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
      <div className="d-flex flex-column my-1 rounded">
        {state.players.map((p, i) => {
          return (
            <div
              key={i}
              className="d-flex bg-light p-2 my-1 align-items-center rounded"
            >
              <div className="w-50 d-flex align-items-center">
                <p className="mb-0 mr-4">{p.name}</p>
                <BsCircleFill
                  size="10"
                  className={`text-${p.teebox.value} mx-2`}
                />
                <p className="mb-0 text-light-dark" style={{"fontSize":"small"}}>({p.handicap} HDCP)</p>
              </div>
              <div>
                <FiMinus
                  className="p-1 rounded"
                  size="30"
                  onClick={() =>
                    dispatch({
                      type: 'set-player-score',
                      players: functions.decreaseScore(p.uid, state),
                    })
                  }
                />
              </div>
              <div className="m-0 rounded mx-1 flex-fill text-center h-100 d-flex justify-content-center align-items-center">
                <p className="mb-0">{functions.returnScore(p.uid, state)}</p>
              </div>
              <div>
                <FiPlus
                  className="p-1 rounded"
                  size="30"
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
