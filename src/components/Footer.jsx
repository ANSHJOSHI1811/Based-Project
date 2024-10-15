import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#121215] text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Copyright */}
        <div className="text-sm">&copy; 2024 CloudX. All Rights Reserved.</div>

        {/* Footer Links */}
        <div className="space-x-6">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
