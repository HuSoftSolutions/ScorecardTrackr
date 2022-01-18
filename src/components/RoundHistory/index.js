import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';

const RoundHistory = (props) => {
  const { state, dispatch } = useStore();
  const history = useHistory();

  useEffect(() => {
    props.firebase
      .userRoundHistory(props.firebase.auth.currentUser?.uid)
      .get()
      .then((results) => {
        const history = results.val();
        let roundHistory = [];
        if (history) {

          for (const [key, value] of Object.entries(history)) {
            value['roundId'] = key;

            roundHistory.push(value);
          }

          dispatch({
            type: 'round-history--set',
            roundHistory: roundHistory,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
     
  }, []);

  const activateRound = (roundIndex) => {
    dispatch({
      type: 'update-active-round',
      roundInfo: state.roundHistory[roundIndex],
    });
    dispatch({
      type: 'update-active-round-length',
      roundLength: state.roundHistory[roundIndex].activeRoundLength,
    });
    history.push(ROUTES.HOME);
  };

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
              <td>
                {new Date(round.startDate).toLocaleDateString()}{' '}
                {new Date(round.startDate).toLocaleTimeString()}
              </td>
              <td onClick={() => activateRound(index)}>
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
};
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(RoundHistory);
