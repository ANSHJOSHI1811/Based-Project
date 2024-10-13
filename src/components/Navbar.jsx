import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#282c34', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
      <Link to="/usage" style={{ marginRight: '15px', color: 'white' }}>usage</Link>
      <Link to="/detailes" style={{ color: 'white' }}>detailes</Link>
    </nav>
  );
};

export default Navbar;
