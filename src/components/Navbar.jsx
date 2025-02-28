import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDatabase } from "react-icons/ai";
import { FaDatabase, FaArrowUpRightFromSquare } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <nav className="bg-[#121215] text-white p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold ml-4">CloudX</div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/details")} // Navigate on click
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg 
            bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            <AiFillDatabase className="mr-2" />
            Basic-Plan
          </button>

          <button
            onClick={() => navigate("/savingPlan")} // Navigate on click
            className="flex items-center px-4 py-2 text-md font-medium rounded-lg 
            bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            <FaDatabase className="mr-2" />
            Saving-Plan
          </button>
        </div>

        <button
          onClick={() => navigate("/details")} // Another navigation example
          className="flex items-center px-4 py-2 text-sm mr-2 font-medium rounded-lg 
          bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
        >
          <FaArrowUpRightFromSquare className="mr-2" />
          Visualize & Optimize Cloud Spend
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
