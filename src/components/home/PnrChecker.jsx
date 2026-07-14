// src/components/home/PnrChecker.jsx
import React from 'react';

const PnrChecker = () => {
  return (
    <div className="border border-gray-300 bg-white p-4">
      <h3 className="font-mono text-xs font-bold text-gray-600 uppercase border-b border-gray-200 pb-2 mb-3">
        :: Check PNR Status
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        Enter your 6-digit booking reference to check live boarding status.
      </p>
      <form onSubmit={(e) => { e.preventDefault(); alert("Checking PNR..."); }}>
        <input
          type="text"
          maxLength="6"
          placeholder="e.g. X89J2P"
          className="w-full p-1.5 border border-gray-300 text-xs font-mono uppercase mb-2 focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs py-1.5 transition-colors"
        >
          CHECK STATUS
        </button>
      </form>
    </div>
  );
};

export default PnrChecker;