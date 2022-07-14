import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import frjConfig from '../../configs/foxrungolfclub.json';
import './index.scss';
import { BsCircleFill } from 'react-icons/bs';

const SCORECARD_HEADER = ['hole', 'hdcp', 'yards', 'par'];

const ScorecardTable = (props) => {
  useEffect(() => {
    return () => {
      setTimeout(() => {
        const el = document.getElementById('current_hole');
        el?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 500);
    };
  });

  let yardageTotal = 0;
  let nineYardageTotal = 0;

  let parTotal = 0;
  let nineParTotal = 0;

  const { holes, teeboxes } = props?.state?.card;
  const { players } = props?.state;

  const teeboxIDs = [];

  players.forEach((p, i) => {
    if (!teeboxIDs.includes(p.teebox.value))
      teeboxIDs.push(p.teebox.value);
  });

  return (
    <table className="">
      <thead className="sticky-row">
        <tr>
          <th className="sticky">
            <div className="d-flex justify-content-between align-items-center px-2">
              HOLE
            </div>
          </th>
          {holes?.map((n, i) => {
            let showTotal = (i + 1) % 9 === 0 && holes.length > 9;

            return (
              <React.Fragment key={i + 'HOLE'}>
                <th
                  key={i}
                  id={
                    i === props?.state?.current_hole_index
                      ? 'current_hole'
                      : ''
                  }
                  className="text-white"
                >
                  {n}
                </th>
                {showTotal ? <th></th> : null}
              </React.Fragment>
            );
          })}
          <th className="text-white font-weight-bold"></th>
        </tr>

        {teeboxIDs.map((teeboxID) => {
          const teebox = teeboxes[teeboxID];
          console.log(teeboxID, teebox);

          parTotal = 0;
          nineParTotal = 0;
          yardageTotal = 0;
          nineYardageTotal = 0;

          return (
            <>
              <tr>
                <th className="sticky ">
                  {' '}
                  <div className="d-flex justify-content-between align-items-center px-2">
                    HDCP{' '}
                    {teeboxIDs.length > 1 ? (
                      <BsCircleFill
                        size="10"
                        className={`text-${teeboxID}`}
                      />
                    ) : null}
                  </div>
                </th>
                {teebox.hdcp.map((n, i) => {
                  let showTotal =
                    (i + 1) % 9 === 0 && teebox.hdcp.length > 9;

                  return (
                    <React.Fragment key={i + 'HDCP'}>
                      <th key={i} className="bg-primary text-white">
                        {n}
                      </th>
                      {showTotal ? (
                        <th className="bg-primary"></th>
                      ) : null}
                    </React.Fragment>
                  );
                })}
                <th className=" bg-primary text-white"></th>
              </tr>
              <tr>
                <th className="sticky">
                  <div className="d-flex justify-content-between align-items-center px-2">
                    YARDS{' '}
                    {teeboxIDs.length > 1 ? (
                      <BsCircleFill
                        size="10"
                        className={`text-${teeboxID}`}
                      />
                    ) : null}
                  </div>
                </th>
                {teebox.yards?.map((n, i) => {
                  let showTotal =
                    (i + 1) % 9 === 0 && teebox.yards.length > 9;
                  let resetNine = i % 9 === 0;
                  nineYardageTotal = resetNine
                    ? n
                    : nineYardageTotal + n;
                  yardageTotal += n;

                  return (
                    <React.Fragment key={i + 'YARDS'}>
                      <th key={i} className="bg-warning">
                        {n}
                      </th>
                      {showTotal ? (
                        <th className="bold bg-warning">
                          {nineYardageTotal}
                        </th>
                      ) : null}
                    </React.Fragment>
                  );
                })}
                <th className="bold bg-warning">{yardageTotal}</th>
              </tr>
              <tr>
                <th className="sticky ">
                  <div className="d-flex justify-content-between align-items-center px-2">
                    PAR{' '}
                    {teeboxIDs.length > 1 ? (
                      <BsCircleFill
                        size="10"
                        className={`text-${teeboxID}`}
                      />
                    ) : null}
                  </div>
                </th>
                {teebox.par?.map((n, i) => {
                  let showTotal =
                    (i + 1) % 9 === 0 && teebox.par.length > 9;
                  let resetNine = i % 9 === 0;
                  nineParTotal = resetNine ? n : nineParTotal + n;
                  parTotal += n;
                  return (
                    <React.Fragment key={i + 'PAR'}>
                      <th key={i} className="bg-light-tr">
                        {n}
                      </th>
                      {showTotal ? (
                        <th className="bold bg-light-tr">
                          {nineParTotal}
                        </th>
                      ) : null}
                    </React.Fragment>
                  );
                })}
                <th className="bold bg-light-tr">{parTotal}</th>
              </tr>
            </>
          );
        })}
      </thead>
      <tbody>
        {props?.state?.players?.map((player, playerIndex) => {
          let total = 0;
          let nineTotal = 0;

          let bg =
            (playerIndex + 2) % 2 === 0
              ? ' bg-white '
              : ' bg-light-dark ';

          const { hdcpHoles } = player;

          return (
            <tr key={playerIndex} className="player-row">
              <th className={`sticky ${bg} text-dark`}>
                <div className="d-flex justify-content-between align-items-center px-2">
                  {player?.name}
                </div>
              </th>
              {player?.score?.map((rawScore, i) => {
                let showTotal = (i + 1) % 9 === 0 && holes.length > 9;
                let resetNine = i % 9 === 0;

                const hdcpToApply = hdcpHoles[i];

                const netScore =
                  rawScore === 0 ? rawScore : rawScore - hdcpToApply;

                nineTotal = resetNine
                  ? netScore
                  : nineTotal + netScore;
                total += netScore;

                return (
                  <React.Fragment key={i + 'PAR'}>
                    <th
                      key={i}
                      className={
                        hdcpToApply === 0
                          ? `${bg}`
                          : `bg-primary-light`
                      }
                    >
                      <span
                        className={
                          hdcpToApply !== 0 ? 'text-primary me-1' : ''
                        }
                      >
                        {rawScore !== 0 ? netScore : ''}
                      </span>
                      <span>
                        {hdcpToApply !== 0 && rawScore !== 0 ? (
                          <>({rawScore})</>
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                    {showTotal ? (
                      <th className={bg}>
                        {nineTotal === 0 ? '' : nineTotal}
                      </th>
                    ) : null}
                  </React.Fragment>
                );
              })}
              <th className={bg}>{total}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Scorecard = () => {
  const { state, dispatch } = useStore();

  function handleScoreEntry(value, player, n, index) {
    let players = [...state?.players];
    let i = players.findIndex((p) => player.uid === p.uid);
    players[i][n][index] = (value + 1) % 10;
    dispatch({ type: 'set-player-score', players: players });
  }

  const teeboxIDs = [];

  state?.players.forEach((p, i) => {
    if (!teeboxIDs.includes(p.teebox.value))
      teeboxIDs.push(p.teebox.value);
  });

  return (
    <div className="mb-3">
      <div
        className="bold large p-3 text-white m-0 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: '#262626' }}
      >
        <h3 className="m-0">{state.course}</h3>
        <div className="d-flex flex-column">
          {teeboxIDs.map((teebox, i) => {
            const teeboxObj = state?.card?.allTees?.find(
              (t) => t.value === teebox,
            );
            console.log(teeboxObj, state);

            return (
              <div
                key={i}
                className="d-flex flex-row align-items-center justify-content-start"
                style={{ fontSize: 'small' }}
              >
                <BsCircleFill
                  size="15"
                  className={`text-${teebox} mx-1`}
                />
                {teeboxObj?.slope} / {teeboxObj?.rating}
              </div>
            );
          })}
        </div>
      </div>

      <div className="scorecard-container w-100">
        {ScorecardTable({ state, handleScoreEntry })}
      </div>
    </div>
  );
};

export default Scorecard;
