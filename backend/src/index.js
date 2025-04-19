import express from "express";
import { connectDB } from "../libs/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "../libs/socket.js";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";
dotenv.config();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
server.listen(3000, function () {
  console.log("server is running");
  connectDB();
});
