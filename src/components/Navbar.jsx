import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#121215] text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Site Name */}
        <div className="text-2xl font-bold">MyWebsite</div>

        {/* Buttons in the Center */}
        <div className="flex space-x-4">
          <button
            className="px-6 py-3 text-lg font-medium rounded-lg 
            bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            Button 1
          </button>
          <button
            className="px-6 py-3 text-lg font-medium rounded-lg 
            bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            Button 2
          </button>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Services
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
