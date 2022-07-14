import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import NewRoundModal from '../../modals/NewRoundModal';
import './index.scss';
import frjConfig from '../../configs/foxrungolfclub.json';
import accConfig from '../../configs/albanycountryclub.json';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { format } from 'date-fns';
import useWindowSize from '../../hooks/useWindowSize';

const RoundHistory = () => {
  const [rounds, setRounds] = useState([]);
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    async function getUserRounds(uid) {
      const ref = query(
        collection(db, 'rounds'),
        where('owner', '==', uid),
      );
      const snapshot = await getDocs(ref);
      const r = [];
      snapshot.forEach((doc) => {
        r.push(doc.data());
      });
      setRounds(r);
    }

    if (user?.uid) getUserRounds(user?.uid);
  }, [user]);

  function handleLoadRound(round) {
    dispatch({ ...round, type: 'load_round' });
    navigate(ROUTES.ROUND + `/${round.round_id}`);
  }

  return rounds.length ? (
    <div className="">
      <hr className="" />

      <div className="d-flex align-items-center justify-content-between">
        <h4 className="m-0">Round History</h4>
        <p className="m-0">Click round to load</p>
      </div>
      <div className="pe-2 d-flex flex-column" style={{overflowY: 'scroll', height: height - 250 }}>
        {rounds.map((round, i) => {
          return (
            <div
              key={i}
              className="bg-light rounded p-2 text-dark d-flex flex-column my-1"
              onClick={() => handleLoadRound(round)}
            >
              <span>
                <strong>Course: </strong>
                <span>{round?.course || 'Unnamed'}</span>
              </span>
              <span>
                <strong>Players: </strong>
                {round.players.length}
              </span>
              <span>
                <strong>Created: </strong>
                {format(round.created_at.toDate(), 'Pp')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="bg-dark rounded p-2 mt-2">
      <h5 className="m-0">
        No round history! Click Start New Round to begin!
      </h5>
    </div>
  );
};

const HomePage = (props) => {
  const { state, dispatch } = useStore();
  const [selectedScorecard, setSelectedScorecard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // generate scorecards

    // TODO: get scorecards from db
    dispatch({ type: 'set_courses', courses: [frjConfig, accConfig] });
  }, [frjConfig, accConfig]);

  const GoToActiveRound = ({ id, navigate }) => {
    function onClick() {
      navigate(ROUTES.ROUND + `/${id}`);
    }

    return (
      <button className="mx-2" variant="success" onClick={onClick}>
        Go To Active Round
      </button>
    );
  };

  const NewRoundButton = () => {
    return (
      <div>
        <button
          className="border-0 p-1 rounded px-2 py-4 font-weight-bold bg-success text-white w-100"
          onClick={() => {
            dispatch({ type: 'open_new_match_modal' });
          }}
        >
          Start New Round
        </button>
      </div>
    );
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <NewRoundButton />
        {/* {state.round_id ? <GoToActiveRound navigate={navigate} id={state.round_id} /> : null} */}
        <NewRoundModal show={state?.showNewRoundModal} />
        <RoundHistory />
      </div>
    </div>
  );
};

export default HomePage;
