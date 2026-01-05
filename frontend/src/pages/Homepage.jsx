import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col bg-gradient-to-br from-purple-950/40 via-black to-black lg:min-h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="ZUNO" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
          <span className="text-white text-xl md:text-3xl font-bold">ZUNO</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center lg:justify-start lg:pt-20">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-6 leading-tight">
            <span className="text-white">Main</span>
            <br />
            <span className="text-[#d4ff00]">Character</span>
            <br />
            <span className="text-white">Energy.</span>
          </h1>

          <p className="text-gray-500 text-sm md:text-lg max-w-md">
            Ditch the boring chats. Connect with your tribe in 4K resolution vibes. No cap.
          </p>
        </div>

        {/* Footer */}
        <div className="hidden lg:flex items-center justify-between text-gray-600 text-sm mt-auto">
          <span>© 2025 ZUNO</span>
          <div className="flex gap-6">
            <button className="hover:text-gray-400">PRIVACY</button>
            <button className="hover:text-gray-400">TERMS</button>
          </div>
          <button className="hover:text-gray-400">★</button>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 bg-[#1a1a1a] px-6 pt-8 pb-8 md:p-12 flex items-start lg:items-center justify-center lg:min-h-screen">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex gap-3 md:gap-4 mb-5 md:mb-8">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-full font-semibold transition-all text-sm md:text-base ${
                activeTab === "login"
                  ? 'bg-[#d4ff00] text-black'
                  : 'bg-[#2a2a2a] text-gray-500 hover:bg-[#333333]'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-full font-semibold transition-all text-sm md:text-base ${
                activeTab === "signup"
                  ? 'bg-[#d4ff00] text-black'
                  : 'bg-[#2a2a2a] text-gray-500 hover:bg-[#333333]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-5 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {activeTab === "login" ? "Welcome Back!" : "Join the Vibe!"}
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              {activeTab === "login" 
                ? "Ready to jump back into the chaos?" 
                : "Create your account and start vibing"}
            </p>
          </div>

          {/* Forms */}
          <div className="auth-forms">
            {activeTab === "login" ? <LoginForm /> : <SignUpForm setActiveTab={setActiveTab} />}
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="lg:hidden flex items-center justify-between text-gray-600 text-xs p-6 bg-black">
        <span>© 2025 ZUNO</span>
        <div className="flex gap-4">
          <button className="hover:text-gray-400">PRIVACY</button>
          <button className="hover:text-gray-400">TERMS</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
