import React, { useEffect, useRef, useState } from "react";
import { TypeState } from "../../../context/TypeProvider.jsx";
import { socket } from "./Socket.js";

const CurrTimeMulti = () => {
  const {
    isGameRunning,
    speed,
    correctWord,
    errorWord,
    accuracy,
    errorChar,
    correctChar,
    rawSpeed,
    setIsGameEnd,
    setMultiplayer,
    handleEndTimeMulti,
  } = TypeState();

  const [time, setTime] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    socket.on("time", (Time) => {
      setTime(Time);
      speed.current = 0;
      // Clear any existing interval
      clearInterval(intervalRef.current);
      // Set up a new interval
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            handleEndTimeMulti();
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Decrement every second
    });
  });

  const handleRawWpm = () => {
    const startTime = parseInt(localStorage.getItem("prevSelectTime"));
    if (startTime !== time)
      rawSpeed.current = parseInt(
        ((correctChar + errorChar) * 60) / (5 * (startTime - time))
      ).toFixed(0);
    else rawSpeed.current = 0;
  };

  const handleNetWpm = () => {
    const startTime = parseInt(localStorage.getItem("prevSelectTime"));
    if (startTime !== time)
      speed.current = parseInt(
        rawSpeed.current - (errorChar * 60) / (5 * (startTime - time))
      ).toFixed(0);
    else speed.current = 0;
    //if (speed.current < 0) speed.current = 0;
  };

  useEffect(() => {
    accuracy.current = correctChar / (correctChar + errorChar);
    accuracy.current *= 100;
    if (!accuracy.current) accuracy.current = 0;
    accuracy.current = accuracy.current.toFixed(0);
    handleRawWpm();
    handleNetWpm();
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
      <span>
        {isGameRunning ? (speed.current < 0 ? 0 : speed.current) : ""}
      </span>
    </div>
  );
};

export default CurrTimeMulti;
