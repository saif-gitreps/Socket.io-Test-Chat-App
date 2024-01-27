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
   io.emit("chat message", "A user has connected");
   socket.on("chat message", (message) => {
      io.emit("chat message", message);
   });
   socket.on("disconnect", () => {
      console.log("user disconnected");
   });
});

server.listen(3000, () => {
   console.log("listening on *:3000");
});
