import {Server} from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors())
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["GET","POST"],
    }
});

// real time message code goes here
export const getReceiverSocketId = (receiverId) =>{
    return users[receiverId];
}

const users = {}

// used to listen events on server side.
io.on("connection",(socket)=>{
    //parameter socket provides socket id to every user
    console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if(userId){
        users[userId] = socket.id;
        console.log("socket",users)
    }

    // used to send the events to all connected users
    io.emit("getOnlineUsers", Object.keys(users))

    // used to listen cliend side event emitted by server side (server and client)
    socket.on("disconnect", ()=>{
        console.log("The user is disconnected", socket.id)
        delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users))

    })
})

export {app, io, server};
