import { createContext, useContext, useState } from "react";
import api from "../api/axios";


const AuthContext=createContext();

export function AuthProvider({children}){
    const [token,setToken]=useState(()=>{
        return localStorage.getItem("token")
    })
    const [user,setUser]=useState(()=>{
        const savedUser=localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    })

    function register(token,user){
        localStorage.setItem("token",token);
        localStorage.setItem('user',JSON.stringify(user));
        setToken(token);
        setUser(user)
    }

    function login(token,user){
        localStorage.setItem("token",token);
        localStorage.setItem('user',JSON.stringify(user))
        setToken(token);
        setUser(user);
    }
    async function logout(){
        try{
            await api.post('/logout');
        }catch(error){
            console.log(error.response?.data);
        } finally{
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            setToken(null)
            setUser(null);
        }
    }

    return(
        <AuthContext.Provider value={{token,login,logout,register,user}}>{children}</AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}