import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import api from '../api/axios';

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "preparing":
      return "bg-blue-100 text-blue-700";

    case "delivered":
      return "bg-green-100 text-green-700";

    case "canceled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderDetails = () => {
  const {id}=useParams();
  const [order,setOrder]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    const fetchOrder=async ()=>{
      try{
        const response= await api.get(`/orders/${id}`);
        setOrder(response.data.data);
      }catch(error){
        console.log(error)
        setError("Unable to load this order.")
      }finally{
        setLoading(false);
      }
    };
    fetchOrder();
  },[id]);

  if(loading){
    return (
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <p className='text-gray-500'>Loading order...</p>
      </div>
    )
  }
  if(error){
    <div className='mx-auto max-w-7xl px-6 py-16'>
      <p className='text-red-600'>
        {error}
      </p>
    </div>
  }
  return (
    <div className='mx-auto max-w-5xl px-6 py-16' >

      {/* Header */}
      <div className='flex flex-col gap-4 border-b border-gray-100 pb-8 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Order #{order.id}
          </h1>
          <p className='mt-2 text-sm text-gray-500'>
            Placed on {order.created_at}
          </p>
        </div>
        <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold capitalize ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Delivery information */}
      <div className='mt-8 grid gap-6 md:grid-cols-2'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6'>
          <h2 className='text-lg font-bold text-gray-900'>
            Delivery Information
          </h2>
          <div className='mt-5 space-y-4'>
            <div>
              <p className='text-sm text-gray-500'>
                Phone
              </p>
              <p className='mt-1 font-medium'>
                {order.phone}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>
                Address
              </p>
              <p className='mt-1 font-medium'>
                {order.address}
              </p>
            </div>
          </div>
        </div>

        {/* Customer information */}
        <div className='rounded-2xl border border-gray-200 bg-white p-6'>
          <h2 className='text-lg font-bold text-gray-900'>
            Customer Information
          </h2>
          <div className='mt-5'>
            <p className='text-sm text-gray-500'>
              Name
            </p>
            <p className='mt-1 font-medium'>
              {order.user?.name}
            </p>

            <p className='mt-4 text-sm text-gray-500'>
              Email
            </p>
            <p className='mt-1 font-medium'>
              {order.user?.email}
            </p>
          </div>
        </div>
      </div>
      {/* Order Items */}
      <div className='rounded-2xl border border-gray-200 mt-8 bg-white p-6'>
        <h2 className='text-lg font-bold text-gray-900'>
          Order Items
        </h2>
        <div className='mt-6 divide-y divide-gray-100'>
          {order.items.map((item,index)=>(
            <div key={index} className='flex items-center justify-between py-5'>
              <div>
                <h3 className='font-semibold text-gray-900'>
                  {item.pizza.name}
                </h3>
              </div>
                <p className='mt-1 text-sm text-gray-500'>
                  ${Number(item.subtotal).toFixed(2)}
                </p>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className='mt-6 flex items-center justify-between border-t border-gray-100 pt-6'>
          <span className='text-lg font-bold'>
            Total
          </span>
          <span className='text-2xl font-bold text-red-600'>
            ${Number(order.total_price).toFixed(2)}
          </span>
        </div>
      </div>

      
    </div>
  )
}

export default OrderDetails
