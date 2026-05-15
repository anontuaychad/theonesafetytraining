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

let players = [];
let leaderboard = [];

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("join-game", (playerName) => {
    const player = {
      id: socket.id,
      name: playerName,
      score: 0,
    };

    players.push(player);

    io.emit("players-update", players);
  });

  socket.on("answer-question", ({ playerId, points }) => {
    players = players.map((p) => {
      if (p.id === playerId) {
        return {
          ...p,
          score: p.score + points,
        };
      }

      return p;
    });

    leaderboard = [...players].sort((a, b) => b.score - a.score);

    io.emit("leaderboard-update", leaderboard);
  });

  socket.on("disconnect", () => {
    players = players.filter((p) => p.id !== socket.id);

    io.emit("players-update", players);

    console.log("Disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});