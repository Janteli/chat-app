import React, { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

const Messages = () => {
  const { loading, messages } = useGetMessage();
  // console.log("messages", messages);

  // messages.forEach((message) => {
  //   console.log("Generated key:", message._id);
  // });

  useGetSocketMessage() //listening incomming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(90vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <UserMessage message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
