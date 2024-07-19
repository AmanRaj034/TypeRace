import React, { useEffect } from "react";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000/";
var socket, selectedChatCompare;

const MultiPlayer = () => {
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("connected", () => {
      console.log(socket.id);
    });

    socket.on("joinRoom", (roomId) => {
      // console.log(roomId);
    });

    socket.on("words", (words) => {
      console.log(words);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {}, []);

  return <></>;
};

export default MultiPlayer;