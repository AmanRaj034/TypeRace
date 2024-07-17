import React, { useEffect } from "react";
import { TypeState } from "../../context/TypeProvider.jsx";

const Result = () => {
  const { setTime, speed, setReset, reset, accuracy, correctChar, errorChar } =
    TypeState();

  const handleOnClick = () => {
    var temp = parseInt(localStorage.getItem("prevSelectTime"));
    temp ? setTime(temp) : setTime(30);
    setReset(!reset);
  };

  return (
    <div>
      {/* <Avtar></Avtar> */}
      {speed.current}
      <button onClick={handleOnClick}>Retry</button>
      {accuracy.current}
    </div>
  );
};

export default Result;
