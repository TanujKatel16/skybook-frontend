
import React, { useState } from 'react';
import authService from '../../services/auth.service';
import { useNavigate } from "react-router-dom";



const RegisterForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");


  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    const submitData = new FormData();

    submitData.append("username", formData.username);
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);

    if (formData.avatar) {

      submitData.append("avatar", formData.avatar);

    }

    try {

      await authService.register(submitData);

      navigate("/login");

    }

    catch (error) {

      console.log(error);
      setError(
        error.response?.data?.message || "Something went wrong"
      )

    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
          Username *
        </label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 bg-gray-50"
          placeholder="Must be unique"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-blue-600 bg-gray-50"
          placeholder="user@domain.com"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
          Password *
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

      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
          Avatar Image
        </label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:border file:border-gray-300 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {
        error && (

          <p className="text-red-600 text-sm">

            {error}

          </p>

        )
      }

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm py-2 px-4 mt-2 transition-colors duration-150"
      >
        [ SUBMIT REGISTRATION ]
      </button>
    </form>
  );
};

export default RegisterForm;