import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useLocation, useNavigate,Link } from 'react-router-dom';
const Register = () => {
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [password_confirmation,setPassword_confirmation]=useState("");
  const {register}=useAuth();
  const location=useLocation();
  const from =location.state?.from?.pathname ||"/";


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      const response=await api.post('/register',{
        name,
        email,
        password,
        password_confirmation
      })
      console.log(response.data)
      register(response.data.token,response.data.user);
      
      navigate(from,{replace:true})
    }catch(error){
      console.log(error);
    }
    
  }
  return (
    <div className='mx-auto max-w-7xl px-6 py-16'>
      <h1 className='text-3xl font-bold'>
        Register a new account
      </h1>
      <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
        <div>
          <label htmlFor="name" className='block text-sm font-semibold'>Name</label>
          <input required type="text" id='name'placeholder='Enter your name' className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500' onChange={(e)=>setName(e.target.value)} value={name} />
        </div>

        <div>
          <label htmlFor="email" className='block text-sm font-semibold'>Email</label>
          <input placeholder='Enter your email' required  type="email" className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500' value={email} onChange={(e)=>setEmail(e.target.value)} id='email' />
        </div>

        <div>
          <label htmlFor="password" className='block text-sm font-semibold'>Password</label>
          <input placeholder='Enter your password' required type="password" className='mt-2 w-full rounded-xl border border-gray-200 outline-none px-4 py-3 focus:border-red-500' value={password} id='password' onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <div>
          <label htmlFor="password_confirmation" className='block text-sm font-semibold'>Password Confirmation</label>
          <input placeholder='Confirm your password' required type="password" className='mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500' id='password_confirmation' value={password_confirmation} onChange={(e)=>setPassword_confirmation(e.target.value)} />
        </div>

        <button className='w-full rounded-full bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700' type='submit'>
          Register
        </button>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Already have an account?{" "}
          <Link to="/login" className='font-semibold text-red-600 hover:text-red-700'>
          Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
