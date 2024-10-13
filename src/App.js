import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'Navbar'
import Footer from 'Footer'
import Home from './pages/Home';
import Usage from './pages/Usage';
import MoreDetailes from './pages/MoreDetailes';
function App() {
  return (
    <>
  <Navbar/>
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usage" element={<Usage/>} />
        <Route path="/moreDetailes" element={<MoreDetailes/>} />
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
