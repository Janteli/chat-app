import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios"


const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  // console.log("useGetMEssage", messages);
  

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessage(res.data)
          setLoading(false)
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false)
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return {loading, messages};
};

export default useGetMessage;
