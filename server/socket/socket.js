import http from "http";
import { Server } from "socket.io";

import app from "../app.js";
const server = http.createServer(app);

const socketMap = {};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  let userId = socket.handshake.query.userId;
  if(!userId){
    return
  }
  socketMap[userId] = socket?.id;
  io.emit("onlineUsers", Object.keys(socketMap));

  socket.on("disconnect", () => {
    delete socketMap[userId];
    io.emit("onlineUsers", Object.keys(socketMap));
  });

});



export { app, io, server , socketMap};
