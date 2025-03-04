import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavBar from './navBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) {
      return;
    }
    try {
      const loggedInUser = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      console.log(loggedInUser.data);
      dispatch(addUser(loggedInUser.data));
    } catch (err) {
      if (err.status === 401) return navigate('/login');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
