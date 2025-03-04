import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [emailId, setEmaiId] = useState('A@gmail.com');
  const [password, setPassword] = useState('Abhi@123');

  const handleLogin = async () => {
    try {
      const loginRes = await axios.post(
        'http://localhost:3000/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(loginRes);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="flex bg-gray-800 shadow-lg rounded-lg overflow-hidden w-[600px]">
        {/* Left Image Section */}
        <div className="w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAvE4NQuOnrjboZSCZCOfDv7ry3l4yysuLg&s"
            alt="Movie"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Login Section */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Login
          </h2>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              value={emailId}
              onChange={(e) => setEmaiId(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            className="mt-5 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md shadow-md transition"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
