import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../src/component/MultiPlayerCompo/Socket.js";
import Header from "../component/Header.jsx";
import GameMulti from "../component/MultiPlayerCompo/GameMulti.jsx";
import CurrTimeMulti from "../component/MultiPlayerCompo/CurrentTimeMulti.jsx";
import { TypeState } from "../../context/TypeProvider.jsx";
import Result from "./Result.jsx";
import ProgressBar from "../component/MultiPlayerCompo/ProgressBar.jsx";

const MultiPlayer = () => {
  const { multiplayer, setMultiplayer, correctWord } = TypeState();
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const maxWords = useRef(0);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      setMultiplayer(true);
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    socket.connect();
    socket.on("connect", onConnect);

    socket.on("joinRoom", (roomId) => {
      //   console.log(roomId);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  });

  // Self Data
  useEffect(() => {
    setP1(correctWord);
    socket.emit("another", (correctWord / maxWords.current) * 100);
  }, [correctWord]);

  // Another Person
  useEffect(() => {
    socket.on("NoWords", (noWord) => {
      maxWords.current = noWord;
    });

    socket.on("another", (data) => {
      setP2(data);
    });

    return () => {
      socket.off("NoWords");
      socket.off("another");
    };
  }, []);

  const colors = ["#a0d2eb", "#a28089"];

  return (
    <>
      <Header />
      <div id="main" style={{ marginTop: "20px" }}>
        {!multiplayer ? (
          <Result />
        ) : (
          <>
            <CurrTimeMulti />
            <GameMulti />
            <div
              style={{
                padding: "20px",
              }}
            ></div>
          </>
        )}
        <ProgressBar user="user1" color={colors[0]} progress={p1} />
        <ProgressBar user="user2" color={colors[1]} progress={p2} />
      </div>
    </>
  );
};

export default MultiPlayer;
