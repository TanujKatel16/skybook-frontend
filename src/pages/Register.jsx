// src/pages/Register.jsx
import React from 'react';
import Navbar from '../components/common/Navbar';
import CardHeader from '../components/common/CardHeader';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-md mx-auto mt-12 px-4 mb-12">
        <div className="bg-white border border-gray-300 p-6">
          <CardHeader title="Register New User" />
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default Register;