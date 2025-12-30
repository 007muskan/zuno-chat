import { useState } from 'react';

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex">
      {/* Left Side */}
      <div className="w-1/2 p-12 flex flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
          </div>
          <span className="text-white text-2xl font-bold">ZUNO</span>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-gray-800/50 border border-lime-400/30 rounded-full text-lime-400 text-sm">
              ⚡ GEM Z EDITION
            </span>
          </div>
          
          <h1 className="text-7xl font-bold mb-6">
            <span className="text-white">Main</span>
            <br />
            <span className="text-lime-400">Character</span>
            <br />
            <span className="text-white">Energy.</span>
          </h1>

          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Ditch the boring chats. Connect with your tribe in 4K resolution vibes. No cap.
          </p>

          {/* Active Vibes */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-gray-900"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-900"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-gray-900"></div>
            </div>
            <span className="text-gray-400">1M+ active vibes</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <span>© 2024 ZUNO</span>
          <div className="flex gap-6">
            <button className="hover:text-gray-300">PRIVACY</button>
            <button className="hover:text-gray-300">TERMS</button>
          </div>
          <button className="hover:text-gray-300">★</button>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-1/2 bg-gray-900/50 backdrop-blur-sm p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setShowLogin(true)}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
                showLogin
                  ? 'bg-lime-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
                !showLogin
                  ? 'bg-lime-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-400">Ready to jump back into the chaos?</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-lime-400 text-sm font-semibold mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-lime-400 text-sm font-semibold">
                  PASSWORD
                </label>
                <button type="button" className="text-gray-400 text-sm hover:text-gray-300">
                  Lost key?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Let's Go
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/50 text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
