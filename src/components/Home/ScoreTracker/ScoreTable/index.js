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

  const getPlayerTotal = (player, holeArray, holeArrayIndex) => {
    let total = 0;
    if (holeArrayIndex === 0) {
      holeArray.map((holes) => {
        player.scorecard[holes.hole]
          ? (total += player.scorecard[holes.hole])
          : null;
      });
    } else {
      props.holeArray.map((holesArray, index) => {
        if (index <= holeArrayIndex) {
          holesArray.map((holes) => {
            player.scorecard[holes.hole]
              ? (total += player.scorecard[holes.hole])
              : null;
          });
        }
      });
    }
    return total;
  };

  const updateScore = (playerIndex, newScore, hole) => {
    let scorecardCopy = state.activeRound;
    if (newScore >= 0) {
      scorecardCopy.players[playerIndex].scorecard[hole] = newScore;
    }
    else {
      scorecardCopy.players[playerIndex].scorecard[hole] = 0;
    }
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
  };

  const TableHeader = (rowData) => {
    return (
      <tr>
        <th className='firstHeaderCell overflowScroll'>Hole</th>
        {rowData.map((row) => (
          <th className='tableCellWidth' key={row.hole}>{row.hole}</th>
        ))}
        <th className='tableCellWidth'>Total</th>
      </tr>
    );
  };

  const TableBody = (rowData, holeArrayIndex) => {
    return state.activeRound.players.map((player, index) => {
      return (
        <tr key={index}>
          <td className='overflowScroll scoreTableRowHeight middleAlignment' onClick={() => props.editPlayer(index)}>
            {player.name}
          </td>
          {rowData.map((row) => (
            <td
              onClick={() => toggleScoreInput(true, row.hole, index)}
              key={`key${index}${row.hole}`}
              className='centerText middleAlignment'
            >
              {allowScoreInput &&
              scoreInput.hole === row.hole &&
              scoreInput.playerIndex === index ? (
                <Form.Control
                autoFocus
                  value={
                    player.scorecard[row.hole]
                      ? player.scorecard[row.hole]
                      : 0
                  }
                  type="number"
                  onChange={({ target }) =>
                       updateScore(
                          index,
                          target.valueAsNumber,
                          row.hole,
                        )
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
          <td className='centerText middleAlignment'>
            {getPlayerTotal(player, rowData, holeArrayIndex)}
          </td>
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
      responsive="sm"
      key={index}
      style={{tableLayout: "fixed"}}
    >
      <thead>{TableHeader(holes)}</thead>
      <tbody>{TableBody(holes, index)}</tbody>
    </Table>
  ))
}
