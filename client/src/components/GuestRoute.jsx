import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
    const {token}=useAuth();
    if(token){
        return <Navigate to="/" replace/>
    }
  return (
    <Outlet/>
  )
}

export default GuestRoute
