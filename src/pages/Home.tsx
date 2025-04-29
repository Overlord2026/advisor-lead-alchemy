
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// This component redirects from the home page to the advisor dashboard
const Home = () => {
  useEffect(() => {
    console.log("Redirecting from Home to Advisor Dashboard");
  }, []);
  
  return <Navigate to="/advisor" replace />;
};

export default Home;
