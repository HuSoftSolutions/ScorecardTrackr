import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useStore } from '../../../../store';

export default function ScoreTable(props) {
  const { state, dispatch } = useStore();
  const [allowScoreInput, setAllowScoreInput] = useState(false);
  const [scoreInput, setScoreInput] = useState({
    hole: null,
    playerIndex: null,
  });

  const getPlayerTotal = (player, holeArray) => {
    let total = 0;
    holeArray.map((holes) => {
      player.scorecard[holes.hole]
        ? (total += player.scorecard[holes.hole])
        : null;
    });
    return total;
  };

  const updateScore = (playerIndex, newScore, hole) => {
    let scorecardCopy = state.activeRound;
    scorecardCopy.players[playerIndex].scorecard[hole] = newScore;
    dispatch({
      type: 'update-active-round',
      roundInfo: scorecardCopy,
    });
  };

  const toggleScoreInput = (toggleValue, hole, pIndex) => {
    let scoreInputCopy = scoreInput;
    if (toggleValue) {
      scoreInputCopy.hole = hole;
      scoreInputCopy.playerIndex = pIndex;
      setScoreInput(scoreInputCopy);
    }
    setAllowScoreInput(toggleValue);
    console.log(scoreInputCopy);
  };

  const TableHeader = (rowData) => {
    return (
      <tr>
        <th>Player</th>
        {rowData.map((row) => (
          <th key={row.hole}>{row.hole}</th>
        ))}
        <th>Total</th>
      </tr>
    );
  };

  const TableBody = (rowData) => {
    return state.activeRound.players.map((player, index) => {
      return (
        <tr key={index}>
          <td onClick={() => props.editPlayer(index)}>
            {player.name}
          </td>
          {rowData.map((row) => (
            <td
              onClick={() => toggleScoreInput(true, row.hole, index)}
              className={allowScoreInput &&
                scoreInput.hole === row.hole &&
                scoreInput.playerIndex === index ? 'cellWidth' : ''}
            >
              {allowScoreInput &&
              scoreInput.hole === row.hole &&
              scoreInput.playerIndex === index ? (
                <Form.Control
                  value={
                    player.scorecard[row.hole]
                      ? player.scorecard[row.hole]
                      : 0
                  }
                  type="number"
                  onChange={({ target }) =>
                    target.valueAsNumber >= 0
                      ? updateScore(
                          index,
                          target.valueAsNumber,
                          row.hole,
                        )
                      : null
                  }
                  onBlur={() => toggleScoreInput(false)}
                />
              ) : player.scorecard[row.hole] &&
                player.scorecard[row.hole] != 0 ? (
                player.scorecard[row.hole]
              ) : (
                ''
              )}
            </td>
          ))}
          <td className='cellWidth'>{getPlayerTotal(player, rowData)}</td>
        </tr>
      );
    });
  };

  return props.holeArray.map((holes, index) => (
    <Table
      striped
      bordered
      hover
      variant="dark"
      size="sm"
      key={index}
    >
      <thead>{TableHeader(holes)}</thead>
      <tbody>{TableBody(holes)}</tbody>
    </Table>
  ));
}
