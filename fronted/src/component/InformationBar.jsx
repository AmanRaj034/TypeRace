import React, { useEffect, useState } from "react";
import { TypeState } from "../../context/TypeProvider.jsx";
import MultiPlayer from "./MultiPlayer.jsx";

const InformationBar = () => {
  const { handleTimeChange, setReset, reset, multiplayer, setMultiplayer } =
    TypeState();

  const handleClick = (clickTime) => {
    localStorage.setItem("prevSelectTime", clickTime);
    handleTimeChange();
  };

  const handleMultiPlayer = () => {
    setMultiplayer(true);
  };

  return (
    <div className="InformationBar">
      <div className="SelectTime">
        <span onClick={() => handleClick(15)}>15</span>
        <span onClick={() => handleClick(30)}>30</span>
        <span onClick={() => handleClick(60)}>60</span>
        <span onClick={() => handleClick(120)}>120</span>
      </div>
      <div className="button">
        <button onClick={() => handleMultiPlayer()}>MultiPlayer</button>
        {multiplayer && <MultiPlayer />}
        <button style={{ marginLeft: "40px" }} onClick={() => setReset(!reset)}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default InformationBar;
