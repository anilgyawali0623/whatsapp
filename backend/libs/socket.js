import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
const userSocketMap = {}; //  use to store the online user id
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  //  so this part get the id of user when they connect
  console.log("a user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // when the user clse the page or connection get lost this part is trigger basically connection is lost and the user is no longer online it meant
  socket.on("disconnect", () => {
    console.log("a user is disconnect", socket.id);
    delete userSocketMap(userId);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, server, app };
