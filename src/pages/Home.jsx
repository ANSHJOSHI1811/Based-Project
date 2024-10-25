import React from 'react';
import {Link} from "react-router-dom";
const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of CloudX.</p>
      <Link to="/usage" className="text-blue-600"> Usage </Link>  
      <Link to="/details" className="text-blue-600"> Details </Link>  
    </div>
  );
};

export default Home;
