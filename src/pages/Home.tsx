
import React from "react";
import { Navigate } from "react-router-dom";

// This component simply redirects to the advisor dashboard
const Home = () => {
  return <Navigate to="/advisor" replace />;
};

export default Home;
