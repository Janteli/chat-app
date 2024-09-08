import React from "react";

const UserMessage = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp")); //logged in user
  // console.log("consoing from UserMessage",message)
  // If authUser is not available yet, don't proceed with comparison
  if (!authUser || !authUser.user) {
    return null; // or show some loading indicator
  }
  // Compare senderId with the logged-in user's id
  const itsMe = message.senderId === authUser.user._id;

  // console.log("consoling authuser", authUser.user._id, )
  // console.log("message props", message)


  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = new Date(message.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([],{
    hour: "2-digit",
    minute: "2-digit"
  }
)
  return (
    
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white chat-bubble-info ${chatColor}`}>
          {message.message}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    
  );
};

export default UserMessage;
