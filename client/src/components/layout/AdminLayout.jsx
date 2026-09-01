import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminLayout = () => {
    const {logout,user}=useAuth();
    const [isOpen,setIsOpen]=useState(false);

    const closeMenu=()=>setIsOpen(false)

  return (
    <div className='min-h-screen bg-gray-50'>
        {/* Mobile Header */}
        <header className='flex items-center justify-between border-b border-gray-200 px-5 py-4 md:hidden'>
            <Link to="/admin" onClick={closeMenu}>
            Pizza Admin
            </Link>
            <button type='button' onClick={()=>setIsOpen((open)=>!open)} className='rounded-lg p-2 text-gray-700 transition hover:text-red-600' aria-label='Toggle admin menu'>
                {
                    isOpen ? (
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
                    ) : (
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
                    )
                }
            </button>

        </header>

        <div className='flex min-h-screen'>
            {/*Descktop Sidebar */}
            <aside className='hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col'>
                <div className='border-b border-gray-100 px-6 py-6'>
                    <Link to="/admin" className='text-xl font-bold text-red-600'>
                        Pizza Admin
                    </Link>
                </div>
                <nav className='p-4'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <Link to="/admin" className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'>
                            Dashboard
                        </Link>
                        <Link className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600' to="/admin/pizzas">
                            Pizzas
                        </Link>
                        <Link className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600' to="/admin/orders">
                            Orders
                        </Link>
                    </div>
                </nav>
                <div className='absolute bottom-0 w-64 border-t border-gray-100 p-4'>
                    <p className='px-4 text-sm font-semibold text-gray-900'>
                        {user?.name}
                    </p>

                    <button type='button' onClick={logout} className='mt-3 w-full rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50'>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className='flex-1 main-w-0 overflow-hidden'>
                <div className='border-b border-gray-200 bg-white px-6 py-5 md:hidden'>
                    <span className='text-xl font-bold text-red-600'>
                        Pizza Admin
                    </span>
                </div>
                <Outlet/>
            </main>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div className='absolute left-0 right-0 top-[65px] z-50 border-b border-gray-200 bg-white shadow-lg md:hidden'>
                <nav className='p-4'>
                    <div className='flex flex-col gap-2'>
                        <Link to="/admin" onClick={closeMenu} className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'>
                            Dashboard
                        </Link>
                        <Link to="/admin/pizzas" onClick={closeMenu} className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'>
                            Pizzas
                        </Link>
                        <Link className='rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600' onClick={closeMenu} to="/admin/orders">
                            Orders
                        </Link>

                        <div className='mt-2 border-t border-gray-100 pt-4'>
                            <p className='text-sm px-4 font-semibold text-gray-900 '>
                                {user?.name}
                            </p>

                            <button type='button' onClick={()=>{
                                closeMenu();
                                logout();
                            }}
                            className='mt-2 w-full rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        )}
      
    </div>
  )
}

export default AdminLayout
