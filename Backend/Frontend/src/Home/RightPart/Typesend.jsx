import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';

const Typesend = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    // console.log("from field", e)
    e.preventDefault();
    // console.log("message from ui", e)

    // Ensure there is a message to send
    if (message.trim() !== "") {
      await sendMessages(message);
      setMessage("");  // Reset the input field after sending
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex space-x-1 h-[8vh] bg-gray-800'>
        <div className='w-[70%] mx-4'>
          <input
            type='text'
            placeholder='Type here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='border border-gray-700 outline-none w-full px-4 py-3 mt-1 rounded-xl bg-slate-600 h-[6vh] items-center'
          />
        </div>
        <button type='submit' disabled={loading}>
          <IoSend className='text-3xl' />
        </button>
      </div>
    </form>
  );
};

export default Typesend;
