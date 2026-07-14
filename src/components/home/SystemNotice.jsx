// src/components/home/SystemNotice.jsx
import React from 'react';

const SystemNotice = () => {
  return (
    <div className="border border-gray-300 bg-white p-3 mt-4 text-xs">
      <div className="font-bold text-gray-700 mb-1">System Notice:</div>
      <p className="text-gray-600 text-[11px] leading-relaxed">
        Backend services are operating normally. Baggage allowance rules have been updated for domestic flights.
      </p>
    </div>
  );
};

export default SystemNotice;