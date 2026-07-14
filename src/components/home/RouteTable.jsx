// src/components/home/RouteTable.jsx
import React from 'react';

const RouteTable = () => {
  const popularRoutes = [
    { id: '101', route: 'New Delhi (DEL) → Mumbai (BOM)', status: 'ON TIME', baseFare: '$45' },
    { id: '102', route: 'Bangalore (BLR) → Hyderabad (HYD)', status: 'FAST FILLING', baseFare: '$30' },
    { id: '103', route: 'Mumbai (BOM) → London (LHR)', status: 'AVAILABLE', baseFare: '$420' },
    { id: '104', route: 'Kolkata (CCU) → Chennai (MAA)', status: 'DELAYED', baseFare: '$55' },
  ];

  return (
    <div className="border border-gray-300 bg-white">
      <div className="bg-gray-100 border-b border-gray-300 p-2">
        <span className="font-mono text-xs font-bold text-gray-600 uppercase">
          :: Frequent Routes & Fares
        </span>
      </div>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-mono">
            <th className="p-2 border-r border-gray-200">Flight #</th>
            <th className="p-2 border-r border-gray-200">Route</th>
            <th className="p-2 border-r border-gray-200">Status</th>
            <th className="p-2">Base Fare</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 font-mono">
          {popularRoutes.map((flight) => (
            <tr key={flight.id} className="hover:bg-yellow-50/50">
              <td className="p-2 border-r border-gray-200 text-blue-600 font-bold">
                SB-{flight.id}
              </td>
              <td className="p-2 border-r border-gray-200 font-sans">
                {flight.route}
              </td>
              <td className="p-2 border-r border-gray-200">
                <span className={`px-1 text-[10px] ${
                  flight.status === 'DELAYED' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {flight.status}
                </span>
              </td>
              <td className="p-2 text-gray-700">{flight.baseFare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;