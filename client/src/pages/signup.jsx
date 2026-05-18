import React, { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const Backendurl = import.meta.env.VITE_BACKEND_URL

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (form.password !== form.confirmPassword) {
            toast.warn("Passwords do not match!");
            setLoading(false);
            return;
        }
        //console.log("Signup Data:", form);
        try {
            const hashedpassword = await bcrypt.hash(form.password, 10)
            const { name, email } = form
            const res = await axios.post(`${Backendurl}/signup`, { name, email, password: hashedpassword })
            if (res.status === 200) {
                toast.success("User created", { autoClose: 1000, onClose: () => navigate('/login') })
            }
        }
        catch (e) {
            if (e.response && e.response.status === 409) {
                // Handle 409 Conflict
                toast.warn("User with this email already exists", { autoClose: 1000 });
            } else {
                // Handle other errors
                //console.log('Error while fetching signup response:', e);
                toast.error("An error occurred during signup", { autoClose: 1000 });
            }
        }
        finally {            
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600">
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                                placeholder="Enter your password"
                            />

                            <div
                                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600">
                                Confirm Password
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                                placeholder="Confirm your password"
                            />

                            <div
                                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-700 transition duration-200 cursor-pointer"
                        >
                            {loading? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Extra links */}
                    <div className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
