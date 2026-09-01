import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {login}=useAuth();
  const navigate=useNavigate();
  const location=useLocation();

  const from=location.state?.from?.pathname || "/";

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response= await api.post("/login",{
        email,
        password
      })
      
      login(response.data.token,response.data.user);
      console.log(response.data);
      navigate(from,{replace:true});
    }catch (error){
      console.log(error);
    }
  }

  return (
    <div className='mx-auto max-w-md px-6 py-16'>
      <h1 className='text-3xl font-bold'>
        Login
      </h1>
      <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
        <div>
          <label htmlFor="email" className='block text-sm font-semibold'>
            Email
          </label>
          <input type="email" id='email'value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}
          className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-semibold'>
            Password
          </label>

          <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}
          placeholder='Enter the password'
          className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500'
          />
        </div>

        <button type='submit' className='w-full rounded-full bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700'>
          Login
        </button>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Don't have an account?{" "}
          <Link to="/register" className='font-semibold text-red-600 hover:text-red-700'>
          Register
          </Link>
        </p>
      </form>
      
    </div>
  )
}

export default Login
