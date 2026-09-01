import React, { use } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
    const {token,user}=useAuth();

    if(!token){
        return <Navigate to="/login" replace/>
    }
    if(!user){
        return <Navigate to="/" replace/>
    }
    if(!user.is_admin){
        return <Navigate to="/" replace/>
    }
  return (
    <Outlet/>
  )
}

export default AdminRoute
