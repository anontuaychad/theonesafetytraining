const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {};

function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

io.on("connection", (socket) => {
  console.log("USER CONNECTED");

  socket.on("create_room", () => {
    const pin = generatePin();

    rooms[pin] = {
      host: socket.id,
      players: [],
      scores: {},
    };

    socket.join(pin);

    socket.emit("room_created", pin);

    console.log("ROOM CREATED:", pin);
  });

  socket.on("join_room", ({ pin, name }) => {
    if (!rooms[pin]) {
      socket.emit("room_not_found");
      return;
    }

    socket.join(pin);

    rooms[pin].players.push({
      id: socket.id,
      name,
      score: 0,
    });

    io.to(pin).emit("players_update", rooms[pin].players);

    console.log(name, "JOINED", pin);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});