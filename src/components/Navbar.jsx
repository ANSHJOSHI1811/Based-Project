import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#121215] text-white p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Holori</div>
        <div className="flex space-x-4">
          <button
            className="flex items-center px-4 py-2 text-lg font-medium rounded-lg 
  bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            <img src="https://cdn-icons-png.flaticon.com/128/2139/2139855.png" alt="symbol" className="w-5 h-5 mr-2" />
            Compute
          </button>
          <button
            className="flex items-center px-4 py-2 text-lg font-medium rounded-lg 
  bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            <img src='https://cdn-icons-png.flaticon.com/128/9542/9542653.png' alt="symbol" className='w-5 h-5 mr-2' />
            Storage
          </button>
        </div>
          <button
            className="flex items-center px-4 py-2 text-lg font-medium rounded-lg 
  bg-gradient-to-r from-[#7c4bed] to-[#3433ea] hover:opacity-80"
          >
            <img src='https://cdn-icons-png.flaticon.com/128/570/570160.png' alt="symbol" className='w-5 h-5 mr-2'/>
            Visualize & optimize cloud spend
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
