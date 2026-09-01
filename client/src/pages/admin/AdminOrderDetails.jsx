import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AdminOrderDetails = () => {
    const {id}=useParams();
    const [order,setOrder]=useState(null);
    const [loading, setLoading]=useState(true);
    const [updatingstatus,setUpdatingStatus]=useState(false);

    const handleStatusChange=async(e)=>{
        const newStatus =e.target.value

        try{
            setUpdatingStatus(true);
            const response=await api.patch(`/admin/orders/${id}`,{
                status: newStatus
            })
            setOrder(response.data.order);
            toast.success(response.data.message || "Order status updated successfully!")
        }catch(error){
            
            toast.error(error.response?.data || "Failed to updated order status.")
        }finally{
            setUpdatingStatus(false);
        }
    }

    useEffect(()=>{
        const fetchOrder=async()=>{
            try{
                const response=await api.get(`/admin/orders/${id}`);
    
                setOrder(response.data.data);
            
            }catch(error){
                console.log("admin order error:",error.response?.data || error.message);
            }finally{
                setLoading(false)
            }
        }  

        fetchOrder();
        
    },[id])

    if(loading){
        return (
            <div className='p-4 sm:p-6 md:p-8'>
                <p className='text-gray-500'>Loading pizzas...</p>
            </div>
        )
    }
    if(!order){
        return (
            <div className='p-4 sm:p-6 md:p-8'>
                <p className='text-gray-500'>Order not found.</p>
                <Link className='mt-4 inline-block font-semibold text-gray-600' to="/admin/orders">
                    ← Back to Orders
                </Link>
            </div>
        )
    }
  return (
    <div className='w-full max-w-full overflow-hidden p-4 sm:p-6 md:p-8'>

        {/* Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
            <div>
                <Link to="/admin/orders" className=' text-sm font-semibold text-red-600 hover:text-red-700'>
                 ← Back to Orders
                </Link>
                <p className='mt-9 text-sm font-medium text-gray-500'>
                    Order Details
                </p>
                <h1 className='mt-1 text-3xl font-bold text-gray-900'>
                    order #{order.id}
                </h1>
                <p className='mt-2 text-gray-500'>
                    Placed on {order.created_at}
                </p>
            </div>
            <div className='flex w-full flex-col gap-2 sm:w-auto'>
                <label className='text-sm font-medium text-gray-500'>
                    Order status
                </label>
                <select value={order.status}
                onChange={handleStatusChange}
                disabled={updatingstatus}
                className='w-full rounded-xl border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-red-500 sm:w-[180px]'
                >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                </select>
                {
                    updatingstatus &&(
                        <p className='text-xs text-gray-500'>
                            Updating...
                        </p>
                    )
                }
            </div>
        </div>

        {/* Top information */}

        <div className='mt-8 grid gap-6 lg:grid-cols-2'>

            {/* Customer */}
            <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6'>
                <h2 className='text-lg font-bold text-gray-900'>
                    Customer Information
                </h2>
                <div className='mt-5 space-y-4'>
                    <div>
                        <p className='text-sm text-gray-500'>Name</p>
                        <p className='mt-1 font-semibold text-gray-900'>
                            {order.user?.name || "Unknown"}
                        </p>
                    </div>
                    <div>
                        <p className='text-sm text-gray-500'>Email</p>
                        <p className='mt-1 break-all font-semibold text-gray-900'>
                            {order.user?.email || "Unknown"}
                        </p>
                    </div>
                    <div >
                        <p className='text-sm text-gray-500'>Phone</p>
                        <p className='mt-1 font-semibold text-gray-900'>
                            {order.phone}
                        </p>
                    </div>
                </div>
            </div>

            {/* Delivery */}

            <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6'>
                <h2 className='text-lg font-bold text-gray-900'>
                    Delivery Information
                </h2>
                <div className='mt-5'>
                    <p className='text-sm text-gray-500'>Delivery Address</p>
                    <p className='mt-1 leading-7 text-gray-900'>
                        {order.address}
                    </p>
                </div>
            </div>
        </div>

        {/* Order items */}
        <div className='mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6  shadow-sm'>
            <h2 className='text-lg font-bold text-gray-900'>
                Order Items
            </h2>
            <div className='mt-5 space-y-4'>
                {
                    order.items?.map((item,index)=>(
                        <div 
                        key={item.id||index}
                        className='flex flex-col gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between'
                        >
                            <div className='flex items-center gap-4 '>
                                {item.pizza?.image &&(
                                    <img src="https://images.unsplash.com/photo-1579751626657-72bc17010498" alt={item.pizza.name}
                                    className='h-16 w-16 shrink-0 rounded-xl object-cover'
                                    />
                                )}
                                <div>
                                    <h3 className='font-bold text-gray-900'>
                                        {item.pizza?.name}
                                    </h3>
                                    <p className='mt-1 text-sm text-gray-500'>
                                        ${Number(item.price).toFixed(2)} × {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className='font-bold text-gray-900'>
                                ${Number(item.subtotal).toFixed(2)}
                            </p>
                        </div>
                    ))
                }
            </div>
            {/* Total */}
            <div className='mt-6 flex justify-between border-t border-gray-200 pt-5'>
                <span className='text-lg font-bold text-gray-900'>
                    Total
                </span>
                <span className='text-xl font-bold text-red-600'>
                    ${Number(order.total_price).toFixed(2)}
                </span>
            </div>
        </div>
    </div>
  )
}

export default AdminOrderDetails;
