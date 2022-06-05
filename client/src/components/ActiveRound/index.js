import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import Scorecard from '../Scorecard';
import Matches from '../Matches';
import Holes from '../Holes';

import './index.scss';

const ActiveRound = () => {
  const { state, dispatch } = useStore();
  const [key, setKey] = useState('home');

  // let navigate = useNavigate();
  // let location = useLocation();
  let params = useParams();

  useEffect(() => {
    async function getRound__FS(id) {
      const ref = doc(db, 'rounds', id);
      const round = await getDoc(ref);
      if (round.exists()) {
        dispatch({...round.data(), type: 'load_round'});
      }
    }

    if (state.round_id === null && params?.id !== null)
      getRound__FS(params.id);
  }, []);

  return (
    <div className="round-page">
      <Tabs activeKey={key} onSelect={(k) => { setKey(k) }}>
        <Tab eventKey="home" title="Scorecard">
          <Scorecard />
        </Tab>
        <Tab eventKey="profile" title="Hole" className="hole-container p-3">
          <Holes />
        </Tab>
        <Tab eventKey="matches" title="Matches" className="">
          <Matches />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ActiveRound;
