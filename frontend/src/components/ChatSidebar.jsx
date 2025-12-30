import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { toast } from "sonner";
import CreateGroupModal from "./CreateGroupModal";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const ChatSidebar = ({ fetchAgain }) => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast.error("Failed to load chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  const getSenderPic = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
  };

  const filteredChats = chats.filter((chat) => {
    if (!searchQuery) return true;
    const chatName = chat.isGroupChat
      ? chat.chatName
      : getSender(user, chat.users);
    return chatName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Count unread messages for each chat
  const getUnreadCount = (chatId) => {
    return notification.filter((notif) => notif.chat._id === chatId).length;
  };

  // Handle chat selection and clear notifications
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Remove notifications for this chat
    setNotification(notification.filter((notif) => notif.chat._id !== chat._id));
  };

  return (
    <div className="w-80 bg-slate-900/80 backdrop-blur-sm flex flex-col border-r border-slate-700">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Chats</h2>
          <button
            onClick={() => setShowGroupModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Group
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 text-white placeholder-slate-500 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const unreadCount = getUnreadCount(chat._id);
          const hasUnread = unreadCount > 0;
          
          return (
          <div
            key={chat._id}
            onClick={() => handleChatSelect(chat)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-slate-800/50 ${
              selectedChat?._id === chat._id
                ? "bg-slate-800/70 border-l-4 border-l-purple-500"
                : hasUnread
                ? "bg-purple-900/20 hover:bg-purple-900/30 border-l-4 border-l-pink-500"
                : "hover:bg-slate-800/30"
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={
                  chat.isGroupChat
                    ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    : getSenderPic(user, chat.users)
                }
                alt="avatar"
                className={`w-12 h-12 rounded-full object-cover border-2 ${
                  hasUnread ? "border-pink-500 ring-2 ring-pink-500/30" : "border-slate-700"
                }`}
              />
              {!chat.isGroupChat && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-medium truncate ${hasUnread ? "text-white font-bold" : "text-white"}`}>
                  {chat.isGroupChat ? chat.chatName : getSender(user, chat.users)}
                </h3>
                {chat.latestMessage && (
                  <span className={`text-xs ${hasUnread ? "text-pink-400 font-semibold" : "text-slate-500"}`}>
                    {new Date(chat.latestMessage.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
              <p className={`text-sm truncate ${hasUnread ? "text-white font-medium" : "text-slate-400"}`}>
                {chat.latestMessage?.content || "No messages yet"}
              </p>
            </div>

            {/* Badge */}
            {hasUnread && (
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            )}
          </div>
        )})}
      </div>

      {/* Create Group Modal */}
      {showGroupModal && (
        <CreateGroupModal
          isOpen={showGroupModal}
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </div>
  );
};

export default ChatSidebar;
