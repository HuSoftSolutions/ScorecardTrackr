import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import NewRoundModal from '../../modals/NewRoundModal';
import './index.scss';
import frjConfig from '../../configs/foxrungolfclub.json';


const HomePage = (props) => {
  const { state, dispatch } = useStore();
  const [selectedScorecard, setSelectedScorecard] = useState(null);

  useEffect(() => {
    // generate scorecards 

    // TODO: get scorecards from db
    dispatch({ type: "set_courses", courses: [frjConfig] })

  }, [frjConfig])


  return (
    <div className="home-container">
      <button className="border-0 p-1 rounded px-2 py-4 font-weight-bold bg-success text-white" onClick={() => { dispatch({ type: 'open_new_match_modal' }) }}>Start New Round</button>
      <NewRoundModal show={state?.showNewRoundModal} />
    </div>
  );
};


export default HomePage
