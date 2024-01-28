const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
   socket.broadcast.emit("chat message", "A user has joined the chat");
   let name;
   socket.on("username", (username) => {
      name = username;
   });
   socket.on("chat message", (message) => {
      io.emit("chat message", (!name ? "Unamed User" : name) + " : " + message);
   });
   socket.on("disconnect", () => {
      io.emit("chat message", (!name ? "Unamed User" : name) + " has disconnected");
   });
});

server.listen(3000, () => {
   console.log("listening on *:3000");
});
