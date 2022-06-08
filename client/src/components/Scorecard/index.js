import React, { useState, useEffect } from 'react';
import { useStore } from "../../store";
import frjConfig from '../../configs/foxrungolfclub.json';
import './index.scss';
import { BsCheck } from 'react-icons/bs';

const SCORECARD_HEADER = ['hole', 'hdcp', 'yards', 'par']

const ScorecardTable = (props) => {

  useEffect(() => {
    return () => {
      setTimeout(() => {
        const el = document.getElementById("current_hole");
        el?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 500);
    };
  });

  let yardageTotal = 0;
  let nineYardageTotal = 0

  let parTotal = 0;
  let nineParTotal = 0;

  const { holes, hdcp, par, yards } = props?.state?.card;

  return (
    <table className="">
      <thead className="sticky-row">
        <tr>
          <th className="sticky">HOLE</th>
          {holes?.map((n, i) => {
            let showTotal = ((i + 1) % 9 === 0) && holes.length > 9;

            return (
              <React.Fragment key={i + "HOLE"}>
                <th key={i} id={i === props?.state?.current_hole_index ? "current_hole" : ""} className="text-white">{n}</th>
                {showTotal ? <th></th> : null}
              </React.Fragment>
            )
          })}
          <th className="text-white font-weight-bold"></th>
        </tr>
        <tr>
          <th className="sticky">HDCP</th>
          {hdcp?.map((n, i) => {
            let showTotal = ((i + 1) % 9 === 0) && hdcp.length > 9;

            return (
              <React.Fragment key={i + 'HDCP'}>
                <th key={i} className="bg-primary text-white">{n}</th>
                {showTotal ? <th className="bg-primary"></th> : null}
              </React.Fragment>
            )
          })}
          <th className=" bg-primary text-white"></th>
        </tr>
        <tr>
          <th className="sticky">YARDS</th>
          {yards?.map((n, i) => {
            let showTotal = ((i + 1) % 9 === 0) && yards.length > 9;
            let resetNine = i % 9 === 0;
            nineYardageTotal = resetNine ? n : nineYardageTotal + n;
            yardageTotal += n;

            return (
              <React.Fragment key={i + 'YARDS'}>
                <th key={i} className="bg-warning">{n}</th>
                {showTotal ? <th className="bold bg-warning">{nineYardageTotal}</th> : null}

              </React.Fragment>
            )
          })}
          <th className="bold bg-warning">{yardageTotal}</th>
        </tr>
        <tr>
          <th className="sticky">PAR</th>
          {par?.map((n, i) => {
            let showTotal = ((i + 1) % 9 === 0) && par.length > 9;
            let resetNine = i % 9 === 0;
            nineParTotal = resetNine ? n : nineParTotal + n;
            parTotal += n; return (
              <React.Fragment key={i + 'PAR'}>
                <th key={i} className="bg-light-tr">{n}</th>
                {showTotal ? <th className="bold bg-light-tr">{nineParTotal}</th> : null}
              </React.Fragment>
            )
          })}
          <th className="bold bg-light-tr">{parTotal}</th>
        </tr>
      </thead>
      <tbody>
        {props?.state?.players?.map((player, playerIndex) => {
          let total = 0;
          let nineTotal = 0;

          let bg = (playerIndex + 2) % 2 === 0 ? "bg-white" : "bg-light-dark"
          if (true) bg += " text-primary"

          return (
            <tr key={playerIndex}>
              <th className={`sticky ${bg} text-dark`}>{player?.name}</th>
              {player?.score?.map((n, i) => {
                let showTotal = ((i + 1) % 9 === 0) && holes.length > 9;
                let resetNine = i % 9 === 0;
                nineTotal = resetNine ? n : nineTotal + n;
                total += n;
                return (
                  <React.Fragment key={i + 'PAR'}>
                    <th key={i} className={bg}>{n === 0 ? "" : n}
                      {/* <span><BsCheck size={25} className="p-1 text-primary rounded " /></span> */}
                    </th>
                    {showTotal ? <th className={bg}>{nineTotal === 0 ? "" : nineTotal}</th> : null}
                  </React.Fragment>
                )
              })}
              <th className={bg}>{total}</th>

            </tr>
          )
        })}
      </tbody>
    </table>
  )
}



const Scorecard = () => {

  const { state, dispatch } = useStore();


  function handleScoreEntry(value, player, n, index) {
    let players = [...state?.players];
    let i = players.findIndex(p => player.uid === p.uid);
    players[i][n][index] = (value + 1) % 10
    dispatch({ type: 'set-player-score', players: players })
  }


  return (
    <div>
      <div className="bold large p-3 text-white m-0" style={{ backgroundColor: '#262626' }}><h3 className="m-0">{state.course}</h3></div>

      <div className="scorecard-container w-100">
        {ScorecardTable({ state, handleScoreEntry })}
      </div>
    </div>
  )
};


export default Scorecard;
