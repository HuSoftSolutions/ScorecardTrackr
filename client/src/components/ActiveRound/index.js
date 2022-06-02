import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

import Scorecard from '../Scorecard';
import Matches from '../Matches';
import Holes from '../Holes';

import './index.scss';


const ActiveRound = () => {
  const { state, dispatch } = useStore();

  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();

  useEffect(() => {
    async function getRound__FS(id) {
      const ref = doc(db, 'rounds', id);
      const round = await getDoc(ref);
      if (round.exists()) {
        dispatch(round.data());
      }
    }

    console.log(params?.id);
    if (state.round_id === null && params?.id !== null) {
      getRound__FS(params.id);
    }
  }, []);

  

  function ControlledTabs() {
    const [key, setKey] = useState('profile');
    return (
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="home" title="Scorecard">
          <Scorecard />
        </Tab>
        <Tab
          eventKey="profile"
          title="Hole"
          className="hole-container d-flex flex-column h-100 p-3"
        >
          <Holes />
        </Tab>
        <Tab eventKey="matches" title="Matches" className="">
          <div className="d-flex text-dark w-100 h-100 bg-warning ">
          </div>
        </Tab>
      </Tabs>
    );
  }

  return (
    <div className="round-page">
      {/* <p>Round ID:{params.id}</p> */}
      <ControlledTabs className="" />
    </div>
  );
};

export default ActiveRound;
