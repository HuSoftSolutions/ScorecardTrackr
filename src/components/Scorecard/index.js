import React, { useState, useEffect } from 'react';
import { useStore } from "../../store";
import frjConfig from '../../configs/foxrungolfclub.json';
import './index.scss';

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
  let parTotal = 0;

  return (
    <table>
      <thead className="sticky-row">
        <tr>
          <th className="sticky">HOLE</th>
          {props?.state?.nines?.map((n, i) => {
            return (
              <React.Fragment key={i + "HOLE"}>
                {n?.holes?.map((h, i) => <th key={i} id={h === props?.state?.current_hole ? "current_hole" : ""} className="text-white">{h}</th>)}
                <th key={i} className="text-white font-weight-bold"></th>
              </React.Fragment>
            )
          })}
          <th className="text-white font-weight-bold"></th>
        </tr>
        <tr>
          <th className="sticky">HDCP</th>
          {props?.state?.nines?.map((n, i) => {
            return (
              <React.Fragment key={i + 'HDCP'}>
                {n?.hdcp?.map((h, i) => <th key={i} className="bg-primary text-white">{h}</th>)}
                <th key={i} className=" bg-primary text-white"></th>
              </React.Fragment>
            )
          })}
          <th className=" bg-primary text-white"></th>
        </tr>
        <tr>
          <th className="sticky">YARDS</th>
          {props?.state?.nines?.map((n, i) => {
            let total = n?.yards?.reduce((t, c) => { return t + c })
            yardageTotal += total;
            return (
              <React.Fragment key={i + 'YARDS'}>
                {n?.yards?.map((h, i) => <th key={i} className="bg-warning">{h}</th>)}
                <th key={i} className="bold bg-warning">{total}</th>
              </React.Fragment>
            )
          })}
          <th className="bold bg-warning">{yardageTotal}</th>
        </tr>
        <tr>
          <th className="sticky">PAR</th>
          {props?.state?.nines?.map((n, i) => {
            let total = n?.par?.reduce((t, c) => { return t + c })
            parTotal += total;
            return (
              <React.Fragment key={i + 'PAR'}>
                {n?.par?.map((h, i) => <th key={i} className="bg-light-tr">{h}</th>)}
                <th key={i} className="bold bg-light-tr">{total}</th>
              </React.Fragment>
            )
          })}
          <th className="bold bg-light-tr">{parTotal}</th>
        </tr>
      </thead>
      <tbody>
        {props?.state?.players?.map((player, playerIndex) => {
          let total = 0;
          let bg = (playerIndex + 2) % 2 === 0 ? "bg-white" : "bg-light-dark"

          return (
            <tr key={playerIndex}>
              <td className={`sticky ${bg} text-dark`}>{player?.name}</td>
              {props.state?.nines?.map((n, ninesIndex) => {
                let startIndex = n
                let endIndex = n + 9;
                let currentNine = player.scorecard.slice(startIndex, endIndex) || []

                let nineTotal = currentNine.length ? currentNine.reduce((t, c) => { return t + c }) : 0;
                total += nineTotal;
                return (
                  <React.Fragment key={playerIndex + 'PLAYER' + ninesIndex}>
                    {currentNine.map((h, i) => {
                      return (<td key={i} className={`player-score ${bg}`} >{h}</td>) //onClick={() => { props.handleScoreEntry(h, p, n, i) }}
                    })}
                    <td key={ninesIndex} className={bg} >{nineTotal}</td>
                  </React.Fragment>
                )
              })}
              <td key={playerIndex} className={bg}>{total}</td>

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
    let i = players.findIndex(p => player.id === p.id);
    players[i][n][index] = (value + 1) % 10
    dispatch({ type: 'set-player-score', players: players })
  }


  return (
    <div className="scorecard-container">
      {ScorecardTable({ state, handleScoreEntry })}
    </div>
  )
};


export default Scorecard;
