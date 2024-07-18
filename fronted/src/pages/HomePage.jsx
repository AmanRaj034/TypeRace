import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import InformationBar from "../component/InformationBar";
import Game from "../component/Game";
import CurrTimeSpeed from "../component/CurrTimeSpeed.jsx";
import { TypeState } from "../../context/TypeProvider.jsx";
import Result from "./Result.jsx";

const HomePage = () => {
  return (
    <>
      <Header />
      <div id="main">
        <InformationBar />
        {isGameEnd ? (
          <Result />
        ) : (
          <>
            <CurrTimeSpeed /> <Game />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
