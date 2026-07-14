// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center text-xs font-mono">
            LOGO
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-800">
            SkyBook<span className="text-blue-600 font-normal text-xs ml-1">v1.0</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm font-medium text-blue-600">
          <a href="/" className="hover:underline">Home</a>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;