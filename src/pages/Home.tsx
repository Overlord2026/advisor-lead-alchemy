
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// This component always redirects to the advisor dashboard
const Home = () => {
  useEffect(() => {
    console.log("Home component - Forcing redirect to Advisor Dashboard");
  }, []);
  
  // Force immediate redirect with no conditions
  return <Navigate to="/advisor" replace />;
};

export default Home;
