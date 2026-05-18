import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const Backendurl = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.log("Login Data:", form);
    const { email, password } = form
    try {
      const res = await axios.post(`${Backendurl}/login`, { email, password })
      if (res.status === 200) {
        console.log(res.data)
        const token = res.data.token;
        const userRole = res.data.userrole
        sessionStorage.setItem('token', token);
        //sessionStorage.setItem('UserID',res.data.user_id)
        toast.success(('Login Successful'),
          {
            position: "top-center",
            autoClose: 1000,
            onClose: () => { userRole == 'admin' ? navigate('/admin/view') : navigate('/home') }
          });

      }
    }
    catch (e) {
      if (e.response.data) {
        toast.error(e.response.data, { position: "top-center" })
      }
      console.log('error while loggging in', e)
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className=''>
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="w-full max-w-sm mt-6 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Extra links */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mb-4 mt-2 bg-gray-200 cursor-pointer text-gray-700 font-semibold py-2 px-4"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Login;
