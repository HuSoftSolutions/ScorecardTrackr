import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useStore } from '../../store';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useWindowSize from '../../hooks/useWindowSize';

import Scorecard from '../Scorecard';
import Matches from '../Matches';
import Holes from '../Holes';

import './index.scss';

const ActiveRound = () => {
  const { state, dispatch } = useStore();
  const [key, setKey] = useState('home');
  const { width, height } = useWindowSize();

  let navigate = useNavigate();
  // let location = useLocation();
  let params = useParams();

  useEffect(() => {
    async function getRound__FS(id) {
      const ref = doc(db, 'rounds', id);
      const round = await getDoc(ref);
      if (round.exists()) {
        dispatch({ ...round.data(), type: 'load_round' });
      }
    }

    if (state.round_id === null && params?.id !== null)
      getRound__FS(params.id);

    return () => {
      dispatch({ type: `reset_active_round` });
    };
  }, []);

  return (
    <div
      className="round-page"
      style={{ height: (height || 50) - 50 }}
    >
      <Holes />
      <Scorecard />
      <Button
        className="mb-3"
        variant="danger"
        onClick={() => {
          dispatch({ type: `reset_active_round` });
          navigate('/home');
        }}
      >
        End Current Round
      </Button>
      {/* <Matches /> */}
      {Matches()}
    </div>
  );
};

export default ActiveRound;
