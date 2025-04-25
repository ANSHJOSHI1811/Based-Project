import React from "react";
import { X } from "lucide-react"; // Optional: for a nice icon (you can also use plain text)

function SignInModal({ onNotRegistered, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-80">
        {/* Cross (close) button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl mb-4 font-bold text-center">Sign In</h2>
        <input className="w-full p-2 border rounded mb-3" type="email" placeholder="Email" />
        <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Password" />
        <button className="bg-blue-500 text-white w-full p-2 rounded">Sign In</button>
        <p className="text-sm text-center mt-3">
          Not registered?{" "}
          <button className="text-blue-500 underline" onClick={onNotRegistered}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignInModal;
