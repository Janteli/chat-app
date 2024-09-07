import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import { app, server } from "./SocketIO/server.js";

// const app = express(); app is running from socket IO


dotenv.config();

// middleware
app.use(express.json())
app.use(cookieParser());
// app.use(cors());


const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

try {
  mongoose
    .connect(URI)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
} catch (error) {
  console.log(error);
}

app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)


server.listen(PORT, () => {
  console.log(`Server is runnin at port ${PORT}`);
});
