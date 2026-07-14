// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
          Username or Email
        </label>
        <input
          type="text"
          name="identifier"
          required
          value={formData.identifier}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 bg-gray-50"
          placeholder="e.g. tourst or tourst@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 bg-gray-50"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-mono text-sm py-2 px-4 transition-colors duration-150"
      >
        [ LOGIN ]
      </button>
    </form>
  );
};

export default LoginForm;