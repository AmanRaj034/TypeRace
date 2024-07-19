import axios from "axios";

let rooms = [];
let waitingUsers = [];
const MAX = 4;
const MIN = 2;
const time = 30; // fetch this from fronted with the help of socket 

const creationRoom = () => {
    const roomID = `room-${Object.keys(rooms).length + 1}`;
    rooms[roomID] = [];
    return roomID;
}

const addUserToRoom = (roomID, user, io, words) => {
    rooms[roomID].push(user);
    io.local.emit('joinRoom', roomID);
    io.local.emit("words", words);
    io.local.emit("time", time);
};

const GetWords = async () => {
    const isMulti = 1;
    const { data } = await axios.post("http://localhost:3000/api/words", {
        time,
        isMulti
    });
    return data.words;
}

const UsersConnection = async (socket, io) => {
    waitingUsers.push(socket.id);
    if (waitingUsers.length >= 2) {
        const roomID = creationRoom();
        const words = await GetWords();
        console.log(words.split(" ").le)
        while (waitingUsers.length > 0) {
            const user = waitingUsers.shift();
            console.log(user);
            addUserToRoom(roomID, user, io, words);
        }
        console.log(roomID, words);
        io.local.emit("NoWords", words.split(" ").length);
        console.log(rooms, rooms[rooms.length - 1]);
    }

    {
        socket.on(
            "another",
            (data) => {
                socket.broadcast.emit("another", data);
            }
        );
    }

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        waitingUsers = waitingUsers.filter((id) => id !== socket.id);
        // Remove user from rooms and clean up empty rooms
        for (const room in rooms) {
            rooms[room] = rooms[room].filter((id) => id !== socket.id);
            if (rooms[room].length === 0) {
                delete rooms[room];
                // clearTimeout(timers[room]);
                // delete timers[room];
            }
        }
    });
}

export default UsersConnection
