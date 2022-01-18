import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import NewMatchModal from '../../utils/NewMatchModal';
import Scoretracker from './ScoreTracker/index';
// import RoundHistory from '../RoundHistory';
import StartNewMatchButton from '../../utils/StartNewMatchButton';
import './index.css';

const HomePage = (props) => {
  const { state, dispatch } = useStore();
  const [showMatchModal, toggleMatchModal] = useState(false);
  const [newMatchStarted, toggleScoreComponent] = useState(state.activeRound ? true : false);

  return (
    <div className="page-container">
     {newMatchStarted ? <Scoretracker {...props} endRound={()=> toggleScoreComponent(!newMatchStarted)} activateRound={()=> toggleScoreComponent(!newMatchStarted)}/> : <StartNewMatchButton toggle={() => toggleMatchModal(true)} /> }

      {/* <RoundHistory /> */}
      <NewMatchModal
        show={showMatchModal}
        startRound={() => {
          toggleMatchModal(false);
          toggleScoreComponent(true);
        }}
        onHide={() => toggleMatchModal(false)}
      />

    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
