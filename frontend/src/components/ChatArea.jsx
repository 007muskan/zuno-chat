import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatArea = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className="flex-1 flex flex-col bg-slate-950/50">
      {!selectedChat ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 text-lg font-medium uppercase tracking-wide">
              CLICK ON A USER TO START CHATTING
            </p>
          </div>
        </div>
      ) : (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </div>
  );
};

export default ChatArea;
