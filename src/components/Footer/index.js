import React from "react";
import "./index.css";
import ReactTooltip from 'react-tooltip';


const Footer = (props) => {



  return (
    <div className="main-footer">
      <div className="container">
        <br />
        <br />
        <br />
        <strong data-tip={"v0.2.0"+ " " + process.env.REACT_APP_ENVIRONMENT}>Copyright © 2021 ScoreTrackr | HuSoft Solutions, LLC.</strong>
        <p className="mb-0">All Rights Reserved.</p>
        <p>
          Contact us: 
          <a href="mailto:info@scoretrackr.com" className="ml-2">
            info@scoretrackr.com
          </a>
        </p>
      </div>
      <ReactTooltip />
    </div>
  );
};

export default Footer;
