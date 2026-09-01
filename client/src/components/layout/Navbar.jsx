import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const [isOpen,setIsOpen]=useState(false)
    const {token,logout}=useAuth();
  return (
    <nav className='sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur'>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-8">
            <Link to="/" className='text-2xl font-bold text-red-600'>
            Pizza Home</Link>

            <div className="hidden items-center gap-8 md:flex">
                <Link to="/" className='font-medium text-gray-700 hover:text-red-600'>
                    Home
                </Link>
                <Link to="/menu" className='font-medium text-gray-700 hover:text-red-600'>
                    Menu
                </Link>
                <Link to="/cart" className='relative flex items-center gap-2 rounded-full border border-gray-200 px-4 text-gray-700 font-medium transition hover:border-red-200 hover:bg-red-50 hover:text-red-600'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.086.836L5.5 7.5m0 0h14.25l-1.5 7.5H7L5.5 7.5Zm2 7.5L6.75 18h11.5M9 21h.008M18 21h.008"
                        />
                    </svg>
                    Cart
                </Link>
                {
                    token && (

                        <Link to="/orders" className='font-medium text-gray-700 hover:text-red-600'>
                            My orders
                        </Link>
                    )
                }
            </div>
            {
                token ? (
                    <button  className='rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 hidden md:flex'
                    onClick={logout}
                    type='button'
                    >
                        Logout
                    </button>
                ):(

                <div className="hidden items-center gap-3 md:flex">
                    <Link to="/login" className='font-medium text-gray-700 hover:text-red-600'>Login</Link>
                    <Link to="/register" className='rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700
                    '>
                        Register
                    </Link>
                </div>
                )
            }

            <button className='md:hidden rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-red-600' type='button' onClick={()=>setIsOpen(!isOpen)}>
                {isOpen ?(
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ):(
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                        />
                    </svg>
                )}
            </button>
        </div>
        {isOpen &&(
            <div className='border-t border-gray-100 bg-white shadow-sm md:hidden'>
                <div className="max-auto max-w-7xl px-6 py-5">

                    <div className="flex flex-col gap-1">
                        <Link to="/" onClick={()=>setIsOpen(false)} className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600' >
                            Home
                        </Link>
                        <Link to="/menu" onClick={()=>setIsOpen(false)} className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'>
                            Menu
                        </Link>
                        <Link to="/cart" onClick={()=>setIsOpen(false)} className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'>
                            Cart
                        </Link>
                        {
                            token && (
                                <Link to="/orders" onClick={()=>setIsOpen(false)} className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'>
                                    My orders
                                </Link>
                            )
                        }
                        
                    </div>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                        {
                            token ? (
                                <button className='w-full rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700'
                                type='button'
                                onClick={()=>{
                                    logout()
                                    setIsOpen(false);
                                }}
                                >
                                    Logout
                                </button>
                            ):(

                                <div className="flex gap-3">
                                    <Link to="/login" onClick={()=>setIsOpen(false)} className='flex-1 rounded-xl border border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50'>
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={()=>setIsOpen(false)} className='flex-1 rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-700'>
                                        Register
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar
