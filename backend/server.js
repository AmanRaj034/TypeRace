import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import wordsRoutes from "./routes/wordsRoutes.js";
import cors from "cors";
import { Server } from 'socket.io';
import { createServer } from 'http';
dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend URL
        methods: ["GET", "POST"],
    },
    path: "/socket.io"
});


io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
})

app.get("/", (req, res) => {
    res.send(`Hi From Server`);
})

app.use("/api/words", wordsRoutes);

server.listen(PORT, (req, res) => {
    console.log(`Server is Running At http://localhost:${PORT}`.green.bold);
})