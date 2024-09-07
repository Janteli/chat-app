import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // useEffect(()=>{
  //   return setSelectedConversation(null)
  // },[selectedConversation])
  return (
    <div className="border  w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser />
            <div
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
};

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  // console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl"/>
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br />
            No chat selected, please start a conversation by selecting someone
            from your contacts.
          </h1>
        </div>
      </div>
    </>
  );
};
