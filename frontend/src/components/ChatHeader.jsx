import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import MyProfileModal from "./MyProfileModal";
import axios from "axios";

const ChatHeader = () => {
  const { user, setSelectedChat, chats, setChats, notification } = ChatState();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      setShowSearchResults(false);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResult(Array.isArray(data) ? data : []);
      setShowSearchResults(true);
      setLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResult([]);
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      setSearch("");
      setSearchResult([]);
      setShowSearchResults(false);
    } catch (error) {
      console.error("Error accessing chat:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-900 px-6 py-3 flex items-center justify-between border-b border-purple-800">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div>
<img src="/logo.png" alt="Zuno Logo" className="w-14 h-14" />
        </div>
        <span className="text-white text-xl font-bold ml-[-10px]">Zuno</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm mx-8 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => search && setShowSearchResults(true)}
            className="w-full bg-white/10 text-white placeholder-gray-400 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && (
          <div className="absolute top-full mt-2 w-full bg-slate-900 rounded-xl shadow-2xl border border-purple-600/50 max-h-96 overflow-hidden z-50">
            {loading ? (
              <div className="p-6 text-center">
                <div className="inline-block w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-300 mt-2 text-sm font-medium">Searching...</p>
              </div>
            ) : Array.isArray(searchResult) && searchResult.length > 0 ? (
              <div className="py-1 overflow-y-auto max-h-96">
                {searchResult.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => accessChat(user._id)}
                    className="w-full px-4 py-3 flex items-center gap-4 hover:bg-black/70 transition-all duration-200 text-left group border-b border-slate-800 last:border-b-0"
                  >
                    <div className="relative">
                      <img
                        src={user.pic}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-600 group-hover:ring-purple-400 transition-all"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white group-hover:text-white transition-colors truncate text-base">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-purple-200 transition-colors truncate">
                        {user.email}
                      </div>
                    </div>
                    <svg 
                      className="w-5 h-5 text-purple-500 group-hover:text-purple-300 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <svg 
                  className="w-12 h-12 text-purple-500 mx-auto mb-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-white font-semibold text-base">No users found</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {/* Backdrop to close search results */}
        {showSearchResults && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowSearchResults(false)}
          />
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* User Profile - Rounded Pill */}
        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center gap-2 bg-purple-800/50 hover:bg-purple-800 px-3 py-1.5 rounded-full transition-all duration-200 border border-purple-700/50"
        >
          <div className="relative">
            <img
              src={user?.pic}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-purple-900"></div>
          </div>
          <span className="text-white text-sm font-medium">{user?.name?.split(" ")[0]}</span>
        </button>

        {/* Notifications - Circular with Badge */}
        <button className="relative p-3 bg-purple-800/50 hover:bg-purple-800 rounded-full transition-all duration-200 border border-purple-700/50">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Notification Badge */}
          {notification.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-purple-900">
              {notification.length}
            </span>
          )}
        </button>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <MyProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default ChatHeader;
