import React, { useEffect } from "react";
import { TypeState } from "../../context/TypeProvider.jsx";

const InformationBar = () => {
  const { setTime, handleTimeChange } = TypeState();

  const handleClick = (clickTime) => {
    localStorage.setItem("prevSelectTime", clickTime);
    handleTimeChange();
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
        <button>MultiPlayer</button>
      </div>
    </div>
  );
};

export default InformationBar;
