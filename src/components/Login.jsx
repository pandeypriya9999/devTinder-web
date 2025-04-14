import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmaiId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const loginRes = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      // If login is successful, navigate to the home page
      dispatch(addUser(loginRes.data.data));
      return navigate('/');
    } catch (err) {
      // Handle errors based on status codes
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else if (err.response && err.response.status === 404) {
        setError('User is not registered.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      console.log(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const signUpRes = await axios.post(
        BASE_URL + '/signup',
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );

      // If signup is successful, navigate to the home page
      dispatch(addUser(signUpRes.data.data));
      return navigate('/profile');
    } catch (err) {
      // Handle errors based on status codes
      if (err.response && err.response.status === 409) {
        setError('User already exists.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
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
            {isLoginForm ? 'Login' : 'Sign Up'}
          </h2>

          {/* Input Fields */}
          <div className="space-y-4">
            {/* Conditionally render firstName and lastName fields */}
            {!isLoginForm && (
              <>
                <input
                  type="text"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
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

          <p className="text-red-500">{error}</p>
          {/* Login Button */}
          <button
            className="mt-5 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md shadow-md transition"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? 'Login' : 'Sign Up'}
          </button>
          <p
            className=" cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
