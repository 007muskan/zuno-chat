import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ChatHeader from "../components/ChatHeader";
import ChatSidebar from "../components/ChatSidebar";
import ChatArea from "../components/ChatArea";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Top Header */}
      <ChatHeader />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ChatSidebar fetchAgain={fetchAgain} />
        
        {/* Chat Area */}
        <ChatArea fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
};

export default Chatpage;
