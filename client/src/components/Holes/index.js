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
        <div className="d-flex flex-column align-items-center ms-2">
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
          <p className="p-0 text-muted small">Prev Hole</p>
        </div>
        <div className="d-flex flex-fill rounded text-light justify-content-center align-items-center mx-1">
          <h1 className="mb-0 align-font-center">
            Hole {state.card.holes[state.current_hole_index]}
          </h1>
        </div>
        <div className="d-flex flex-column align-items-center me-2">
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
          <p className="p-0 text-muted small">Next Hole</p>
        </div>
      </div>
      <div className="d-flex flex-column my-1 rounded">
        {state.players.map((p, i) => {
          return (
            <div
              key={p.uid}
              className="d-flex bg-light-dark p-2 my-1 align-items-center rounded"
            >
              <div className="w-50 d-flex align-items-center">
                <BsCircleFill
                  size="15"
                  className={`text-${p.teebox.value} mx-2`}
                />
                <p className="mb-0 me-2">{p.name}</p>

                <p
                  className="mb-0 text-light fw-bold"
                  style={{ fontSize: 'small' }}
                >
                  {p.handicap} HDCP
                </p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <FiMinus
                  className="px-1 rounded"
                  size="30"
                  onClick={() =>
                    dispatch({
                      type: 'set-player-score',
                      players: functions.decreaseScore(p.uid, state),
                    })
                  }
                />
                <p style={{'fontSize':10}} className="m-0 text-muted">minus</p>
              </div>
              <div className="m-0 rounded mx-1 flex-fill text-center h-100 d-flex justify-content-center align-items-center">
                <p className="mb-0">
                  {functions.returnScore(p.uid, state)}
                </p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <FiPlus
                  className="px-1 rounded"
                  size="30"
                  onClick={() =>
                    dispatch({
                      type: 'set-player-score',
                      players: functions.increaseScore(p.uid, state),
                    })
                  }
                />
                <p style={{'fontSize':10}} className="m-0 text-muted">plus</p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holes;
