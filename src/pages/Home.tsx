
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// This component always redirects to the advisor dashboard
const Home = () => {
  useEffect(() => {
    console.log("Redirecting to Advisor Dashboard");
  }, []);
  
  return <Navigate to="/advisor" replace />;
};

export default Home;
