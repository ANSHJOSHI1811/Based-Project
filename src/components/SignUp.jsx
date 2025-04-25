import React from "react";

function SignUp() {
  return (
    <div className="mt-10 mx-auto w-96 bg-gray-100 p-6 rounded shadow-md">
      <h2 className="text-xl mb-4 font-bold">Sign Up</h2>
      <input className="w-full p-2 border rounded mb-3" type="text" placeholder="Name" />
      <input className="w-full p-2 border rounded mb-3" type="email" placeholder="Email" />
      <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Password" />
      <button className="bg-green-500 text-white w-full p-2 rounded">Register</button>
    </div>
  );
}

export default SignUp;
