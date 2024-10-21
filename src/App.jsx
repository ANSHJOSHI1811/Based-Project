import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Usage from './pages/Usage';
import MoreDetailes from './pages/Details.jsx';
import ErrorPage from './pages/Errorpage'; 

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/details" element={<MoreDetailes />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
