import React, { useEffect, useRef } from "react";
import { TypeState } from "../../context/TypeProvider.jsx";

const CurrTimeSpeed = () => {
  const {
    time,
    isGameRunning,
    speed,
    correctWord,
    errorWord,
    accuracy,
    errorChar,
    correctChar,
  } = TypeState();

  useEffect(() => {
    const startTime = parseInt(localStorage.getItem("prevSelectTime"));
    if (startTime !== time)
      speed.current = parseInt(correctWord / ((startTime - time) / 60)).toFixed(
        0
      );
    else speed.current = 0;
  }, [correctWord, errorWord]);

  useEffect(() => {
    accuracy.current = correctChar / (correctChar + errorChar);
    accuracy.current *= 100;
    accuracy.current = accuracy.current.toFixed(0);
  }, [correctChar, errorChar]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "-20px",
        marginBottom: "15px",
      }}
    >
      <span>{time}</span>
      <span>{isGameRunning ? speed.current : ""}</span>
    </div>
  );
};

export default CurrTimeSpeed;
