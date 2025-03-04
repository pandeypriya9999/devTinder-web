import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Login from './Login';

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Login />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
