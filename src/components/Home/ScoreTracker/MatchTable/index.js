import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { useStore } from '../../../../store';

export default function MatchTable(props) {
  const { state, dispatch } = useStore();

  const getMatchPlayScoreByHole = (lastHole, p1, p2, holes) => {
    const players = [...state.activeRound.players];
    let p1matchTotal = 0;

    holes.map((holeObj) => {
      let p1Score = players[p1].scorecard[holeObj.hole],
        p2Score = players[p2].scorecard[holeObj.hole];
      if (holeObj.hole <= lastHole) {
        if (p1Score && p2Score) {
          let comparison = p1Score - p2Score;
          switch (true) {
            case comparison < 0:
              p1matchTotal += 1;
              break;
            case comparison > 0:
              p1matchTotal -= 1;
              break;
            default:
              break;
          }
        } else if (holeObj.hole == lastHole) {
          p1matchTotal = null;
        }
      }
    });
    return getMatchPlayResult(p1matchTotal);
  };

  const getPressScoreByHole = (
    currentHole,
    match,
    pressIndex,
    holes,
  ) => {
    let players = [...state.activeRound.players],
      p1matchTotal = 0;
    holes.map((holeObj) => {
      let p1Score =
          players[match.firstPlayerIndex].scorecard[holeObj.hole],
        p2Score =
          players[match.secondPlayerIndex].scorecard[holeObj.hole];
      if (holeObj.hole <= currentHole) {
        if (holeObj.hole >= pressIndex + 1) {
          if (p1Score && p2Score) {
            let comparison = p1Score - p2Score;
            switch (true) {
              case comparison < 0:
                p1matchTotal += 1;
                break;
              case comparison > 0:
                p1matchTotal -= 1;
                break;
              default:
                if (p1matchTotal === null) p1matchTotal = 0;
                break;
            }
          } else p1matchTotal = null;
        } else p1matchTotal = null;
      }
    });
    return getMatchPlayResult(p1matchTotal);
  };

  const getMatchPlayScoreTotal = (
    p1,
    p2,
    holes,
    pressIndex,
    rawScoreForTotal,
  ) => {
    let p1matchTotal = 0,
      players = [...state.activeRound.players],
      pressExist = pressIndex != undefined ? pressIndex : 0;

    holes.map((holeObj) => {
      let p1Score = players[p1].scorecard[holeObj.hole],
        p2Score = players[p2].scorecard[holeObj.hole];
      if (p1Score && p2Score && holeObj.hole > pressExist) {
        let comparison = p1Score - p2Score;
        switch (true) {
          case comparison < 0:
            p1matchTotal += 1;
            break;
          case comparison > 0:
            p1matchTotal -= 1;
            break;
          default:
            break;
        }
      }
    });
    return rawScoreForTotal
      ? p1matchTotal
      : getMatchPlayResult(p1matchTotal);
  };

  const getMatchPlayResult = (p1Total) => {
    switch (true) {
      case p1Total < 0:
        return `DN ${Math.abs(p1Total)}`;
      case p1Total > 0:
        return `UP ${p1Total}`;
      case p1Total === 0:
        return 'AS';
      default:
        return '';
    }
  };

  const getMatchTotal = (match, rowArray) => {
    let totals = [],
      matchTotal = 0;

    totals.push(
      getMatchPlayScoreTotal(
        match.firstPlayerIndex,
        match.secondPlayerIndex,
        rowArray,
        undefined,
        true,
      ),
    );
    match.presses.map((press, index) => {
      if (press) {
        totals.push(
          getMatchPlayScoreTotal(
            match.firstPlayerIndex,
            match.secondPlayerIndex,
            rowArray,
            index,
            true,
          ),
        );
      }
    });
    totals.map((total) => {
      if (total > 0) {
        matchTotal += 1;
      }
      if (total < 0) {
        matchTotal -= 1;
      }
    });
    return getMatchtotalResult(
      matchTotal,
      match.firstPlayerIndex,
      match.secondPlayerIndex,
    );
  };

  const getMatchtotalResult = (p1Total, p1, p2) => {
    let p1Name = state.activeRound.players[p1].name,
      p2Name = state.activeRound.players[p2].name;
    switch (true) {
      case p1Total < 0:
        return `${p2Name} is UP ${Math.abs(p1Total)}`;
      case p1Total > 0:
        return `${p1Name} is UP ${p1Total}`;
      case p1Total === 0:
        return 'AS';
      default:
        return '';
    }
  };

  const getLastCompletedHole = (match) => {
    let lastHole = 0,
      holeComplete = true;

    for (let i = 1; i <= state.activeRoundLength; i++) {
      state.activeRound.players.map((player, index) => {
        if (!player.scorecard[i]) {
          if (
            index == match.firstPlayerIndex ||
            index == match.secondPlayerIndex
          ) {
            holeComplete = false;
          }
        }
        if (index == match.secondPlayerIndex) {
          if (holeComplete) lastHole = i;
          else holeComplete = true;
        }
      });
    }
    return lastHole;
  };

  const showPressButton = (match) => {
    const players = [...state.activeRound.players],
      lastHolecompleted = getLastCompletedHole(match);
    let p1Score =
        players[match.firstPlayerIndex].scorecard[lastHolecompleted],
      p2Score =
        players[match.secondPlayerIndex].scorecard[lastHolecompleted],
      comparison = p1Score - p2Score,
      compareCheck = comparison > 0 || comparison < 0 ? true : false,
      alreadyPressed = match.presses[lastHolecompleted];
    return compareCheck && !alreadyPressed;
  };

  const initiatePress = (match, matchIndex) => {
    let lastHolecompleted = getLastCompletedHole(match),
      activeRoundCopy = state.activeRound,
      pressesCopy = [...activeRoundCopy.matches[matchIndex].presses];
    pressesCopy[lastHolecompleted] = true;
    activeRoundCopy.matches[matchIndex].presses = pressesCopy;
    dispatch({
      type: 'update-active-round',
      roundInfo: activeRoundCopy,
    });
  };

  const TableHeader = (rowData) => {
    return (
      <tr>
        <th>Match</th>
        {rowData.map((row) => (
          <th key={row.hole}>{row.hole}</th>
        ))}
        <th>Total</th>
      </tr>
    );
  };

  const TableBody = (rowData, match, index) => {
    let pressCounter = 0;
    return (
      <React.Fragment>
        <tr>
          <td style={{ maxWidth: '85px' }}>
            {match.name}
            {showPressButton(match) ? (
              <Button
                variant="success"
                size="sm"
                onClick={() => initiatePress(match, index)}
                className="pressButton"
              >
                Press
              </Button>
            ) : null}
          </td>
          {rowData.map((row) => (
            <td>
              {getMatchPlayScoreByHole(
                row.hole,
                match.firstPlayerIndex,
                match.secondPlayerIndex,
                rowData,
              )}
            </td>
          ))}
          <td>
            {getMatchPlayScoreTotal(
              match.firstPlayerIndex,
              match.secondPlayerIndex,
              rowData,
            )}
          </td>
        </tr>
        {match.presses.map((press, index) => {
          if (press) {
            pressCounter += 1;
            return (
              <tr>
                <td>Press {pressCounter}</td>
                {rowData.map((row) => (
                  <td>
                    {getPressScoreByHole(
                      row.hole,
                      match,
                      index,
                      rowData,
                    )}
                  </td>
                ))}
                <td>
                  {getMatchPlayScoreTotal(
                    match.firstPlayerIndex,
                    match.secondPlayerIndex,
                    rowData,
                    index,
                  )}
                </td>
              </tr>
            );
          }
        })}
        {pressCounter > 0 ? (
          <tr>
            <td>Total</td>
            {rowData.map((row) => (
              <td key={row}></td>
            ))}
            <td>{getMatchTotal(match, rowData)}</td>
          </tr>
        ) : null}
      </React.Fragment>
    );
  };

  return props.holeArray.map((holes, index) =>
    state.activeRound.matches.map((match, matchIndex) => {
      return (
        <Table striped bordered hover variant="dark" size="sm">
          <thead>{TableHeader(holes)}</thead>
          <tbody>{TableBody(holes, match, matchIndex)}</tbody>
        </Table>
      );
    }),
  );
}
