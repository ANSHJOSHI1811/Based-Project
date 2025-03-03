import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Usage from './pages/Usage';
import MoreDetailes from './pages/Details.jsx';
import SavingPlan from './pages/savingPlan.jsx';
import ErrorPage from './pages/Errorpage'; 
import SkuDetails from "./components/skuDetails.jsx";
import 'react-loading-skeleton/dist/skeleton.css'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/details" element={<MoreDetailes />} />
        <Route path="/savingPlan" element={<SavingPlan/>} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/sku/:sku_id" element={<SkuDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
