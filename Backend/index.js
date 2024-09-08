import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";  // Add this import for static file serving

import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import { app, server } from "./SocketIO/server.js";

// const app = express(); app is running from socket IO


dotenv.config();

// middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: "*", // Or specify the allowed frontend origin
}));
// // /////////// code for deployement //////////"FOR tomorrow i think this should be after api route"
// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();

// //   // Serve static files from the React build folder
// //   app.use(express.static(dirPath, "Frontend", "dist"));

// //   // Handle React Router fallback
// //   app.get("*", (req, res) => {
// //     res.sendFile(path.resolve(dirPath, "Frontend", "dist", "index.html"));
// //   });
// // }

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

//...... Code for deployment ......
if(process.env.NODE_ENV == "production"){
  const dirPath = path.resolve();

  app.use(express.static("./Frontend/dist"))
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(dirPath, "./Frontend", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log(`Server is runnin at port ${PORT}`);
});
