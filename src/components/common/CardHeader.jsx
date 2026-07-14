// src/components/common/CardHeader.jsx
import React from 'react';

const CardHeader = ({ title }) => {
  return (
    <div className="border-b border-gray-200 pb-3 mb-4">
      <h1 className="text-base font-bold uppercase tracking-wider text-gray-700">
        {title}
      </h1>
    </div>
  );
};

export default CardHeader;