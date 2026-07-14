// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import FlightSearch from '../components/home/FlightSearch';
import RouteTable from '../components/home/RouteTable';
import PnrChecker from '../components/home/PnrChecker';
import SystemNotice from '../components/home/SystemNotice';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="max-w-5xl mx-auto mt-8 px-4 mb-16">
        <Hero />
        <FlightSearch />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <RouteTable />
          </div>
          <div className="md:col-span-1">
            <PnrChecker />
            <SystemNotice />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;