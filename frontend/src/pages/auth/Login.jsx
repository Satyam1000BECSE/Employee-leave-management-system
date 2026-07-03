import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock, LogIn } from "lucide-react";

import {
    loginUser,
    reset,
} from "../../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Login = () => {

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        user,
        isLoading,
        isError,
        isSuccess,
        message,
    } = useSelector((state) => state.auth);

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            loginUser({
                email,
                password,
            })
        );
    };

    useEffect(() => {

        if (isError) {
            toast.error(message);
        }

        if (isSuccess && user) {

            toast.success("Login Successful");

            if (user.role === "manager") {
                navigate("/manager/dashboard");
            } else {
                navigate("/employee/dashboard");
            }
        }

        dispatch(reset());

    }, [
        user,
        isError,
        isSuccess,
        message,
        navigate,
        dispatch,
    ]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
                    Login
                </h1>

                {/* Email */}
                <div className="relative mb-5">
                    <Mail
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Password */}
                <div className="relative mb-6">
                    <Lock
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <button
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-lg flex justify-center items-center gap-2 font-semibold disabled:opacity-70"
                >
                    <LogIn size={20} />

                    {isLoading ? "Loading..." : "Login"}
                </button>

            </form>
        </div>
    );
};

export default Login;