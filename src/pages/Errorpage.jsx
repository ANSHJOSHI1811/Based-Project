import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">408</h1>
      <p className="text-lg mb-6">Oops! The page you are looking for doesn't exist.</p>
      <a href="/" className="text-blue-500 hover:underline">Go Back to Home</a>
    </div>
  );
};

export default ErrorPage;
