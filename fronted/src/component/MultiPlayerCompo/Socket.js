import { io } from "socket.io-client";

const ENDPOINT = "https://typerace-r522.onrender.com/";

export const socket = io(ENDPOINT, { autoConnect: false });