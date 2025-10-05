import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import bcrypt from 'bcrypt'
import {ToastContainer,toast} from 'react-toastify'

const Login = () => {
    const navigate=useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log("Login Data:", form);
    const{email,password}=form
    try{
      const res=await axios.post('https://green-pitch-server-production.up.railway.app//login',{email,password})
    if(res.status===200)
    {
      const token = res.data.token; 
      sessionStorage.setItem('token', token); 
      //sessionStorage.setItem('UserID',res.data.user_id)
      toast.success(('Login Successful'),
      {position:"top-center",
        autoClose:1000,
        onClose:()=>navigate('/home')
      });
      
    }}
    catch(e)
      { if(e.response.data){
        toast.error(e.response.data,{position:"top-center"})
      }
        console.log('error while loggging in',e)}
  };

  return (
    
    <div className=''>
        <Navbar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
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
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Login
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
    </div>
    </div>
  );
};

export default Login;
