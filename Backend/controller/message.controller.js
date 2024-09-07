import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";



export const sendMessage = async (req, res) =>{
    // console.log("Message sent", req.params.id, req.body.message)

    try {
        // const message = req.body.message;
        const {message}  = req.body;
        const {id:receiverId} = req.params //receiver id
        const senderId = req.user._id; // current login id - user is from secureRoute holding token


        let conversation = await Conversation.findOne({
            members:{$all: [senderId, receiverId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //  await conversation.save()
        //  await newMessage.save() //not using this methond coz both not being saved simutaneously
        await Promise.all([conversation.save(), newMessage.save()]); //runs parallely

        // after saveing sending message to socket
        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json({
            // message: "Message sent successfully",
            newMessage
        })

    } catch (error) {
        console.log("Error from send error message routder", error)
        res.status(500).json({error: "Internal Server Error send message"})
    }
}

export const getMessage = async ( req, res )=>{
    try {
        const { id: chatUser} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members:{$all: [senderId, chatUser]}
        }).populate("messages");

        if(!conversation){
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
        res.status(201).json(messages)
    } catch (error) {
        console.log("Error from send error message routder", error)
        res.status(500).json({error: "Internal Server Error get message"})
    }
}