import React, { useEffect, useState } from 'react'
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import StatusBadges from './StatusBadges';

const AdminOrders = () => {
    const [orders,setOrders]=useState([]);
    const [loading,setLoading]=useState(true);
    const [statusFilter,setStatusFilter]=useState('all');
    const [pagination,setPagination]=useState(null);
    const [search,setSearch]=useState('');


    
    const fetchOrders=async (url='/admin/orders')=>{
        try{
            setLoading(true);
            const response=await api.get(url);

            console.log('admin orders:',response.data);

            setOrders(response.data.data);
            setPagination(response.data);
        }catch(error){
            console.log(
                error.response?.data || error.message
            )
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchOrders();
    },[]);
    if(loading){
        return(
            <div className='p-6 md:p-8'>
                <p className='text-gray-500'>Loading orders...</p>
            </div>
        )
    }
    const handleStatusFilter =(status)=>{
        const params=new URLSearchParams();
        if(status!=='all'){
            params.append('status',status);
        }
        if(search.trim()){
            params.append('search',search.trim());
        }

        fetchOrders(
            params.toString() 
            ? `/admin/orders?${params.toString()}`
            : '/admin/orders'
        )
    }

    // for search button
    const handleSearch=()=>{
        const params=new URLSearchParams();

        if(statusFilter !=='all'){
            params.append('status',statusFilter);
        }
        if(search.trim()){
            params.append('search',search.trim());
        }

        fetchOrders(
            params.toString()
            ? `/admin/orders?${params.toString()}`
            :"/admin/orders"
        )
    }

  return (
    <div className='p-4 sm:p-6 md:p-8 w-full max-w-full overflow-hidden'>
      {/* Header */}
      <div>
        <p className='text-sm font-medium text-gray-500'>
            Order Management
        </p>
        <h1 className='mt-1 text-3xl font-bold text-gray-900'>
            Manage Orders
        </h1>
        <p className='mt-2 text-gray-500'>
            View and manage all customer orders.
        </p>
      </div>


      <div className='mt-6 flex w-flex flex-col gap-3 sm:flex-row'>
        <div className='relative flex-1'>
            <span className='pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.8}
                    stroke='currentColor'
                    className='h-5 w-5'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z'
                    />
                </svg>
            </span>
            <input type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search by orde ID, name, email, or phone'
            className='w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            onKeyDown={(e)=>{
                if(e.key ==="Enter"){
                    handleSearch();
                }
            }}
            />
        </div>
        <button className=' cursor-pointer rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800'
        onClick={handleSearch}
        type='button'
        >
            Search
        </button>
      </div>
      <div className='mt-6 flex gap-2 overflow-x-auto pb-1'>
        {
            ['all','pending','preparing','delivered','canceled'].map((status)=>(
                <button key={status}
                type='button'
                onClick={()=>handleStatusFilter(status)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${statusFilter ===status ? 'bg-gray-900 text-white': 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'} `}
                >
                    {status}
                </button>
            ))
        }
      </div>
      {
        orders.length > 0 ?(
            <>
            {/* Mobile Cards */}
            <div className='mt-8 space-y-4 md:hidden'>
                {
                    orders.map((order)=>(
                        <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm '
                        key={order.id}
                        >
                            <div className='flex items-start justify-between gap-3'>
                                <div>
                                    <p className='font-bold text-gray-900'>
                                        Order #{order.id}
                                    </p>
                                    <p className='mt-1 text-sm text-gray-500'>
                                        {order.user?.name}
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        {order.user?.email}
                                    </p>
                                </div>
                                <StatusBadges status={order.status}/>
                            </div>
                            <div className='mt-4 border-t border-gray-100 pt-4'>
                                <div className='flex justify-between text-sm'>
                                    <span className='text-gray-500'>Total</span>
                                    <span className='font-bold text-gray-900'>
                                        ${Number(order.total_price).toFixed(2)}
                                    </span>
                                </div>
                                <div className='mt-2 flex justify-between text-sm'>
                                    <span className='text-gray-500'>Date</span>
                                    <span className='text-gray-700'>
                                        {order.created_at}
                                    </span>
                                </div>
                            </div>
                            <Link to={`/admin/orders/${order.id}`}
                            className='mt-4 block w-full rounded-xl bg-gray-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-800'
                            >
                            View Details
                            </Link>
                        </div>
                    ))
                }
            </div>

            {/* Desktop table */}
            <div className='mt-8 hidden w-full max-w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm md:block'>
                <table className='w-full min-w-[850px] text-left'>
                    <thead>
                        <tr className='border-b border-gray-200 bg-gray-50 text-sm text-gray-500'>
                            <th className='px-4 py-4 font-medium'>Order</th>
                            <th className='px-4 py-4 font-medium'>Customer</th>
                            <th className='px-4 py-4 font-medium'>Phone</th>
                            <th className='px-4 py-4 font-medium'>Status</th>
                            <th className='px-4 py-4 font-medium'>Total</th>
                            <th className='px-4 py-4 font-medium'>Date</th>
                            <th className='px-4 py-4 font-medium'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>(
                                <tr 
                                key={order.id}
                                className='border-b border-gray-100 last:border-0'
                                >
                                    <td className='px-6 py-4 font-semibold text-gray-900'>
                                        #{order.id}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <p className='font-medium text-gray-900'>
                                            {order.user?.name}
                                        </p>
                                        <p className='mt-1 text-sm text-gray-500'>
                                            {order.user?.email}
                                        </p>
                                    </td>
                                    <td className='px-6 py-4 text-gray-600'>
                                        {order.phone}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <StatusBadges status={order.status}/>
                                    </td>
                                    <td className='px-6 py-4 font-semibold text-gray-900'>
                                        ${Number(order.total_price).toFixed(2)}
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-500'>
                                        {order.created_at}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <Link to={`/admin/orders/${order.id}`}className='rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800'>
                                        View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                pagination &&(
                    <div className='mt-6 flex items-center justify-between gap-4'>
                        <button className='rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                        disabled={!pagination.prev_page_url}
                        onClick={()=>fetchOrders(pagination.prev_page_url)}
                        type='button'
                        >
                            ← Previous
                        </button>
                        <p className='text-sm text-gray-500'>
                            Page {pagination.current_page} of {pagination.last_page}
                        </p>
                        <button className='rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                        type='button'
                        onClick={()=>fetchOrders(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}
                        >
                            Next →
                        </button>
                    </div>
                )
            }
            </>
        ):(
            <div className='mt-8 rounded-2xl border border-gray-200 border-dashed bg-white p-10 text-center'>
                {orders.length===0 ?"No orders found.":`No ${statusFilter} orders found.`}
            </div>
        )
      }
    </div>
  )
}

export default AdminOrders
