import React, { useEffect } from "react";
import Header from "../component/Header";
import InformationBar from "../component/InformationBar";
import Game from "../component/Game";
import CurrTimeSpeed from "../component/CurrTimeSpeed.jsx";
import { TypeState } from "../../context/TypeProvider.jsx";
import Result from "./Result.jsx";

const HomePage = () => {
  const { isGameEnd } = TypeState();

  return isGameEnd ? (
    <Result />
  ) : (
    <>
      <Header />
      <div id="main">
        <InformationBar />
        <CurrTimeSpeed />
        <Game />
      </div>
    </>
  );
};

export default HomePage;
