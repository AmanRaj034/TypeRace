import React, { useEffect } from "react";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000/";
var socket, selectedChatCompare;

const MultiPlayer = () => {
  useEffect(() => {
    socket = io(ENDPOINT);
  });

  return <></>;
};

export default MultiPlayer;
