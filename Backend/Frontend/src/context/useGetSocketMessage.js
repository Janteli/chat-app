import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../zustand/useConversation.js'
import sound from "../assets/notification.wav"

const useGetSocketMessage = () => {
    const {socket} = useSocketContext()
    const {messages, setMessage} = useConversation()

    useEffect(()=>{
        socket.on("newMessage", (newMessage)=>{
            const notification = new Audio(sound)
            notification.play()
            setMessage([...messages, newMessage])
        });
        return ()=>{
            // if no message
            socket.off("newMessage")
        }
    },[socket, messages, setMessage])
}

export default useGetSocketMessage