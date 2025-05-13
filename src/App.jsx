import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignInModal from "./components/SignInModel.jsx";
import Home from './pages/Home';
import Usage from './pages/Usage';
import MoreDetailes from './pages/Details.jsx';
import SavingPlan from './pages/savingPlan.jsx';
import ErrorPage from './pages/Errorpage'; 
import SkuDetails from "./components/skuDetails.jsx";
function App() {
  const location = useLocation();
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    // Only show SignInModal on home route
    if (location.pathname === "/") {
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
    }
  }, [location]);

  const handleNotRegistered = () => {
    setShowSignIn(false);
    window.location.href = "/signup"; // or use navigate from react-router
  };

  return (
    <div>
      <Navbar />
      {showSignIn && <SignInModal
  onNotRegistered={handleNotRegistered}
  onClose={() => setShowSignIn(false)}
/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/details" element={<MoreDetailes />} />
        <Route path="/savingPlan" element={<SavingPlan />} />
        <Route path="/sku/:sku_id" element={<SkuDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
