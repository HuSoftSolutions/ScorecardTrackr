import React from 'react';
import { useStore } from '../../store';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


export default function RoundHistory() {
  const { state, dispatch } = useStore();
  const history = useHistory();

  const activateRound = (roundIndex) => {
    dispatch({
      type: 'update-active-round',
      roundInfo: state.roundHistory[roundIndex]
      ,
    });
    dispatch({
      type: 'update-active-round-length',
      roundLength: state.roundHistory[roundIndex].activeRoundLength,
    });
    history.push(ROUTES.HOME);
  }

  return (
    <div className="page-container">
      <h4>Round History</h4>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {state.roundHistory.map((round, index) => (
            <tr key={index}>
              <td>{round.startDate.toLocaleDateString()} {round.startDate.toLocaleTimeString()}</td>
              <td onClick={()=> activateRound(index)}>
                {`${round.activeRoundLength} Holes - ${
                  round.matchType === 1 ? 'Match' : 'Stroke'
                } Play - ${round.players.length} Players`}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
