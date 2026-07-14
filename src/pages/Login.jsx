// src/pages/Login.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import CardHeader from '../components/common/CardHeader';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-md mx-auto mt-16 px-4">
        <div className="bg-white border border-gray-300 p-6">
          <CardHeader title="Enter SkyBook" />
          <LoginForm />
          <div className="mt-4 pt-3 border-t border-gray-100 text-center text-xs text-gray-500">
            New to SkyBook? <a href="/register" className="text-blue-600 hover:underline">Register an account</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;