import React, { useEffect, useRef } from "react";
import { TypeState } from "../../../context/TypeProvider.jsx";
import { socket } from "./Socket";
import "./Progress.css";

const ProgressBar = ({ progress, user, color }) => {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%`, backgroundColor: color }}
      >
        <span className="progress-text">{user}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
