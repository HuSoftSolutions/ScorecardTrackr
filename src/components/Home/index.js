import React, { useState } from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import NewMatchModal from '../../utils/NewMatchModal';
import Scoretracker from './ScoreTracker/index';
// import RoundHistory from '../RoundHistory';
import StartNewMatchButton from '../../utils/StartNewMatchButton';
import './index.css';

const HomePage = (props) => {
  const [showMatchModal, toggleMatchModal] = useState(false);
  const [newMatchStarted, toggleScoreComponent] = useState(false);

  return (
    <div className="page-container">
     {newMatchStarted ? <Scoretracker endRound/> : <StartNewMatchButton toggle={() => toggleMatchModal(true)} /> }

      {/* <RoundHistory /> */}
      <NewMatchModal
        show={showMatchModal}
        startRound={() => {toggleScoreComponent(true); toggleMatchModal(false);}}
        hide={() => toggleMatchModal(false)}
      />

    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
