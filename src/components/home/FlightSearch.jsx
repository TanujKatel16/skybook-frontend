// src/components/home/FlightSearch.jsx
import React, { useState } from 'react';

const FlightSearch = () => {
  const [search, setSearch] = useState({
    source: '',
    destination: '',
    date: '',
    passengers: 1,
  });

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching flights:', search);
  };

  return (
    <div className="bg-white border border-gray-300 p-4 mb-6">
      <div className="bg-gray-100 border-b border-gray-300 -mt-4 -mx-4 p-2 mb-4 px-4">
        <h2 className="font-mono text-xs font-bold text-gray-600 uppercase tracking-wide">
          :: Search Available Flights
        </h2>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <div>
          <label className="block text-xs text-gray-500 mb-1">From (Source)</label>
          <input
            type="text"
            name="source"
            placeholder="e.g. DEL, Mumbai"
            value={search.source}
            onChange={handleChange}
            required
            className="w-full p-1.5 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 uppercase"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">To (Destination)</label>
          <input
            type="text"
            name="destination"
            placeholder="e.g. BLR, London"
            value={search.destination}
            onChange={handleChange}
            required
            className="w-full p-1.5 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 uppercase"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Date of Journey</label>
          <input
            type="date"
            name="date"
            value={search.date}
            onChange={handleChange}
            required
            className="w-full p-1.5 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Passengers</label>
          <input
            type="number"
            name="passengers"
            min="1"
            max="9"
            value={search.passengers}
            onChange={handleChange}
            required
            className="w-full p-1.5 border border-gray-300 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-mono text-xs py-2 px-3 transition-colors duration-150"
          >
            SEARCH &rarr;
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;