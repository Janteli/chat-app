import React, { useState } from 'react'
import useConversation from '../zustand/useConversation.js';
import axios from "axios"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    const sendMessages = async (message) => { //parameter message comes from frontend
      // console.log("from UI", message);
      
            setLoading(true)
          try {
            const res = await axios.post(
              `/api/message/send/${selectedConversation._id}`,{message}
            );
            setMessage([...messages,res.data.newMessage])
            setLoading(false)
          } catch (error) {
            console.log("Error in sending messages", error);
            setLoading(false)
          }
        };
  return {loading, sendMessages}
}

export default useSendMessage;