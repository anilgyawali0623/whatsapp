import express from "express";
import { connectDB } from "../libs/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, function () {
  console.log("server is running");
    connectDB();
});
