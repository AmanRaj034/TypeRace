import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import wordsRoutes from "./routes/wordsRoutes.js";
import cors from "cors";
import { Server } from 'socket.io';
import { createServer } from 'http';

import UsersConnection from "./socketHandler/UsersConnection.js";
dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/fronted/dist")));

app.use(express.json());
app.use(cors());

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "fronted", "dist", "index.html"));
})


const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "https://typerace-r522.onrender.com/", // Replace with your frontend URL
        methods: ["GET", "POST"],
    },
    path: "/socket.io"
});


io.on("connection", (socket) => {
    console.log("User Connected");
    socket.emit("connected", socket.id);
    UsersConnection(socket, io);
})

app.get("/", (req, res) => {
    res.send(`Hi From Server`);
})

app.use("/api/words", wordsRoutes);

server.listen(PORT, (req, res) => {
    console.log(`Server is Running At http://localhost:${PORT}`.green.bold);
})