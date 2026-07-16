import React, { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {


    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        emailOrUsername: "",

        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

      e.preventDefault();
      setError("");

        try {

          const response = await authService.login(formData);
          setUser(response.data);
          navigate("/");


        }

        catch (error) {

            setError(
                error.response?.data?.message || "Something went wrong"
            )
        }

    };

    return (

        <form onSubmit={handleSubmit} className="space-y-4">

            <div>

                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">

                    Username or Email

                </label>

                <input

                    type="text"

                    name="emailOrUsername"

                    value={formData.emailOrUsername}

                    onChange={handleChange}

                    required

                    placeholder="e.g. titumama or titumama@gmail.com"

                    className="w-full p-2 border border-gray-300 text-sm bg-gray-50 focus:outline-none focus:border-blue-600"

                />

            </div>

            <div>

                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">

                    Password

                </label>

                <input

                    type="password"

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                    required

                    placeholder="Enter your password"

                    className="w-full p-2 border border-gray-300 text-sm bg-gray-50 focus:outline-none focus:border-blue-600"

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

                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-mono text-sm py-2 transition-colors"

            >

                [ LOGIN ]

            </button>

        </form>

    );

};

export default LoginForm;