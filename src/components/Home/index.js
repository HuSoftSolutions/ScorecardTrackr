import React, { useState } from 'react';
import { compose } from 'recompose';
import { Button, Table } from 'react-bootstrap';
import { withAuthorization, withEmailVerification } from '../Session';
import NewMatchModal from '../../utils/NewMatchModal';
import RoundHistory from '../RoundHistory';
import StartNewMatchButton from '../../utils/StartNewMatchButton';
import './index.css';

const HomePage = (props) => {
  const [showMatchModal, toggleMatchModal] = useState(false);

  return (
    <div className="page-container">
      <StartNewMatchButton toggle={() => toggleMatchModal(true)} />
      {/* <RoundHistory /> */}
      <NewMatchModal
        show={showMatchModal}
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
