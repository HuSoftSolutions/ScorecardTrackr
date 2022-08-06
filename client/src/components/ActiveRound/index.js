import React, { useEffect, useLayoutEffect, useState } from "react";
import { useStore } from "../../store";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useWindowSize from "../../hooks/useWindowSize";
import NewRoundModal from "../../modals/NewRoundModal";
import { FiSettings } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Scorecard from "../Scorecard";
import Matches from "../Matches";
import Holes from "../Holes";

import "./index.scss";

const ActiveRound = () => {
  const { state, dispatch } = useStore();
  const [key, setKey] = useState("home");
  const { width, height } = useWindowSize();

  let navigate = useNavigate();
  // let location = useLocation();
  let params = useParams();

  useEffect(() => {
    async function getRound__FS(id) {
      const ref = doc(db, "rounds", id);
      const round = await getDoc(ref);
      if (round.exists()) {
        const r = round.data();
        dispatch({ ...r, type: "load_round" });
      }
    }

    if (state.round_id === null && params?.id !== null) getRound__FS(params.id);

    return () => {
      dispatch({ type: `reset_active_round` });
    };
  }, []);

  const EndRoundButton = () => {
    return (
      <div
        style={{ cursor: "pointer" }}
        className="d-flex align-items-center justify-content-center"
        variant="danger"
        onClick={() => {
          dispatch({ type: `reset_active_round` });
          navigate("/home");
        }}
      >
        <AiOutlineCloseCircle className="mx-2" />
        End Round
      </div>
    );
  };

  const EditRoundButton = () => {
    return (
      <div
        style={{ cursor: "pointer" }}
        className="d-flex align-items-center justify-content-center"
        // variant="light"
        onClick={() => {
          dispatch({ type: `edit_match_modal` });
          // navigate("/home");
        }}
      >
        <FiSettings className="mx-2" /> Edit Round
      </div>
    );
  };

  return (
    <div className="round-page" style={{ height: (height || 50) - 50 }}>
      <Holes />
      <Scorecard />
      <div className="d-flex flex-row justify-content-around flex-md-row w-100 mb-3">
        <EditRoundButton />
        <EndRoundButton />
      </div>
      <Matches />
      <NewRoundModal show={state?.showNewRoundModal} />
    </div>
  );
};

export default ActiveRound;
